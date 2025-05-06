import {actionConstant} from '../../constant';

const initialState = {
  isRequesting: false,
  error: {},
  responseDetail: '',
  acceptResponseInDetail:''
};

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case actionConstant.ACTION_APPROVAL_DETAIL_REQUEST: {
            return {
              ...state,
              responseDetail: {},
              isRequesting: true,
              error: {},
            };
          }
          case actionConstant.ACTION_APPROVAL_DETAIL_SUCCESS: {
            return {
              ...state,
              responseDetail: payload,
              isRequesting: false,
              error: {},
            };
          }
          case actionConstant.ACTION_APPROVAL_DETAIL_FAILURE: {
            return {
              ...state,
              responseDetail: {},
              isRequesting: false,
              error: payload,
            };
          }
          case actionConstant.ACTION_ACCEPT_APPROVAL_REQUEST_IN_DETAIL: {
            return {
              ...state,
              acceptResponseInDetail: payload,
              isRequesting: true,
              error: {},
            };
          }
        case actionConstant.ACTION_ACCEPT_APPROVAL_SUCCESS_IN_DETAIL: {
            return {
              ...state,
              acceptResponseInDetail: payload,
              isRequesting: false,
              error: {},
            };
          }
          case actionConstant.ACTION_ACCEPT_APPROVAL_FAILURE_IN_DETAIL: {
            return {
              ...state,
              acceptResponseInDetail: {},
              isRequesting: false,
              error: payload,
            };
          }
    default:
        return state
    }
}
