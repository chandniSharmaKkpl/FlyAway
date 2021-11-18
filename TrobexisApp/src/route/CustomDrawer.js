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
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'; 
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'; 
import DeviceInfo from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';

export default CustomDrawer = () => {
  const navigation = useNavigation();

  //console.log(' navigation object --->', navigation);
  const response = useSelector(state => state.HomeReducer); // Getting api response

  const returnDrawerSection = (title, icon, screenName) => {
    return (
      <View style={styles.drawerSection}>
        <Pressable style={styles.btnDrawer}>
          <View style={styles.viewCircleBlue}>{icon}</View>
          <Text style={styles.textDrawerTitle}>{title}</Text>
        </Pressable>
        <View style={styles.singleLine} />
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

          {returnDrawerSection(
            'Scan QR Code',
            <IconIonicons name="scan-sharp" style={styles.iconDrawerMenu} />,
            appConstant.SCAN,
          )}
          {returnDrawerSection(
            'Settings',
            <IconIonicons name="settings-sharp" style={styles.iconDrawerMenu} />,
            appConstant.SETTING,
          )}
          {returnDrawerSection(
            'Support',
            <IconFontAwesome name="question" style={styles.iconDrawerMenu} />,
            appConstant.SUPPORT,
          )}
        </View>
      </View>

      <View style={styles.viewLogout}>
      <Pressable style={styles.btnDrawer}>
          <View >
            <IconMaterial name="logout" style={styles.iconLogout}/>
          </View>
          <Text style={styles.textLogout}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconLogout:{
    fontSize: 25,
    color: appColor.WHITE,
    fontWeight: 'bold'
  },
  viewLogout:{
    backgroundColor: appColor.RED,
    height:hp('8%'), 
  },
  textLogout:{
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_H3_SIZE_BOLD,
    color: appColor.WHITE,
    paddingLeft: wp('1%'),
    fontWeight: 'bold'
  },
  textDrawerTitle: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_H3_SIZE_BOLD,
    color: appColor.NAVY_BLUE,
    paddingLeft: wp('1%'),
    fontWeight: 'bold'
  },
  singleLine: {
    backgroundColor: appColor.LIGH_ORANGE,
    height: hp('0.2%'),
   // paddingBottom:0
  },
  drawerSection: {
    
    height: '25%',
    marginBottom: 5,
  },
  viewTitle: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 15,
    color: appColor.WHITE,
    fontWeight: 'bold'
  },
  viewCircleBlue: {
    backgroundColor: appColor.BLUE_DARK,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDrawer: {
    flexDirection: 'row',
    alignItems: 'center',
    height:'100%',
    paddingLeft:wp('2%')
    //backgroundColor:appColor.RED
  },

  textUserName: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H3_SIZE_BOLD,
    color: appColor.WHITE,
  },
  viewTop: {
    height: hp('20%'),
    //backgroundColor: 'pink',
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
