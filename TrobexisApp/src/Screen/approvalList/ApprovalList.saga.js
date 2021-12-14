import {takeLatest, take, call, put, select, all,delay} from 'redux-saga/effects';
import {actionConstant, apiConstant, appConstant, errorCodeConstant} from '../../constant';
import {acceptApprovalApi, declineApprovalApi, getApprovalListWithStatus} from './ApprovalList.api';
import {isError} from '../../common';
import localDb from '../../database/localDb'

export function* workerAcceptApproval(argumentData ) {

    try {
          
      const approvalResponse = yield call(acceptApprovalApi,argumentData.payload);
     
      if (isError(approvalResponse)) {
        //** for handling global error message */
        yield put({
          type: actionConstant.ACTION_API_ERROR_SUCCESS,
          payload: approvalResponse
        })
        //** Error handling in separate view */
        yield put({
          type: actionConstant.ACTION_ACCEPT_APPROVAL_FAILURE,
          payload: approvalResponse,
        });
        if (approvalResponse.code === errorCodeConstant.UNAUTHORIZED) {
          localDb.setUser(null);
          argumentData.payload.navigation.navigate(appConstant.CLIENT_CODE); 
        }
        return; 
      }
  
      yield put({
        type: actionConstant.ACTION_ACCEPT_APPROVAL_SUCCESS,
        payload: approvalResponse,
      });
  
      
    } catch (error) {
       //** for handling global error message */
       yield put({
        type: actionConstant.ACTION_API_ERROR_SUCCESS,
        payload: error
      })
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
          type: actionConstant.ACTION_API_ERROR_SUCCESS,
          payload: declineResponse
        })
        yield put({
          type: actionConstant.ACTION_DECLINE_APPROVAL_FAILURE,
          payload: declineResponse,
        });
        if (declineResponse.code === errorCodeConstant.UNAUTHORIZED) {
          localDb.setUser(null);
          argumentData.payload.navigation.navigate(appConstant.CLIENT_CODE); 
        }
        return; 
      }
  
      yield put({
        type: actionConstant.ACTION_DECLINE_APPROVAL_SUCCESS,
        payload: declineResponse,
      });
  
      
    } catch (error) {
      yield put({
        type: actionConstant.ACTION_API_ERROR_SUCCESS,
        payload: error
      })
      yield put({
        type: actionConstant.ACTION_DECLINE_APPROVAL_FAILURE,
        payload: error,
      });
    }
  }

  export function* workerGetApprovalListWithStatus(argumentData) {
      try {
       
           const itinaryList = yield call(
            getApprovalListWithStatus,
            argumentData.payload,
          );

          console.log("workerGetApprovalListWithStatus ", itinaryList); 
          if (isError(itinaryList)) {
            yield put({
              type: actionConstant.ACTION_API_ERROR_SUCCESS,
              payload: itinaryList
            })
            yield put({
              type: actionConstant.ACTION_GET_APPROVAL_LIST_WITH_STATUS_FAILURE,
              payload: itinaryList,
            });
            if (itinaryList.code === errorCodeConstant.UNAUTHORIZED) {
              localDb.setUser(null);
              argumentData.payload.navigation.navigate(appConstant.CLIENT_CODE); 
            }
            return; 
          }

          if (itinaryList) {
            yield put({
              type: actionConstant.ACTION_GET_APPROVAL_LIST_WITH_STATUS_SUCCESS,
              payload: itinaryList,
            });
          }
      } catch (error) {
        // console.log(' worker saga called error  ', error);
        yield put({
          type: actionConstant.ACTION_API_ERROR_SUCCESS,
          payload: error
        })
        yield put({
          type: actionConstant.ACTION_GET_APPROVAL_LIST_WITH_STATUS_FAILURE,
          payload: error,
        });
      }
    }

    export function* watchApprovalListWithStatus() {
      yield takeLatest(
        actionConstant.ACTION_GET_APPROVAL_LIST_WITH_STATUS_REQUEST,
        workerGetApprovalListWithStatus
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
  