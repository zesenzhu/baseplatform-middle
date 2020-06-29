import UpUIState from '../../actions/UpUIState';
const AppModal = (state = { AddModal: false, EditModal: false }, actions) => {
    switch (actions.type) {
        case UpUIState.ADD_MODAL_OPEN:
            return Object.assign({}, state, { AddModal: true });
        case UpUIState.ADD_MODAL_CLOSE:
            return Object.assign({}, state, { AddModal: false });
        case UpUIState.EDIT_MODAL_OPEN:
            return Object.assign({}, state, { EditModal: true });
        case UpUIState.EDIT_MODAL_CLOSE:
            return Object.assign({}, state, { EditModal: false });
        
        default:
            return state;
    }
};
export default AppModal;