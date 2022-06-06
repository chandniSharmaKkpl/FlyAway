import {takeLatest, call, put, select, all} from 'redux-saga/effects';
import {actionConstant} from '../../constant';
import {isError} from '../../common';
import {getAccessTokenBusBooking} from './BusBooking.api';
import localDb from '../../database/localDb'

export function* workerGetAccessTokenBusBooking(argumentData ) {
  try {
        
    const tokenBusBooking = yield call(getAccessTokenBusBooking,argumentData.payload);
  //  console.log(" token bus", tokenBusBooking); 
    if (isError(tokenBusBooking)) {
//** managing global error message */
      yield put({
        type: actionConstant.ACTION_API_ERROR_SUCCESS,
        payload: tokenBusBooking
      })
//** managing loader and ui of the view */
      yield put({
        type: actionConstant.ACTION_GET_ACCESSTOKEN_BUS_BOOKING_FAILURE,
        payload: tokenBusBooking,
      });
//** if 401 then logout and redirect to client code screen */
      if (tokenBusBooking.code === errorCodeConstant.UNAUTHORIZED) {
        localDb.setUser(null);
        argumentData.payload.data.navigation.navigate(appConstant.CLIENT_CODE); 
      }
    }else{
     
      yield put({
        type: actionConstant.ACTION_GET_ACCESSTOKEN_BUS_BOOKING_SUCCESS,
        payload: tokenBusBooking,
      });
    }      
  } catch (error) {
    //** managing global error message */
    yield put({
      type: actionConstant.ACTION_API_ERROR_SUCCESS,
      payload: error
    })
    //** managing loader and ui of the view */
    yield put({
      type: actionConstant.ACTION_GET_ACCESSTOKEN_BUS_BOOKING_FAILURE,
      payload: error,
    });
  }
}

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

    export function* watchToGetAccessTokenForBusBooking() {
      console.log(" watch bus booking ")
      yield takeLatest(
        actionConstant.ACTION_GET_ACCESSTOKEN_BUS_BOOKING_REQUEST,
        workerGetAccessTokenBusBooking
      );
    }
  
    


  export default watchToGetAccessTokenForBusBooking;
  