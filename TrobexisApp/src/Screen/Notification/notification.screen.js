import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, Image, FlatList, BackHandler, Pressable} from 'react-native';
import stylesHome from '../home/Home.style';
import stylesCommon from '../../common/common.style';
import {HeaderCustom, BookingCard} from '../../component';
import {Avatar} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {appColor, appConstant, imageConstant} from '../../constant';
import {useRoute, useNavigation} from '@react-navigation/core';

const NotificationScreen = props => {
  const [arrayBooking, setArrayBooking] = useState([]);
  const route = useRoute();

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const handleBackButtonClick = () => {
    if (route.params && route.params.callingView) {
      props.navigation.navigate(route.params.callingView);
    } else {
      props.navigation.goBack();
    }
    return true;
  };

  const renderItem = item => {
    return (
      <Pressable>
        <BookingCard
          item={item}
          titleColor={appColor.NAVY_BLUE}
          viewName={appConstant.NOTIFICATIONS}
        />
      </Pressable>
    );
  };
  const onClickBack = useCallback(() => {
    props.navigation.pop();
  }, []);
  
  return (
    <>
      <View style={stylesHome.container}>
      <HeaderCustom
          title={'Notifications'}
          viewName={appConstant.NOTIFICATIONS}
          onClickLeftIcon={()=> {
           console.log(" route.params", route.params); 
            props.navigation.goBack()}}
          leftIcon={true}
          rightIcon={false}
          centerTitle={true}
          onClickRightIcon={() => {}}
          rightIconImage={''}
        />
        <Text style={stylesCommon.textHeading}>Notifications</Text>

        {/* Bookinng list  */}
        <View style={{alignSelf: 'center',}}>
          {arrayBooking.length>0? 
          <FlatList
            renderItem={renderItem}
            data={arrayBooking}
            keyExtractor={(item, index) => index.toString()}
          />:
          <Text style={stylesCommon.textHeading}>Coming Soon</Text>
        }
        </View>
      </View>
    </>
  );
};

export default NotificationScreen;
