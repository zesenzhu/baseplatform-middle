import BTCActions from '../actions/BsToCsActions';

const BsToCs = (state={

    CanVisit:false

},actions) => {

    switch (actions.type) {

        case BTCActions.BTC_TO_TRUE:

            return { CanVisit:true };

        case BTCActions.BTC_TO_FALSE:

            return { CanVisit:false };

        default:

            return state;

    }

};

export default BsToCs;