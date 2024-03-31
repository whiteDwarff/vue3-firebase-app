import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from 'src/boot/firebase';
// npm i uuid
import { v4 as uuidv4 } from 'uuid';
// npm i browser-image-resizer
import { readAndCompressImage } from 'browser-image-resizer';
/**
 * @summary : firebase storage에 이미지 업로드하기
 * @params  : file
 * @doc     : https://firebase.google.com/docs/storage/web/upload-files?hl=ko&_gl=1*5ar6is*_up*MQ..*_ga*MTY1NDg4NDYyMS4xNzExODY0Njg3*_ga_CW55HF8NVT*MTcxMTg2NDY4Ni4xLjAuMTcxMTg2NDY4Ni4wLjAuMA..
 */
export async function uploadImage(file) {
  const fileName = `images/${uuidv4()}.${getExtention(file.name)}`;
  const storageRef = ref(storage, fileName);
  const thumbnail = await compressImage(file);
  const uploadResult = await uploadBytes(storageRef, thumbnail);
  return getDownloadURL(uploadResult.ref);
}
/**
 * 파일의 확장자 가져오가
 */
function getExtention(fileName) {
  // .을 기준으로 배열생성, 마지막 요소를 가져옴 (확장자)
  return fileName.split('.').pop();
}

async function compressImage(file) {
  return readAndCompressImage(file, {
    quality: 0.8,
  });
}
