// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.

const functions = require('firebase-functions');
// const { logger } = require('firebase-functions');
const { logger } = functions;
// document가 생성되었을 때 이벤트
const {
  onDocumentCreated,
  onDocumentDeleted,
} = require('firebase-functions/v2/firestore');

// The Firebase Admin SDK to access Firestore.
const { initializeApp, cert } = require('firebase-admin/app');
const {
  getFirestore,
  FieldValue,
  Timestamp,
} = require('firebase-admin/firestore');
const serviceAccountKey = require('./serviceAccountKey.json');

const app = initializeApp({
  // 자격증명 설정
  credential: cert(serviceAccountKey),
});
const db = getFirestore(app);
const region = 'asia-northeast3';

exports.onCreateBookMark = onDocumentCreated(
  {
    region,
    document: 'users/{uid}/bookmarks/{postId}',
  },
  event => {
    const postId = event.params.postId;
    db.doc(`posts/${postId}`).update({
      bookmarkCount: FieldValue.increment(1),
    });
  },
);

exports.onDeleleteBookmark = onDocumentDeleted(
  {
    region,
    document: 'users/{uid}/bookmarks/{postId}',
  },
  event => {
    const postId = event.params.postId;
    db.doc(`posts/${postId}`).update({
      bookmarkCount: FieldValue.increment(-1),
    });
  },
);

exports.onCreatComments = onDocumentCreated(
  {
    region,
    document: 'posts/{postId}/comments/{commentId}',
  },
  event => {
    const postId = event.params.postId;
    db.doc(`posts/${postId}`).update({
      commentCount: FieldValue.increment(1),
    });
  },
);

exports.onDeleteComment = onDocumentDeleted(
  {
    region,
    document: 'posts/{postId}/comments/{commentId}',
  },
  event => {
    const postId = event.params.postId;
    db.doc(`posts/${postId}`).update({
      commentCount: FieldValue.increment(-1),
    });
  },
);

exports.onCreatLike = onDocumentCreated(
  {
    region,
    document: 'post_likes/{id}',
  },
  event => {
    const snapshot = event.data;
    const data = snapshot.data();
    db.doc(`posts/${data.postId}`).update({
      likeCount: FieldValue.increment(1),
    });
  },
);

exports.onDeleteLikes = onDocumentDeleted(
  {
    region,
    document: 'post_likes/{id}',
  },
  event => {
    const snapshot = event.data;
    const data = snapshot.data();
    db.doc(`posts/${data.postId}`).update({
      likeCount: FieldValue.increment(1),
    });
  },
);

exports.onCreateUser = functions
  .region(region)
  .auth.user()
  .onCreate(user => {
    const isPasswordProvider = user.providerData.some(
      userInfo => userInfo.providerId === 'password',
    );
    const DEFAULT_PHOTO_URL = `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${user.uid}`;
    const displayName = isPasswordProvider
      ? user.email.split('@')[0]
      : user.displayName;
    const photoURL = isPasswordProvider ? DEFAULT_PHOTO_URL : user.photoURL;
    db.doc(`users/${user.uid}`).set({
      email: user.email,
      displayName,
      photoURL,
      createdAt: Timestamp.fromDate(new Date(user.metadata.creationTime)),
    });
  });

exports.onDeleteUser = functions
  .region(region)
  .auth.user()
  .onDelete(user => {
    db.doc(`users/${user.uid}`).delete();
  });
