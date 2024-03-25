import { Notify } from 'quasar';

/**
 *
 * @param : `message   * { String || Variable }` 메시지, 필수값
 * @param : `callback  * { Function }` 익명함수 사용, () => { 함수1(); 함수2(); 그 외 로직 }
 * @param : `actions   * { Boolean }` action 유무, 기본값 false
 * @param : `options   * { Object }` 나머지 옵션, 기본값 false
 */
export function baseNotify(
  message,
  callback = null,
  actions = false,
  options = null,
) {
  let option = {};
  if (actions) {
    option = {
      ...options,
      timeout: 2000,
      progress: true,
      actions: [
        {
          label: '취소',
          color: 'red',
          handler: () => {
            return;
          },
        },
        {
          label: '확인',
          handler: () => {
            if (callback) {
              callback();
            }
          },
        },
      ],
    };
  }
  Notify.create({
    message,
    html: true,
    ...option,
    timeout: option?.timeout || 500,
    actions: option?.actions || '',
  });
}
