const APP_SUCCESS_ALERT_SHOW = 'APP_SUCCESS_ALERT_SHOW';

const APP_SUCCESS_ALERT_HIDE = 'APP_SUCCESS_ALERT_HIDE';

const AlertSuccess = ({type='success',title='',hide}) => {

    return dispatch =>{

        dispatch({type:APP_SUCCESS_ALERT_SHOW,data:{


                type:type,

                title,

                hide:hide?hide():()=>AlertHide(dispatch)

            }})

    }

};

const AlertHide = (dispatch) => {

    console.log(123);

    return dispatch({type:APP_SUCCESS_ALERT_HIDE});

};

export default {

    APP_SUCCESS_ALERT_HIDE,

    APP_SUCCESS_ALERT_SHOW,

    AlertSuccess

}