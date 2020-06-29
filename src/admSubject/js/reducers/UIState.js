import {combineReducers} from 'redux'
import AppLoading from './ui/AppLoading';
import AppAlert from './ui/AppAlert';
import SubjectDetailsMsgModalShow from './ui/SubjectDetailsMsgModalShow';
import SubjectTableLoading from './ui/SubjectTableLoading';
import ChangeSubjectModal from './ui/ChangeSubjectModal';
import SetSubjectTeacher from './ui/SetSubjectTeacher';
import AppTips from './ui/AppTips';
const  UIState = combineReducers({
    AppLoading,
    AppAlert,
    SubjectTableLoading,
    SubjectDetailsMsgModalShow,
    ChangeSubjectModal,
    SetSubjectTeacher,
    AppTips
});

export default UIState;


