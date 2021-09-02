import { all, fork } from 'redux-saga/effects';

import { watchGetAccessToken } from '../../Screen/login/Login.saga';
import { watchItinaryList,watchGetUserProfile } from '../../Screen/home/Home.saga';

export default function* sagaRoot() {

  yield all([
    fork(watchGetAccessToken),
    fork(watchItinaryList),
    fork(watchGetUserProfile)
  ]);
}