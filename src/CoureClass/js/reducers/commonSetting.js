const LOG_COUNT_UPDATE = 'LOG_COUNT_UPDATE';

const IFRAME_CHANGE = 'IFRAME_CHANGE';

const defaultState = {

  LogCount:0,

  iFrame:false

};

export const logCountUpdate = (payLoad) =>{

  return {type:LOG_COUNT_UPDATE,data:payLoad};

};

export const iFrameChange = (payLoad) =>{

    return {type:IFRAME_CHANGE,data:payLoad};

};


const commonSetting = (state=defaultState,actions) => {

        switch (actions.type) {

            case LOG_COUNT_UPDATE:

                return { ...state,LogCount:actions.data };

            case IFRAME_CHANGE:

                return {...state,iFrame:actions.data};

            default:

                return state;

        }

};

export default commonSetting;