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
import {HeaderCustom, BookingCard, AlertView} from '../../component';
import {Avatar} from 'react-native-elements';
import {
  appColor,
  appConstant,
  imageConstant,
  alertMsgConstant,
} from '../../constant';
import {getDateInFormat} from '../../common';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const JourneyDetail = props => {
  const [isAlertShow, setIsAlertShow] = useState(false);

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

  const returnGreenButtonView = (imageName) => {
    return (
      <View style={styles.viewRowOutSide}>
        {/* Side bus view  */}
        <View style={styles.viewCircleGreen}>
          <View style={styles.viewPlaneImg}>
            <Image
              source={imageName}
              style={styles.imageSideColomn}
              resizeMode={'contain'}
            />
          </View>
        </View>

        {/* Detail Section */}
        <View style={[styles.viewOutSide, {marginTop: hp('3%')}]}>
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

          <View style={styles.ViewGreenBottom}>
            <Text style={[styles.textWhite, {padding: '2%'}]}>
              Total Time: 10m
            </Text>
          </View>
        </View>
       
      </View>
    );
  };
  const returnBlueButtonView = (imageName) => {
    return (
      <View style={styles.viewRowOutSide}>
        {/* Side bus view  */}
        <View style={styles.viewCircleBlue}>
          <View style={styles.viewPlaneImg}>
            <Image
              source={imageName}
              style={styles.imageSideColomn}
              resizeMode={'contain'}
            />
          </View>
        </View>

        {/* Detail Section */}
        <View style={[styles.viewOutSide, {marginTop: hp('3%')}]}>
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

  return (
    <>
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
        <ScrollView style={styles.scrollView}>
          <View style={styles.viewSection}>
            {/* Itinerary Details */}
            <Text style={styles.textBlackTitle}>Traveller Details</Text>
            <View style={styles.viewInside2}>
                <View style={styles.viewContainRow}>
                  {returnRowView('Name:', 'John Lewis')}
                  {returnRowView('Bus Booking:', 'Butler Park to Barrow Island')}
                  {returnRowView('Date:', 'Tue, July 20, 2021')}
                  {returnRowView('TVR:', '3134')}
                </View>
              </View>

            {/* Itinerary Details */}
            <View style={{paddingTop:'3%'}}/>
            <Text style={styles.textBlackTitle}>Itinerary Details</Text>
            {returnGreenButtonView(imageConstant.IMAGE_PLANE)}
            {returnGreenButtonView(imageConstant.IMAGE_PLANE_HORIZONTAL)}
            {returnBlueButtonView(imageConstant.IMAGE_BUS_WHITE)}
            {returnBlueButtonView(imageConstant.BED)}

            </View>
        </ScrollView>
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
