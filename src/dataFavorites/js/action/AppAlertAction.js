const COLLECTOR_ALERT_SHOW = "COLLECTOR_ALERT_SHOW" //访问提示框显示
const COLLECTOR_ALERT_HIDE = "COLLECTOR_ALERT_HIDE" //访问提示框关闭

const alertQuery = ({ title, ok, cancel, close, okTitle, cancelTitle }) => {

    return dispatch => {


        dispatch({
            type: COLLECTOR_ALERT_SHOW,
            data: {
                type: "btn-query",
                title: title,
                ok: (ok ? ok() : closeAlert(dispatch)),
                cancel: (cancel ? cancel() : closeAlert(dispatch)),
                close: (close ? close() : closeAlert(dispatch)),
                okTitle: (okTitle ? okTitle : "确认"),
                cancelTitle: (cancelTitle ? cancelTitle : "取消")

            }

        })

    }
}

const alertTips = ({ title, ok, cancel, close, okTitle, cancelTitle }) => {

    console.log(title,ok);

    return dispatch => {
        dispatch({
            type: COLLECTOR_ALERT_SHOW,
            data: {
                type: "btn-tips",
                title: title,
                ok: (ok ? ok() : closeAlert(dispatch)),
                cancel: (cancel ? cancel() : closeAlert(dispatch)),
                close: (close ? close() : closeAlert(dispatch)),
                okTitle: (okTitle ? okTitle : "确认"),
                cancelTitle: (cancelTitle ? cancelTitle : "取消")
            }
        })
    }
}
const alertError = ({ title, ok, cancel, close, okTitle, cancelTitle }) => {

    return dispatch => {
        dispatch({
            type: COLLECTOR_ALERT_SHOW,
            data: {
                type: "btn-error",
                title: title,
                ok: (ok ? ok() : closeAlert(dispatch)),
                cancel: (cancel ? cancel() : closeAlert(dispatch)),
                close: (close ? close() : closeAlert(dispatch)),
                okTitle: (okTitle ? okTitle : "确认"),
                cancelTitle: (cancelTitle ? cancelTitle : "取消")
            }
        })
    }
}
const alertSuccess = ({ title }) => {

    return dispatch => {
        dispatch({
            type: COLLECTOR_ALERT_SHOW,
            data: {
                type: "success",
                title: title,
                // ok: (ok ? ok() : closeAlert(dispatch)),
                // cancel: (cancel ? cancel() : closeAlert(dispatch)),
                // close: (close ? close() : closeAlert(dispatch)),
                // okTitle: (okTitle ? okTitle : "确认"),
                // cancelTitle: (cancelTitle ? cancelTitle : "取消")
                hide:closeAlert(dispatch)
            }
        })
    }
}

const closeAlert = (dispatch) => {

    console.log(234);

    return () => {
        dispatch({
            type: COLLECTOR_ALERT_HIDE
        })
    }
}


export default {
    COLLECTOR_ALERT_SHOW,
    COLLECTOR_ALERT_HIDE,
    alertQuery,
    alertError,
    alertTips,
    closeAlert,
    alertSuccess
    
}