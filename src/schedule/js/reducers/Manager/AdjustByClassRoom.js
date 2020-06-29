import ABCRActions from '../../actions/Manager/AdjustByClassRoomActions';





const AdjustByClassRoom = (state={

    Show:false,

    LoadingShow:true,

    ClassRoomList:[],

    OriginClassRoom:{

      DropSelectd:{value:"none",title:"请选择教室"},

      SearchList:[],

      SearchAllList:[],

      SearchOpen:false,

      SearchLoadingShow:true,

      ClassRoomList:[]

    },

    TargetClassRoom:{

        DropSelectd:{value:"none",title:"请选择教室"},

        SearchList:[],

        SearchAllList:[],

        SearchOpen:false,

        SearchLoadingShow:true,

        ClassRoomList:[]

    },

    activeRadio:"all",

    monthsList:[],

    monthLoading:true,

    monthsCheckedList:[],

    weeksList:[],

    weeksCheckedList:[],

    weekLoading:true,

    dateCheckedList:[],

    classHourDate:'',

    WeekDay:'',

    WeekNO:'',

    dateLoadingShow:true,

    classHourList:[],

    classHourCheckedList:[],

    classHourLoadingShow:true,

    classHourPlainOpts:[],

    OriginClassRoomTips:false,

    OriginClassRoomTipsTitle:'',

    TargetClassRoomTips:false,

    TargetClassRoomTipsTitle:'',

    classTips:false,

    classTipsTitle:'',

    monthTips:false,

    monthTipsTitle:'',

    weekTips:false,

    weekTipsTitle:'',

    dateTips:false,

    dateTipsTitle:'',

    classHourDateTips:false,

    classHourDateTipsTitle:'',

    classHourTips:false,

    classHourTipsTitle:'',

},actions) => {

    switch (actions.type) {

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_SHOW:

            return {

                ...state,

                Show:true,

                LoadingShow:true,

                ClassRoomList:[],

                OriginClassRoom:{

                    DropSelectd:{value:"none",title:"请选择教室"},

                    SearchList:[],

                    SearchAllList:[],

                    ClassRoomList:[],

                    SearchOpen:false,

                    SearchLoadingShow:true

                },

                TargetClassRoom:{

                    DropSelectd:{value:"none",title:"请选择教室"},

                    SearchList:[],

                    SearchAllList:[],

                    ClassRoomList:[],

                    SearchOpen:false,

                    SearchLoadingShow:true

                },

                activeRadio:"all",

                monthsList:[],

                monthLoading:true,

                monthsCheckedList:[],

                weeksList:[],

                weekLoading:true,

                weeksCheckedList:[],

                dateCheckedList:[],

                classHourDate:'',

                WeekDay:'',

                WeekNO:'',

                dateLoadingShow:true,

                classHourList:[],

                classHourCheckedList:[],

                classHourLoadingShow:true,

                classHourPlainOpts:[],

                originTeacherTips:false,

                originTeacherTipsTitle:'',

                replaceTeacherTips:false,

                replaceTeacherTipsTitle:'',

                classTips:false,

                classTipsTitle:'',

                monthTips:false,

                monthTipsTitle:'',

                weekTips:false,

                weekTipsTitle:'',

                dateTips:false,

                dateTipsTitle:'',

                classHourDateTips:false,

                classHourDateTipsTitle:'',

                classHourTips:false,

                classHourTipsTitle:'',

                OriginClassRoomTips:false,

                OriginClassRoomTipsTitle:'',

                TargetClassRoomTips:false,

                TargetClassRoomTipsTitle:''

                };

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_HIDE:

            return {

                ...state,

                Show:false

            };

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_CLASSROOM_LIST_UPDATE:

            return {

                ...state,

                ClassRoomList:actions.data,

                OriginClassRoom:{

                    ...state.OriginClassRoom,

                    ClassRoomList:actions.data

                },

                TargetClassRoom:{

                    ...state.TargetClassRoom,

                    ClassRoomList:actions.data

                }

            };

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_CLASSROOM_LIST_UPDATE:

            return {

                ...state,

                OriginClassRoom:{...state.OriginClassRoom,ClassRoomList:actions.data}

            }

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_CLASSROOM_CHANGE:

            return{...state,OriginClassRoom:{...state.OriginClassRoom,DropSelectd:actions.data}};

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LIST_UPDATE:

            return { ...state,OriginClassRoom:{...state.OriginClassRoom,SearchList:actions.data} }

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_ALL_LIST_UPDATE:

            return { ...state,OriginClassRoom:{...state.OriginClassRoom,SearchAllList:actions.data} }


        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_OPEN:

            return { ...state,OriginClassRoom:{...state.OriginClassRoom,SearchOpen:true}};

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LOADING_SHOW:

            return { ...state,OriginClassRoom:{...state.OriginClassRoom,SearchLoadingShow:true}};

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LOADING_HIDE:

            return { ...state,OriginClassRoom:{...state.OriginClassRoom,SearchLoadingShow:false}};

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_CLOSE:

            return { ...state,OriginClassRoom:{...state.OriginClassRoom,SearchOpen:false}};




        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_TARGET_CLASSROOM_LIST_UPDATE:

            return {

                ...state,

                TargetClassRoom:{...state.TargetClassRoom,ClassRoomList:actions.data}

            }

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_TARGET_CLASSROOM_CHANGE:

            return{...state,TargetClassRoom:{...state.TargetClassRoom,DropSelectd:actions.data}};

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LIST_UPDATE:

            return { ...state,TargetClassRoom:{...state.TargetClassRoom,SearchList:actions.data} };

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_ALL_LIST_UPDATE:

            return { ...state,TargetClassRoom:{...state.TargetClassRoom,SearchAllList:actions.data} };


        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_OPEN:

            return { ...state,TargetClassRoom:{...state.TargetClassRoom,SearchOpen:true}};

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LOADING_SHOW:

            return { ...state,TargetClassRoom:{...state.TargetClassRoom,SearchLoadingShow:true}};

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LOADING_HIDE:

            return { ...state,TargetClassRoom:{...state.TargetClassRoom,SearchLoadingShow:false}};

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_CLOSE:

            return { ...state,TargetClassRoom:{...state.TargetClassRoom,SearchOpen:false}};



        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_LOADING_HIDE:

            return {...state,LoadingShow:false};

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_LOADING_SHOW:

            return {...state,LoadingShow:true};


        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_RADIO_CHANGE:

            return {

                ...state,

                activeRadio:actions.data

            };

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_MONTHS_LIST_UPDATE:

            return{

                ...state,

                monthsList:actions.data

            };

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_MONTHS_LOADING_HIDE:

            return { ...state,monthLoading:false };

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_MONTHS_CHECKED:

            return{

                ...state,

                monthsCheckedList:actions.data

            };

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_WEEK_LIST_UPDATE:

            return{

                ...state,

                weeksList:actions.data

            };

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_WEEKS_LOADING_HIDE:

            return { ...state,weekLoading:false};

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_WEEK_CHECKED:

            return{

                ...state,

                weeksCheckedList:actions.data

            };

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_DATE_CHECKED:

            return {

                ...state,

                dateCheckedList:actions.data

            };

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_DATE_CHECKED:

            return {

                ...state,

                classHourDate:actions.data

            };

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_WEEK_DATE_LOADING_SHOW:

            return {

                ...state,

                dateLoadingShow:true

            };

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_WEEK_DATE_LOADING_HIDE:

            return {

                ...state,

                dateLoadingShow:false

            };

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_WEEK_DATE_UPDATE:

            return {

                ...state,

                WeekNO:actions.data.WeekNO,

                WeekDay:actions.data.WeekDay

            };


        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_LOADING_SHOW:

            return {

                ...state,

                classHourLoadingShow:true

            };

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_LOADING_HIDE:

            return {

                ...state,

                classHourLoadingShow:false

            };

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_LIST_CHANGE:

            return {

                ...state,

                classHourList:actions.data.classHourList,

                classHourPlainOpts:actions.data.classHourPlainOpts,

                classHourCheckedList:actions.data.classHourCheckedList

            };

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_CHECKED_LIST_CHANGE:

            return {

                ...state,

                classHourCheckedList:actions.data

            };



        //所有的错误提示

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_SHOW:

            switch (actions.data.type) {

                case 'OriginClassRoom':

                    return {...state,OriginClassRoomTips:true,OriginClassRoomTipsTitle:actions.data.title};

                case 'TargetClassRoom':

                    return {...state,TargetClassRoomTips:true,TargetClassRoomTipsTitle:actions.data.title};

                case 'class':

                    return {...state,classTips:true,classTipsTitle:actions.data.title};

                case 'month':

                    return {...state,monthTips:true,monthTipsTitle:actions.data.title};

                case 'week':

                    return {...state,weekTips:true,weekTipsTitle:actions.data.title};

                case 'date':

                    return {...state,dateTips:true,dateTipsTitle:actions.data.title};

                case 'classHourDate':

                    return {...state,classHourDateTips:true,classHourDateTipsTitle:actions.data.title};

                case 'classHour':

                    return {...state,classHourTips:true,classHourTipsTitle:actions.data.title};


                default:

                    return state;

            }

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_HIDE:

            switch (actions.data.type) {

                case 'OriginClassRoom':

                    return {...state,OriginClassRoomTips:false};

                case 'TargetClassRoom':

                    return {...state,TargetClassRoomTips:false};

                case 'class':

                    return {...state,classTips:false};

                case 'month':

                    return {...state,monthTips:false};

                case 'week':

                    return {...state,weekTips:false};

                case 'date':

                    return {...state,dateTips:false};

                case 'classHourDate':

                    return {...state,classHourDateTips:false};

                case 'classHour':

                    return {...state,classHourTips:false};


                default:

                    return state;

            }


        default:

            return state;

    }

};

export default AdjustByClassRoom