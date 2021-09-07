import { all, fork } from 'redux-saga/effects';

import { watchGetAccessToken } from '../../Screen/login/Login.saga';
import { watchItinaryList,watchGetUserProfile } from '../../Screen/home/Home.saga';
import { watchToGetBusStop} from '../../Screen/busBooking/BusBooking.saga';
import {watchToGetBusRoute} from '../../Screen/pickABus/PickABus.saga';
import {watchToCancelSiteTravelItinary, watchToGetItinaryDetail} from '../../Screen/siteTravelItinary/SiteTravelItinary.saga';
import {watchPostBooking} from '../../Screen/bookingSummary/BookingSummary.saga';

export default function* sagaRoot() {

  yield all([
    fork(watchGetAccessToken),
    fork(watchItinaryList),
    fork(watchGetUserProfile),
    fork(watchToGetBusStop),
    fork(watchToGetBusRoute),
    fork(watchPostBooking),
    fork(watchToGetItinaryDetail),
    fork(watchToCancelSiteTravelItinary)
  ]);
}