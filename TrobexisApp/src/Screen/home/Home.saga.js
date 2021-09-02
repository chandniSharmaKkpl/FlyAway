import {takeLatest, take, call, put, select, all} from 'redux-saga/effects';
import {actionConstant, apiConstant, appConstant} from '../../constant';
import {ApiBase} from '../../api/apiBase';
import {successToGetAccessToken, failToGetAccessToken} from './Home.action';
import {getToken, getUserProfile, getItinaryList} from './Home.api';


export function* workerGetUserProfile() {
  try {
    const reducer = yield select();
    
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
      yield call(workerGetItinaryList);
    }
  } catch (error) {
    // console.log(' worker saga called error  ', error);
    yield put({
      type: actionConstant.ACTION_GET_USER_PROFILE_FAILURE,
      payload: error,
    });
  }
}

export function* workerGetItinaryList() {
  try {
    const reducer = yield select();
    const token = reducer.HomeReducer.accessToken.token;
    if (token) {
      const itinaryList = yield call(
        getItinaryList,
        token,
      );

      if (itinaryList) {
        yield put({
          type: actionConstant.ACTION_GET_ITINARY_LIST_SUCCESS,
          payload: itinaryList,
        });
      }
    }
  } catch (error) {
    // console.log(' worker saga called error  ', error);
    yield put({
      type: actionConstant.ACTION_GET_ITINARY_LIST_FAILURE,
      payload: error,
    });
  }
}

export function* watchGetUserProfile() {
    yield takeLatest(
      actionConstant.ACTION_GET_USER_PROFILE_REQUEST,
      workerGetUserProfile
    );
}  
export function* watchItinaryList() {
  yield takeLatest(
    actionConstant.ACTION_GET_ITINARY_LIST_REQUEST,
    workerGetItinaryList
  );
}
export default watchGetUserProfile;
