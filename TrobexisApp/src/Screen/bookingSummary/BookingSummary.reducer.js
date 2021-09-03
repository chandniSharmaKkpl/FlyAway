import {actionConstant} from '../../constant';

const initialState = {
    isRequesting: false,
    error:{},
    bookingResponse:'',
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
          // GET Bus Route
          case actionConstant.ACTION_POST_BUS_BOOKING_REQUEST: {
            return {
              ...state,
              bookingResponse:{},
              isRequesting: true,
              error: {},
            };
          }
          case actionConstant.ACTION_POST_BUS_BOOKING_SUCCESS: {
            return {
              ...state,
              bookingResponse: payload,
              isRequesting: false,
              error: {},
            };
          }
          case actionConstant.ACTION_POST_BUS_BOOKING_FAILURE: {
            return {
              ...state,
              bookingResponse: payload.error,
              isRequesting: false,
              error: {},
            };
          }
         
    default:
        return state
    }
}
