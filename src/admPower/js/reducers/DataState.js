import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
import GetUserPowerMsg from './data/GetUserPowerMsg';


const DataState=combineReducers(
    {
        LoginUser,
        GetUserPowerMsg
       
        
    });
export default DataState;