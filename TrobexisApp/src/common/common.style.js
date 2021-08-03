import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import fontConstant from '../constant/fontConstant';
import appColor from '../constant/colorConstant';

export default StyleSheet.create({

    textHeading: {
        fontFamily: fontConstant.BARLOW_BOLD,
        fontSize: fontConstant.TEXT_H2_SIZE_BOLD,
        color: appColor.BLACK,
        padding: '5%',
    
      },
      image:{
        width:'100%',
        height:'100%'
      }
}
)