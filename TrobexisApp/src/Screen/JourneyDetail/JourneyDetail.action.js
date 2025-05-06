import {actionConstant} from '../../constant';

// Access Token

 export const requestToGetJourneyDetail = (argumentData) => ({
    type: actionConstant.ACTION_GET_DETAIL_OF_ITINARY_REQUEST,
    payload: {
      data: argumentData
    },
  });
  
  
  export const successToGetJourneyDetail = (data) => ({
    type: actionConstant.ACTION_GET_DETAIL_OF_ITINARY_SUCCESS,
    payload: {
      data: data,
    },
  });
  
  export const failToGetJourneyDetail = (error) => ({
    type: actionConstant.ACTION_GET_DETAIL_OF_ITINARY_FAILURE,
    payload: {
      data: error,
    },
  });


export default{
    requestToGetJourneyDetail, 

  }