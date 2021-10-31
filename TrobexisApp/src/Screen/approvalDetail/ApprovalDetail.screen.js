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
  const [arrayItems, setArrayItems] = useState([]);
  const [isApiCall, setIsApiCall] = useState(false);
  const [status, setStatus] = useState('N/A');
  const [requestor, setRequestor] = useState('N/A');
  const [creationDate, setCreationDate] = useState('N/A');
  const [subContractor, setSubContractor] = useState('N/A');
  const [position, setPosition] = useState('N/A');
  const [requestTitle, setRequestTitle] = useState('N/A');
  const [siteLocation, setSiteLocation] = useState('N/A');
  const [accessDates, setAccessDates] = useState('N/A');
  const [roasterPattern, setRoasterPattern] = useState('N/A');
  const [travelRequirement, setTravelRequirement] = useState('N/A');
  const [comment, setComment] = useState('N/A');
  const [travellerId, setTravellerId] = useState('N/A');

  const [companyName, setCompanyName] = useState('N/A');

  const handleBackButtonClick = () => {
    moveBack();
    return true;
  };

  useEffect(() => {
    console.log(' route params ', route.params);

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

  const checkResponseCode = useCallback(() => {
    if (isApiCall) {
      // console.log(' responseDetail ---->', responseDetail);

      if (
        responseDetail.error &&
        Object.keys(responseDetail.error).length !== 0
      ) {
        setIsApiCall(false);
        console.log(' errr', responseDetail);
        NotifyMessage(responseDetail.error);
        return;
      }
      if (responseDetail) {
        setIsApiCall(false);
        let itemsData = responseDetail.responseDetail;
        console.log(' responseDetail ---->', responseDetail);
        if (itemsData.Description) {
          setRequestTitle(itemsData.Description);
        }
        let tempArray = itemsData.Items;
        if (tempArray) {
          let value1 = findIdByValue(tempArray, 'Requestor');
          if (value1) {
            setRequestor(value1);
          }
          let value2 = findIdByValue(tempArray, 'EscalationDate');
          // let dateValue =  getDateInFormat(value2, false, false);
          value2 ? setCreationDate(value2) : '';

          findIdByValue(tempArray, 'Status')
            ? setStatus(findIdByValue(tempArray, 'Status'))
            : '';

          findIdByValue(tempArray, 'TravellerID')
            ? setTravellerId(findIdByValue(tempArray, 'TravellerID'))
            : '';
          findIdByValue(tempArray, 'CompanyName')
            ? setCompanyName(findIdByValue(tempArray, 'CompanyName'))
            : '';
          findIdByValue(tempArray, 'AdditionalDetails')
            ? setComment(findIdByValue(tempArray, 'AdditionalDetails'))
            : '';
        }
      }
    }
  });

  const findIdByValue = (data, value) => {
    const el = data.find(el => el.Label === value); // Possibly returns `undefined`
    console.log(' emlnet is ------', el);
    return el && el.Data; // so check result is truthy and extract `id`
  };
  return (
    <>
      {checkResponseCode()}
      <View style={stylesHome.container}>
        <HeaderCustom
          title={'Approval Detail'}
          viewName={appConstant.APPROVAL_DETAIL}
          leftIcon={true}
          onClickLeftIcon={() => moveBack()}
          rightIcon={false}
          centerTitle={true}
          onClickRightIcon={() => {}}
          rightIconImage={''}
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
                    {requestor} ({travellerId})
                  </Text>
                  <Text style={styles.textRed}>{status}</Text>
                </View>
                <View style={styles.viewContainRow}>
                  {returnRowView('Request Creation Date:', creationDate)}
                  {returnRowView('Company Name:', companyName)}
                  {returnRowView('Sub Contractor:', subContractor)}
                  {returnRowView('Position:', position)}
                </View>
              </View>
            </View>

            <View style={styles.viewSection}>
              <Text style={styles.textBlackTitle}>Site Access Detail</Text>
              <View style={styles.viewInside}>
                <View style={styles.viewContainRow}>
                  {returnRowView('Request Title:', requestTitle)}
                  {returnRowView('Site Location:', siteLocation)}
                  {returnRowView('Access Dates:', accessDates)}
                  {returnRowView('Roaster Pattern:', roasterPattern)}
                  {returnRowView('Travel Requirements:', travelRequirement)}
                </View>
              </View>
            </View>

            <View style={styles.viewSection}>
              <Text style={styles.textBlackTitle}>Comments / Messages</Text>
              <View style={styles.viewInside}>
                {/* <View style={styles.textAreaContainer}> */}
                <Text style={styles.textArea}>{comment}</Text>
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
