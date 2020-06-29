import UpUIState from '../../actions/UpUIState';
const TeachingSolutionDetailsModal = (state = { Show: false, ResetNameShow: false }, actions) => {
    switch (actions.type) {
        case UpUIState.TEACHING_SOLUTION_DETAILS_MODAL_OPEN:
            return Object.assign({}, state, { Show: true });
        case UpUIState.TEACHING_SOLUTION_DETAILS_MODAL_CLOSE:
            return Object.assign({}, state, { Show: false });
        case UpUIState.RESET_NAME_MODAL_OPEN:
            return Object.assign({}, state, { ResetNameShow: true });
        case UpUIState.RESET_NAME_MODAL_CLOSE:
            return Object.assign({}, state, { ResetNameShow: false });

        default:
            return state;
    }
};
export default TeachingSolutionDetailsModal;