export const NotificationMessage = {
  INFO: 'Some information message',
  ERROR: (message?: string) => (message ? message : 'Error'),
  WARNING: 'Some warning message',
  SUCCESS: (message?: string) => (message ? message : 'Success')
};
