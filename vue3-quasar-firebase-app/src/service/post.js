import { db } from 'boot/firebase';
import {
  addDoc,
  collection,
  setDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

/**
 * @summary : 게시글 작성
 * @role    :
 * @parmas  : data
 * @url     : https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko&_gl=1*1lup03w*_up*MQ..*_ga*MTUwODUzMDQzMi4xNzEwMzI5NTk1*_ga_CW55HF8NVT*MTcxMDMyOTU5NS4xLjAuMTcxMDMyOTU5NS4wLjAuMA..#add_a_document
 */
export async function createPost(data) {
  // firestore instance, collection name, saveData
  const docRef = await addDoc(collection(db, 'posts'), {
    // 등록할 데이터
    ...data,
    // 이하 default value
    readCount: 0,
    likeCount: 0,
    commentCount: 0,
    bookmarkCount: 0,
    // firebase에서 제공하는 시간 함수
    createdAt: serverTimestamp(),
  });
  return docRef.id;
  /* 
  --------------------------------------------
  setDoc은 document의 id를 지정할 수 있다.
  --------------------------------------------
  await setDoc(doc(db, 'posts', 'post-id'), {
    title: 'hello world',
  }, {
    merge: true
  }); 
  */
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
