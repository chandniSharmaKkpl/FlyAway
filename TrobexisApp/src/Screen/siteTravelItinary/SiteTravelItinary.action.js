 import {actionConstant} from '../../constant';

 // Getting detail of itinary 
 export const requestToGetDetailOfItinary = (params) => ({
  type: actionConstant.ACTION_GET_ITINARY_DETAILS_REQUEST,
  payload: {
    params
  },
});


export const successToGetDetailOfItinary = (data) => ({
  type: actionConstant.ACTION_GET_ITINARY_DETAILS_SUCCESS,
  payload: {
    data: data,
  },
});

export const failToGetDetailOfItinary = (error) => ({
  type: actionConstant.ACTION_GET_ITINARY_DETAILS_FAILURE,
  payload: {
    data: error,
  },
});


// Cancel itinary 

 export const requestToCancelSiteTravelItinary = (params) => ({
    type: actionConstant.ACTION_SITE_TRAVEL_ITINARY_CANCEL_REQUEST,
    payload: {params
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