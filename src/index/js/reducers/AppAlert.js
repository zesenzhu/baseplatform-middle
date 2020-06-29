import AppAlertActions from '../actions/AppAlertActions';

const AppAlert = (state={

    show:false,

    type:"btn-warn",

    title:"提示",

    ok:"",

    cancel:"",

    close:"",

    hide:"",

    abstract:""

},actions) => {

    switch (actions.type) {

        case AppAlertActions.APP_ALERT_SHOW:

            return {

                ...state,

                show:true,

                type:actions.data.type,

                title:actions.data.title,

                ok:actions.data.ok,

                cancel:actions.data.cancel,

                close:actions.data.close,

                hide:actions.data.hide,

                abstract:actions.data.abstract

            };

        case AppAlertActions.APP_ALERT_HIDE:

            return {

                ...state,

              show:false

            };

        default:

            return state;

    }

};

export default AppAlert