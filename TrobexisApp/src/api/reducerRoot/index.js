import {combineReducers} from 'redux';
import HomeReducer from '../../Screen/home/Home.reducer';
import LoginReducer from '../../Screen/login/Login.reducer';
import BusBookingReducer from '../../Screen/busBooking/BusBooking.reducer';
import PickABusReducer from '../../Screen/pickABus/PickABus.reducer';
import BookingSummaryReducer from '../../Screen/bookingSummary/BookingSummary.reducer';
import SiteTravelItinaryReducer from '../../Screen/siteTravelItinary/SiteTravelItinary.reducer';
import ClientCodeReducer from '../../Screen/clientCode/ClientCode.reducer';
import ApprovalReducer from '../../Screen/approvalList/ApprovalList.reducer';
import ReasonReducer from '../../Screen/approvalList/reasonForDecline/Reason.reducer';
import ApprovalDetailReducer from '../../Screen/approvalDetail/ApprovalDetail.reducer';
import JourneyDetailReducer from '../../Screen/JourneyDetail/JourneyDetail.reducer';

const ReducerRoot = combineReducers({
    ClientCodeReducer,
    LoginReducer,
    ApprovalReducer,
    ApprovalDetailReducer,
    JourneyDetailReducer,
    ReasonReducer,
    HomeReducer,
    BusBookingReducer,
    PickABusReducer,
    BookingSummaryReducer,
    SiteTravelItinaryReducer
})

export default ReducerRoot;