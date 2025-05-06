import {takeLatest, take, call, put, select, all} from 'redux-saga/effects';
import {
  actionConstant,
  apiConstant,
  appConstant,
  errorCodeConstant,
} from '../../constant';
import {getDeclineReasonsApi, declineApprovalApi} from './declineReason.api';
import {isError} from '../../common';
import localDb from '../../database/localDb';

//** Worker Get Api Base  */

export function* workerGetDeclineReason(argumentData) {
  try {
    const apiBaseResponse = yield call(
      getDeclineReasonsApi,
      argumentData.payload.data,
    );

    if (isError(apiBaseResponse)) {
      //** managing global error message */
      yield put({
        type: actionConstant.ACTION_API_ERROR_SUCCESS,
        payload: apiBaseResponse,
      });
      //** managing loader and ui of the view */
      yield put({
        type: actionConstant.ACTION_GET_DECLINE_REASON_FAILURE,
        payload: apiBaseResponse,
      });
      if (apiBaseResponse.code === errorCodeConstant.UNAUTHORIZED) {
        localDb.setUser(null);
        argumentData.payload.data.navigation.navigate(appConstant.CLIENT_CODE);
      }
    } else {
      yield put({
        type: actionConstant.ACTION_GET_DECLINE_REASON_SUCCESS,
        payload: apiBaseResponse,
      });
    }
  } catch (error) {
    console.log(' Response Error : ', error);
    yield put({
      type: actionConstant.ACTION_GET_DECLINE_REASON_FAILURE,
      payload: error,
    });
  }
}

// //**  worker client Token based on api base  */

export function* workerSubmitDeclineReason(argumentData) {
  try {
    const declineResponse = yield call(
      declineApprovalApi,
      argumentData.payload.data,
    );

    if (isError(declineResponse)) {
      yield put({
        type: actionConstant.ACTION_API_ERROR_SUCCESS,
        payload: declineResponse,
      });

      yield put({
        type: actionConstant.ACTION_SUBMIT_DECLINE_REASON_FAILURE,
        payload: declineResponse,
      });
      if (declineResponse.code === errorCodeConstant.UNAUTHORIZED) {
        localDb.setUser(null);
        argumentData.payload.data.navigation.navigate(appConstant.CLIENT_CODE);
      }
      
    }else{
      yield put({
        type: actionConstant.ACTION_SUBMIT_DECLINE_REASON_SUCCESS,
        payload: declineResponse,
      });
    }
   
  } catch (error) {
    yield put({
      type: actionConstant.ACTION_API_ERROR_SUCCESS,
      payload: error,
    });
    yield put({
      type: actionConstant.ACTION_SUBMIT_DECLINE_REASON_FAILURE,
      payload: error,
    });
  }
}

export function* watchSubmitDeclineReason() {
  yield takeLatest(
    actionConstant.ACTION_SUBMIT_DECLINE_REASON_REQUEST,
    workerSubmitDeclineReason,
  );
}

export function* watchGetDeclineReason() {
  yield takeLatest(
    actionConstant.ACTION_GET_DECLINE_REASON_REQUEST,
    workerGetDeclineReason,
  );
}

export default watchGetDeclineReason;
