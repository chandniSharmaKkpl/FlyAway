export default {
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SUCCESS: 200,

  //** biometric authentication error */
  LA_AUTHENTICATION_FAILED: 'LAErrorAuthenticationFailed',
  LA_USER_CANCEL: 'LAErrorUserCancel',
  LA_USER_FALLBACK: 'LAErrorUserFallback',
  LA_SYSTEM_CANCEL: 'LAErrorSystemCancel',
  LA_PASSCODE_NOT_SET: 'LAErrorPasscodeNotSet',
  LA_TOUCHID_NOT_AVAILABLE: 'LAErrorTouchIDNotAvailable',
  LA_TOUCH_ID_NOT_ENROLLED: 'LAErrorTouchIDNotEnrolled',
  LA_TOUCH_ID_LOCKOUT: 'LAErrorTouchIDLockout',
  LA_UNKNOWN_ERROR: 'RCTTouchIDUnknownError',
  LA_TOUCH_ID_NOT_SUPPORTED: 'RCTTouchIDNotSupported',
  LA_TOUCH_ID_ERROR: 'TouchIDError',
};
