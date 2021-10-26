import React from "react";
import { ToastAndroid, Platform, View } from "react-native";

 function notifyMessage(msg) {
  return (
    <View>
      {Platform.OS === "android"
        ? ToastAndroid.show(msg, ToastAndroid.SHORT)
        : alert(msg)}
    </View>
  );
}

export default notifyMessage; 