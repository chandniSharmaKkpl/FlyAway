import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, Image, FlatList, Pressable} from 'react-native';
import stylesHome from '../home/Home.style';
import styles from './ApprovalList.style';
import {HeaderCustom, BookingCard, Loader} from '../../component';
import {useSelector, useDispatch} from 'react-redux';
import {Avatar} from 'react-native-elements';
import {appColor, appConstant, imageConstant} from '../../constant';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import {getDateInFormat} from '../../common';
import {
  requestAcceptApproval,
  requestDeclineApproval,
} from './ApprovalList.action';
import AuthContext from '../../context/AuthContext';
import localDb from '../../database/localDb';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

const ApprovalList = props => {
  const responseData = useSelector(state => state.HomeReducer);
  const dispatch = useDispatch();
  const [approvalList, setApprovalList] = useState(responseData.approvalList); // Getting approval list data from the home screen reducer
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onClickAccept = approvalId => {
    const tempUser = localDb.getUser();
    Promise.resolve(tempUser).then(response => {
      let param = {approvalId: approvalId, user: response};
      dispatch(requestAcceptApproval(param));
    });
  };

  const onClickDecline = () => {
    props.navigation.navigate(appConstant.REASON);
  };

  const moveToDetailView = (id) => {
    props.navigation.navigate(appConstant.APPROVAL_DETAIL,{approvalId:id});
  };
  const renderItem = item => {
    let itemDetail = item.item;
    let date = itemDetail.requestdate;
    let requestdate = date ? getDateInFormat(date, false, false) : '';
    return (
      <View style={styles.viewOutSide}>
        <Pressable
          style={styles.viewInside1}
          onPress={() => moveToDetailView(itemDetail.id)}>
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
            <View style={styles.viewButtons}>
              <View style={styles.buttonGreen}>
                <Pressable
                  onPress={() => {
                    onClickAccept(itemDetail.id);
                  }}>
                  <Text style={styles.textButtonTitle}>Accept</Text>
                </Pressable>
              </View>
              <View style={styles.buttonRed}>
                <Pressable onPress={() => onClickDecline()}>
                  <Text style={styles.textButtonTitle}>Decline</Text>
                </Pressable>
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
      <View style={stylesHome.container}>
        <HeaderCustom
          title={'Approvals'}
          viewName={appConstant.APPROVALS}
          leftIcon={true}
          onClickLeftIcon={() => moveBack()}
          rightIcon={false}
          centerTitle={true}
          onClickRightIcon={() => {}}
          rightIconImage={''}
        />
        <View style={styles.viewSegmentControl}>
          <SegmentedControl
            values={['Pending', 'Approved', 'Decline']}
            selectedIndex={selectedIndex}
            backgroundColor={appColor.NAVY_BLUE}
            tintColor={appColor.WHITE}
            onChange={event => {
              setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
            }}
            activeFontStyle={styles.segmentTextActive}
            style={styles.segmentControl}
            fontStyle={styles.segmentText}
          />
          {/* <SegmentedControlTab
            tabsContainerStyle={styles.tabsContainerStyle}
            tabStyle={styles.tabStyle}
            firstTabStyle={styles.firstTabStyle}
            lastTabStyle={styles.lastTabStyle}
            tabTextStyle={styles.tabTextStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTabTextStyle={styles.activeTabTextStyle}
            selectedIndex={selectedIndex}
            allowFontScaling={false}
            values={['Pending Approvals', 'Approved', 'Decline']}
            onTabPress={index => setSelectedIndex(index)}
            borderRadius={10}
          /> */}
        </View>
        <View style={styles.viewFlatList}>
          <FlatList
            data={approvalList}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {responseData.isRequesting ? (
          <Loader loading={responseData.isRequesting} />
        ) : null}
      </View>
    </>
  );
};

export default ApprovalList;
