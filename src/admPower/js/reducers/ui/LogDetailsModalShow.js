import UpUIState from '../../actions/UpUIState';
const LogDetailsModalShow = (state={Show:false},actions) => {
    switch (actions.type) {
        case UpUIState.LOG_DETAILS_MODAL_OPEN:
            return {Show:true};
        case UpUIState.LOG_DETAILS_MODAL_CLOSE:
            return {Show:false};
        default:
            return state;
    }
};
export default  LogDetailsModalShow;