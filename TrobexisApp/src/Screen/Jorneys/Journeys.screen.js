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

import {getDateInFormat, getDateTimeOfView} from '../../common';
const JourneyList = props => {
  const [orientation, setOrientation] = React.useState('portrait');

  const route = useRoute();
  const responseData = useSelector(state => state.HomeReducer);
  const dispatch = useDispatch();
  const [journeyList, setJourneyList] = useState(
    responseData.itinaryListAllJourney,
  ); // Getting approval list data from the home screen reducer
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [getDate, setGetDate] = useState();
  const [getStartTime, setGetStartTime] = useState();
  const [getEndTime, setGetEndTime] = useState();
  const [journeyListDateTime, setJourneyListDateTime] = useState();
  console.log('Journey responseData -->');

  useEffect(() => {
    lor(setOrientation);
    return () => {
      rol();
    };
  }, []);

  // useEffect(() => {
  //   journeyList.map(item => {
  //     console.log('journeyList =>', item);
  //     setJourneyListDateTime(item);
  //   });
  // }, [journeyList]);

  useEffect(async () => {
    let valueDate1 = await getDateTimeOfView(
      journeyListDateTime.startdatetime,
      true,
      false,
      false,
    );
    setGetDate(valueDate1);

    let valueStartTime = await getDateTimeOfView(
      journeyListDateTime.startdatetime,
      false,
      true,
      false,
    );
    setGetStartTime(valueStartTime);

    let valueStartTime1 = await getDateTimeOfView(
      journeyListDateTime.enddatetime,
      false,
      true,
      false,
    );
    setGetEndTime(valueStartTime1);
  }, [journeyListDateTime]);

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
    setJourneyListDateTime(itemDetail);
    // let requestdate = date ? getDateInFormat(date, true, false) : '';

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
                  {getDate}
                  {/* Api response {itemDetail.enddatetime} */}
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
                  {getStartTime} to {getEndTime}
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
