import MCIActions from '../actions/ModuleCommonInfoActions';

const ModuleCommonInfo = (state={

    menuActive:''

},actions) => {

    switch (actions.type) {

        case MCIActions.MODULE_COMMON_INFO_MENU_CHANGE:

            return { ...state,menuActive:actions.data};

        default:

            return state;

    }

};

export default ModuleCommonInfo