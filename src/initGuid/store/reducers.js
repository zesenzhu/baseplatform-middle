import {combineReducers} from 'redux';

import LoginUser from './LoginUser';

import AppAlert from './AppAlert';

import AppLoading from './AppLoading';

const reducers = combineReducers({

    LoginUser,

    AppAlert,

    AppLoading

});

export default reducers;

