import {takeLatest, take, call, put, select, all} from 'redux-saga/effects';
import {actionConstant, apiConstant, appConstant, errorCodeConstant} from '../../constant';
import {getDeclineReasonsApi,declineApprovalApi } from './declineReason.api'; 
import {isError} from '../../common';

//** Worker Get Api Base  */

export function* workerGetDeclineReason(argumentData) {
  try {
    const apiBaseResponse = yield call(getDeclineReasonsApi,argumentData.payload.data);

    if (isError(apiBaseResponse)) {
      yield put({
        type: actionConstant.ACTION_GET_DECLINE_REASON_FAILURE,
        payload: apiBaseResponse.message
      })
      //return; 
    }
    yield put({
      type: actionConstant.ACTION_GET_DECLINE_REASON_SUCCESS,
      payload: apiBaseResponse,
    });

  } catch (error) {
    console.log(" Response Error : ",error)

    yield put({
      type: actionConstant.ACTION_GET_DECLINE_REASON_FAILURE,
      payload: error,
    });
  }
}


// //**  worker client Token based on api base  */

export function* workerSubmitDeclineReason(argumentData ) {

  try {
   
    const declineResponse = yield call(declineApprovalApi,argumentData.payload.data);
  
    if (isError(declineResponse)) {
      yield put({
        type: actionConstant.ACTION_SUBMIT_DECLINE_REASON_FAILURE,
        payload: declineResponse.message
      })
      return; 
    }

    yield put({
      type: actionConstant.ACTION_SUBMIT_DECLINE_REASON_SUCCESS,
      payload: declineResponse,
    });

  } catch (error) {
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
