import UpUIState from './UpUIState';



const alertWarn = ({dispatch,title='',ok,cancel,close,hide}) =>{

    return dispatch=>{

        dispatch(
            UpUIState.showErrorAlert({
                type: "btn-warn",
                title:title,
                ok:ok?ok:e=>dispatch(UpUIState.hideErrorAlert()),
                cancel:cancel?cancel:e=>dispatch(UpUIState.hideErrorAlert()),
                close:close?close:e=>dispatch(UpUIState.hideErrorAlert()),
                onHide:hide?hide:e=>dispatch(UpUIState.hideErrorAlert())
            })
        );

    };

};

const alertError = ({title='',ok,cancel,close,hide}) =>{

 return dispatch =>{

     dispatch(
         UpUIState.showErrorAlert({
             type: "btn-error",
             title:title,
             ok:ok?ok:e=>dispatch(UpUIState.hideErrorAlert()),
             cancel:cancel?cancel:e=>dispatch(UpUIState.hideErrorAlert()),
             close:close?close:e=>dispatch(UpUIState.hideErrorAlert()),
             onHide:hide?hide:e=>dispatch(UpUIState.hideErrorAlert())
         })
     );

 }

};

const alertSuccess = ({title='',ok,cancel,close,hide}) =>{

    return dispatch =>{

        dispatch(
            UpUIState.showErrorAlert({
                type: "success",
                title:title,
                ok:ok?ok:e=>dispatch(UpUIState.hideErrorAlert()),
                cancel:cancel?cancel:e=>dispatch(UpUIState.hideErrorAlert()),
                close:close?close:e=>dispatch(UpUIState.hideErrorAlert()),
                onHide:hide?hide:e=>dispatch(UpUIState.hideErrorAlert())
            })
        );

    }

};

export default {

    alertWarn,

    alertError,

    alertSuccess

}