import React from 'react';
import {View, Text, Image} from 'react-native';
import appColor from '../constant/colorConstant';
import fontConstant from '../constant/fontConstant';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import imageConstant from '../constant/imageConstant';
import appConstant from '../constant/appConstant';

const BookingCard = props => {
  const {title, viewName} = props;
  let title1 = 'Butler Park > Barrow Island';
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
            {title}
          </Text>

          {viewName === appConstant.PICK_A_BUS ? (
            <View style={styles.buttonYellow}>
              <Text style={styles.buttonTitle}>50 Seats</Text>
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
          <Text style={styles.textDetail}>{title ? title : title1} </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.viewInside}>
            <View style={styles.viewImages}>
              <Image
                style={styles.image}
                resizeMode={'contain'}
                source={imageConstant.IMAGE_CALENDAR_BLACK}
              />
            </View>
            <Text style={styles.textDetail}>{date} </Text>
          </View>

          <View style={[styles.viewInside, {paddingLeft: wp('3%')}]}>
            <View style={styles.viewImages}>
              <Image
                style={styles.image}
                resizeMode={'contain'}
                source={imageConstant.IMAGE_CLOCK_BLACK}
              />
            </View>
            <Text style={styles.textDetail}>{time} </Text>
          </View>
        </View>
      </View>
    </View>
  );
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
  viewInside: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    tintColor: appColor.NAVY_BLUE

  },
};
