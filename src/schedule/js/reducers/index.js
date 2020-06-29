import { combineReducers } from 'redux';

import LoginUser from "./LoginUser";

import AppLoading from "./AppLoading";

import ModuleSetting from "./ModuleSetting";

import Manager from './Manager/index';

import Teacher from './Teacher/index';

import Student from './Student/index';

import PeriodWeekTerm from "./PeriodWeekTerm";

import AppAlert from './AppAlert';

import RouterSet from './RouterSet';

import ScheduleDetail from './ScheduleDetail';

import NotBusyRoomModal from './NotBusyRoomModal';

export let initialState = {};

let rootReducers = combineReducers({

    LoginUser,

    AppLoading,

    ModuleSetting,

    Manager,

    Teacher,

    Student,

    PeriodWeekTerm,

    AppAlert,

    RouterSet,

    ScheduleDetail,

    NotBusyRoomModal

});

export default rootReducers;
