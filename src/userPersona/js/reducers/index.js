import { combineReducers } from 'redux';

import loginUser from "./loginUser";

import pageUsedType from './pageUsedType';

import appAlert from './appAlert';

import MoreData from './MoreData';


let rootReducers = combineReducers({

    loginUser,

    pageUsedType,
    
    appAlert,

    MoreData

});


export const initialState = {};

export default rootReducers;
