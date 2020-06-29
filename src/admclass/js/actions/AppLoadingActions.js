//app层级的loading
const APP_LOADING_CLOSE = 'APP_LOADING_CLOSE';

const APP_LOADING_SHOW = 'APP_LOADING_SHOW';

const show = () =>{

    return dispatch=>{

        dispatch({type:APP_LOADING_SHOW});

    }

};

const hide = () =>{

    return dispatch=>{

        dispatch({type:APP_LOADING_CLOSE});

    }

};

export default {

    APP_LOADING_CLOSE,

    APP_LOADING_SHOW,

    hide,

    show

}