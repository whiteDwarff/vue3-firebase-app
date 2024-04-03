// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.

const functions = require('firebase-functions');
// const { logger } = require('firebase-functions');
const { logger } = functions;
// document가 생성되었을 때 이벤트
const {
  onDocumentCreated,
  onDocumentDeleted,
  onDocumentUpdated,
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

exports.onCreatePost = onDocumentCreated(
  {
    region,
    document: 'posts/{postId}',
  },
  event => {
    const data = event.data.data();
    if (data.tags) updateTags(data.tags);
  },
);

exports.onDeletePost = onDocumentDeleted(
  {
    region,
    document: 'posts/{postId}',
  },
  event => {
    const data = event.data.data();
    if (data.tags) updateTags(data.tags, -1);
  },
);

exports.onUpdatePost = onDocumentUpdated(
  {
    region,
    document: 'posts/{postId}',
  },
  event => {
    const prevData = event.data.before.data();
    const data = event.data.after.data();

    const tagsToRemove = differenceTags(prevData.tags, data.tags);
    const tagsToAdd = differenceTags(data.tags, prevData.tags);

    if (tagsToRemove) updateTags(tagsToRemove, -1);
    if (tagsToAdd) updateTags(tagsToAdd);
  },
);

function updateTags(tag = [], incrementValue = 1) {
  tag?.forEach(tag => {
    db.doc(`tags/${tag.toLowerCase()}`).set(
      { name: tag.toLowerCase(), count: FieldValue.increment(incrementValue) },
      { maerge: true },
    );
  });
}

function differenceTags(arr1, arr2) {
  if (!arr1 || !arr2) return arr1;
  return arr1.filter(value => arr2.includes(value) === false);
}
