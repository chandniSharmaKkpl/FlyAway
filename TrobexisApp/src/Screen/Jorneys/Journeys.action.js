import {actionConstant} from '../../constant';

// Access Token

 export const requestToGetJourneyList = (argumentData) => ({
    type: actionConstant.ACTION_GET_JOURNEYS_LIST_REQUEST,
    payload: {
        data:argumentData
    },
  });
  
  
  export const successToGetJourneyList = (data) => ({
    type: actionConstant.ACTION_GET_JOURNEYS_LIST_SUCCESS,
    payload: {
      data: data,
    },
  });
  
  export const failToGetJourneyList = (error) => ({
    type: actionConstant.ACTION_GET_JOURNEYS_LIST_FAILURE,
    payload: {
      data: error,
    },
  });


export default{
    requestToGetJourneyList, 
  }