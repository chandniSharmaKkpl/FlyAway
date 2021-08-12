import React from 'react';
import {View, Text, Image, Platform, Pressable} from 'react-native';
import appColor from '../constant/colorConstant';
import fontConstant from '../constant/fontConstant';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import imageConstant from '../constant/imageConstant';

const CustomTextInput = props => {
  const {onClickRightIcon, rightIcon} = props;

  return (
    <View style={[styles.viewOutSide, {width: props.width}]}>
      <View
        style={{
          paddingLeft: '5%',
          paddingRight: '5%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}>
        <Text>{props.title}</Text>
        {rightIcon === imageConstant.IMAGE_CALENDAR_BLACK ? (
          <Pressable
            style={styles.viewCalendarImages}
            onPress={onClickRightIcon}>
            <Image
              style={styles.image}
              resizeMode={'contain'}
              source={props.rightIcon}
            />
          </Pressable>
        ) : (
          <View style={styles.viewDownArrowImages}>
            <Image
              style={styles.image}
              resizeMode={'contain'}
              source={props.rightIcon}
            />
          </View>
        )}
      </View>
    </View>
  );
};
const styles = {
  viewOutSide: {
    borderRadius: 14,
    borderColor: Platform.OS === 'android' ? appColor.BORDER : appColor.GRAY,
    shadowColor: appColor.SHADOW,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: Platform.OS === 'android' ? 0.2 : 0.62,
    shadowRadius: Platform.OS === 'android' ? 1.2 : 2.22,
    elevation: 5,
    // width: wp('90%'),
    height: hp('6%'),
    backgroundColor: appColor.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textDetail: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_12_SIZE_BOLD,
    color: appColor.BLACK,
    flexWrap: 'wrap',
    paddingLeft: wp('2%'),
  },
  viewCalendarImages: {
    width: wp('4.5%'),
    height: hp('4.5%'),
  },
  viewDownArrowImages: {
    width: wp('3.5%'),
    height: hp('3.5%'),
  },
  image: {
    width: '100%',
    height: '100%',
  },
};
export default CustomTextInput;
