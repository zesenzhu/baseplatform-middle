import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
import SubjectMsg from './data/SubjectMsg';
import PeriodMsg from './data/PeriodMsg';
import TeacherMsg from './data/TeacherMsg';
import ChangeSubjectMsg from './data/ChangeSubjectMsg';
import SetSubjectTeacherMsg from './data/SetSubjectTeacherMsg';

const DataState=combineReducers(
    {
        LoginUser,
        SubjectMsg,
        PeriodMsg,
        TeacherMsg,
        ChangeSubjectMsg,
        SetSubjectTeacherMsg
    });
export default DataState;