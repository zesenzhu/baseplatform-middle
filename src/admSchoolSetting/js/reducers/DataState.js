import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
import SchoolData from './data/SchoolData';
import CommonData from './data/CommonData';
import TermData from './data/TermData';



const DataState=combineReducers(
    {
        LoginUser,
        SchoolData,
        CommonData,TermData
        
    });
export default DataState;