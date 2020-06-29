import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
import RegisterMsg from './data/RegisterMsg';
import getReisterData from './data/getReisterData';




const DataState=combineReducers(
    {
        LoginUser,
        RegisterMsg,
        getReisterData
        
    });
export default DataState;