import PushNotification from "react-native-push-notification";
import React, { useEffect,  useState } from "react";
import { Alert, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
//import AuthContext from "../context/AuthContext";
import DeviceInfo from "react-native-device-info";
//import { getUniqueId, getManufacturer } from "react-native-device-info";

function PushController(props) {
  const [permissions, setPermissions] = useState({});
  // const { user } = React.useContext(AuthContext);
  // const { setUserData } = React.useContext(AuthContext); // for updating user data of authcontext

  // Use effect for android notifications
  useEffect(() => {

    console.log(" use effect  toek n ====");

    PushNotification.configure({

      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        let device_info = {};
        if (token) {

          console.log(" fcm toek n ====", token);

          // Alert.alert("Device Token", token.token, [
          //   {
          //     text: "Dismiss",
          //     onPress: null,
          //   },
          // ]);

          device_info.device_token = token.token;
        }
        DeviceInfo.syncUniqueId().then((uniqueId) => {
          device_info.device_uuid = uniqueId;
          // iOS: "FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9"
          // Android: "dd96dec43fb81c97"
          // Windows: ?
        });

        if (Platform.OS === "android") {
          device_info.device_type = "android";
        } else {
          device_info.device_type = "ios";
        }

        DeviceInfo.getDeviceName().then((deviceName) => {
          device_info.device_name = deviceName;
          // iOS: "Becca's iPhone 6"
          // Android: ?
          // Windows: ?
        });

        props.getDeviceInfo(device_info);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {

        // process the notification here

        // required on iOS only
       // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
      //  console.error("Notiification registration error =====",err.message, err);
      },

      // Android only
      senderID: '57143668188',//AppConstants.constant.SENDER_ID,
      popInitialNotification: true,
      requestPermissions: true,
      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
     
    });

    return () => {};
  }, []);

  // For iOS notifications

  useEffect(() => {
    if (Platform.OS === "ios") {
      PushNotificationIOS.addEventListener("register", onRegistered);

      PushNotificationIOS.addEventListener(
        "registrationError",
        onRegistrationError
      );
      PushNotificationIOS.addEventListener(
        "notification",
        onRemoteNotification
      );

      PushNotificationIOS.requestPermissions().then(
        (data) => {
         // console.log("PushNotificationIOS.requestPermissions", data);
        },
        (data) => {
         // console.log("PushNotificationIOS.requestPermissions failed", data);
        }
      );

      return () => {
        PushNotificationIOS.removeEventListener("register");
        PushNotificationIOS.removeEventListener("registrationError");
        PushNotificationIOS.removeEventListener("notification");
        PushNotificationIOS.removeEventListener("localNotification");
      };
    }
  }, []);

  const sendNotification = () => {
    DeviceEventEmitter.emit("remoteNotificationReceived", {
      remote: true,
      aps: {
        alert: { title: "title", subtitle: "subtitle", body: "body" },
        badge: 1,
        sound: "default",
        category: "REACT_NATIVE",
        "content-available": 1,
        "mutable-content": 1,
      },
    });
  };

  const onRegistered = (deviceToken) => {
    if (deviceToken) {
      //   user.device_token = deviceToken;
       console.log(
         "deviceToken",
         deviceToken
       );
    }
    // DeviceInfo.syncUniqueId().then((uniqueId) => {
    //   user.user_detail.device_uuid = uniqueId;
    //   console.log(
    //     "device_uuid",
    //     uniqueId
    //   );
    //   // iOS: "FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9"
    //   // Android: "dd96dec43fb81c97"
    //   // Windows: ?
    // });

    if (Platform.OS === "android") {
      //  user.device_type = "android";
    } else {
      //  user.device_type = "ios";
    }

    // DeviceInfo.getDeviceName().then((deviceName) => {
    //   user.user_detail.device_name = deviceName;
    //   console.log(
    //     "device_name",
    //     deviceName
    //   );
    //   // iOS: "Becca's iPhone 6"
    //   // Android: ?
    //   // Windows: ?
    // });

    Alert.alert("Registered For Remote Push", `Device Token: ${deviceToken}`, [
      {
        text: "Dismiss",
        onPress: null,
      },
    ]);
  };

  const onRegistrationError = (error) => {
    Alert.alert(
      "Failed To Register For Remote Push",
      `Error (${error.code}): ${error.message}`,
      [
        {
          text: "Dismiss",
          onPress: null,
        },
      ]
    );
  };

  const onRemoteNotification = (notification) => {
    const isClicked = notification.getData().userInteraction === 1;

    const result = `
    Title:  ${notification.getTitle()};\n
    Subtitle:  ${notification.getSubtitle()};\n
    Message: ${notification.getMessage()};\n
    badge: ${notification.getBadgeCount()};\n
    sound: ${notification.getSound()};\n
    category: ${notification.getCategory()};\n
    content-available: ${notification.getContentAvailable()};\n
    Notification is clicked: ${String(isClicked)}.`;

    if (notification.getTitle() == undefined) {
      Alert.alert("Silent push notification Received", result, [
        {
          text: "Send local push",
          onPress: sendLocalNotification,
        },
      ]);
    } else {
      Alert.alert("Push Notification Received", result, [
        {
          text: "Dismiss",
          onPress: null,
        },
      ]);
    }
  };

  const showPermissions = () => {
    if (Platform.OS === "ios") {
      PushNotificationIOS.checkPermissions((permissions) => {
        setPermissions({ permissions });
      });
    }
  };
  return null;
}

export default PushController;
