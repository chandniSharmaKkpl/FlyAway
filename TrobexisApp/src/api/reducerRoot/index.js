import {combineReducers} from 'redux';
import HomeReducer from '../../Screen/home/Home.reducer';
import LoginReducer from '../../Screen/login/Login.reducer';
import BusBookingReducer from '../../Screen/busBooking/BusBooking.reducer';
import PickABusReducer from '../../Screen/pickABus/PickABus.reducer';
import BookingSummaryReducer from '../../Screen/bookingSummary/BookingSummary.reducer';
import SiteTravelItinaryReducer from '../../Screen/siteTravelItinary/SiteTravelItinary.reducer';
import ClientCodeReducer from '../../Screen/clientCode/ClientCode.reducer';
import ApprovalListReducer from '../../Screen/approvalList/ApprovalList.reducer';
import DeclineReasonReducer from '../../Screen/declineReasons/declineReason.reducer';
import ApprovalDetailReducer from '../../Screen/approvalDetail/ApprovalDetail.reducer';
import JourneyDetailReducer from '../../Screen/JourneyDetail/JourneyDetail.reducer';

const ReducerRoot = combineReducers({
    ClientCodeReducer,
    LoginReducer,
    ApprovalListReducer,
    ApprovalDetailReducer,
    JourneyDetailReducer,
    DeclineReasonReducer,
    HomeReducer,
    BusBookingReducer,
    PickABusReducer,
    BookingSummaryReducer,
    SiteTravelItinaryReducer
})

export default ReducerRoot;