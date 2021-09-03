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
import {HeaderCustom, BookingCard} from '../../component';
import {Avatar} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {appColor, appConstant, imageConstant} from '../../constant';
import {ScrollView} from 'react-native-gesture-handler';

const SiteTravelItinary = props => {
  const [arrayBooking, setArrayBooking] = useState([1]);

  React.useEffect(() => {
    let array = [1, 2, 3];
    arrayBooking.push(array);
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

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
      <View style={stylesHome.container}>
        <HeaderCustom
          title={'Site Travel Itinerary'}
          viewName={appConstant.SITE_ITINARY}
          leftIcon={false}
          rightIcon={true}
          centerTitle={true}
          onClickRightIcon={() => onClickBack()}
          rightIconImage={imageConstant.IMAGE_ARROW_BACK}
        />
        <Text style={stylesCommon.textHeading}>Site Travel Itinerary</Text>

        {/* Bookinng Detail  */}
        <ScrollView style={{}}>
          {/* View user information */}
          <View style={styles.viewOutSide}>
            <View style={styles.viewInside}>
              {returnView('Name', 'Poole Boris')}
              {returnView('Bus Booking', 'Butler Park to Barrow Island')}
              {returnView('Date', 'Tue, July20,2021 to Tue, July 20, 2021')}
              {returnView('TRV', '3123')}
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
                <Text style={[styles.textBlack]}>Tuesday, July20,2021</Text>
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
                  <Text style={styles.textBlack}>12:00 PM</Text>
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
      </View>
    </>
  );
};

export default SiteTravelItinary;
