import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import appColor from '../constant/colorConstant';
import fontConstant from '../constant/fontConstant';
import format from 'date-fns/format';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import imageConstant from '../constant/imageConstant';
import appConstant from '../constant/appConstant';
import {getDateInFormat, getDateTimeOfView} from '../common/index';
import moment from 'moment';

const BookingCard = props => {
  const {item, viewName} = props;
  // const [getDate, setGetDate] = useState();
  // const [getStartTime, setGetStartTime] = useState();
  // const [getEndTime, setGetEndTime] = useState();
  const [getStartDate, setGetStartDate] = useState();
  const [getEndDate, setGetEndDate] = useState();

  // console.log(
  //   "itemitemitem", getDate
  // );

  useEffect(async () => {
    // let valueDate1 = await getDateTimeOfView(item.startdatetime, true, false, false)
    // setGetDate(valueDate1);

    let valueStartTime = await getDateTimeOfView(item.startdatetime, true, false, false)
    setGetStartDate(valueStartTime);

    let valueStartTime1 = await getDateTimeOfView(item.enddatetime, true, false, false)
    setGetEndDate(valueStartTime1);
    // let valueStartTime = await getDateTimeOfView(item.startdatetime, false, true, false)
    // setGetStartTime(valueStartTime);

    // let valueStartTime1 = await getDateTimeOfView(item.enddatetime, false, true, false)
    // setGetEndTime(valueStartTime1);

  }, []);

  return (
    <View style={styles.viewOutSide}>
      <View style={styles.viewInside1}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[styles.textTitle, {color: props.titleColor}]}>
            {item.title}
          </Text>

          {viewName === appConstant.PICK_A_BUS ? (
            <View style={styles.buttonYellow}>
              <Text style={styles.buttonTitle}>{item.availability} Seats</Text>
            </View>
          ) : null}
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingTop: '1%',
            alignItems: 'center',
          }}>
          <View style={styles.viewImages}>
            <Image
              style={styles.image}
              resizeMode={'contain'}
              source={imageConstant.IMAGE_PATH}
            />
          </View>
          <Text style={styles.textDetail}>
            {item.departure ? item.departure : ''} to{' '}
            {item.destination ? item.destination : ''}
          </Text>
        </View>

        {viewName !== appConstant.PICK_A_BUS ? (
          <View>
            <View style={styles.viewInside}>
              <View style={styles.viewImages}>
                <Image
                  style={styles.image}
                  resizeMode={'contain'}
                  source={imageConstant.IMAGE_CALENDAR_BLACK}
                />
              </View>
              <Text style={styles.textDetail}>
                {getStartDate}{' '}
                <Text style={styles.textDetail}>
                  to {getEndDate}{' '}
                </Text>
              </Text>
            </View>

            {/* <View style={styles.viewTime}>
              <View style={styles.viewImages}>
                <Image
                  style={styles.image}
                  resizeMode={'contain'}
                  source={imageConstant.IMAGE_CLOCK_BLACK}
                />
              </View>
              <Text style={styles.textDetail}>
                {getStartTime}{' '}
                <Text style={styles.textDetail}>
                  to {getEndTime}{' '}
                </Text>
              </Text>
            </View> */}
          </View>
        ) : (
          <View style={styles.viewTimePickAbus}>
            <View style={styles.viewImages}>
              <Image
                style={styles.image}
                resizeMode={'contain'}
                source={imageConstant.IMAGE_CLOCK_BLACK}
              />
            </View>
            <Text style={styles.textDetail}>
              {getStartTime}{' '}
              <Text style={styles.textDetail}>
                to {getEndTime}{' '}
              </Text>
            </Text>

            <Text style={styles.textDetail}>({item.durationMins}m)</Text>
          </View>
        )}

      </View>
    </View>
  );
};

export const getTimeDifference = item => {
  let parseDateStart = new Date(item.startdatetime);
  let parseDateEnd = new Date(item.enddatetime);

  let seconds = Math.round(
    (parseDateEnd.getTime() - parseDateStart.getTime()) / 1000,
  );
};

export const getTimeInFormat = date => {
  if (date) {
    let tripTime = '';
    let parseDate = Date.parse(date);
    tripTime = format(parseDate, 'hh:mm a');
    return tripTime;
  }
  return '';
};

export default BookingCard;

const styles = {
  buttonTitle: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_12_SIZE_BOLD,
    color: appColor.WHITE,
    padding: '2%',
    alignItems: 'center',
  },
  viewInside1: {
    paddingLeft: '2%',
    paddingRight: '2%',
    paddingBottom: '2%',
    //backgroundColor:'pink'
  },
  buttonYellow: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: wp('2%'),
    // width:wp('20%'),
    // height:hp('5%'),
    backgroundColor: appColor.YELLOW,
  },
  viewTimePickAbus: {
    flexDirection: 'row',
    //  justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewTime: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    //paddingLeft: wp('3%'),
  },
  viewInside: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    //  paddingLeft: wp('3%')
  },
  viewOutSide: {
    borderRadius: 14,
    borderColor: appColor.GRAY,
    shadowColor: appColor.SHADOW,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.62,
    shadowRadius: 2.22,

    elevation: 5,
    width: wp('90%'),
    height: hp('15%'),
    backgroundColor: appColor.WHITE,
    //backgroundColor:'pink',
    margin: 10,
    //  flexWrap:'wrap',
    // alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '2%',
    paddingRight: '2%',
  },
  textTitle: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H3_SIZE_BOLD,
    color: appColor.YELLOW,
    flexWrap: 'wrap',
  },
  textDetail: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_12_SIZE_BOLD,
    color: appColor.BLACK,
    flexWrap: 'wrap',
    paddingLeft: wp('2%'),
  },
  viewImages: {
    width: wp('3%'),
    height: hp('3%'),
  },
  image: {
    width: '100%',
    height: '100%',
    tintColor: appColor.NAVY_BLUE,
  },
};
