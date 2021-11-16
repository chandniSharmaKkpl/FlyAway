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
    case actionConstant.ACTION_GET_API_BASE_REQUEST: {
      return {
        ...state,
        apiBaseData: {payload},
        isRequesting: true,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_API_BASE_SUCCESS: {
      return {
        ...state,
        apiBaseData: payload,
        isRequesting: true,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_API_BASE_FAILURE: {
      return {
        ...state,
        apiBaseData: {},
        isRequesting: false,
        error: payload,
      };
    }
    case actionConstant.ACTION_GET_CLIENT_TOKEN_REQUEST: {
      return {
        ...state,
        clientToken: {},
        isRequesting: true,
        error: {},
      };
    }

    case actionConstant.ACTION_GET_CLIENT_TOKEN_SUCCESS: {
      return {
        ...state,
        clientToken: payload,
        isRequesting: true,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_CLIENT_TOKEN_FAILURE: {
      return {
        ...state,
        clientToken: {},
        isRequesting: false,
        error: payload,
      };
    }

    case actionConstant.ACTION_GET_ACCOUNT_URL_REQUEST: {
      return {
        ...state,
        isRequesting: true,
        error: {},
        responseAccountUrl: {},
      };
    }

    case actionConstant.ACTION_GET_ACCOUNT_URL_SUCCESS: {
      return {
        ...state,
        isRequesting: false,
        responseAccountUrl: payload,
        error: {},
      };
    }

    case actionConstant.ACTION_GET_ACCOUNT_URL_FAILURE: {
      return {
        ...state,
        isRequesting: false,
        responseAccountUrl: {},
        error: payload,
      };
    }
    default:
      return state;
  }
};
