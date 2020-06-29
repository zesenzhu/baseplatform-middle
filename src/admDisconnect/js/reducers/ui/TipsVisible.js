
import UpUIState from '../../actions/UpUIState';
const TipsVisible = (state = { UserIDTipsVisible: false, UserNameTipsVisible: false }, actions) => {
    switch (actions.type) {
        case UpUIState.USER_NAME_TIPS_VISIBLE_OPEN:
            return Object.assign({}, state, { UserNameTipsVisible: true });
        case UpUIState.USER_NAME_TIPS_VISIBLE_CLOSE:
            return Object.assign({}, state, { UserNameTipsVisible: false });
        case UpUIState.USER_ID_TIPS_VISIBLE_OPEN:
            return Object.assign({}, state, { UserIDTipsVisible: true });
        case UpUIState.USER_ID_TIPS_VISIBLE_CLOSE:
            return Object.assign({}, state, { UserIDTipsVisible: false });
        default:
            return state;
    }
};
export default TipsVisible;