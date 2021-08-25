import {actionConstant} from '../../constant';

// Access Token

 export const requestToPostBusBooking = () => ({
    type: actionConstant.ACTION_GET_ACCESS_TOKEN_REQUEST,
    payload: {
    },
  });
  
  
  export const successToPostBusBooking = (data) => ({
    type: actionConstant.ACTION_GET_ACCESS_TOKEN_SUCCESS,
    payload: {
      data: data,
    },
  });
  
  export const failToPostBusBooking = (error) => ({
    type: actionConstant.ACTION_GET_ACCESS_TOKEN_FAILURE,
    payload: {
      data: error,
    },
  });





export default{
    requestToGetUpcomingJourney, 
    // successToGetAccessToken, 
    // failToGetAccessToken,
    // requestToGetUserProfile,
    // successToGetUserProfile,
    // failToGetUserProfile,
    // requestToGetItinaryList,
    // successToGetItinaryList,
    // failToGetItinaryList
  }