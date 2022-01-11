import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  BackHandler,
  ScrollView,
  Pressable,
} from 'react-native';
import stylesHome from '../home/Home.style';
import stylesCommon from '../../common/common.style';
import styles from './JourneyDetail.style';
import {
  HeaderCustom,
  BookingCard,
  AlertView,
  Loader,
  backHandler,
} from '../../component';
import {useSelector, useDispatch} from 'react-redux';
import {Avatar} from 'react-native-elements';
import localDb from '../../database/localDb';
import {
  appColor,
  appConstant,
  imageConstant,
  alertMsgConstant,
} from '../../constant';
import {getDateInFormat, msToTime} from '../../common';
import {useRoute, useNavigation} from '@react-navigation/core';

import {requestToGetJourneyDetail} from './JourneyDetail.action';
import {getTimeInFormat} from '../../component/BookingCard';

const JourneyDetail = props => {
  const [isAlertShow, setIsAlertShow] = useState(false);
  const route = useRoute();
  const dispatch = useDispatch();
  const responseDetail = useSelector(state => state.JourneyDetailReducer);
  const [isApiCall, setIsApiCall] = useState(false);
  const [travellerName, seTtravellerName] = useState('');
  const [busBooking, setBusBooking] = useState('');
  const [travellerDetailDate, setTravellerDetailDate] = useState('');
  const [tvr, setTvr] = useState('');
  const [arrayRoutes, setArrayRoutes] = useState([]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      const tempUser = localDb.getUser();
      Promise.resolve(tempUser).then(response => {
        let param = {
          itineraryId: route.params.itineraryId ? route.params.itineraryId : '',
          user: response,
          navigation: props.navigation,
        };
        setIsApiCall(true);
        dispatch(requestToGetJourneyDetail(param));
      });
    });

    //  BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      // BackHandler.removeEventListener(
      //   'hardwareBackPress',
      //   handleBackButtonClick,
      // );
      unsubscribe;
    };
  }, []);
  const handleBackButtonClick = () => {
    moveBack();
    return true;
  };
  const moveBack = () => {
    props.navigation.goBack();
  };
  const returnRowView = (title, subTitle) => {
    return (
      <View style={styles.viewRow}>
        <Text style={styles.textBlue}>{title}</Text>
        <Text style={styles.textSubTitle}>{subTitle}</Text>
      </View>
    );
  };

  const calculateTime = (startTime, endTime) => {
    let differenceTime = 'Total Time ';
    let date1 = new Date(startTime);
    let date2 = new Date(endTime);
    differenceTime = date2.getTime() - date1.getTime();
    let strTime = msToTime(differenceTime);
    return "Total Time " + strTime;
  };

  const itemViews = (item, type, index) => {
    let iconImage = '';
    let isNoShowBtnVisible = false; // This flag is using to show no show button for flights only 

    if (item.Type === appConstant.CHARTER_FLIGHT) {
      isNoShowBtnVisible = true;
      iconImage = imageConstant.IMAGE_PLANE;
    } else if (item.Type === appConstant.CAMP_ACCOMODATION) {
      isNoShowBtnVisible = false;
      iconImage = imageConstant.IMAGE_BED;
    } else {
      iconImage = imageConstant.IMAGE_BUS_WHITE;
    }

    return (
      <View style={styles.viewRowOutSide}>
        {/* Side bus view  */}
        <View style={styles.viewLeftLine}>
          <View
            style={
              item.Type === appConstant.CHARTER_FLIGHT
                ? styles.viewCircleGray
                : styles.viewCircleBlue
            }>
            <View style={styles.viewPlaneImg}>
              <Image
                source={iconImage}
                style={styles.imageSideColomn}
                resizeMode={'contain'}
              />
            </View>
          </View>
        </View>

        {/* Detail Section */}
        <View style={[styles.viewOutSide]}>
          <View style={styles.viewRowTop}>
            <View style={styles.viewLeft}>
              <Text style={styles.textYellow}>
                {item.Details &&
                item.Details.length > 0 &&
                item.Details[0].ServiceProvider
                  ? item.Details[0].ServiceProvider
                  : ''}{' '}
                (
                {item.Details &&
                item.Details.length > 0 &&
                item.Details[0].Flight
                  ? item.Details[0].Flight
                  : ''}
                )
              </Text>

              <Text style={[styles.textBlack]}>
                {item.Details &&
                item.Details.length > 0 &&
                item.Details[0].StartDate
                  ? getDateInFormat(item.Details[0].StartDate, false, true)
                  : ''}
              </Text>
            </View>

           {isNoShowBtnVisible? <Pressable
              style={styles.buttonTextRed}
              onPress={() => {
                setIsAlertShow(true);
              }}>
              <Text style={styles.textNoShow}>No</Text>
              <Text style={styles.textNoShow}>Show</Text>
            </Pressable>:  null }
          </View>
          <View style={styles.viewSingleLine} />

          <View style={styles.viewDepartsAndArrive}></View>
          <View style={styles.viewItinerary}>
            <View style={styles.viewLocation}>
              {item.Type === appConstant.CAMP_ACCOMODATION ? (
                <Text style={styles.textBlueBig}>CheckIn</Text>
              ) : (
                <Text style={styles.textBlueBig}>Departs</Text>
              )}

              <Text style={styles.textBlack}>
                {item.Details &&
                item.Details.length > 0 &&
                item.Details[0].Origin
                  ? item.Details[0].Origin
                  : ''}
              </Text>
              <Text style={styles.textBlack}>
                {item.Details &&
                item.Details.length > 0 &&
                item.Details[0].StartDate
                  ? getTimeInFormat(item.Details[0].StartDate, false, true)
                  : ''}
              </Text>
            </View>

            <View style={{width: '66%', flexDirection: 'row'}}>
              <View style={[styles.viewArrow, {flex: 3}]}>
                <Image
                  resizeMode={'contain'}
                  source={imageConstant.IMAGE_ARROW_RIGHT}
                  style={stylesCommon.image}
                />
              </View>

              <View style={styles.viewRightLocation}>
                {item.Type === appConstant.CAMP_ACCOMODATION ? (
                  <Text style={styles.textBlueBig}>CheckOut</Text>
                ) : (
                  <Text style={styles.textBlueBig}>Arrives</Text>
                )}

                <Text style={styles.textBlack}>
                  {item.Details &&
                  item.Details.length > 0 &&
                  item.Details[0].Destination
                    ? item.Details[0].Destination
                    : ''}
                </Text>
                <Text style={styles.textBlack}>
                  {item.Details &&
                  item.Details.length > 0 &&
                  item.Details[0].EndDate
                    ? getTimeInFormat(item.Details[0].EndDate, false, true)
                    : ''}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={
              item.Type === appConstant.CHARTER_FLIGHT
                ? styles.ViewGrayBottom
                : styles.ViewBlueBottom
            }>
            <Text style={[styles.textWhite, {padding: '2%'}]}>
              {item.Details &&
              item.Details.length > 0 &&
              item.Details[0].StartDate &&
              item.Details[0].EndDate
                ? calculateTime(
                    item.Details[0].StartDate,
                    item.Details[0].EndDate,
                  )
                : 'Total Time'}
            </Text>
          </View>
        </View>

        {index === responseDetail.journeyDetail.Itinerarys.length - 1 ? null : (
          <View style={styles.viewDashedLine}>
            <View style={styles.viewDotted} />
          </View>
        )}
      </View>
    );
  };

  const getDataFromResponse = (responseDetail, type) => {
    if (responseDetail && responseDetail[type]) {
      if (type === 'StartDate') {
        return getDateInFormat(responseDetail[type], true, false);
      } else {
        return responseDetail[type];
      }
    } else {
      return 'N/A';
    }
  };

  return (
    <>
      {backHandler(moveBack)}
      <View style={stylesHome.container}>
        <HeaderCustom
          title={'Travel Itinerary'}
          viewName={appConstant.JOURNEY_DETAIL}
          leftIcon={true}
          onClickLeftIcon={() => moveBack()}
          rightIcon={false}
          centerTitle={true}
          onClickRightIcon={() => {}}
          rightIconImage={''}
          viewProps={props}
        />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.viewSection}>
            {/* Itinerary Details */}
            <Text style={styles.textBlackTitle}>Traveller Details</Text>
            <View style={styles.viewInside2}>
              <View style={styles.viewContainRow}>
                {returnRowView(
                  'Name: ',
                  getDataFromResponse(
                    responseDetail.journeyDetail,
                    'GivenName',
                  ),
                )}
                {returnRowView(
                  'Bus Booking: ',
                  getDataFromResponse(responseDetail.journeyDetail, 'Title'),
                )}
                {returnRowView(
                  'Date: ',
                  getDataFromResponse(
                    responseDetail.journeyDetail,
                    'StartDate',
                  ),
                )}
                {returnRowView(
                  'Travel Request ID: ',
                  getDataFromResponse(
                    responseDetail.journeyDetail,
                    'TravelRequestId',
                  ),
                )}
              </View>
            </View>

            {/* Itinerary Details */}
            <View style={styles.viewItineraryList} />
            <Text style={styles.textBlackTitle}>Itinerary Details</Text>

            {responseDetail &&
            responseDetail.journeyDetail &&
            responseDetail.journeyDetail.Itinerarys &&
            responseDetail.journeyDetail.Itinerarys.length > 0
              ? responseDetail.journeyDetail.Itinerarys.map(function (
                  item,
                  index,
                ) {
                  return itemViews(item, imageConstant.IMAGE_PLANE, index);
                })
              : null}
            {/* {greenButtonView(imageConstant.IMAGE_PLANE)}
            {greenButtonView(imageConstant.IMAGE_PLANE_HORIZONTAL)}
            {blueButtonView(imageConstant.IMAGE_BUS_WHITE)}
            {blueButtonView(imageConstant.BED)} */}
          </View>
        </ScrollView>
        {responseDetail.isRequesting ? (
          <Loader loading={responseDetail.isRequesting} />
        ) : null}
      </View>

      {isAlertShow ? (
        <AlertView
          title={alertMsgConstant.PLEASE_CONFIRM}
          subtitle={alertMsgConstant.CONFIRMATION_NO_SHOW}
          confirmBtnTxt={alertMsgConstant.YES}
          cancelBtnTxt={alertMsgConstant.NO}
          buttonCount={3}
          bigBtnText={'Call the Travel Desk'}
          onPressConfirmBtn={() => {
            setIsAlertShow(false);
          }}
          onPressCancel={() => {
            setIsAlertShow(false);
          }}
          onPressBigBtn={() => {
            setIsAlertShow(false);
          }}
        />
      ) : <View style={{backgroundColor:'pink'}}/>}
    </>
  );
};

export default JourneyDetail;
