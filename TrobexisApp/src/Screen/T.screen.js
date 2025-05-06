import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image, FlatList, BackHandler } from 'react-native';
import stylesHome from '../home/Home.style';
import { HeaderCustom, BookingCard } from '../../component';
import { Avatar } from "react-native-elements";
import {appColor, appConstant, imageConstant} from '../../constant';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stylesCommon from '../../common/common.style';
import styles from './T.style';

const ScreenName = (props) => {
    const handleBackButtonClick = () => {
        moveBack();
        return true;
      };
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    
        return () => {
          BackHandler.removeEventListener(
            'hardwareBackPress',
            handleBackButtonClick,
          );
        };
      }, []);
    const moveBack = () => {
        props.navigation.goBack();
      };
    return (
        <>
            <View style={stylesHome.container}>
            <HeaderCustom
          title={'Approval Detail'}
          viewName={appConstant.APPROVAL_DETAIL}
          leftIcon={true}
          onClickLeftIcon={() => moveBack()}
          rightIcon={false}
          centerTitle={true}
          onClickRightIcon={() => {}}
          rightIconImage={''}
        />
                </View>
                </>
    )
}

export default ScreenName;