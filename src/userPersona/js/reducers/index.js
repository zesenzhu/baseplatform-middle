import { combineReducers } from 'redux';

import loginUser from "./loginUser";

import pageUsedType from './pageUsedType';

import appAlert from './appAlert';

import MoreData from './MoreData';

import targetUser from './targetUser';


let rootReducers = combineReducers({

    loginUser,

    pageUsedType,
    
    appAlert,

    MoreData,

    targetUser

});


export const initialState = {};

export default rootReducers;
