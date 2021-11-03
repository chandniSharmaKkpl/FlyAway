import {takeLatest, take, call, put, select, all} from 'redux-saga/effects';
import {actionConstant, apiConstant, appConstant, errorCodeConstant} from '../../constant';
import {getDeclineReasonsApi} from './declineReason.api'; 
import {isError} from '../../common';

//** Worker Get Api Base  */

export function* workerGetDeclineReason(argumentData) {
  try {
    console.log(" argumentData in saga", argumentData); 
    const apiBaseResponse = yield call(getDeclineReasonsApi,argumentData.payload.data);
    console.log(
      '  workerGetDeclineReasonResponse in saga -======>>>>>>',
      apiBaseResponse,
    );

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
//    yield call(workerGetClientTokenBaseOnApiBase,argumentData.payload.param, apiBaseResponse); 

  } catch (error) {
    console.log(" Response Error : ",error)

    yield put({
      type: actionConstant.ACTION_GET_DECLINE_REASON_FAILURE,
      payload: error,
    });
  }
}


// //**  worker client Token based on api base  */

// export function* workerGetClientTokenBaseOnApiBase(argumentData, apiBase ) {
//   try {
//     const clientToken = yield call(getClientTokenBasedOnApiBase,argumentData, apiBase.value);
//     console.log(
//       '  client Token  in saga -======>>>>>>',
//       clientToken,
//     );
//     if (isError(clientToken)) {
//       yield put({
//         type: actionConstant.ACTION_GET_CLIENT_TOKEN_FAILURE,
//         payload: clientToken.message
//       })
//       return; 
//     }

//     yield put({
//       type: actionConstant.ACTION_GET_CLIENT_TOKEN_SUCCESS,
//       payload: clientToken,
//     });

    
//     yield call(workerGetAccountUrl,argumentData,apiBase.value, clientToken)
//   } catch (error) {
//     yield put({
//       type: actionConstant.ACTION_GET_CLIENT_TOKEN_FAILURE,
//       payload: error,
//     });
//   }
// }




export function* watchGetDeclineReason() {
  yield takeLatest(
    actionConstant.ACTION_GET_DECLINE_REASON_REQUEST,
    workerGetDeclineReason,
  );
}


export default watchGetDeclineReason;
