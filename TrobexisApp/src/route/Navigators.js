import React, {useEffect, useState} from 'react';
import {View, Image, Text, Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/home/Home.screen';
import BusBookingScreen from '../Screen/busBooking/BusBooking.screen';
import HistoryScreen from '../Screen/history/History.screen';
import PickABus from '../Screen/pickABus/PickABus.screen';
import Notifications from '../Screen/Notification/notification.screen';
import SiteTravelItinary from '../Screen/siteTravelItinary/SiteTravelItinary.screen';
import AddLuggage from '../Screen/addLuggage/AddLuggage.screen';
import BookingSummary from '../Screen/bookingSummary/BookingSummary.screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appConstant from '../constant/appConstant';
import appColor from '../constant/colorConstant';
import fontConstant from '../constant/fontConstant';
import imageConstant from '../constant/imageConstant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DeviceInfo from 'react-native-device-info';
import LoginScreen from '../Screen/login/Login.screen';
import ForgotPassword from '../Screen/ForgotPassword/ForgotPassword.screen';
import AuthContext from '../context/AuthContext';
import ClientCodeScreen from '../Screen/clientCode/ClientCode.screen';
import ApprovalListScreen from '../Screen/approvalList/ApprovalList.screen';
import localDB from '../database/localDb';
import ReasonScreen from '../Screen/declineReasons/declineReason.screen';
import JourneyList from '../Screen/Jorneys/Journeys.screen';
import ApprovalDetail from '../Screen/approvalDetail/ApprovalDetail.screen';
import JourneyDetail from '../Screen/JourneyDetail/JourneyDetail.screen';
import ApprovalList from '../Screen/approvalList/ApprovalList.screen';
import CustomDrawer from '../route/CustomDrawer';
import Scan from '../Screen/scanScreen/Scan.screen'; 

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const TabObject = createBottomTabNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      name={appConstant.DRAWER_NAVIGATOR}
      initialRouteName={appConstant.TAB}
      drawerContent={() => <CustomDrawer />}
      drawerType="slide">
      
      <Drawer.Screen name={appConstant.HOME_SCREEN} component={HomeScreen} />
      <Drawer.Screen name={appConstant.SCAN} component={Scan} />


      <Drawer.Screen name={appConstant.TAB} component={TabNavigator} />
    </Drawer.Navigator>
  );
}

const AuthStack = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLogin, setIsLogin] = useState(null);

  // When Dashboard page will update for api this will also update
  
  useEffect(() => {
   
    const tempUser = localDB.getUser();
    Promise.resolve(tempUser).then(response => {
      if (response) {
        if (response.loginUrl && response.clientToken) {
          setIsLogin(true)
        }
        setIsLogin(null);
      } else {
        setIsLogin(null);
      }
    });
  }, [currentUser]);

  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        options={{headerShown: false}}
        name={appConstant.APPROVALS}
        component={ApprovalList}
      /> */}

    {/* {!isLogin?  ( */}
    <Stack.Screen
        options={{headerShown: false}}
        name={appConstant.CLIENT_CODE}
        component={ClientCodeScreen}
      />
      {/* ): */}
{/* ( */}
      <Stack.Screen
        options={{headerShown: false}}
        name={appConstant.LOGIN}
        component={LoginScreen}
      />
      {/* ) } */}

      <Stack.Screen
        options={{headerShown: false}}
        name={appConstant.DRAWER_NAVIGATOR}
        component={DrawerNavigator}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={appConstant.FORGOT_PASSWORD}
        component={ForgotPassword}
      />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name={appConstant.HOME_SCREEN}
        component={HomeScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={appConstant.JOURNEY_LIST}
        component={JourneyList}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={appConstant.JOURNEY_DETAIL}
        component={JourneyDetail}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={appConstant.NOTIFICATIONS}
        component={Notifications}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={appConstant.APPROVALS}
        component={ApprovalListScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={appConstant.APPROVAL_DETAIL}
        component={ApprovalDetail}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={appConstant.REASON}
        component={ReasonScreen}
      />
    </Stack.Navigator>
  );
};

