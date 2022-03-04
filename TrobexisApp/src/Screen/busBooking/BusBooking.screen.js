import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  BackHandler,
} from 'react-native';
import stylesHome from '../home/Home.style';
import styles from './BusBooking.style';
import stylesCommon from '../../common/common.style';
import format from 'date-fns/format';
import PushController from '../../component/PushControllerTemp';
import {WebView} from 'react-native-webview';
import localDb from '../../database/localDb';

import {
  HeaderCustom,
  BookingCard,
  CustomTextInput,
  Calendar,
  Loader,
} from '../../component';
import {useSelector, useDispatch} from 'react-redux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {appColor, appConstant, imageConstant} from '../../constant';
import {requestToGetItinaryList} from '../home/Home.action';
import {requestToGetBusStop} from './BusBooking.action';

const BusBookingScreen = props => {
  const [arrayBooking, setArrayBooking] = useState([1]); // All bookings data will get in this array
  const [isCalendarShow, setIsCalendarShow] = useState(false); // Calendar view show/hide when click on calendar icon
  const [selectedDate, setSelectedDate] = useState(''); // Assign calendar selected date
  const [fromLoc, setFromLoc] = useState('034'); // From location
  const [toLoc, setToLoc] = useState('bwb'); // To location

  const dispatch = useDispatch(); // Calling api
  const response = useSelector(state => state.BusBookingReducer); // Getting api response
  const responseItinaryList = useSelector(state => state.HomeReducer); // Getting api response
  const [deviceInfo, setDeviceInfo] = useState({}); // Getting user device info from push controller.
  const [busBookingUrl, setBusBookingUrl] = useState(null);
  const [loading, setLoading] = React.useState(true);

  const onClickBookingCard = useCallback(itinaryDetail => {
    props.navigation.navigate(appConstant.SITE_ITINARY, {
      viewName: appConstant.BUS_BOOKING,
      itinaryDetail: itinaryDetail,
    });
  }, []);

  const handleBackButtonClick = () => {
    return true;
  };
  // Getting device info from push controller
  const getDeviceInfo = value => {
    console.log(' device info ----->', value);
    setDeviceInfo(value);
  };
  const hideSpinner = () => {
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      let date = new Date();
      let currentDate = format(date, 'EEEE, MMMM dd yyyy');
      setSelectedDate(currentDate);
      //  dispatch(requestToGetItinaryList())
    });
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
      unsubscribe;
    };
  }, []);

  React.useEffect(() => {
    const tempUser = localDb.getUser();
    Promise.resolve(tempUser).then(response => {
      if (response) {
        console.log(' response --', response);
        if (response.responseLoginUrl) {
          let tempUrl = ''; //'https://app-aue.trobexisuat.com/TONEAPPUAT/MobileApp/MobileFunctions.aspx?key=20220303112522419a7ec0496e6b749799ff6d2f429894a363&action=BUSBOOKING';  //response.responseLoginUrl;

          tempUrl =
            response.apiBaseUrl +
            response.client +
            '/MobileApp/MobileFunctions.aspx?key=' +
            response.clientToken +
            '&action=BUSBOOKING';
          console.log(' url ---', tempUrl);
          setBusBookingUrl(tempUrl);
        } else {
          setBusBookingUrl(response.loginUrl);
        }
      }
    });
  }, []);

  const renderItem = item => {
    return (
      <Pressable onPress={() => onClickBookingCard(item.item)}>
        <BookingCard
          item={item.item}
          titleColor={appColor.NAVY_BLUE}
          viewName={appConstant.BUS_BOOKING}
        />
      </Pressable>
    );
  };

  const onClickCalendarDate = async selectedDay => {
    let dateString1 = selectedDay.dateString;
    let dateTemp = Date.parse(dateString1);
    let currentDate = format(dateTemp, 'EEEE, MMMM dd yyyy');
    await setSelectedDate(currentDate);
  };

  const onClickCalendarIcon = () => {
    if (isCalendarShow) {
      let dictTemp = {travelDate: convertDate(selectedDate)};
      dispatch(requestToGetBusStop(dictTemp));
    }
    setIsCalendarShow(!isCalendarShow);
  };

  const onClickRightIcon = useCallback(() => {
    props.navigation.navigate(appConstant.NOTIFICATIONS);
  }, []);

  const convertDate = date => {
    let convertedDate = '';

    let dateTemp = Date.parse(selectedDate);
    convertedDate = format(dateTemp, "yyyy'-'MM'-'dd'T'HH':'mm':'ss");
    console.log(' converted date is ', convertedDate);
    return convertedDate;
  };

  return (
    <>
      <WebView
        onLoad={() => hideSpinner()}
        style={styles.webview}
        source={{
          uri: busBookingUrl,
        }}></WebView>
      {/* <TextInput 
            value={route && route.params && route.params.loginUrl? route.params.loginUrl: loginUrl}
            style={styles.tokenStyle}
            multiline={true}
          /> */}
      <Pressable
        style={styles.iconHeader}
        onPress={() => props.navigation.goBack()}>
        <Image
          style={{width: '100%', height: '100%'}}
          resizeMode={'contain'}
          source={imageConstant.IMAGE_ARROW_BACK}
        />
      </Pressable>

      {loading && (
        <Loader viewName={appConstant.BUS_BOOKING} loading={loading} />
      )}
      <PushController
        getDeviceInfo={getDeviceInfo}
        navigation={props.navigation}
      />
    </>
  );

  return (
    <>
      {/* {console.log(" response is in busbooking screen", response, "Itinary list", responseItinaryList)} */}

      <View style={stylesHome.container}>
        <HeaderCustom
          title={'Make a Booking'}
          viewName={appConstant.BUS_BOOKING}
          leftIcon={true}
          rightIcon={true}
          centerTitle={true}
          onClickRightIcon={onClickRightIcon}
          rightIconImage={''}
          viewProps={props}
        />
        <View>
          <Text style={stylesCommon.textHeading}>Make a Booking</Text>

          <View style={styles.viewCalendar1}>
            <CustomTextInput
              title={selectedDate}
              rightIcon={
                !isCalendarShow
                  ? imageConstant.IMAGE_CALENDAR_BLACK
                  : imageConstant.IMAGE_CLOSE
              }
              width={wp('90%')}
              onClickRightIcon={onClickCalendarIcon}
            />
          </View>

          {isCalendarShow ? (
            <View style={styles.viewCalendar}>
              <Calendar onDayPress={onClickCalendarDate} />
            </View>
          ) : null}

          <View style={styles.viewButtonTextInput}>
            <View style={styles.buttonYellow}>
              <Text style={styles.buttonTitle}>From:</Text>
            </View>
            <View style={styles.viewFromText}>
              <CustomTextInput
                title={'Butler Park(034)'}
                rightIcon={imageConstant.IMAGE_PATH}
                // width={wp('72%')}
              />
            </View>
          </View>

          <View style={styles.viewButtonTextInput}>
            <View style={styles.buttonYellow}>
              <Text style={styles.buttonTitle}>To:</Text>
            </View>
            <View style={styles.viewFromText}>
              <CustomTextInput
                title={'Barrow Island(BWB)'}
                rightIcon={imageConstant.IMAGE_PATH}
                // width={wp('72%')}
              />
            </View>
          </View>

          <Pressable
            style={styles.buttonSearchBus}
            onPress={() =>
              props.navigation.navigate(appConstant.PICK_A_BUS, {
                busBookingData: {
                  pickuplocationcode: fromLoc,
                  dropofflocationcode: toLoc,
                  travelDate: convertDate(selectedDate),
                },
              })
            }>
            <Text style={styles.buttonSearchBusTitle}>Search Buses</Text>
          </Pressable>
        </View>
        <View>
          <Text style={stylesCommon.textHeading}>Upcoming Journeys</Text>
          {/* Booking list  */}
          {responseItinaryList &&
          Array.isArray(responseItinaryList.itinaryListAllJourney) &&
          responseItinaryList.itinaryListAllJourney.length > 0 ? (
            <View style={{alignSelf: 'center', height: hp('40%')}}>
              <FlatList
                renderItem={renderItem}
                horizontal={true}
                data={responseItinaryList.itinaryListAllJourney}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : null}
        </View>
      </View>
    </>
  );
};

export default BusBookingScreen;
