import { all, fork } from 'redux-saga/effects';
import * as SagaHome from '../../Screen/home/Home.saga';

export default function* sagaRoot() {
    yield all([
...Object.values(SagaHome)
    ].map(fork))
}