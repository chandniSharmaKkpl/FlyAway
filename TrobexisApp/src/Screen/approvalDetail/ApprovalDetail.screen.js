import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Pressable, BackHandler} from 'react-native';
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
import {
  approvalDateTimeFormate,
  convertDateTime,
  getDateInFormat,
  msToTime,
} from '../../common';
import moment from 'moment';

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
  const responseUser = useSelector(state => state.HomeReducer); // Getting api response

  const [isApiCall, setIsApiCall] = useState(false);

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

  const returnRowView = (title, subTitle, type) => {
    if (type == 'DateTime') {
      return (
        <View style={[styles.viewRow]}>
          <Text style={styles.textBlue}>{title}:</Text>
          <Text style={styles.textSubTitle}>
            {subTitle ? (
              approvalDateTimeFormate(
                subTitle,
                false,
                false,
                true,
                responseUser.userProfile.settings,
              )
            ) : (
              <></>
            )}
          </Text>
        </View>
      );
    }
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

  function sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  const returnViewBasedOnApprovalCode = approvalCode => {
    if (
      responseDetail &&
      responseDetail.responseDetail &&
      responseDetail.responseDetail.Items
    ) {
      //** first sort array based on order they provided then display in access detail section  */
      let arraySort = sortByKey(responseDetail.responseDetail.Items, 'Order');
      return (
        <>
          {arraySort &&
            arraySort.map((item, index) => {
              if (item.Type == 'DateTime') {
                return (
                  <View style={[styles.viewRow]}>
                    <Text style={styles.textBlue}>{item.Label}:</Text>
                    <Text style={styles.textSubTitle}>
                      {approvalDateTimeFormate(
                        item.Data,
                        false,
                        false,
                        true,
                        responseUser.userProfile.settings,
                      )}
                    </Text>
                  </View>
                );
              }
              return (
                <View style={[styles.viewRow]}>
                  <Text style={styles.textBlue}>{item.Label}:</Text>
                  <Text style={styles.textSubTitle}>{item.Data}</Text>
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
                    {getDataFromResponse(responseDetail, 'Traveller Name')}(
                    {getDataFromResponse(responseDetail, 'Traveller ID')})
                  </Text>
                  <Text style={styles.textRed}>
                    {getDataFromResponse(responseDetail, 'Status')}
                  </Text>
                </View>
                <View style={styles.viewGrayLine} />
                <View style={styles.viewContainRow}>
                  {returnRowView(
                    'Request Creation Date',
                    getDataFromResponse(responseDetail, 'Start Date'),
                    'DateTime',
                  )}
                  {returnRowView(
                    'Company Name:',
                    getDataFromResponse(responseDetail, 'Company Name'),
                  )}
                  {returnRowView(
                    'Sub Contractor:',
                    getDataFromResponse(responseDetail, 'SubContract Name'),
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

            {/* <View style={styles.viewSection}>
              <Text style={styles.textBlackTitle}>Comments / Messages</Text>
              <View style={styles.viewInside}>
                {/* <View style={styles.textAreaContainer}> */}
            {/* <Text style={styles.textArea}>
                  {getDataFromResponse(responseDetail, 'Comments')}
                </Text>
              </View> */}
            {/* </View> 
            </View> */}

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
