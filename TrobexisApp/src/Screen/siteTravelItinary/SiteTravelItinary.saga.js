import {takeLatest, call, put, select, all} from 'redux-saga/effects';
import {actionConstant} from '../../constant';

import {cancelSiteTravelItinary} from './SiteTravelItinary.api';

///** Get bus route */
export function* workerCancelSiteTravelItinary(params) {
  try {
    const reducer = yield select();
            //   console.log(' user profile in saga -======>>>>>>', reducer);

    const token = reducer.LoginReducer.accessToken.token;
    if (token) {
      const cancelResponse = yield call(
        cancelSiteTravelItinary,
        token,
        params
      );

      if (cancelResponse) {
        yield put({
          type: actionConstant.ACTION_SITE_TRAVEL_ITINARY_CANCEL_SUCCESS,
          payload: cancelResponse,
        });
      }
     
    }
  } catch (error) {
    // console.log(' worker saga called error  ', error);
    yield put({
      type: actionConstant.ACTION_SITE_TRAVEL_ITINARY_CANCEL_FAILURE,
      payload: error,
    });
  }
}

export function* watchToCancelSiteTravelItinary() {
    yield takeLatest(
      actionConstant.ACTION_SITE_TRAVEL_ITINARY_CANCEL_REQUEST,
      workerCancelSiteTravelItinary
    );
  }

  export default watchToCancelSiteTravelItinary;
  