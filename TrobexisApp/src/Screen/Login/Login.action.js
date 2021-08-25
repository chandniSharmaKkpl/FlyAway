import {actionConstant} from '../../constant';

// Access Token

 export const requestToGetAccessToken = () => ({
    type: actionConstant.ACTION_GET_ACCESS_TOKEN_REQUEST,
    payload: {
    },
  });
  
  
  export const successToGetAccessToken = (data) => ({
    type: actionConstant.ACTION_GET_ACCESS_TOKEN_SUCCESS,
    payload: {
      data: data,
    },
  });
  
  export const failToGetAccessToken = (error) => ({
    type: actionConstant.ACTION_GET_ACCESS_TOKEN_FAILURE,
    payload: {
      data: error,
    },
  });

//   // USER PROFILE



// export default{
//     requestToGetUpcomingJourney, 
//     // successToGetAccessToken, 
//     // failToGetAccessToken,
//     // requestToGetUserProfile,
//     // successToGetUserProfile,
//     // failToGetUserProfile,
//     // requestToGetItinaryList,
//     // successToGetItinaryList,
//     // failToGetItinaryList
//   }