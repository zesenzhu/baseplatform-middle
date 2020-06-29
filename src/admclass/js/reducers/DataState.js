import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
import AllGradePreview from './data/AllGradePreview';
import SchoolGradeClasses from './data/SchoolGradeClasses';
import TheGradePreview from "./data/TheGradePreview";
import TheStudentList from "./data/TheStudentList";
import TheTeachersList from './data/TheTeachersList';
import StudentsCheckList from './data/StudentsCheckList';
import StudentsCheckAll from './data/StudentsCheckAll';
import StudentsPlainOptions from "./data/StudentsPlainOptions";

import ClassPagination from './data/ClassPagination';

import GradePagination from './data/GradePagination';

import StudentPagination from './data/StudentPagination';

const DataState=combineReducers(
    {
        LoginUser,

        AllGradePreview,

        SchoolGradeClasses,

        TheGradePreview,

        TheStudentList,

        TheTeachersList,

        StudentsCheckList,

        StudentsCheckAll,

        StudentsPlainOptions,

        ClassPagination,

        GradePagination,

        StudentPagination

    });

export default DataState;