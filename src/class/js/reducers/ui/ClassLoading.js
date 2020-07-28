import UpUIState from '../../actions/UpUIState';
const ClassLoading = (state={show:true},actions) => {
    switch (actions.type) {
        case UpUIState.CLASS_LOADING_HIDE:
            return {...state,show:false};
        case UpUIState.CLASS_LOADING_SHOW:
            return {...state,show:true};
        default:
            return state;
    }
};
export default ClassLoading;