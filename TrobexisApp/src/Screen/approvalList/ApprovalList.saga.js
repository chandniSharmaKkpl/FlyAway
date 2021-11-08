import {takeLatest, take, call, put, select, all,delay} from 'redux-saga/effects';
import {actionConstant, apiConstant, appConstant} from '../../constant';
import {acceptApprovalApi, declineApprovalApi, getApprovalListInList} from './ApprovalList.api';
import {isError} from '../../common';

export function* workerAcceptApproval(argumentData ) {

    try {
          
      const approvalResponse = yield call(acceptApprovalApi,argumentData.payload);
     
      console.log( ' 12 Sagag  approval list  in saga -======>>>>>>', approvalResponse );

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

  export function* workerGetApprovalList(argumentData) {
    console.log( 'Sagag arge', argumentData,' dec list  in saga -======>>>>>>' );

      try {
       
           const itinaryList = yield call(
            getApprovalListInList,
            argumentData.payload,
          );
          if (itinaryList) {
            yield put({
              type: actionConstant.ACTION_GET_APPROVAL_LIST_SUCCESS,
              payload: itinaryList,
            });
          }
        
      } catch (error) {
        // console.log(' worker saga called error  ', error);
        yield put({
          type: actionConstant.ACTION_GET_APPROVAL_LIST_FAILURE,
          payload: error,
        });
      }
    }

    export function* watchApprovalListInList() {
      yield takeLatest(
        actionConstant.ACTION_GET_APPROVAL_LIST_REQUEST,
        workerGetApprovalList
      );
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
  