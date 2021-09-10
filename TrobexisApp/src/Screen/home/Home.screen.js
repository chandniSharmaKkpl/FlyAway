import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  BackHandler,
} from 'react-native';
import styles from './Home.style';
import { HeaderCustom, BookingCard, Loader } from '../../component';
import { Avatar } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { appColor, appConstant, imageConstant } from '../../constant';
import { requestToGetUserProfile } from './Home.action';
import localDB from '../../database/localDb';
import DeviceInfo from 'react-native-device-info';


const HomeScreen = props => {
  const response = useSelector(state => state.HomeReducer); // Getting api response
  const dispatch = useDispatch(); // Calling api

  const [arrayBooking, setArrayBooking] = useState([1, 2, 3, 4, 5, 6]);
  const [userProfile, setUserProfile] = useState({});

  const handleBackButtonClick = () => {
    return true;
  };
  useEffect(() => {

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    dispatch(requestToGetUserProfile());
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

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
    var amPm = ''
    let stringToRead = "";
    if (hour < 12) {
      amPm = "am"
      stringToRead = "Good morning"
    } else {
      amPm = "pm"
      if (hour >= 12 && hour <= 17) {
        stringToRead = "Good Afternoon";
      } else {
        if (hour > 17 && hour <= 24) {
          stringToRead = "Good Evening";
        }
      }
    }
    return stringToRead;
  }

  return (
    <>
    {/* {console.log(" response is in home screen", response)} */}
      <View style={styles.container}>
        <HeaderCustom
          title={''}
          viewName={appConstant.HOME_SCREEN}
          leftIcon={true}
          rightIcon={true}
          centerTitle={false}
          onClickRightIcon={onClickRightIcon}
          rightIconImage={''}
        />
        {/* Title view */}
        <View style={styles.viewTopBackground}>
          <View style={styles.viewTitle}>
            <View style={styles.viewImageUser}>
              <Avatar
                size={DeviceInfo.isTablet() ? "xlarge" : 'large'}
                source={imageConstant.IMAGE_USER}
                onPress={() => console.log('Works!')}
                activeOpacity={0.7}
              />
            </View>
            <View style={{ paddingLeft: wp('12%'), paddingTop: hp('1.2%') }}>
              <Text style={styles.textHello}>Hello {response.userProfile && response.userProfile.firstname ? response.userProfile.firstname:''}!</Text>
              <Text style={styles.textTimeWish}>{getTimeMessage()}</Text>
            </View>
          </View>
        </View>

        {/* Bookinng list  */}
        {response.itinaryList && response.itinaryList.length>0?
        <View
          style={{
            marginTop: hp('-8%'),
            alignSelf: 'center',
            height: hp('18%'),
          }}>
          <FlatList
            renderItem={renderItem}
            data={response.itinaryList}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
         : null } 
        <Text style={styles.textTitleGoes}>Title Goes Here</Text>

        {/* Journeys / Approval and Bus Booking  */}
        <View style={styles.viewContainSmallBox}>
          <View style={styles.viewSmallBox}>
         { response.itinaryListAllJourney && Array.isArray(response.itinaryListAllJourney) &&
                response.itinaryListAllJourney.length?  
            <View style={styles.viewYellowBox}>
              <Text style={styles.textNumber}>
                {response.itinaryListAllJourney.length}
                </Text>
            </View>: null }

            <View style={styles.viewInsideSmallBox}>
              <View style={styles.imageIcon}>
                <Image
                  style={styles.image}
                  resizeMode={'contain'}
                  source={imageConstant.IMAGE_PLANE}
                />
              </View>
              <Text style={styles.textButtonTitle}>Journeys</Text>
            </View>
          </View>

          <View style={styles.viewSmallBox}>
          { response.approvalList && Array.isArray(response.approvalList) &&
                response.approvalList.length?
            <View style={styles.viewYellowBox}>
              <Text style={styles.textNumber}>{response.approvalList.length}</Text>
            </View>: null}
            <View style={styles.viewInsideSmallBox}>
              <View style={styles.imageIcon}>
                <Image
                  style={styles.image}
                  resizeMode={'contain'}
                  source={imageConstant.IMAGE_LIKE}
                />
              </View>
              <Text style={styles.textButtonTitle}>Approvals</Text>
            </View>
          </View>

          <Pressable
            style={[styles.viewSmallBox]}
            onPress={() => onClickBusBooking()}>
            {/* <View style={styles.viewYellowBox}>
                            <Text style={styles.textNumber}>1</Text>
                        </View> */}
            <View style={styles.viewInsideSmallBox}>
              <View style={styles.imageIcon}>
                <Image
                  style={styles.image}
                  resizeMode={'contain'}
                  source={imageConstant.IMAGE_BUS_BLUE}
                />
              </View>
              <Text style={styles.textButtonTitle}>Bus Bookings</Text>
            </View>
          </Pressable>
        </View>
        {response.isRequesting ? <Loader loading={response.isRequesting} /> : null}
      </View>
    </>
  );
};

export default HomeScreen;
