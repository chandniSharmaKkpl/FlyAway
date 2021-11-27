
import React from "react";
import {View, ActivityIndicator} from 'react-native';
import {appColor} from '../constant';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { BackgroundImage } from "react-native-elements/dist/config";

const Loader= (props)=>{

    const {loading} = props
    return(
        <>
        {loading?  <View style={{
            justifyContent:'center', alignItems:'center', 
              position:'absolute', 
           marginTop: hp('45%'),
           marginLeft:wp('50%'),
        }}>
            <ActivityIndicator size="large" color={appColor.NAVY_BLUE} />
        </View>: null}
        </>
    )
}

export default Loader;