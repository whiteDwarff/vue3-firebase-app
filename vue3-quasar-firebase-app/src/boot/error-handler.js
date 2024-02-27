import { boot } from 'quasar/wrappers';
// component가 아닌 js 파일에서 notify 사용
import { Notify } from 'quasar';
import { getErrorMessage } from 'src/utils/firebase/error-message';


export default boot(async ({app}) => {
  app.config.errorHandler = (err, instance, info) => {
   console.log(err);
  }
});
