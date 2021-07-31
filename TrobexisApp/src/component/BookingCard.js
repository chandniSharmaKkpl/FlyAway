import React  from 'react';
import { View, Text, Image } from 'react-native';
import appColor from '../constant/colorConstant';
import fontConstant from '../constant/fontConstant';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import imageConstant from '../constant/imageConstant';

const BookingCard = (props) => {
    let title = "Butler Park > Barrow Island"
    let date = '20-07-2021';
    let time = "10:30 AM"
    return (
        <View style={styles.viewOutSide}>
            <View style={{ padding: 15 }}>
                <Text style={[styles.textTitle, {color: props.titleColor}]}>Bus Booking- Butler Park to Barrow Island</Text>

                <View style={{flexDirection:'row', paddingTop:'5%', alignItems:'center'}}>
                    <View style={styles.viewImages}>
                        <Image style={styles.image} resizeMode={'contain'} source={imageConstant.IMAGE_PATH}/>
                    </View>
                    <Text style={styles.textDetail}>{title} </Text>
                </View>


                <View style={{flexDirection:'row'}}>

                    <View style={styles.viewInside}>
                        <View style={styles.viewImages}>
                            <Image style={styles.image} resizeMode={'contain'} source={imageConstant.IMAGE_CALENDAR_BLACK}/>
                        </View>
                        <Text style={styles.textDetail}>{date} </Text>
                    </View>

                    <View style={[styles.viewInside, {paddingLeft:wp('3%')}]}>
                        <View style={styles.viewImages}>
                            <Image style={styles.image} resizeMode={'contain'} source={imageConstant.IMAGE_CLOCK_BLACK}/>
                        </View>
                        <Text style={styles.textDetail}>{time} </Text>
                    </View>

                </View>
            </View>
        </View>
    )
}

export default BookingCard;

const styles = {
    viewInside: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems:'center'
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

    },
    textTitle: {
        fontFamily: fontConstant.BARLOW_BOLD,
        fontSize: fontConstant.TEXT_H3_SIZE_BOLD,
        color: appColor.YELLOW,
        flexWrap: 'wrap',
    },
    textDetail: {
        fontFamily: fontConstant.BARLOW_REGULAR,
        fontSize: fontConstant.TEXT_12_SIZE_BOLD,
        color: appColor.BLACK,
        flexWrap: 'wrap',
        paddingLeft:wp('2%')
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