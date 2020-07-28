const LOG_COUNT_UPDATE = 'LOG_COUNT_UPDATE';

const defaultState = {

  LogCount:0

};

export const logCountUpdate = (payLoad) =>{

  return {type:LOG_COUNT_UPDATE,data:payLoad};

};


const commonSetting = (state=defaultState,actions) => {

        switch (actions.type) {

            case LOG_COUNT_UPDATE:

                return { ...state,LogCount:actions.data };

            default:

                return state;

        }

};

export default commonSetting;