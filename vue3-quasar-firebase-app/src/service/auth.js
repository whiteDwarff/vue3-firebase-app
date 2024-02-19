/*
Google Login
https://firebase.google.com/docs/auth/web/google-signin?hl=ko&_gl=1*1k3xhhk*_up*MQ..*_ga*NDkyOTc1NTkuMTcwODM0MzU0Nw..*_ga_CW55HF8NVT*MTcwODM0MzU0Ni4xLjAuMTcwODM0MzU0Ni4wLjAuMA..
https://firebase.google.com/docs/reference/js/auth.usercredential?_gl=1*zt02j2*_up*MQ..*_ga*OTk4NTc0OTkxLjE3MDgzNDM3NTQ.*_ga_CW55HF8NVT*MTcwODM0Mzc1My4xLjAuMTcwODM0MzgwOC4wLjAuMA..&hl=ko
*/
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "src/boot/firebase";

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
}

export async function logOut() {
  await signOut(auth);
}