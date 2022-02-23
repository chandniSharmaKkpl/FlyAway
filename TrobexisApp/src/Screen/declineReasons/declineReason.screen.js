import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import stylesCommon from '../../common/common.style';
import {useDispatch, useSelector} from 'react-redux';
import {Loader, AlertView} from '../../component';

import stylesHome from '../home/Home.style';
import styles from './declineReason.style';
import {HeaderCustom, BookingCard, backHandler} from '../../component';
import {Avatar} from 'react-native-elements';
import {appConstant, appColor, alertMsgConstant} from '../../constant';
import IconAntDesing from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  requestToGetDeclineReasons,
  requestDeclineApproval,
} from './declineReason.action';
import localDb from '../../database/localDb';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useRoute, useNavigation} from '@react-navigation/core';

const ReasonDecline = props => {
  const dispatch = useDispatch();
  const responseGetReasonList = useSelector(
    state => state.DeclineReasonReducer,
  );
  // const responseDecline = useSelector(state => state.ApprovalListReducer);
  const route = useRoute();

  const [reason, setReason] = useState('Select Reason For Decline');
  const [reasonId, setReasonId] = useState('');

  const [showReasonList, setShowReasonList] = useState(false);
  const [comments, setComments] = useState('');
  const [textLimit, setTextLimit] = useState(0);

  useEffect(() => {
    // Call api to get reasons list
    const unsubscribe = props.navigation.addListener('focus', () => {
      const tempUser = localDb.getUser();
      Promise.resolve(tempUser).then(response => {
        let param = {
          user: response,
          approvalId: route.params ? route.params.approvalItem.item.id : '',
          navigation: props.navigation
        };
        dispatch(requestToGetDeclineReasons(param));
      });
    });
    return unsubscribe;
  }, [props.navigation, route]);

  const onClickSubmit = () => {
    const tempUser = localDb.getUser();
    Promise.resolve(tempUser).then(response => {
      let param = {
        comments: comments,
        reasonId: reasonId,
         user: response,
         approvalId: route.params ? route.params.approvalItem.item.id : '',
         navigation: props.navigation
        };
      dispatch(requestDeclineApproval(param));
    });
  };
  const moveBack = () => {
    props.navigation.goBack();
    route.params.onBackReceiveData && route.params.onBackReceiveData(route.params.approvalItem)
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
                <View style={styles.buttonInsideReason}>
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
            <View style={styles.viewFlatList}>
              <>
                {responseGetReasonList.isRequesting ? (
                  <View style={styles.loaderFlatList}>
                    <ActivityIndicator
                      size="large"
                      color={appColor.NAVY_BLUE}
                    />
                  </View>
                ) : (
                  <FlatList
                    data={
                      responseGetReasonList &&
                      responseGetReasonList.declineReason
                        ? responseGetReasonList.declineReason
                        : []
                    }
                    renderItem={renderReasonList}
                    keyExtractor={(item, index) => index.toString()}
                  />
                )}
              </>
            </View>
          ) : null}
        </View>
        {responseGetReasonList.isRequesting ? (
          <Loader loading={responseGetReasonList.isRequesting} />
        ) : null}
      </Pressable>
    </>
  );
};

export default ReasonDecline;
