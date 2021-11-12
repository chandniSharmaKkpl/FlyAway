import * as React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  View,
  ImageBackground,
  Text,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Avatar} from 'react-native-elements';

import commonStyle from '../common/common.style';
import {imageConstant, appColor, fontConstant, appConstant} from '../constant';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconAntDesgin from 'react-native-vector-icons/AntDesign'; 
import DeviceInfo from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';


export default CustomDrawer = () => {
  const navigation = useNavigation();

  console.log(' navigation object --->', navigation);
  const response = useSelector(state => state.HomeReducer); // Getting api response

  const returnDrawerSection = (title, icon, screenName) => {
    return (
      <View style={styles.drawerSection}>
        <Pressable style={styles.btnDrawer}>

		</Pressable>
		<View style={styles.singleLine}/>
      </View>
    );
  };

  return (
    <View style={styles.appDrawer}>
      <View style={styles.drawer}>
        <View style={styles.viewTop}>
          <ImageBackground
            style={commonStyle.image}
            source={imageConstant.IMAGE_DRAWER_BG}>
            <View style={styles.viewTop1}>
              <View style={{flex: 0.9}} />
              <View style={styles.viewCrossBtn}>
                <Pressable onPress={() => navigation.navigate(appConstant.TAB)}>
                  <IconIonicons name="close-outline" style={styles.iconClose} />
                </Pressable>
              </View>
            </View>

            <View style={styles.viewTitle}>
              <View style={styles.viewImageUser}>
                <Avatar
                  size={DeviceInfo.isTablet() ? 'xlarge' : 'large'}
                  source={imageConstant.IMAGE_USER}
                  onPress={() => console.log('Works!')}
                  activeOpacity={0.7}
                />
              </View>
              <View style={{paddingLeft: wp('12%')}}>
                <Text style={styles.textUserNameTop}>
                  {response.userProfile && response.userProfile.firstname
                    ? response.userProfile.firstname
                    : ''}
                </Text>
              </View>
            </View>
          </ImageBackground>

          {/* Creating Drawer sections */}

          {returnDrawerSection('Scan QR Code',  <IconIonicons name="scan" style={styles.iconClose} /> , appConstant.SCAN)}
		  {returnDrawerSection('Settings',  <IconIonicons name="settings-sharp" style={styles.iconClose} /> , appConstant.SETTING)}
		  {returnDrawerSection('Support',  <IconAntDesgin name="question" style={styles.iconClose} /> , appConstant.SUPPORT)}

        </View>
      </View>

      <View style={styles.viewLogout}>
        <Pressable>
          <View>
            <Image style={commonStyle.image} />
          </View>
          <Text>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
	singleLine:{
  backgroundColor: appColor.GRAY_LIGHT
	},
  drawerSection: {
    backgroundColor: 'pink',
  },
  viewTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
  viewImageUser: {
    width: wp('9%'),
    height: hp('9%'),
    paddingLeft: wp('12%'),
    // justifyContent:'center',
    alignItems: 'center',
  },
  textUserNameTop: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H2_SIZE_BOLD,
    color: appColor.WHITE,
  },

  viewTop1: {
    flexDirection: 'row',
    //flex:1,
    paddingTop: hp('3.3%'),
    paddingRight: wp('2%'),
    //backgroundColor:'orange'
  },
  viewCrossBtn: {
    // width: wp('5%'),
    // height: hp('5%'),
    flex: 0.15,
  },
  iconClose: {
    fontSize: 40,
    color: appColor.WHITE,

    //backgroundColor: 'red',
  },
  iconDrawerMenu: {
    fontSize: 20,
    tintColor: appColor.WHITE,
  },
  viewCircleBlue: {
    backgroundColor: appColor.BLUE_DARK,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  btnDrawer: {
    flexDirection: 'row',
    //backgroundColor:appColor.RED
  },

  textUserName: {
    fontFamily: fontConstant.BARLOW_reg,
    fontSize: fontConstant.TEXT_H1_SIZE_BOLD,
    color: appColor.WHITE,
  },
  viewTop: {
    height: hp('20%'),
    backgroundColor: 'pink',
  },
  imageBgd: {
    width: wp('5%'),
    height: hp('5%'),
  },
  viewUserInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  appDrawer: {
    flex: 1,

    //backgroundColor: '#3389df',
  },
  drawer: {
    flex: 1,
    // marginVertical: 20,
    //backgroundColor:'red'
  },
  drawerLogo: {
    width: '90%',
    height: 80,
    resizeMode: 'contain',
    marginVertical: 10,
    alignSelf: 'center',
    tintColor: '#FFF',
  },
  drawerItem: {
    color: '#FFF',
    paddingVertical: 16,
    flex: 1,
  },
  drawerItemUpdateEmail: {
    color: '#FFF',
    paddingVertical: 19,
    flex: 1,
  },
  btn: {
    width: 140,
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 10,
  },
  appVersion: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFF',
  },
  switch: {
    width: 60,
    height: 30,
    resizeMode: 'contain',
    marginRight: 20,
  },
});
