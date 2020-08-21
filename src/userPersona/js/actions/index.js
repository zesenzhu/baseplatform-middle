import apiActions from './apiActions';
import appAlertActions from './appAlertActions';
import loginUserActions from './loginUserActions';
import pageUsedTypeActions from './pageUsedTypeActions';
import MoreActions from './MoreActions';



const actions = {
    apiActions,
    appAlertActions,
    loginUserActions,
    pageUsedTypeActions,
    ...MoreActions
};
export default actions;