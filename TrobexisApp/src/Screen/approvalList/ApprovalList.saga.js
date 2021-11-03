import {takeLatest, take, call, put, select, all} from 'redux-saga/effects';
import {actionConstant, apiConstant, appConstant} from '../../constant';
import {successToGetAccessToken, failToGetAccessToken} from './Home.action';
import {acceptApprovalApi, declineApprovalApi} from './ApprovalList.api';
import {isError} from '../../common';

export function* workerAcceptApproval(argumentData ) {

    try {
     console.log( 'Sagag arge', argumentData,' approval list  in saga -======>>>>>>' );
          
      const approvalResponse = yield call(acceptApprovalApi,argumentData.payload);
     
      if (isError(approvalResponse)) {
        yield put({
          type: actionConstant.ACTION_ACCEPT_APPROVAL_FAILURE,
          payload: approvalResponse.message
        })
        return; 
      }
  
      yield put({
        type: actionConstant.ACTION_ACCEPT_APPROVAL_SUCCESS,
        payload: approvalResponse,
      });
  
      
    } catch (error) {
      yield put({
        type: actionConstant.ACTION_ACCEPT_APPROVAL_FAILURE,
        payload: error,
      });
    }
  }

  export function* workerDeclineApproval(argumentData ) {

    try {
     console.log( 'Sagag arge', argumentData,' dec list  in saga -======>>>>>>' );
          
      const declineResponse = yield call(declineApprovalApi,argumentData.payload);
     
      if (isError(declineResponse)) {
        yield put({
          type: actionConstant.ACTION_DECLINE_APPROVAL_FAILURE,
          payload: declineResponse.message
        })
        return; 
      }
  
      yield put({
        type: actionConstant.ACTION_DECLINE_APPROVAL_SUCCESS,
        payload: declineResponse,
      });
  
      
    } catch (error) {
      yield put({
        type: actionConstant.ACTION_DECLINE_APPROVAL_FAILURE,
        payload: error,
      });
    }
  }


export function* watchAcceptApprovalApi () {
    yield takeLatest(
        actionConstant.ACTION_ACCEPT_APPROVAL_REQUEST,
        workerAcceptApproval,        
      )
  }


  export function* watchDeclineApproval() {
      yield takeLatest(
          actionConstant.ACTION_DECLINE_APPROVAL_REQUEST,
          workerDeclineApproval
      )
  }
  export default watchAcceptApprovalApi;
  