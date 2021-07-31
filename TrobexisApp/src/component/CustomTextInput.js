import React from 'react';
import { View, Text, Image } from 'react-native';
import appColor from '../constant/colorConstant';
import fontConstant from '../constant/fontConstant';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import imageConstant from '../constant/imageConstant';

const CustomTextInput = (props) => {

    return (
        <View style={[styles.viewOutSide, {width:props.width}]}>
            <View style={{paddingLeft:'5%', paddingRight:'5%',flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center', width:'100%'}}>

            
            <Text>{props.title}</Text>
            <View style={styles.viewImages}>
                <Image style={styles.image} resizeMode={'contain'} source={props.rightIcon} />
            </View>
            </View>
        </View>
    )

}
const styles = {
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
        // width: wp('90%'),
        height: hp('5%'),
        backgroundColor: appColor.WHITE,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    textDetail: {
        fontFamily: fontConstant.BARLOW_REGULAR,
        fontSize: fontConstant.TEXT_12_SIZE_BOLD,
        color: appColor.BLACK,
        flexWrap: 'wrap',
        paddingLeft: wp('2%')
    },
    viewImages: {
        width: wp('3%'),
        height: hp('3%'),
    },
    image: {
        width: '100%',
        height: '100%'
    }
}
export default CustomTextInput;