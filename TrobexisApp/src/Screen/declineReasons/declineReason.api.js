import {Platform} from 'react-native';
import {apiConstant, appConstant} from '../../constant';
import axios from 'axios';
import APIERROR from'../../api/apiBaseError';

export const getDeclineReasonsApi = async argumentData => {
  let approvalId = argumentData.approvalId;
  let deviceId = argumentData.user.deviceId;
  let apiBaseUrl = argumentData.user.apiBaseUrl;
  let userId = argumentData.user.userId;
  let clientToken = argumentData.user.clientToken;
  let clientCode = argumentData.user.client;

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
      console.log("getDeclineReasonsApi -> error", error);
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
        Code: 'getDeclineReasonsApi',
        ClientCode: clientCode,
        DeviceId: deviceId,
        UserId: userId,
        DataText: error.response.data.message,
      };
      console.log(
        'instance.interceptors.response ==> error ==> getDeclineReasonsApi',
        JSON.stringify(error.response.data, null, 4),
      );

      try {
        const res = await APIERROR.post('log', data, options);
        console.log(
          'instance.interceptors.response ==> api res ==> getDeclineReasonsApi',
          res.data,
        );
      } catch (error) {
        console.log('error', error);
      }
    }
    return Promise.reject(error);
  });

  let urlString = apiBaseUrl + apiConstant.GET_DECLINE_REASONS;
  try {
    const response = await axios
      .get(urlString, {
        method: 'GET',
        body: JSON.stringify({
          approvalId: approvalId,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${clientToken}`,
          DeviceId: deviceId,
          DeviceType: Platform.OS === 'android' ? 'ANDROID' : 'IOS',
        },
      })
      .then(response => {
        let response1 = response.data.data;
        return response1;
      });
  } catch (error) {
    return error.response.data;
  }

  let arg = {'approvalId': approvalId}
  return instance
    .get(urlString, {approvalId: approvalId})

    .then(response =>
      Promise.resolve({
        data: response,
      }).then(response => {
        let response1 = response.data.data;
        return response1;
      }),
    )
    .catch(error => {
      console.log('66 api Erorr: ', error);
      return error.response.data;
    });
};

// Submit Decline with Reasons calling by reason view
export const declineApprovalApi = async argumentData => {

  let reasonId = argumentData.reasonId;
  let approvalId = argumentData.approvalId;
  let deviceId = argumentData.user.deviceId;
  let userId = argumentData.user.userId;
  let clientCode = argumentData.user.client;
  let apiBaseUrl = argumentData.user.apiBaseUrl;
  let clientToken = argumentData.user.clientToken;
  let comments = argumentData.comments;

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
          'instance.interceptors.response ==> api res ==>  ',
          res.data,
        );
      } catch (error) {
        console.log('error', error);
      }
    }
    return Promise.reject(error);
  });

  let urlString = apiBaseUrl + apiConstant.APPROVAL_DECLINE_API;
  urlString = urlString.replace(':approvalId', approvalId);
  console.log(' url  data  : ', urlString);
  const raw = {
    approverId: userId,
    ReasonId: reasonId,
    comments: comments,
  };
  console.log(approvalId,raw);

  try {
    return instance
      .put(urlString, raw)
      .then(response =>
        Promise.resolve({
          data: response,
        }).then(response => {
          let response1 = response.data.data;
          return response1;
        }),
      )
      .catch(err => {
        //console.log('88 api Erorr: ', err.response);
        return err.response.data;
      });
  } catch (error) {
    console.log('121  api Erorr: ', err.response);
    return error.response.data;
  }
};
