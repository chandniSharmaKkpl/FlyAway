import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import fontConstant from '../../constant/fontConstant';
import appColor from '../../constant/colorConstant';
export default StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor:appColor.LIGH_BLUE
    },
    textHello: {
        fontFamily: fontConstant.BARLOW_BOLD,
        fontSize: fontConstant.TEXT_H1_SIZE_BOLD,
        color: appColor.WHITE,
    },
    textBlackTitle:{
        fontFamily: fontConstant.BARLOW_BOLD,
        fontSize: fontConstant.TEXT_H2_5_SIZE_BOLD,
        color: appColor.BLACK,
        paddingBottom:'2%',
        paddingLeft:'2%',
    },
    viewOutSide:{
      
    },
    viewSection:{
        padding:'3%'
    },
    viewInside:{
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
        marginTop:'2%'
    },
    viewRow:{
        flexDirection:'row',
        padding: '1%',
        flexWrap:'wrap'
    },
    textYellow:{
        fontFamily: fontConstant.BARLOW_BOLD,
        fontSize: fontConstant.TEXT_H3_SIZE_BOLD,
        color: appColor.YELLOW,
    },
    textRed:{
        fontFamily: fontConstant.BARLOW_REGULAR,
        fontSize: fontConstant.TEXT_H1_SIZE_REGULAR,
        color: appColor.RED,
    },
    textBlue:{
        fontFamily: fontConstant.BARLOW_SEMI_BOLD,
        fontSize: fontConstant.TEXT_H1_SIZE_REGULAR,
        color: appColor.NAVY_BLUE,
    },
    textBlack:{
        fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H1_SIZE_REGULAR,
    color: appColor.GRAY,
    },
    textSubTitle:{
        fontFamily: fontConstant.BARLOW_REGULAR,
        fontSize: fontConstant.TEXT_H1_SIZE_REGULAR,
        color: appColor.GRAY,
      },
viewInsideTitle:{
  padding:'5%'
},
viewContainRow:{
   paddingLeft:'5%', 
   paddingRight:'5%', 
   paddingBottom:'5%' 
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
    flexDirection:'row',
    justifyContent:'space-between',
    //alignItems:'center'
  },
  textArea: {
    height: hp('10%'),
   // justifyContent: 'flex-start',
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_14_SIZE_BOLD,
    //backgroundColor:'pink', 
    width:'100%',
    padding:'5%'
   // paddingTop:hp('2%')
  },
  viewButtonBottom:{
      paddingTop:'5%', 
      paddingBottom:'5%'
  }

}
)