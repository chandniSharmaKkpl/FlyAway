import {StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontConstant from '../../constant/fontConstant';
import appColor from '../../constant/colorConstant';
export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: appColor.LIGH_BLUE,
  },
  textHello: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H1_SIZE_BOLD,
    color: appColor.WHITE,
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
    // height: hp('15%'),
    backgroundColor: appColor.WHITE,
    margin: 10,
    //  flexWrap:'wrap',
    //alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  viewRow: {
    flexDirection: 'row',
    // justifyContent:'center',
    // backgroundColor:'yellow',
    alignItems: 'center',
    paddingLeft: wp('2.5%'),
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
  },
  viewLocation: {
    flexDirection: 'row',
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
  },
  emptyCircle: {
    borderRadius: 14,
    borderWidth: 5,
    borderColor: appColor.YELLOW,
    shadowColor: appColor.SHADOW,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.62,
    shadowRadius: 2.22,
    width: wp('2%'),
    height: hp('2%'),
    // backgroundColor:'pink'
  },

  straightView: {
    backgroundColor: appColor.YELLOW,
    width: wp('0.5%'),
  },

  filledCircle: {
    borderRadius: 14,
    borderColor: appColor.YELLOW,
    shadowColor: appColor.SHADOW,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.62,
    shadowRadius: 2.22,
    width: wp('2%'),
    height: hp('2%'),
    backgroundColor: appColor.YELLOW,
  },

  viewDate: {
    paddingLeft: wp('2.5%'),
  },
  iconRow: {
    fontSize: 25,
    color: appColor.NAVY_BLUE,
  },
  rowTtitle: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H3_SIZE_BOLD,
    color: appColor.NAVY_BLUE,
  },
  textDescription: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_17_SIZE_REGULAR,
    color: appColor.GRAY,
  },
});
