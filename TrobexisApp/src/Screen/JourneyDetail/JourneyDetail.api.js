import {Platform} from 'react-native';
import {apiConstant, appConstant} from '../../constant';
import axios from 'axios';
import APIERROR from '../../api/apiBaseError';

export const getJourneyDetail = async argumentData => {
  let itineraryId = argumentData.data.itineraryId;
  let deviceId = argumentData.data.user.deviceId;
  let apiBaseUrl = argumentData.data.user.apiBaseUrl;
  let clientToken = argumentData.data.user.clientToken;
  let clientCode = argumentData.data.user.client;
  let userId = argumentData.data.user.userId;


  console.log(" argData ------",argumentData);
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
        Code: 'getJourneyDetail',
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
        // console.log(
        //   'instance.interceptors.response ==> api res ==> ',
        //   res.data,
        // );
      } catch (error) {
        console.log('error', error);
      }
    }
    return Promise.reject(error);
  });

  let urlString = apiConstant.GET_ITINARY_DETAIL;
  urlString = urlString.replace(':itineraryId', itineraryId);

 // console.log('itineraryId ==>', itineraryId);

  try {
    const response = await instance
      .get(urlString);
    const response_1 = await Promise.resolve({
      data: response,
    });
    let response1 = response_1.data.data;
    return response1;
  } catch (err) {
    console.log('88 api Erorr: ', err);
    return err.response.data;;
  }
};
