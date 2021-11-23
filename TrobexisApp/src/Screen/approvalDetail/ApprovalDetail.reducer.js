import {actionConstant} from '../../constant';

const initialState = {
  isRequesting: false,
  error: {},
  responseDetail: '',
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
    default:
        return state
    }
}
