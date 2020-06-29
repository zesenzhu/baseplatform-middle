import CRSActions from '../../actions/Manager/ClassRoomSingleActions';

const ClassRoomSingle = (state={

    Schedule:[],

    ScheduleCount:0,

    WeekNO:0,

    WeekList:[],

    LoadingShow:true,

    ClassRoomList:[],

    PickClassRoom:'',

    PickClassRoomID:'',

    ScheduleLoadingShow:true,

    SearchWrapperShow:false,

    SearchResult:[],

    SearchLoadingShow:false,

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

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_INIT:

            return {

                ...state,

                Schedule:[],

                ScheduleCount:0,

                WeekNO:0,

                LoadingShow:true,

                PickClassRoom:'',

                PickClassRoomID:'',

                CancelBtnShow:'n',

                SearchValue:'',

                ScheduleLoadingShow:true,

                SearchWrapperShow:false,

                SearchResult:[],

                SearchLoadingShow:false,

                ClassRoomList:[],

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

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_CLASSROOM_LIST_UPDATE:

            return { ...state,ClassRoomList:actions.data };

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_UPDATE:

            return {

                ...state,

                ...actions.data

            };

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_SEARCHLIST_UPDATE:

            return { ...state,SearchResult:actions.data };

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_WEEK_CHANGE:

            return {...state,WeekNO:actions.data};

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_WEEK_LIST_UPDATE:

            return {...state,WeekList:actions.data};

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_HIDE:

            return {...state,ScheduleLoadingShow:false};

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_SHOW:

            return {...state,ScheduleLoadingShow:true};

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_SEARCH_LOADING_SHOW:

            return {...state,SearchLoadingShow:true};

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_SEARCH_LOADING_HIDE:

            return {...state,SearchLoadingShow:false};

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_SEARCH_RESULT_SHOW:

            return {...state,SearchWrapperShow:true};

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_SEARCH_RESULT_HIDE:

            return {...state,SearchWrapperShow:false};


        case CRSActions.MANAGER_CRS_LEFT_MENU_SEARCH_INPUT_CHANGE:

            return {...state,SearchValue:actions.data};

        case CRSActions.MANAGER_CRS_LEFT_MENU_CANCEL_BTN_SHOW:

            return {...state,CancelBtnShow:'y'};

        case CRSActions.MANAGER_CRS_LEFT_MENU_CANCEL_BTN_HIDE:

            return {...state,CancelBtnShow:'n'};

        case CRSActions.MANAGER_CRS_SCHEDULE_DETAIL_MODAL_SHOW:

            return {...state,ScheduleDetail:{...state.ScheduleDetail,Show:true,ModalLoading:true}};

        case CRSActions.MANAGER_CRS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE:

            return {...state,ScheduleDetail:{...state.ScheduleDetail,ModalLoading:false}};

        case CRSActions.MANAGER_CRS_SCHEDULE_DETAIL_MODAL_LOADING_SHOW:

            return {...state,ScheduleDetail:{...state.ScheduleDetail,ModalLoading:true}};

        case CRSActions.MANAGER_CRS_SCHEDULE_DETAIL_MODAL_INIT:

            return {

                ...state,

                ScheduleDetail:{

                    ...state.ScheduleDetail,

                    ...actions.data

                }
            };

        case CRSActions.MANAGER_CRS_SCHEDULE_DETAIL_MODAL_HIDE:

            return { ...state,ScheduleDetail:{...state.ScheduleDetail,Show:false}};

        case CRSActions.MANAGER_CRS_CHANGE_TIME_MODAL_SHOW:

            return {...state,ChangeTime:{...state.ChangeTime,Show:true,ModalLoading:true}};

        case CRSActions.MANAGER_CRS_CHANGE_TIME_MODAL_HIDE:

            return {...state,ChangeTime:{...state.ChangeTime,Show:false}};

        case CRSActions.MANAGER_CRS_CHANGE_TIME_MODAL_LOADING_SHOW:

            return {...state,ChangeTime:{...state.ChangeTime,ModalLoading:true}};

        case CRSActions.MANAGER_CRS_CHANGE_TIME_MODAL_LOADING_HIDE:

            return {...state,ChangeTime:{...state.ChangeTime,ModalLoading:false}};

        case CRSActions.MANAGER_CRS_CHANGE_TIME_MODAL_INIT:

            return {...state,ChangeTime:{...state.ChangeTime,SelectWeekDay:'',SelectClassHourNO:0,...actions.data}};

        case CRSActions.MANAGER_CRS_CHANGE_TIME_MODAL_CLASSHOUR_PICK:

            return { ...state,ChangeTime:{...state.ChangeTime,...actions.data}};

        case CRSActions.MANAGER_CRS_ADJUST_CLASSROOM_MODAL_SHOW:

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

        case CRSActions.MANAGER_CRS_ADJUST_CLASSROOM_MODAL_HIDE:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,Show:false}};

        case CRSActions.MANAGER_CRS_ADJUST_CLASSROOM_MODAL_LOADING_SHOW:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,ModalLoading:true}};

        case CRSActions.MANAGER_CRS_ADJUST_CLASSROOM_MODAL_LOADING_HIDE:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,ModalLoading:false}};

        case CRSActions.MANAGER_CRS_ADJUST_CLASSROOM_MODAL_INIT:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,...actions.data}};


        case CRSActions.MANAGER_CRS_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CheckedValue:actions.data}};

        case CRSActions.MANAGER_CRS_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CheckedValue:'',ClassRoomTabActive:actions.data}};

        case CRSActions.MANAGER_CRS_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchValue:actions.data}};

        case CRSActions.MANAGER_CRS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchWrapperShow:true}};

        case CRSActions.MANAGER_CRS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchWrapperShow:false}};

        case CRSActions.MANAGER_CRS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CancelBtnShow:'y'}};

        case CRSActions.MANAGER_CRS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CancelBtnShow:'n'}};

        case CRSActions.MANAGER_CRS_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchList:actions.data}};

        case CRSActions.MANAGER_CRS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchLoading:true}};

        case CRSActions.MANAGER_CRS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchLoading:false}};

        case CRSActions.MANAGER_CRS_REPLACE_SCHEDULE_MODAL_SHOW:

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

        case CRSActions.MANAGER_CRS_REPLACE_SCHEDULE_MODAL_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,Show:false}};

        case CRSActions.MANAGER_CRS_REPLACE_SCHEDULE_MODAL_LOADING_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,ModalLoading:true}};

        case CRSActions.MANAGER_CRS_REPLACE_SCHEDULE_MODAL_LOADING_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,ModalLoading:false}};

        case CRSActions.MANAGER_CRS_REPLACE_SCHEDULE_MODAL_INIT:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,...actions.data}};

        case CRSActions.MANAGER_CRS_REPLACE_SCHEDULE_MODAL_TEACHER_PICK:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,ActiveTeacherID:actions.data}};

        case CRSActions.MANAGER_CRS_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchValue:actions.data}};

        case CRSActions.MANAGER_CRS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,CancelBtnShow:'y'}};

        case CRSActions.MANAGER_CRS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,CancelBtnShow:'n'}};

        case CRSActions.MANAGER_CRS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchWrapperShow:true}};

        case CRSActions.MANAGER_CRS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchWrapperShow:false}};

        case CRSActions.MANAGER_CRS_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchList:actions.data}};

        case CRSActions.MANAGER_CRS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchLoadingShow:true}};

        case CRSActions.MANAGER_CRS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchLoadingShow:false}};


        default:

            return state;

    }

};

export default ClassRoomSingle