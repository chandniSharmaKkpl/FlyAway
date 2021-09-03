import {combineReducers} from 'redux';
import HomeReducer from '../../Screen/home/Home.reducer';
import LoginReducer from '../../Screen/login/Login.reducer';
import BusBookingReducer from '../../Screen/busBooking/BusBooking.reducer';
import PickABusReducer from '../../Screen/pickABus/PickABus.reducer';
import BookingSummaryReducer from '../../Screen/bookingSummary/BookingSummary.reducer';
import SiteTravelItinaryReducer from '../../Screen/siteTravelItinary/SiteTravelItinary.reducer';

const ReducerRoot = combineReducers({
    LoginReducer,
    HomeReducer,
    BusBookingReducer,
    PickABusReducer,
    BookingSummaryReducer,
    SiteTravelItinaryReducer
})

export default ReducerRoot;