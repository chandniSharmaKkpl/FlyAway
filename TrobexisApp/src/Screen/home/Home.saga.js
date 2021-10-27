import {takeLatest, call, put, select, all} from 'redux-saga/effects';
import {actionConstant} from '../../constant';

import { getUserProfile, getItinaryList, getItinaryListAllJourney, getApprovalList} from './Home.api';


export function* workerGetUserProfile() {
  try {
    const reducer = yield select();
             // console.log(' user profile in saga -======>>>>>>', reducer);
    const token = reducer.ClientCodeReducer.clientToken;
    if (token) {
      const userProfile = yield call(
        getUserProfile,
        token,
      );

      if (userProfile) {
        yield put({
          type: actionConstant.ACTION_GET_USER_PROFILE_SUCCESS,
          payload: userProfile,
        });
      }
      yield call(workerGetItinaryList);
      yield call (workerGetItinaryListAllJoureny);
      yield call (workerGetApprovalList);
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
    const token = reducer.ClientCodeReducer.clientToken;
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

export function* workerGetItinaryListAllJoureny() {
  try {
    const reducer = yield select();
    const token = reducer.ClientCodeReducer.clientToken;
    if (token) {
      const itinaryList = yield call(
        getItinaryListAllJourney,
        token,
      );
      if (itinaryList) {
        yield put({
          type: actionConstant.ACTION_GET_ITINARY_LIST_ALL_JOURNEY_SUCCESS,
          payload: itinaryList,
        });
      }
    }
  } catch (error) {
    // console.log(' worker saga called error  ', error);
    yield put({
      type: actionConstant.ACTION_GET_ITINARY_LIST_ALL_JOURNEY_FAILURE,
      payload: error,
    });
  }
}

export function* workerGetApprovalList() {
  try {
    const reducer = yield select();
    const token = reducer.ClientCodeReducer.clientToken;
    if (token) {
      const itinaryList = yield call(
        getApprovalList,
        token,
      );
      if (itinaryList) {
        yield put({
          type: actionConstant.ACTION_GET_APPROVAL_LIST_SUCCESS,
          payload: itinaryList,
        });
      }
    }
  } catch (error) {
    // console.log(' worker saga called error  ', error);
    yield put({
      type: actionConstant.ACTION_GET_APPROVAL_LIST_FAILURE,
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

export function* watchItinaryListAllJourney() {
  yield takeLatest(
    actionConstant.ACTION_GET_ITINARY_LIST_ALL_JOURNEY_REQUEST,
    workerGetItinaryListAllJoureny
  );
}
export function* watchApprovalList() {
  yield takeLatest(
    actionConstant.ACTION_GET_APPROVAL_LIST_REQUEST,
    workerGetApprovalList
  );
}
export default watchGetUserProfile;
