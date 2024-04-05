import {type NotificationEnum} from '../enums/enums.js';

type NotificationApi = {
  [K in ValueOf<typeof NotificationEnum>]: (message?: string) => void;
};

type NotificationPayload = {
  type: ValueOf<typeof NotificationEnum>;
  message: string;
};

export {type NotificationApi, type NotificationPayload};
