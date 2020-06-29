import {APP_ALERT_HIDE,APP_ALERT_SHOW} from './appAlert';

export const defaultState = {

    token:'',

    Type:'',

    ScheduleID:'',

    appAlert:{

        show:false,

        type:'',

        title:'',

        abstract:'',

        okTitle:'',

        cancelTitle:'',

        cancelShow:'y',

        okShow:'y',

        onHide:()=>{},

        onOk:()=>{},

        onCancel:()=>{},

        onClose:()=>{}

    },

    UserInfo:{

        UserID:'',

        UserType:'',

        SchoolID:''

    },

    ScheduleInfo:''

};




//url 参数变化

export const URL_PARAMS_CHANGE = 'URL_PARAMS_CHANGE';

//用户信息变更
export const LOGIN_USER_INFO_UPDATE = 'LOGIN_USER_INFO_UPDATE';

//获取到课表的公共
export const SCHEDULE_COMMON_INFO_UPDATE = 'SCHEDULE_COMMON_INFO_UPDATE';

export const urlParamsChange = ({token,Type,ScheduleID},dispatch)=>{

    dispatch({type:URL_PARAMS_CHANGE,data:{

            Type:parseInt(Type),ScheduleID,token

    }});

};





const reducer = (state,actions) =>{

    switch (actions.type) {

        case URL_PARAMS_CHANGE:

            return {

                ...state,

                ...actions.data

            };

        case LOGIN_USER_INFO_UPDATE:

            return {

                ...state,

                UserInfo:{

                    ...state.UserInfo,

                    ...actions.data

                }

            };

        case SCHEDULE_COMMON_INFO_UPDATE:

            return {

                ...state,

                ScheduleInfo:actions.data

            };

        case APP_ALERT_SHOW:

            return {

                ...state,

                appAlert:{

                    ...state.appAlert,

                    ...actions.data,

                    show:true

                }

            };

        case APP_ALERT_HIDE:

            return {

                ...state,

                appAlert:{

                    ...state.appAlert,

                    show:false

                }

            };

        default:

            return state;

    }

};

export default reducer;