import { db } from 'boot/firebase';
import {
  addDoc,
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
  /*
  // firestore instance, collection name, saveData
  const docRef = await addDoc(collection(db, 'posts'), {
    // 등록할 데이터 추가
  });
  return docRef.id;
  */
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
  /*
  // getDocs : 컬렉션에 저장된 모든 데이터 조회
  const querySnapshot = await getDocs(collection(db, 'posts'));
  // const posts = [];
  // querySnapshot.forEach(docs => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(docs.id, ' => ', docs.data());
  //   posts.push(docs.data());
  // });
  const posts = querySnapshot.docs.map(docs => {
    const data = docs.data();
    return {
      ...data,
      id: docs.id,
      createdAt: data.createdAt?.toDate(),
    };
  });
  */
  // 컬렉션에 있는 문서를 쿼리로 조회
  const conditions = [];
  // category의 기본값은 undefind
  // 카테고리로 검색
  if (params?.category)
    conditions.push(where('category', '==', params?.category));

  // 태그로 검색
  if (params?.tags && params?.tags.length) {
    conditions.push(where('tags', 'array-contains-any', params?.tags));
  }

  if (params?.sort) conditions.push(orderBy(params.sort, 'desc'));

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
  console.log(params, conditions);
  return posts;
}
/**
 * @summary : 상세 게시글 불러오기
 * @role    :
 * @parmas  : id
 * @url     :  google.com/docs/firestore/query-data/order-limit-data?hl=ko
 */
export async function getPost(id) {
  const docSnap = await getDoc(doc(db, 'posts', id));

  if (!docSnap.exists()) getErrorMessage('문서를 찾을 수 없습니다.');

  return {
    ...docSnap.data(),
    createdAt: docSnap.data().createdAt?.toDate(),
  };
}
/**
 * @summary : 상세 게시글 수정
 * @role    :
 * @parmas  : id
 * @url     :  https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko
 */
export async function updatePost(id, data) {
  await updateDoc(doc(db, 'posts', id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
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
