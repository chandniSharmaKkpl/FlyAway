/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';

console. disableYellowBox = true

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   });

AppRegistry.registerComponent(appName, () => App);
