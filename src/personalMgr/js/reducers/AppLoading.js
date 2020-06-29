//app级别的加载中reducer
import AppLoadingActions from  '../actions/AppLoadingActions';

const AppLoading = (state={show:true},actions) =>{

    switch (actions.type) {

        case AppLoadingActions.APP_LOADING_SHOW:

            return {...state,show:true};

        case AppLoadingActions.APP_LOADING_HIDE:

            return {...state,show:false};

        default:

            return state;

    }

};

export default AppLoading;