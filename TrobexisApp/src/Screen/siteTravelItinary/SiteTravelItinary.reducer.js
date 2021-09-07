import {actionConstant} from '../../constant';

const initialState = {
    isRequesting: false,
    error:{},
    cancelItinaryResponse:'',
    itinaryDetail:''
}

export default (state = initialState, { type, payload }) => {

    switch (type) {

      // Get Details of itinary 
      case actionConstant.ACTION_GET_ITINARY_DETAILS_REQUEST: {
        return {
          ...state,
          itinaryDetail:{payload},
          isRequesting: true,
          error: {},
        };
      }
      case actionConstant.ACTION_GET_ITINARY_DETAILS_SUCCESS: {
        
        console.log(" Reducer   trip detail response ", payload); 
        return {
          ...state,
          itinaryDetail: payload,
          isRequesting: false,
          error: {},
        };
      }
      case actionConstant.ACTION_GET_ITINARY_DETAILS_FAILURE: {
        return {
          ...state,
          itinaryDetail: payload.error,
          isRequesting: false,
          error: {},
        };
      }

          // Cancel itinary 
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
