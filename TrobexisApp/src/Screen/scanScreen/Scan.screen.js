import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  BackHandler,
  Linking,
  Dimensions,
  Pressable,
} from 'react-native';
import stylesHome from '../home/Home.style';
import {HeaderCustom} from '../../component';
import {appConstant} from '../../constant';
import styles from './Scan.style';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import commonStyle from '../../common/common.style';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const iconScanColor = 'blue';

const Scan = props => {
  const handleBackButtonClick = () => {
    moveBack();
    return true;
  };

  onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );
    console.log('success ==>', e);
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

  const makeSlideOutTranslation = (translationType, fromValue) => {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18,
      },
      to: {
        [translationType]: fromValue,
      },
    };
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
          cameraStyle={{height: SCREEN_HEIGHT}}
          showMarker
          markerStyle={{
            borderColor: 'white',
            borderRadius: 20,
            height: 200,
            width: 200,
          }}
          customMarker={
            <View style={styles.rectangleContainer}>
              <View style={styles.topOverlay}>
              <Text>
                {''}
              </Text>
            </View>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.leftAndRightOverlay} />

                <View style={styles.rectangle}>
                  <Icon
                    name="ios-qr-scanner"
                    size={SCREEN_WIDTH * 0.6}
                    color={iconScanColor}
                  />
                  <Animatable.View
                    style={styles.scanBar}
                    direction="alternate-reverse"
                    iterationCount="infinite"
                    duration={1700}
                    easing="linear"
                    animation={makeSlideOutTranslation(
                      'translateY',
                      SCREEN_WIDTH * -0.54,
                    )}
                  />
                </View>

                <View style={styles.leftAndRightOverlay} />
              </View>

              <View style={styles.topOverlay}>
                <Text style={{fontSize: 17, color: 'white'}}>
                  Place the QR Code Inside the Frame
                </Text>
                <View style={{marginTop: 50}}>
                  <Pressable
                    style={[commonStyle.yellowButton, styles.btnSubmit]}>
                    <Text style={[commonStyle.yellowButtonTitle]}>Scan</Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.bottomOverlay} />
            </View>
          }
        />
      </View>
    </>
  );
};

export default Scan;
