import {combineReducers} from 'redux'
import AppLoading from './ui/AppLoading';
import AppAlert from './ui/AppAlert';
import TipsVisible from './ui/TipsVisible';
const  UIState = combineReducers({
    AppLoading,
    AppAlert,
    TipsVisible
});

export default UIState;


