import React, { useState, useCallback } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import stylesHome from '../home/Home.style';
import { HeaderCustom, BookingCard } from '../../component';
import { Avatar } from "react-native-elements";
import imageConstant from '../../constant/imageConstant'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ForgotPassword = (props) => {

    return (
        <>
            <View style={stylesHome.container}>
                <HeaderCustom />
                </View>
                </>
    )
}

export default ForgotPassword;