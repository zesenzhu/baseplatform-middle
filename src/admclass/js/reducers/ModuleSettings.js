import ModuleActions from '../actions/ModuleActions';

import logo from '../../images/logo.png';

const ModuleSetting = (state={

    ShowLeftMenu:true,

    ShowBarner:true,

    ModuleInfo:{

        cnname:'行政班管理',

        enname:"Administration class management",

        image:logo

    }

},actions) => {

    switch (actions.type) {

        case ModuleActions.MODULE_SETTING_INFO_UPDATE:

            return {

                ...state,

                ...actions.data

            };

        default:

            return state;

    }

};

export default ModuleSetting;