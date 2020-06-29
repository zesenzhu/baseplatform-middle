import { combineReducers } from 'redux';


import DataUpdate from './DataUpdate'
import AppAlert from './AppAlert'
import DataState from './DataState'
let rootReducers = combineReducers({

    DataState,
    DataUpdate,
    AppAlert
})
export let initialState = {

};

export default rootReducers;