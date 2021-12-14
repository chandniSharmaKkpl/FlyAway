import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  RefreshControl,
} from 'react-native';
import stylesHome from '../home/Home.style';
import styles from './ApprovalList.style';
import {HeaderCustom, BookingCard, Loader, backHandler} from '../../component';
import {useSelector, useDispatch} from 'react-redux';
import {Avatar} from 'react-native-elements';
import {
  appColor,
  appConstant,
  imageConstant,
  alertMsgConstant,
  actionConstant
} from '../../constant';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {requestToGetApprovalList} from '../home/Home.action';

import {requestGetApprovalListWithStatus} from './ApprovalList.action';

import {getDateInFormat, useBackButton1} from '../../common';
import {
  requestAcceptApproval,
  requestDeclineApproval,
} from './ApprovalList.action';
import AuthContext from '../../context/AuthContext';
import localDb from '../../database/localDb';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

PENDING_INDEX = 0;
APPROVED_INDEX = 1;
DECLINED_INDEX = 2;

const ApprovalList = props => {
  const responseData = useSelector(state => state.HomeReducer);
  const responseApprovalData = useSelector(state => state.ApprovalListReducer);

  const dispatch = useDispatch();
  const [approvalList, setApprovalList] = useState(
    responseApprovalData.approvalList,
  ); // Getting approval list data from the home screen reducer
  const [refreshing, setRefreshing] = React.useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      const tempUser = localDb.getUser();
      Promise.resolve(tempUser).then(response => {
        let param = {
          user: response,
          status: appConstant.PENDING_APPROVAL,
          navigation: props.navigation
        };

        dispatch(requestGetApprovalListWithStatus(param));
      });
    });
    return () => {
      unsubscribe;
    };
  }, [props.navigation, props.route]);

  //*** This will call everytime when pull to refresh call or segmented control index changed   */
  
  useEffect(() => {
   callApiToGetApprovalList()
  }, [selectedIndex, refreshing]);

  const callApiToGetApprovalList = ()=>{
    const tempUser = localDb.getUser();
    Promise.resolve(tempUser).then(response => {

      if (selectedIndex === PENDING_INDEX) {
        let param = {
          user: response,
          status: appConstant.PENDING_APPROVAL,
          navigation: props.navigation
        };
        dispatch(requestGetApprovalListWithStatus(param));
      } else if (selectedIndex === APPROVED_INDEX) {
        let param = {
          user: response,
          status: appConstant.APPROVED,
          navigation: props.navigation
        };
        dispatch(requestGetApprovalListWithStatus(param));
      } else {
        let param = {
          user: response,
          status: appConstant.DECLINED,
          navigation: props.navigation
        };
        dispatch(requestGetApprovalListWithStatus(param));
      }
    });
  }

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
        navigation: props.navigation
      };
      dispatch(requestAcceptApproval(param));
      setRefreshing(false); //  use Effect call for refreshing approval list
    });
  };

  const onClickDecline = item => {
    props.navigation.navigate(appConstant.REASON, {approvalItem: item});
  };

  const moveToDetailView = itemDetail => {
  
     props.navigation.navigate(appConstant.APPROVAL_DETAIL, {approvalId: itemDetail.id, requestor: itemDetail.requestor});
  };

  const renderItem = item => {
    let itemDetail = item.item;
    let date =  itemDetail && itemDetail.requestdate? itemDetail.requestdate:'';
   
    let requestdate = date ? getDateInFormat(date, false, false) : '';
    if (itemDetail) {
      return (
        <View style={styles.viewOutSide}>
          <Pressable
            style={styles.viewInside1}
            onPress={() => moveToDetailView(itemDetail)}>
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
    }else{
      return
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
         callApiToGetApprovalList()
        // moveBack();
      }
    }
  };

  return (
    <>
      {(getDataFromResponse(), backHandler(moveBack))}
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
                keyExtractor={(item, index) => index.toString()}
              />
            </>
          ) : null}
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
