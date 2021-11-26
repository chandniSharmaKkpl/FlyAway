import {takeLatest, take, call, put, select, all} from 'redux-saga/effects';
import {actionConstant, apiConstant, appConstant} from '../../constant';
import {getscan} from './scan.api';
import {isError} from '../../common';

export function* workerScan(argumentData ) {

    try {
          
      const scanResponse = yield call(scanApi,argumentData.payload);
     
      if (isError(scanResponse)) {
        yield put({
          type: actionConstant.ACTION_GET_DETAIL_OF_ITINARY_FAILURE,
          payload: scanResponse.message
        })
        return; 
      }
  
      console.log( 'Sagag journe', scanResponse,' jorney detail  in saga -======>>>>>>' );

      yield put({
        type: actionConstant.ACTION_GET_DETAIL_OF_ITINARY_SUCCESS,
        payload: scanResponse,
      });
  
      
    } catch (error) {
      yield put({
        type: actionConstant.ACTION_GET_DETAIL_OF_ITINARY_FAILURE,
        payload: error,
      });
    }
  }

export function* watchscan () {
    yield takeLatest(
        actionConstant.ACTION_GET_DETAIL_OF_ITINARY_REQUEST,
        workerScan,        
      )
  }

  export default watchscan;
  