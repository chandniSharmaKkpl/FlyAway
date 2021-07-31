import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import fontConstant from '../../constant/fontConstant';
import appColor from '../../constant/colorConstant';


export default StyleSheet.create({
  viewTextInput:{
    width:'10%'
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: appColor.LIGH_BLUE
  },
  
  viewButtonTextInput: {
    flexDirection: 'row',
    paddingLeft: '5%',
    paddingRight:'5%',
    paddingTop:'2%',
    paddingBottom:'2%',
    flexWrap:'wrap'
  },
  buttonYellow:{
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10, 
     width:wp('15%'),
    // height:hp('5%'),
    backgroundColor:appColor.YELLOW
  }, 
  buttonTitle:{
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_14_SIZE_BOLD,
    color: appColor.WHITE,
    padding:'5%', 
    alignItems:'center'
  }
}
)