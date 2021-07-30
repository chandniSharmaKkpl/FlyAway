import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/home/Home.screen';
import BusBookingScreen from '../Screen/busBooking/BusBooking.screen';
import HistoryScreen from '../Screen/history/History.screen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName={'Tab'}
      // drawerContent={() => <CustomDrawer />}
      drawerType="slide">
      <Drawer.Screen name="Tab" component={TabNavigator} />
    </Drawer.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      options={{tabBarVisible: true}}
      initialRouteName={'HomeScreen'}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="BusBookingScreen" component={BusBookingScreen} />
      <Tab.Screen name="HistoryScreen" component={HistoryScreen} />
    </Tab.Navigator>
  );
}

function NavigationSetup() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={HomeScreen}
      />

      {/* <Stack.Screen name="Tab" component={TabNavigator} /> */}
    </Stack.Navigator>
  );
}

export default NavigationSetup;
