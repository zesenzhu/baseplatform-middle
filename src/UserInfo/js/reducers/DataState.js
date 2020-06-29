import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
import UserInfo from './data/UserInfo';



const DataState=combineReducers(
    {
        LoginUser,
        UserInfo

        
    });
export default DataState;