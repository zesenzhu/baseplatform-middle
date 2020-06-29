import {combineReducers} from 'redux'
import AppLoading from './ui/AppLoading';
import AppAlert from './ui/AppAlert';
import TeachingSolutionDetailsModal from './ui/TeachingSolutionDetailsModal';

const  UIState = combineReducers({
    AppLoading,
    AppAlert,
    TeachingSolutionDetailsModal
    
});

export default UIState;


