import { combineReducers } from 'redux';
import DataState from './DataState';
import UIState from './UIState';

export let initialState = {};

let rootReducers = combineReducers({
    DataState,
    UIState
});
export default rootReducers;
