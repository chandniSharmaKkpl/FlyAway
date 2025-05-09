import {StyleSheet, Dimensions, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontConstant from '../../constant/fontConstant';
import appColor from '../../constant/colorConstant';

export default StyleSheet.create({
  viewCalendar: {
    paddingTop: hp('2%'),
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
    height: Platform.OS === 'ios' ?hp('47%'): hp('50%'),
    paddingBottom: hp('2%'),
  },
  viewTextInput: {
    width: '10%',
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: appColor.LIGH_BLUE,
  },

  viewCalendar1: {
    flexDirection: 'row',
    // paddingLeft: '5%',
    // paddingRight:'5%',
    paddingTop: '2%',
    paddingBottom: '2%',
    alignSelf: 'center',
  },

  viewButtonTextInput: {
    flexDirection: 'row',
    //paddingLeft: '5%',
    // paddingRight:'5%',
    paddingTop: '2%',
    paddingBottom: '2%',
    //backgroundColor:'pink',
    height: hp('10%'),
    alignSelf: 'center',
    width: wp('90%'),
    alignItems: 'center',
    // flex:1,
    //  flexWrap:'wrap'
  },
  buttonYellow: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flex: 1.9,

    // width:wp('15%'),
    // height:hp('5%'),
    backgroundColor: appColor.YELLOW,
  },
  buttonSearchBus: {
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
  viewFromText: {
    flex: 8.5,
    paddingLeft: wp('3%'),
  },
  buttonTitle: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_14_SIZE_BOLD,
    color: appColor.WHITE,
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    alignItems: 'center',
  },
  buttonSearchBusTitle: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_14_SIZE_BOLD,
    color: appColor.WHITE,
    paddingTop: hp('1.5%'),
    paddingBottom: hp('1.5%'),
    // paddingLeft:wp('1%'),
    // paddingRight:wp('1%'),
    alignItems: 'center',
  },
});
