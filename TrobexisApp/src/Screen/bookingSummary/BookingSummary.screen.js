import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  BackHandler,
  Alert
} from 'react-native';
import stylesHome from '../home/Home.style';
import styles from './BookingSummary.style';
import {HeaderCustom,Loader} from '../../component';

import {Avatar} from 'react-native-elements';
import stylesCommon from '../../common/common.style';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {imageConstant, appColor, appConstant} from '../../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import {requestToPostBooking} from './BookingSummary.action';
import commonStyle from '../../common/common.style';
import {getTimeInFormat} from '../../component/BookingCard';
import {getDateInFormat} from '../../common/index'

const BookingSummary = props => {

 const response = useSelector(state => state.BookingSummaryReducer)
   const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(' booking summary ', props);
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const returnItinaryInfo = (info, isArrive) => {
    let splitStr = info.split('-');
    if (isArrive) {
      return splitStr[0];
    } else {
      return splitStr[1];
    }
  };


  const handleBackButtonClick = () => {
    props.navigation.goBack();
  };

  const onClickBookSeat =()=>{
    
      const {countLuggage, pickABusData} = props.route.params.luggageData;
      console.log(" prev data ", pickABusData)
      let data = {
        'piecesofluggage': countLuggage,
        'travelDate': pickABusData.busBookingData.travelDate,
        'pickuplocationcode':
          pickABusData.busBookingData.pickuplocationcode,
        'dropofflocationcode':
          pickABusData.busBookingData.dropofflocationcode,
        'transportId': pickABusData.selectedBus.item.transportId,
      };

      dispatch(requestToPostBooking(data));
      // props.navigation.navigate(appConstant.HOME_SCREEN)
    
  }

  const checkResponse = useCallback(() => {
    console.log("in check response",response.bookingResponse)
    if (response.bookingResponse && response.bookingResponse.message) {
      
      if ( !response.bookingResponse.success) {
        alert(response.bookingResponse.message);
        let dictTemp = response.bookingResponse;
        dictTemp.message = ""
        props.navigation.popToTop()
      }else{
        Alert.alert("Alert", response.bookingResponse.message, [
          {
            text: "Ok",
            onPress: () =>  {
              let dictTemp = response.bookingResponse;
              dictTemp.message = ""
              props.navigation.popToTop()}
          },
        ]);
      }
    }},
    [response.bookingResponse],
  )

  return (
    <>
    {checkResponse()}
      <View style={stylesHome.container}>
        <HeaderCustom
          title={'Booking Summary'}
          viewName={appConstant.BOOKING_SUMMARY}
          leftIcon={true}
          onClickLeftIcon={() => props.navigation.goBack()}
          rightIcon={false}
          centerTitle={true}
          onClickRightIcon={() => {}}
          rightIconImage={''}
        />
        <Text style={stylesCommon.textHeading}>Booking Summary</Text>

        <View style={[styles.viewOutSide, {justifyContent: 'space-between'}]}>
          <View style={{flexDirection: 'row', padding: '2%'}}>
            {/* View circle and line  */}

            {/* <View style={{backgroundColor: 'pink', height: hp('5%'), width:wp('5%')}}>
             <Image source={imageConstant.IMAGE_TRACK_LOC} style={commonStyle.image}/>
            </View> */}

            {/* Itinary detail */}
            <View style={{paddingLeft: wp('5%')}}>
              <View style={styles.viewLocation}>
                <View>
                  <Text style={styles.rowTtitle}>
                    {getTimeInFormat(
                      props.route.params.luggageData.pickABusData.selectedBus
                        .item.startdatetime,
                    )}
                  </Text>
                  <Text style={styles.textDescription}>Depart</Text>
                </View>
                <Text style={[styles.rowTtitle, {paddingLeft: wp('5%')}]}>
                  {returnItinaryInfo(props.route.params.luggageData.pickABusData.selectedBus
                        .item.title, true)}
                </Text>
              </View>

              <View style={styles.viewLocation}>
                <View>
                  <Text style={styles.rowTtitle}>
                    {getTimeInFormat(
                      props.route.params.luggageData.pickABusData.selectedBus
                        .item.enddatetime,
                    )}
                  </Text>
                  <Text style={styles.textDescription}>arrive</Text>
                </View>
                <Text style={[styles.rowTtitle, {paddingLeft: wp('5%')}]}>
                {returnItinaryInfo(props.route.params.luggageData.pickABusData.selectedBus
                        .item.title, false)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.viewOutSide, {}]}>
          <View style={styles.viewRow}>
            <IconIonicons name="calendar" style={styles.iconRow} />
            <View style={styles.viewDate}>
              <Text style={styles.rowTtitle}>Date</Text>
              <Text style={styles.textDescription}>{getDateInFormat(props.route.params.luggageData.pickABusData.busBookingData.travelDate, true)}</Text>
            </View>
          </View>

          <View style={styles.viewRow}>
            <IconAntDesign name="clockcircle" style={styles.iconRow} />
            <View style={styles.viewDate}>
              <Text style={styles.rowTtitle}>Duration</Text>
              <Text style={styles.textDescription}>{props.route.params.luggageData.pickABusData.selectedBus.item.durationMins}m</Text>
            </View>
          </View>

          <View style={styles.viewRow}>
            <IconIonicons name="ios-bus" style={styles.iconRow} />
            <View style={styles.viewDate}>
              <Text style={styles.rowTtitle}>Route</Text>
              <Text style={styles.textDescription}>
               {props.route.params.luggageData.pickABusData.selectedBus.item.title}
              </Text>
            </View>
          </View>

          <View style={styles.viewRow}>
            <IconEntypo name="briefcase" style={styles.iconRow} />
            <View style={styles.viewDate}>
              <Text style={styles.rowTtitle}>Luggage</Text>
              <Text style={styles.textDescription}>{props.route.params.luggageData.countLuggage} Pieces </Text>
            </View>
          </View>
        </View>

        <Pressable
          style={stylesCommon.yellowButton}
          onPress={() => onClickBookSeat()}>
          <Text
            style={[
              styles.buttonSearchBusTitle,
              stylesCommon.yellowButtonTitle,
            ]}>
            Book a Seat
          </Text>
        </Pressable>
        {response.isRequesting ? <Loader loading={response.isRequesting} /> : null}

      </View>
    </>
  );
};

export default BookingSummary;
