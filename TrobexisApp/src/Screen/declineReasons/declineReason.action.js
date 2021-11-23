import {actionConstant} from '../../constant';

// Access Token

 export const requestToGetDeclineReasons = (argumentData) => ({
    type: actionConstant.ACTION_GET_DECLINE_REASON_REQUEST,
    payload: {
        data: argumentData
    },
  });
  
  
  export const successToGetDeclineReasons = (data) => ({
    type: actionConstant.ACTION_GET_DECLINE_REASON_SUCCESS,
    payload: {
      data: data,
    },
  });
  
  export const failToGetDeclineReasons = (error) => ({
    type: actionConstant.ACTION_GET_DECLINE_REASON_FAILURE,
    payload: {
      data: error,
    },
  });

    // Submit decline reasons 


  export const requestDeclineApproval = (argument) => ({
    type: actionConstant.ACTION_SUBMIT_DECLINE_REASON_REQUEST,
    payload: {
      data: argument
    },
  });
  
  
  export const successDeclineApproval = (data) => ({
    type: actionConstant.ACTION_SUBMIT_DECLINE_REASON_SUCCESS,
    payload: {
      data: data,
    },
  });
  
  export const failDeclineApproval = (error) => ({
    type: actionConstant.ACTION_SUBMIT_DECLINE_REASON_FAILURE,
    payload: {
      data: error,
    },
  });

export default{
    requestToGetDeclineReasons, 

  }