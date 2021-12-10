/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';
import {StoreRoot} from './src/store';
import {handleError} from './src/'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/Screen/home/Home.screen'
import NavigationSetup from './src/route/Navigators';
import SplashScreen from 'react-native-splash-screen';
import AuthContext from './src/context/AuthContext';
import Toast from "react-native-toast-notifications";


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [user, setUser] = React.useState(null);

  useEffect(() => {
        SplashScreen.hide();
      }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider style={backgroundStyle}>
      <AuthContext.Provider value={{ user, setUserData: setUser}}>

      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Provider store={StoreRoot}>
      <NavigationContainer>
           <NavigationSetup />
      </NavigationContainer>
      </Provider>

      </AuthContext.Provider>
      <Toast ref={(ref) => global['toast'] = ref} />

    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
