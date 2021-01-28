import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
import InitSystemData from './data/InitSystemData';
import TextBookData from './data/TextBookData';
import TextBookParams from './data/TextBookParams';
import OtherData from './data/OtherData';



const DataState=combineReducers(
    {
        LoginUser,
        InitSystemData,
        TextBookData,
        TextBookParams,OtherData
        
    });
export default DataState;