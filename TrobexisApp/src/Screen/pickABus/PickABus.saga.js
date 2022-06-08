import {takeLatest, call, put, select, all} from 'redux-saga/effects';
import {actionConstant} from '../../constant';

import {getBusRoute} from './PickABus.api';

///** Get bus route */
export function* workerGetBusRoute(params) {
  try {
    const reducer = yield select();
            //   console.log(' user profile in saga -======>>>>>>', reducer);

    const token = reducer.LoginReducer.accessToken.token;
    if (token) {
      const busRoute = yield call(getBusRoute,token,params);
      // console.log(" bus route ", busRoute); 
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

  export default watchToGetBusRoute;
  