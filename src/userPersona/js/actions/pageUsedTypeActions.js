export const PAGE_USED_TYPE_CHANGE = 'PAGE_USED_TYPE_CHANGE';

export const pageUsedChange = (payload) =>{

    return {type:PAGE_USED_TYPE_CHANGE,data:payload};

};

export default {

    PAGE_USED_TYPE_CHANGE,

    pageUsedChange

}