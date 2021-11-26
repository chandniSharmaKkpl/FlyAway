import {actionConstant} from '../../constant';

const initialState = {
isRequesting:false,
error:'',
acceptResponse:'',
approvalListWithStatus:'',
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case actionConstant.ACTION_ACCEPT_APPROVAL_REQUEST: {
            return {
              ...state,
              acceptResponse: payload,
              isRequesting: true,
              error: {},
            };
          }
        case actionConstant.ACTION_ACCEPT_APPROVAL_SUCCESS: {
            return {
              ...state,
              acceptResponse: payload,
              isRequesting: false,
              error: {},
            };
          }
          case actionConstant.ACTION_ACCEPT_APPROVAL_FAILURE: {
            return {
              ...state,
              acceptResponse: {},
              isRequesting: false,
              error: payload,
            };
          }
         // APPROVAL LIST 
         case actionConstant.ACTION_GET_APPROVAL_LIST_WITH_STATUS_REQUEST: {
          return {
            ...state,
            approvalListWithStatus:payload,
            isRequesting: true,
            error: {},
          };
        }
        case actionConstant.ACTION_GET_APPROVAL_LIST_WITH_STATUS_SUCCESS: {
          return {
            ...state,
            approvalListWithStatus: payload,
            isRequesting: false,
            error: {},
          };
        }
        case actionConstant.ACTION_GET_APPROVAL_LIST_WITH_STATUS_FAILURE: {
          console.log(" failed ", payload); 

          return {
            ...state,
            approvalListWithStatus: payload.error,
            isRequesting: false,
            error: {},
          };
        }
    default:
        return state
    }
}
