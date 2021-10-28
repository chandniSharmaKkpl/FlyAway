import {actionConstant, apiConstant, appConstant} from '../../../constant';
import axios from 'axios';


export const getDeclineReasons = (argumentData) => {

  console.log(" par RESAONSE====  ", argumentData); 

    let deviceId = argumentData.data.user.deviceId;
    let apiBaseUrl = argumentData.data.user.apiBaseUrl
    let clientToken = argumentData.data.user.clientToken; 

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
 
   let urlString = apiConstant.GET_DECLINE_REASONS;  
   return instance
     .get(urlString)
     .then(response =>
       Promise.resolve({
         data: response,
         //status: response.status
       }).then(response => {
           console.log(" response RESAONSE====  ", response); 
         return response.data.data;
       }),
     ).catch((err) =>{
       console.log("40 api Erorr: ", err.response)
       return err.response.data
     });
 };


 