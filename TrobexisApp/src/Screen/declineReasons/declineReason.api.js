import { Platform } from 'react-native';
import {apiConstant, appConstant} from '../../constant'
import axios from 'axios'; 

export const getDeclineReasonsApi = async(argumentData) => {

  let approvalId = argumentData.approvalId
    let deviceId = argumentData.user.deviceId;
    let apiBaseUrl = argumentData.user.apiBaseUrl
    let clientToken = argumentData.user.clientToken; 

    let instance = axios.create({
      baseURL: apiBaseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${clientToken}`,
        'DeviceId': deviceId,
        'DeviceType': Platform.OS === 'android'? 'ANDROID': 'IOS'
      },
    });
  
    let urlString = apiBaseUrl+ apiConstant.GET_DECLINE_REASONS;
    try {
        const response = await axios.get(urlString, {
            method: 'GET',
            body: JSON.stringify({
              'approvalId': approvalId
            }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${clientToken}`,
              'DeviceId': deviceId,
              'DeviceType': Platform.OS === 'android'? 'ANDROID': 'IOS'
       
            }
        })
            .then(response => {
              let response1 = response.data.data; 
              return response1
            })
            
    } catch (error) {
      return error.response.data

    }


  //let arg = {'approvalId': approvalId}
    return instance
      .get(urlString,{'approvalId': approvalId})
      
      .then(response =>
        Promise.resolve({
          data: response,
        }).then(response => {
          let response1 = response.data.data; 
          return response1
        }),
      ).catch((err) =>{
        console.log("66 api Erorr: ", err.response)
        return err.response.data
      }) ;
  };

   // Submit Decline with Reasons calling by reason view 
   export const declineApprovalApi = async argumentData => {

    console.log('decline argument data --> : ', argumentData);
  
    let reasonId = argumentData.reasonId;
     let approvalId = argumentData.approvalId
      let deviceId = argumentData.user.deviceId;
      let userId = argumentData.user.userId;

      let apiBaseUrl = argumentData.user.apiBaseUrl
      let clientToken = argumentData.user.clientToken; 
      let comments = argumentData.comments
   
    let urlString = apiBaseUrl + apiConstant.APPROVAL_DECLINE_API;
    urlString = urlString.replace(':approvalId', approvalId);

    console.log(' url  data  : ', urlString);
    const raw = {
      approverId: userId,
      ReasonId:reasonId,
      comments: comments
    };
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
  