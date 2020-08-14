const GUIDE_STEP_CHANGE = 'GUIDE_STEP_CHANGE';

export const guiderStepChange = (payLoad) =>{

  return {type:GUIDE_STEP_CHANGE,data:payLoad};

};


const defaultState = 1;

const guideStep = (state=defaultState,actions) =>{

    switch (actions.type) {

        case GUIDE_STEP_CHANGE:

            return actions.data;

        default:

            return state;

    }

};

export default guideStep;