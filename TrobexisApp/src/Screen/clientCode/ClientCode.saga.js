import {takeLatest, take, call, put, select, all} from 'redux-saga/effects';
import {actionConstant, apiConstant, appConstant, errorCodeConstant} from '../../constant';
import {getApiBase, getClientTokenBasedOnApiBase, getAccountURL} from './ClientCode.api';
import {isError} from '../../common';

//** Worker Get Api Base  */

export function* workerGetApiBase(argumentData) {
  try {
    const apiBaseResponse = yield call(getApiBase,argumentData.payload.param);
    console.log(
      '  workerGetapiBaseResponse in saga -======>>>>>>',
      apiBaseResponse,
    );

    if (isError(apiBaseResponse)) {
      yield put({
        type: actionConstant.ACTION_GET_API_BASE_FAILURE,
        payload: apiBaseResponse.message
      })
      //return; 
    }

    yield put({
      type: actionConstant.ACTION_GET_API_BASE_SUCCESS,
      payload: apiBaseResponse,
    });
    yield call(workerGetClientTokenBaseOnApiBase,argumentData.payload.param, apiBaseResponse); 

  } catch (error) {
    console.log(" Response Error : ",error)

    yield put({
      type: actionConstant.ACTION_GET_API_BASE_FAILURE,
      payload: error,
    });
  }
}


//**  worker client Token based on api base  */

export function* workerGetClientTokenBaseOnApiBase(argumentData, apiBase ) {
  try {
    const clientToken = yield call(getClientTokenBasedOnApiBase,argumentData, apiBase.value);
    console.log(
      '  client Token  in saga -======>>>>>>',
      clientToken,
    );
    if (isError(clientToken)) {
      yield put({
        type: actionConstant.ACTION_GET_CLIENT_TOKEN_FAILURE,
        payload: clientToken.message
      })
      return; 
    }

    yield put({
      type: actionConstant.ACTION_GET_CLIENT_TOKEN_SUCCESS,
      payload: clientToken,
    });

    
    yield call(workerGetAccountUrl,argumentData,apiBase.value, clientToken)
  } catch (error) {
    yield put({
      type: actionConstant.ACTION_GET_CLIENT_TOKEN_FAILURE,
      payload: error,
    });
  }
}


//** Worker Account URL  */

export function* workerGetAccountUrl (argumentData, apiBase, clientToken) {
  try{

    const responseAccountUrl = yield call(getAccountURL,argumentData, apiBase, clientToken); 
    console.log("Final Response : ",responseAccountUrl)

    if (isError(responseAccountUrl)) {
      console.log("86 isError ", isError()); 

      yield put({
        type: actionConstant.ACTION_GET_ACCOUNT_URL_FAILURE,
        payload: responseAccountUrl.message
      })
      return; 
    }

    yield put({
      type: actionConstant.ACTION_GET_ACCOUNT_URL_SUCCESS,
      payload: responseAccountUrl,
    });

  }catch(error){
    yield put({
      type: actionConstant.ACTION_GET_ACCOUNT_URL_FAILURE, 
      payload: error
    })
  }
}

export function* watchGetApiBase() {
  yield takeLatest(
    actionConstant.ACTION_GET_API_BASE_REQUEST,
    workerGetApiBase,
  );
}


export default watchGetApiBase;
