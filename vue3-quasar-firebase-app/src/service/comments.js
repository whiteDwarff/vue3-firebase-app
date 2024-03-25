import { db } from 'src/boot/firebase';
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  deleteDoc,
  doc,
} from 'firebase/firestore';

export async function addComment(postId, data) {
  const docRef = await addDoc(collection(db, 'posts', postId, 'comments'), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getComments(postId) {
  const q = query(
    collection(db, 'posts', postId, 'comments'),
    orderBy('createdAt', 'desc'),
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(docu => {
    const data = docu.data();
    return {
      id: docu.id,
      ...data,
      createdAt: data.createdAt?.toDate(),
    };
  });
}

export async function deleteComments(postId, commentsId) {
  await deleteDoc(doc(db, 'posts', postId, 'comments', commentsId));
}
