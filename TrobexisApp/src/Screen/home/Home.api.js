import {actionConstant, apiConstant, appConstant, errorCodeConstant} from '../../constant';
import localDB from '../../database/localDb';
import {ApiBase} from '../../api/apiBase';
import axios from 'axios';

export const getUserProfile = argumentData => {

  let deviceId = argumentData.user.deviceId;
  let apiBaseUrl = argumentData.user.apiBaseUrl;
  let clientToken = argumentData.user.clientToken;
  let userId = argumentData.user.userId;

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

  let urlString = apiConstant.USER_PROFILE;
  urlString = urlString.replace(':userId', userId);

  return instance
    .get(urlString)
    .then(response =>
      Promise.resolve({
        data: response,
      }).then(response => {
        let response1 = response?.data?.data;

        return response1;
      }),
    )
    .catch(err => {
      console.log('42 api Erorr: ', err.response);

      return err?.response?.data ? err?.response?.data : {code: errorCodeConstant.FORBIDDEN, message: "Network Error"};
    });
};

export const getItinaryList = argumentData => {
  //console.log('getUserProfile argument data in api : ', argumentData);

  let deviceId = argumentData.user.deviceId;
  let apiBaseUrl = argumentData.user.apiBaseUrl;
  let clientToken = argumentData.user.clientToken;
  let userId = argumentData.user.userId;

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

  let urlString = apiConstant.GET_ITINARY_LIST;
  urlString = urlString.replace(':userId', userId);
  //console.log(' url  data  : ', urlString);

  return instance
    .get(urlString)
    .then(response =>
      Promise.resolve({
        data: response,
      }).then(response => {
        let response1 = response.data.data;
        //console.log(' response : ', response1);

        return response1;
      }),
    )
    .catch(err => {
      //console.log('88 api Erorr: ', err.response);
      return err.response.data;
    });
};

export const getItinaryListAllJourney = argumentData => {
  // console.log('getItinaryListAllJourney argument data in api : ', argumentData);

  let deviceId = argumentData.user.deviceId;
  let apiBaseUrl = argumentData.user.apiBaseUrl;
  let clientToken = argumentData.user.clientToken;
  let userId = argumentData.user.userId;

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

  let urlString = apiConstant.GET_ITINARY_LIST_ALL_JOURNEY;
  urlString = urlString.replace(':userId', userId);
  //console.log(' url  data  : ', urlString);

  return instance
    .get(urlString)
    .then(response =>
      Promise.resolve({
        data: response,
      }).then(response => {
        let response1 = response.data.data;
        //console.log(' response : ', response1);

        return response1;
      }),
    )
    .catch(err => {
      //console.log('88 api Erorr: ', err.response);
      return err.response.data;
    });
};

export const getApprovalList = argumentData => {
  console.log('get approval list  argument data in api : ', argumentData);
  let deviceId = argumentData.user.deviceId;
  let apiBaseUrl = argumentData.user.apiBaseUrl;
  let clientToken = argumentData.user.clientToken;
  let userId = argumentData.user.userId;

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

  let urlString = apiConstant.GET_APPROVAL_LIST;
  urlString = urlString.replace(':userId', userId);
  //console.log(' url  data  : ', urlString);

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
      console.log('88 api Erorr: ', err.response);
      return err.response.data;
    });
};

export const getItinaryDetail = argumentData => {
  //console.log('getUserProfile argument data in api : ', argumentData);

  let deviceId = argumentData.user.deviceId;
  let apiBaseUrl = argumentData.user.apiBaseUrl;
  let clientToken = argumentData.user.clientToken;

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

  let urlString = apiConstant.GET_ITINARY_DETAIL;
  urlString = urlString.replace(':itineraryId', 'L4192');
  //console.log(' url  data  : ', urlString);

  return instance
    .get(urlString)
    .then(response =>
      Promise.resolve({
        data: response,
      }).then(response => {
        let response1 = response.data.data;
        //console.log(' response : ', response1);

        return response1;
      }),
    )
    .catch(err => {
      //console.log('88 api Erorr: ', err.response);
      return err.response.data;
    });
};
