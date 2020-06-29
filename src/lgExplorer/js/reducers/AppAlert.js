import AppAlertAciton from '../action/AppAlertAction'
const AppAlert = (state = {
    type: 1,

    title: "提示",

    show: false,

    abstract: '',

    hide: '',

    cancel: '',

    ok: '',

    okTitle: '',

    cancelTitle: ''


}, action) => {
    switch (action.type) {
        case AppAlertAciton.SUBSYSTEM_ALERT_SHOW:
            return {
                ...state,
                show: true,
                ...action.data
            }

        case AppAlertAciton.SUBSYSTEM_ALERT_HIDE:
            return {
                ...state,
                show: false,
                ...action.data
            }
        default:
            return state;
    }
};
export default AppAlert;