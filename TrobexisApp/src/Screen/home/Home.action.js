import {actionConstant} from '../../constant';


  // USER PROFILE

export const requestToGetUserProfile = (token) => ({
  type: actionConstant.ACTION_GET_USER_PROFILE_REQUEST,
  payload: token,
});


export const successToGetUserProfile = (data) => ({
  type: actionConstant.ACTION_GET_USER_PROFILE_SUCCESS,
  payload: {
    data: data,
  },
});

export const failToGetUserProfile = (error) => ({
  type: actionConstant.ACTION_GET_USER_PROFILE_FAILURE,
  payload: {
    data: error,
  },
});


//Get Itinary List 
export const requestToGetItinaryList = () => ({
  type: actionConstant.ACTION_GET_ITINARY_LIST_REQUEST,
  payload: {
  },
});


export const successToGetItinaryList = (data) => ({
  type: actionConstant.ACTION_GET_ITINARY_LIST_SUCCESS,
  payload: {
    data: data,
  },
});

export const failToGetItinaryList = (error) => ({
  type: actionConstant.ACTION_GET_ITINARY_LIST_FAILURE,
  payload: {
    data: error,
  },
});



export default{
  requestToGetUserProfile, 
    // successToGetAccessToken, 
    // failToGetAccessToken,
    // requestToGetUserProfile,
    // successToGetUserProfile,
    // failToGetUserProfile,
    // requestToGetItinaryList,
    // successToGetItinaryList,
    // failToGetItinaryList
  }