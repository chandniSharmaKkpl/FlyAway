import {actionConstant} from '../../constant';

const initialState = {
  isRequesting: false,
  accessToken: '',
  userProfile: '',
  itinaryList: '',
  itinaryListAllJourney: '',
  approvalList: '',
  error: {},
};

export default (state = initialState, {type, payload}) => {
  console.log('type & paylod =>>', payload);
  switch (type) {
    // GET USER PROFILE
    case actionConstant.ACTION_GET_USER_PROFILE_REQUEST: {
      return {
        ...state,
        userProfile: {},
        isRequesting: true,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        userProfile: payload,
        isRequesting: true,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_USER_PROFILE_FAILURE: {
      return {
        ...state,
        userProfile: payload,
        isRequesting: false,
        error: {},
      };
    }

    // ITINARY LIST
    case actionConstant.ACTION_GET_ITINARY_LIST_REQUEST: {
      return {
        ...state,
        itinaryList: {},
        isRequesting: true,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_ITINARY_LIST_SUCCESS: {
      return {
        ...state,
        itinaryList: payload,
        isRequesting: true,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_ITINARY_LIST_FAILURE: {
      return {
        ...state,
        itinaryList: payload.error,
        isRequesting: false,
        error: {},
      };
    }
    // ITINARY LIST ALL JOURNEY
    case actionConstant.ACTION_GET_ITINARY_LIST_ALL_JOURNEY_REQUEST: {
      return {
        ...state,
        itinaryListAllJourney: {},
        isRequesting: true,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_ITINARY_LIST_ALL_JOURNEY_SUCCESS: {
      return {
        ...state,
        itinaryListAllJourney: payload,
        isRequesting: false,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_ITINARY_LIST_ALL_JOURNEY_FAILURE: {
      return {
        ...state,
        itinaryListAllJourney: payload.error,
        isRequesting: false,
        error: {},
      };
    }
    // APPROVAL LIST
    case actionConstant.ACTION_GET_APPROVAL_LIST_REQUEST: {
      return {
        ...state,
        approvalList: {},
        isRequesting: false,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_APPROVAL_LIST_SUCCESS: {
      return {
        ...state,
        approvalList: payload,
        isRequesting: false,
        error: {},
      };
    }
    case actionConstant.ACTION_GET_APPROVAL_LIST_FAILURE: {
      return {
        ...state,
        approvalList: payload.error,
        isRequesting: false,
        error: {},
      };
    }
    default:
      return state;
  }
};
