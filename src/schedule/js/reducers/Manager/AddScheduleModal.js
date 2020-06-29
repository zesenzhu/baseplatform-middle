import ASMActions from '../../actions/Manager/AddScheduleModalActions'

const AddScheduleModal = (state={

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

    teacherDisabled:true,

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

        case ASMActions.ADD_SCHEDULE_MODAL_SHOW:

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

                teacherDisabled:true,

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

        case ASMActions.ADD_SCHEDULE_MODAL_HIDE:

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

        case ASMActions.ADD_SHEDULE_MODAL_INFO_UPDATE:

            return {...state,...actions.data};

        case ASMActions.ADD_SHEDULE_MODAL_LOADING_HIDE:

            return {...state,loadingShow:false};

        case ASMActions.ADD_SHEDULE_MODAL_LOADING_SHOW:

            return {...state,loadingShow:true};

        case ASMActions.ADD_SHEDULE_MODAL_SUBJECT_CHANGE:

            return {...state,checkedSubject:actions.data};

        case ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_DROP_ABLED:

            return { ...state,classDisabled:false,teacherDisabled:false};

        case ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_DROP_CHANGE:

            return { ...state,checkedClass:'',checkedTeacher:''};

        case ASMActions.MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_DISABLED:

            return { ...state,teacherDisabled:true };

        case ASMActions.MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_ABLED:

            return { ...state,teacherDisabled:false };

        case ASMActions.MANAGER_ADD_SCHEDULE_MODAL_ClASS_DROP_ABLED:

            return { ...state,classDisabled:false };

        case ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_DROP_DISABLED:

            return { ...state,classDisabled:true };

        case ASMActions.MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_CHANGE:

            return { ...state,checkedTeacher:actions.data };

        case ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_LIST_UPDATE:

            return { ...state,...actions.data };

        case ASMActions.ADD_SHEDULE_MODAL_CLASS_CHANGE:

            return {...state,checkedClass:actions.data};

        case ASMActions.ADD_SHEDULE_MODAL_TEACHER_CHANGE:

            return {...state,checkedTeacher:actions.data};

        case ASMActions.ADD_SHEDULE_MODAL_WEEK_CHANGE:

            return {...state,checkedWeek:actions.data};

        case ASMActions.ADD_SHEDULE_MODAL_DATE_CHANGE:

            return {...state,checkedDate:actions.data};

        case ASMActions.ADD_SHEDULE_MODAL_CLASSHOUR_CHANGE:

            return {...state,checkedClassHour:actions.data};

        case ASMActions.ADD_SHEDULE_MODAL_CLASSROOM_CHANGE:

            return {...state,checkedClassRoom:actions.data};

        case ASMActions.ADD_SHEDULE_MODAL_DATE_DISABLED:

            return {...state,dateDisabled:true};

        case ASMActions.ADD_SHEDULE_MODAL_DATE_ABLED:

            return {...state,dateDisabled:false};

        case ASMActions.ADD_SHEDULE_MODAL_CLASSHOUR_ABLED:

            return {...state,classHourDisabled:false};

        case ASMActions.ADD_SHEDULE_MODAL_CLASSHOUR_DISABLED:

            return {...state,classHourDisabled:true};

        case ASMActions.ADD_SCHEDULE_MODAL_SUBJECT_ERROR_SHOW:

            return {...state,subjectErrorShow:true};

        case ASMActions.ADD_SCHEDULE_MODAL_SUBJECT_ERROR_HIDE:

            return {...state,subjectErrorShow:false};

        case ASMActions.ADD_SCHEDULE_MODAL_CLASS_ERROR_SHOW:

            return {...state,classErrorShow:true};

        case ASMActions.ADD_SCHEDULE_MODAL_CLASS_ERROR_HIDE:

            return {...state,classErrorShow:false};

        case ASMActions.ADD_SCHEDULE_MODAL_TEACHER_ERROR_SHOW:

            return {...state,teacherErrorShow:true};

        case ASMActions.ADD_SCHEDULE_MODAL_TEACHER_ERROR_HIDE:

            return {...state,teacherErrorShow:false};

        case ASMActions.ADD_SCHEDULE_MODAL_WEEK_ERROR_SHOW:

            return {...state,weekErrorShow:true};

        case ASMActions.ADD_SCHEDULE_MODAL_WEEK_ERROR_HIDE:

            return {...state,weekErrorShow:false};

        case ASMActions.ADD_SCHEDULE_MODAL_DATE_ERROR_SHOW:

            return {...state,dateErrorShow:true};

        case ASMActions.ADD_SCHEDULE_MODAL_DATE_ERROR_HIDE:

            return {...state,dateErrorShow:false};

        case ASMActions.ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_SHOW:

            return {...state,classHourErrorShow:true};

        case ASMActions.ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_HIDE:

            return {...state,classHourErrorShow:false};

        case ASMActions.ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_SHOW:

            return {...state,classRoomErrorShow:true};

        case ASMActions.ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_HIDE:

            return {...state,classRoomErrorShow:false};

        case ASMActions.ADD_SCHEDULE_MODAL_CLASS_SEARCH_LIST_UPDATE:

            return {...state,classSearchList:actions.data};

        case ASMActions.ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_HIDE:

            return {...state,classSearchLoadingShow:false};

        case ASMActions.ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_SHOW:

            return {...state,classSearchLoadingShow:true};

        case ASMActions.ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LIST_UPDATE:

            return {...state,teacherSearchList:actions.data};

        case ASMActions.ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LOADING_HIDE:

            return {...state,teacherSearchLoadingShow:false};

        case ASMActions.ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LOADING_SHOW:

            return {...state,teacherSearchLoadingShow:true};

        case ASMActions.ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LIST_UPDATE:

            return {...state,classRoomSearchList:actions.data};

        case ASMActions.ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LOADING_HIDE:

            return {...state,classRoomSearchLoadingShow:false};

        case ASMActions.ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LOADING_SHOW:

            return {...state,classRoomSearchLoadingShow:true};

        case ASMActions.ADD_SCHEDULE_MODAL_CLASS_SEARCH_OPEN:

            return {...state,classSearchOpen:true};

        case ASMActions.ADD_SCHEDULE_MODAL_CLASS_SEARCH_CLOSE:

            return {...state,classSearchOpen:false};

        case ASMActions.ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_OPEN:

            return {...state,classRoomSearchOpen:true};

        case ASMActions.ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CLOSE:

            return {...state,classRoomSearchOpen:false};

        case ASMActions.ADD_SCHEDULE_MODAL_TEACHER_SEARCH_OPEN:

            return {...state,teacherSearchOpen:true};

        case ASMActions.ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CLOSE:

            return {...state,teacherSearchOpen:false};

        case ASMActions.ADD_SCHEDULE_MODAL_CLASS_SEARCH_CANCEL_SHOW:

            return {...state,classSearchCancelShow:'y'};

        case ASMActions.ADD_SCHEDULE_MODAL_CLASS_SEARCH_CANCEL_HIDE:

            return {...state,classSearchCancelShow:'n'};

        case ASMActions.ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CANCEL_SHOW:

            return {...state,teacherSearchCancelShow:'y'};

        case ASMActions.ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CANCEL_HIDE:

            return {...state,teacherSearchCancelShow:'n'};

        case ASMActions.ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CANCEL_SHOW:

            return {...state,classRoomSearchCancelShow:'y'};

        case ASMActions.ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CANCEL_HIDE:

            return {...state,classRoomSearchCancelShow:'n'};



        default:

            return state;

    }

};

export default AddScheduleModal