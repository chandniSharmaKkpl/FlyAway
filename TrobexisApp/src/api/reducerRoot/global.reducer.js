import {actionConstant} from '../../constant';
const initialState = {
    isRequesting: false,
    error: {},
    
  };

  export default (state = initialState, {type, payload}) => {
  console.log("******** payload error is *****", payload);
    switch (type) {
      case actionConstant.ACTION_API_ERROR_REQUEST: {
        return {
          ...state,
          isRequesting: true,
          error: {},
        };
      }
      case actionConstant.ACTION_API_ERROR_SUCCESS: {
        return {
          ...state,
          isRequesting: false,
          error: payload,
        };
      }

      default:
        return state;
    }
  };