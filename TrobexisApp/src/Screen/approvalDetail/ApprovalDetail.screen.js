import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TextInput,
  BackHandler,
  Pressable,
} from 'react-native';
import stylesHome from '../home/Home.style';
import {useDispatch, useSelector} from 'react-redux';
import styles from './ApprovalDetail.style';
import {HeaderCustom, BookingCard, Loader, NotifyMessage} from '../../component';
import stylesCommon from '../../common/common.style';
import localDb from '../../database/localDb';
import {useRoute, useNavigation} from '@react-navigation/core';

import {appColor, appConstant, imageConstant} from '../../constant';

import {requestToGetApprovalDetail} from './ApprovalDetail.action';
import {getDateInFormat} from '../../common';

const ApprovalDetail = props => {
  const route = useRoute();
  const dispatch = useDispatch();
  const responseDetail = useSelector(state => state.ApprovalDetailReducer);
  const [isApiCall, setIsApiCall] = useState(false);
 
  const handleBackButtonClick = () => {
    moveBack();
    return true;
  };

  useEffect(() => {

    const unsubscribe = props.navigation.addListener('focus', () => {
      const tempUser = localDb.getUser();
      Promise.resolve(tempUser).then(response => {
        let param = {
          approvalId: route.params.approvalId ? route.params.approvalId : '',
          user: response,
        };
        setIsApiCall(true);
        dispatch(requestToGetApprovalDetail(param));
      });
    });

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
      unsubscribe;
    };
  }, []);

  const returnRowView = (title, subTitle) => {
    return (
      <View style={styles.viewRow}>
        <Text style={styles.textBlue}>{title}</Text>
        <Text style={styles.textSubTitle}>{subTitle}</Text>
      </View>
    );
  };

  const moveBack = () => {
    props.navigation.goBack();
  };

  const onClickApprove = () => {
    moveBack();
  };
  const onClickDecline = () => {
    props.navigation.navigate(appConstant.REASON);
  };

const getDataFromResponse=(responseDetail, value)=>{
   {
    // console.log(' responseDetail ---->', responseDetail);

    if (responseDetail) {
    
      let itemsData = responseDetail.responseDetail;
      if (value === 'Description') {
        return itemsData.Description; 
      } else {
        let tempArray = itemsData.Items;
      if (tempArray) {
        return  findIdByValue(tempArray, value);
       }else{
         return "N/A";
       }
      }
    }else{
      return "N/A"
    }
  }
}
  const checkResponseCode = ()=> {
    if (isApiCall) {
      if (
        responseDetail.error &&
        Object.keys(responseDetail.error).length !== 0
      ) {
        setIsApiCall(false);
        console.log(' errr', responseDetail);
        NotifyMessage(responseDetail.error);
        return;
      }
     
    }
  }

  const findIdByValue = (data, value) => {
    const el = data.find(el => el.Label === value); // Possibly returns `undefined`
    return el && el.Data; // so check result is truthy and extract `id`
  };

  return (
    <>
     {checkResponseCode()}
      <View style={stylesHome.container}>
        <HeaderCustom
          title={'Approval Details'}
          viewName={appConstant.APPROVAL_DETAIL}
          leftIcon={true}
          onClickLeftIcon={() => moveBack()}
          rightIcon={false}
          centerTitle={true}
          onClickRightIcon={() => {}}
          rightIconImage={''}
          viewProps={props}

        />
        <ScrollView>
          <View style={styles.viewOutSide}>
            <View style={styles.viewSection}>
              <Text style={styles.textBlackTitle}>
                Site Access Request (SAR #
                {route.params && route.params.approvalId
                  ? route.params.approvalId
                  : ''}
                )
              </Text>
              <View style={styles.viewInside}>
                <View style={styles.viewInsideTitle}>
                  <Text style={styles.textYellow}>
                    {getDataFromResponse(responseDetail, "Requestor")} ({getDataFromResponse(responseDetail, "TravellerID")})
                  </Text>
                  <Text style={styles.textRed}>{getDataFromResponse(responseDetail, "Status")}</Text>
                </View>
                <View style={styles.viewContainRow}>
                  {returnRowView('Request Creation Date:', getDataFromResponse(responseDetail,"EscalationDate"))}
                  {returnRowView('Company Name:', getDataFromResponse(responseDetail,"CompanyName"))}
                  {returnRowView('Sub Contractor:', getDataFromResponse(responseDetail,"Sub"))}
                  {returnRowView('Position:', getDataFromResponse(responseDetail,"Position"))}
                </View>
              </View>
            </View>

            <View style={styles.viewSection}>
              <Text style={styles.textBlackTitle}>Site Access Details</Text>
              <View style={styles.viewInside}>
                <View style={styles.viewContainRow}>
                  {returnRowView('Request Title:', getDataFromResponse(responseDetail,"TripReason"))}
                  {returnRowView('Site Location:', getDataFromResponse(responseDetail,"SiteLocation"))}
                  {returnRowView('Access Dates:', getDataFromResponse(responseDetail,"EscalationDate"))}
                  {returnRowView('Roaster Pattern:', getDataFromResponse(responseDetail,"Roaster"))}
                  {returnRowView('Travel Requirements:', getDataFromResponse(responseDetail,"Req"))}
                </View>
              </View>
            </View>

            <View style={styles.viewSection}>
              <Text style={styles.textBlackTitle}>Comments / Messages</Text>
              <View style={styles.viewInside}>
                {/* <View style={styles.textAreaContainer}> */}
                <Text style={styles.textArea}>{ getDataFromResponse(responseDetail,"AdditionalDetails")}</Text>
              </View>
              {/* </View> */}
            </View>

            <View style={styles.viewButtonBottom}>
              <Pressable
                style={stylesCommon.greenButton}
                onPress={() => onClickApprove()}>
                <Text
                  style={[
                    styles.buttonSearchBusTitle,
                    stylesCommon.yellowButtonTitle,
                  ]}>
                  Approve
                </Text>
              </Pressable>

              <Pressable
                style={stylesCommon.redButton}
                onPress={() => onClickDecline()}>
                <Text
                  style={[
                    styles.buttonSearchBusTitle,
                    stylesCommon.yellowButtonTitle,
                  ]}>
                  Decline
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
        {responseDetail.isRequesting ? (
          <Loader loading={responseDetail.isRequesting} />
        ) : null}
      </View>
    </>
  );
};

export default ApprovalDetail;
