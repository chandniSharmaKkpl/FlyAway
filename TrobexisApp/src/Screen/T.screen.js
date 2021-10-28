import React, { useState, useCallback } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import stylesHome from '../home/Home.style';
import { HeaderCustom, BookingCard } from '../../component';
import { Avatar } from "react-native-elements";
import {appColor, appConstant, imageConstant} from '../../constant';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ScreenName = (props) => {

    return (
        <>
            <View style={stylesHome.container}>
                <HeaderCustom />
                </View>
                </>
    )
}

export default ScreenName;