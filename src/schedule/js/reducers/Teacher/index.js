import { combineReducers } from 'redux';
//教师reducer
import SubjectTeacherSubjectSchedule from './SubjectTeacherSubjectSchedule';

import SubjectCourseGradeClassRoom from './SubjectCourseGradeClassRoom';

import SubjectTeacherTeacherSchedule from './SubjectTeacherTeacherSchedule';

import PersonalSchedule from "./PersonalSchedule";

import AdjustByTeacherModal from './AdjustByTeacherModal';

import ClassTotal from './ClassTotal';

import ClassStudent from './ClassStudent';

import AddTempScheduleModal from './AddTempScheduleModal';

import Power from './Power';

import GangerClass from './GangerClass';

const Teacher = combineReducers({

    SubjectTeacherSubjectSchedule,

    SubjectCourseGradeClassRoom,

    SubjectTeacherTeacherSchedule,

    PersonalSchedule,

    AdjustByTeacherModal,

    ClassTotal,

    ClassStudent,

    AddTempScheduleModal,

    Power,

    GangerClass

});

export default Teacher;