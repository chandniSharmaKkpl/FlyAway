import {takeLatest, take, call, put, select, all} from 'redux-saga/effects';
import {actionConstant, apiConstant, appConstant} from '../../constant';
import {ApiBase} from '../../api/apiBase';
import {successToGetAccessToken, failToGetAccessToken} from './Home.action';
import {getToken, getUserProfile} from './Login.api';

export function* workerGetAccessToken() {
  try {
    const accessToken = yield call(getToken);
    yield put({
      type: actionConstant.ACTION_GET_ACCESS_TOKEN_SUCCESS,
      payload: accessToken,
    });
  } catch (error) {
    yield put({
      type: actionConstant.ACTION_GET_ACCESS_TOKEN_FAILURE,
      payload: error,
    });
  }
}



export function* watchGetAccessToken() {
  yield takeLatest(
      actionConstant.ACTION_GET_ACCESS_TOKEN_REQUEST,workerGetAccessToken,
    );
}

