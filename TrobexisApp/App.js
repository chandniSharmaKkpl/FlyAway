/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import React, {useEffect} from 'react';
import {StatusBar, useColorScheme, SafeAreaView} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import {StoreRoot} from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import NavigationSetup from './src/route/Navigators';
import SplashScreen from 'react-native-splash-screen';
import AuthContext from './src/context/AuthContext';
import Toast, {ToastProvider} from 'react-native-toast-notifications';
import {navigationRef} from './src/Navigator/RootNavigation';
import appColor from './src/constant/colorConstant';
import {
  listenOrientationChange as lor,
  removeOrientationListener as rol,
  getOrientation,
} from './src/responsiveScreen';

const App = () => {
  const [orientation, setOrientation] = React.useState('portrait');

  const [showDialog, setShowDialog] = React.useState(false);

  const isDarkMode = useColorScheme() === 'dark';
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    // console.log('setOrientation', orientation);
    lor(setOrientation);
    return () => {
      rol();
    };
  }, []);

  const backgroundStyle = {
    flex: 1,
    // backgroundColor: isDarkMode ? Colors.NAVY_BLUE : Colors.lighter,
    backgroundColor:
      getOrientation() === 'portrait' ? appColor.NAVY_BLUE : appColor.WHITE,
  };

  return (
    // <SafeAreaView>
    <SafeAreaProvider style={backgroundStyle}>
      <ToastProvider>
        <AuthContext.Provider value={{user, setUserData: setUser}}>
          {/* <DialogContext.Provider
          value={{setDialogOpen: open => setShowDialog(open)}}>
          {showDialog && <AlertView />} */}
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Provider store={StoreRoot}>
            <NavigationContainer ref={navigationRef}>
              <NavigationSetup />
            </NavigationContainer>
          </Provider>
          {/* </DialogContext.Provider> */}
        </AuthContext.Provider>
        <Toast ref={ref => (global.toast = ref)} />
      </ToastProvider>
    </SafeAreaProvider>
    // </SafeAreaView>
  );
};

export default App;
