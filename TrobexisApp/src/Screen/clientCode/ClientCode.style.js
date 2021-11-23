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
 
  imageTop:{
   flex:0.5
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
    justifyContent:'center', 
    marginTop:hp('5%')
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
    paddingTop:hp('7%') 
    },

  titleStyle: {
    color: appColor.YELLOW,
    textAlign: 'center',
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_45_SIZE_BOLD,
  },
  inputView: {
    //flex: 1,
      paddingTop:hp('5%'),
    //  backgroundColor:'pink',
      justifyContent:'center',
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
  tokenStyle:{
    backgroundColor:'rgba(254, 182,8,0.7)', 
    textAlign:'center',
    marginTop:'15%',
    marginBottom:'2%',
    padding:'5%',
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
  }
});
