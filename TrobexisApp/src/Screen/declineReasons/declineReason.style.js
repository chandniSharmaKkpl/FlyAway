import {StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  getOrientation,
} from '../../responsiveScreen';
import fontConstant from '../../constant/fontConstant';
import appColor from '../../constant/colorConstant';
export default {
  loaderFlatList: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  reasonText: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_H1_SIZE_REGULAR,
    color: appColor.BLACK,
    paddingLeft: '2%',
    paddingRight: '2%',
    width: wp('75%'),
    paddingTop: '2%',
    paddingBottom: '2%',
    // height:hp('4%')
  },
  singleLine: {
    width: '100%',
    height: hp('0.05%'),
    backgroundColor: appColor.GRAY_LIGHT,
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: appColor.LIGH_BLUE,
  },
  textHello: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H2_SIZE_BOLD,
    color: appColor.BLACK,
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
  },
  viewTextInput: {
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
  },
  buttonReason: {
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
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
    //height: hp('6%'),
    backgroundColor: appColor.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewRow: {},
  textRow: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_14_SIZE_BOLD,
    color: appColor.BLACK,
    paddingLeft: wp('5%'),
    paddingRight: '2%',
    paddingTop: '5%',
    paddingBottom: '5%',
  },
  textAreaContainer: {
    //padding: '5%',
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
    height: hp('20%'),
    paddingLeft: wp('5%'),

    textAlignVertical: 'top', // android fix for centering it at the top-left corner

    //justifyContent: 'flex-start',
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_14_SIZE_BOLD,
    // backgroundColor:'green',
    width: '100%',
    paddingBottom: hp('2.5%'),
  },
  iconCaret: {
    fontSize: 14,
    color: appColor.BLUE_DARK,
  },
  buttonInsideReason: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'pink',
    // width: getOrientation() === 'landscap' ? '90%' : '100%',
    alignItems: 'center',
    height: hp('7%'),
  },
  viewFlatList: {
    height: hp('30%'),
    // backgroundColor: 'pink',

    backgroundColor: appColor.WHITE,
    position: 'absolute',
    // width: getOrientation() === 'portrait' ? '90%' : '94%',
    // width: '90%',
    top: hp('13.8%'),
    alignSelf: 'center',
    borderBottomLeftRadius: 10,
    borderColor: Platform.OS === 'android' ? appColor.BORDER : appColor.GRAY,
    shadowColor: appColor.SHADOW,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: Platform.OS === 'android' ? 0.2 : 0.62,
    shadowRadius: Platform.OS === 'android' ? 1.2 : 2.22,
    elevation: 5,
  },
  textLimit: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_H2_SIZE_REGULAR,
    color: appColor.GRAY,
    position: 'absolute',
    bottom: hp('1.0%'),
    right: wp('2%'),
    alignSelf: 'flex-end',
  },
};
