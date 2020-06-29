import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
// import AllUserPreview from './data/AllUserPreview';
// import SchoolLeaderPreview from './data/SchoolLeaderPreview'
// import SubjectTeacherPreview from './data/SubjectTeacherPreview'
import GradeStudentPreview from './data/GradeStudentPreview'
import GradeClassMsg from './data/GradeClassMsg';
import ChangeInputValue from './data/ChangeInputValue'
import SubjectTeacherMsg from './data/SubjectTeacherMsg';
import SubjectTeacherPreview from './data/SubjectTeacherPreview';
import GetUserMsg from './data/GetUserMsg';
import AdminPreview from './data/AdminPreview';
import GetPicUrl from './data/GetPicUrl';
import SchoolLeaderPreview from './data/SchoolLeaderPreview';
import ParentsPreview from './data/ParentsPreview';
const DataState=combineReducers(
    {
        LoginUser,
        // AllUserPreview,
        // SchoolLeaderPreview,
        // SubjectTeacherPreview,
        GradeStudentPreview,
        GradeClassMsg,
        ChangeInputValue,
        SubjectTeacherMsg,
        SubjectTeacherPreview,
        GetUserMsg,
        AdminPreview,
        GetPicUrl,
        SchoolLeaderPreview,
        ParentsPreview
    });
export default DataState;