import {takeLatest, call, put, select, all} from 'redux-saga/effects';
import {actionConstant} from '../../constant';
import localDb from '../../database/localDb'

import { getUserProfile, getItinaryList, getItinaryListAllJourney, getApprovalList} from './Home.api';


export function* workerGetUserProfile(argumentData) {
  try {
    
      const userProfile = yield call(
        getUserProfile,
        argumentData.payload,
      );

      if (userProfile) {
        yield put({
          type: actionConstant.ACTION_GET_USER_PROFILE_SUCCESS,
          payload: userProfile,
        });
      }
      yield call(workerGetItinaryList, argumentData);
      yield call (workerGetItinaryListAllJoureny, argumentData);
      yield call (workerGetApprovalList,argumentData);
    
  } catch (error) {
    // console.log(' worker saga called error  ', error);
    yield put({
      type: actionConstant.ACTION_GET_USER_PROFILE_FAILURE,
      payload: error,
    });
  }
}

export function* workerGetItinaryList(argumentData) {
  try {
      const itinaryList = yield call(
        getItinaryList,
        argumentData.payload,
      );
      if (itinaryList) {
        yield put({
          type: actionConstant.ACTION_GET_ITINARY_LIST_SUCCESS,
          payload: itinaryList,
        });
      }
    
  } catch (error) {
    // console.log(' worker saga called error  ', error);
    yield put({
      type: actionConstant.ACTION_GET_ITINARY_LIST_FAILURE,
      payload: error,
    });
  }
}

export function* workerGetItinaryListAllJoureny(argumentData) {
  try {
       const itinaryList = yield call(
        getItinaryListAllJourney,
        argumentData.payload,
      );
      if (itinaryList) {
        yield put({
          type: actionConstant.ACTION_GET_ITINARY_LIST_ALL_JOURNEY_SUCCESS,
          payload: itinaryList,
        });
      }
    
  } catch (error) {
    // console.log(' worker saga called error  ', error);
    yield put({
      type: actionConstant.ACTION_GET_ITINARY_LIST_ALL_JOURNEY_FAILURE,
      payload: error,
    });
  }
}

export function* workerGetApprovalList(argumentData) {
const dictParam = {data: argumentData.payload}
  try {
   
       const itinaryList = yield call(
        getApprovalList,
        dictParam,
      );
      if (itinaryList) {
        yield put({
          type: actionConstant.ACTION_GET_APPROVAL_LIST_SUCCESS,
          payload: itinaryList,
        });
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
