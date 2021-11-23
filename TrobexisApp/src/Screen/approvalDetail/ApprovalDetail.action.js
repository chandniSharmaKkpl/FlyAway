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


export default{
    requestToGetApprovalDetail, 

  }