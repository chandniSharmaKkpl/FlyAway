import {actionConstant} from '../../constant';

const initialState = {
    isRequesting: false,
    error:{},
    busRoute:'',
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
          // GET Bus Route
          case actionConstant.ACTION_GET_BUS_ROUTE_REQUEST: {
            return {
              ...state,
              busRoute:{},
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
         
    default:
        return state
    }
}
