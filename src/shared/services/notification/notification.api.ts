import {toast} from 'react-toastify';
import {NotificationEnum} from './lib/enums/enums';
import {NotificationApi} from './lib/types/types';

const DEFAULT_MESSAGE = 'Unexpected error';

class Notification implements NotificationApi {
  public [NotificationEnum.ERROR] = (message = DEFAULT_MESSAGE): void => {
    toast.error(message);
  };

  public [NotificationEnum.SUCCESS] = (message = DEFAULT_MESSAGE): void => {
    toast.success(message);
  };

  public [NotificationEnum.WARNING] = (message = DEFAULT_MESSAGE): void => {
    toast.warn(message);
  };

  public [NotificationEnum.INFO] = (message = DEFAULT_MESSAGE): void => {
    toast.info(message);
  };
}

export {Notification};
