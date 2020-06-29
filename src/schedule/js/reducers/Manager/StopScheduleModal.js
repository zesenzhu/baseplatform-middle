import StopScheduleActions from '../../actions/Manager/StopScheduleActions';

const StopScheduleModal = (state={

    show:false,

    loadingShow:true,

    date:'',

    dateLoadingShow:false,

    weekDay:'',

    weekNO:'',

    periodGrades:[],

    periodGradesCheckedList:[],

    periodGradesPlainOpts:[],

    classHoursCheckedList:[],

    classHoursPlainOpts:[],

    classHours:[]

},actions) => {

    switch (actions.type) {

        case StopScheduleActions.STOP_SCHEDULE_SHOW:

            return{

                ...state,

                show:true,

                loadingShow:true,

                date:'',

                dateLoadingShow:false,

                weekDay:'',

                weekNO:'',

                periodGrades:[],

                periodGradesCheckedList:[],

                periodGradesPlainOpts:[],

                classHoursCheckedList:[],

                classHoursPlainOpts:[],

                classHours:[]

            };

        case StopScheduleActions.STOP_SCHEDULE_HIDE:

            return{...state, show:false};

        case StopScheduleActions.STOP_SCHEDULE_LOADING_SHOW:

            return{...state, loadingShow:true};

        case StopScheduleActions.STOP_SCHEDULE_LOADING_HIDE:

            return{...state, loadingShow:false};

        case StopScheduleActions.STOP_SCHEDULE_DATE_CHANGE:

            return {...state,date:actions.data};

        case StopScheduleActions.STOP_SCHEDULE_WEEK_DATE_LOADING_SHOW:

            return {...state,dateLoadingShow:true};

        case StopScheduleActions.STOP_SCHEDULE_WEEK_DATE_LOADING_HIDE:

            return {...state,dateLoadingShow:false};

        case StopScheduleActions.STOP_SCHEDULE_WEEK_DATE_CHANGE:

            return {...state,...actions.data};

        case StopScheduleActions.STOP_SCHEDULE_INFO_UPDATE:

            return {...state,...actions.data};

        case StopScheduleActions.STOP_SCHEDULE_CLASSHOUR_CHECKED:

            return {...state,classHoursCheckedList:actions.data.classHoursCheckedList};

        case StopScheduleActions.STOP_SCHEDULE_PERIOD_GRADE_CHECKED:

            return {...state,periodGradesCheckedList:actions.data.periodGradesCheckedList};

        default:

            return state;

    }

};

export default StopScheduleModal