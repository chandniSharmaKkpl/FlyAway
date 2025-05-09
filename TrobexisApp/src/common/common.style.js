import {StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontConstant from '../constant/fontConstant';
import appColor from '../constant/colorConstant';

export default StyleSheet.create({
  textHeading: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H2_SIZE_BOLD,
    color: appColor.BLACK,
    padding: '5%',
  },
  normalText : {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_14_SIZE_BOLD,
    paddingHorizontal: '5%',
  },
  image1: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  yellowButtonTitle: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_20_SIZE_BOLD,
    color: appColor.WHITE,
    paddingTop: hp('1.4%'),
    paddingBottom: hp('1.4%'),
    // paddingLeft:wp('1%'),
    // paddingRight:wp('1%'),
    alignItems: 'center',
  },
  yellowButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: wp('90%'),
    alignSelf: 'center',
    marginTop: '2%',
    marginBottom: '2%',
    // width:wp('15%'),
    // height:hp('5%'),
    backgroundColor: appColor.YELLOW,
  },
  greenButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: wp('90%'),
    alignSelf: 'center',
    marginTop: '2%',
    marginBottom: '2%',
    // width:wp('15%'),
    // height:hp('5%'),
    backgroundColor: appColor.GREEN,
  },

  redButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: wp('90%'),
    alignSelf: 'center',
    marginTop: '2%',
    marginBottom: '2%',
    // width:wp('15%'),
    // height:hp('5%'),
    backgroundColor: appColor.RED,
  },
});
