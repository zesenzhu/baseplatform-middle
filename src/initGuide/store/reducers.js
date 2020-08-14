import {combineReducers} from 'redux';

import LoginUser from './LoginUser';

import appAlert from './appAlert';

import appLoading from './appLoading';

import guideStep from './guideStep';

import schoolType from './schoolType';

const reducers = combineReducers({

    LoginUser,

    appAlert,

    appLoading,

    guideStep,

    schoolType

});

export default reducers;

