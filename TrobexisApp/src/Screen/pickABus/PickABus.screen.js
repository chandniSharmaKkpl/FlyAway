import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, Image, FlatList, BackHandler} from 'react-native';
import stylesHome from '../home/Home.style';
import stylesCommon from '../../common/common.style';
import {HeaderCustom, BookingCard} from '../../component';
import {Avatar} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {appColor, appConstant, imageConstant} from '../../constant';

const PickABus = props => {
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
      <View>
        <BookingCard
          item={item}
          titleColor={appColor.NAVY_BLUE}
          title={'Butler Park to Barrow Island'}
          viewName={appConstant.PICK_A_BUS}
        />
      </View>
    );
  };
  const onClickBack = useCallback(() => {
    props.navigation.goBack();
  }, []);
  return (
    <>
      <View style={stylesHome.container}>
        <HeaderCustom
          title={'Pick a Bus'}
          viewName={appConstant.PICK_A_BUS}
          leftIcon={false}
          rightIcon={true}
          centerTitle={true}
          onClickRightIcon={() => onClickBack()}
          rightIconImage={imageConstant.IMAGE_ARROW_BACK}
        />
        <Text style={stylesCommon.textHeading}>Pick a Bus</Text>

        {/* Bookinng list  */}
        <View style={{alignSelf: 'center', height: hp('18%')}}>
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

export default PickABus;
