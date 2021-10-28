import {actionConstant} from '../../../constant';

// Access Token

 export const requestToGetDeclineReason = (data) => ({
    type: actionConstant.ACTION_GET_DECLINE_REASON_REQUEST,
    payload: {
        data: data
    },
  });
  
  
  export const successToGetDeclineReason = (data) => ({
    type: actionConstant.ACTION_GET_DECLINE_REASON_SUCCESS,
    payload: {
      data: data,
    },
  });
  
  export const failToGetDeclineReason = (error) => ({
    type: actionConstant.ACTION_GET_DECLINE_REASON_FAILURE,
    payload: {
      data: error,
    },
  });

  export const requestToSubmitDeclineReason = (data) => ({
    type: actionConstant.ACTION_SUBMIT_DECLINE_REASON_REQUEST,
    payload: {
        data: data
    },
  });
  
  
  export const successToSubmitDeclineReason = (data) => ({
    type: actionConstant.ACTION_SUBMIT_DECLINE_REASON_SUCCESS,
    payload: {
      data: data,
    },
  });
  
  export const failToSubmitDeclineReason = (error) => ({
    type: actionConstant.ACTION_SUBMIT_DECLINE_REASON_FAILURE,
    payload: {
      data: error,
    },
  });




export default{
    requestToGetDeclineReason, 
  }