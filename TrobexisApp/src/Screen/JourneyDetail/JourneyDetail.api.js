import {Platform} from 'react-native';
import {apiConstant, appConstant} from '../../constant';
import axios from 'axios';

export const getJourneyDetail = argumentData => {
  let itineraryId = argumentData.data.itineraryId;
  let deviceId = argumentData.data.user.deviceId;
  let apiBaseUrl = argumentData.data.user.apiBaseUrl;
  let clientToken = argumentData.data.user.clientToken;

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
  urlString = urlString.replace(':itineraryId', itineraryId);

  console.log('itineraryId', itineraryId);

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
