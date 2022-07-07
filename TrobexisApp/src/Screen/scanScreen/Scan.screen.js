import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  BackHandler,
  Linking,
  TouchableOpacity,
} from 'react-native';
import stylesHome from '../home/Home.style';
import {HeaderCustom, BookingCard} from '../../component';
import {Avatar} from 'react-native-elements';
import {appColor, appConstant, imageConstant} from '../../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import stylesCommon from '../../common/common.style';
import styles from './Scan.style';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import commonStyle from '../../common/common.style';
const Scan = props => {
  const handleBackButtonClick = () => {
    moveBack();
    return true;
  };
  onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );
    console.log("success ==>", e);
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  const moveBack = () => {
    props.navigation.goBack();
  };
  return (
    <>
      <View style={stylesHome.container}>
        <HeaderCustom
          title={'Scan'}
          viewName={appConstant.SCAN}
          leftIcon={true}
          onClickLeftIcon={() => moveBack()}
          rightIcon={false}
          centerTitle={true}
          onClickRightIcon={() => {}}
          rightIconImage={''}
        />
        <QRCodeScanner
          onRead={this.onSuccess}
          // flashMode={RNCamera.Constants.FlashMode.torch}
          topContent={
            <Text style={styles.centerText}>
              <Text style={styles.textBold}>Scan QR Code </Text>
            </Text>
          }
          bottomContent={<View />}
        />
        
      </View>
    </>
  );
};

export default Scan;
