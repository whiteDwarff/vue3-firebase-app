import { db } from 'boot/firebase';
import {
  collection,
  setDoc,
  doc,
  getDocs,
  serverTimestamp,
  getCountFromServer,
  query,
  where,
  orderBy,
  getDoc,
  updateDoc,
  deleteDoc,
  startAfter,
  limit,
  increment,
} from 'firebase/firestore';
import { getErrorMessage } from 'src/utils/firebase/error-message';

/**
 * @summary : 게시글의 시퀀스 생성
 * @params  : none
 * @returns : sequence
 * @url     : https://firebase.google.com/docs/firestore/query-data/aggregation-queries?hl=ko
 */
export async function createSequence() {
  const coll = collection(db, 'posts');
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count + 1;
}

/**
 * @summary : 게시글 작성
 * @role    :
 * @parmas  : data
 * @url     : https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko&_gl=1*1lup03w*_up*MQ..*_ga*MTUwODUzMDQzMi4xNzEwMzI5NTk1*_ga_CW55HF8NVT*MTcxMDMyOTU5NS4xLjAuMTcxMDMyOTU5NS4wLjAuMA..#add_a_document
 */
export async function createPost(data, sequence) {
  // setDoc은 document의 id를 지정할 수 있다.
  await setDoc(
    doc(db, 'posts', `${sequence}`),
    {
      // 등록할 데이터
      ...data,
      // 이하 default value
      readCount: 0,
      likeCount: 0,
      commentCount: 0,
      bookmarkCount: 0,
      // firebase에서 제공하는 시간 함수
      createdAt: serverTimestamp(),
    },
    {
      merge: true,
    },
  );
}
/**
 * @summary : 게시글 불러오기
 * @role    :
 * @parmas  : data
 * @url     :
 *   조회쿼리   https://firebase.google.com/docs/firestore/query-data/get-data?hl=ko
 *   조건쿼리   https://firebase.google.com/docs/firestore/query-data/queries?hl=ko#web-modular-api_9
 *   정렬쿼리   https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ko
 */
export async function getPosts(params) {
  // 컬렉션에 있는 문서를 쿼리로 조회
  const conditions = [];
  // category의 기본값은 undefind
  // 카테고리로 검색
  if (params?.category)
    conditions.push(where('category', '==', params?.category));

  if (params?.tags && params?.tags.length > 0)
    conditions.push(where('tags', 'array-contains-any', params?.tags));

  if (params?.sort) conditions.push(orderBy(params.sort, 'desc'));

  if (params?.start) conditions.push(startAfter(params.start));

  if (params?.limit) conditions.push(limit(params.limit));

  // conditions을 분해 ->  { type(where), op(비교값), value(값) }
  const q = query(collection(db, 'posts'), ...conditions);
  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map(docs => {
    const data = docs.data();
    return {
      ...data,
      id: docs.id,
      createdAt: data.createdAt?.toDate(),
    };
  });
  const latestDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
  return {
    items: posts,
    lastItem: latestDoc,
  };
}

/**
 * @summary : 상세 게시글 불러오기
 * @role    :
 * @parmas  : id
 * @url     : google.com/docs/firestore/query-data/order-limit-data?hl=ko
 */
export async function getPost(id) {
  const docSnap = await getDoc(doc(db, 'posts', id));

  if (!docSnap.exists()) getErrorMessage('문서를 찾을 수 없습니다.');

  return {
    id: docSnap.id,
    ...docSnap.data(),
    createdAt: docSnap.data().createdAt?.toDate(),
  };
}
/**
 * @summary : 조회수 증가
 * @parmas  : id
 * @url     : https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko
 */
async function incrementReadPost(postId) {
  await updateDoc(doc(db, 'posts', postId), {
    readCount: increment(1),
  });
}

export async function getPostDetails(id) {
  incrementReadPost(id);
  const post = await getPost(id);
  return {
    post,
  };
}
/**
 * @summary : 상세 게시글 수정
 * @role    :
 * @parmas  : id
 * @url     : https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko
 */
export async function updatePost(id, data) {
  await updateDoc(doc(db, 'posts', id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * @summary : 게시글 삭제
 * @role    :
 * @parmas  : id
 * @url     : https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=ko
 */
export async function deletePost(id) {
  await deleteDoc(doc(db, 'posts', id));
}

/**
 * @summary : 게시글 좋아요
 * @parmas  : uid, postId
 */
export async function addLike(uid, postId) {
  await setDoc(doc(db, 'post_likes', `${uid}_${postId}`), {
    uid,
    postId,
    createdAt: serverTimestamp(),
  });
}
/**
 * @summary : 게시글 좋아요 취소
 * @parmas  : uid, postId
 */
export async function removeLike(uid, postId) {
  await deleteDoc(doc(db, 'post_likes', `${uid}_${postId}`));
}
/**
 * @summary : 게시글 좋아요 여부
 * @parmas  : uid, postId
 */
export async function hasLike(uid, postId) {
  const docSnap = await getDoc(doc(db, 'post_likes', `${uid}_${postId}`));
  return docSnap.exists();
}
/**
 * @summary : 북마크 추가
 * @parmas  : uid, postId
 */
export async function addBookmark(uid, postId) {
  await setDoc(doc(db, 'users', uid, 'bookmarks', postId), {
    createdAt: serverTimestamp(),
  });
}
/**
 * @summary : 북마크 삭제
 * @parmas  : uid, postId
 */
export async function removeBookmark(uid, postId) {
  await deleteDoc(doc(db, 'users', uid, 'bookmarks', postId));
}
/**
 * @summary : 북마크 추가여부
 * @parmas  : uid, postId
 */
export async function hasBookmark(uid, postId) {
  const docSnap = await getDoc(doc(db, 'users', uid, 'bookmarks', postId));
  return docSnap.exists();
}
/**
 * @summary : 북마크한 게시글 목록 들고오기
 * @parmas  : uid, postId
 */
export async function getUserBookmark(uid) {
  const q = query(
    collection(db, 'users', uid, 'bookmarks'),
    orderBy('createdAt', 'desc'),
    limit(6),
  );
  const querySnapshot = await getDocs(q);

  return Promise.all(
    querySnapshot.docs.map(bookmarkDoc => getPost(bookmarkDoc.id)),
  );
}

/*
- collection : DB의 테이블 
- document   : 데이터의 고유값 (PK ? )

db info
--------------------------------------
제목        title        string
--------------------------------------
카테고리     category     string
--------------------------------------
내용        content      string
--------------------------------------
태그        tags         array
--------------------------------------
조회수      readCount     number
--------------------------------------
좋아요수    likeCount     number
--------------------------------------
댓글수      commentCount  number
--------------------------------------
북마크수     bookmarkCount number
--------------------------------------
생성일      createdAt     timestamp
--------------------------------------
사용자ID    uid           string
--------------------------------------
*/
