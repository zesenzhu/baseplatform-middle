import { combineReducers } from 'redux';
import DataState from './DataState';
import UIState from './UIState';
import AppLoading from './AppLoading';
import bannerState from './bannerState';
import breadCrumb from './breadCrumb';
import commonSetting from './commonSetting';
import leftMenu from './leftMenu';
import LoginUser from './LoginUser';
import editCourseClassModal from './editCourseClassModal';



export let initialState = {};

let rootReducers = combineReducers({
    LoginUser,
    leftMenu,
    commonSetting,
    AppLoading,
    bannerState,
    breadCrumb,
    editCourseClassModal,
    DataState,
    UIState
});
export default rootReducers;
