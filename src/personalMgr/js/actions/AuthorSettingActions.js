import ApiActions from './ApiActions';

import AppAlertActions from './AppAlertActions';

const AUTHOR_SETTING_PAGE_INIT = 'AUTHOR_SETTING_PAGE_INIT';

const AUTHOR_SETTING_LOADING_SHOW = 'AUTHOR_SETTING_LOADING_SHOW';

const AUTHOR_SETTING_LOADING_HIDE = 'AUTHOR_SETTING_LOADING_HIDE';

const AUTHOR_SETTING_IFRAME_LOADING_SHOW = 'AUTHOR_SETTING_IFRAME_LOADING_SHOW';

const AUTHOR_SETTING_IFRAME_LOADING_HIDE = 'AUTHOR_SETTING_IFRAME_LOADING_HIDE';

const AUTHOR_SETTING_BIND_MODAL_SHOW = 'AUTHOR_SETTING_BIND_MODAL_SHOW';

const AUTHOR_SETTING_BIND_MODAL_HIDE = 'AUTHOR_SETTING_BIND_MODAL_HIDE';

const PageInit = () => {

 return (dispatch,getState)=>{

     dispatch({type:AUTHOR_SETTING_LOADING_SHOW});

    const { UserID } = getState().LoginUser;

    ApiActions.GetBindOpenInfo({UserID,dispatch}).then(data=>{

        if (data){

            dispatch({type:AUTHOR_SETTING_PAGE_INIT,data:data});

            dispatch({type:AUTHOR_SETTING_LOADING_HIDE});

        }

    });

 }

};


//取消绑定

const CancelBind = (params) => {

    return (dispatch,getState) => {

        const { UserID } = getState().LoginUser;

        const { OpenID,OpenType } = params;

        ApiActions.DeleteOpenBinder({UserID,OpenID,OpenType,dispatch}).then(data=>{

            if (data===0){

                dispatch(AppAlertActions.alertSuccess({title:"解除绑定成功"}));

                dispatch(PageInit());

            }

        })

    }

};



export default {

    AUTHOR_SETTING_PAGE_INIT,

    AUTHOR_SETTING_LOADING_SHOW,

    AUTHOR_SETTING_LOADING_HIDE,

    AUTHOR_SETTING_BIND_MODAL_SHOW,

    AUTHOR_SETTING_BIND_MODAL_HIDE,

    AUTHOR_SETTING_IFRAME_LOADING_SHOW,

    AUTHOR_SETTING_IFRAME_LOADING_HIDE,

    PageInit,

    CancelBind

};