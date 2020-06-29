import ABTMActions from  '../../actions/Manager/AdjustByTimeModalActions';

const AdjustByTimeModal = (state={

    show:false,

    loadingShow:true,

    oldClassHours:[],

    newClassHours:[],

    periodGrades:[],

    periodGradesPlainOpts:[],

    periodGradesCheckedList:[],

    oldClassHourPlainOpts:[],

    oldClassHourCheckedList:[],

    newClassHourPlainOpts:[],

    newClassHourCheckedList:[],

    newDate:'',

    oldDate:'',

    oldWeekDay:'',

    oldWeekNo:'',

    newWeekDay:'',

    newWeekNo:'',

    oldDateLoadingShow:false,

    newDateLoadingShow:false

}, actions) => {

    switch (actions.type) {

        case ABTMActions.ADJUST_BY_TIME_SHOW:

            return {

                ...state,

                show:true,

                loadingShow:true,

                oldClassHours:[],

                newClassHours:[],

                periodGrades:[],

                periodGradesPlainOpts:[],

                periodGradesCheckedList:[],

                oldClassHourPlainOpts:[],

                oldClassHourCheckedList:[],

                newClassHourPlainOpts:[],

                newClassHourCheckedList:[],

                newDate:'',

                oldDate:'',

                oldWeekDay:'',

                oldWeekNo:'',

                newWeekDay:'',

                newWeekNo:'',

                oldDateLoadingShow:false,

                newDateLoadingShow:false

            };

        case ABTMActions.ADJUST_BY_TIME_HIDE:

            return {...state,show:false};

        case ABTMActions.ADJUST_BY_TIME_INFO_UPDATE:

            return {...state,...actions.data};

        case ABTMActions.ADJUST_BY_TIME_LOADING_SHOW:

            return {...state,loadingShow:true};

        case ABTMActions.ADJUST_BY_TIME_LOADING_HIDE:

            return {...state,loadingShow:false};

        case ABTMActions.ADJUST_BY_TIME_PERIOD_GRADE_CHECKED:

            return {...state,periodGradesCheckedList:actions.data.periodGradesCheckedList};

        case ABTMActions.ADJUST_BY_TIME_OLD_CLASSHOUR_CHECKED:

            return {...state,oldClassHourCheckedList:actions.data.oldClassHourCheckedList};

        case ABTMActions.ADJUST_BY_TIME_NEW_CLASSHOUR_CHECKED:

            return {...state,newClassHourCheckedList:actions.data.newClassHourCheckedList};

        case ABTMActions.ADJUST_BY_TIME_OLD_DATE_UPDATE:

            return {...state,oldDate:actions.data};

        case ABTMActions.ADJUST_BY_TIME_NEW_DATE_UPDATE:

            return {...state,newDate:actions.data};

        case ABTMActions.ADJUST_BY_TIME_OLD_WEEK_DATE_LOADING_SHOW:

            return {...state,oldDateLoadingShow:true};

        case ABTMActions.ADJUST_BY_TIME_OLD_WEEK_DATE_LOADING_HIDE:

            return {...state,oldDateLoadingShow:false};

        case ABTMActions.ADJUST_BY_TIME_NEW_WEEK_DATE_LOADING_HIDE:

            return {...state,newDateLoadingShow:false};

        case ABTMActions.ADJUST_BY_TIME_NEW_WEEK_DATE_LOADING_SHOW:

            return {...state,newDateLoadingShow:true};

        case ABTMActions.ADJUST_BY_TIME_OLD_WEEK_DATE_UPDATE:

            return {...state,oldWeekDay:actions.data.weekDay,oldWeekNo:actions.data.weekNo};

        case ABTMActions.ADJUST_BY_TIME_NEW_WEEK_DATE_UPDATE:

            return {...state,newWeekDay:actions.data.weekDay,newWeekNo:actions.data.weekNo};

        default:

            return state;

    }

};

export default AdjustByTimeModal