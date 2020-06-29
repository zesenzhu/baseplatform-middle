import ATSMActions from '../../actions/Teacher/AddTempScheduleModalActions'

const AddTempScheduleModal = (state={

    show:false,

    loadingShow:true,

    checkedSubject:'',

    checkedClass:'',

    checkedTeacher:'',

    checkedWeek:'',

    checkedDate:'',

    checkedClassHour:'',

    checkedClassRoom:'',

    dateDisabled:true,

    classDisabled:true,

    classHourDisabled:true,

    subjectErrorShow:false,

    classErrorShow:false,

    teacherErrorShow:false,

    weekErrorShow:false,

    dateErrorShow:false,

    classHourErrorShow:false,

    classRoomErrorShow:false,

    classSearchList:[],

    teacherSearchList:[],

    classRoomSearchList:[],

    classSearchCancelShow:false,

    classSearchLoadingShow:'n',

    teacherSearchLoadingShow:true,

    teacherSearchCancelShow:'n',

    classRoomSearchLoadingShow:true,

    classRoomSearchCancelShow:'n',

    classSearchOpen:false,

    teacherSearchOpen:false,

    classRoomSearchOpen:false

}, actions) => {

    switch (actions.type) {

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_SHOW:

            return {

                ...state,

                show:true,

                loadingShow:true,

                checkedSubject:'',

                checkedClass:'',

                checkedTeacher:'',

                checkedWeek:'',

                checkedDate:'',

                checkedClassHour:'',

                checkedClassRoom:'',

                dateDisabled:true,

                classDisabled:true,

                classHourDisabled:true,

                subjectErrorShow:false,

                classErrorShow:false,

                teacherErrorShow:false,

                weekErrorShow:false,

                dateErrorShow:false,

                classHourErrorShow:false,

                classRoomErrorShow:false,

                classSearchList:[],

                teacherSearchList:[],

                classRoomSearchList:[],

                classSearchCancelShow:'n',

                classSearchLoadingShow:false,

                teacherSearchLoadingShow:true,

                teacherSearchCancelShow:'n',

                classRoomSearchLoadingShow:true,

                classRoomSearchCancelShow:'n',

                classSearchOpen:false,

                teacherSearchOpen:false,

                classRoomSearchOpen:false

            };

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_HIDE:

            return {

                ...state,

                show:false,

                subjectErrorShow:false,

                classErrorShow:false,

                teacherErrorShow:false,

                weekErrorShow:false,

                dateErrorShow:false,

                classHourErrorShow:false,

                classRoomErrorShow:false,

            };

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_INFO_UPDATE:

            return {...state,...actions.data};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_LOADING_HIDE:

            return {...state,loadingShow:false};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_LOADING_SHOW:

            return {...state,loadingShow:true};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_CHANGE:

            return {...state,checkedSubject:actions.data};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_ABLED:

            return { ...state,classDisabled:false };

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_DISABLED:

            return {...state,classDisabled:true};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_LIST_UPDATE:

            return { ...state,classList:actions.data };

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_CHANGE:

            return {...state,checkedClass:actions.data};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_TEACHER_CHANGE:

            return {...state,checkedTeacher:actions.data};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_WEEK_CHANGE:

            return {...state,checkedWeek:actions.data};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_DATE_CHANGE:

            return {...state,checkedDate:actions.data};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_CHANGE:

            return {...state,checkedClassHour:actions.data};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_CHANGE:

            return {...state,checkedClassRoom:actions.data};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_DATE_DISABLED:

            return {...state,dateDisabled:true};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_DATE_ABLED:

            return {...state,dateDisabled:false};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_ABLED:

            return {...state,classHourDisabled:false};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_DISABLED:

            return {...state,classHourDisabled:true};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_ERROR_SHOW:

            return {...state,subjectErrorShow:true};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_ERROR_HIDE:

            return {...state,subjectErrorShow:false};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_ERROR_SHOW:

            return {...state,classErrorShow:true};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_ERROR_HIDE:

            return {...state,classErrorShow:false};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_TEACHER_ERROR_SHOW:

            return {...state,teacherErrorShow:true};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_TEACHER_ERROR_HIDE:

            return {...state,teacherErrorShow:false};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_WEEK_ERROR_SHOW:

            return {...state,weekErrorShow:true};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_WEEK_ERROR_HIDE:

            return {...state,weekErrorShow:false};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_DATE_ERROR_SHOW:

            return {...state,dateErrorShow:true};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_DATE_ERROR_HIDE:

            return {...state,dateErrorShow:false};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_SHOW:

            return {...state,classHourErrorShow:true};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_HIDE:

            return {...state,classHourErrorShow:false};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_SHOW:

            return {...state,classRoomErrorShow:true};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_HIDE:

            return {...state,classRoomErrorShow:false};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_LIST_UPDATE:

            return {...state,classSearchList:actions.data};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_HIDE:

            return {...state,classSearchLoadingShow:false};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_SHOW:

            return {...state,classSearchLoadingShow:true};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LIST_UPDATE:

            return {...state,teacherSearchList:actions.data};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LOADING_HIDE:

            return {...state,teacherSearchLoadingShow:false};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LOADING_SHOW:

            return {...state,teacherSearchLoadingShow:true};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LIST_UPDATE:

            return {...state,classRoomSearchList:actions.data};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LOADING_HIDE:

            return {...state,classRoomSearchLoadingShow:false};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LOADING_SHOW:

            return {...state,classRoomSearchLoadingShow:true};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_OPEN:

            return {...state,classSearchOpen:true};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_CLOSE:

            return {...state,classSearchOpen:false};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_OPEN:

            return {...state,classRoomSearchOpen:true};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CLOSE:

            return {...state,classRoomSearchOpen:false};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_OPEN:

            return {...state,teacherSearchOpen:true};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CLOSE:

            return {...state,teacherSearchOpen:false};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_CANCEL_SHOW:

            return {...state,classSearchCancelShow:'y'};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_CANCEL_HIDE:

            return {...state,classSearchCancelShow:'n'};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CANCEL_SHOW:

            return {...state,teacherSearchCancelShow:'y'};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CANCEL_HIDE:

            return {...state,teacherSearchCancelShow:'n'};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CANCEL_SHOW:

            return {...state,classRoomSearchCancelShow:'y'};

        case ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CANCEL_HIDE:

            return {...state,classRoomSearchCancelShow:'n'};



        default:

            return state;

    }

};

export default AddTempScheduleModal