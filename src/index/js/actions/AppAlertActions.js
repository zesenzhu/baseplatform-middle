//集中处理alert弹窗信息

const APP_ALERT_SHOW = 'APP_ALERT_SHOW';

const APP_ALERT_HIDE = 'APP_ALERT_HIDE';


const alertSuccess = ({title,hide}) => {

    return dispatch => {

        dispatch({

            type:APP_ALERT_SHOW,

            data:{

               type:"success",

               title:title,

               hide:(hide?hide():closeAlert(dispatch))

            }

        });

    }

};

const alertAutoWarn = ({title,hide}) => {

    return dispatch => {

        dispatch({

            type:APP_ALERT_SHOW,

            data:{

               type:"warn",

               title:title,

               hide:(hide?hide():closeAlert(dispatch))

            }

        });

    }

};

const alertError = ({title,cancel,close,ok}) => {

    return dispatch => {

        dispatch({

            type:APP_ALERT_SHOW,

            data:{

                type:"btn-error",

                title:title,

                cancel:(cancel?cancel():closeAlert(dispatch)),

                close:(close?close():closeAlert(dispatch)),

                ok:(ok?ok():closeAlert(dispatch))

            }

        });

    }

};

const alertWarn = ({title,cancel,ok,close}) => {

    return dispatch => {

        dispatch({

            type:APP_ALERT_SHOW,

            data:{

                type:"btn-warn",

                title:title,

                cancel:(cancel?cancel():closeAlert(dispatch)),

                close:(close?close():closeAlert(dispatch)),

                ok:(ok?ok():closeAlert(dispatch))

            }

        });

    }

};

const alertQuery = ({title,cancel,close,ok}) => {

    return dispatch => {

        dispatch({

            type:APP_ALERT_SHOW,

            data:{

                type:"btn-query",

                title:title,

                cancel:(cancel?cancel():closeAlert(dispatch)),

                close:(close?close():closeAlert(dispatch)),

                ok:(ok?ok():closeAlert(dispatch))

            }

        });

    }

};

const alertTips = ({title,cancel,ok,close}) => {

    return dispatch => {

        dispatch({

            type:APP_ALERT_SHOW,

            data:{

                type:"btn-tips",

                title:title,

                cancel:(cancel?cancel():closeAlert(dispatch)),

                close:(close?close():closeAlert(dispatch)),

                ok:(ok?ok():closeAlert(dispatch))

            }

        });

    }

};



const closeAlert = (dispatch) => {

  return () => dispatch({type:APP_ALERT_HIDE});

};

export default {

    APP_ALERT_HIDE,

    APP_ALERT_SHOW,

    alertSuccess,

    alertError,

    alertWarn,

    alertTips,

    alertQuery,

    alertAutoWarn

}