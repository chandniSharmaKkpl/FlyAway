import React, { useState, useCallback } from 'react';
import { View, Text, Image, FlatList, Pressable } from 'react-native';
import stylesHome from '../home/Home.style';
import styles from './BusBooking.style';
import { HeaderCustom, BookingCard, cus, CustomTextInput } from '../../component';
import { Avatar } from "react-native-elements";
import imageConstant from '../../constant/imageConstant'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import appColor from '../../constant/colorConstant';


const BusBookingScreen = (props) => {

    const [arrayBooking, setArrayBooking] = useState([1])

    const renderItem = (item) => {
        return (
            <View>
                <BookingCard item={item} titleColor={appColor.NAVY_BLUE} />
            </View>
        )
    }

    return (
        <>
            <View style={stylesHome.container}>
                <HeaderCustom title={"Make a Booking"}/>
                <Text style={styles.textHeading}>Make a Booking</Text>

                <View style={styles.viewButtonTextInput}>
                    <CustomTextInput title={"Tuesday, July 20,2021"} rightIcon={imageConstant.IMAGE_CALENDAR_BLACK} width={wp('90%')} />
                </View>

                <View style={styles.viewButtonTextInput}>
                    <View style={styles.buttonYellow}>
                        <Text style={styles.buttonTitle}>From:</Text>
                    </View>
                    <View style={{ paddingLeft: wp('3%') }}>
                        <CustomTextInput title={"Butler Park(034)"} rightIcon={imageConstant.IMAGE_ARROW_DOWN} width={wp('72%')} />
                    </View>
                </View>

                <View style={styles.viewButtonTextInput}>
                    <View style={styles.buttonYellow}>
                        <Text style={styles.buttonTitle}>To:</Text>
                    </View>
                    <View style={{ paddingLeft: wp('3%') }}>
                        <CustomTextInput title={"Barrow Island(BWB)"} rightIcon={imageConstant.IMAGE_ARROW_DOWN} width={wp('72%')} />
                    </View>

                </View>

                <>
                    <Text style={styles.textHeading}>Upcoming Journeys</Text>
                    {/* Bookinng list  */}
                    <View style={{ alignSelf: 'center', height: hp('18%') }}>
                        <FlatList
                            renderItem={renderItem}
                            data={arrayBooking}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </>

            </View>
        </>
    )
}

export default BusBookingScreen;