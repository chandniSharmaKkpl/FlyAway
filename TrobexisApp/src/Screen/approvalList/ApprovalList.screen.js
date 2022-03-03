import React, {useState, useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  RefreshControl,
  BackHandler,
} from 'react-native';
import stylesHome from '../home/Home.style';
import styles from './ApprovalList.style';
import {HeaderCustom, Loader} from '../../component';
import {useSelector, useDispatch} from 'react-redux';
import {
  appColor,
  appConstant,
  imageConstant,
  alertMsgConstant,
} from '../../constant';

import {requestGetApprovalListWithStatus} from './ApprovalList.action';
import {getDateInFormat} from '../../common';
import {requestAcceptApproval} from './ApprovalList.action';
import localDb from '../../database/localDb';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {useRoute, useNavigation} from '@react-navigation/core';

PENDING_INDEX = 0;
APPROVED_INDEX = 1;
DECLINED_INDEX = 2;

const ApprovalList = props => {
  const responseData = useSelector(state => state.HomeReducer);
  const responseApprovalData = useSelector(state => state.ApprovalListReducer);
  const route = useRoute();

  const dispatch = useDispatch();
  const [approvalList, setApprovalList] = useState(
    responseApprovalData.approvalList,
  ); // Getting approval list data from the home screen reducer
  const [refreshing, setRefreshing] = React.useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);

  //** This method will call when coming back from approval detail screen and show the data based on last selected index */
  onBackReceiveData = data => {
    let tempIndex = 0;
    if (data.status === appConstant.PENDING_APPROVAL) {
      tempIndex = PENDING_INDEX;
      setSelectedIndex(PENDING_INDEX);
    } else if (data.status === appConstant.APPROVED) {
      tempIndex = APPROVED_INDEX;
      setSelectedIndex(APPROVED_INDEX);
    } else {
      tempIndex = DECLINED_INDEX;
      setSelectedIndex(DECLINED_INDEX);
    }
    callApiToGetApprovalList(tempIndex);
  };

  //*** This will call everytime when pull to refresh call or segmented control index changed   */

  useEffect(() => {
    callApiToGetApprovalList(selectedIndex);
  }, [selectedIndex, refreshing]);

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

  const callApiToGetApprovalList = selectedIndex => {
    const tempUser = localDb.getUser();
    Promise.resolve(tempUser).then(response => {
      if (selectedIndex === PENDING_INDEX) {
        let param = {
          user: response,
          status: appConstant.PENDING_APPROVAL,
          navigation: props.navigation,
        };
        dispatch(requestGetApprovalListWithStatus(param));
      } else if (selectedIndex === APPROVED_INDEX) {
        let param = {
          user: response,
          status: appConstant.APPROVED,
          navigation: props.navigation,
        };
        dispatch(requestGetApprovalListWithStatus(param));
      } else {
        let param = {
          user: response,
          status: appConstant.DECLINED,
          navigation: props.navigation,
        };
        dispatch(requestGetApprovalListWithStatus(param));
      }
    });
  };

  const onRefresh = React.useCallback(() => {
    if (
      responseApprovalData.approvalListWithStatus &&
      responseApprovalData.approvalListWithStatus.length > 0
    ) {
      setRefreshing(true);
    }
  }, []);

  const onClickAccept = approvalId => {
    const tempUser = localDb.getUser();
    Promise.resolve(tempUser).then(response => {
      let param = {
        approvalId: approvalId,
        user: response,
        navigation: props.navigation,
      };
      dispatch(requestAcceptApproval(param));
      setRefreshing(false); //  use Effect call for refreshing approval list
    });
  };

  const onClickDecline = item => {
    props.navigation.navigate(appConstant.REASON, {
      approvalItem: item,
      onBackReceiveData: onBackReceiveData,
      callingView: appConstant.approvalList,
    });
  };

  const moveToDetailView = itemDetail => {
    props.navigation.navigate(appConstant.APPROVAL_DETAIL, {
      approvalId: itemDetail.id,
      requestor: itemDetail.requiredby,
      status: itemDetail.status,
      approvalItem: itemDetail,
      callingView: appConstant.approvalList,
      onBackReceiveData: onBackReceiveData,
    });
  };

  const renderItem = item => {
    let itemDetail = item.item;
    let date =
      itemDetail && itemDetail.requestdate ? itemDetail.requestdate : '';

    let requestdate = date ? getDateInFormat(date, false, false) : '';
    if (itemDetail) {
      return (
        <View style={styles.viewOutSide}>
          <Pressable
            style={styles.viewInside1}
            onPress={() => moveToDetailView(itemDetail)}>
            <View style={styles.viewInside2}>
              <View>
                <Text style={styles.textTitle}>{itemDetail.requiredby}</Text>
                <View style={styles.viewRow}>
                  <View style={styles.viewImages}>
                    <Image
                      style={styles.image}
                      resizeMode={'contain'}
                      source={imageConstant.IMAGE_PATH}
                    />
                  </View>
                  <Text style={styles.textDetail}>
                    {itemDetail.description}
                  </Text>
                </View>
                <View style={styles.viewRow}>
                  <View style={styles.viewImages}>
                    <Image
                      style={styles.image}
                      resizeMode={'contain'}
                      tintColor={appColor.NAVY_BLUE}
                      source={imageConstant.IMAGE_PASTE}
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
              {itemDetail.status &&
              itemDetail.status === appConstant.PENDING_APPROVAL ? (
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
                    <Pressable onPress={() => onClickDecline(item)}>
                      <Text style={styles.textButtonTitle}>Decline</Text>
                    </Pressable>
                  </View>
                </View>
              ) : null}
            </View>
          </Pressable>
        </View>
      );
    } else {
      return;
    }
  };

  const moveBack = () => {
    props.navigation.goBack();
  };

  const getDataFromResponse = () => {
    // if (
    //   responseApprovalData &&
    //   responseApprovalData.error &&
    //   Object.keys(responseApprovalData.error).length !== 0
    // ) {
    //   console.log(' errr', responseApprovalData);
    //   toast.show(responseApprovalData.error, {
    //     type: alertMsgConstant.TOAST_DANGER,
    //   });

    //   return;
    // }
    if (responseApprovalData && responseApprovalData.approvalListWithStatus) {
      if (refreshing) {
        setRefreshing(false);
      }
      //setApprovalList(responseApprovalData.approvalListWithStatus);
    }
    if (responseApprovalData && responseApprovalData.acceptResponse) {
      if (responseApprovalData.acceptResponse.message) {
        toast.show(responseApprovalData.acceptResponse.message, {
          type: alertMsgConstant.TOAST_SUCCESS,
        });

        let dict = responseApprovalData.acceptResponse;
        (dict.message = ''), (responseApprovalData.acceptResponse = dict);
        // setting state to call get approval list hook
        setRefreshing(true);
        callApiToGetApprovalList();
        // moveBack();
      }
    }
  };

  return (
    <>
      {getDataFromResponse()}
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
          viewProps={props}
        />
        <View style={styles.viewSegmentControl}>
          <SegmentedControl
            values={['Pending', 'Approved', 'Decline']}
            selectedIndex={selectedIndex}
            backgroundColor={appColor.NAVY_BLUE}
            tintColor={appColor.WHITE}
            onChange={event => {
              setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
              callApiToGetApprovalList(event.nativeEvent.selectedSegmentIndex);
            }}
            activeFontStyle={styles.segmentTextActive}
            style={styles.segmentControl}
            fontStyle={styles.segmentText}
          />
        </View>
        <View style={styles.viewFlatList}>
          {responseApprovalData &&
          responseApprovalData.approvalListWithStatus &&
          responseApprovalData.approvalListWithStatus.length > 0 ? (
            <>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                extraData={refreshing}
                data={responseApprovalData.approvalListWithStatus}
                renderItem={renderItem}
                keyExtractor={approvalListData => approvalListData.id}
              />
            </>
          ) : (
            <Text style={styles.textEmpty}>{alertMsgConstant.EMPTY_LIST}</Text>
          )}
        </View>
        {responseApprovalData.isRequesting || responseData.isRequesting ? (
          <Loader
            loading={
              responseApprovalData.isRequesting || responseData.isRequesting
            }
          />
        ) : null}
      </View>
    </>
  );
};

export default ApprovalList;
