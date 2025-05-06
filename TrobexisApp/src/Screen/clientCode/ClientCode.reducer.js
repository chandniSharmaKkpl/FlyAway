import {actionConstant} from '../../constant';

const initialState = {
  isRequesting: false,
  error: {},
  apiBaseData: '',
  clientToken: '',
  responseAccountUrl: '',
};
export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actionConstant.ACTION_SET_LOGIN_LOADER: {
      return {
        ...state,
        isRequesting: payload.data,
      };
    }
    case actionConstant.ACTION_GET_API_BASE_REQUEST: {
      return {
        ...state,
        apiBaseData: {payload},
        error: {},
      };
    }
    case actionConstant.ACTION_GET_API_BASE_SUCCESS: {
      return {
        ...state,
        apiBaseData: payload,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_API_BASE_FAILURE: {
      return {
        ...state,
        apiBaseData: {},
        error: payload,
      };
    }
    case actionConstant.ACTION_GET_CLIENT_TOKEN_REQUEST: {
      return {
        ...state,
        clientToken: {},
        error: {},
      };
    }

    case actionConstant.ACTION_GET_CLIENT_TOKEN_SUCCESS: {
      console.log("clientToken ==>", payload);
      return {
        ...state,
        clientToken: payload,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_CLIENT_TOKEN_FAILURE: {
      return {
        ...state,
        clientToken: {},
        error: payload,
      };
    }

    case actionConstant.ACTION_GET_ACCOUNT_URL_REQUEST: {
      return {
        ...state,
        error: {},
        responseAccountUrl: {},
      };
    }

    case actionConstant.ACTION_GET_ACCOUNT_URL_SUCCESS: {
      return {
        ...state,
        responseAccountUrl: payload,
        error: {},
      };
    }

    case actionConstant.ACTION_GET_ACCOUNT_URL_FAILURE: {
      return {
        ...state,
        responseAccountUrl: {},
        error: payload,
      };
    }
    default:
      return state;
  }
};
