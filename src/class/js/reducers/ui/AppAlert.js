import UpUIState from '../../actions/UpUIState';
const AppAlert = (state={show:false,title:'',type:0},actions) => {
    switch (actions.type) {
        case UpUIState.SHOW_ERROR_ALERT:
            return {show:true,
                title:actions.data.title,
                type:actions.data.type,
                abstract:actions.data.abstract,
                ok:actions.data.ok,
                cancel:actions.data.cancel,
                hide:actions.data.hide,
                close:actions.data.close
            };
        case UpUIState.CLOSE_ERROR_ALERT:
            return {...state,show:false};
        default:
            return state;
    }
};
export default  AppAlert