const BusBookingStack = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        options={{headerShown: false}}
        name={appConstant.BOOKING_SUMMARY}
        component={BookingSummary}
      /> */}
      <Stack.Screen
        options={{headerShown: false}}
        name={appConstant.BUS_BOOKING}
        component={BusBookingScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={appConstant.SITE_ITINARY}
        component={SiteTravelItinary}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={appConstant.PICK_A_BUS}
        component={PickABus}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={appConstant.ADD_LUGGAGE}
        component={AddLuggage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={appConstant.BOOKING_SUMMARY}
        component={BookingSummary}
      />
    </Stack.Navigator>
  );
};

function TabNavigator() {
  return (
    <TabObject.Navigator
      name={appConstant.TAB}
      options={{tabBarVisible: true}}
      tabBarOptions={{
        activeTintColor: appColor.WHITE,
        inactiveTintColor: appColor.NAVY_BLUE,
        activeBackgroundColor: appColor.NAVY_BLUE,
        inactiveBackgroundColor: appColor.NAVY_BLUE,
        showLabel: false,
        style: styles.tabBar,
      }}
      sceneAnimationEnabled={false}
      activeColor={appColor.WHITE}
      inactiveColor={appColor.WHITE}
      barStyle={{backgroundColor: appColor.NAVY_BLUE}}
      initialRouteName={appConstant.HOME_SCREEN}>
      <TabObject.Screen
        name={appConstant.HOME_SCREEN}
        options={{
          tabBarIcon: ({tintColor, focused}) => (
            <>
              <View style={styles.viewImage}>
                <Image
                  source={imageConstant.IMAGE_HOME_WHITE}
                  resizeMode={'contain'}
                  style={styles.image}
                />
              </View>
              <Text style={styles.tabBarLabel}>
                {focused ? appConstant.HOME_SCREEN : ''}
              </Text>
            </>
          ),
        }}
        component={HomeStack}
      />
      <TabObject.Screen
        name={appConstant.BUS_BOOKING}
        component={BusBookingStack}
        options={{
          tabBarIcon: ({tintColor, focused}) => (
            <>
              <View style={styles.viewImage}>
                <Image
                  source={imageConstant.IMAGE_BUS_WHITE}
                  resizeMode={'contain'}
                  style={styles.image}
                />
              </View>
              <Text style={styles.tabBarLabel}>
                {focused ? appConstant.BUS_BOOKING : ''}
              </Text>
            </>
          ),
        }}
      />
      <TabObject.Screen
        name={appConstant.HISTORY}
        component={HistoryScreen}
        options={{
          tabBarIcon: ({tintColor, focused}) => (
            <>
              <View style={styles.viewImage}>
                <Image
                  source={imageConstant.IMAGE_CLOCK_WHITE}
                  resizeMode={'contain'}
                  style={styles.image}
                />
              </View>
              <Text style={styles.tabBarLabel}>
                {focused ? appConstant.HISTORY : ''}
              </Text>
            </>
          ),
        }}
      />
    </TabObject.Navigator>
  );
}

function NavigationSetup() {
  const [currentUser, setCurrentUser] = useState(null);
  // When Dashboard page will update for api this will also update

  useEffect(() => {
    const tempUser = localDB.getUser();
    Promise.resolve(tempUser).then(response => {
      if (response) {
        if (response.userId) {
          setCurrentUser(response);
        }else{
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    });
  }, [currentUser]);

  return (
    <Stack.Navigator
      initialRouteName={appConstant.LOGIN}
      options={{gestureEnabled: true}}>
      {/* {currentUser ? (
        <Stack.Screen
          options={{headerShown: false}}
          name={appConstant.DRAWER_NAVIGATOR}
          component={DrawerNavigator}
        />
      ) : ( */}
        <Stack.Screen
          name={appConstant.AUTH_STACK}
          component={AuthStack}
          options={{
            header: () => null,
            gestureEnabled: false,
            headerTransparent: true,
          }}
        />
       {/* )}  */}
    </Stack.Navigator>
  );
}

export default NavigationSetup;

const styles = {
  tabBarLabel: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_H2_SIZE_REGULAR,
    color: appColor.WHITE,
    // backgroundColor:'pink'
  },
  image: {
    width: '100%',
    height: '100%',
  },
  viewImage: {
    width: wp('6%'),
    height: hp('4.5%'),
    marginTop: Platform.OS === 'android' ? hp('0.5%') : hp('1%'),
    //  backgroundColor:'red',
    // justifyContent: 'flex-end',
  },
  tabBar: {
    height: DeviceInfo.isTablet() ? hp('8%') : hp('10%'),
    backgroundColor: appColor.NAVY_BLUE,
  },
};
