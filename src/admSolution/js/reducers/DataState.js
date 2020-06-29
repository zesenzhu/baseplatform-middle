import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
import GetTeachingSolutionMsg from './data/GetTeachingSolutionMsg';
import GetTeachingSolutionDetailsMsg from './data/GetTeachingSolutionDetailsMsg';
import GetSolutionID from './data/GetSolutionID';


const DataState=combineReducers(
    {
        LoginUser,
        GetTeachingSolutionMsg,
        GetTeachingSolutionDetailsMsg,
        GetSolutionID
        
    });
export default DataState;