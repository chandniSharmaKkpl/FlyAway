import React from 'react';
import { View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/home/Home.screen';
import BusBookingScreen from '../Screen/busBooking/BusBooking.screen';
import HistoryScreen from '../Screen/history/History.screen';
import PickABus from '../Screen/pickABus/PickABus.screen';
import Notifications from '../Screen/Notification/notificationScreen';
import SiteTravelItinary from '../Screen/siteTravelItinary/SiteTravelItinary.screen';
import appConstant from '../constant/appConstant';
import appColor from '../constant/colorConstant';
import imageConstant from '../constant/imageConstant';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName={appConstant.TAB}
      // drawerContent={() => <CustomDrawer />}
      drawerType="slide">
      <Drawer.Screen name="Tab" component={TabNavigator} />
    </Drawer.Navigator>
  );
}

const HomeStack =()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen 
        options={{ headerShown: false }}
        name={appConstant.HOME_SCREEN} component={HomeScreen}/>
      <Stack.Screen 
        options={{ headerShown: false }}
      name={appConstant.PICK_A_BUS} component={PickABus}/>

    <Stack.Screen 
        options={{ headerShown: false }}
      name={appConstant.NOTIFICATIONS} component={Notifications}/>
    </Stack.Navigator>
  )
}
 const BusBookingStack =()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen 
        options={{ headerShown: false }}
        name={appConstant.BUS_BOOKING} component={BusBookingScreen}/>
      <Stack.Screen 
        options={{ headerShown: false }}
      name={appConstant.SITE_ITINARY} component={SiteTravelItinary}/>
    </Stack.Navigator>
  )
 }

function TabNavigator() {
  return (
    <Tab.Navigator
      options={{ tabBarVisible: true }}

      tabBarOptions={{
        activeTintColor: appColor.WHITE,
        inactiveTintColor: appColor.NAVY_BLUE,
        activeBackgroundColor: appColor.NAVY_BLUE,
        inactiveBackgroundColor: appColor.NAVY_BLUE,
      //  showLabel: false ,

        style: {
          backgroundColor: appColor.NAVY_BLUE,
          // paddingBottom: 3
        }
      }}

      sceneAnimationEnabled={false}
      activeColor={appColor.WHITE}
      inactiveColor={appColor.WHITE}
      barStyle={{ backgroundColor: appColor.NAVY_BLUE }}
      initialRouteName={appConstant.HOME_SCREEN}>
      <Tab.Screen name={appConstant.HOME_SCREEN}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({ tintColor }) => (
            <View style={styles.viewImage}>
              <Image source={imageConstant.IMAGE_HOME_WHITE} resizeMode={'contain'} style={styles.image} />

            </View>
          )
        }}
        component={HomeStack} />
      <Tab.Screen name={appConstant.BUS_BOOKING} component={BusBookingStack} 
      options={{
        // tabBarLabel: 'Bus Booking',
        tabBarIcon: ({ tintColor }) => (
          <View style={styles.viewImage}>
            <Image source={imageConstant.IMAGE_BUS_WHITE} resizeMode={'contain'} style={styles.image} />
          </View>
        )
      }}
      />
      <Tab.Screen name={appConstant.HISTORY} component={HistoryScreen} 
      options={{
        // tabBarLabel: 'History',
        tabBarIcon: ({ tintColor }) => (
          <View style={styles.viewImage}>
            <Image source={imageConstant.IMAGE_CLOCK_WHITE
            } resizeMode={'contain'} style={styles.image} />

          </View>
        )
      }}
      />
    </Tab.Navigator>
  );
}

function NavigationSetup() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        options={{headerShown: false}}
        name="PickABus"
        component={BusBookingScreen}
      /> */}

      <Stack.Screen
        options={{ headerShown: false }}
        name={appConstant.TAB} component={TabNavigator} />
    </Stack.Navigator>
  );
}

export default NavigationSetup;

const styles = {
  image: {
    width: '100%',
    height: '100%'
  },
  viewImage: {
    width: wp('6%'),
    height: hp('6%')
  }
}