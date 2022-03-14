/* eslint-disable react/self-closing-comp */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
  TextInput,
  Keyboard,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from 'react-native';
import stylesCommon from '../../common/common.style';
import {useDispatch, useSelector} from 'react-redux';
import {Loader} from '../../component';

import stylesHome from '../home/Home.style';
import style from './declineReason.style';
import {HeaderCustom} from '../../component';
import {appConstant, appColor, alertMsgConstant} from '../../constant';
import IconAntDesing from 'react-native-vector-icons/AntDesign';
import {
  getOrientation,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from '../../responsiveScreen';
import {
  requestToGetDeclineReasons,
  requestDeclineApproval,
} from './declineReason.action';
import localDb from '../../database/localDb';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useRoute} from '@react-navigation/core';
import {toast} from 'react-native-toast-notifications';
// import {ScrollView} from 'react-native-gesture-handler';

const ReasonDecline = props => {
  const [orientation, setOrientation] = React.useState('portrait');
  const styles = StyleSheet.create(style);
  const dispatch = useDispatch();
  const responseGetReasonList = useSelector(
    state => state.DeclineReasonReducer,
  );
  // const responseDecline = useSelector(state => state.ApprovalListReducer);
  const route = useRoute();

  const [reason, setReason] = useState('Select Reason For Decline');
  const [reasonId, setReasonId] = useState('');

  const [showReasonList, setShowReasonList] = useState(false);
  console.log('showReasonList', showReasonList);
  const [comments, setComments] = useState('');
  const [textLimit, setTextLimit] = useState(0);

  useEffect(() => {
    // console.log('setOrientation', orientation);
    lor(setOrientation);
    return () => {
      rol();
    };
  }, []);

  useEffect(() => {
    // Call api to get reasons list
    const unsubscribe = props.navigation.addListener('focus', () => {
      const tempUser = localDb.getUser();
      Promise.resolve(tempUser).then(response => {
        let param = {
          user: response,
          approvalId: route.params ? route.params.approvalItem.item.id : '',
          navigation: props.navigation,
        };
        dispatch(requestToGetDeclineReasons(param));
      });
    });
    return unsubscribe;
  }, [dispatch, props.navigation, route]);

  const onClickSubmit = () => {
    const tempUser = localDb.getUser();
    Promise.resolve(tempUser).then(response => {
      let param = {
        comments: comments,
        reasonId: reasonId,
        user: response,
        approvalId: route.params ? route.params.approvalItem.item.id : '',
        navigation: props.navigation,
      };
      dispatch(requestDeclineApproval(param));
    });
  };
  const moveBack = () => {
    props.navigation.goBack();
    route.params.onBackReceiveData &&
      route.params.onBackReceiveData(route.params.approvalItem);
  };
  const renderReasonList = item => {
    return (
      <View>
        <Pressable
          onPress={() => {
            setReason(item.item.reason);
            setReasonId(item.item.id);
            setShowReasonList(!showReasonList);
          }}>
          <Text style={styles.textRow}>{item.item.reason}</Text>
        </Pressable>
        <View style={styles.singleLine} />
      </View>
    );
  };

  const getDataFromResponse = () => {
    if (responseGetReasonList.declineSubmitRes) {
      if (responseGetReasonList.declineSubmitRes.message) {
        toast.show(responseGetReasonList.declineSubmitRes.message, {
          type: alertMsgConstant.TOAST_SUCCESS,
        });
        let dict = responseGetReasonList.declineSubmitRes;
        (dict.message = ''), (responseGetReasonList.declineSubmitRes = dict);
        if (responseGetReasonList.declineSubmitRes.success) {
          moveBack();
        }
      }
    }
  };

  return (
    <>
      {getDataFromResponse()}
      <Pressable
        style={stylesHome.container}
        onPress={() => Keyboard.dismiss()}>
        <HeaderCustom
          title={'Reason For Decline'}
          viewName={appConstant.REASON}
          leftIcon={true}
          onClickLeftIcon={() => moveBack()}
          rightIcon={false}
          centerTitle={true}
          onClickRightIcon={() => {}}
          rightIconImage={''}
          viewProps={props}
        />
        <View>
          <View style={styles.viewTextInput}>
            <Text style={styles.textHello}>Reason for Declining?</Text>
            <View style={styles.buttonReason}>
              <TouchableOpacity
                onPress={() => {
                  setShowReasonList(!showReasonList);
                }}>
                <View
                  style={[
                    styles.buttonInsideReason,
                    {
                      width:
                        Platform.OS === 'android'
                          ? getOrientation() === 'portrait'
                            ? '100%'
                            : '86%'
                          : getOrientation() === 'portrait'
                          ? '100%'
                          : '86%',
                    },
                  ]}>
                  <Text multiline="true" style={styles.reasonText}>
                    {/* {reason === 'Select Reason For Decline'?  getDataFromResponse(responseGetReasonList): reason} */}
                    {reason}
                  </Text>
                  {showReasonList ? (
                    <IconAntDesing name="caretup" style={styles.iconCaret} />
                  ) : (
                    <IconAntDesing name="caretdown" style={styles.iconCaret} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.viewTextInput}>
            <Text style={styles.textHello}>Comments (Optional)</Text>
            <KeyboardAwareScrollView>
              <View style={styles.textAreaContainer}>
                <TextInput
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  placeholder="Add Additional Comments"
                  placeholderTextColor="grey"
                  // numberOfLines={10}
                  multiline={true}
                  value={comments}
                  onChangeText={value => {
                    if (value.length <= appConstant.COMMENT_MAX_LIMIT) {
                      setComments(value);
                      setTextLimit(value.length);
                    }
                  }}></TextInput>
                <Text style={styles.textLimit}>
                  {textLimit}/{appConstant.COMMENT_MAX_LIMIT}
                </Text>
              </View>
            </KeyboardAwareScrollView>
          </View>

          <Pressable
            style={stylesCommon.yellowButton}
            onPress={() => onClickSubmit()}>
            <Text
              style={[
                styles.buttonSearchBusTitle,
                stylesCommon.yellowButtonTitle,
              ]}>
              Submit Reason
            </Text>
          </Pressable>

          {showReasonList ? (
            <View
              style={[
                styles.viewFlatList,
                {
                  width:
                    Platform.OS === 'android'
                      ? getOrientation() === 'portrait'
                        ? '90%'
                        : '94%'
                      : getOrientation() === 'portrait'
                      ? '90%'
                      : '92.8%',
                },
              ]}>
              {/* <View> */}
              {responseGetReasonList.isRequesting ? (
                <View style={styles.loaderFlatList}>
                  <ActivityIndicator size="large" color={appColor.NAVY_BLUE} />
                </View>
              ) : (
                // <ScrollView>
                <FlatList
                  data={
                    responseGetReasonList && responseGetReasonList.declineReason
                      ? responseGetReasonList.declineReason
                      : []
                  }
                  renderItem={renderReasonList}
                  keyExtractor={(item, index) => index.toString()}
                />
              )}
              {/* </View> */}
            </View>
          ) : null}
          {responseGetReasonList.isRequesting ? (
            <Loader loading={responseGetReasonList.isRequesting} />
          ) : null}
        </View>
      </Pressable>
    </>
  );
};

export default ReasonDecline;
