import {takeLatest, call, put, select, all} from 'redux-saga/effects';
import {actionConstant} from '../../constant';

import {cancelSiteTravelItinary, getItinaryDetail} from './SiteTravelItinary.api';

///** Get bus route */
export function* workerCancelSiteTravelItinary(params) {
  try {
    const reducer = yield select();

    const token = reducer.LoginReducer.accessToken.token;
    if (token) {
      const cancelResponse = yield call(
        cancelSiteTravelItinary,
        token,
        params
      );
   //   console.log(' workerCancelSiteTravelItinary saga -======>>>>>>', cancelResponse);

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


export function* workerGetItinaryDetail(params) {
  try {
    const reducer = yield select();

    const token = reducer.LoginReducer.accessToken.token;
    if (token) {
      const itinaryResponse = yield call(
        getItinaryDetail,
        token,
        params
      );

      if (itinaryResponse) {
        yield put({
          type: actionConstant.ACTION_GET_ITINARY_DETAILS_SUCCESS,
          payload: itinaryResponse,
        });
      }
     
    }
  } catch (error) {
    // console.log(' worker saga called error  ', error);
    yield put({
      type: actionConstant.ACTION_GET_DETAIL_OF_ITINARY_FAILURE,
      payload: error,
    });
  }
}

export function* watchToGetItinaryDetail() {
  yield takeLatest(
    actionConstant.ACTION_GET_ITINARY_DETAILS_REQUEST,
    workerGetItinaryDetail
  );
}



export function* watchToCancelSiteTravelItinary() {
    yield takeLatest(
      actionConstant.ACTION_SITE_TRAVEL_ITINARY_CANCEL_REQUEST,
      workerCancelSiteTravelItinary
    );
  }

  export default watchToGetItinaryDetail;
  