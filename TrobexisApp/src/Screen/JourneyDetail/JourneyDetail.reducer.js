import {actionConstant} from '../../constant';

const initialState = {
  isRequesting: false,
  error: {},
  journeyDetail: '',
};

export default (state = initialState, { type, payload }) => {
  // console.log(" payload ---->", payload);
    switch (type) {

        case actionConstant.ACTION_GET_DETAIL_OF_ITINARY_REQUEST: {
            return {
              ...state,
              journeyDetail: {},
              isRequesting: true,
              error: {},
            };
          }
          case actionConstant.ACTION_GET_DETAIL_OF_ITINARY_SUCCESS: {
            return {
              ...state,
              journeyDetail: payload,
              isRequesting: false,
              error: {},
            };
          }
          case actionConstant.ACTION_GET_DETAIL_OF_ITINARY_FAILURE: {
            return {
              ...state,
              journeyDetail: {},
              isRequesting: false,
              error: payload,
            };
          }
    default:
        return state
    }
}
