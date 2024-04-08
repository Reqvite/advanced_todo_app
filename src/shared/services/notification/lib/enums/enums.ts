enum NotificationEnum {
  INFO = 'info',
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success'
}

const NotificationMessage = {
  INFO: 'Some information message',
  ERROR: (message?: string) => (message ? message : 'Error'),
  WARNING: 'Some warning message',
  SUCCESS: (message?: string) => (message ? message : 'Success')
};

export {NotificationEnum, NotificationMessage};
