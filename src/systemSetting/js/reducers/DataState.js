import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
import InitSystemData from './data/InitSystemData';
import TextBookData from './data/TextBookData';
import TextBookParams from './data/TextBookParams';



const DataState=combineReducers(
    {
        LoginUser,
        InitSystemData,
        TextBookData,
        TextBookParams
        
    });
export default DataState;