import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, ScrollView, Pressable} from 'react-native';
import stylesHome from '../home/Home.style';
import {useDispatch, useSelector} from 'react-redux';
import styles from './ApprovalDetail.style';
import {HeaderCustom, BookingCard, Loader, backHandler} from '../../component';
import stylesCommon from '../../common/common.style';
import localDb from '../../database/localDb';
import {useRoute, useNavigation} from '@react-navigation/core';
import {requestAcceptApproval} from '../approvalList/ApprovalList.action';
import {appColor, appConstant, alertMsgConstant} from '../../constant';
import {requestToGetApprovalDetail} from './ApprovalDetail.action';

const arrayApprovalCode = [
  {code: 'SAR', codeName: 'Site Access Request'},
  {code: 'WTR', codeName: 'Workforce Travel Request'},
  {code: 'WKO', codeName: 'Work Orders'},
  {code: 'CTR', codeName: 'Corporate Travel Request'},
  {code: 'TSH', codeName: 'Timesheets'},
  {code: 'CRM', codeName: 'Crew Movements'},
  {code: 'FVR', codeName: 'Fleet Vehicle Requests'},
  {code: 'EQR', codeName: 'Equipment Request'},
  {code: 'APL', codeName: 'Accommodation Plans'},
];

const ApprovalDetail = props => {
  const route = useRoute();
  const dispatch = useDispatch();
  const responseDetail = useSelector(state => state.ApprovalDetailReducer);

  const [isApiCall, setIsApiCall] = useState(false);

  const handleBackButtonClick = () => {
    props.navigation.pop();
    return true;
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      const tempUser = localDb.getUser();
      Promise.resolve(tempUser).then(response => {
        let param = {
          approvalId: route.params.approvalId ? route.params.approvalId : '',
          user: response,
          navigation: props.navigation,
        };
        setIsApiCall(true);
        dispatch(requestToGetApprovalDetail(param));
      });
    });

    return () => {
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
    // props.navigation.goBack();
    // props.navigation.setOptions({'backData': route.params.approvalItem});
    props.navigation.goBack();
    route.params.onBackReceiveData(route.params.approvalItem);
  };

  const onClickApprove = () => {
    setIsApiCall(true);
    const tempUser = localDb.getUser();
    Promise.resolve(tempUser).then(response => {
      let param = {
        approvalId: route.params.approvalId ? route.params.approvalId : '',
        user: response,
        navigation: props.navigation,
      };
      dispatch(requestAcceptApproval(param));
    });
  };
  const onClickDecline = () => {
    props.navigation.navigate(appConstant.REASON, {
      approvalItem: {item: route.params.approvalItem},
    });
  };

  const getDataFromResponse = (responseDetail, value) => {
    {
      if (responseDetail) {
        let itemsData = responseDetail.responseDetail;
        if (value === 'Description') {
          return itemsData.Description;
        } else {
          let tempArray = itemsData.Items;
          if (tempArray) {
            return findIdByValue(tempArray, value);
          } else {
            return '';
          }
        }
      } else {
        return '';
      }
    }
  };
  const checkResponseCode = () => {
    if (isApiCall) {
      setIsApiCall(false);
    }
  };

  const findIdByValue = (data, value) => {
    const el = data.find(el => el.Label === value); // Possibly returns `undefined`
    return el && el.Data; // so check result is truthy and extract `id`
  };

  const getDetailNameOfApprovalCode = approvalCode => {
    let matchElement = arrayApprovalCode.find(
      item => item.code == approvalCode,
    );
    if (matchElement) {
      return matchElement.codeName + ' ';
    } else {
      return '';
    }
  };

  const returnViewBasedOnApprovalCode = approvalCode => {
    if (
      responseDetail &&
      responseDetail.responseDetail &&
      responseDetail.responseDetail.Items
    ) {
      return (
        <>
          {responseDetail.responseDetail.Items.map((item, index) => {
            return (
              <View style={[styles.viewRow]}>
                <Text style={styles.textBlue}>{item.Label}:</Text>
                <Text style={styles.textSubTitle}> {item.Data}</Text>
              </View>
            );
          })}
        </>
      );
    } else {
      return;
    }
  };

  return (
    <>
      {(checkResponseCode(), backHandler(handleBackButtonClick))}
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
                <Text>
                  {getDetailNameOfApprovalCode(
                    responseDetail.responseDetail.Type,
                  )}
                </Text>
                (
                <Text>
                  {responseDetail ? responseDetail.responseDetail.Type : ''}
                </Text>{' '}
                #
                {route.params && route.params.approvalId
                  ? route.params.approvalId
                  : ''}
                )
              </Text>
              <View style={styles.viewInside}>
                <View style={styles.viewInsideTitle}>
                  <Text style={styles.textYellow}>
                    {getDataFromResponse(responseDetail, 'TravellerName')}(
                    {getDataFromResponse(responseDetail, 'TravellerID')})
                  </Text>
                  <Text style={styles.textRed}>
                    {getDataFromResponse(responseDetail, 'Status')}
                  </Text>
                </View>
                <View style={styles.viewGrayLine} />
                <View style={styles.viewContainRow}>
                  {returnRowView(
                    'Request Creation Date:',
                    getDataFromResponse(responseDetail, 'StartDate'),
                  )}
                  {returnRowView(
                    'Company Name:',
                    getDataFromResponse(responseDetail, 'CompanyName'),
                  )}
                  {returnRowView(
                    'Sub Contractor:',
                    getDataFromResponse(responseDetail, 'SubContractName'),
                  )}
                  {returnRowView(
                    'Position:',
                    getDataFromResponse(responseDetail, 'Position'),
                  )}
                </View>
              </View>
            </View>

            <View style={styles.viewSection}>
              <Text style={styles.textBlackTitle}>Site Access Details</Text>
              <View style={styles.viewInside}>
                <View style={styles.viewInsideTitle}>
                  {returnViewBasedOnApprovalCode(
                    responseDetail ? responseDetail.responseDetail.Type : '',
                  )}
                </View>
              </View>
            </View>

            <View style={styles.viewSection}>
              <Text style={styles.textBlackTitle}>Comments / Messages</Text>
              <View style={styles.viewInside}>
                {/* <View style={styles.textAreaContainer}> */}
                <Text style={styles.textArea}>
                  {getDataFromResponse(responseDetail, 'Comments')}
                </Text>
              </View>
              {/* </View> */}
            </View>

            {route.params &&
            route.params.status &&
            route.params.status === appConstant.PENDING_APPROVAL ? (
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
            ) : null}
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
