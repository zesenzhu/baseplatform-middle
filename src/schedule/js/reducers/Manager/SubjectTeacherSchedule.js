import STSActions from '../../actions/Manager/SubjectTeacherScheduleActions';

const SubjectTeacherSchedule = (state={

    schedule:[],

    ItemSubjectSelect:{value:0,title:"全部学科"},

    NowWeekNO:1,

    NowWeekDay:1,

    NowClassDate:'',

    pageIndex:1,

    loadingShow:true,

    TeacherCount:0,

    ScheduleList:[]

},actions) => {

    switch (actions.type) {

        case STSActions.SUBJECT_TEACHER_SCHEDULE_INIT:

            return {

                ...state,

                ItemSubjectSelect:{value:0,title:"全部学科"},

                pageIndex:1,

                loadingShow:true,

                schedule:actions.data,

                ScheduleList:[]

            };

        case STSActions.SUBJECT_TEACHER_SCHEDULE_TEACHER_COUNT:

            return { ...state,TeacherCount:actions.data };

        case STSActions.STS_SUBJECT_CHANGE:

          return {...state,ItemSubjectSelect:actions.data};

        case STSActions.MANAGER_STS_NOW_WEEK_NO_CHANGE:

            return {...state,NowWeekNO:actions.data};

        case STSActions.MANAGER_STS_NOW_WEEK_DAY_CHANGE:

            return {...state,NowWeekDay:actions.data};

        case STSActions.MANAGER_STS_NOW_CLASS_DATE_CHANGE:

            return {...state,NowClassDate:actions.data};

        case STSActions.SUBJECT_TEACHER_SCHEDULE_UPDATE:

            return {...state,schedule:actions.data};

        case STSActions.STS_PAGE_ADD:

            return {...state,pageIndex:state.pageIndex+1};

        case STSActions.MANAGER_STS_PAGE_UPDATE:

            return { ...state,pageIndex:actions.data };

        case STSActions.LOADING_HIDE:

            return {...state,loadingShow:false};

        case STSActions.LOADING_SHOW:

            return {...state,loadingShow:true};

        case STSActions.MANAGER_STS_SCHEDULE_UPDATE:

            return { ...state,ScheduleList:actions.data };

        default:

            return state;

    }

};

export default SubjectTeacherSchedule