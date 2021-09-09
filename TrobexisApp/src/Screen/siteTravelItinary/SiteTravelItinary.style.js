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
    shadowOpacity: 0.92,
    shadowRadius: 2.22,
    elevation: 5,
    width: wp('90%'),
    // height: hp('15%'),
    backgroundColor: appColor.WHITE,
    // margin: 10,
    flexWrap: 'wrap',
    alignSelf: 'center',
    // overflow:'hidden'
  },
  viewRowTop: {
    flexDirection: 'row',
    // justifyContent:'space-between',
    width: '100%',
    alignItems: 'center',
    paddingLeft: wp('5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
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
  },

  ViewBlueBottom: {
    backgroundColor: appColor.NAVY_BLUE,
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
    width: '33%',
    //backgroundColor: 'orange',
    // alignItems:'flex-end'
  },
  viewRightLocation: {
    flex:5,
    paddingLeft: '3%',
    marginRight: wp('5%')
    //backgroundColor: 'orange',
    // alignItems:'flex-end'
  },
  textWhite: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_H1_SIZE_REGULAR,
    color: appColor.WHITE,
  },

  viewInside: {
    padding: '3.5%',
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

  textBusBookValue : {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
    color: appColor.BLACK,
    flexWrap: 'wrap',
  width:wp('60%'),
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('100%'),
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingBottom: hp('2%'),
    // backgroundColor:'pink'
  },
  viewCancelButton: {
    paddingTop: hp('5%'),
    alignSelf: 'center',
  },
});
