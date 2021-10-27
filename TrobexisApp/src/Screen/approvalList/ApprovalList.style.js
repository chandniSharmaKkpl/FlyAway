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
  viewFlatList: {
    flex: 1,
  },

  viewSegmentControl:{
    padding:'5%',

  },
  segmentControl:{
   width:'100%',
   height:hp('6%')
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width:wp('70%')
  },
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
  buttonGreen: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: appColor.GREEN,
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
    //   width: wp('90%'),
    //   height: hp('15%'),
    backgroundColor: appColor.WHITE,
    margin: 10,
    //  flexWrap:'wrap',
    //   alignItems: 'center',
    //   justifyContent: 'center',
  },
  textTitle: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H3_SIZE_BOLD,
    color: appColor.NAVY_BLUE,
    flexWrap: 'wrap',
    paddingBottom:hp('1%')
  },
  textDetail: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_12_SIZE_BOLD,
    color: appColor.NAVY_BLUE,
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
  textButtonTitle: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_12_SIZE_BOLD,
    color: appColor.WHITE,
    padding: '2%',
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
});
