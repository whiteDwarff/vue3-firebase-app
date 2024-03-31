import { boot } from 'quasar/wrappers';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { userAuthStore } from 'src/stores/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyA84NVhaVbOjytA-oZhg3ssrugArQg_5y8',
  authDomain: 'vue3-firebase-app-98131.firebaseapp.com',
  projectId: 'vue3-firebase-app-98131',
  storageBucket: 'vue3-firebase-app-98131.appspot.com',
  messagingSenderId: '1004179385645',
  appId: '1:1004179385645:web:c5e8bf99b5852c8eee37a4',
  measurementId: 'G-RQYC051B73',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
/* 
  Authentication SDK 추가 및 초기화
  https://firebase.google.com/docs/auth/web/start?hl=ko&authuser=0&_gl=1*1va27e2*_up*MQ..*_ga*ODIyMDcwNTA2LjE3MDgyNjExNDc.*_ga_CW55HF8NVT*MTcwODI2MTE0Ny4xLjEuMTcwODI2MTY5Ny4wLjAuMA..
*/
// auth instance 생성 (사용자 관리 )
const auth = getAuth(app);
// firestore instance 생성 ( 문서관리 )
const db = getFirestore(app);
// 파일업로드를 위한 storage 객체 생성
const storage = getStorage(app);

// 전역으로 사용 (참조)
export { auth, db, storage };

export default boot(async (/* { app, router, ... } */) => {
  const authStore = userAuthStore();
  // 사용자의 상태를 관찰하는 관찰자 함수 (로그인, 로그아웃 시 실행되는 메서드)
  onAuthStateChanged(auth, user => {
    console.log('###user : ', user);
    authStore.setUser(user);
  });
});
