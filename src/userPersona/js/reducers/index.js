import { combineReducers } from 'redux';

import loginUser from "./loginUser";

import pageUsedType from './pageUsedType';

import appAlert from './appAlert';

import MoreData from './MoreData';

import targetUser from './targetUser';

import systemUrl from './systemUrl';

import termInfo from './termInfo';

import appLoading from './appLoading';

import userArchives from './userArchives';


let rootReducers = combineReducers({

    loginUser,

    pageUsedType,
    
    appAlert,

    MoreData,

    targetUser,

    systemUrl,

    termInfo,

    appLoading,

    userArchives

});


export const initialState = {};

export default rootReducers;
