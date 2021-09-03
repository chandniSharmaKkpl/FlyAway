import {takeLatest, call, put, select, all} from 'redux-saga/effects';
import {actionConstant} from '../../constant';

import {postBooking} from './BookingSummary.api';

///** Get bus route */
export function* workerPostBooking(params) {
  try {
    const reducer = yield select();
            //   console.log(' user profile in saga -======>>>>>>', reducer);

    const token = reducer.LoginReducer.accessToken.token;
    if (token) {
      const bookingResponse = yield call(
        postBooking,
        token,
        params
      );

      if (busRoute) {
        yield put({
          type: actionConstant.ACTION_POST_BUS_BOOKING_SUCCESS,
          payload: bookingResponse,
        });
      }
     
    }
  } catch (error) {
    // console.log(' worker saga called error  ', error);
    yield put({
      type: actionConstant.ACTION_POST_BUS_BOOKING_FAILURE,
      payload: error,
    });
  }
}

export function* watchPostBooking() {
    yield takeLatest(
      actionConstant.ACTION_POST_BUS_BOOKING_REQUEST,
      workerPostBooking
    );
  }

  export default watchPostBooking;
  