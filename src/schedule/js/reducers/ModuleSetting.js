import ModuleSettingActions from  '../actions/ModuleSettingActions';

import logoManager from  '../../images/logo-manager.png';

import logoStudent from  '../../images/logo-student.png'

import logoTeacher from  '../../images/logo-teacher.png'
//模块设置reducer
const ModuleSetting = (state={

    moduleCnName:"课程安排管理",

    moduleEnName:'Course Arrangement Management',

    logo:logoManager,

    timeBar:true

},actions) =>{

    switch (actions.type) {

        case ModuleSettingActions.UPDATE_MANAGER_MODULE_SETTING:

            return {

                ...state,

                moduleCnName:"课程安排管理",

                moduleEnName:'Course Arrangement Management',

                logo:logoManager,

                timeBar:true
            };

        case ModuleSettingActions.UPDATE_STUDENT_MODULE_SETTING:

            return  {

                ...state,

                moduleCnName:"课程表查询",

                moduleEnName:'Curriculum Enquiries',

                logo:logoStudent,

                timeBar:false

            };

        case ModuleSettingActions.UPDATE_TEACHER_MODULE_SETTING:

            return {

                ...state,

                moduleCnName:"课程表管理",

                moduleEnName:'Curriculum management',

                logo:logoTeacher,

                timeBar:true

            };

        case ModuleSettingActions.TIME_BARNER_HIDE:

            return {...state,timeBar:false};

        case ModuleSettingActions.TIME_BARNER_SHOW:

            return {...state,timeBar:true};

        case ModuleSettingActions.MODULE_SETTINGS_UPDATE:

            return {

                ...state,

                ...actions.data

            };

        default:

            return state;

    }

};

export default ModuleSetting;