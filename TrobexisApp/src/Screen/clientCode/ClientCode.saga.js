import {takeLatest, take, call, put, select, all} from 'redux-saga/effects';
import {actionConstant, apiConstant, appConstant} from '../../constant';
import {ApiBase} from '../../api/apiBase';
import {getApiBase, getClientTokenBasedOnApiBase, getAccountURL} from './ClientCode.api';

//** Worker Get Api Base  */

export function* workerGetApiBase(argumentData) {
  console.log('call Here worker', argumentData);
  try {
    const apiBaseResponse = yield call(getApiBase,argumentData.payload.param);
    console.log(
      '  workerGetapiBaseResponse in saga -======>>>>>>',
      apiBaseResponse,
    );
    yield put({
      type: actionConstant.ACTION_GET_API_BASE_SUCCESS,
      payload: apiBaseResponse,
    });

    yield call(workerGetClientTokenBaseOnApiBase,argumentData.payload.param, apiBaseResponse); 

  } catch (error) {
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

export function* watchToGetClientToken() {
  yield takeLatest(
    actionConstant.ACTION_GET_CLIENT_TOKEN_REQUEST, 
    workerGetClientTokenBaseOnApiBase,
  )
}

export function* watchAccountUrl () {
  yield takeLatest(
    actionConstant.ACTION_GET_ACCOUNT_URL_REQUEST, 
    workerAccountUrl,
  )
}



export default watchGetApiBase;
