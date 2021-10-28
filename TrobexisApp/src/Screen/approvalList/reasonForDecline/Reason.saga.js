import {takeLatest, take, call, put, select, all} from 'redux-saga/effects';
import {actionConstant, apiConstant, appConstant} from '../../../constant';
import {ApiBase} from '../../../api/apiBase';
import {getDeclineReasons, getUserProfile} from './Reason.api';

export function* workerGetDeclineReason (argumentData) {
  try{

    console.log("worker  Response 1111 : ",argumentData)

    const responseDeclineReason = yield call(getDeclineReasons,argumentData.payload); 
    console.log("Final Response 1111 : ",responseDeclineReason)

    if (isError(responseDeclineReason)) {
      console.log("13 isError ", isError()); 

      yield put({
        type: actionConstant.ACTION_GET_DECLINE_REASON_FAILURE,
        payload: responseDeclineReason.message
      })
      return; 
    }

    yield put({
      type: actionConstant.ACTION_GET_DECLINE_REASON_SUCCESS,
      payload: responseDeclineReason,
    });

  }catch(error){
    yield put({
      type: actionConstant.ACTION_GET_DECLINE_REASON_FAILURE, 
      payload: error
    })
  }
}

 export function* watchGetDeclineReason() {
    yield 
      takeLatest(
        actionConstant.ACTION_GET_DECLINE_REASON_REQUEST,
        workerGetDeclineReason,
      )
    
  }
  
  export default watchGetDeclineReason;
  