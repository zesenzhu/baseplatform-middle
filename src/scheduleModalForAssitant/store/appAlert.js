export const APP_ALERT_HIDE = 'APP_ALERT_HIDE';

export const APP_ALERT_SHOW = 'APP_ALERT_SHOW';

export const showWarnAlert = ({title,ok,okTitle,cancelTitle,close,okShow,cancelShow,cancel,dispatch}) => {

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

};

export const showErrorAlert = ({title,ok,okTitle,cancelTitle,close,okShow,cancelShow,cancel,dispatch}) => {

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

};

export const showSuccessAlert = ({title,hide,dispatch}) => {

    dispatch({ type:APP_ALERT_SHOW,data:{

            type:'success',

            title,

            hide:hideAlert(dispatch)

        }});

};


export const hideAlert = (dispatch) => {

    return e=>dispatch({type:APP_ALERT_HIDE});

};

