import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ImageBackground,
  Pressable,
  TextInput,
 
  Keyboard,
} from 'react-native';
import TouchID from 'react-native-touch-id';
import localDB from '../database/localDb';

import {
  errorCodeConstant,
  appColor,
  appConstant,
  imageConstant,
  alertMsgConstant,
} from '../constant';


const optionalConfigObject = {
  title: 'Login to Trobexis', // Android
  imageColor: appColor.NAVY_BLUE, // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'Touch sensor', // Android
  sensorErrorDescription: 'Failed', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};

export const checkBioMetricAvailable = (props, user) => {

  TouchID.isSupported(optionalConfigObject)
    .then(biometryType => {
      // Success code
      if (biometryType === 'FaceID') {
        authenticateUsingBioMetric(props, user);
      } else {
        console.log('TouchID is supported.');
        authenticateUsingBioMetric(props,user);
      }
    })
    .catch(error => {
      // Failure code
      showErrorMessage(error);
    });
};

export const authenticateUsingBioMetric = (props,user) => {
  TouchID.authenticate(
    'Verify your identity using biometric authentication',
    optionalConfigObject,
  )
    .then(success => {
      console.log('success biometric', user);
      props.navigation.navigate(appConstant.DRAWER_NAVIGATOR);
      let alertSuccess = user.userId+ " " + alertMsgConstant.AUTHENTICATION_SUCCESS
      toast.show(alertSuccess, {
        type: alertMsgConstant.TOAST_SUCCESS,
      });
    })
    .catch(error => {
      console.log(' error in authenticate ', error);
      showErrorMessage(error);
    });
};

export const showErrorMessage = error => {
  //** Converting error into string so that get the errorCodeName and Message, Display error message to user  */
  let errorStr = String(error);
  let arrayError = errorStr.split(':');

  if (arrayError.length > 0) {
    let errorName = arrayError[0];
    switch (errorName) {
      case errorCodeConstant.LA_AUTHENTICATION_FAILED:
        toast.show(alertMsgConstant.MSG_AUTHENTICATION_FAILED, {
          type: alertMsgConstant.TOAST_DANGER,
        });
        break;
      case errorCodeConstant.LA_USER_CANCEL:
        toast.show(alertMsgConstant.MSG_USER_CANCEL, {
          type: alertMsgConstant.TOAST_DANGER,
        });
        break;
      case errorCodeConstant.LA_USER_FALLBACK:
        toast.show(alertMsgConstant.MSG_USER_FALLBACK, {
          type: alertMsgConstant.TOAST_DANGER,
        });
        break;
      case errorCodeConstant.LA_SYSTEM_CANCEL:
        toast.show(alertMsgConstant.MSG_SYSTEM_CANCEL, {
          type: alertMsgConstant.TOAST_DANGER,
        });
        break;
      case errorCodeConstant.LA_PASSCODE_NOT_SET:
        toast.show(alertMsgConstant.MSG_PASSCODE_NOT_SET, {
          type: alertMsgConstant.TOAST_DANGER,
        });
        break;
      case errorCodeConstant.LA_TOUCHID_NOT_AVAILABLE:
        toast.show(alertMsgConstant.MSG_TOUCHID_NOT_AVAIMSGBLE, {
          type: alertMsgConstant.TOAST_DANGER,
        });
        break;
      case errorCodeConstant.LA_TOUCH_ID_NOT_ENROLLED:
        toast.show(alertMsgConstant.MSG_TOUCH_ID_NOT_ENROLLED, {
          type: alertMsgConstant.TOAST_DANGER,
        });
        break;
      case errorCodeConstant.LA_TOUCH_ID_LOCKOUT:
        toast.show(alertMsgConstant.MSG_TOUCH_ID_LOCKOUT, {
          type: alertMsgConstant.TOAST_DANGER,
        });
        break;
      case errorCodeConstant.LA_UNKNOWN_ERROR:
        toast.show(alertMsgConstant.MSG_UNKNOWN_ERROR, {
          type: alertMsgConstant.TOAST_DANGER,
        });
        break;
      case errorCodeConstant.LA_TOUCH_ID_NOT_SUPPORTED:
        toast.show(alertMsgConstant.MSG_TOUCH_ID_NOT_SUPPORTED, {
          type: alertMsgConstant.TOAST_DANGER,
        });
        break;

      default:
        break;
    }
  } else {
    toast.show(alertMsgConstant.AUTHENTICATION_FAILED, {
      type: alertMsgConstant.TOAST_DANGER,
    });
  }
};
