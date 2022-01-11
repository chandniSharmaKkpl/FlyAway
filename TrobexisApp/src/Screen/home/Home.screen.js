import React, {useState, useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable
  
} from 'react-native';
import styles from './Home.style';
import {HeaderCustom, BookingCard, Loader, AlertView, backHandler} from '../../component';
import {Avatar} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  alertMsgConstant,
  appColor,
  appConstant,
  imageConstant,
  errorCodeConstant,
} from '../../constant';
import {requestToGetApprovalList, requestToGetUserProfile} from './Home.action';
import localDb from '../../database/localDb';
import DeviceInfo from 'react-native-device-info';

const HomeScreen = props => {
  const errorData = useSelector(state => state.GlobalReducer);
  const response = useSelector(state => state.HomeReducer); // Getting api response
  const dispatch = useDispatch(); // Calling api
  const [arrayBooking, setArrayBooking] = useState([1, 2, 3, 4, 5, 6]);
  const [userProfile, setUserProfile] = useState({});
  const [isAlertShow, setIsAlertShow] = useState(false);
  var countBack = 0;

  setAlertShowFromHeader = value => {
    setIsAlertShow(value);
  };
  useEffect(() => {
  // BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    const unsubscribe = props.navigation.addListener('focus', () => {
      const tempUser = localDb.getUser();
      Promise.resolve(tempUser).then(response => {
        let param = {
          user: response,
          navigation: props.navigation
        };
        dispatch(requestToGetUserProfile(param));
        // dispatch(requestToGetApprovalList(param));
      });
    });
    return () => {
      // BackHandler.removeEventListener(
      //   'hardwareBackPress',
      //   handleBackButtonClick,
      // );
      unsubscribe;
    };
  }, []);

  const handleBackButtonClick = () => {
    countBack = countBack + 1;
 //   console.log(' back count   ', countBack);

    if (countBack > 1) {
      setIsAlertShow(true);
    }
    return true;
  };

  const renderItem = item => {
    return (
      <Pressable
      // onPress={() => props.navigation.navigate(appConstant.BUS_BOOKING_STACK, {
      //   screen: appConstant.SITE_ITINARY,
      //   params: { prevData: item },
      // })}
      >
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
    props.navigation.navigate(appConstant.NOTIFICATIONS);
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

  // React.useEffect(() => {
  //   checkResponseForRedirection();
  // }, [response]);

  // checkResponseForRedirection = () => {
  //   // console.log('Response in home ', ' response', response);

  // if (response && response.error && response.error.message) {
  //     toast.show(response.error.message, {
  //       type: alertMsgConstant.TOAST_DANGER,
  //     });
  //   if (response.error.code === errorCodeConstant.UNAUTHORIZED) {
  //     localDb.setUser(null);
  //     let dict = response.error;
  //     dict.code = null;
  //     response.error = dict;
  //     props.navigation.navigate(appConstant.CLIENT_CODE);
  //  }
  //  //** making message empty so it will not popup again */
  //  let dict = response.error;
  //  dict.message = null;
  //  response.error = dict;
  // }
  // };

  return (
    <>
    {/* {backHandler(handleBackButtonClick)} */}
      {/* {checkResponseForRedirection()} */}
      <View style={styles.container}>
        <HeaderCustom
          title={''}
          viewName={appConstant.HOME_SCREEN}
          leftIcon={true}
          rightIcon={true}
          centerTitle={false}
          onClickRightIcon={onClickRightIcon}
          rightIconImage={''}
          viewProps={props}
          onClickLeftIcon={() => {
            console.log(' open drawer ');
            props.navigation.toggleDrawer();
          }}
          setAlertShowFromHeader={value => setIsAlertShow(value)}
        />
        {/* Title view */}
        <View style={styles.viewTopBackground}>
          <View style={styles.viewTitle}>
            <View style={styles.viewImageUser}>
              <Avatar
                size={DeviceInfo.isTablet() ? 'xlarge' : 'large'}
                source={imageConstant.IMAGE_USER}
                onPress={() => console.log('Works!')}
                activeOpacity={0.7}
              />
            </View>
            <View style={{paddingLeft: wp('12%'), paddingTop: hp('1.2%')}}>
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
        {response.itinaryListAllJourney &&
        response.itinaryListAllJourney.length > 0 ? (
          <View
            style={{
              marginTop: hp('-8%'),
              alignSelf: 'center',
              height: hp('18%'),
            }}>
            <FlatList
              renderItem={renderItem}
              data={response.itinaryListAllJourney}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : null}
        <Text style={styles.textTitleGoes}>Title Goes Here</Text>

        {/* Journeys / Approval and Bus Booking  */}
        <View style={styles.viewContainSmallBox}>
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
                props.navigation.navigate(appConstant.JOURNEY_LIST);
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
                props.navigation.navigate(appConstant.APPROVALS);
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

          {/* <Pressable
            style={[styles.viewSmallBox]}
            onPress={() => onClickBusBooking()}>
            {/* <View style={styles.viewYellowBox}>
                            <Text style={styles.textNumber}>1</Text>
                        </View> */}
          {/* <View style={styles.viewInsideSmallBox}>
              <View style={styles.imageIcon}>
                <Image
                  style={styles.image}
                  resizeMode={'contain'}
                  source={imageConstant.IMAGE_BUS_BLUE}
                />
              </View>
              <Text style={styles.textButtonTitle}>Bus Bookings</Text>
            </View>
          </Pressable>  */}
        </View>

        {response.isRequesting ? (
          <Loader loading={response.isRequesting} />
        ) : null}
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
    </>
  );
};

export default HomeScreen;
