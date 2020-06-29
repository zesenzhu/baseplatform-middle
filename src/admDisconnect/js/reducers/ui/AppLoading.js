import UpUIState from '../../actions/UpUIState';
const AppLoading = (state={appLoading:true},actions) => {
    switch (actions.type) {
        case UpUIState.APP_LOADING_OPEN:
            return {appLoading:true};
        case UpUIState.APP_LOADING_CLOSE:
            return {appLoading:false};
        default:
            return state;
    }
};
export default  AppLoading;