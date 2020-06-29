import {combineReducers} from 'redux'
import AppLoading from './ui/AppLoading';
import AppAlert from './ui/AppAlert';
import AppModal from './ui/AppModal';
import AppTipsVisible from './ui/AppTipsVisible';

const  UIState = combineReducers({
    AppLoading,
    AppAlert,
    AppModal,
    AppTipsVisible
    
});

export default UIState;


