import {StyleSheet, Platform, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../responsiveScreen';
import fontConstant from '../../constant/fontConstant';
import appColor from '../../constant/colorConstant';

const LEFT_PADDING = '5%';
export default StyleSheet.create({
  viewSpace: {
    paddingTop: '4%',
  },
  viewDashedLine: {
    width: 1,
    position: 'absolute',
    borderRadius: 1,
    borderWidth: 1,
    left: 25,
    // top: '20%',
    borderColor: appColor.GRAY_MIDIUM,
    borderStyle: 'dashed',
    zIndex: 0,
  },
  viewDotted: {
    // position: 'absolute',
    // left: 0,
    // bottom: 0,
    // width: 1,
    // height: '100%',
    // zIndex: 1,
  },
  viewRowOutSide: {
    flexDirection: 'row',
  },
  viewLeftLine: {
    zIndex: 9999,
  },
  viewCircleBlue: {
    backgroundColor: appColor.NAVY_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  viewDetail: {
    paddingTop: '5%',
  },
  imageSideColomn: {
    tintColor: appColor.WHITE,
    width: '100%',
    height: '100%',
  },
  imageSVG: {
    width: 50,
    height: 50,
  },
  viewPlaneImg: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '43%',
    height: '43%',
  },
  textNoShow: {
    fontFamily: fontConstant.BARLOW_SEMI_BOLD,
    fontSize: fontConstant.TEXT_H2_SIZE_REGULAR,
    color: appColor.WHITE,
  },
  textT: {
    fontFamily: fontConstant.BARLOW_SEMI_BOLD,
    fontSize: fontConstant.TEXT_20_SIZE_BOLD,
    color: appColor.WHITE,
    alignSelf:'center', 
    marginTop:-3
  },
  buttonTextRed: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColor.RED,
    borderRadius: 8,
    width: wp('12%'),
    height: hp('6%'),
  },
  viewCircleGray: {
    backgroundColor: appColor.GRAY_MIDIUM,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: hp('5%'),
  },
  iconInCircle: {
    width: '5%',
    height: '5%',
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
  textBlackTitle: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H2_5_SIZE_BOLD,
    color: appColor.BLACK,
    paddingLeft: '2%',
  },

  textConfirmed: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H1_SIZE_REGULAR,
    color: appColor.BLACK,
    paddingLeft: '2%',
    paddingTop: '0.5%',
  },
  textNotConfirmed: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H1_SIZE_REGULAR,
    color: appColor.RED,
    paddingLeft: '2%',
    paddingTop: '0.5%',
  },
  viewSection: {
    padding: '3%',
  },

  viewItineraryList: {
  marginTop : '8%',
  },
  viewInside: {
    backgroundColor: appColor.WHITE,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: Platform.OS === 'android' ? appColor.BORDER : appColor.GRAY,
    shadowColor: appColor.SHADOW,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: Platform.OS === 'android' ? 0.2 : 0.62,
    shadowRadius: Platform.OS === 'android' ? 1.2 : 2.22,
    elevation: 5,
    marginTop: '2%',
  },
  viewRow: {
    padding: '1%',
  },
  textRed: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_H1_SIZE_REGULAR,
    color: appColor.RED,
  },
  textSubTitle: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_H2_SIZE_REGULAR,
    color: appColor.GRAY,
    flexWrap: 'wrap',
    width: wp('54%'),
    marginTop: '2%',
    marginBottom: '2%',
  },

  viewInsideTitle: {
    padding: '5%',
  },
  viewContainRow: {
    paddingLeft: wp('3%'),
    paddingRight: '5%',
    paddingBottom: '5%',
    paddingTop: '3%',
  },
  textAreaContainer: {
    padding: '5%',
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
    backgroundColor: appColor.WHITE,
    borderRadius: 10,
    marginBottom: hp('5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  textArea: {
    height: hp('10%'),
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_14_SIZE_BOLD,
    width: '100%',
    padding: '5%',
  },
  viewButtonBottom: {
    paddingTop: '5%',
    paddingBottom: '5%',
  },

  viewOutSide: {
    borderRadius: 14,
    borderColor: appColor.GRAY,
    shadowColor: appColor.SHADOW,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.92,
    shadowRadius: 2.22,
    elevation: 5,
    // width: wp('100%'),
    backgroundColor: appColor.WHITE,
    marginLeft: '3%',
  },
  viewRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: wp('77%'),
    height: hp('11%'),
    alignItems: 'center',
    // paddingTop: hp('2%'),
    // paddingBottom: hp('2%'),
    // paddingRight: '5%',
    paddingLeft: '5%',
    position: 'relative',
    //  backgroundColor: 'pink',

  },
  buttonBusYellow: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColor.YELLOW,
    borderRadius: 8,
    width: wp('12%'),
    height: hp('5%'),
  },
  viewBusImage: {
    width: wp('6%'),
    height: hp('3%'),
  },
  textYellow: {
    fontFamily: fontConstant.BARLOW_SEMI_BOLD,
    fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
    color: appColor.YELLOW,
    // backgroundColor:'orange',
  },
  leftLine: {
    height: '100%',
    // width: 1,
    // flex: 1,
    borderLeftWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderLeftColor: appColor.NAVY_BLUE,
    // backgroundColor: 'pink',
  },
  imagePlan: {
    height: 30,
    aspectRatio: 1,
    // padding: '15%',
  },
  flightNumber: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_H3_SIZE_REGULAR,
  },
  flightCodeNumber: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_H3_SIZE_REGULAR,
    marginTop: 8,
  },
  viewSingleLine: {
    width: '100%',
    height: hp('0.07%'),
    backgroundColor: appColor.NAVY_BLUE,
  },

  viewLeft: {
    // paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    width: wp('52%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
    // backgroundColor:'pink', 

  },

  ViewBlueBottom: {
    backgroundColor: appColor.NAVY_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: '100%',
  },

  ViewBlueBottomIpad: {
    backgroundColor: appColor.RED,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: 100,
  },

  ViewGrayBottom: {
    backgroundColor: appColor.GRAY_MIDIUM,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: '100%',
  },

  buttonRed: {
    backgroundColor: appColor.RED,
    borderRadius: 10,
    width: wp('90%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlueBig: {
    fontFamily: fontConstant.BARLOW_SEMI_BOLD,
    fontSize: fontConstant.TEXT_H2_SIZE_REGULAR,
    color: appColor.NAVY_BLUE,
  },
  viewArrow: {
    width: wp('2.5%'),
    height: hp('2.5%'),
    alignSelf: 'center',
  },
  viewLocation: {
    // width: '33%',
    // backgroundColor: 'orange',
    // alignItems:'flex-end'
  },
  textConfirmedInBox: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_H2_SIZE_REGULAR,
    color: appColor.BLACK,
    paddingTop: '0.5%',
  },
  textNotConfirmedInBox: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_H2_SIZE_REGULAR,
    color: appColor.RED,
    paddingTop: '0.5%',
  },
  viewRightLocation: {
    //flex: 5,
    //paddingLeft: '3%',
    //marginRight: wp('1%'),
    //backgroundColor: 'orange',
    // alignItems:'flex-end'
  },
  textWhite: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_H1_SIZE_REGULAR,
    color: appColor.WHITE,
    alignItems: 'center',
  },

  viewInside: {
    padding: '3.5%',
  },
  viewInside2: {
    backgroundColor: appColor.WHITE,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: Platform.OS === 'android' ? appColor.BORDER : appColor.GRAY,
    shadowColor: appColor.SHADOW,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: Platform.OS === 'android' ? 0.2 : 0.62,
    shadowRadius: Platform.OS === 'android' ? 1.2 : 2.22,
    elevation: 5,
    marginTop: '2%',
  },
  textRedButton: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_20_SIZE_BOLD,
    color: appColor.WHITE,
    padding: '3%',
  },
  textBlue: {
    fontFamily: fontConstant.BARLOW_SEMI_BOLD,
    fontSize: fontConstant.TEXT_H2_SIZE_REGULAR,
    color: appColor.NAVY_BLUE,
  },
  textBlack: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_H2_SIZE_REGULAR,
    color: appColor.BLACK,
    // flexWrap: 'wrap',
  },
dayNumberText:{
  fontFamily: fontConstant.BARLOW_REGULAR,
  fontSize: fontConstant.TEXT_10_SIZE_REGULAR,
  color: appColor.BLACK,
},
  textBusBookValue: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
    color: appColor.BLACK,
    flexWrap: 'wrap',
    width: wp('60%'),
  },

  viewDepartsAndArrive: {
    flexDirection: 'row',
    paddingTop: hp('2%'),
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
    alignItems: 'center',
  },

  viewItinerary: {
    paddingLeft: wp('3%'),
    paddingRight: wp('2%'),
    paddingBottom: hp('2%'),
  },
  scrollView: {
    paddingBottom: hp('20%'),
  },
});
