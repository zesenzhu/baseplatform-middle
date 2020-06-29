import ModuleActions from '../../actions/Teacher/ModuleActions';


const Modules = (state={

    ModuleGroups:[],

    ModulesLoading:true

},actions) => {

    switch (actions.type) {

        case ModuleActions.TEACHER_MODULE_GROUPS_UPDATE:

            return {

                ...state,

                ModuleGroups:actions.data

            };

        case ModuleActions.TEACHER_MODULE_LOADING_HIDE:

            return {

                ...state,

                ModulesLoading:false

            };

        case ModuleActions.TEACHER_MODULE_LOADING_SHOW:

            return {

                ...state,

                ModulesLoading:true

            };

        default:

            return state;

    }

};

export default Modules;