import ASActions from '../actions/AppAlertSuccess';

const AppAlertSuccess = (state={show:false,title:'',type:"success",hide:()=>{}},actions) => {

    switch (actions.type) {

        case ASActions.APP_SUCCESS_ALERT_SHOW:

            return {

                show:true,

                title:actions.data.title,

                type:actions.data.type?actions.data.type:'success',

                hide:actions.data.hide

            };

        case ASActions.APP_SUCCESS_ALERT_HIDE:

            return {...state,show:false};

        default:

            return state;

    }

};

export default  AppAlertSuccess;