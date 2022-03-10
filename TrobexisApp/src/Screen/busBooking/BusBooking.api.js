import {actionConstant, apiConstant, appConstant} from '../../constant';
import localDB from '../../database/localDb';
import {ApiBase} from '../../api/apiBase';
import axios from 'axios'; 

export const  getBusRoute = (token1) => {
  // Get access token
//const accessToken = localDB.getAccessToken();

let urlString = apiConstant.GET_BUS_ROUTE;
return ApiBase(token1)
  .get(urlString)
  .then(response => 
    Promise.resolve({
      data: response,
      //status: response.status
    }).then(response => {
      return response.data.data;
    }),
  );
};

export const  getBusStop = (token1,argument) => {
  // Get access token
//const accessToken = localDB.getAccessToken();


let urlString = apiConstant.GET_BUS_STOP;

let dictTemp = argument.payload.params
dictTemp.userId = "BM123";
argument.payload.params = dictTemp
console.log(" param ---> ",argument);

return ApiBase(token1)
  .post(urlString,argument.payload.params)
  .then(response =>
    Promise.resolve({
      data: response,
      //status: response.status
    }).then(apiResponse => {
      console.log(" response ---> ",apiResponse);
      return apiResponse.data.data;
    }),
  ).catch(err=>{
      console.log("error ",err)
  });
};

export const getAccessTokenBusBooking = argumentData => {


  let deviceId = argumentData.data.user.deviceId? argumentData.data.user.deviceId:'';
  let apiBaseUrl = argumentData.data.user.apiBaseUrl;
  let clientToken = argumentData.data.user.clientToken;

  //console.log(" busbooking calling 111", deviceId, apiBaseUrl, clientToken); 


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

  let urlString = apiConstant.ACCESS_TOKEN_BASED_CLIENT_TOKEN;
  console.log(" busbooking calling url", urlString); 

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
