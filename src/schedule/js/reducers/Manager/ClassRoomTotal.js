import CRTActions from '../../actions/Manager/ClassRoomTotalActions';

const ClassRoomTotal = (state={

    RoomTypeDropSelectd:{value:"none",title:"全部教室"},

    RoomTypeDropList:[],

    NowWeekNO:1,

    NowWeekDay:1,

    NowClassDate:'',

    Schedule:[],

    ScheduleList:[],

    WeekList:[],

    LoadingShow:true,

    PageIndex:1,

    ClassRoomCount:0

},actions) => {

    switch (actions.type) {

        case CRTActions.MANAGER_CLASS_ROOM_TOTAL_INIT:

            return {

                ...state,

                RoomTypeDropSelectd:{value:"none",title:"全部教室"},

                PageIndex:1,

                ClassRoomCount:0,

                Schedule:actions.data,

                ScheduleList:[]

            };

        case CRTActions.MANAGER_CLASS_ROOM_TOTAL_ROOMTYPE_SELECT_CHANGE:

            return { ...state,RoomTypeDropSelectd:actions.data };

        case CRTActions.MANAGER_CLASS_ROOM_TOTAL_ROOMTYPE_LIST_UPDATE:

            return { ...state,RoomTypeDropList:actions.data };

        case CRTActions.MANAGER_CRT_NOW_WEEK_NO_CHANGE:

            return { ...state,NowWeekNO:actions.data };

        case CRTActions.MANAGER_CRT_NOW_WEEK_DAY_CHANGE:

            return { ...state,NowWeekDay:actions.data };

        case CRTActions.MANAGER_CRT_NOW_CLASS_DATE_CHANGE:

            return { ...state,NowClassDate:actions.data };

        case CRTActions.MANAGER_CLASS_ROOM_TOTAL_SCHEDULE_UPDATE:

        return { ...state,Schedule:actions.data };

        case CRTActions.MANAGER_CRT_SCHEDULE_LIST_UPDATE:

            return { ...state,ScheduleList:actions.data };

        case CRTActions.MANAGER_CLASS_ROOM_TOTAL_CLASS_COUNT:

            return { ...state,ClassRoomCount:actions.data};

        case CRTActions.MANAGER_CLASS_ROOM_TOTAL_WEEK_LIST_UPDATE:

            return { ...state,WeekList:actions.data };

        case CRTActions.MANAGER_CLASS_ROOM_TOTAL_LOADING_HIDE:

            return { ...state,LoadingShow:false };

        case CRTActions.MANAGER_CLASS_ROOM_TOTAL_LOADING_SHOW:

            return { ...state,LoadingShow:true };

        case CRTActions.MANAGER_CLASS_ROOM_TOTAL_PAGE_ADD:

            return { ...state,PageIndex:state.PageIndex+1};

        case CRTActions.MANAGER_CLASS_ROOM_TOTAL_PAGE_UPDATE:

            return { ...state,PageIndex:actions.data };

        case CRTActions.MANAGER_CRT_SCHEDULE_DETAIL_MODAL_SHOW:

            return {...state,ScheduleDetail:{...state.ScheduleDetail,Show:true,ModalLoading:true}};

        case CRTActions.MANAGER_CRT_SCHEDULE_DETAIL_MODAL_LOADING_HIDE:

            return {...state,ScheduleDetail:{...state.ScheduleDetail,ModalLoading:false}};

        case CRTActions.MANAGER_CRT_SCHEDULE_DETAIL_MODAL_LOADING_SHOW:

            return {...state,ScheduleDetail:{...state.ScheduleDetail,ModalLoading:true}};

        case CRTActions.MANAGER_CRT_SCHEDULE_DETAIL_MODAL_INIT:

            return {

                ...state,

                ScheduleDetail:{

                    ...state.ScheduleDetail,

                    ...actions.data

                }
            };

        case CRTActions.MANAGER_CRT_SCHEDULE_DETAIL_MODAL_HIDE:

            return { ...state,ScheduleDetail:{...state.ScheduleDetail,Show:false}};

        case CRTActions.MANAGER_CRT_CHANGE_TIME_MODAL_SHOW:

            return {...state,ChangeTime:{...state.ChangeTime,Show:true,ModalLoading:true}};

        case CRTActions.MANAGER_CRT_CHANGE_TIME_MODAL_HIDE:

            return {...state,ChangeTime:{...state.ChangeTime,Show:false}};

        case CRTActions.MANAGER_CRT_CHANGE_TIME_MODAL_LOADING_SHOW:

            return {...state,ChangeTime:{...state.ChangeTime,ModalLoading:true}};

        case CRTActions.MANAGER_CRT_CHANGE_TIME_MODAL_LOADING_HIDE:

            return {...state,ChangeTime:{...state.ChangeTime,ModalLoading:false}};

        case CRTActions.MANAGER_CRT_CHANGE_TIME_MODAL_INIT:

            return {...state,ChangeTime:{...state.ChangeTime,SelectWeekDay:'',SelectClassHourNO:0,...actions.data}};

        case CRTActions.MANAGER_CRT_CHANGE_TIME_MODAL_CLASSHOUR_PICK:

            return { ...state,ChangeTime:{...state.ChangeTime,...actions.data}};

        case CRTActions.MANAGER_CRT_ADJUST_CLASSROOM_MODAL_SHOW:

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

        case CRTActions.MANAGER_CRT_ADJUST_CLASSROOM_MODAL_HIDE:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,Show:false}};

        case CRTActions.MANAGER_CRT_ADJUST_CLASSROOM_MODAL_LOADING_SHOW:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,ModalLoading:true}};

        case CRTActions.MANAGER_CRT_ADJUST_CLASSROOM_MODAL_LOADING_HIDE:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,ModalLoading:false}};

        case CRTActions.MANAGER_CRT_ADJUST_CLASSROOM_MODAL_INIT:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,...actions.data}};


        case CRTActions.MANAGER_CRT_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CheckedValue:actions.data}};

        case CRTActions.MANAGER_CRT_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CheckedValue:'',ClassRoomTabActive:actions.data}};

        case CRTActions.MANAGER_CRT_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchValue:actions.data}};

        case CRTActions.MANAGER_CRT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchWrapperShow:true}};

        case CRTActions.MANAGER_CRT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchWrapperShow:false}};

        case CRTActions.MANAGER_CRT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CancelBtnShow:'y'}};

        case CRTActions.MANAGER_CRT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,CancelBtnShow:'n'}};

        case CRTActions.MANAGER_CRT_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchList:actions.data}};

        case CRTActions.MANAGER_CRT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchLoading:true}};

        case CRTActions.MANAGER_CRT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE:

            return { ...state,AdjustClassRoom:{...state.AdjustClassRoom,SearchLoading:false}};

        case CRTActions.MANAGER_CRT_REPLACE_SCHEDULE_MODAL_SHOW:

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

        case CRTActions.MANAGER_CRT_REPLACE_SCHEDULE_MODAL_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,Show:false}};

        case CRTActions.MANAGER_CRT_REPLACE_SCHEDULE_MODAL_LOADING_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,ModalLoading:true}};

        case CRTActions.MANAGER_CRT_REPLACE_SCHEDULE_MODAL_LOADING_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,ModalLoading:false}};

        case CRTActions.MANAGER_CRT_REPLACE_SCHEDULE_MODAL_INIT:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,...actions.data}};

        case CRTActions.MANAGER_CRT_REPLACE_SCHEDULE_MODAL_TEACHER_PICK:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,ActiveTeacherID:actions.data}};

        case CRTActions.MANAGER_CRT_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchValue:actions.data}};

        case CRTActions.MANAGER_CRT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,CancelBtnShow:'y'}};

        case CRTActions.MANAGER_CRT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,CancelBtnShow:'n'}};

        case CRTActions.MANAGER_CRT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchWrapperShow:true}};

        case CRTActions.MANAGER_CRT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchWrapperShow:false}};

        case CRTActions.MANAGER_CRT_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchList:actions.data}};

        case CRTActions.MANAGER_CRT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchLoadingShow:true}};

        case CRTActions.MANAGER_CRT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE:

            return { ...state,ReplaceSchedule:{...state.ReplaceSchedule,SearchLoadingShow:false}};


        default:

            return state;

    }

};

export default ClassRoomTotal;