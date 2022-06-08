import {Platform} from 'react-native';
import {apiConstant, appConstant} from '../../constant';
import axios from 'axios';

export const getJourneysListApi = argumentData => {
  console.log('argumentData = argumentData =>', argumentData);

  let approvalId = argumentData.data.approvalId;
  let deviceId = argumentData.data.user.deviceId;
  let apiBaseUrl = argumentData.data.user.apiBaseUrl;
  let clientToken = argumentData.data.user.clientToken;
  let userId = argumentData.data.user.userId;
  let clientCode = argumentData.data.user.client;

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

  instance.interceptors.response.use(undefined, async error => {
    if (error) {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${clientToken}`,
          DeviceId: deviceId,
          DeviceType: Platform.OS === 'android' ? 'ANDROID' : 'IOS',
        },
      };
      const data = {
        EntryDate: new Date(),
        Version: appConstant.APP_VERSION,
        Code: 'getJourneysListApi',
        ClientCode: clientCode,
        DeviceId: deviceId,
        UserId: userId,
        DataText: error.response.data.message,
      };
      console.log(
        'instance.interceptors.response ==> error ==> ',
        JSON.stringify(error.response.data, null, 4),
      );

      try {
        const res = await APIERROR.post('log', data, options);
        console.log(
          'instance.interceptors.response ==> api res ==> ',
          res.data,
        );
      } catch (error) {
        console.log('error', error);
      }
    }
    return Promise.reject(error);
  });

  let urlString = apiConstant.APPROVAL_ACCEPT_API;
  // urlString =  urlString.replace(':approvalId', approvalId);

  return instance
    .put(urlString, {approverId: userId})

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

// Submit Decline with Reasons calling by reason view

export const declineApprovalApi = argumentData => {
  let approvalId = argumentData.data.approvalId;
  let deviceId = argumentData.data.user.deviceId;
  let apiBaseUrl = argumentData.data.user.apiBaseUrl;
  let clientToken = argumentData.data.user.clientToken;
  let userId = argumentData.data.user.userId;
  let clientCode = argumentData.data.user.client;

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

  instance.interceptors.response.use(undefined, async error => {
    if (error) {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${clientToken}`,
          DeviceId: deviceId,
          DeviceType: Platform.OS === 'android' ? 'ANDROID' : 'IOS',
        },
      };
      const data = {
        EntryDate: new Date(),
        Version: appConstant.APP_VERSION,
        Code: 'declineApprovalApi',
        ClientCode: clientCode,
        DeviceId: deviceId,
        UserId: userId,
        DataText: error.response.data.message,
      };
      console.log(
        'instance.interceptors.response ==> error ==> ',
        JSON.stringify(error.response.data, null, 4),
      );

      try {
        const res = await APIERROR.post('log', data, options);
        console.log(
          'instance.interceptors.response ==> api res ==> ',
          res.data,
        );
      } catch (error) {
        console.log('error', error);
      }
    }
    return Promise.reject(error);
  });

  let urlString = apiConstant.APPROVAL_DECLINE_API;
  // urlString =  urlString.replace(':approvalId', approvalId);
  return instance
    .put(urlString, {approverId: userId})

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
