import { Notify } from 'quasar';

/**
 * @param { string } message notify 메시지 ( 필수값 )
 * @param { function() } callback 콜백함수 () => { 함수1, 함수2 }, 기본값 : null
 * @param { boolean } actions notify actions 사용 유무, 기본값 : false
 * @param { object } [options=null] 그 외 옵션, 기본값 : null
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

  if (options)
    option = {
      ...options,
    };
  Notify.create({
    message,
    html: true,
    ...option,
    timeout: option?.timeout || 500,
    actions: option?.actions || '',
  });
}
