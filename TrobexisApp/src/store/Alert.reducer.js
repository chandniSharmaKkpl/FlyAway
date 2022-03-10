import {actionConstant} from '../constant';
const initialState = {
  isAlertShow: false,
  title: 'PLEASE_CONFIRM',
  subtitle: 'ARE_YOU_SURE_TO_LOGOUT',
  confirmBtnTxt: 'YES',
  cancelBtnTxt: 'NO',
  buttonCount: 2,
  bigBtnText: '',
  error: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actionConstant.ACTION_SHOW_ALERT: {
      return {
        ...state,
        isAlertShow: true,
        title: payload.title,
        subtitle: payload.subtitle,
        confirmBtnTxt: payload.confirmBtnTxt,
        cancelBtnTxt: payload.cancelBtnTxt,
        buttonCount: payload.buttonCount,
        bigBtnText: payload.bigBtnText,
      };
    }
    case actionConstant.ACTION_HIDE_ALERT: {
      console.log('payload', payload);
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};
