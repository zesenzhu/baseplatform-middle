export const USER_ARCHIVES_UPDATE = 'USER_ARCHIVES_UPDATE';

export const userArchivesUpdate = (payload)=>{

    return {type:USER_ARCHIVES_UPDATE,data:payload};

};

export default {

    USER_ARCHIVES_UPDATE,

    userArchivesUpdate

}