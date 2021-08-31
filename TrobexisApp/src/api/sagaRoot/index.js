import { all, fork } from 'redux-saga/effects';
import * as SagaHome from '../../Screen/home/Home.saga';
import * as SagaLogin from '../../Screen/login/Login.saga';

export default function* sagaRoot() {

    yield all([
        ...Object.values(SagaLogin),
         ...Object.values(SagaHome)

    ].map(fork))
}