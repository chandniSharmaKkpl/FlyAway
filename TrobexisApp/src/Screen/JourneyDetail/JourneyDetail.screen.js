/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  BackHandler,
  ScrollView,
  Pressable,
  Platform,
} from 'react-native';
import stylesHome from '../home/Home.style';
import styles from './JourneyDetail.style';
import {HeaderCustom, AlertView, Loader, backHandler} from '../../component';
import {useSelector, useDispatch} from 'react-redux';
import localDb from '../../database/localDb';
import {
  appConstant,
  imageConstant,
  alertMsgConstant,
  appColor,
} from '../../constant';
import {getDateInFormat, msToTime, getDateInFormatNoTime} from '../../common';
import {useRoute} from '@react-navigation/core';
import {
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
  getOrientation,
} from '../../responsiveScreen';
import DeviceInfo, {getDeviceId} from 'react-native-device-info';
import {requestToGetJourneyDetail} from './JourneyDetail.action';
import {getTimeInFormat} from '../../component/BookingCard';
import {supplierType} from '../../utils/supplierType.json';
import {Images} from '../../constant/SvgImgConst';
import moment from 'moment';
import {ConfirmedStatus} from '../../utils/JourneyDetailsStatus';

const JourneyDetail = props => {
  const [orientation, setOrientation] = React.useState('portrait');

  const [isAlertShow, setIsAlertShow] = useState(false);
  const route = useRoute();
  const dispatch = useDispatch();
  const responseDetail = useSelector(state => state.JourneyDetailReducer);
  const responseUser = useSelector(state => state.HomeReducer); // Getting api response

  const [isApiCall, setIsApiCall] = useState(false);
  const [travellerName, seTtravellerName] = useState('');
  const [busBooking, setBusBooking] = useState('');
  const [travellerDetailDate, setTravellerDetailDate] = useState('');
  const [tvr, setTvr] = useState('');
  const [arrayRoutes, setArrayRoutes] = useState([]);
  const [lwidth, setlWidth] = useState(100);
  const [lheight, setlHeight] = useState(102);
  const [status, setStatus] = useState('Confirmed Itinerary');

  const checkStatus = incomingstatus => {
    if (!ConfirmedStatus.includes(incomingstatus)) {
      setTimeout(() => {
        setStatus('Draft Itinerary');
      }, 500);
    }
  };
  console.log(
    'responseDetail +-+-+',
    JSON.stringify(responseDetail.journeyDetail.Itinerarys, null, 4),
  );

  useEffect(() => {
    // console.log('setOrientation', orientation);
    lor(setOrientation);
    return () => {
      rol();
    };
  }, []);

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
    console.log(' alert show ', isAlertShow);
    // eslint-disable-next-line no-lone-blocks
    {
      if (route.params && route.params.callingView) {
        props.navigation.navigate(route.params.callingView);
      } else {
        props.navigation.goBack();
      }
      return true;
    }
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
    return 'Total Time ' + strTime;
  };

  const returnSupplierCodeImage = item => {
    if (item.Details && item.Details.length > 0 && item.Details[0].Flight) {
      let flightStr = item.Details[0].Flight;
      let supplierType1 = flightStr.slice(0, 2);
      console.log('flightStr  ==>', flightStr);
      //let supplierType1;
      //  console.log(" item is supplier code supplierType1 ----> ", supplierType1);
      //supplierType1 = 'AI'
      const image = Images[supplierType1];

      console.log(' item  image ----> ', image);

      return image && image();
    }
    return null;
  };
  {
    /* if(supplierType.AIR_CANADA === appConstant.AIR_CANADA){
      return <Image source={imageConstant.AIR_CANADA} style={{}}/>
    }  else if(supplierType.AIR_FRANCE === appConstant.AIR_FRANCE){
      return <Image source={imageConstant.AIR_FRANCE} style={{}}/>
    }else if(supplierType.AIR_INDIA === appConstant.AIR_INDIA){
      return <Image source={imageConstant.AIR_FRANCE} style={{}}/>
    }else if(supplierType.AIR_NEW_ZEALAND === appConstant.AIR_NEW_ZEALAND){
      return <Image source={imageConstant.AIR_FRANCE} style={{}}/>
    }else if(supplierType.ALASKAN_AIRLINES === appConstant.ALASKAN_AIRLINES){
      return <Image source={imageConstant.ALASKAN_AIRLINES} style={{}}/>
    }else if(supplierType.AMERICAN_AIRLINES === appConstant.AMERICAN_AIRLINES){
      return <Image source={imageConstant.AMERICAN_AIRLINES} style={{}}/>
    }
  } */
  }

  const returnSvgImage = item => {
    if (item.Type === appConstant.CHARTER_FLIGHT) {
      return <Images.IMAGE_CHARTER_FLIGHT_SVG />;
    } else if (item.Type === appConstant.CAMP_ACCOMODATION) {
      if (
        item.Details &&
        Array.isArray(item.Details) &&
        item.Details.length > 0
      ) {
        let dictDetail = item.Details[0];
        if (dictDetail.Classification) {
          let tempC = dictDetail.Classification;
          if (tempC === appConstant.PLATFORM) {
            return <Images.IMAGE_OFFSHORE_SVG />;
          }
          // else if (tempC === appConstant.BED) {
          //   return <IMAGE_SITE_ACCOMODATION_SVG />;
          // }
          else {
            return <Images.IMAGE_SITE_ACCOMODATION_SVG />;
          }
        }
        return <Images.IMAGE_SITE_ACCOMODATION_SVG />;
      }
    } else if (item.Type === appConstant.COMMERCIAL_FLIGHT) {
      return <Images.IMAGE_COMMERCIAL_FLIGHT_SVG />;
    } else if (
      item.type === appConstant.BUS ||
      item.type === appConstant.DRIVE_IN_OUT_TRANSPORT
    ) {
      if (
        item.Details &&
        Array.isArray(item.Details) &&
        item.Details.length > 0
      ) {
        let dictDetail = item.Details[0];
        if (dictDetail.Classification) {
          let tempC = dictDetail.Classification;
          if (tempC === appConstant.BUS || tempC === appConstant.COACH) {
            return <Images.IMAGE_BUS_SVG />;
          } else {
            return <Images.IMAGE_CAR_SVG />;
          }
        }
      }
    } else if (item.type === appConstant.HOTEL) {
      return <Images.IMAGE_HOTEL_SVG />; // because, Hotel Accommodation has all categories in Hotel
    } else if (item.type === appConstant.CAR_HIRE) {
      return <Images.IMAGE_CAR_SVG />;
    } else if (item.type === appConstant.OTHER_GROUND_TRANSPORT) {
      // console.log(' OTHER_GROUND_TRANSPORT ', item);
      if (
        item.Details &&
        Array.isArray(item.Details) &&
        item.Details.length > 0
      ) {
        let dictDetail = item.Details[0];
        if (dictDetail.Classification) {
          let tempC = dictDetail.Classification;
          if (tempC === appConstant.HELICOPTER) {
            return <Images.IMAGE_HELICOPTER_SVG />;
          } else if (tempC === appConstant.WATERCRAFT) {
            return <Images.IMAGE_MARINE_TRANSFER_SVG />;
          } else if (tempC === appConstant.COACH) {
            return <Images.IMAGE_BUS_SVG />;
          }
        }
      }
    } else if (item.type === appConstant.TBA) {
      return <Images.IMAGE_HANDSHAKE_SVG />;
    } else {
      return <Images.IMAGE_BUS_SVG />;
    }
  };

  const ConvertSectoDay = n => {
    var day = parseInt(n / (24 * 3600));
    console.log('------------->');
    n = n % (24 * 3600);
    var hour = parseInt(n / 3600);

    n %= 3600;
    var minutes = n / 60;

    n %= 60;
    var seconds = n;

    let strToSend = '';
    if (day > 0) {
      strToSend = day + ' ' + 'days ';
    }
    if (hour > 0) {
      strToSend = strToSend + ' ' + hour + ' ' + 'hours';
    }
    if (minutes > 0) {
      strToSend = strToSend + ' ' + minutes + ' ' + 'minutes';
    }
    if (seconds > 0) {
      strToSend = strToSend + ' ' + seconds + ' ' + 'seconds';
    }

    return strToSend;
  };

  const itemViews = (item, type, index) => {
    let isNoShowBtnVisible = false; // This flag is using to show no show button for flights only
    // console.log('itemdetals+-+-+', item);
    // const  [width, setWidth]  = useState(200);
    const endDate =
      item.Details[0] && item.Details[0].EndDate ? item.Details[0].EndDate : '';
    const startDate =
      item.Details[0] && item.Details[0].StartDate
        ? item.Details[0].StartDate
        : '';

    var formatStartDate = moment(startDate);
    var formatEndDate = moment(endDate);
    let days = 0;
    let duration = '';
    if (formatStartDate && formatEndDate) {
      days = formatEndDate.diff(formatStartDate, 'days');
      let hours = formatEndDate.diff(formatStartDate, 'hours');
      // let minutes = formatEndDate.diff(formatStartDate, 'minutes');

      let seconds = formatEndDate.diff(formatStartDate, 'seconds');

      if (seconds) {
        duration = ConvertSectoDay(seconds);
        console.log(' duration days------->  ', duration);
      }
    }

    return (
      <View
        style={styles.viewRowOutSide}
        onLayout={event => {
          var {x, y, width, height} = event.nativeEvent.layout;
          console.log('Height =>>', height);
          setlWidth(getOrientation() === 'portrait' ? width - 82 : width - 115);
          setlHeight(getOrientation() === 'portrait' ? height : height - 20);

          // console.log("===width", width);
        }}>
        {/* Side bus view  */}
        <View style={[styles.viewLeftLine]}>
          <View
            style={[
              styles.viewCircleBlue,
              {
                marginTop:
                  Platform.OS === 'android'
                    ? getOrientation() === 'portrait'
                      ? hp('5%')
                      : hp('8%')
                    : getOrientation() === 'portrait'
                    ? hp('5%')
                    : hp('10%'),
              },
            ]}>
            <View style={styles.viewPlaneImg}>{returnSvgImage(item)}</View>
          </View>
        </View>

        {/* Detail Section */}
        <View
          style={[
            styles.viewOutSide,
            {
              width: lwidth,
              marginTop: getOrientation() === 'portrait' ? '8%' : '5%',
            },
          ]}>
          <View
            style={[
              styles.viewRowTop,
              {
                width: lwidth,
                paddingLeft: DeviceInfo.isTablet()
                  ? getOrientation() === 'portrait'
                    ? '3%'
                    : '3%'
                  : getOrientation() === 'portrait'
                  ? '5%'
                  : '2%',
              },
            ]}>
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

              <Text style={[styles.textBlack, styles.subTitle,{paddingTop:'2%'}]}>
                {item.Details &&
                item.Details.length > 0 &&
                item.Details[0].StartDate
                  ? getDateInFormatNoTime(item.Details[0].StartDate, false, true)
                  : ''}
              </Text>
            </View>
            {(item.Type === appConstant.COMMERCIAL_FLIGHT ||
              item.Type === appConstant.CHARTER_FLIGHT ||
              item.Type === appConstant.HELICOPTER) && (
              <>
                <View
                  style={[
                    styles.leftLine,
                    {
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}>
                  <View style={styles.imagePlan}>
                    {returnSupplierCodeImage(item)}
                  </View>
                  {/* <Image
                    source={imageConstant.IMAGE_CHARTER_FLIGHT_PNG}
                    resizeMode={'contain'}
                    style={styles.imagePlan}
                  /> */}
                  {item.Details &&
                  item.Details.length > 0 &&
                  item.Details[0].Flight ? (
                    <Text style={styles.flightNumber}>
                      {item.Details &&
                        item.Details.length > 0 &&
                        item.Details[0].Flight}
                    </Text>
                  ) : null}
                  {/* <Text style={styles.flightCodeNumber}>(A320-200)</Text> */}
                </View>
              </>
            )}
            {isNoShowBtnVisible ? (
              <Pressable
                style={styles.buttonTextRed}
                onPress={() => {
                  setIsAlertShow(true);
                }}>
                <Text style={styles.textNoShow}>No</Text>
                <Text style={styles.textNoShow}>Show</Text>
              </Pressable>
            ) : null}
          </View>

          <View style={styles.viewSingleLine} />

          <View style={styles.viewDepartsAndArrive}></View>
          <View style={styles.viewItinerary}>
            <View style={styles.viewLocation}>
              {item.Type === appConstant.CAMP_ACCOMODATION ||
              item.Type === appConstant.HOTEL ? (
                <Text style={styles.textBlueBig}>Check-In:</Text>
              ) : item.Type === appConstant.CAR_HIRE ? (
                <Text style={styles.textBlueBig}>Pick-Up:</Text>
              ) : (
                <Text style={styles.textBlueBig}>Departs:</Text>
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

            <View style={styles.viewLocation}>
              <View style={styles.viewSpace} />
              {item.Type === appConstant.CAMP_ACCOMODATION ||
              item.Type === appConstant.HOTEL ? (
                <Text style={styles.textBlueBig}>Check-Out:</Text>
              ) : item.Type === appConstant.CAR_HIRE ? (
                <Text style={styles.textBlueBig}>Drop-off:</Text>
              ) : (
                <Text style={styles.textBlueBig}>Arrives:</Text>
              )}

              <Text style={styles.textBlack}>
                {item.Details &&
                item.Details.length > 0 &&
                item.Details[0].Destination
                  ? item.Details[0].Destination
                  : '-'}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.textBlack,
                    {alignItems: 'flex-end', lineHeight: 25},
                  ]}>
                  {item.Details &&
                  item.Details.length > 0 &&
                  item.Details[0].EndDate
                    ? getTimeInFormat(item.Details[0].EndDate, false, true)
                    : '-'}
                </Text>
                {days > 0 && (
                  <Text
                    style={[styles.dayNumberText, {alignItems: 'flex-start'}]}>
                    {' +' + days}
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.viewLocation}>
              <View style={styles.viewSpace} />
              {item.Type === appConstant.MEET_AND_GREET ? (
                <></>
              ) : (
                <Text style={styles.textBlueBig}>Duration:</Text>
              )}
              <Text style={styles.textBlack}>{duration ? duration : '-'}</Text>
            </View>

            <View style={styles.viewLocation}>
              {(item.Type === appConstant.BUS ||
                item.Type === appConstant.CAR_HIRE) && (
                <>
                  <View style={styles.viewSpace} />
                  <Text style={styles.textBlueBig}>Vehicle</Text>
                  <Text style={styles.textBlack}></Text>
                </>
              )}
            </View>

            <View style={styles.viewLocation}>
              {item.Type === appConstant.CAMP_ACCOMODATION && (
                <>
                  <View style={styles.viewSpace} />
                  <Text style={styles.textBlueBig}>Room:</Text>
                  <Text style={styles.textBlack}>-</Text>
                  <View style={styles.viewSpace} />
                  <Text style={styles.textBlueBig}>Locker:</Text>
                  <Text style={styles.textBlack}>-</Text>
                  <View style={styles.viewSpace} />
                  <Text style={styles.textBlueBig}>Phone:</Text>
                  <Text style={styles.textBlack}>-</Text>
                  <View style={styles.viewSpace} />
                  <Text style={styles.textBlueBig}>Muster 1:</Text>
                  <Text style={styles.textBlack}>-</Text>
                  <View style={styles.viewSpace} />
                  <Text style={styles.textBlueBig}>Muster 2:</Text>
                  <Text style={styles.textBlack}>-</Text>
                  <View style={styles.viewSpace} />
                  <Text style={styles.textBlueBig}>Tag/Token:</Text>
                  <Text style={styles.textBlack}>-</Text>
                </>
              )}
            </View>

            <View style={styles.viewLocation}>
              {item.Type === appConstant.HOTEL && (
                <>
                  <View style={styles.viewSpace} />
                  <Text style={styles.textBlueBig}>Room:</Text>
                  <Text style={styles.textBlack}>A-101A</Text>
                  <View style={styles.viewSpace} />
                  <Text style={styles.textBlueBig}>Phone:</Text>
                  <Text style={styles.textBlack}>08 6587 5698</Text>
                  <View style={styles.viewSpace} />
                  <Text style={styles.textBlueBig}>Address:</Text>
                  <Text style={styles.textBlack}></Text>
                </>
              )}
            </View>

            <View style={styles.viewLocation}>
              {item.Type === appConstant.WATERCRAFT && (
                <>
                  <View style={styles.viewSpace} />
                  <Text style={styles.textBlueBig}>Vessel:</Text>
                  <Text style={styles.textBlack}></Text>
                </>
              )}
            </View>

            <View style={styles.viewLocation}>
              {!(
                item.Type === appConstant.BUS ||
                item.Type === appConstant.COACH ||
                item.Type === appConstant.CAMP_ACCOMODATION ||
                item.Type === appConstant.WATERCRAFT ||
                item.Type === appConstant.MEET_AND_GREET
              ) && (
                <>
                  <View style={styles.viewSpace} />
                  <Text style={styles.textBlueBig}>Booking #</Text>
                  <Text style={styles.textBlack}>-</Text>
                </>
              )}
            </View>

            <View style={styles.viewLocation}>
              {(item.Type === appConstant.COMMERCIAL_FLIGHT ||
                item.Type === appConstant.CHARTER_FLIGHT ||
                item.Type === appConstant.HELICOPTER) && (
                <>
                  <View style={styles.viewSpace} />
                  <Text style={styles.textBlueBig}>Ticket #</Text>
                  <Text style={styles.textBlack}>-</Text>
                </>
              )}
            </View>

            <View style={styles.viewLocation}>
              <View style={styles.viewSpace}>
                <Text style={styles.textBlueBig}>Status:</Text>
                {item.Status === 'Booked' || item.Status === 'Reserved' ? (
                  <Text style={styles.textConfirmedInBox}>Confirmed</Text>
                ) : (
                  <Text style={styles.textNotConfirmedInBox}>
                    Not Confirmed
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.viewLocation}>
              {(item.Type === appConstant.HOTEL ||
                item.Type === appConstant.MEET_AND_GREET) && (
                <>
                  <View style={styles.viewSpace} />
                  <Text style={styles.textBlueBig}>Note:</Text>
                  <Text style={styles.textBlack}>
                    Your QR code will be scanned when you arrive at your hotel.
                    Please have your QR code ready
                  </Text>
                </>
              )}
            </View>
          </View>

          {/* <View
            style={
              item.Type === appConstant.CHARTER_FLIGHT
                ? styles.ViewBlueBottom
                : styles.ViewBlueBottom
            }>
            <Text style={[styles.textWhite, {padding: hp('2%')}]}>
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
          </View> */}
        </View>

        {index === responseDetail.journeyDetail.Itinerarys.length - 1 ? null : (
          <View
            style={[
              styles.viewDashedLine,
              {
                top:
                  Platform.OS === 'android'
                    ? getOrientation() === 'portrait'
                      ? '11%'
                      : '12%'
                    : getOrientation() === 'portrait'
                    ? '11%'
                    : '12%',
                height: '100%',
              },
            ]}>
            {/* <View style={styles.viewDotted} /> */}
          </View>
        )}
      </View>
    );
  };

  // console.log('responseDetail-+-+', responseDetail?.journeyDetail?.Itinerarys);
  const getDataFromResponse = (responseDetail, type) => {
    // console.log('responseDetail.Status+-+-+', responseDetail.Status);

    if (responseDetail && responseDetail[type]) {
      if (type === 'StartDate') {
        return getDateInFormat(responseDetail[type], false, false);
      } else {
        if (type === 'GivenName') {
          let surname = '';
          if (responseDetail['Surname']) {
            surname = responseDetail['Surname'];
          }
          let name = responseDetail['GivenName'] + ' ' + surname;
          return name;
        } else {
          return responseDetail[type];
        }
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
                  'Date: ',
                  getDataFromResponse(
                    responseDetail.journeyDetail,
                    'StartDate',
                  ),
                )}
                {returnRowView(
                  'Name: ',
                  getDataFromResponse(
                    responseDetail.journeyDetail,
                    'GivenName',
                  ),
                )}
                {returnRowView(
                  'Request Title: ',
                  getDataFromResponse(responseDetail.journeyDetail, 'Title'),
                )}
                {returnRowView(
                  'Travel Request ID: ',
                  getDataFromResponse(
                    responseDetail.journeyDetail,
                    'TravelRequestId',
                  ),
                )}
                {returnRowView(
                  'In Country Helpline ',
                  getDataFromResponse(),
                  // responseDetail.journeyDetail,
                  // 'TravelRequestId',
                )}
                {returnRowView(
                  'Security: ',
                  getDataFromResponse(),
                  // responseDetail.journeyDetail,
                  // 'TravelRequestId',
                )}
                {returnRowView(
                  'Meet & Greet Team: ',
                  getDataFromResponse(),
                  // responseDetail.journeyDetail,
                  // 'TravelRequestId',
                )}
              </View>
            </View>

            {/* Itinerary Details */}
            <View
              style={{marginTop: getOrientation() === 'portrait' ? '8%' : '5%'}}
            />
            <Text style={styles.textBlackTitle}>Itinerary Details</Text>

            {responseDetail &&
            responseDetail.journeyDetail &&
            responseDetail.journeyDetail.Itinerarys &&
            responseDetail.journeyDetail.Itinerarys.length > 0 ? (
              status === 'Confirmed Itinerary' ? (
                <Text style={styles.textConfirmed}>Confirmed Itinerary</Text>
              ) : (
                <Text style={styles.textNotConfirmed}>Draft Itinerary</Text>
              )
            ) : null}

            {responseDetail &&
            responseDetail.journeyDetail &&
            responseDetail.journeyDetail.Itinerarys &&
            responseDetail.journeyDetail.Itinerarys.length > 0
              ? responseDetail.journeyDetail.Itinerarys.map(function (
                  item,
                  index,
                ) {
                  checkStatus(item.Status);
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
      ) : (
        <View style={{backgroundColor: 'pink'}} />
      )}
    </>
  );
};

export default JourneyDetail;
