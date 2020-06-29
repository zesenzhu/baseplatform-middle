import CSActions from '../../actions/Teacher/ClassStudentActions';


const ClassStudent = (state={

    ClassID:'',

    ClassName:'',

    Schedule:[],

    ScheduleCount:0,

    WeekNO:0,

    WeekList:[],

    StudentList:[],

    PickStudentName:'',

    PickStudentID:'',

    ScheduleLoadingShow:true,

    searchWrapperShow:false,

    searchResult:[],

    searchTitle:'',

    searchLoadingShow:false,

    CancelBtnShow:'n',

    SearchValue:'',

    ItemClassHourCount:[],

    ItemClassHour:[],

    EmptyClassShow:false,

    ActiveClasses:[],

    ScheduleDetail:{

        Show:false,

        ModalLoading:true

    },

    ChangeTime:{

        Show:false,

        ModalLoading:true,

        SelectWeekDay:'',

        SelectClassHourNO:0,

        SelectDate:''

    },

    AdjustClassRoom:{

        Show:false,

        ModalLoading:true,

        ClassRoomList:[],

        ClassRoomTabActive:0,

        CheckedValue:'',

        SearchValue:'',

        CancelBtnShow:'n',

        SearchWrapperShow:false,

        SearchList:[],

        SearchLoading:false

    },

    ReplaceSchedule:{

        Show:false,

        ModalLoading:true,

        SearchLoading:false,

        TeacherList:[],

        SearchList:[],

        CancelBtnShow:'n',

        SearchValue:'',

        SearchLoadingShow:false,

        ActiveTeacherID:'',

    }

},actions) => {

    switch (actions.type) {

        case CSActions.TEACHER_CLASS_TOTAL_STUDENT_INIT:

            return {

                ...state,

                ClassID:'',

                ClassName:'',

                Schedule:[],

                ScheduleCount:0,

                WeekNO:0,

                WeekList:[],

                StudentList:[],

                PickStudentName:'',

                PickStudentID:'',

                ScheduleLoadingShow:true,

                searchWrapperShow:false,

                searchResult:[],

                searchTitle:'',

                searchLoadingShow:false,

                CancelBtnShow:'n',

                SearchValue:'',

                ItemClassHourCount:[],

                ItemClassHour:[],

                EmptyClassShow:false,

                ActiveClasses:[],

                ScheduleDetail:{

                    Show:false,

                    ModalLoading:true

                },

                ChangeTime:{

                    Show:false,

                    ModalLoading:true,

                    SelectWeekDay:'',

                    SelectClassHourNO:0,

                    SelectDate:''

                },

                AdjustClassRoom:{

                    Show:false,

                    ModalLoading:true,

                    ClassRoomList:[],

                    ClassRoomTabActive:0,

                    CheckedValue:'',

                    SearchValue:'',

                    CancelBtnShow:'n',

                    SearchWrapperShow:false,

                    SearchList:[],

                    SearchLoading:false

                },

                ReplaceSchedule:{

                    Show:false,

                    ModalLoading:true,

                    SearchLoading:false,

                    TeacherList:[],

                    SearchList:[],

                    CancelBtnShow:'n',

                    SearchValue:'',

                    SearchLoadingShow:false,

                    ActiveTeacherID:'',

                }

            };

        case CSActions.TEACHER_CS_CLASS_INFO_UPDATE:

            return { ...state,...actions.data };

        case CSActions.TEACHER_CLASS_TOTAL_STUDENT_CLASSHOUR_UPDATE:

            return { ...state,...actions.data };

        case CSActions.TEACHER_CS_WEEK_LIST_UPDATE:

            return { ...state,WeekList:actions.data };

        case CSActions.TEACHER_CS_WEEK_CHANGE:

            return { ...state,WeekNO:actions.data };

        case CSActions.TEACHER_CS_STUDENT_LEFT_LIST_UPDATE:

            return { ...state,StudentList:actions.data };

        case CSActions.TEACHER_CS_SEARCH_STUDENT_RESULT_UPDATE:

            return { ...state,searchResult:actions.data };

        case CSActions.TEACHER_CS_SEARCH_STU_RESULT_SHOW:

            return { ...state,searchWrapperShow:true };

        case CSActions.TEACHER_CS_SEARCH_STU_RESULT_HIDE:

            return { ...state,searchWrapperShow:false };

        case CSActions.TEACHER_CS_SEARCH_TITLE_SHOW:

            return { ...state,searchTitle:actions.data };

        case CSActions.TEACHER_CS_SEARCH_TITLE_HIDE:

            return { ...state,searchTitle:false };

        case CSActions.TEACHER_CS_LOADING_SHOW:

            return { ...state,ScheduleLoadingShow:true };

        case CSActions.TEACHER_CS_LOADING_HIDE:

            return { ...state,ScheduleLoadingShow:false };


        case CSActions.TEACHER_CS_SCHEDULE_CHANGE:

            return {

                ...state,

                ...actions.data

            };

        case CSActions.TEACHER_CS_LEFT_MENU_SEARCH_INPUT_CHANGE:

            return { ...state,SearchValue:actions.data };

        case CSActions.TEACHER_CS_SEARCH_LOADING_SHOW:

            return { ...state,searchLoadingShow:true };

        case CSActions.TEACHER_CS_SEARCH_LOADING_HIDE:

            return { ...state,searchLoadingShow:false };

        case  CSActions.TEACHER_CS_LEFT_MENU_CANCEL_BTN_SHOW:

            return {...state,CancelBtnShow:'y'};

        case  CSActions.TEACHER_CS_LEFT_MENU_CANCEL_BTN_HIDE:

            return { ...state,CancelBtnShow:'n' };

        case CSActions.TEACHER_CS_SCHEDULE_DETAIL_MODAL_SHOW:

            return {...state,ScheduleDetail:{...state.ScheduleDetail,Show:true,ModalLoading:true}};

        case CSActions.TEACHER_CS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE:

            return {...state,ScheduleDetail:{...state.ScheduleDetail,ModalLoading:false}};

        case CSActions.TEACHER_CS_SCHEDULE_DETAIL_MODAL_LOADING_SHOW:

            return {...state,ScheduleDetail:{...state.ScheduleDetail,ModalLoading:true}};

        case CSActions.TEACHER_CS_SCHEDULE_DETAIL_MODAL_INIT:

            return {

                ...state,

                ScheduleDetail:{

                    ...state.ScheduleDetail,

                    ...actions.data

                }
            };

        case CSActions.TEACHER_CS_SCHEDULE_DETAIL_MODAL_HIDE:

            return { ...state,ScheduleDetail:{...state.ScheduleDetail,Show:false}};

        case CSActions.TEACHER_CS_CHANGE_TIME_MODAL_SHOW:

            return {...state,ChangeTime:{...state.ChangeTime,Show:true,ModalLoading:true}};

        case CSActions.TEACHER_CS_CHANGE_TIME_MODAL_HIDE:

            return {...state,ChangeTime:{...state.ChangeTime,Show:false}};

        case CSActions.TEACHER_CS_CHANGE_TIME_MODAL_LOADING_SHOW:

            return {...state,ChangeTime:{...state.ChangeTime,ModalLoading:true}};

        case CSActions.TEACHER_CS_CHANGE_TIME_MODAL_LOADING_HIDE:

            return {...state,ChangeTime:{...state.ChangeTime,ModalLoading:false}};

        case CSActions.TEACHER_CS_CHANGE_TIME_MODAL_INIT:

            return {...state,ChangeTime:{...state.ChangeTime,SelectWeekDay:'',SelectClassHourNO:0,...actions.data}};

        case CSActions.TEACHER_CS_CHANGE_TIME_MODAL_CLASSHOUR_PICK:

            return { ...state,ChangeTime:{...state.ChangeTime,...actions.data}};

        case CSActions.TEACHER_CS_ADJUST_CLASSROOM_MODAL_SHOW:

            return {

                ...state,

                AdjustClassRoom:{

                    ...state.AdjustClassRoom,

                    Show:true,

                    ModalLoading:true,

                    ClassRoomList:[],

                    ClassRoomTabActive:0,

                    CheckedValue:'',

                    SearchValue:'',

                    CancelBtnShow:'n',

                    SearchWrapperShow:false,

                    SearchList:[],

                    SearchLoading:false

                }

            };

        case CSActions.TEACHER_CS_ADJUST_CLASSROOM_MODAL_HIDE:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,Show:false}};

        case CSActions.TEACHER_CS_ADJUST_CLASSROOM_MODAL_LOADING_SHOW:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,ModalLoading:true}};

        case CSActions.TEACHER_CS_ADJUST_CLASSROOM_MODAL_LOADING_HIDE:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,ModalLoading:false}};

        case CSActions.TEACHER_CS_ADJUST_CLASSROOM_MODAL_INIT:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,...actions.data}};


        case CSActions.TEACHER_CS_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CheckedValue:actions.data}};

        case CSActions.TEACHER_CS_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CheckedValue:'',ClassRoomTabActive:actions.data}};

        case CSActions.TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchValue:actions.data}};

        case CSActions.TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchWrapperShow:true}};

        case CSActions.TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchWrapperShow:false}};

        case CSActions.TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CancelBtnShow:'y'}};

        case CSActions.TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CancelBtnShow:'n'}};

        case CSActions.TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchList:actions.data}};

        case CSActions.TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchLoading:true}};

        case CSActions.TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchLoading:false}};

        case CSActions.TEACHER_CS_REPLACE_SCHEDULE_MODAL_SHOW:

            return {

                ...state,

                ReplaceSchedule:{

                    ...state.ReplaceSchedule,

                    Show:true,

                    ModalLoading:true,

                    SearchWrapperShow:false,

                    SearchList:[],

                    ActiveTeacherID:'',

                    CancelBtnShow:'n',

                    SearchValue:'',

                    SearchLoadingShow:false

                }

            };

        case CSActions.TEACHER_CS_REPLACE_SCHEDULE_MODAL_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,Show:false}};

        case CSActions.TEACHER_CS_REPLACE_SCHEDULE_MODAL_LOADING_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,ModalLoading:true}};

        case CSActions.TEACHER_CS_REPLACE_SCHEDULE_MODAL_LOADING_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,ModalLoading:false}};

        case CSActions.TEACHER_CS_REPLACE_SCHEDULE_MODAL_INIT:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,...actions.data}};

        case CSActions.TEACHER_CS_REPLACE_SCHEDULE_MODAL_TEACHER_PICK:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,ActiveTeacherID:actions.data}};

        case CSActions.TEACHER_CS_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchValue:actions.data}};

        case CSActions.TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,CancelBtnShow:'y'}};

        case CSActions.TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,CancelBtnShow:'n'}};

        case CSActions.TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchWrapperShow:true}};

        case CSActions.TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchWrapperShow:false}};

        case CSActions.TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchList:actions.data}};

        case CSActions.TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchLoadingShow:true}};

        case CSActions.TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchLoadingShow:false}};

        case CSActions.TEACHER_CS_CLASSES_EMPTY_SHOW:

            return { ...state,EmptyClassShow:true };

        case CSActions.TEACHER_CS_CLASSES_EMPTY_HIDE:

            return { ...state,EmptyClassShow:false };

        case CSActions.TEACHER_CS_ACTIVE_CLASSES_CHANGE:

            return { ...state,ActiveClasses:actions.data };

        default:

            return state;

    }

};

export default ClassStudent