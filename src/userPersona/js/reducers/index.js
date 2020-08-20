import { combineReducers } from 'redux';

import loginUser from "./loginUser";

import pageUsedType from './pageUsedType';

import appAlert from './appAlert';


let rootReducers = combineReducers({

    loginUser,

    pageUsedType,
    
    appAlert

});


export const initialState = {};

export default rootReducers;
