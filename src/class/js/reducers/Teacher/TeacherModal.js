import TMActions from '../../actions/Teacher/TeacherModalActions';

import defaultPick from "../../../images/default-teacher.png";


const TeacherModal = (state={

    show:false,

    loadingShow:true,

    teacherList:[],

    subjects:[],

    subjectDropDisabled:false,

    subjectsSelect:{value:'all',title:"全部教师"},

    colseShow:false,

    newPickTeacher:{id:'',name:'',photo:''},

    originTeacherShow:false,

    originTeacherInfo:{id:'',name:'',photo:''},

    newTeacherTitle:"任课教师",

    originTeacherTitle:"原任课教师",

    modalTitle:"添加任课教师",
    //type 是指的是添加任课教师（1）还是更改任课教师（2）还是添加班主任（3）还是更改班主任（4）
    type:1,

    teacherLoadingShow:false,

    inputContent:'',

    emptyShow:false,

    SubjectID:""

},actions) => {

    switch (actions.type) {

        case TMActions.TEACHER_TEACHER_MODAL_SHOW:

            return {

                ...state,show:true,

                loadingShow:true,

                teacherList:[],

                subjects:[],

                subjectDropDisabled:false,

                subjectsSelect:{value:'none',title:"全部教师"},

                closeShow:false,

                originTeacherShow:(actions.options&&actions.options.originTeacherShow)?actions.options.originTeacherShow:false,

                originTeacherInfo:(actions.options&&actions.options.originTeacherInfo)?actions.options.originTeacherInfo:{},

                newTeacherTitle:(actions.options&&actions.options.newTeacherTitle)?actions.options.newTeacherTitle:'任课教师',

                originTeacherTitle:(actions.options&&actions.options.originTeacherTitle)?actions.options.originTeacherTitle:'原任课教师',

                modalTitle:(actions.options&&actions.options.modalTitle)?actions.options.modalTitle:'添加任课教师',

                newPickTeacher:(actions.options&&actions.options.newPickTeacher)?actions.options.newPickTeacher:{id:'',name:'未选择',photo:defaultPick},

                type:(actions.options&&actions.options.type)?actions.options.type:1,

                SubjectID:(actions.options&&actions.options.SubjectID)?actions.options.SubjectID:"",

                inputContent:'',

                emptyShow:false

            };

        case TMActions.TEACHER_TEACHER_MODAL_HIDE:

            return {...state,show:false};

        case TMActions.TEACHER_TEACHER_MODAL_LOADING_HIDE:

            return {...state,loadingShow:false};

        case TMActions.TEACHER_TEACHER_MODAL_UPDATA_TEACHERLIST:

            return {...state,teacherList:actions.list};

        case TMActions.TEACHER_TEACHER_MODAL_UPDATA_SUBJECTS:

            return {...state,subjects:actions.list};

        case TMActions.TEACHER_TEACHER_MODAL_CLOSE_SHOW:

            return {...state,closeShow:true};

        case TMActions.TEACHER_TEACHER_MODAL_CLOSE_HIDE:

            return {...state,closeShow:false};

        case TMActions.TEACHER_TEACHER_MODAL_UPDATE_NEW_TEACHER:

            return  {...state,newPickTeacher:actions.data.id?actions.data:{id:'',name:'未选择',photo:defaultPick}};

        case TMActions.TEACHER_TEACHER_MODAL_UPDATE_ORIGIN_TEACHER:

            return {...state,originTeacherInfo:actions.data};

        case TMActions.TEACHER_TEACHER_MODAL_ORIGIN_TEACHER_SHOW:

            return {...state,originTeacherShow:true};

        case TMActions.TEACHER_TEACHER_MODAL_ORIGIN_TEACHER_HIDE:

            return {...state,originTeacherShow:false};

        case TMActions.TEACHER_TEACHER_MODAL_NEW_TEACHER_TITLE:

            return {...state,newTeacherTitle:actions.title};

        case TMActions.TEACHER_TEACHER_MODAL_LIST_LOADING_SHOW:

            return {...state,teacherLoadingShow:true};

        case TMActions.TEACHER_TEACHER_MODAL_LIST_LOADING_HIDE:

            return {...state,teacherLoadingShow:false};

        case TMActions.TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_DISABLED:

            return {...state,subjectDropDisabled:true};

        case TMActions.TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_ABLED:

            return {...state,subjectDropDisabled:false};

        case TMActions.TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_CHANGE:

            return {...state,subjectsSelect:actions.data};

        case TMActions.TEACHER_TEACHER_MODAL_INPUT_CHANGE:

            return {...state,inputContent:actions.data};

        case TMActions.TEACHER_TEACHER_MODAL_EMPTY_SHOW:

            return {...state,emptyShow:true};

        case TMActions.TEACHER_TEACHER_MODAL_EMPTY_HIDE:

            return {...state,emptyShow:false};

        default:

            return state;

    }

};

export default TeacherModal;