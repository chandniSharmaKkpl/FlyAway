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
  textButton:{
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H2_SIZE_BOLD,
    color: appColor.WHITE,
  },
  iconMinus:{
  fontSize:20,
  color:appColor.WHITE,

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
    height: hp('15%'),
    backgroundColor: appColor.WHITE,
    margin: 10,
    //  flexWrap:'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewLuggage: {
    flexDirection: 'row',
    paddingLeft:wp('3%'),
    paddingRight:wp('3%')
  },
  viewMinus: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flex: 0.2,
    backgroundColor: appColor.YELLOW,
  },
  viewCount:{
flex:0.6,
alignItems:'center'
  },
  textCount: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_45_SIZE_BOLD,
    color: appColor.NAVY_BLUE,
  },
  textPiece: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H2_SIZE_BOLD,
    color: appColor.NAVY_BLUE,
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
  buttonSearchBusTitle: {
    
    paddingTop: hp('1.5%'),
    paddingBottom: hp('1.5%'),
    // paddingLeft:wp('1%'),
    // paddingRight:wp('1%'),
    alignItems: 'center',
  },
  imageIcon:{
    width:wp('5%'),
    height:hp('5%')
  },
  image: {
    width: '100%',
    height: '100%'
},
});
