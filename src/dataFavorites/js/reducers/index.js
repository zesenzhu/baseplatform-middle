import { combineReducers } from 'redux';
import CollectorDataChange from './CollectorDataChange'
import AppAlert from './AppAlert'
import UILoading from './UILoading'



let rootReducers = combineReducers({
    CollectorDataChange,
    AppAlert,
    UILoading

})
export let initialState = {

};

export default rootReducers;