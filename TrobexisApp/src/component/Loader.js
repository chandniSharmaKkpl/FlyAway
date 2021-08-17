
import React from "react";
import {View, ActivityIndicator} from 'react-native';
import {appColor} from '../constant';

const Loader= (props)=>{

    const {loading} = props
    return(
        <>
        {loading? <View style={{justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size="large" color={appColor.NAVY_BLUE} />
        </View>: null}
        </>
    )
}

export default Loader;