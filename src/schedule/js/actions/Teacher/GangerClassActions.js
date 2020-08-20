import ApiActions from '../ApiActions';

import AppAlertActions from '../AppAlertActions';

import AppLoadingActions from '../AppLoadingActions';

const TEACHER_GANGER_CLASSES_UPDATE = 'TEACHER_GANGER_CLASSES_UPDATE';

const GetGangerClasses = () => {

    return (dispatch,getState)=>{

        const { UserID } = JSON.parse(sessionStorage.getItem('UserInfo'));

        ApiActions.GetMyClass({UserID,dispatch}).then(data=>{

            if (data.length>0){

                dispatch({type:TEACHER_GANGER_CLASSES_UPDATE,data:data});

            }else{

                dispatch(AppAlertActions.alertWarn({title:"您未担任任何班级的班主任!"}));

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

            }

        });

    }

};

export default {

    TEACHER_GANGER_CLASSES_UPDATE,

    GetGangerClasses

}