export const TERM_INFO_UPDATE = 'TERM_INFO_UPDATE';

export const termInfoUpdate = (payload)=>{

    return {type:TERM_INFO_UPDATE,data:payload};

};

export default {

    termInfoUpdate,

    TERM_INFO_UPDATE

}