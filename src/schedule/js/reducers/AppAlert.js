import AppAlertActions from '../actions/AppAlertActions';

const AppAlert = (state={

    type:1,

    title:"提示",

    show:false,

    abstract:'',

    hide:'',

    cancel:'',

    ok:'',

    okTitle:'',

    cancelTitle:''

},actions) => {

    switch (actions.type) {

        case AppAlertActions.APP_ALERT_SHOW:

            return {...state,show:true,...actions.data};

        case AppAlertActions.APP_ALERT_HIDE:

            return {...state,show:false,...actions.data};

        default:

            return state;

    }

};

export default AppAlert