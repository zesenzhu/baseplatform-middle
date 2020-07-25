import { combineReducers } from 'redux';

import ClassCharge from './ClassCharge';

import TeacherModal from './TeacherModal';

import StudentInfoModal from './StudentInfoModal';

let Index = combineReducers({

    ClassCharge,

    TeacherModal,

    StudentInfoModal

});

export default Index;
