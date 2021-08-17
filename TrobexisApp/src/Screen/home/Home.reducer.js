
import {actionConstant} from '../../constant';

const initialState = {
 isRequesting: false,
 accessToken:'',
 userProfile:'',
 itinaryList:'',
  error:{}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case actionConstant.ACTION_GET_ACCESS_TOKEN_REQUEST: {
            return {
              ...state,
              accessToken:{},
              isRequesting: true,
              error: {},
            };
          }
          case actionConstant.ACTION_GET_ACCESS_TOKEN_SUCCESS: {
            return {
              ...state,
              accessToken: payload,
              isRequesting: false,
              error: {},
            };
          }
          case actionConstant.ACTION_GET_ACCESS_TOKEN_FAILURE: {
            console.log(" failed ", payload); 

            return {
              ...state,
              accessToken: payload.error,
              isRequesting: false,
              error: {},
            };
          }

          // GET USER PROFILE 
          case actionConstant.ACTION_GET_USER_PROFILE_REQUEST: {
            return {
              ...state,
              userProfile:{},
              isRequesting: true,
              error: {},
            };
          }
          case actionConstant.ACTION_GET_USER_PROFILE_SUCCESS: {
            return {
              ...state,
              userProfile: payload,
              isRequesting: false,
              error: {},
            };
          }
          case actionConstant.ACTION_GET_USER_PROFILE_FAILURE: {
            console.log(" failed ", payload); 

            return {
              ...state,
              userProfile: payload.error,
              isRequesting: false,
              error: {},
            };
          }

          // ITINARY LIST 
          case actionConstant.ACTION_GET_ITINARY_LIST_REQUEST: {
            return {
              ...state,
              itinaryList:{},
              isRequesting: true,
              error: {},
            };
          }
          case actionConstant.ACTION_GET_ITINARY_LIST_SUCCESS: {
            return {
              ...state,
              itinaryList: payload,
              isRequesting: false,
              error: {},
            };
          }
          case actionConstant.ACTION_GET_ITINARY_LIST_FAILURE: {
            console.log(" failed ", payload); 

            return {
              ...state,
              itinaryList: payload.error,
              isRequesting: false,
              error: {},
            };
          }
    default:
        return state
    }
}
