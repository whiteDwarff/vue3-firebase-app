import { boot } from 'quasar/wrappers';
import { getErrorMessage } from 'src/utils/firebase/error-message';

export default boot(async ({ app }) => {
  app.config.errorHandler = (err, instance, info) => {
    console.log('### app.config.errorHandler ###');
    console.log('err: ', err);
    getErrorMessage(err.code);
  };
});
/**
 * Global Error Handler
 * app.config.errorHandler
 */
