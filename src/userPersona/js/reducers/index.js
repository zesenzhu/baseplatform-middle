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

import userInfoLogs from './userInfoLogs';

import userStatus from './userStatus';

import identifyInfo from './identifyInfo';


let rootReducers = combineReducers({

    loginUser,

    pageUsedType,
    
    appAlert,

    MoreData,

    targetUser,

    systemUrl,

    termInfo,

    appLoading,

    userArchives,

    userInfoLogs,

    userStatus,

    identifyInfo

});


export const initialState = {};

export default rootReducers;
