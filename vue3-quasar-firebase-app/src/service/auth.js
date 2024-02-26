import { GoogleAuthProvider, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { auth } from "src/boot/firebase";

/*
DiceBear ( 프로필 이미지 생성 )
https://www.dicebear.com/playground/
*/
const DEFAULT_PHOTO_URL = 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=';

export function generageDefaultPhotoURL(uid) {
  return `${DEFAULT_PHOTO_URL}${uid}`
}


/**
 * @summary : 로그아웃
 * @role    : 
 * @parmas  :
 * @url     :
 */
export async function logOut() {
  await signOut(auth);
}
/**
 * @summary : 구글 사용자 로그인
 * @role    : 
 * @parmas  :
 * @url     :
 */
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  return user;
}
/**
 * @smmary : 신규 사용자 가입
 * @role   : `이메일로 가입하기`를 통해 신규 가입할 수 있다.
 * @params : email, password, nickname
 * @join_url    : https://firebase.google.com/docs/auth/web/start?hl=ko&authuser=0&_gl=1*1yz2st7*_up*MQ..*_ga*MTI1NjM5MTA3MS4xNzA4NjAxOTQ0*_ga_CW55HF8NVT*MTcwODYwMTk0My4xLjEuMTcwODYwMzYzNy41My4wLjA.
 * @photo_url   : https://firebase.google.com/docs/auth/web/manage-users?hl=ko&_gl=1*orrmgz*_up*MQ..*_ga*NzY1OTM0OTM3LjE3MDg0MjUyMzM.*_ga_CW55HF8NVT*MTcwODQyNTIzMy4xLjAuMTcwODQyNTIzMy4wLjAuMA..
*/
export async function signUpWithEmail({email, password, nickname}) {
  try {
    const { user } =  await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, {
      displayName : nickname,
      photoURL : generageDefaultPhotoURL(user.uid)
    });
  } catch(err) {
    console.log(err);
  }
  // 이메일로 가입하면 즉시 인증 이메일을 발송
  sendVerificationEmail();
}
/**
 * @smmary : 기존 사용자 로그인
 * @role   : `이메일로 가입하기`를 통해 가입한 사용자들은 해당 폼을 통해 로그인할 수 있다.
 * @params : email, password
 * @url    : https://firebase.google.com/docs/auth/web/start?hl=ko&authuser=0&_gl=1*1yz2st7*_up*MQ..*_ga*MTI1NjM5MTA3MS4xNzA4NjAxOTQ0*_ga_CW55HF8NVT*MTcwODYwMTk0My4xLjEuMTcwODYwMzYzNy41My4wLjA.
*/
export async function signInWithEmail({email, password}) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}
/**
 * @smmary : 비밀번호 재설정 이메일 보내기 
 * @role   : `emit`을 통해 AuthDialog -> default.vue로 이벤트를 넘겨 Dialog 비활성화
 * @params : email
 * @url    : https://firebase.google.com/docs/auth/web/manage-users?hl=ko&_gl=1*s2bl44*_up*MQ..*_ga*MTQ3MDY3NDA0Ny4xNzA4NTE2OTYx*_ga_CW55HF8NVT*MTcwODUxNjk2MC4xLjAuMTcwODUxNjk2MC4wLjAuMA..
*/
export async function sendPasswordReset(email) {
    await sendPasswordResetEmail(auth, email);
}
/**
 * @summary : 비밀번호 변경하기
 * @role    : 사용자가 입력한 두개의 비밀번호가 일치하다면 비밀번호 변경
 * @params  : newPassword
 * @url     : https://firebase.google.com/docs/auth/web/manage-users?hl=ko&authuser=0&_gl=1*1arr9jw*_up*MQ..*_ga*MTI1NjM5MTA3MS4xNzA4NjAxOTQ0*_ga_CW55HF8NVT*MTcwODYwMTk0My4xLjEuMTcwODYwMzYzNy41My4wLjA.
 */
export async function updateUserPassword(newPassword) {
  await updatePassword(auth.currentUser, newPassword);
}
/**
 * @summary : 사용자에게 인증 이메일 보내기
 * @role    : 인증이 완료되지 않은 사용자는 프로필 기능을 이용할 수 없다.
 * @params  : auth.currentUser
 * @url     : https://firebase.google.com/docs/auth/web/manage-users?hl=ko&_gl=1*1vo30m7*_up*MQ..*_ga*MTM3MTU1NzE5Mi4xNzA4NzU4NTk4*_ga_CW55HF8NVT*MTcwODc1ODU5OC4xLjAuMTcwODc1ODU5OC4wLjAuMA..
 */
export async function sendVerificationEmail() {
  await sendEmailVerification(auth.currentUser)
}
/**
 * @summary : 사용자 프로필 업데이트
 * @role    : 사용자는 프로필을 변경할 수 있다.
 * @params  : auth.currentUser, displayName
 * @url     : https://firebase.google.com/docs/auth/web/manage-users?hl=ko&_gl=1*1vo30m7*_up*MQ..*_ga*MTM3MTU1NzE5Mi4xNzA4NzU4NTk4*_ga_CW55HF8NVT*MTcwODc1ODU5OC4xLjAuMTcwODc1ODU5OC4wLjAuMA..
*/
export async function updateUserProfile(displayName) {
  await updateProfile(auth.currentUser, { displayName });
}
/**
 * @summary : 사용자 이메일 주소 설정
 * @role    : 사용자는 이메일 주소를 변경할 수 있다.
 * @params  : auth.currentUser, email
 * @url     : https://firebase.google.com/docs/auth/web/manage-users?hl=ko&_gl=1*1vo30m7*_up*MQ..*_ga*MTM3MTU1NzE5Mi4xNzA4NzU4NTk4*_ga_CW55HF8NVT*MTcwODc1ODU5OC4xLjAuMTcwODc1ODU5OC4wLjAuMA..
 */
export async function updateUserEmail(email) {
  await updateEmail(auth.currentUser, email);
}


/**
 * @exception 
 * @DOC : https://firebase.google.com/docs/auth/admin/errors?hl=ko&_gl=1*zqtsga*_up*MQ..*_ga*MTQyMjM2NDgzMy4xNzA4OTU0MjU5*_ga_CW55HF8NVT*MTcwODk1NDI1OS4xLjAuMTcwODk1NDI1OS4wLjAuMA..
 * 
 * auth/network-request-failed : 네트워크 연결 실패
 * auth/invalid-email          : 존재하지 않는 이메일
 * auth/invalid-credential     : 존재하지 않는 패스워드
 * 
 * 
 */