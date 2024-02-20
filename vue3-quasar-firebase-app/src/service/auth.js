/*
Google Login
https://firebase.google.com/docs/auth/web/google-signin?hl=ko&_gl=1*1k3xhhk*_up*MQ..*_ga*NDkyOTc1NTkuMTcwODM0MzU0Nw..*_ga_CW55HF8NVT*MTcwODM0MzU0Ni4xLjAuMTcwODM0MzU0Ni4wLjAuMA..
https://firebase.google.com/docs/reference/js/auth.usercredential?_gl=1*zt02j2*_up*MQ..*_ga*OTk4NTc0OTkxLjE3MDgzNDM3NTQ.*_ga_CW55HF8NVT*MTcwODM0Mzc1My4xLjAuMTcwODM0MzgwOC4wLjAuMA..&hl=ko
*/
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "src/boot/firebase";

/*
DiceBear ( 프로필 이미지 생성 )
https://www.dicebear.com/playground/
*/
const DEFAULT_PHOTO_URL = 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=';

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  return user;
}

export async function logOut() {
  await signOut(auth);
}

/*
Eamil Join 
https://firebase.google.com/docs/auth/web/start?hl=ko&_gl=1*ra291u*_up*MQ..*_ga*NzY1OTM0OTM3LjE3MDg0MjUyMzM.*_ga_CW55HF8NVT*MTcwODQyNTIzMy4xLjAuMTcwODQyNTIzMy4wLjAuMA..

create photoURL
https://firebase.google.com/docs/auth/web/manage-users?hl=ko&_gl=1*orrmgz*_up*MQ..*_ga*NzY1OTM0OTM3LjE3MDg0MjUyMzM.*_ga_CW55HF8NVT*MTcwODQyNTIzMy4xLjAuMTcwODQyNTIzMy4wLjAuMA..
*/
export async function signUpWithEmail({email, password, nickname}) {
  const { user } =  await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, {
    displayName : nickname,
    photoURL : generageDefaultPhotoURL(user.uid)
  });
  console.log('user : ', user);
}
/* 
Email Login
*/
export async function signInWithEmail({email, password}) {
  const { user } =  await signInWithEmailAndPassword(auth, email, password);
  return user;
}

export function generageDefaultPhotoURL(uid) {
  return `${DEFAULT_PHOTO_URL}${uid}`
}