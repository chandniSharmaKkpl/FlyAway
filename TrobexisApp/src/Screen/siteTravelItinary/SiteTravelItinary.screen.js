import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  BackHandler,
  Pressable,
} from 'react-native';
import stylesHome from '../home/Home.style';
import stylesCommon from '../../common/common.style';
import styles from './SiteTravelItinary.style';
import {HeaderCustom, BookingCard, Loader} from '../../component';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';

import {appColor, appConstant, imageConstant} from '../../constant';
import {ScrollView} from 'react-native-gesture-handler';
import {requestToCancelSiteTravelItinary, requestToGetDetailOfItinary} from './SiteTravelItinary.action';
import { getDateInFormat } from '../../common';
import { getTimeInFormat } from '../../component/BookingCard';

const SiteTravelItinary = props => {
  const [arrayBooking, setArrayBooking] = useState([1]);
  const dispatch = useDispatch();
  const response = useSelector(state => state.SiteTravelItinaryReducer); // Getting api response

  React.useEffect(() => {
    let array = [1, 2, 3];
    arrayBooking.push(array);

    if (props.route.params.itinaryDetail && props.route.params.itinaryDetail.id) {
      console.log(" props are ====", props); 

      dispatch(requestToGetDetailOfItinary(props.route.params.itinaryDetail.id));

    }

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [props.route.params.itinaryDetail]);

  const handleBackButtonClick = () => {
    props.navigation.navigate(viewName);
  };

  const renderItem = item => {
    return (
      <View>
        <BookingCard
          item={item}
          titleColor={appColor.NAVY_BLUE}
          viewName={appConstant.PICK_A_BUS}
        />
      </View>
    );
  };
  const onClickBack = useCallback(() => {
    props.navigation.goBack();
  }, []);

  const returnView = (title, value) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingTop: hp('1%'),
          paddingBottom: hp('1%'),
        }}>
        <Text style={styles.textBlue}>{title}: </Text>
        <Text style={styles.textBlack}>{value}</Text>
      </View>
    );
  };

  return (
    <>
    {console.log(" response site travel ", response)}
      <View style={stylesHome.container}>
        <HeaderCustom
          title={'Site Travel Itinerary'}
          viewName={appConstant.SITE_ITINARY}
          leftIcon={true}
          rightIcon={false}
          centerTitle={true}
          onClickLeftIcon={() => onClickBack()}
          rightIconImage={imageConstant.IMAGE_ARROW_BACK}
        />
        <Text style={stylesCommon.textHeading}>Site Travel Itinerary</Text>

        {/* Bookinng Detail  */}
        <ScrollView style={{}}>
          {/* View user information */}
          <View style={styles.viewOutSide}>
            <View style={styles.viewInside}>
              {returnView('Name', response.itinaryDetail.GivenName)}
              {returnView('Bus Booking', response.itinaryDetail.Title)}
              {returnView('Date', getDateInFormat(response.itinaryDetail.StartDate, true, false))}
              {returnView('TRV', response.itinaryDetail.TravelRequestId)}
            </View>
          </View>

          {/* View Travel information */}

          <View style={[styles.viewOutSide, {marginTop: hp('3%')}]}>
            <View style={[styles.viewRowTop]}>
              <View style={styles.buttonBusYellow}>
                <View style={styles.viewBusImage}>
                  <Image
                    source={imageConstant.IMAGE_BUS_WHITE}
                    resizeMode={'contain'}
                    style={stylesCommon.image}
                  />
                </View>
              </View>
              <View style={styles.viewLeft}>
                <Text style={styles.textYellow}>Trobexis Coaches (BRW02)</Text>
                <Text style={[styles.textBlack]}>{getDateInFormat(response.itinaryDetail.StartDate, false, true)}</Text>
              </View>
            </View>
            <View style={styles.viewSingleLine} />

            {/* View Departs and Arrive */}
            <View style={styles.viewDepartsAndArrive}></View>
            <View style={styles.viewItinerary}>
              <View style={styles.viewLocation}>
                <Text style={styles.textBlueBig}>Departs</Text>

                <Text style={styles.textBlack}>Butler Park(034)</Text>
                <Text style={styles.textBlack}>12:00 PM</Text>
              </View>

              <View style={{width:'66%',flexDirection:'row'}}>
                <View style={[styles.viewArrow,{flex:3}]}>
                  <Image
                    resizeMode={'contain'}
                    source={imageConstant.IMAGE_ARROW_RIGHT}
                    style={stylesCommon.image}
                  />
                </View>

                <View style={styles.viewRightLocation}>
                  <Text style={styles.textBlueBig}>Arrives</Text>

                  <Text style={styles.textBlack}>
                    Barrows Island(BWB)
                  </Text>
                  <Text style={styles.textBlack}>{getTimeInFormat(response.itinaryDetail.StartDate)}</Text>
                </View>
              </View>
            </View>

            <View style={styles.ViewBlueBottom}>
              <Text style={[styles.textWhite, {padding: '2%'}]}>
                Total Time: 10m
              </Text>
            </View>
          </View>

          {/* Cancel Button */}
          {props.viewName === appConstant.BUS_BOOKING ? null : (
            <View style={styles.viewCancelButton}>
              <Pressable style={styles.buttonRed}>
                <Text style={styles.textRedButton}>Cancel Booking</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>

        {response.isRequesting ? <Loader loading={props.isRequesting} /> : null}

      </View>
    </>
  );
};

export default SiteTravelItinary;
