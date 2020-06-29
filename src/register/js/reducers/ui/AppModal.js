import UpUIState from "../../actions/UpUIState";
const AppModal = (state = { AgreementModal: false }, actions) => {
  switch (actions.type) {
    case UpUIState.AGREEMENT_MODAL_OPEN:
      return Object.assign({}, state, { AgreementModal: true });
    case UpUIState.AGREEMENT_MODAL_CLOSE:
      return Object.assign({}, state, { AgreementModal: false });

    default:
      return state;
  }
};
export default AppModal;
