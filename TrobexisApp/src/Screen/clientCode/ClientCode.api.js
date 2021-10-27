
import {actionConstant, apiConstant, appConstant} from '../../constant';
import localDB from '../../database/localDb';
import {ApiBase} from '../../api/apiBase';
import axios from 'axios';
import {Buffer} from 'buffer';
import localDb from '../../database/localDb';

export const getApiBase = argumentData => {
  let platform = argumentData.platform;
  let deviceId = argumentData.deviceId;
  let client = argumentData.client; 

  var username = apiConstant.USER_NAME_API_CLIENT_CODE;
  var password = apiConstant.PASSWORD_API_CLIENT_CODE;

  const tokenCred = Buffer.from(`${username}:${password}`, 'utf8').toString(
    'base64',
  );
  let instance = axios.create({
    baseURL: apiConstant.BASE_URL_GET_API_BASE,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${tokenCred}`,
      'DeviceId': deviceId,
      'DeviceType': platform
    },
  });

  let urlString = apiConstant.URL_TO_GET_API_BASE;
  urlString =  urlString.replace(':client', client);

  return instance
    .get(urlString)
    .then(response =>
      Promise.resolve({
        data: response,
        //status: response.status
      }).then(response => {
        let apiBaseUrl = response.data.data.value
        localDB.setBaseUrl(apiBaseUrl);

        return response.data.data; 
        //getClientTokenBasedOnApiBase(argumentData, apiBaseUrl)
      })
    )
    .catch((err) =>{
      console.log("47 api Erorr: ", err.response)
      return err.response.data
    })
};

export const getClientTokenBasedOnApiBase = (argumentData, apiBaseUrl) => {

  
    let platform = argumentData.platform;
    let deviceId = argumentData.deviceId;
    let client = argumentData.client; 
  
    var username = apiConstant.USER_NAME_API_CLIENT_CODE;
    var password = apiConstant.PASSWORD_API_CLIENT_CODE;
  
    const tokenCred = Buffer.from(`${username}:${password}`, 'utf8').toString(
      'base64',
    );
    let instance = axios.create({
      baseURL: apiBaseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${tokenCred}`,
        'DeviceId': deviceId,
        'DeviceType': platform
      },
    });
  
    let urlString = apiConstant.GET_TOKEN_BASED_ON_CLIENT_CODE;
    urlString =  urlString.replace(':client', client);  
    return instance
      .get(urlString)
      .then(response =>
        Promise.resolve({
          data: response,
        }).then(response => {
          let clientToken = response.data.data.token; 
          localDb.setAccessToken(clientToken);
          return clientToken
        }),
      ).catch((err) =>{
        console.log("88 api Erorr: ", err.response)
        return err.response.data
      })
      ;
  };

  export const getAccountURL = (argumentData, apiBaseUrl, clientToken) => {

     console.log(" req to getAccountURL e ", apiBaseUrl, clientToken ); 
  
    let platform = argumentData.platform;
    let deviceId = argumentData.deviceId;
 
    let instance = axios.create({
      baseURL: apiBaseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${clientToken}`,
        'DeviceId': deviceId,
        'DeviceType': platform
      },
    });
  
    let urlString = apiConstant.ACCOUNT_URL;  
    return instance
      .get(urlString)
      .then(response =>
        Promise.resolve({
          data: response,
          //status: response.status
        }).then(response => {
            console.log(" response to ACCunt url ====  ", response); 
          return response.data.data;
        }),
      ).catch((err) =>{
        console.log("124 api Erorr: ", err.response)
        return err.response.data
      });
  };

  export const getAccessTokenBaseOnClientToken = (argumentData, apiBaseUrl, clientToken) => {

    console.log(" req to getAccountURL e ", apiBaseUrl, clientToken ); 
 
   let platform = argumentData.platform;
   let deviceId = argumentData.deviceId;

   let instance = axios.create({
     baseURL: apiBaseUrl,
     timeout: 30000,
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${clientToken}`,
       'DeviceId': deviceId,
       'DeviceType': platform
     },
   });
 
   let urlString = apiConstant.ACCESS_TOKEN_BASED_CLIENT_TOKEN;  
   return instance
     .get(urlString)
     .then(response =>
       Promise.resolve({
         data: response,
         //status: response.status
       }).then(response => {
           console.log(" response to ACCunt url ====  ", response); 
         return response.data.data;
       }),
     ).catch((err) =>{
       console.log("124 api Erorr: ", err.response)
       return err.response.data
     });
 };