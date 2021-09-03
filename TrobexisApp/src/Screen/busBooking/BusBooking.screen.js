import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, Image, FlatList, Pressable, BackHandler} from 'react-native';
import stylesHome from '../home/Home.style';
import styles from './BusBooking.style';
import stylesCommon from '../../common/common.style';
import format from "date-fns/format";

import {
  HeaderCustom,
  BookingCard,
  CustomTextInput,
  Calendar,
} from '../../component';
import { useSelector, useDispatch } from 'react-redux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {appColor, appConstant, imageConstant} from '../../constant';
import { requestToGetItinaryList } from '../home/Home.action';

const BusBookingScreen = props => {
  const [arrayBooking, setArrayBooking] = useState([1]); // All bookings data will get in this array
  const [isCalendarShow, setIsCalendarShow] = useState(false); // Calendar view show/hide when click on calendar icon
  const [selectedDate, setSelectedDate] = useState(''); // Assign calendar selected date
  const [fromLoc, setFromLoc] = useState('034'); // From location
  const [toLoc, setToLoc] = useState('bwb'); // To location

  const dispatch = useDispatch(); // Calling api
  const response = useSelector(state => state.BusBookingReducer); // Getting api response
  const responseItinaryList = useSelector(state => state.HomeReducer); // Getting api response

  const onClickBookingCard = useCallback(() => {
    props.navigation.navigate(appConstant.SITE_ITINARY, {
      viewName: appConstant.BUS_BOOKING,
    });
  }, []);

  const handleBackButtonClick =() =>{
   return true;
  }

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        let date = new Date();
        let currentDate = format(date, "EEEE, MMMM dd yyyy");
        setSelectedDate(currentDate);
         dispatch(requestToGetItinaryList())
          });
    return () =>{
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        unsubscribe;
     }
  }, [])

  const renderItem = item => {
    return (
      <Pressable onPress={onClickBookingCard}>
        <BookingCard
          item={item}
          titleColor={appColor.NAVY_BLUE}
          viewName={appConstant.BUS_BOOKING}
        />
      </Pressable>
    );
  };

  const onClickCalendarDate = async selectedDay => {
    let dateString1 = selectedDay.dateString;
    let dateTemp = Date.parse(dateString1);
   let currentDate = format(dateTemp, "EEEE, MMMM dd yyyy");
    await setSelectedDate(currentDate);
  };

  const onClickCalendarIcon = () => {
    setIsCalendarShow(!isCalendarShow);
  };
  const onClickRightIcon = useCallback(()=>{
            props.navigation.navigate(appConstant.NOTIFICATIONS)
},[])    

const convertDate = (date) =>{
  let convertedDate = ''

  let dateTemp = Date.parse(selectedDate);
   convertedDate = format(dateTemp, "yyyy'-'MM'-'dd'T'HH':'mm':'ss");
   console.log(" converted date is ", convertedDate)
  return convertedDate;
}

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
          onClickRightIcon = {onClickRightIcon}
          rightIconImage={''}
        />
        <Text style={stylesCommon.textHeading}>Make a Booking</Text>

        <View style={styles.viewCalendar1}>
          <CustomTextInput
         title={selectedDate}
            rightIcon={imageConstant.IMAGE_CALENDAR_BLACK}
            width={wp('90%')}
            onClickRightIcon={onClickCalendarIcon}
          />
        </View>

        {isCalendarShow ? (
          <View style={styles.viewCalendar}>
            <Calendar onDayPress={onClickCalendarDate} />
          </View>
        ) : null}

        <View style={styles.viewButtonTextInput }>
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

        <Pressable style={styles.buttonSearchBus} onPress={()=> 
          props.navigation.navigate(appConstant.PICK_A_BUS, 
            {busBookingData:{
            'pickuplocationcode': fromLoc, "dropofflocationcode": toLoc, 'travelDate': convertDate(selectedDate)
        }}) }>
            <Text style={styles.buttonSearchBusTitle}>Search Buses</Text>
          </Pressable>

        <>
          <Text style={stylesCommon.textHeading}>Upcoming Journeys</Text>
          {/* Booking list  */}
       {responseItinaryList && Array.isArray(responseItinaryList.itinaryList) && responseItinaryList.itinaryList.length>0?   
       <View style={{alignSelf: 'center', height: hp('18%')}}>
            <FlatList
              renderItem={renderItem}
              data={arrayBooking}
              keyExtractor={(item, index) => index.toString()}
            />
          </View> 
         : null } 
        </>
      </View>
    </>
  );
};

export default BusBookingScreen;
