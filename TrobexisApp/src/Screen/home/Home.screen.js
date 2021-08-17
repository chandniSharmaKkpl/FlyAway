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
import {HeaderCustom, BookingCard, Loader} from '../../component';
import {Avatar} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {appColor, appConstant, imageConstant} from '../../constant';
import {requestToGetAccessToken, requestToGetUserProfile} from './Home.action';
import localDB from '../../database/localDb';

const HomeScreen = props => {
  const response = useSelector(state => state.HomeReducer); // Getting api response
  const dispatch = useDispatch(); // Calling api

  const [arrayBooking, setArrayBooking] = useState([1]);

  const handleBackButtonClick = () => {
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    dispatch(requestToGetAccessToken());
   // checkAccessToken();
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const renderItem = item => {
    return (
      <Pressable>
        <BookingCard
          item={item}
          titleColor={appColor.YELLOW}
          title={'Bus Booking - Butler Park to Barrow Island'}
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
    localDB.setAccessToken(response);
    //console.log(' respionse  ----', response);
    if (response && response.accessToken && Object.keys(response.accessToken).length !== 0) {
        console.log(' in side respionse  ----', response);
      dispatch(requestToGetUserProfile(response.accessToken));
    }
    // For user profile
    if (response && response) {
    }
  };

  return (
    <>
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
                size="large"
                source={imageConstant.IMAGE_USER}
                onPress={() => console.log('Works!')}
                activeOpacity={0.7}
              />
            </View>
            <View style={{paddingLeft: wp('12%'), paddingTop: hp('1.2%')}}>
              <Text style={styles.textHello}>Hello</Text>
              <Text style={styles.textTimeWish}>Good Morning</Text>
            </View>
          </View>
        </View>

        {/* Bookinng list  */}
        <View
          style={{
            marginTop: hp('-8%'),
            alignSelf: 'center',
            height: hp('18%'),
          }}>
          <FlatList
            renderItem={renderItem}
            data={arrayBooking}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <Text style={styles.textTitleGoes}>Title Goes Here</Text>

        {/* Journeys / Approval and Bus Booking  */}
        <View style={styles.viewContainSmallBox}>
          <View style={styles.viewSmallBox}>
            <View style={styles.viewYellowBox}>
              <Text style={styles.textNumber}>1</Text>
            </View>
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
            <View style={styles.viewYellowBox}>
              <Text style={styles.textNumber}>1</Text>
            </View>
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
        {response.isRequesting ? Loader : null}
      </View>
    </>
  );
};

export default HomeScreen;
