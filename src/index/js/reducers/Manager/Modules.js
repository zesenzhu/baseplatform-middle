import PageActions from '../../actions/PageActions';

const Modules = (state=[],actions) => {

    switch (actions.type) {

        case PageActions.MODULES_INFO_UPDATE:

            return [

                ...state,

               ...actions.data

            ];

        default:

            return state;

    }

};

export default Modules;