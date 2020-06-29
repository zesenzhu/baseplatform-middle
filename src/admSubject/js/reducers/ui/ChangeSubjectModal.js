import UpUIState from '../../actions/UpUIState';
const ChangeSubjectModal = (state = { changeModalShow: false, addModalShow: false }, actions) => {
    switch (actions.type) {
        case UpUIState.CHANGE_SUBJECT_MODAL_OPEN:
            return Object.assign({}, state, { changeModalShow: true });
        case UpUIState.CHANGE_SUBJECT_MODAL_CLOSE:
            return Object.assign({}, state, { changeModalShow: false });
        case UpUIState.ADD_SUBJECT_MODAL_OPEN:
            return Object.assign({}, state, { addModalShow: true });
        case UpUIState.ADD_SUBJECT_MODAL_CLOSE:
            return Object.assign({}, state, { addModalShow: false });
        default:
            return state;
    }
};
export default ChangeSubjectModal;