import {StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../responsiveScreen';
import fontConstant from '../../constant/fontConstant';
import appColor from '../../constant/colorConstant';
export default StyleSheet.create({
  iconHeader: {
    height: hp('2.5%'),
    width: wp('8%'),
    marginTop: Platform.OS === 'android' ? hp('2%') : hp('6%'),
    marginLeft: wp('4%'),
    position:'absolute'
  },
  container: {
    width: '100%',
    height: '100%',
   // backgroundColor: appColor.RED,
  },
  textDeviceToken:{
   backgroundColor:'white',
   height:'30%',
   color: appColor.BLACK,
   padding: '2%'
  },
  webview:{
    width: wp('100%'), 
    height:hp('100%'), 
    position:'absolute'
  },
  IndicatorStyle: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  textDeviceToken:{
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H3_SIZE_BOLD,
    color: appColor.WHITE,
    backgroundColor:appColor.YELLOW
  },
  textHello: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H1_SIZE_BOLD,
    color: appColor.WHITE,
  },
  imageBackgnd: {
    flex: 1,
  },
  logoImage: {
    width: wp('75%'),
    height: hp('8%'),
    // backgroundColor: 'pink',
    alignSelf: 'center',
    marginTop: hp('10%'),
  },
  logoContainer: {
    marginBottom: 20,
  },
  btnLogin: {
    backgroundColor: appColor.YELLOW,
    width: wp('85%'),
    height: hp('7%'),
    borderRadius: 10,
    alignSelf: 'center',
    alignItems:'center',
    justifyContent:'center'
  },
  logo: {
    height: 90,
    width: '100%',
    marginVertical: 20,
  },
  imageIcon: {
    height: 200,
    width: '100%',
    position: 'absolute',
  },
  inputViewImage: {
    flex: 1,
  },
  scrollViewStyle: {
    flex: 1,
    paddingTop: 20,
  },
  titleView: {
padding:'7%'  },
  titleStyle: {
    color: appColor.YELLOW,
    textAlign: 'center',
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_45_SIZE_BOLD,
  },
  inputView: {
    flex: 1,
    //  backgroundColor:'pink'
    // paddingHorizontal: 20,
  },
  resetPasswordView: {
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  rememberIcon: {
    height: 16,
    width: 16,
    alignSelf: 'center',
  },
  loginButtonView: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  loginBtnStyles: {
    height: 50,
    justifyContent: 'center',
    marginTop: 50,
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  rememberMe: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  rememberMeText: {
    color: '#FFF',
    paddingLeft: 10,
  },
  forgotPwd: {
    color: appColor.WHITE,
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_H1_SIZE_REGULAR,
  },
  loginBtnText:{
    color: appColor.WHITE,
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_20_SIZE_BOLD,
  },
  createNewAccountText: {
    fontSize: 18,
    marginTop: 10,
  },
  error: {
    marginVertical: 10,
    textAlign: 'center',
  },
});
