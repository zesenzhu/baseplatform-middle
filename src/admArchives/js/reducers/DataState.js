import {combineReducers} from 'redux';
import MainData from './data/MainData';
import CommonData from './data/CommonData';



const DataState=combineReducers(
    {
        MainData,
        CommonData
        
    });
export default DataState;