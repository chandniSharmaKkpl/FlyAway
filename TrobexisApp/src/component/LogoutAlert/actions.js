import {actionConstant} from '../../constant';

export const showAlert = data => {
  console.log(data);
  return {
    type: actionConstant.ACTION_SHOW_ALERT,
    payload: data,
  };
};

export const hideAlert = () => ({
  type: actionConstant.ACTION_HIDE_ALERT,
});

export default {
  showAlert,
  hideAlert,
};
