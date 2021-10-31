import {actionConstant} from '../../../constant';

const initialState = {
  isRequesting: false,
  error: {},
  responseReasons: '',
  responseSubmit: '',
};

export default (state = initialState, { type, payload }) => {

    switch (type) {
        case actionConstant.ACTION_SUBMIT_DECLINE_REASON_REQUEST: {
            return {
              ...state,
             responseSubmit: {},
              isRequesting: true,
              error: {},
            };
          }
          case actionConstant.ACTION_SUBMIT_DECLINE_REASON_SUCCESS: {
            return {
              ...state,
             responseSubmit: payload,
              isRequesting: true,
              error: {},
            };
          }
          case actionConstant.ACTION_SUBMIT_DECLINE_REASON_FAILURE: {
            return {
              ...state,
             responseSubmit: {},
              isRequesting: false,
              error: payload,
            };
          }
          case actionConstant.ACTION_GET_DECLINE_REASON_REQUEST: {
            return {
              ...state,
              responseReasons: payload,
              isRequesting: true,
              error: {},
            };
          }
          case actionConstant.ACTION_GET_DECLINE_REASON_SUCCESS: {
            return {
              ...state,
              responseReasons: payload,
              isRequesting: true,
              error: {},
            };
          }
          case actionConstant.ACTION_GET_DECLINE_REASON_FAILURE: {
            return {
              ...state,
              responseReasons: {},
              isRequesting: false,
              error: payload,
            };
          }
    default:
        return state
    }
}
