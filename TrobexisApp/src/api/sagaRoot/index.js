import { all, fork } from 'redux-saga/effects';

import { watchGetAccessToken } from '../../Screen/login/Login.saga';
import { watchItinaryList,watchGetUserProfile } from '../../Screen/home/Home.saga';
import { watchToGetBusStop} from '../../Screen/busBooking/BusBooking.saga';
import {watchToGetBusRoute} from '../../Screen/pickABus/PickABus.saga';
import {watchToCancelSiteTravelItinary, watchToGetItinaryDetail} from '../../Screen/siteTravelItinary/SiteTravelItinary.saga';
import {watchPostBooking} from '../../Screen/bookingSummary/BookingSummary.saga';
import {watchGetApiBase} from '../../Screen/clientCode/ClientCode.saga';
import { watchAcceptApprovalApi, watchDeclineApproval } from "../../Screen/approvalList/ApprovalList.saga";;
import {watchGetDeclineReason} from '../../Screen/declineReasons/declineReason.saga';
import {watchApprovalDetail} from '../../Screen/approvalDetail/ApprovalDetail.saga';
import {watchJourneyDetail} from '../../Screen/JourneyDetail/JourneyDetail.saga';

export default function* sagaRoot() {

  yield all([
    fork(watchGetApiBase),
    fork(watchGetAccessToken),
    fork(watchAcceptApprovalApi),
    fork(watchApprovalDetail),
    fork(watchGetDeclineReason),
    fork(watchDeclineApproval),
    fork(watchItinaryList),
    fork(watchJourneyDetail),
    fork(watchGetUserProfile),
    fork(watchToGetBusStop),
    fork(watchToGetBusRoute),
    fork(watchPostBooking),
    fork(watchToGetItinaryDetail),
    fork(watchToCancelSiteTravelItinary)
  ]);
}