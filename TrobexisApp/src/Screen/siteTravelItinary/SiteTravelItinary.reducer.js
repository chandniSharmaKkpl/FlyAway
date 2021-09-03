import {actionConstant} from '../../constant';

const initialState = {
    isRequesting: false,
    error:{},
    cancelItinaryResponse:'',
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
          // GET Bus Route
          case actionConstant.ACTION_SITE_TRAVEL_ITINARY_CANCEL_REQUEST: {
            return {
              ...state,
              cancelItinaryResponse:{},
              isRequesting: true,
              error: {},
            };
          }
          case actionConstant.ACTION_SITE_TRAVEL_ITINARY_CANCEL_SUCCESS: {
            return {
              ...state,
              cancelItinaryResponse: payload,
              isRequesting: false,
              error: {},
            };
          }
          case actionConstant.ACTION_SITE_TRAVEL_ITINARY_CANCEL_FAILURE: {
            return {
              ...state,
              cancelItinaryResponse: payload.error,
              isRequesting: false,
              error: {},
            };
          }
         
    default:
        return state
    }
}
