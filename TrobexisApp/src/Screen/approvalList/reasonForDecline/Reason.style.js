import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import fontConstant from '../../../constant/fontConstant';
import appColor from '../../../constant/colorConstant';
export default StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor:appColor.LIGH_BLUE
    },
    textHello: {
       
        fontFamily: fontConstant.BARLOW_BOLD,
        fontSize: fontConstant.TEXT_H2_SIZE_BOLD,
        color: appColor.BLACK,
    },
    viewTextInput:{
        padding:'2%'
    },
    buttonReason:{
     padding:'5%' ,
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
     height: hp('6%'),
     backgroundColor: appColor.WHITE,
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',  
    }
}
)