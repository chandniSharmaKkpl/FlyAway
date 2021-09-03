 import {actionConstant} from '../../constant';

// Access Token

 export const requestToCancelSiteTravelItinary = () => ({
    type: actionConstant.ACTION_SITE_TRAVEL_ITINARY_CANCEL_REQUEST,
    payload: {
    },
  });
  
  
  export const successToCancelSiteTravelItinary = (data) => ({
    type: actionConstant.ACTION_SITE_TRAVEL_ITINARY_CANCEL_SUCCESS,
    payload: {
      data: data,
    },
  });
  
  export const failToCancelSiteTravelItinary = (error) => ({
    type: actionConstant.ACTION_SITE_TRAVEL_ITINARY_CANCEL_FAILURE,
    payload: {
      data: error,
    },
  });


//   // USER PROFILE



// export default{
  requestToCancelSiteTravelItinary 
//     // successToGetAccessToken, 
//     // failToGetAccessToken,
//     // requestToGetUserProfile,
//     // successToGetUserProfile,
//     // failToGetUserProfile,
//     // requestToGetItinaryList,
//     // successToGetItinaryList,
//     // failToGetItinaryList
//   }