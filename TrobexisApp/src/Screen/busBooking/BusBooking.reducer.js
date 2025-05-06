import {actionConstant} from '../../constant';

const initialState = {
  isRequesting: false,
  error: {},
  busRoute: '',
  busStop: '',
  accessTokenBusBooking: '',
};

export default (state = initialState, {type, payload}) => {
  switch (type) {

    // GET ACCESS TOKEN BUS BOOKING
    case actionConstant.ACTION_GET_ACCESSTOKEN_BUS_BOOKING_REQUEST: {
      return {
        ...state,
        accessTokenBusBooking: payload,
        isRequesting: true,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_ACCESSTOKEN_BUS_BOOKING_SUCCESS: {
      return {
        ...state,
        accessTokenBusBooking: payload,
        isRequesting: false,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_ACCESSTOKEN_BUS_BOOKING_FAILURE: {
      return {
        ...state,
        accessTokenBusBooking: payload.error,
        isRequesting: false,
        error: {},
      };
    }

    // GET Bus Route
    case actionConstant.ACTION_GET_BUS_ROUTE_REQUEST: {
      return {
        ...state,
        busRoute: {},
        isRequesting: true,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_BUS_ROUTE_SUCCESS: {
      return {
        ...state,
        busRoute: payload,
        isRequesting: false,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_BUS_ROUTE_FAILURE: {
      return {
        ...state,
        busRoute: payload.error,
        isRequesting: false,
        error: {},
      };
    }

    // GET Bus Stop
    case actionConstant.ACTION_GET_BUS_STOP_REQUEST: {
      return {
        ...state,
        busStop: {},
        isRequesting: true,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_BUS_STOP_SUCCESS: {
      return {
        ...state,
        busStop: payload,
        isRequesting: false,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_BUS_STOP_FAILURE: {
      return {
        ...state,
        busStop: payload.error,
        isRequesting: false,
        error: {},
      };
    }
    default:
      return state;
  }
};
