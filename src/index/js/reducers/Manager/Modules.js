import ManagerPageActions from '../../actions/Manager/ManagerPageActions';

const Modules = (state=[],actions) => {

    switch (actions.type) {

        case ManagerPageActions.MODULES_INFO_UPDATE:

            return [

                ...state,

               ...actions.data

            ];

        default:

            return state;

    }

};

export default Modules;