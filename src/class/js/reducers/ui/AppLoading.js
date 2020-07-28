import UpUIState from '../../actions/UpUIState';
const AppLoading = (state={show:true},actions) => {
    switch (actions.type) {
        case UpUIState.APP_LOADING_SHOW:
            return {show:true};
        case UpUIState.APP_LOADING_CLOSE:
            return {show:false};
        default:
            return state;
    }
};
export default  AppLoading;