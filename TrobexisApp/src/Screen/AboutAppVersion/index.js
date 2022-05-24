import React from 'react';
import {View, Text} from 'react-native';
import stylesHome from '../home/Home.style';
import stylesCommon from '../../common/common.style';
import {HeaderCustom, BookingCard} from '../../component';
import {appConstant} from '../../constant';
import DeviceInfo from 'react-native-device-info';
function AboutAppVersion(props) {

  let version = DeviceInfo.getVersion();
  let buildNumber = DeviceInfo.getBuildNumber();

  return (
    <>
      <View style={stylesHome.container}>
        <HeaderCustom
          title={'About'}
          viewName={appConstant.ABOUT_APP_VERSION}
          leftIcon={true}
          rightIcon={false}
          centerTitle={false}
          onClickRightIcon={() => {
            console.log('');
          }}
          rightIconImage={''}
          onClickLeftIcon={() => {
            console.log(' open drawer ');
            props.navigation.toggleDrawer();
          }}
        />

        <Text style={stylesCommon.textHeading}>App Information</Text>
        <View>
          <Text style={stylesCommon.normalText}>Version : {version}</Text>
          <Text style={stylesCommon.normalText}>BuildNumber : {buildNumber}</Text>
          <Text style={stylesCommon.normalText}>Build Release Date: 24/05/2022</Text>
        </View>
      </View>
    </>
  );
}

export default AboutAppVersion;
