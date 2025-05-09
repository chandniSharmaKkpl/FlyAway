import {StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../responsiveScreen';
import fontConstant from '../../constant/fontConstant';
import appColor from '../../constant/colorConstant';
import DeviceInfo from 'react-native-device-info';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.LIGH_BLUE,
  },
  viewTopBackground: {
    backgroundColor: appColor.NAVY_BLUE,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // width: wp('100%'),
    height: hp('20%'),
  },

  viewTitle: {
    flexDirection: 'row',
    //alignItems:'center'
    // backgroundColor: 'pink',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  viewImageUser: {
    width: wp('10%'),
    height: hp('10%'),
    paddingLeft: wp('15%'),
    // justifyContent:'center',
    alignItems: 'center',
  },
  textHello: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H1_SIZE_BOLD,
    color: appColor.WHITE,
  },
  textTimeWish: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_H1_SIZE_REGULAR,
    color: appColor.WHITE,
  },
  textTitleGoes: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H2_SIZE_BOLD,
    color: appColor.BLACK,
    paddingTop: hp('2%'),
    paddingLeft: wp('5%'),
  },

  imageIcon: {
    width: wp('5%'),
    height: hp('5%'),
  },
  textButtonTitle: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: DeviceInfo.isTablet() ? fontConstant.TEXT_12_SIZE_BOLD : fontConstant.TEXT_10_SIZE_REGULAR,
    color: appColor.NAVY_BLUE,
    flexWrap: 'wrap',
    alignSelf: 'center',
    // marginTop:-2
  },

  textCardHeading: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H3_SIZE_BOLD,
    color: appColor.YELLOW,
  },
  viewButtonIcons: {
    width: wp('5%'),
    height: hp('5%'),
  },
  viewFlatList: {
    paddingTop: hp('-5%'),
  },
  viewYellowBox: {
    backgroundColor: appColor.YELLOW,
    borderRadius: 7,
    width: DeviceInfo.isTablet() ?  40 : 20,
    height: DeviceInfo.isTablet() ? 40 : 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 5,
    left: 5,
  },

  viewContainSmallBox: {
    padding: hp('2%'),
    //  justifyContent:'center',
    flexDirection: 'row',
    // backgroundColor:appColor.RED,
  },
  viewSmallBox: {
    borderRadius: 10,
    // flexDirection:'row',
    borderColor: 'gray', //appColor.BORDER,
    shadowColor: appColor.SHADOW,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.52,
    shadowRadius: 2.22,

    elevation: 5,
    width: wp('28%'),
    height: hp('10%'),
    backgroundColor: appColor.WHITE,
    marginRight: wp('3%'),
    marginLeft: wp('1%'),
    justifyContent: 'center',
    // flexWrap:'wraps'
  },
  viewInsideSmallBox: {
    alignItems: 'center',
  },
  textNumber: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: DeviceInfo.isTablet() ?fontConstant.TEXT_H2_SIZE_REGULAR :  fontConstant.TEXT_H3_SIZE_REGULAR,
    color: appColor.WHITE,
  },
});
