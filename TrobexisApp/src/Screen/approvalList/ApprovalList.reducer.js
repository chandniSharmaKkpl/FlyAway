import {actionConstant} from '../../constant';

const initialState = {
isRequesting:false,
error:'',
acceptResponse:'',
approvalList:'',
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
        //  case actionConstant.ACTION_GET_APPROVAL_LIST_REQUEST: {
        //   return {
        //     ...state,
        //     approvalList:payload,
        //     isRequesting: true,
        //     error: {},
        //   };
        // }
        // case actionConstant.ACTION_GET_APPROVAL_LIST_SUCCESS: {
        //   return {
        //     ...state,
        //     approvalList: payload,
        //     isRequesting: false,
        //     error: {},
        //   };
        // }
        // case actionConstant.ACTION_GET_APPROVAL_LIST_FAILURE: {
        //   console.log(" failed ", payload); 

        //   return {
        //     ...state,
        //     approvalList: payload.error,
        //     isRequesting: false,
        //     error: {},
        //   };
        // }
    default:
        return state
    }
}
