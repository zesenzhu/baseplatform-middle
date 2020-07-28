import { combineReducers } from 'redux';
import DataState from './DataState';
import UIState from './UIState';
import PublicState from './PublicState';

export let initialState = {};

let rootReducers = combineReducers({
    DataState,
    UIState,
    PublicState
});
export default rootReducers;
