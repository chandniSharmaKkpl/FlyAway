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


  // USER PROFILE



export default{
    requestToGetDeclineReasons, 

  }