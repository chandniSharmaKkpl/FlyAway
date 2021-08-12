import React, {useState, useCallback} from 'react';
import {View, Text, Image, FlatList, Pressable} from 'react-native';
import stylesHome from '../home/Home.style';
import styles from './BusBooking.style';
import stylesCommon from '../../common/common.style';

import {
  HeaderCustom,
  BookingCard,
  cus,
  CustomTextInput,
  Calendar,
} from '../../component';
import {Avatar} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {appColor, appConstant, imageConstant} from '../../constant';

const BusBookingScreen = props => {
  const [arrayBooking, setArrayBooking] = useState([1]); // All bookings data will get in this array
  const [isCalendarShow, setIsCalendarShow] = useState(false); // Calendar view show/hide when click on calendar icon
  const [selectedDate, setSelectedDate] = useState(''); // Assign calendar selected date

  const onClickBookingCard = useCallback(() => {
    props.navigation.navigate(appConstant.SITE_ITINARY, {
      viewName: appConstant.BUS_BOOKING,
    });
  }, []);

  const renderItem = item => {
    return (
      <Pressable onPress={onClickBookingCard}>
        <BookingCard
          item={item}
          titleColor={appColor.NAVY_BLUE}
          title={'Bus Booking- Butler Park to Barrow Island'}
          viewName={appConstant.BUS_BOOKING}
        />
      </Pressable>
    );
  };

  const onClickCalendarDate = async selectedDay => {
    //console.log("selectedDay---", selectedDay.dateString);
    let dateString = selectedDay.dateString;
    // Pass parameter in api
    // return;
    await setSelectedDate(dateString);
  };

  const onClickCalendarIcon = () => {
    setIsCalendarShow(!isCalendarShow);
  };
  return (
    <>
      <View style={stylesHome.container}>
        <HeaderCustom
          title={'Make a Booking'}
          viewName={appConstant.BUS_BOOKING}
          leftIcon={true}
          rightIcon={true}
          centerTitle={true}
          onClickRightIcon={() => {
            console.log(' ');
          }}
          rightIconImage={''}
        />
        <Text style={stylesCommon.textHeading}>Make a Booking</Text>

        <View style={styles.viewButtonTextInput}>
          <CustomTextInput
            title={selectedDate}
            rightIcon={imageConstant.IMAGE_CALENDAR_BLACK}
            width={wp('90%')}
            onClickRightIcon={onClickCalendarIcon}
          />
        </View>

        {isCalendarShow ? (
          <View style={{padding: '2%', paddingLeft:wp('5%'), paddingRight:wp('5%'),height:hp('45%')}}>
            <Calendar onDayPress={onClickCalendarDate} />
          </View>
        ) : null}

        <View style={styles.viewButtonTextInput}>
          <View style={styles.buttonYellow}>
            <Text style={styles.buttonTitle}>From:</Text>
          </View>
          <View style={{paddingLeft: wp('3%')}}>
            <CustomTextInput
              title={'Butler Park(034)'}
              rightIcon={imageConstant.IMAGE_ARROW_DOWN}
              width={wp('72%')}
            />
          </View>
        </View>

        <View style={styles.viewButtonTextInput}>
          <View style={styles.buttonYellow}>
            <Text style={styles.buttonTitle}>To:</Text>
          </View>
          <View style={{paddingLeft: wp('3%')}}>
            <CustomTextInput
              title={'Barrow Island(BWB)'}
              rightIcon={imageConstant.IMAGE_ARROW_DOWN}
              width={wp('72%')}
            />
          </View>
        </View>

        <>
          <Text style={stylesCommon.textHeading}>Upcoming Journeys</Text>
          {/* Bookinng list  */}
          <View style={{alignSelf: 'center', height: hp('18%')}}>
            <FlatList
              renderItem={renderItem}
              data={arrayBooking}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </>
      </View>
    </>
  );
};

export default BusBookingScreen;
