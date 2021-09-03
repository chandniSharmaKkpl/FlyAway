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

const NotificationScreen = props => {
  const [arrayBooking, setArrayBooking] = useState([1]);

  React.useEffect(() => {
    let array = [1, 2, 3];
    arrayBooking.push(array);
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const handleBackButtonClick = () => {
    props.navigation.goBack();
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
          onClickLeftIcon={()=> props.navigation.goBack()}
          leftIcon={true}
          rightIcon={false}
          centerTitle={true}
          onClickRightIcon={() => {}}
          rightIconImage={''}
        />
        <Text style={stylesCommon.textHeading}>Notifications</Text>

        {/* Bookinng list  */}
        <View style={{alignSelf: 'center',}}>
          <FlatList
            renderItem={renderItem}
            data={arrayBooking}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </>
  );
};

export default NotificationScreen;
