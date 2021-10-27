import {actionConstant} from '../../constant';

// ACCEPT APPROVAL

 export const requestAcceptApproval = (argument) => ({
    type: actionConstant.ACTION_ACCEPT_APPROVAL_REQUEST,
    payload: {
        data: argument
    },
  });
  
  
  export const successAcceptApproval = (data) => ({
    type: actionConstant.ACTION_ACCEPT_APPROVAL_SUCCESS,
    payload: {
      data: data,
    },
  });
  
  export const failAcceptApproval = (error) => ({
    type: actionConstant.ACTION_ACCEPT_APPROVAL_FAILURE,
    payload: {
      data: error,
    },
  });

// DECLINE APPROVAL 

export const requestDeclineApproval = (argument) => ({
    type: actionConstant.ACTION_DECLINE_APPROVAL_REQUEST,
    payload: {
      data: argument
    },
  });
  
  
  export const successDeclineApproval = (data) => ({
    type: actionConstant.ACTION_DECLINE_APPROVAL_SUCCESS,
    payload: {
      data: data,
    },
  });
  
  export const failDeclineApproval = (error) => ({
    type: actionConstant.ACTION_DECLINE_APPROVAL_FAILURE,
    payload: {
      data: error,
    },
  });

export default{
    requestAcceptApproval,
    requestDeclineApproval
  }