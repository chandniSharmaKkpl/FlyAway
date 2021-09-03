import {takeLatest, call, put, select, all} from 'redux-saga/effects';
import {actionConstant} from '../../constant';

import {getBusRoute, getBusStop} from './BusBooking.api';

///** Get bus route */
export function* workerGetBusRoute() {
  try {
    const reducer = yield select();
            //   console.log(' user profile in saga -======>>>>>>', reducer);

    const token = reducer.LoginReducer.accessToken.token;
    if (token) {
      const busRoute = yield call(
        getBusRoute,
        token,
      );

      if (busRoute) {
        yield put({
          type: actionConstant.ACTION_GET_BUS_ROUTE_SUCCESS,
          payload: busRoute,
        });
      }
     
    }
  } catch (error) {
    // console.log(' worker saga called error  ', error);
    yield put({
      type: actionConstant.ACTION_GET_BUS_ROUTE_FAILURE,
      payload: error,
    });
  }
}

export function* watchToGetBusRoute() {
    yield takeLatest(
      actionConstant.ACTION_GET_BUS_ROUTE_REQUEST,
      workerGetBusRoute
    );
  }

  /// ** Get Bus Stops  **///

  export function* workerGetBusStop() {
    try {
      const reducer = yield select();
              //   console.log(' user profile in saga -======>>>>>>', reducer);
  
      const token = reducer.LoginReducer.accessToken.token;
      if (token) {
        const busStop = yield call(
          getBusStop,
          token,
        );
  
        if (busStop) {
          yield put({
            type: actionConstant.ACTION_GET_BUS_STOP_SUCCESS,
            payload: busStop,
          });
        }
       
      }
    } catch (error) {
      // console.log(' worker saga called error  ', error);
      yield put({
        type: actionConstant.ACTION_GET_BUS_STOP_FAILURE,
        payload: error,
      });
    }
  }
  
  export function* watchToGetBusStop() {
      yield takeLatest(
        actionConstant.ACTION_GET_BUS_STOP_REQUEST,
        workerGetBusStop
      );
    }
  
    

  export default watchToGetBusRoute;
  