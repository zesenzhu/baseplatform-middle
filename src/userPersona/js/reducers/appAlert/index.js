import {APP_ALERT_SHOW,APP_ALERT_HIDE,APP_SUCCESS_ALERT_SHOW,APP_SUCCESS_ALERT_HIDE} from '../../actions/appAlertActions';


const defaultState = {

    appAlert:{

        show:false,

        type:"btn-warn",

        title:"提示",

        ok:"",

        cancel:"",

        close:"",

        hide:"",

        abstract:"",

        cancelShow:'n',

        okShow:'y',

        okTitle:'',

        cancelTitle:''

    },

    appSuccessAlert:{

        show:false,

        type:"success",

        title:"提示",

        hide:""

    }

};


const Index = (state=defaultState, actions) => {

    switch (actions.type) {

        case APP_ALERT_SHOW:

            return {

                ...state,

                appAlert:{

                   ...state.appAlert,

                   show:true,

                   type:actions.data.type,

                   title:actions.data.title,

                   ok:actions.data.ok,

                   cancel:actions.data.cancel,

                   close:actions.data.close,

                   hide:actions.data.hide,

                   abstract:actions.data.abstract,

                   cancelShow:actions.data.cancelShow==='y'?'y':'n',

                   okShow:actions.data.okShow==='n'?'n':'y',

                   okTitle:actions.data.okTitle,

                   cancelTitle:actions.data.cancelTitle

               },

                appSuccessAlert:{

                   ...state.appSuccessAlert,

                   show:false

               }

            };

        case APP_ALERT_HIDE:

            return {

                appAlert:{

                    ...state.appAlert,

                    show:false

                },

                appSuccessAlert:{

                    ...state.appSuccessAlert,

                    show:false

                }

            };

        case APP_SUCCESS_ALERT_SHOW:

            return {

                ...state,

                appAlert:{

                    ...state.appAlert,

                    show:false,

                },

                appSuccessAlert:{

                    ...state.appSuccessAlert,

                    show:true,

                    title:actions.data.title,

                    hide:actions.data.hide

                }

            };

        case APP_SUCCESS_ALERT_HIDE:

            return {

                appAlert:{

                    ...state.appAlert,

                    show:false

                },

                appSuccessAlert:{

                    ...state.appSuccessAlert,

                    show:false

                }

            };

        default:

            return state;

    }

};

export default Index