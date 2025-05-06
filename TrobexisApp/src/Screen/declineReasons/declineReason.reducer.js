import {actionConstant} from '../../constant';

const initialState = {
  isRequesting: false,
  error: {},
  declineReason: '',
 declineSubmitRes:'',
};

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case actionConstant.ACTION_GET_DECLINE_REASON_REQUEST: {
            return {
              ...state,
              declineReason: {payload},
              isRequesting: true,
              error: {},
            };
          }
          case actionConstant.ACTION_GET_DECLINE_REASON_SUCCESS: {
            return {
              ...state,
              declineReason: payload,
              isRequesting: false,
              error: {},
            };
          }
          case actionConstant.ACTION_GET_DECLINE_REASON_FAILURE: {
            return {
              ...state,
              declineReason: {},
              isRequesting: false,
              error: payload,
            };
          }
          case actionConstant.ACTION_SUBMIT_DECLINE_REASON_REQUEST: {
            return {
              ...state,
              declineSubmitRes: {payload},
              isRequesting: true,
              error: {},
            };
          }
          case actionConstant.ACTION_SUBMIT_DECLINE_REASON_SUCCESS: {
            return {
              ...state,
              declineSubmitRes: payload,
              isRequesting: false,
              error: {},
            };
          }
          case actionConstant.ACTION_SUBMIT_DECLINE_REASON_FAILURE: {
            return {
              ...state,
              declineSubmitRes: {},
              isRequesting: false,
              error: payload,
            };
          }

    default:
        return state
    }
}
