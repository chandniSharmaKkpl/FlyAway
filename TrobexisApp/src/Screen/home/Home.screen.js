/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  BackHandler,
} from 'react-native';

import styles from './Home.style';
import {
  HeaderCustom,
  BookingCard,
  Loader,
  AlertView,
  backHandler,
} from '../../component';
import {Avatar} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
  getOrientation,
} from '../../responsiveScreen';
import {
  alertMsgConstant,
  appColor,
  appConstant,
  imageConstant,
  errorCodeConstant,
} from '../../constant';
import {useRoute, useNavigation} from '@react-navigation/core';
import {requestToGetApprovalList, requestToGetUserProfile} from './Home.action';
import localDb from '../../database/localDb';
import DeviceInfo from 'react-native-device-info';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { sortList } from '../../common';
const HomeScreen = props => {
  const [orientation, setOrientation] = React.useState('portrait');

  const errorData = useSelector(state => state.GlobalReducer);
  const response = useSelector(state => state.HomeReducer); // Getting api response
  const dispatch = useDispatch(); // Calling api
  const [arrayBooking, setArrayBooking] = useState([1, 2, 3, 4, 5, 6]);
  const [userProfile, setUserProfile] = useState({});
  const [isAlertShow, setIsAlertShow] = useState(false);
  var countBack = 0;

  const route = useRoute();
console.log(route.name);

  useEffect(() => {
    lor(setOrientation);
    return () => {
      rol();
    };
  }, [orientation]);

  // const setAlertShowFromHeader = value => {
  //   setIsAlertShow(value);
  // };
  useEffect(() => {
    //
    const unsubscribe = props.navigation.addListener('focus', () => {
      const tempUser = localDb.getUser();
      Promise.resolve(tempUser).then(response => {
        let param = {
          user: response,
          navigation: props.navigation,
        };

        dispatch(requestToGetUserProfile(param));

        // dispatch(requestToGetApprovalList(param));
      });
    });
    return () => {
      unsubscribe;
    };
  }, []);

  //** Back button handling  */
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const handleBackButtonClick = () => {
    // countBack = countBack + 1;
    // if (countBack > 1)
    {
      setIsAlertShow(true);
    }
    return true;
  };

  const renderItem = item => {
    return (
      <Pressable
        onPress={() =>
          props.navigation.navigate(appConstant.JOURNEY_DETAIL, {
            itineraryId: item.item.id,
          })
        }>
        <BookingCard
          item={item.item}
          titleColor={appColor.YELLOW}
          viewName={appConstant.HOME_SCREEN}
        />
      </Pressable>
    );
  };

  const onClickBusBooking = useCallback(() => {
    props.navigation.navigate(appConstant.BUS_BOOKING);
  }, []);

  const onClickRightIcon = useCallback(() => {
    props.navigation.navigate(appConstant.NOTIFICATIONS, {
      callingView: appConstant.HOME_SCREEN,
    });
  }, []);

  const checkAccessToken = () => {
    // localDB.setAccessToken(response);
  };

  const getTimeMessage = () => {
    var d = new Date();
    var hour = d.getHours();
    var amPm = '';
    let stringToRead = '';
    if (hour < 12) {
      amPm = 'am';
      stringToRead = 'Good Morning';
    } else {
      amPm = 'pm';
      if (hour >= 12 && hour <= 17) {
        stringToRead = 'Good Afternoon';
      } else {
        if (hour > 17 && hour <= 24) {
          stringToRead = 'Good Evening';
        }
      }
    }
    return stringToRead;
  };

  const getValueToShowTile = keyName => {
    if (
      response.userProfile.settings &&
      Array.isArray(response.userProfile.settings) &&
      response.userProfile.settings.length > 0
    ) {
      // Temporary hiding bus tile
      // if (keyName === 'Function.Bus') {
      //   return false;
      // }
      let matchElement = response.userProfile.settings.find(
        item => item.key == keyName,
      );

      if (matchElement.value === 'Y') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <>
      {/* {backHandler(handleBackButtonClick)} */}
      {/* {checkResponseForRedirection()} */}
      {/* <SafeAreaView
        style={{flex: 1, backgroundColor: appColor.NAVY_BLUE}} */}
      {/* edges={['right', 'left', 'top']}> */}
      <View style={styles.container}>
        <HeaderCustom
          title={''}
          viewName={appConstant.HOME_SCREEN}
          leftIcon={true}
          rightIcon={false}
          centerTitle={false}
          onClickRightIcon={onClickRightIcon}
          rightIconImage={''}
          viewProps={props}
          onClickLeftIcon={() => {
            props.navigation.toggleDrawer();
          }}
          // setAlertShowFromHeader={value => setIsAlertShow(value)}
        />
        {/* Title view */}
        <KeyboardAwareScrollView>
          <View style={[styles.viewTopBackground]}>
            <View style={styles.viewTitle}>
              {/* <View style={styles.viewImageUser}>
              <Avatar
                size={DeviceInfo.isTablet() ? 'xlarge' : 'large'}
                source={imageConstant.IMAGE_USER}
                onPress={() => console.log('Works!')}
                activeOpacity={0.7}
              />
            </View> */}
              <View
                style={{
                  paddingLeft:
                    getOrientation() === 'portrait' ? DeviceInfo.isTablet() ? wp('4%') :  wp('5%') : wp('3%'),
                  paddingTop: hp('1.2%'),
                }}>
                <Text style={styles.textHello}>
                  Hello{' '}
                  {response.userProfile && response.userProfile.firstname
                    ? response.userProfile.firstname
                    : ''}
                </Text>
                <Text style={styles.textTimeWish}>{getTimeMessage()}</Text>
              </View>
            </View>
          </View>

          {/* Bookinng list  */}
          {/* {getValueToShowTile('Function.Journey') && */}
          {/* response.itinaryListAllJourney &&
          response.itinaryListAllJourney.length > 0 ? ( */}
          <View
            style={{
              marginTop:
                getOrientation() === 'portrait' ? hp('-8%') : hp('-14%'),
              // alignSelf: 'center',
              height: getOrientation() === 'portrait' ? hp('18%') : hp('30%'),
            }}>
            <FlatList
              renderItem={renderItem}
              data={sortList(response.itinaryListAllJourney, "startdatetime")}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          {/* ) : null} */}
          {/* <Text style={styles.textTitleGoes}>Title Goes Here</Text> */}

          {/* Journeys / Approval and Bus Booking  */}
          <View style={styles.viewContainSmallBox}>
            {getValueToShowTile('Function.Journey') ? (
              <View style={styles.viewSmallBox}>
                {response.itinaryListAllJourney &&
                Array.isArray(response.itinaryListAllJourney) &&
                response.itinaryListAllJourney.length ? (
                  <View style={styles.viewYellowBox}>
                    <Text style={styles.textNumber}>
                      {response.itinaryListAllJourney.length}
                    </Text>
                  </View>
                ) : null}

                <Pressable
                  style={styles.viewInsideSmallBox}
                  onPress={() => {
                    props.navigation.navigate(appConstant.JOURNEY_LIST, {
                      callingView: appConstant.HOME_SCREEN,
                    });
                  }}>
                  <View style={styles.imageIcon}>
                    <Image
                      style={styles.image}
                      resizeMode={'contain'}
                      source={imageConstant.IMAGE_PLANE}
                    />
                  </View>
                  <Text style={styles.textButtonTitle}>Journeys</Text>
                </Pressable>
              </View>
            ) : null}

            {getValueToShowTile('Function.Approval') ? (
              <View style={styles.viewSmallBox}>
                {response.approvalList &&
                Array.isArray(response.approvalList) &&
                response.approvalList.length ? (
                  <View style={styles.viewYellowBox}>
                    <Text style={styles.textNumber}>
                      {response.approvalList.length}
                    </Text>
                  </View>
                ) : null}
                <Pressable
                  style={styles.viewInsideSmallBox}
                  onPress={() => {
                    props.navigation.navigate(appConstant.APPROVALS, {
                      callingView: appConstant.HOME_SCREEN,
                    });
                  }}>
                  <View style={styles.imageIcon}>
                    <Image
                      style={styles.image}
                      resizeMode={'contain'}
                      source={imageConstant.IMAGE_LIKE}
                    />
                  </View>
                  <Text style={styles.textButtonTitle}>Approvals</Text>
                </Pressable>
              </View>
             ) : null} 

            {getValueToShowTile('Function.Bus') ? (
              <View style={styles.viewSmallBox}>
                {/* {response.approvalList &&
                Array.isArray(response.approvalList) &&
                response.approvalList.length ? (
                  <View style={styles.viewYellowBox}>
                    <Text style={styles.textNumber}>
                      {response.approvalList.length}
                    </Text>
                  </View>
                ) : null} */}
                <Pressable
                  style={styles.viewInsideSmallBox}
                  onPress={() => {
                    onClickBusBooking();
                  }}>
                  <View style={styles.imageIcon}>
                    <Image
                      style={styles.image}
                      resizeMode={'contain'}
                      source={imageConstant.IMAGE_BUS_BLUE}
                    />
                  </View>
                  <Text style={styles.textButtonTitle}>Bus Bookings</Text>
                </Pressable>
              </View>
            ) : null}
          </View>

          {response.isRequesting ? (
            <Loader loading={response.isRequesting} />
          ) : null}
        </KeyboardAwareScrollView>
      </View>
      {isAlertShow ? (
        <AlertView
          title={alertMsgConstant.PLEASE_CONFIRM}
          subtitle={alertMsgConstant.ARE_YOU_SURE_TO_LOGOUT}
          confirmBtnTxt={alertMsgConstant.YES}
          cancelBtnTxt={alertMsgConstant.NO}
          buttonCount={2}
          bigBtnText={''}
          onPressConfirmBtn={() => {
            setIsAlertShow(false);
            props.navigation.navigate(appConstant.CLIENT_CODE);

            //BackHandler.exitApp()
          }}
          onPressCancel={() => {
            setIsAlertShow(false);
            countBack = 0;
          }}
          onPressBigBtn={() => {}}
        />
      ) : null}
      {/* </SafeAreaView> */}
    </>
  );
};

export default HomeScreen;
