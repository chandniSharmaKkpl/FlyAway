import { all, fork } from 'redux-saga/effects';
import * as SagaHome from '../../Screen/home/Home.saga';
import * as SagaLogin from '../../Screen/login/Login.saga';

export default function* sagaRoot() {
yield all(
    [
        fork(SagaLogin),
        fork(SagaHome)
    ]
)

    // yield all([
    //     ...Object.values(SagaHome),
    //      ...Object.values(SagaLogin)

    // ].map(fork))
}