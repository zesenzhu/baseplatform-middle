const SCHOOL_TYPE_CHANGE = 'SCHOOL_TYPE_CHANGE';

export const schoolTypeChange = (payLoad) => {

  return { type:SCHOOL_TYPE_CHANGE,data:payLoad };

};

const defaultState = 'middle';

const schoolType = (state=defaultState,actions) =>{

    switch (actions.type) {

        case SCHOOL_TYPE_CHANGE:

            return actions.data;

        default:

            return state;

    }

};

export default schoolType;