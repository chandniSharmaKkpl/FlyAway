import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  BackHandler,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import stylesHome from '../home/Home.style';
import stylesCommon from '../../common/common.style';
import {HeaderCustom, BookingCard, Loader} from '../../component';
import {Avatar} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from '../../responsiveScreen';
import {appColor, appConstant, imageConstant} from '../../constant';
import {requestToGetBusRoute} from './PickABus.action';
import {connect} from 'react-redux';

const PickABus = props => {
  const [orientation, setOrientation] = React.useState('portrait');

  const [arrayBooking, setArrayBooking] = useState([1]);
  const response = useSelector(state => state.PickABusReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('setOrientation', orientation);
    lor(setOrientation);
    return () => {
      rol();
    };
  }, []);

  React.useEffect(() => {
    let array = [1, 2, 3];
    arrayBooking.push(array);
    const unsubscribe = props.navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      dispatch(requestToGetBusRoute(props.route.params.busBookingData));
    });
    return () => {
      unsubscribe;
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [props.route.params]);

  const handleBackButtonClick = () => {
    props.navigation.goBack();
  };

  const renderItem = item => {
    return (
      <Pressable
        onPress={() =>
          props.navigation.navigate(appConstant.ADD_LUGGAGE, {
            pickABusData: {
              selectedBus: item,
              busBookingData: props.route.params.busBookingData,
            },
          })
        }>
        <BookingCard
          item={item.item}
          titleColor={appColor.NAVY_BLUE}
          viewName={appConstant.PICK_A_BUS}
        />
      </Pressable>
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
          leftIcon={true}
          onClickLeftIcon={() => props.navigation.goBack()}
          rightIcon={false}
          centerTitle={true}
          onClickRightIcon={() => {}}
          rightIconImage={''}
          viewName={appConstant.PICK_A_BUS}
        />
        <Text style={stylesCommon.textHeading}>Pick a Bus</Text>

        {/* Bookinng list  */}
        <View style={{alignSelf: 'center'}}>
          <FlatList
            renderItem={renderItem}
            data={response.busRoute}
            extraData={response.busRoute}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {response.isRequesting ? <Loader loading={props.isRequesting} /> : null}
      </View>
    </>
  );
};

export default PickABus;
