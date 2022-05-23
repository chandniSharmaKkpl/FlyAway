import {Platform} from 'react-native';
import {apiConstant, appConstant} from '../../constant';
import axios from 'axios';

export const acceptApprovalApi = async argumentData => {

  let approvalId = argumentData.data.approvalId;
  let deviceId = argumentData.data.user.deviceId;
  let apiBaseUrl = argumentData.data.user.apiBaseUrl;
  let clientToken = argumentData.data.user.clientToken;
  let userId = argumentData.data.user.userId; 

  let urlString = apiBaseUrl + apiConstant.APPROVAL_ACCEPT_API;
  urlString = urlString.replace(':approvalId', approvalId);

  const raw = {
    approverId: userId,
  };

  console.log(" aprover id -----", argumentData); 

  let instance = axios.create({
    baseURL: apiBaseUrl,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${clientToken}`,
      DeviceId: deviceId,
      DeviceType: Platform.OS === 'android' ? 'ANDROID' : 'IOS',
    },
  });

  try {
   
    return instance
    .put(urlString,raw)
    .then(response =>
      Promise.resolve({
        data: response,
      }).then(response => {
        console.log(" approval resoinse ", response); 
        let response1 = response.data.data;
        return response1;
      }),
    )
    .catch(err => {
      console.log('48--- api Erorr: ', err.response);
      return err.response.data;
    });
  } catch (error) {
    console.log('52 ---===>> api Erorr: ', err.response);
    return error.response.data;
  }
};


// Submit Decline with Reasons calling by reason view

export const declineApprovalApi = argumentData => {
  let approvalId = argumentData.data.approvalId;
  let deviceId = argumentData.data.user.deviceId;
  let apiBaseUrl = argumentData.data.user.apiBaseUrl;
  let clientToken = argumentData.data.user.clientToken;
  let userId = argumentData.data.user.userId;

  let instance = axios.create({
    baseURL: apiBaseUrl,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${clientToken}`,
      DeviceId: deviceId,
      DeviceType: Platform.OS === 'android' ? 'ANDROID' : 'IOS',
    },
  });

  let urlString = apiConstant.APPROVAL_DECLINE_API;
  urlString =  urlString.replace(':approvalId', approvalId);

  return instance
    .put(urlString, {approverId: userId})

    .then(response =>
      Promise.resolve({
        data: response,
      }).then(response => {
        let response1 = response.data.data;
       console.log(' response => : ', response1);

        return response1;
      }),
    )
    .catch(err => {
     // console.log('88 api Erorr: ', err.response);
      return err.response.data;
    });
};

export const getApprovalListWithStatus = argumentData => {

  let deviceId = argumentData.data.user.deviceId? argumentData.data.user.deviceId:'';
  let apiBaseUrl = argumentData.data.user.apiBaseUrl;
  let clientToken = argumentData.data.user.clientToken;
  let status = argumentData.data.status;
  let userId = argumentData.data.user.userId;
  let instance = axios.create({
    baseURL: apiBaseUrl,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${clientToken}`,
      DeviceId: deviceId,
      DeviceType: Platform.OS === 'android' ? 'ANDROID' : 'IOS',
    },
  });

  let urlString = apiConstant.GET_APPROVAL_LIST_PLUS_STATUS;
  urlString = urlString.replace(':userId', userId);
  urlString = urlString.replace(':status', status);
 
console.log("urlString ==>", urlString);

  return instance
    .get(urlString)
    .then(response =>
      Promise.resolve({
        data: response,
      }).then(response => {
        let response1 = response.data.data;
        return response1;
      }),
    )
    .catch(err => {
      console.log('136 list satus  api Erorr: ', err.response);
      return err.response.data;
    });
};
