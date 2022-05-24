import {StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../responsiveScreen';
import fontConstant from '../../constant/fontConstant';
import appColor from '../../constant/colorConstant';
import DeviceInfo from 'react-native-device-info';

export default StyleSheet.create({
  textEmpty: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_12_SIZE_BOLD,
    color: appColor.NAVY_BLUE,
    flexWrap: 'wrap',
    alignSelf: 'center',
    paddingTop: hp('10%'),
  },
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
  viewFlatList: {
    flex: 1,
    // backgroundColor: appColor.RED,
    paddingLeft: wp('3%'),
    paddingRight: wp('1%'),
  },
  iconNumber: {
    fontSize: 20,
    color: appColor.NAVY_BLUE,
    //width:'100%'
  },
  viewSegmentControl: {
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
  },
  segmentControl: {
    width: '100%',
    height: hp('6%'),
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('70%'),
  },
  buttonTitle: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_12_SIZE_BOLD,
    color: appColor.WHITE,
    padding: '2%',
    alignItems: 'center',
  },
  viewInside1: {
    paddingTop: '1%',
    paddingBottom: '1%',
    paddingRight: '1%',
    // backgroundColor: appColor.GREEN,
  },
  buttonGreen: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: appColor.GREEN,
    // padding: hp('0.5%'),
  },
  buttonRed: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: appColor.RED,
  },

  viewTimePickAbus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: wp('3%'),
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
    backgroundColor: appColor.WHITE,
    margin: 10,
  },
  textTitle: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H3_SIZE_BOLD,
    color: appColor.NAVY_BLUE,
    flexWrap: 'wrap',
    paddingBottom: hp('1%'),
  },
  textDetail: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_12_SIZE_BOLD,
    color: appColor.NAVY_BLUE,
    flexWrap: 'wrap',
    paddingLeft: wp('2.5%'),
  },
  viewImages: {
    width: DeviceInfo.isTablet() ? wp('2.5%') : wp('3%'),
    height: hp('3%'),
  },

  viewImageIpad: {
    width: wp('2.5%'),
    height: hp('2.5%'),
  },
  image: {
    width: '100%',
    height: '100%',
    tintColor: appColor.NAVY_BLUE,
  },
  textButtonTitle: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_12_SIZE_BOLD,
    color: appColor.WHITE,
    padding: hp('1%'),
  },
  segmentText: {
    fontSize: fontConstant.TEXT_15_SIZE_BOLD,
    color: appColor.WHITE,
    fontFamily: fontConstant.BARLOW_BOLD,
  },
  segmentTextActive: {
    fontSize: fontConstant.TEXT_15_SIZE_BOLD,
    color: appColor.BLACK,
    fontFamily: fontConstant.BARLOW_BOLD,
  },
  viewInside2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '2%',
    // backgroundColor: 'pink',
    //  width:'75%'
  },
  viewButtons: {
    justifyContent: 'space-evenly',
    // backgroundColor:'pink'
  },

  tabsContainerStyle: {
    //custom styles
    //  backgroundColor:appColor.NAVY_BLUE
    borderRadius: 20,
  },
  tabStyle: {
    //custom styles
  },
  firstTabStyle: {
    //custom styles
  },
  lastTabStyle: {
    //custom styles
  },
  tabTextStyle: {
    //custom styles
  },
  activeTabStyle: {
    //custom styles
    backgroundColor: appColor.NAVY_BLUE,
    height: hp('8%'),
  },
  activeTabTextStyle: {
    //custom styles
    flexWrap: 'wrap',
  },
  tabBadgeContainerStyle: {
    //custom styles
  },
  activeTabBadgeContainerStyle: {
    //custom styles
  },
  tabBadgeStyle: {
    //custom styles
  },
  activeTabBadgeStyle: {
    //custom styles
  },
});
