import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, Image, FlatList, Pressable} from 'react-native';
import stylesHome from '../home/Home.style';
import styles from './Journeys.style';
import {HeaderCustom, BookingCard} from '../../component';
import {useSelector, useDispatch} from 'react-redux';
import {Avatar} from 'react-native-elements';
import {appColor, appConstant, imageConstant} from '../../constant';

import {getDateInFormat} from '../../common';

import AuthContext from '../../context/AuthContext';
import localDb from '../../database/localDb';

const JourneyList = props => {
  const responseData = useSelector(state => state.HomeReducer);
  const dispatch = useDispatch();
  const [journeyList, setJourneyList] = useState(responseData.itinaryListAllJourney); // Getting approval list data from the home screen reducer
  const [selectedIndex, setSelectedIndex] = useState(0);

  

  const renderItem = item => {
    let itemDetail = item.item;
    let date = itemDetail.requestdate;
    let requestdate = date ? getDateInFormat(date, false, false) : '';
    return (
      <View style={styles.viewOutSide}>
        <View style={styles.viewInside1}>
          <View style={styles.viewInside2}>
            <View>
              <Text style={styles.textTitle}>{itemDetail.requestor}</Text>
              <View style={styles.viewRow}>
                <View style={styles.viewImages}>
                  <Image
                    style={styles.image}
                    resizeMode={'contain'}
                    source={imageConstant.IMAGE_PATH}
                  />
                </View>
                <Text style={styles.textDetail}>{itemDetail.description}</Text>
              </View>
              <View style={styles.viewRow}>
                <View style={styles.viewImages}>
                  <Image
                    style={styles.image}
                    resizeMode={'contain'}
                    source={imageConstant.IMAGE_BUS_BLUE}
                  />
                </View>
                <Text style={styles.textDetail}>#{itemDetail.id}</Text>
              </View>
              <View style={styles.viewRow}>
                <View style={styles.viewImages}>
                  <Image
                    style={styles.image}
                    resizeMode={'contain'}
                    source={imageConstant.IMAGE_CALENDAR_BLUE}
                  />
                </View>
                <Text style={styles.textDetail}>{requestdate}</Text>
              </View>
            </View>
           
          </View>
        </View>
      </View>
    );
  };

  const moveBack = () => {
    props.navigation.goBack();
  };

  return (
    <>
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
