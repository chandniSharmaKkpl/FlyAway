import {actionConstant} from '../../constant';

// Access Token


 export const requestToPostBooking = () => ({
    type: actionConstant.ACTION_POST_BUS_BOOKING_REQUEST,
    payload: {
    },
  });
  
  
  export const successToPostBooking = (data) => ({
    type: actionConstant.ACTION_POST_BUS_BOOKING_SUCCESS,
    payload: {
      data: data,
    },
  });
  
  export const failToPostBooking = (error) => ({
    type: actionConstant.ACTION_POST_BUS_BOOKING_FAILURE,
    payload: {
      data: error,
    },
  });




export default{
 // fetchToken,
  requestToPostBooking
//     // requestToGetUserProfile,
//     // successToGetUserProfile,
//     // failToGetUserProfile,
//     // requestToGetItinaryList,
//     // successToGetItinaryList,
//     // failToGetItinaryList
   }