import {StyleSheet, Platform, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../responsiveScreen';
import fontConstant from '../../constant/fontConstant';
import appColor from '../../constant/colorConstant';
export default StyleSheet.create({
  viewSpace: {
    paddingTop: '4%',
  },
  viewDashedLine: {
    height: 470,
    width: 1,
    position: 'absolute',
    borderRadius: 1,
    borderWidth: 1,
    left: 25,
    top: '22%',
    borderColor: appColor.GRAY_MIDIUM,
    borderStyle: 'dashed',
    zIndex: 0,
  },
  viewDotted: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 1,
    height: '100%',
    backgroundColor: 'white',
    zIndex: 1,
  },
  viewRowOutSide: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    //alignItems: 'center',
    // backgroundColor:'pink'
  },
  viewLeftLine: {
    zIndex: 9999,
    // justifyContent: 'center',
    // alignItems: 'center',
    //backgroundColor:'green',
    // paddingTop:"18%"
  },
  viewCircleBlue: {
    backgroundColor: appColor.NAVY_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    // marginTop: hp('13%'),
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
    // backgroundColor:'pink'
  },
  textNoShow: {
    fontFamily: fontConstant.BARLOW_SEMI_BOLD,
    fontSize: fontConstant.TEXT_H2_SIZE_REGULAR,
    color: appColor.WHITE,
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
    // paddingBottom: '1%',
    paddingLeft: '2%',
    // paddingTop:'2%'
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
    paddingTop: '3%',
  },
  viewInside: {
    //  height: hp('35%'),
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
    // flexDirection: 'row',
    padding: '1%',
  },
  textYellow: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H3_SIZE_BOLD,
    color: appColor.YELLOW,
  },
  textRed: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_H1_SIZE_REGULAR,
    color: appColor.RED,
  },
  textSubTitle: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_H1_SIZE_REGULAR,
    color: appColor.GRAY,
    flexWrap: 'wrap',
    width: wp('54%'),
    // backgroundColor:'red'
  },
  textBlue: {
    fontFamily: fontConstant.BARLOW_SEMI_BOLD,
    fontSize: fontConstant.TEXT_H1_SIZE_REGULAR,
    color: appColor.NAVY_BLUE,
  },
  textBlack: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H1_SIZE_REGULAR,
    color: appColor.GRAY,
  },
  viewInsideTitle: {
    padding: '5%',
  },
  viewContainRow: {
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '5%',
    paddingTop: '3%',
    // backgroundColor:'orange'
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
    //alignItems:'center'
  },
  textArea: {
    height: hp('10%'),
    // justifyContent: 'flex-start',
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_14_SIZE_BOLD,
    //backgroundColor:'pink',
    width: '100%',
    padding: '5%',
    // paddingTop:hp('2%')
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
    width: wp('100%'),
    // height: hp('15%'),
    // backgroundColor: appColor.WHITE,
    //  backgroundColor:'pink',
    // margin: 10,
    marginLeft: '3%',
    // marginTop: '5%',
    // flexWrap: 'wrap',
    // alignSelf: 'center',

    // overflow:'hidden'
  },
  viewRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('77%'),
    alignItems: 'center',
    // paddingLeft: wp('5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
    //  backgroundColor:'pink',
    paddingRight: '5%',
    paddingLeft: '5%',
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
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H3_SIZE_BOLD,
    color: appColor.YELLOW,
  },
  viewSingleLine: {
    //  position:'relative',
    width: '100%', //hp('40%'),
    height: hp('0.07%'),
    backgroundColor: appColor.NAVY_BLUE,
  },

  viewLeft: {
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    width: wp('55%'),
    //backgroundColor:'pink'
  },

  ViewBlueBottom: {
    backgroundColor: appColor.NAVY_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: '100%',
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
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H3_SIZE_BOLD,
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
    //  height: hp('35%'),
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
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
    color: appColor.NAVY_BLUE,
  },
  textBlack: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
    color: appColor.BLACK,
    flexWrap: 'wrap',
  },

  textBusBookValue: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
    color: appColor.BLACK,
    flexWrap: 'wrap',
    width: wp('60%'),
    // backgroundColor:'pink'
  },

  viewDepartsAndArrive: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingTop: hp('2%'),
    // paddingBottom:hp('2%'),
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
    alignItems: 'center',
    //flexWrap:'wrap',
    //flex:1,
  },

  viewItinerary: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // width: wp('70%'),
    paddingLeft: wp('5%'),
    paddingRight: wp('2%'),
    // alignItems: 'center',
    // flexWrap: 'wrap',
    paddingBottom: hp('2%'),
    //  backgroundColor:'pink'
  },
  scrollView: {
    paddingBottom: hp('20%'),
    // height:hp('90%')
  },
});
