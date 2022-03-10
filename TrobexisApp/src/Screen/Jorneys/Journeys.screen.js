import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  BackHandler,
} from 'react-native';
import {
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from '../../responsiveScreen';
import stylesHome from '../home/Home.style';
import styles from './Journeys.style';
import {HeaderCustom, BookingCard} from '../../component';
import {useSelector, useDispatch} from 'react-redux';
import {appColor, appConstant, imageConstant} from '../../constant';
import format from 'date-fns/format';
import {useRoute, useNavigation} from '@react-navigation/core';

import {getDateInFormat} from '../../common';
const JourneyList = props => {
  const [orientation, setOrientation] = React.useState('portrait');

  const route = useRoute();
  const responseData = useSelector(state => state.HomeReducer);
  const dispatch = useDispatch();
  const [journeyList, setJourneyList] = useState(
    responseData.itinaryListAllJourney,
  ); // Getting approval list data from the home screen reducer
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    console.log('setOrientation', orientation);
    lor(setOrientation);
    return () => {
      rol();
    };
  }, []);

  //** Back button handling  */
  useEffect(() => {
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

  const moveToDetailView = itemDetail => {
    props.navigation.navigate(appConstant.JOURNEY_DETAIL, {
      itineraryId: itemDetail.id,
    });
  };
  const getTimeInFormat = date => {
    if (date) {
      let tripTime = '';
      let parseDate = Date.parse(date);
      tripTime = format(parseDate, 'hh:mm a');
      return tripTime;
    }
    return '';
  };

  const renderItem = item => {
    let itemDetail = item.item;
    let date = itemDetail.requestdate;
    let requestdate = date ? getDateInFormat(date, true, false) : '';
    return (
      <View style={styles.viewOutSide}>
        <Pressable
          style={styles.viewInside1}
          onPress={() => {
            moveToDetailView(itemDetail);
          }}>
          <View style={styles.viewInside2}>
            <View>
              <Text style={styles.textTitle}>{itemDetail.title}</Text>
              <View style={styles.viewRow}>
                <View style={styles.viewImages}>
                  <Image
                    style={styles.image}
                    resizeMode={'contain'}
                    source={imageConstant.IMAGE_PATH}
                  />
                </View>
                <Text style={styles.textDetail}>
                  {itemDetail.departure} to {itemDetail.destination}
                </Text>
              </View>
              <View style={styles.viewRow}>
                <View style={styles.viewImages}>
                  <Image
                    style={styles.image}
                    resizeMode={'contain'}
                    source={imageConstant.IMAGE_CALENDAR_BLUE}
                  />
                </View>
                <Text style={styles.textDetail}>
                  {getDateInFormat(itemDetail.startdatetime, true, false)} to{' '}
                  {getDateInFormat(itemDetail.enddatetime, true, false)}
                </Text>
              </View>
              <View style={styles.viewRow}>
                <View style={styles.viewImages}>
                  <Image
                    style={styles.image}
                    resizeMode={'contain'}
                    tintColor={appColor.NAVY_BLUE}
                    source={imageConstant.IMAGE_CLOCK_BLACK}
                  />
                </View>
                <Text style={styles.textDetail}>
                  {getTimeInFormat(itemDetail.startdatetime)} to{' '}
                  {getTimeInFormat(itemDetail.enddatetime)}
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  const moveBack = () => {
    props.navigation.goBack();
  };

  return (
    <>
      {/* { backHandler(moveBack)} */}
      <View style={stylesHome.container}>
        <HeaderCustom
          title={'Journeys'}
          viewName={appConstant.JOURNEY_LIST}
          leftIcon={true}
          onClickLeftIcon={() => moveBack()}
          rightIcon={false}
          centerTitle={true}
          onClickRightIcon={() => {}}
          rightIconImage={''}
          viewProps={props}
        />

        <View style={styles.viewFlatList}>
          <FlatList
            data={journeyList}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </>
  );
};

export default JourneyList;
