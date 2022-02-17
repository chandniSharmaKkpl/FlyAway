import {actionConstant} from '../../constant';

// // Access Token

 export const requestToGetApprovalDetail = (approvelId) => ({
    type: actionConstant.ACTION_APPROVAL_DETAIL_REQUEST,
    payload: {
        data: approvelId
    },
  });
  
  
  export const successToGetApprovalDetail = (data) => ({
    type: actionConstant.ACTION_APPROVAL_DETAIL_SUCCESS,
    payload: {
      data: data,
    },
  });
  
  export const failToGetApprovalDetail = (error) => ({
    type: actionConstant.ACTION_APPROVAL_DETAIL_FAILURE,
    payload: {
      data: error,
    },
  });

  export const requestAcceptApprovalInDetail = (argument) => ({
    type: actionConstant.ACTION_ACCEPT_APPROVAL_REQUEST_IN_DETAIL,
    payload: {
        data: argument
    },
  });
  
  
  export const successAcceptApprovalInDetail  = (data) => ({
    type: actionConstant.ACTION_ACCEPT_APPROVAL_SUCCESS_IN_DETAIL,
    payload: {
      data: data,
    },
  });
  
  export const failAcceptApprovalInDetail  = (error) => ({
    type: actionConstant.ACTION_ACCEPT_APPROVAL_FAILURE_IN_DETAIL,
    payload: {
      data: error,
    },
  });

export default{
    requestToGetApprovalDetail, 
requestAcceptApprovalInDetail
  }