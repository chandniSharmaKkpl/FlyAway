import React, {useEffect, useState} from 'react';
import {View, Image, Text, Pressable, Platform, StyleSheet, StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
  getOrientation,
} from '../responsiveScreen';
import {appConstant, imageConstant, appColor, fontConstant} from '../constant';
import DeviceInfo from 'react-native-device-info';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const HeaderCustom = props => {
  var countBack = 0;
  const insets = useSafeAreaInsets();

  const navigation = useNavigation();
  const {
    title,
    leftIcon,
    rightIcon,
    viewName,
    centerTitle,
    onClickRightIcon,
    rightIconImage,
    onClickLeftIcon,
  } = props;
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    console.log('setOrientation custom Header', orientation);

    lor(setOrientation);
    return () => {
      rol();
    };
  }, [orientation]);

  const styles = StyleSheet.create({
    topHeaderStyleIos: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // alignItem: 'center',
      height: hp('10%'),
      paddingTop: 0,
      backgroundColor: appColor.NAVY_BLUE,
      
    },

    topHeaderStyleAndroid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: hp('8%'),
      backgroundColor: appColor.NAVY_BLUE,
    },
    iconHeader: {
      height: getOrientation() === 'portrait' ? hp('2.5%') : hp('4%'),
      width: getOrientation() === 'portrait' ? wp('8%') : wp('6%'),
      marginTop:
        Platform.OS === 'android'
          ? hp('2%')
          : getOrientation() === 'portrait'
          ? hp('6%')
          : hp('3%'),
      marginLeft: DeviceInfo.isTablet() ? wp('2%') : wp('4%'),
    },

    styleBell: {
      height:getOrientation() === 'portrait' ?  hp('3%') :  DeviceInfo.isTablet() ?  hp('4%') : hp('6%'),
      width: getOrientation() === 'portrait' ? wp('4%') : wp('6%'),
      marginTop:
        Platform.OS === 'android'
          ? hp('2%')
          : getOrientation() === 'portrait'
          ? hp('6%')
          : hp('3%'),
      marginRight: wp('4%'),
    },
    styleArrow: {
      height: hp('3%'),
      width: wp('6%'),
      marginTop: Platform.OS === 'android' ? hp('2%') : hp('6%'),
      marginRight: wp('4%'),
    },
    textTitle: {
      fontFamily: fontConstant.BARLOW_BOLD,
      fontSize: fontConstant.TEXT_H2_SIZE_BOLD,
      color: appColor.WHITE,
      flexWrap: 'wrap',
      alignSelf: 'center',

      marginTop:
        Platform.OS === 'android'
          ? hp('-1%')
          : getOrientation() === 'portrait'
          ? hp('4%')
          : hp('0%'),
    },
  });

  return (
    <View
      style={
        Platform.OS === 'android'
          ? styles.topHeaderStyleAndroid
          : styles.topHeaderStyleIos
    }>
      {
        Platform.OS === 'ios' ? (<StatusBar translucent barStyle="light-content" />
        ) : null
      }
      <Pressable style={styles.iconHeader} onPress={onClickLeftIcon}>
        {viewName === appConstant.HOME_SCREEN ||
        viewName === appConstant.BUS_BOOKING ||
        viewName === appConstant.HISTORY ? (
          <Image
            style={{width: '100%', height: '100%'}}
            resizeMode={'contain'}
            source={imageConstant.IMAGE_MENU}
          />
        ) : (
          <Image
            style={{width: '100%', height: '100%'}}
            resizeMode={'contain'}
            source={imageConstant.IMAGE_ARROW_BACK}
          />
        )}
      </Pressable>

      <Text style={styles.textTitle}>{title}</Text>

      {rightIcon ? (
        <Pressable
          style={rightIconImage ? styles.styleArrow : styles.styleBell}
          onPress={onClickRightIcon}>
          <Image
            style={{width: '100%', height: '100%'}}
            resizeMode={'contain'}
            source={
              rightIconImage ? rightIconImage : imageConstant.IMAGE_GROUP_418
            }
          />
        </Pressable>
      ) : (
        <View style={styles.styleArrow} />
      )}
    </View>
  );
};

export default HeaderCustom;
