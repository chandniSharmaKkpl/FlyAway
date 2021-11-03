import { Platform } from 'react-native';
import {apiConstant, appConstant} from '../../constant'
import axios from 'axios'; 

export const getDeclineReasonsApi = async(argumentData) => {
  console.log(" argument data  : ", argumentData); 

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
    console.log(" url  data  : ", urlString);
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
              console.log(" response decline reasons: ", response1)
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
          console.log(" response : ", response1)
          return response1
        }),
      ).catch((err) =>{
        console.log("88 api Erorr: ", err.response)
        return err.response.data
      }) ;
  };

   // Submit Decline with Reasons calling by reason view 


  // export const declineApprovalApi = (argumentData) => {

  //   let approvalId = argumentData.data.approvalId
  //     let deviceId = argumentData.data.user.deviceId;
  //     let apiBaseUrl = argumentData.data.user.apiBaseUrl
  //     let clientToken = argumentData.data.user.clientToken; 
  
  //     console.log(" argument data  : ", argumentData); 
  
  //     let instance = axios.create({
  //       baseURL: apiBaseUrl,
  //       timeout: 30000,
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${clientToken}`,
  //         'DeviceId': deviceId,
  //         'DeviceType': Platform.OS === 'android'? 'ANDROID': 'IOS'
  //       },
  //     });
    
  //     let urlString = apiConstant.APPROVAL_DECLINE_API;
  //    // urlString =  urlString.replace(':approvalId', approvalId);  
  //     console.log(" url  data  : ", urlString); 
  
  //     return instance
  //       .put(urlString,{'approverId':approvalId})
        
  //       .then(response =>
  //         Promise.resolve({
  //           data: response,
  //         }).then(response => {
  //           let response1 = response.data.data; 
  //           console.log(" response : ", response1)
  
  //           return response1
  //         }),
  //       ).catch((err) =>{
  //         console.log("88 api Erorr: ", err.response)
  //         return err.response.data
  //       })
  //       ;
  //   };