import {actionConstant} from '../../constant';


 export const requestToGetApiBase = (param,navigation) => ({
    type: actionConstant.ACTION_GET_API_BASE_REQUEST,
    payload: {
       data: param
    },
    navigation
  });
  
  
  export const successToGetApiBase = (data) => ({
    type: actionConstant.ACTION_GET_API_BASE_SUCCESS,
    payload: {
      data: data,
    },
  });
  
  export const failToGetApiBase = (error) => ({
    type: actionConstant.ACTION_GET_API_BASE_FAILURE,
    payload: {
      data: error,
    },
  });


export default {
    requestToGetApiBase,
    successToGetApiBase,
    failToGetApiBase
}


