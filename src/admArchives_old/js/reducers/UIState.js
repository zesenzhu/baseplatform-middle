import {combineReducers} from 'redux'
import AppLoading from './ui/AppLoading';
import AppAlert from './ui/AppAlert';
import EditModalTipsVisible from './ui/EditModalTipsVisible';
import AppModal from './ui/AppModal';
const  UIState = combineReducers({
    AppLoading,
    AppAlert,
    EditModalTipsVisible,
    AppModal
});

export default UIState;


