export const SYSTEM_WEB_URL_UPDATE = 'SYSTEM_WEB_URL_UPDATE';

export const systemUrlUpdate = (payload)=>{

    return {type:SYSTEM_WEB_URL_UPDATE,data:payload};

};

export default {

    SYSTEM_WEB_URL_UPDATE,

    systemUrlUpdate

}