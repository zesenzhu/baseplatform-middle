import ModuleCommonActions from '../../actions/ModuleCommonActions';

const Intellenct = (state={

    Url:''

},actions) => {

    switch (actions.type) {

        case ModuleCommonActions.MANAGER_INTELLENCT_URL_UPDATE:

            return {  ...state,Url:actions.data };

        default:

            return state;

    }

};

export default Intellenct;