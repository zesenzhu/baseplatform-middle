import UpUIState from '../../actions/UpUIState';
const AppLoading = (state = { modalLoading:false,appLoading: true, RightLoading: false, TableLoading: false }, actions) => {
    switch (actions.type) {
        case UpUIState.APP_LOADING_OPEN:
            return Object.assign({}, state, { appLoading: true });
        case UpUIState.APP_LOADING_CLOSE:
            return Object.assign({}, state, { appLoading: false });
        case UpUIState.RIGHT_LOADING_OPEN:
            return Object.assign({}, state, { RightLoading: true });
        case UpUIState.RIGHT_LOADING_CLOSE:
            return Object.assign({}, state, { RightLoading: false });
        case UpUIState.TABLE_LOADING_OPEN:
            return Object.assign({}, state, { TableLoading: true });
        case UpUIState.TABLE_LOADING_CLOSE:
            return Object.assign({}, state, { TableLoading: false });
        case UpUIState.MODAL_LOADING_OPEN:
            return Object.assign({}, state, { modalLoading: true });
        case UpUIState.MODAL_LOADING_CLOSE:
            return Object.assign({}, state, { modalLoading: false });
        default:
            return state;
    }
};
export default AppLoading;