import {takeLatest, take, call, put, select, all} from 'redux-saga/effects';
import {actionConstant, apiConstant, appConstant, errorCodeConstant} from '../../constant';
import {getApprovalDetail} from './ApprovalDetail.api';
import {isError} from '../../common';
import localDb from '../../database/localDb'


export function* workerGetApprovalDetail(argumentData ) {

    try {
          
      const approvalResponse = yield call(getApprovalDetail,argumentData.payload);
     
      if (isError(approvalResponse)) {
//** managing global error message */
        yield put({
          type: actionConstant.ACTION_API_ERROR_SUCCESS,
          payload: approvalResponse
        })
//** managing loader and ui of the view */
        yield put({
          type: actionConstant.ACTION_APPROVAL_DETAIL_FAILURE,
          payload: approvalResponse,
        });
//** if 401 then logout and redirect to client code screen */
        if (approvalResponse.code === errorCodeConstant.UNAUTHORIZED) {
          localDb.setUser(null);
          argumentData.payload.navigation.navigate(appConstant.CLIENT_CODE); 
        }

        return; 
      }
      yield put({
        type: actionConstant.ACTION_APPROVAL_DETAIL_SUCCESS,
        payload: approvalResponse,
      });
  
      
    } catch (error) {
      //** managing global error message */
      yield put({
        type: actionConstant.ACTION_API_ERROR_SUCCESS,
        payload: error
      })
      //** managing loader and ui of the view */
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
  