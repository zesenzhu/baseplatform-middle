const APP_ALERT_SHOW = 'APP_ALERT_SHOW';

const APP_ALERT_HIDE = 'APP_ALERT_HIDE';

const APP_SUCCESS_ALERT_SHOW = 'APP_SUCCESS_ALERT_SHOW';

const APP_SUCCESS_ALERT_HIDE = 'APP_SUCCESS_ALERT_HIDE';


//警告弹窗
export const btnWarnAlertShow = ({title,okShow,cancelShow,ok,cancel,close,abstract,okTitle,cancelTitle}) =>{

    return dispatch=>{

        dispatch({ type:APP_ALERT_SHOW,data:{

                type:'btn-warn',

                title,

                ok:ok?ok:hideAlert(dispatch),

                okTitle:okTitle?okTitle:"确定",

                cancelTitle:cancelTitle?cancelTitle:"取消",

                cancel:cancel?cancel:hideAlert(dispatch),

                cancelShow,

                okShow,

                close:close?close:hideAlert(dispatch)

            }});

    }

};

//询问弹窗
export const btnQueryAlertShow = ({title,okShow,cancelShow,ok,cancel,close,abstract,okTitle,cancelTitle}) =>{

    return dispatch=>{

        dispatch({ type:APP_ALERT_SHOW,data:{

                type:'btn-query',

                title,

                ok:ok?ok:hideAlert(dispatch),

                okTitle:okTitle?okTitle:"确定",

                cancelTitle:cancelTitle?cancelTitle:"取消",

                cancel:cancel?cancel:hideAlert(dispatch),

                cancelShow,

                okShow,

                close:close?close:hideAlert(dispatch)

            }});

    }

};

//错误弹窗
export const btnErrorAlertShow = ({title,okShow,cancelShow,ok,cancel,close,abstract,okTitle,cancelTitle}) =>{

    return dispatch=>{

        dispatch({ type:APP_ALERT_SHOW,data:{

                type:'btn-error',

                title,

                ok:ok?ok:hideAlert(dispatch),

                okTitle:okTitle?okTitle:"确定",

                cancelTitle:cancelTitle?cancelTitle:"取消",

                cancel:cancel?cancel:hideAlert(dispatch),

                cancelShow,

                okShow,

                close:close?close:hideAlert(dispatch)

            }});

    }

};


//成功出现
export const successAlertShow = ({title,hide}) =>{

    return dispatch=>{

        dispatch({ type:APP_SUCCESS_ALERT_SHOW,data:{

                title,

                hide:hide?hide:hideSuccessAlert(dispatch)

            }});

    }

};


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


export const hideAlert = (dispatch) => {

    return ()=>{ dispatch({type:APP_ALERT_HIDE});};

};

export const hideSuccessAlert = (dispatch) => {

    return ()=>{ dispatch({type:APP_SUCCESS_ALERT_HIDE});};

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