
import {actionConstant, apiConstant, appConstant} from '../../constant';
import localDB from '../../database/localDb';
import {ApiBase} from '../../api/apiBase';
import axios from 'axios';
import {Buffer} from 'buffer';
import localDb from '../../database/localDb';

const TOKEN_STATIC = "20211029072102155rTZKiGdm6MaBJLIYSe7B80747208f576425f8c1ed929c482520rSU3ALTva8cM";
export const getApiBase = argumentData => {

  let platform = argumentData.DeviceType;
  let deviceId = argumentData.DeviceId;
  let client = argumentData.client; 

  // var username = apiConstant.USER_NAME_API_CLIENT_CODE;
  // var password = apiConstant.PASSWORD_API_CLIENT_CODE;

  // const tokenCred = Buffer.from(`${username}:${password}`, 'utf8').toString(
  //   'base64',
  // );
  let instance = axios.create({
    baseURL: apiConstant.BASE_URL_GET_API_BASE,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Basic ${tokenCred}`,
      'Authorization': `Bearer ${TOKEN_STATIC}`,
      'DeviceId': deviceId? deviceId:'',
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
      })
    )
    .catch((err) =>{
      console.log("47 api Erorr: ", err)
      if (err.response && err.response.data) {
        return err.response.data
      } else {
        return { }
      }
    })
};

export const getClientTokenBasedOnApiBase = (argumentData, apiBaseUrl) => {
  
    let platform = argumentData.DeviceType;
    let deviceId = argumentData.DeviceId;
    let client = argumentData.client; 
  
    var username = apiConstant.USER_NAME_API_CLIENT_CODE;
    var password = apiConstant.PASSWORD_API_CLIENT_CODE;
  
    let instance = axios.create({
      baseURL: apiBaseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
       // 'Authorization': `Basic ${tokenCred}`,
        'Authorization': `Bearer ${TOKEN_STATIC}`,
        'DeviceId': deviceId? deviceId:'',
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
        console.log("88 api Erorr: ", err)
        if (err.response && err.response.data) {
          return err.response.data
        } else {
          return { }
        }
      })
      ;
  };

  export const getAccountURL = (argumentData, apiBaseUrl, clientToken) => {
  
    console.log(" api base url ---", apiBaseUrl)

    let platform = argumentData.DeviceType;
    let deviceId = argumentData.DeviceId;
 
    let instance = axios.create({
      baseURL: apiBaseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${clientToken}`,
        'DeviceId': deviceId? deviceId:'',
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
          console.log("132 response ACCOUNT_URL: ", response)

          return response.data.data;
        }),
      ).catch((err) =>{
        console.log("132 api Erorr: ", err)
        if (err.response && err.response.data) {
          return err.response.data
        } else {
          return { }
        }
      });
  };

  export const getAccessTokenBaseOnClientToken = (argumentData, apiBaseUrl, clientToken) => {
 
   let platform = argumentData.DeviceType;
   let deviceId = argumentData.DeviceId;

   let instance = axios.create({
     baseURL: apiBaseUrl,
     timeout: 30000,
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${clientToken}`,
       'DeviceId': deviceId? deviceId:'',
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
        console.log("168 response ACCESS_TOKEN_BASED_CLIENT_TOKEN: ", response)
         return response.data.data;
       }),
     ).catch((err) =>{
       console.log("165 api Erorr: ", err)
       if (err.response && err.response.data) {
        return err.response.data
      } else {
        return { }
      }
     });
 };