import React from 'react';
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
import {getDateInFormat} from '../common/index';

const BookingCard = props => {
  const {item, viewName} = props;
  let date = '20-07-2021';
  let time = '10:30 AM';
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
            paddingTop: '5%',
            alignItems: 'center',
          }}>
          <View style={styles.viewImages}>
            <Image
              style={styles.image}
              resizeMode={'contain'}
              source={imageConstant.IMAGE_PATH}
            />
          </View>
          <Text style={styles.textDetail}>{item.title ? item.title : ''} </Text>
        </View>

        {viewName !== appConstant.PICK_A_BUS ? (
          <View style={{flexDirection: 'row'}}>
            <View style={styles.viewInside}>
              <View style={styles.viewImages}>
                <Image
                  style={styles.image}
                  resizeMode={'contain'}
                  source={imageConstant.IMAGE_CALENDAR_BLACK}
                />
              </View>
              <Text style={styles.textDetail}>
                {getDateInFormat(item.startdatetime, false, false)}{' '}
              </Text>
            </View>

            <View style={styles.viewTime}>
              <View style={styles.viewImages}>
                <Image
                  style={styles.image}
                  resizeMode={'contain'}
                  source={imageConstant.IMAGE_CLOCK_BLACK}
                />
              </View>
              <Text style={styles.textDetail}>
                {getTimeInFormat(item.startdatetime)}{' '}
              </Text>
            </View>
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
              {getTimeInFormat(item.startdatetime)}{' '}
            </Text>
            <Text style={styles.textDetail}>
              - {getTimeInFormat(item.enddatetime)}{' '}
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
  // console.log(" secodns ", seconds);
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
    padding: '1%',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: wp('3%'),
  },
  viewInside: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    margin: 10,
    //  flexWrap:'wrap',
    alignItems: 'center',
    justifyContent: 'center',
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
