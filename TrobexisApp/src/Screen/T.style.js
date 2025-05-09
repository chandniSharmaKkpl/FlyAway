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
}
)