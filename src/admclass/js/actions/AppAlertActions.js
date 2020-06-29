const SHOW_ERROR_ALERT = 'SHOW_ERROR_ALERT';

const CLOSE_ERROR_ALERT = 'CLOSE_ERROR_ALERT';

const alertSuccess = ({title,hide}) => {

    return dispatch => {

        dispatch({

            type:SHOW_ERROR_ALERT,

            data:{

               type:"success",

                title:title,

                hide:(hide?hide():closeAlert(dispatch))

            }

        });

    }

};

const alertError = ({title,cancel,close,ok}) => {

    return dispatch => {

        dispatch({

            type:SHOW_ERROR_ALERT,

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

            type:SHOW_ERROR_ALERT,

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

const alertQuery = ({title,cancel,ok,close}) => {

    return dispatch => {

        dispatch({

            type:SHOW_ERROR_ALERT,

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

            type:SHOW_ERROR_ALERT,

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

  return () => dispatch({type:CLOSE_ERROR_ALERT});

};

export default {

    alertSuccess,

    alertError,

    alertWarn,

    alertTips,

    alertQuery,

    SHOW_ERROR_ALERT,

    CLOSE_ERROR_ALERT

}