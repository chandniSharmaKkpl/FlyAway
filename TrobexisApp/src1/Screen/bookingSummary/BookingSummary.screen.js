import React, {useState, useCallback} from 'react';
import {View, Text, Image, FlatList, Pressable} from 'react-native';
import stylesHome from '../home/Home.style';
import styles from './BookingSummary.style';
import {HeaderCustom, BookingCard} from '../../component';
import {Avatar} from 'react-native-elements';
import stylesCommon from '../../common/common.style';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconEvil from 'react-native-vector-icons/EvilIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import {imageConstant, appColor, appConstant} from '../../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const BookingSummary = props => {

    

  return (
    <>
      <View style={stylesHome.container}>
        <HeaderCustom
          title={'Booking Summary'}
          viewName={appConstant.BOOKING_SUMMARY}
          leftIcon={true}
          onClickLeftIcon={()=> props.navigation.goBack()}
          rightIcon={false}
          centerTitle={true}
          onClickRightIcon={() => {}}
          rightIconImage={''}
        />
        <Text style={stylesCommon.textHeading}>Booking Summary</Text>

        <View style={[styles.viewOutSide, {justifyContent: 'space-between'}]}>
          <View style={{flexDirection: 'row', padding: '2%'}}>
            {/* View circle and line  */}

            <View style={{backgroundColor: 'pink', height: hp('5%')}}>
              <View style={styles.emptyCircle} />
              <View style={styles.straightView} />
              <View style={styles.filledCircle} />
            </View>

            {/* Itinary detail */}
            <View style={{paddingLeft: wp('5%')}}>
              <View style={styles.viewLocation}>
                <View>
                  <Text style={styles.rowTtitle}>06:30</Text>
                  <Text style={styles.textDescription}>Depart</Text>
                </View>
                <Text style={[styles.rowTtitle, {paddingLeft: wp('5%')}]}>
                  Barrow Island
                </Text>
              </View>

              <View style={styles.viewLocation}>
                <View>
                  <Text style={styles.rowTtitle}>07:30</Text>
                  <Text style={styles.textDescription}>arrive</Text>
                </View>
                <Text style={[styles.rowTtitle, {paddingLeft: wp('5%')}]}>
                  Butler Park
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
              <Text style={styles.textDescription}>Tue, July 20,2021</Text>
            </View>
          </View>

          <View style={styles.viewRow}>
            <IconAntDesign name="clockcircle" style={styles.iconRow} />
            <View style={styles.viewDate}>
              <Text style={styles.rowTtitle}>Duration</Text>
              <Text style={styles.textDescription}>00h 10m</Text>
            </View>
          </View>

          <View style={styles.viewRow}>
            <IconIonicons name="ios-bus" style={styles.iconRow} />
            <View style={styles.viewDate}>
              <Text style={styles.rowTtitle}>Route</Text>
              <Text style={styles.textDescription}>
                Barrow Island - Butter Park{' '}
              </Text>
            </View>
          </View>

          <View style={styles.viewRow}>
            <IconEntypo name="briefcase" style={styles.iconRow} />
            <View style={styles.viewDate}>
              <Text style={styles.rowTtitle}>Luggage</Text>
              <Text style={styles.textDescription}>0 Pieces </Text>
            </View>
          </View>
        </View>

        <Pressable
          style={stylesCommon.yellowButton}
          onPress={() =>
            props.navigation.navigate(appConstant.HOME_SCREEN)
          }>
          <Text
            style={[
              styles.buttonSearchBusTitle,
              stylesCommon.yellowButtonTitle,
            ]}>
            Book a Seat
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default BookingSummary;
