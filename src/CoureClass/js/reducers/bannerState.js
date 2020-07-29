export const BANNER_SHOW = 'BANNER_SHOW';

export const BANNER_HIDE = 'BANNER_HIDE';

export const BANNER_TAB_SHOW = 'BANNER_TAB_SHOW';

export const BANNER_TAB_HIDE = 'BANNER_TAB_HIDE';

export const BANNER_LOG_SHOW = 'BANNER_LOG_SHOW';

export const BANNER_LOG_HIDE = 'BANNER_LOG_HIDE';

export const BANNER_BTN_HIDE = 'BANNER_BTN_HIDE';

export const BANNER_BTN_SHOW = 'BANNER_BTN_SHOW';

const defaultState = {

  tab:true,

  log:true,

  show:true,

  btn:false

};

export const bannerShow = ()=>{

    return {type:BANNER_SHOW};

};

export const bannerHide = ()=>{

    return {type:BANNER_HIDE};

};


export const bannerTabShow = ()=>{

    return {type:BANNER_TAB_SHOW};

};

export const bannerTabHide = ()=>{

    return {type:BANNER_TAB_HIDE};

};

export const bannerLogHide = ()=>{

    return {type:BANNER_LOG_HIDE};

};

export const bannerLogShow = ()=>{

    return {type:BANNER_LOG_SHOW};

};

export const bannerBtnShow = ()=>{

    return {type:BANNER_BTN_SHOW};

};

export const bannerBtnHide = ()=>{

    return {type:BANNER_BTN_HIDE};

};


const bannerState = (state=defaultState,actions)=>{

    switch (actions.type){

        case BANNER_SHOW:

            return {...state,show:true};

        case BANNER_HIDE:

            return {...state,show:false};

        case BANNER_TAB_SHOW:

            return {...state,tab:true};

        case BANNER_TAB_HIDE:

            return {...state,tab:false};

        case BANNER_LOG_SHOW:

            return {...state,log:true};

        case BANNER_LOG_HIDE:

            return {...state,log:false};

        case BANNER_BTN_SHOW:

            return {...state,btn:true};

        case BANNER_BTN_HIDE:

            return {...state,btn:false};

        default:

            return state;

    }

};

export default bannerState;