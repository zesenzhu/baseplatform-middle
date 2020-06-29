import STTActions from '../../actions/Teacher/SubjectTeacherTeacherActions';

const SubjectTeacherTeacherSchedule = (state={

    schedule:[],

    ScheduleCount:0,

    NowWeekNo:0,

    loadingShow:true,

    teacherList:[],

    pickTeacher:'',

    pickTeacherID:'',

    ScheduleLoadingShow:true,

    searchWrapperShow:false,

    searchResult:[],

    searchLoadingShow:false,

    searchTitle:'',

    searchTitleShow:false,

    CancelBtnShow:'n',

    SearchValue:'',

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

        case STTActions.STT_SCHEDULE_INIT:

            return {

                ...state,

                schedule:[],

                ScheduleCount:0,

                loadingShow:true,

                teacherList:actions.data,

                pickTeacher:'',

                pickTeacherID:'',

                ScheduleLoadingShow:true,

                searchWrapperShow:false,

                searchResult:[],

                searchLoadingShow:false,

                searchTitle:'',

                searchTitleShow:false,

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

        case STTActions.STT_SCHEDULE_CHANGE:

            return {...state,...actions.data};

        case STTActions.STT_NOW_WEEK_CHANGE:

            return {...state,NowWeekNo:actions.data};

        case STTActions.TEACHER_LIST_UPDATE:

            return {...state,teacherList:actions.data};

        case STTActions.SEARCH_TEACHER_RESULT_UPDATE:

            return {...state,searchResult:actions.data};

        case STTActions.SEARCH_TEACHER_RESULT_SHOW:

            return {...state,searchWrapperShow:true};

        case STTActions.SEARCH_TEACHER_RESULT_HIDE:

            return {...state,searchWrapperShow:false};

        case STTActions.SEARCH_LOADING_SHOW:

            return {...state,searchLoadingShow:true};

        case STTActions.SEARCH_LOADING_HIDE:

            return {...state,searchLoadingShow:false};

        case STTActions.SCHEDULE_LOADING_HIDE:

            return {...state,ScheduleLoadingShow:false};

        case STTActions.SCHEDULE_LOADING_SHOW:

            return {...state,ScheduleLoadingShow:true};

        case STTActions.SEARCH_TITLE_SHOW:

            return {...state,searchTitleShow:true,searchTitle:actions.data};

        case STTActions.SEARCH_TITLE_HIDE:

            return {...state,searchTitleShow:false};

        case STTActions.TEACHER_STT_LEFT_MENU_SEARCH_INPUT_CHANGE:

            return { ...state,SearchValue:actions.data };

        case  STTActions.TEACHER_STT_LEFT_MENU_CANCEL_BTN_SHOW:

            return {...state,CancelBtnShow:'y'};

        case  STTActions.TEACHER_STT_LEFT_MENU_CANCEL_BTN_HIDE:

            return { ...state,CancelBtnShow:'n' };

        case STTActions.TEACHER_STT_SCHEDULE_DETAIL_MODAL_SHOW:

            return {...state,ScheduleDetail:{...state.ScheduleDetail,Show:true,ModalLoading:true}};

        case STTActions.TEACHER_STT_SCHEDULE_DETAIL_MODAL_LOADING_HIDE:

            return {...state,ScheduleDetail:{...state.ScheduleDetail,ModalLoading:false}};

        case STTActions.TEACHER_STT_SCHEDULE_DETAIL_MODAL_LOADING_SHOW:

            return {...state,ScheduleDetail:{...state.ScheduleDetail,ModalLoading:true}};

        case STTActions.TEACHER_STT_SCHEDULE_DETAIL_MODAL_INIT:

            return {

                ...state,

                ScheduleDetail:{

                    ...state.ScheduleDetail,

                    ...actions.data

                }
            };

        case STTActions.TEACHER_STT_SCHEDULE_DETAIL_MODAL_HIDE:

            return { ...state,ScheduleDetail:{...state.ScheduleDetail,Show:false}};

        case STTActions.TEACHER_STT_CHANGE_TIME_MODAL_SHOW:

            return {...state,ChangeTime:{...state.ChangeTime,Show:true,ModalLoading:true}};

        case STTActions.TEACHER_STT_CHANGE_TIME_MODAL_HIDE:

            return {...state,ChangeTime:{...state.ChangeTime,Show:false}};

        case STTActions.TEACHER_STT_CHANGE_TIME_MODAL_LOADING_SHOW:

            return {...state,ChangeTime:{...state.ChangeTime,ModalLoading:true}};

        case STTActions.TEACHER_STT_CHANGE_TIME_MODAL_LOADING_HIDE:

            return {...state,ChangeTime:{...state.ChangeTime,ModalLoading:false}};

        case STTActions.TEACHER_STT_CHANGE_TIME_MODAL_INIT:

            return {...state,ChangeTime:{...state.ChangeTime,SelectWeekDay:'',SelectClassHourNO:0,...actions.data}};

        case STTActions.TEACHER_STT_CHANGE_TIME_MODAL_CLASSHOUR_PICK:

            return { ...state,ChangeTime:{...state.ChangeTime,...actions.data}};

        case STTActions.TEACHER_STT_ADJUST_CLASSROOM_MODAL_SHOW:

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

        case STTActions.TEACHER_STT_ADJUST_CLASSROOM_MODAL_HIDE:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,Show:false}};

        case STTActions.TEACHER_STT_ADJUST_CLASSROOM_MODAL_LOADING_SHOW:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,ModalLoading:true}};

        case STTActions.TEACHER_STT_ADJUST_CLASSROOM_MODAL_LOADING_HIDE:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,ModalLoading:false}};

        case STTActions.TEACHER_STT_ADJUST_CLASSROOM_MODAL_INIT:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,...actions.data}};


        case STTActions.TEACHER_STT_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CheckedValue:actions.data}};

        case STTActions.TEACHER_STT_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CheckedValue:'',ClassRoomTabActive:actions.data}};

        case STTActions.TEACHER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchValue:actions.data}};

        case STTActions.TEACHER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchWrapperShow:true}};

        case STTActions.TEACHER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchWrapperShow:false}};

        case STTActions.TEACHER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CancelBtnShow:'y'}};

        case STTActions.TEACHER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CancelBtnShow:'n'}};

        case STTActions.TEACHER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchList:actions.data}};

        case STTActions.TEACHER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchLoading:true}};

        case STTActions.TEACHER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchLoading:false}};

        case STTActions.TEACHER_STT_REPLACE_SCHEDULE_MODAL_SHOW:

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

        case STTActions.TEACHER_STT_REPLACE_SCHEDULE_MODAL_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,Show:false}};

        case STTActions.TEACHER_STT_REPLACE_SCHEDULE_MODAL_LOADING_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,ModalLoading:true}};

        case STTActions.TEACHER_STT_REPLACE_SCHEDULE_MODAL_LOADING_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,ModalLoading:false}};

        case STTActions.TEACHER_STT_REPLACE_SCHEDULE_MODAL_INIT:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,...actions.data}};

        case STTActions.TEACHER_STT_REPLACE_SCHEDULE_MODAL_TEACHER_PICK:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,ActiveTeacherID:actions.data}};

        case STTActions.TEACHER_STT_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchValue:actions.data}};

        case STTActions.TEACHER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,CancelBtnShow:'y'}};

        case STTActions.TEACHER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,CancelBtnShow:'n'}};

        case STTActions.TEACHER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchWrapperShow:true}};

        case STTActions.TEACHER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchWrapperShow:false}};

        case STTActions.TEACHER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchList:actions.data}};

        case STTActions.TEACHER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchLoadingShow:true}};

        case STTActions.TEACHER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchLoadingShow:false}};



        default:

            return state;

    }

};

export default SubjectTeacherTeacherSchedule