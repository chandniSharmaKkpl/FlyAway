import {combineReducers} from 'redux';
import HomeReducer from '../../Screen/home/Home.reducer';
import LoginReducer from '../../Screen/login/Login.reducer';

const ReducerRoot = combineReducers({
    LoginReducer,
    HomeReducer
    
})

export default ReducerRoot;