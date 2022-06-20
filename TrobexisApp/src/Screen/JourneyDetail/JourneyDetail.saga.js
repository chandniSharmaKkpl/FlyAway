import {takeLatest, take, call, put, select, all} from 'redux-saga/effects';
import {
  actionConstant,
  apiConstant,
  appConstant,
  errorCodeConstant,
} from '../../constant';
import {getJourneyDetail} from './JourneyDetail.api';
import {isError} from '../../common';
import localDb from '../../database/localDb';

export function* workerGetJourneyDetail(argumentData) {
  try {
    const journeyDetailResponse = yield call(
      getJourneyDetail,
      argumentData.payload,
    );
    // console.log('journeyDetailResponse ', JSON.stringify(journeyDetailResponse,null,4));
    if (isError(journeyDetailResponse)) {
      yield put({
        type: actionConstant.ACTION_API_ERROR_SUCCESS,
        payload: journeyDetailResponse,
      });
      yield put({
        type: actionConstant.ACTION_GET_DETAIL_OF_ITINARY_FAILURE,
        payload: journeyDetailResponse,
      });
      if (journeyDetailResponse.code === errorCodeConstant.UNAUTHORIZED) {
        localDb.setUser(null);
        argumentData.payload.data.navigation.navigate(appConstant.CLIENT_CODE);
      }
    } else {
      console.log('workerGetJourneyDetail', journeyDetailResponse);

      yield put({
        type: actionConstant.ACTION_GET_DETAIL_OF_ITINARY_SUCCESS,
        payload: journeyDetailResponse,
      });
    }
  } catch (error) {
    yield put({
      type: actionConstant.ACTION_API_ERROR_SUCCESS,
      payload: error,
    });
    yield put({
      type: actionConstant.ACTION_GET_DETAIL_OF_ITINARY_FAILURE,
      payload: error,
    });
  }
}

export function* watchJourneyDetail() {
  yield takeLatest(
    actionConstant.ACTION_GET_DETAIL_OF_ITINARY_REQUEST,
    workerGetJourneyDetail,
  );
}

export default watchJourneyDetail;
