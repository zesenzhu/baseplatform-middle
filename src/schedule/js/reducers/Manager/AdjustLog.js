import ALActions from '../../actions/Manager/AdjustLogActions';

const AdjustLog = (state={

    DropSelectd:{value:0,title:"全部类型"},

    DropList:[

        {

            value:0,

            title:"全部类型"

        },

        {

            value:1,

            title:"调整教室"

        },

        {

            value:2,

            title:"调整老师"

        },

        {

            value:3,

            title:"调整时间"

        },

        {

            value:4,

            title:"停课"

        },

        {

            value:5,

            title:"恢复上课"

        }

    ],

    StartDate:'',

    EndDate:'',

    PageIndex:1,

    TotalCount:0,

    ScheduleID:'',

    LogList:[],

    TableLoading:true

},actions) => {

    switch (actions.type) {

        case ALActions.MANAGER_ADJUST_LOG_INIT:

            return {

                ...state,

                DropSelectd:{value:0,title:"全部类型"},

                DropList:[

                    {

                        value:0,

                        title:"全部类型"

                    },

                    {

                        value:1,

                        title:"调整教室"

                    },

                    {

                        value:2,

                        title:"调整老师"

                    },

                    {

                        value:3,

                        title:"调整时间"

                    },

                    {

                        value:4,

                        title:"停课"

                    },

                    {

                        value:5,

                        title:"恢复上课"

                    }

                ],

                StartDate:'',

                EndDate:'',

                PageIndex:1,

                ScheduleID:'',

                TotalCount:actions.data.TotalCount,

                LogList:actions.data.LogList

            };

        case ALActions.MANAGER_ADJUST_LOG_TABLE_UPDATE:

            return {

                ...state,

                TotalCount:actions.data.TotalCount,

                LogList:actions.data.LogList

            };

        case ALActions.MANAGER_ADJUST_LOG_START_DATE_UPDATE:

            return {

                ...state,

                StartDate:actions.data,

            };

        case ALActions.MANAGER_ADJUST_LOG_END_DATE_UPDATE:

            return {

                ...state,

                EndDate:actions.data,

            };

        case ALActions.MANAGER_ADJUST_LOG_TABLE_LOADING_SHOW:

            return {

                ...state,

                TableLoading:true

            };

        case ALActions.MANAGER_ADJUST_LOG_TABLE_LOADING_HIDE:

            return {

                ...state,

                TableLoading:false

            };

        case ALActions.MANAGER_ADJUST_LOG_DROP_CHANGE:

            return {...state,DropSelectd:actions.data};

        case ALActions.MANAGER_ADJUST_LOG_PAGE_CHANGE:

            return {...state,PageIndex:actions.data};

        default:

            return state;

    }

};

export default AdjustLog