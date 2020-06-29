import RouterSetActions from '../actions/RouterSetActions';

const RouterSet = (state={

    router:'/'

},actions) => {

    switch (actions.type) {

        case RouterSetActions.ROUTER_SET_TO_IMPORT:

            return { ...state,router:"/import" };

        case RouterSetActions.ROUTER_SET_TO_DEFAULT:

            return { ...state,router:"/" };

        default:

            return state;

    }

};

export default RouterSet