export const APP_ALERT_SHOW = 'APP_ALERT_SHOW';

export const APP_ALERT_HIDE = 'APP_ALERT_HIDE';

export const APP_SUCCESS_ALERT_SHOW = 'APP_SUCCESS_ALERT_SHOW';

export const APP_SUCCESS_ALERT_HIDE = 'APP_SUCCESS_ALERT_HIDE';



//警告弹窗
export const hideAlert = (dispatch) => {

    return ()=>{ dispatch({type:APP_ALERT_HIDE});};

};

export const hideSuccessAlert = (dispatch) => {

    return ()=>{ dispatch({type:APP_SUCCESS_ALERT_HIDE});};

};


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