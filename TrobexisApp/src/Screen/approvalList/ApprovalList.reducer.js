import {actionConstant} from '../../constant';

const initialState = {
isRequesting:"",
error:'',
acceptResponse:'',
declineResponse:''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case actionConstant.ACTION_ACCEPT_APPROVAL_REQUEST: {
            return {
              ...state,
              acceptResponse: {},
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
        
    default:
        return state
    }
}
