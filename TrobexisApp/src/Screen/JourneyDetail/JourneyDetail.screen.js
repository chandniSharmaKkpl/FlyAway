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
  NotifyMessage,
  Loader,
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
import {getDateInFormat} from '../../common';
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
  const [arrayRoutes, setArrayRoutes] = useState('');

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      const tempUser = localDb.getUser();
      console.log(' rout param', route);
      Promise.resolve(tempUser).then(response => {
        let param = {
          itineraryId: route.params.itineraryId ? route.params.itineraryId : '',
          user: response,
        };
        setIsApiCall(true);
        dispatch(requestToGetJourneyDetail(param));
      });
    });

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
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
  const itemViews = (item, index) => {
    console.log(' item', item, index);

    let iconImage = '';

    if (item.Type === appConstant.CHARTER_FLIGHT) {
      iconImage = imageConstant.IMAGE_PLANE;
    } else if (item.Type === appConstant.CAMP_ACCOMODATION) {
      iconImage = imageConstant.IMAGE_BED;
    } else {
      iconImage = imageConstant.IMAGE_BUS_WHITE;
    }

    return (
      <View style={styles.viewRowOutSide}>
        {/* Side bus view  */}
        <View style={styles.viewLeftLine}>
          <View style={item.Type === appConstant.CHARTER_FLIGHT? styles.viewCircleGreen: styles.viewCircleBlue}>
            <View style={styles.viewPlaneImg}>
              <Image
                source={iconImage}
                style={styles.imageSideColomn}
                resizeMode={'contain'}
              />
            </View>
          </View>
          {/* Single vertical Dashed Line*/}
          {/* ( */}
            <View style={styles.viewDashedLine}>
              <View style={styles.viewDotted} />
            </View>
          {/* ) : null} */}
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
              {/* <Text style={[styles.textBlack]}>{getDateInFormat(response.StartDate, false, true)}</Text> */}
              <Text style={[styles.textBlack]}>
                {item.Details &&
                item.Details.length > 0 &&
                item.Details[0].StartDate
                  ? getDateInFormat(item.Details[0].StartDate, false, true)
                  : ''}
              </Text>
            </View>

            <Pressable
              style={styles.buttonTextRed}
              onPress={() => {
                setIsAlertShow(true);
              }}>
              <Text style={styles.textNoShow}>No</Text>
              <Text style={styles.textNoShow}>Show</Text>
            </Pressable>
          </View>
          <View style={styles.viewSingleLine} />

          {/* View Departs and Arrive */}
          <View style={styles.viewDepartsAndArrive}></View>
          <View style={styles.viewItinerary}>
            <View style={styles.viewLocation}>
              <Text style={styles.textBlueBig}>Departs</Text>

              <Text style={styles.textBlack}>
                {item.Details &&
                item.Details.length > 0 &&
                item.Details[0].Origin
                  ? item.Details[0].Origin
                  : ''}
              </Text>
              {/* <Text style={styles.textBlack}>{getTimeInFormat(response.StartDate)}</Text> */}
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
                <Text style={styles.textBlueBig}>Arrives</Text>

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

                {/* <Text style={styles.textBlack}>{getTimeInFormat(response.StartDate)}</Text> */}
              </View>
            </View>
          </View>

          <View style={styles.ViewGreenBottom}>
            <Text style={[styles.textWhite, {padding: '2%'}]}>
              Total Time: 10m
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const blueButtonView1 = (item, iconImage, index) => {
    return (
      <View style={styles.viewRowOutSide}>
        {/* Side bus view  */}
        {/* Side bus view  */}
        <View style={styles.viewLeftLine}>
          <View style={styles.viewCircleBlue}>
            <View style={styles.viewPlaneImg}>
              <Image
                source={iconImage}
                style={styles.imageSideColomn}
                resizeMode={'contain'}
              />
            </View>
          </View>
          {/* Single vertical Dashed Line*/}
          {iconImage === imageConstant.BED ? null : (
            <View style={styles.viewDashedLine}>
              <View style={styles.viewDotted} />
            </View>
          )}
        </View>

        {/* Detail Section */}
        <View style={[styles.viewOutSide]}>
          <View style={styles.viewRowTop}>
            <View style={styles.viewLeft}>
              <Text style={styles.textYellow}>
                {/* { Array.isArray(response.Itinerarys) && response.Itinerarys.length>0 && response.Itinerarys[0].Details && response.Itinerarys[0].Details.length>0 ? response.Itinerarys[0].Details[0].ServiceProvider: ""} */}
                Trobexis coaches
              </Text>
              {/* <Text style={[styles.textBlack]}>{getDateInFormat(response.StartDate, false, true)}</Text> */}
              <Text style={[styles.textBlack]}>Tuesday, July 20,2021</Text>
            </View>

            <Pressable
              style={styles.buttonTextRed}
              onPress={() => {
                setIsAlertShow(true);
              }}>
              <Text style={styles.textNoShow}>No</Text>
              <Text style={styles.textNoShow}>Show</Text>
            </Pressable>
          </View>
          <View style={styles.viewSingleLine} />

          {/* View Departs and Arrive */}
          <View style={styles.viewDepartsAndArrive}></View>
          <View style={styles.viewItinerary}>
            <View style={styles.viewLocation}>
              <Text style={styles.textBlueBig}>Departs</Text>

              <Text style={styles.textBlack}>
                Butler park
                {/* {response.MyRoute && Array.isArray(response.MyRoute) &&  response.MyRoute.length>0 ?response.MyRoute[0].Departure:""} */}
              </Text>
              {/* <Text style={styles.textBlack}>{getTimeInFormat(response.StartDate)}</Text> */}
              <Text style={styles.textBlack}>12:10pm</Text>
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
                <Text style={styles.textBlueBig}>Arrives</Text>

                <Text style={styles.textBlack}>
                  Barrow island
                  {/* {response.MyRoute && Array.isArray(response.MyRoute) &&  response.MyRoute.length>0 ?response.MyRoute[0].Destination:""} */}
                </Text>
                <Text style={styles.textBlack}>12:10pm</Text>

                {/* <Text style={styles.textBlack}>{getTimeInFormat(response.StartDate)}</Text> */}
              </View>
            </View>
          </View>

          <View style={styles.ViewBlueBottom}>
            <Text style={[styles.textWhite, {padding: '2%'}]}>
              Total Time: 10m
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const checkResponseCode = useCallback(() => {
    if (isApiCall) {
      setIsApiCall(false);
      console.log(' responseDetail -in joureny detail--->', responseDetail);
      if (
        responseDetail.error &&
        Object.keys(responseDetail.error).length !== 0
      ) {
        console.log(' errr', responseDetail);
        NotifyMessage(responseDetail.error);
        return;
      }
      if (responseDetail && responseDetail.journeyDetail) {
        responseDetail.journeyDetail.GivenName
          ? seTtravellerName(responseDetail.journeyDetail.GivenName)
          : null;
        responseDetail.journeyDetail.Title
          ? setBusBooking(responseDetail.journeyDetail.Title)
          : null;
        responseDetail.journeyDetail.StartDate
          ? setTravellerDetailDate(
              getDateInFormat(
                responseDetail.journeyDetail.StartDate,
                true,
                false,
              ),
            )
          : null;
        responseDetail.journeyDetail.TravelRequestId
          ? setTvr(responseDetail.journeyDetail.TravelRequestId)
          : null;
        responseDetail.journeyDetail.Itinerarys
          ? setArrayRoutes(responseDetail.journeyDetail.Itinerarys)
          : null;
      }
    }
  });

  return (
    <>
      {checkResponseCode()}
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
        />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.viewSection}>
            {/* Itinerary Details */}
            <Text style={styles.textBlackTitle}>Traveller Details</Text>
            <View style={styles.viewInside2}>
              <View style={styles.viewContainRow}>
                {returnRowView('Name: ', travellerName)}
                {returnRowView('Bus Booking: ', busBooking)}
                {returnRowView('Date: ', travellerDetailDate)}
                {returnRowView('TVR: ', tvr)}
              </View>
            </View>

            {/* Itinerary Details */}
            <View style={styles.viewItineraryList} />
            <Text style={styles.textBlackTitle}>Itinerary Details</Text>

            {arrayRoutes && arrayRoutes.length > 0
              ? arrayRoutes.map(function (item, index) {
                  console.log('test*********', item.Type, index);

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
      ) : null}
    </>
  );
};

export default JourneyDetail;
