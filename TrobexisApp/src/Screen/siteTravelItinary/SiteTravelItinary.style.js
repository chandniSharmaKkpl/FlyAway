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
      //  width: wp('90%'),
        // height: hp('15%'),
        backgroundColor: appColor.WHITE,
       // margin: 10,
        flexWrap:'wrap',
        alignSelf:'center'

    },
    viewInside:{
        padding:15,
    },
    textBlue:{
        fontFamily: fontConstant.BARLOW_SEMI_BOLD,
        fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
        color: appColor.NAVY_BLUE,
    },
    textBlack:{
        fontFamily: fontConstant.BARLOW_REGULAR,
        fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
        color: appColor.BLACK,
    }
   
}
)