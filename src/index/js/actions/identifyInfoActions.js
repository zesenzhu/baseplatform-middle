export const IDENTIFY_INFO_CHANGE = 'IDENTIFY_INFO_CHANGE';

export const identifyChange = (payLoad)=>{

    return {type:IDENTIFY_INFO_CHANGE,data:payLoad};

};

export default {

    IDENTIFY_INFO_CHANGE,

    identifyChange

}