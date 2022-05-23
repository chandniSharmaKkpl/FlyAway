/* eslint-disable no-lone-blocks */
import React, {useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
//import AuthContext from "../context/AuthContext";
import DeviceInfo from 'react-native-device-info';
//import { getUniqueId, getManufacturer } from "react-native-device-info";
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import {appConstant, alertMsgConstant} from '../constant';
import localDb from '../database/localDb';
import {useToast} from 'react-native-toast-notifications';

///*** Follow this step  */
/*

1. follow the steps from 1 to 4 
https://rnfirebase.io/ 

Add these pods in ios pod file 
 pod 'Firebase/Core'
 pod 'Firebase/Messaging'
 Do android specific changes as shown in the link 
 
*/
var isSuccessMsgShow = false;

function PushController(props) {
  const toast = useToast();
  useEffect(() => {
    {
      (async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          // console.log('Authorization status:', authStatus);
          const messaging1 = firebase.messaging();
          messaging1.getToken().then(deviceToken => {
            // console.log(' deviceToken for ios ', deviceToken);

            let device_info = {};
            if (deviceToken) {
              device_info.device_token = deviceToken ? deviceToken : '';
            }
            DeviceInfo.syncUniqueId().then(uniqueId => {
              device_info.device_uuid = uniqueId;
            });

            if (Platform.OS === 'android') {
              device_info.device_type = 'android';
            } else {
              device_info.device_type = 'ios';
            }
            DeviceInfo.getDeviceName().then(deviceName => {
              device_info.device_name = deviceName;
            });

            props.getDeviceInfo(device_info);
          });
        } else {
        }
      })();

      const unsubscribe = messaging().onMessage(async remoteMessage => {
        if (
          remoteMessage &&
          remoteMessage.data &&
          remoteMessage.data.authenticate
        ) {
          let dictAuthenticate = JSON.parse(remoteMessage.data.authenticate);

          if (dictAuthenticate.status === 'SUCCESS') {
            let userId = dictAuthenticate.userId;
            // localDb.setUserId(userId);
            if (userId) {
              const tempUser = localDb.getUser();

              Promise.resolve(tempUser).then(response => {
                let tempDict = response;
                tempDict.userId = userId;

                localDb.setUser(tempDict);

                props.navigation.navigate(appConstant.DRAWER_NAVIGATOR);
                // if (!isSuccessMsgShow)
                {
                  isSuccessMsgShow = true;
                  toast.show(remoteMessage.notification.body, {
                    type: alertMsgConstant.TOAST_SUCCESS,
                  });
                }
              });
            } else {
              toast.show('Userid not receiving', {
                type: alertMsgConstant.TOAST_DANGER,
              });
            }
          }
        } else {
          toast.show('Authentication Issue', {
            type: alertMsgConstant.TOAST_DANGER,
          });
        }
      });

      const backgndHandler = messaging().setBackgroundMessageHandler(
        async remoteMessage => {
          if (
            remoteMessage &&
            remoteMessage.data &&
            remoteMessage.data.authenticate
          ) {
            let dictAuthenticate = JSON.parse(remoteMessage.data.authenticate);

            if (dictAuthenticate.status === 'SUCCESS') {
              let userId = dictAuthenticate.userId;
              // localDb.setUserId(userId);
              // console.log('userid -->', userId);
              const tempUser = localDb.getUser();

              Promise.resolve(tempUser).then(response => {
                let tempDict = response;
                tempDict.userId = userId;
                console.log(' in push notification -===--', remoteMessage);
                localDb.setUser(tempDict);

                props.navigation.navigate(appConstant.DRAWER_NAVIGATOR);
                let tempAtuhtenticate = dictAuthenticate;
                tempAtuhtenticate.status = null;
                dictAuthenticate = tempAtuhtenticate;
                toast.show(remoteMessage.notification.body, {
                  type: alertMsgConstant.TOAST_SUCCESS,
                });
              });
            }
          } else {
            toast.show('Authentication Issue', {
              type: alertMsgConstant.TOAST_DANGER,
            });
          }
        },
      );
      return () => {
        unsubscribe;
        backgndHandler;
      };
    }
  }, []);

  return null;
}

export default PushController;
