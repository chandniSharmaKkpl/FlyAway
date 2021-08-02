import React, { useState, useCallback } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import stylesHome from '../home/Home.style';
import stylesCommon from '../../common/common.style';

import { HeaderCustom, BookingCard } from '../../component';
import { Avatar } from "react-native-elements";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {appColor, appConstant, imageConstant} from '../../constant'; 

const History = (props) => {

    return (
        <>
            <View style={stylesHome.container}>
            <HeaderCustom
                title={"History"} 
                viewName={appConstant.HISTORY} 
                leftIcon={true} rightIcon={true} 
                centerTitle={false}
                onClickRightIcon = {()=> {console.log("")}}
                rightIconImage={""} />

                <Text style={stylesCommon.textHeading}>Coming Soon</Text>
                </View>
                </>
    )
}

export default History;