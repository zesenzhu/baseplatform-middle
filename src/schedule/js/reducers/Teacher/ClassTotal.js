import CTActions from '../../actions/Teacher/ClassTotalActions';

const ClassTotal = (state={

    ClassDropShow:false,

    ClassDropSelectd:{},

    ClassDropList:[],

    ClassName:'',

    ClassID:'',

    WeekNO:0,

    Schedule:[],

    ItemClassHour:[],

    ItemClassHourCount:[],

    WeekList:[],

    LoadingShow:true,

    OptionalClassShow:false,

    OptionalClassLoading:true,

    OptionalClassData:[],

    OptionalClassCurrentPage:1,

    ClassEmpty:false,

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

        case CTActions.TEACHER_CLASS_TOTAL_CLASS_DROP_SHOW:

             return {

                 ...state,

                 ClassDropShow:true,

             };

        case CTActions.TEACHER_CLASS_TOTAL_CLASS_DROP_HIDE:

            return {

                ...state,

                ClassDropShow:false,

            };

        case CTActions.TEACHER_CLASS_TOTAL_CLASS_DROP_CHANGE:

            return { ...state,ClassDropSelectd:actions.data };

        case CTActions.TEACHER_CLASS_TOTAL_CLASS_DROP_LIST_UPDATE:

            return { ...state,ClassDropList:actions.data };

        case CTActions.TEACHER_CLASS_TOTAL_CLASS_UPDATE:

            return {...state,...actions.data};

        case CTActions.TEACHER_CLASS_TOTAL_CLASS_CLASSHOUR_UPDATE:

            return { ...state,...actions.data };

        case CTActions.TEACHER_CLASS_TOTAL_SCHEDULE_UPDATE:

            return { ...state,Schedule:actions.data };

        case CTActions.TEACHER_CLASS_TOTAL_WEEK_CHANGE:

            return { ...state,WeekNO:actions.data };

        case CTActions.TEACHER_CLASS_TOTAL_WEEK_LIST_UPDATE:

            return { ...state,WeekList:actions.data };

        case CTActions.TEACHER_CLASS_TOTAL_LOADING_HIDE:

            return { ...state,LoadingShow:false };

        case CTActions.TEACHER_CLASS_TOTAL_LOADING_SHOW:

            return { ...state,LoadingShow:true };

        case CTActions.TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_MODAL_SHOW:

            return { ...state,OptionalClassShow:true };

        case CTActions.TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_MODAL_HIDE:

            return { ...state,OptionalClassShow:false };

        case CTActions.TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_LOADING_SHOW:

            return { ...state,OptionalClassLoading:true };

        case CTActions.TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_LOADING_HIDE:

            return { ...state,OptionalClassLoading:false };

        case CTActions.TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_DATA_UPDATE:

            return { ...state,OptionalClassData:actions.data };

        case CTActions.TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_PAGE_CHANGE:

            return { ...state,OptionalClassCurrentPage:actions.data };

        case CTActions.TEACHER_CT_SCHEDULE_DETAIL_MODAL_SHOW:

            return {...state,ScheduleDetail:{...state.ScheduleDetail,Show:true,ModalLoading:true}};

        case CTActions.TEACHER_CT_SCHEDULE_DETAIL_MODAL_LOADING_HIDE:

            return {...state,ScheduleDetail:{...state.ScheduleDetail,ModalLoading:false}};

        case CTActions.TEACHER_CT_SCHEDULE_DETAIL_MODAL_LOADING_SHOW:

            return {...state,ScheduleDetail:{...state.ScheduleDetail,ModalLoading:true}};

        case CTActions.TEACHER_CT_SCHEDULE_DETAIL_MODAL_INIT:

            return {

                ...state,

                ScheduleDetail:{

                    ...state.ScheduleDetail,

                    ...actions.data

                }
            };

        case CTActions.TEACHER_CT_SCHEDULE_DETAIL_MODAL_HIDE:

            return { ...state,ScheduleDetail:{...state.ScheduleDetail,Show:false}};

        case CTActions.TEACHER_CT_CHANGE_TIME_MODAL_SHOW:

            return {...state,ChangeTime:{...state.ChangeTime,Show:true,ModalLoading:true}};

        case CTActions.TEACHER_CT_CHANGE_TIME_MODAL_HIDE:

            return {...state,ChangeTime:{...state.ChangeTime,Show:false}};

        case CTActions.TEACHER_CT_CHANGE_TIME_MODAL_LOADING_SHOW:

            return {...state,ChangeTime:{...state.ChangeTime,ModalLoading:true}};

        case CTActions.TEACHER_CT_CHANGE_TIME_MODAL_LOADING_HIDE:

            return {...state,ChangeTime:{...state.ChangeTime,ModalLoading:false}};

        case CTActions.TEACHER_CT_CHANGE_TIME_MODAL_INIT:

            return {...state,ChangeTime:{...state.ChangeTime,SelectWeekDay:'',SelectClassHourNO:0,...actions.data}};

        case CTActions.TEACHER_CT_CHANGE_TIME_MODAL_CLASSHOUR_PICK:

            return { ...state,ChangeTime:{...state.ChangeTime,...actions.data}};

        case CTActions.TEACHER_CT_ADJUST_CLASSROOM_MODAL_SHOW:

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

        case CTActions.TEACHER_CT_ADJUST_CLASSROOM_MODAL_HIDE:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,Show:false}};

        case CTActions.TEACHER_CT_ADJUST_CLASSROOM_MODAL_LOADING_SHOW:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,ModalLoading:true}};

        case CTActions.TEACHER_CT_ADJUST_CLASSROOM_MODAL_LOADING_HIDE:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,ModalLoading:false}};

        case CTActions.TEACHER_CT_ADJUST_CLASSROOM_MODAL_INIT:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,...actions.data}};


        case CTActions.TEACHER_CT_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CheckedValue:actions.data}};

        case CTActions.TEACHER_CT_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CheckedValue:'',ClassRoomTabActive:actions.data}};

        case CTActions.TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchValue:actions.data}};

        case CTActions.TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchWrapperShow:true}};

        case CTActions.TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchWrapperShow:false}};

        case CTActions.TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CancelBtnShow:'y'}};

        case CTActions.TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CancelBtnShow:'n'}};

        case CTActions.TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchList:actions.data}};

        case CTActions.TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchLoading:true}};

        case CTActions.TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchLoading:false}};

        case CTActions.TEACHER_CT_REPLACE_SCHEDULE_MODAL_SHOW:

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

        case CTActions.TEACHER_CT_REPLACE_SCHEDULE_MODAL_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,Show:false}};

        case CTActions.TEACHER_CT_REPLACE_SCHEDULE_MODAL_LOADING_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,ModalLoading:true}};

        case CTActions.TEACHER_CT_REPLACE_SCHEDULE_MODAL_LOADING_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,ModalLoading:false}};

        case CTActions.TEACHER_CT_REPLACE_SCHEDULE_MODAL_INIT:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,...actions.data}};

        case CTActions.TEACHER_CT_REPLACE_SCHEDULE_MODAL_TEACHER_PICK:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,ActiveTeacherID:actions.data}};

        case CTActions.TEACHER_CT_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchValue:actions.data}};

        case CTActions.TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,CancelBtnShow:'y'}};

        case CTActions.TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,CancelBtnShow:'n'}};

        case CTActions.TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchWrapperShow:true}};

        case CTActions.TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchWrapperShow:false}};

        case CTActions.TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchList:actions.data}};

        case CTActions.TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchLoadingShow:true}};

        case CTActions.TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchLoadingShow:false}};

        case CTActions.TEACHER_CT_EMPTY_CLASSES_SHOW:

            return { ...state,ClassEmpty:true };

        case CTActions.TEACHER_CT_EMPTY_CLASSES_HIDE:

            return { ...state,ClassEmpty:false };

        default:

            return state;

    }

};

export default ClassTotal;