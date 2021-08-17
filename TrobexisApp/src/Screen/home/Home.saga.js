import {takeLatest, take, call, put, select, all} from 'redux-saga/effects';
import {actionConstant, apiConstant, appConstant} from '../../constant';
import {ApiBase} from '../../api/apiBase';
import {successToGetAccessToken, failToGetAccessToken} from './Home.action';
import {getToken, getUserProfile} from './Home.api';

export function* workerGetAccessToken() {
  console.log('call Here ');
  try {
    const accessToken = yield call(getToken);
    console.log(accessToken);
    console.log('  workerGetAccessToken in saga -======>>>>>>', accessToken);
    yield put({
      type: actionConstant.ACTION_GET_ACCESS_TOKEN_SUCCESS,
      payload: accessToken,
    });

     yield call(workerGetUserProfile);
  } catch (error) {
    yield put({
      type: actionConstant.ACTION_GET_ACCESS_TOKEN_FAILURE,
      payload: error,
    });
  }
}

export function* workerGetUserProfile() {
  try {
    const reducer = yield select();
    console.log(reducer);
    const token = reducer.HomeReducer.accessToken.token;
    if (token) {
      const userProfile = yield call(
        getUserProfile,
        token,
      );

      if (userProfile) {
        //   console.log(' user profile in saga -======>>>>>>', userProfile);
        yield put({
          type: actionConstant.ACTION_GET_USER_PROFILE_SUCCESS,
          payload: userProfile,
        });
      }
    }
  } catch (error) {
    // console.log(' worker saga called error  ', error);
    yield put({
      type: actionConstant.ACTION_GET_USER_PROFILE_FAILURE,
      payload: error,
    });
  }
}

function* watchGetAccessToken() {
  yield all[
    takeLatest(
      actionConstant.ACTION_GET_ACCESS_TOKEN_REQUEST,
      workerGetAccessToken,
      actionConstant.ACTION_GET_USER_PROFILE_REQUEST,
      workerGetUserProfile,
    )
  ];
}

export default watchGetAccessToken;
