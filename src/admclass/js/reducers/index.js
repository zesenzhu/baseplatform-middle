import { combineReducers } from 'redux';

import DataState from './DataState';

import UIState from './UIState';

import RouterSet from './RouterSet';

import ModuleSetting from './ModuleSettings';

import Teacher from './Teacher';

import DetailModal from './DetailModal';

import AppAlertSuccess from './AppAlertSuccess';

export let initialState = {};

let rootReducers = combineReducers({

    DataState,

    UIState,

    RouterSet,

    ModuleSetting,

    Teacher,

    DetailModal,

    AppAlertSuccess

});

export default rootReducers;
