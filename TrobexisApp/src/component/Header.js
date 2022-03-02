import React, {useEffect} from 'react';
import {
  View,
  TextInput,
  Image,
  Text,
  Pressable,
  Platform,
  BackHandler,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {appConstant, imageConstant, appColor, fontConstant} from '../constant';
import {
  useNavigation,
  useRoute,
  useNavigationState,
} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';


const HeaderCustom = props => {
  var countBack = 0;

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

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', handleBackInHeader);
  //   return function cleanup() {
  //     BackHandler.removeEventListener(
  //       'hardwareBackPress',
  //       handleBackInHeader(),
  //     );
  //   };
  // }, []);

  const handleBackInHeader = () => {
    // console.log(' navigation---->', props);
    // if (
    //   props.viewName === appConstant.HOME_SCREEN ||
    //   props.viewName === appConstant.BUS_BOOKING ||
    //   props.viewName === appConstant.HISTORY
    // ) {
    //   countBack = countBack + 1;
    //   console.log(' back count  in home ', countBack);
    //   if (countBack > 1) {
    //     props.setAlertShowFromHeader(true);
    //   }
    //   return true;
    // } else {
    //   props.viewProps.navigation.goBack();
    //   return true;
    // }
  };

  return (
    <View
      style={
        Platform.OS === 'android'
          ? styles.topHeaderStyleAndroid
          : styles.topHeaderStyleIos
      }>
      <Pressable
        style={[
          DeviceInfo.isTablet()
            ? styles.iconHeaderTab
            : styles.iconHeaderMoblie,
        ]}
        onPress={onClickLeftIcon}>
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

const styles = {
  topHeaderStyleIos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp('10%'),
    backgroundColor: appColor.NAVY_BLUE,
  },
  topHeaderStyleAndroid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp('7%'),
    backgroundColor: appColor.NAVY_BLUE,
  },
  iconHeaderTab: {
    height: hp('2.5%'),
    width: wp('8%'),
    marginTop: Platform.OS === 'android' ? hp('2%') : hp('6%'),
    marginLeft: Platform.OS === 'android' ? wp('2.6%') : wp('3.5%'),
  },
  iconHeaderMoblie: {
    height: hp('2.5%'),
    width: wp('8%'),
    marginTop: Platform.OS === 'android' ? hp('2%') : hp('6%'),
    marginLeft: wp('4%'),
  },

  styleBell: {
    height: hp('3%'),
    width: wp('8%'),
    marginTop: Platform.OS === 'android' ? hp('2%') : hp('6%'),
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

    marginTop: Platform.OS === 'android' ? hp('-1%') : hp('4%'),
  },
};
