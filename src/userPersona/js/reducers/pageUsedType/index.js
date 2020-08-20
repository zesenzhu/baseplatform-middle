import {PAGE_USED_TYPE_CHANGE} from "../../actions/pageUsedTypeActions";

const defaultState = '';

const pageUsedType = (state=defaultState,actions)=>{

    switch (actions.type) {

        case PAGE_USED_TYPE_CHANGE:

            return actions.data;

        default:

            return state;

    }

};

export default pageUsedType;