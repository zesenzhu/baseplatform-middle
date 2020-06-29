import DelScheduleActions from '../../actions/Manager/DelScheduleActions';

const DelScheduleModal = (state={

    show:false,

    loadingShow:true,

    periodGrades:[],

    periodGradesCheckedList:[],

    periodGradesPlainOpts:[],


},actions) => {

    switch (actions.type) {

        case DelScheduleActions.DEL_SCHEDULE_SHOW:

            return{

                ...state,

                show:true,

                loadingShow:true,

                periodGrades:[],

                periodGradesCheckedList:[],

                periodGradesPlainOpts:[],

            };

        case DelScheduleActions.DEL_SCHEDULE_HIDE:

            return{...state, show:false};

        case DelScheduleActions.DEL_SCHEDULE_LOADING_SHOW:

            return{...state, loadingShow:true};

        case DelScheduleActions.DEL_SCHEDULE_LOADING_HIDE:

            return{...state, loadingShow:false};

        case DelScheduleActions.DEL_SCHEDULE_INFO_UPDATE:

            return {...state,...actions.data};

        case DelScheduleActions.DEL_SCHEDULE_PERIOD_GRADE_CHECKED:

            return {...state,periodGradesCheckedList:actions.data.periodGradesCheckedList};

        default:

            return state;

    }

};

export default DelScheduleModal