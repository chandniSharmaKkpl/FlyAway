import {takeLatest, take, call, put, select, all} from 'redux-saga/effects';
import {actionConstant, apiConstant, appConstant} from '../../constant';
import {getApprovalDetail} from './ApprovalDetail.api';
import {isError} from '../../common';

export function* workerGetApprovalDetail(argumentData ) {

    try {
          
      const approvalResponse = yield call(getApprovalDetail,argumentData.payload);
     
      if (isError(approvalResponse)) {
        yield put({
          type: actionConstant.ACTION_APPROVAL_DETAIL_FAILURE,
          payload: approvalResponse.message
        })
        return; 
      }
  
      console.log( 'Sagag approvaldetail', approvalResponse,' approval detail  in saga -======>>>>>>' );

      yield put({
        type: actionConstant.ACTION_APPROVAL_DETAIL_SUCCESS,
        payload: approvalResponse,
      });
  
      
    } catch (error) {
      yield put({
        type: actionConstant.ACTION_APPROVAL_DETAIL_FAILURE,
        payload: error,
      });
    }
  }

export function* watchApprovalDetail () {
    yield takeLatest(
        actionConstant.ACTION_APPROVAL_DETAIL_REQUEST,
        workerGetApprovalDetail,        
      )
  }

  export default watchApprovalDetail;
  