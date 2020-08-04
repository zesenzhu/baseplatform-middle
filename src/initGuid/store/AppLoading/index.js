export const APP_LOADING_SHOW = 'APP_LOADING_SHOW';

export const APP_LOADING_HIDE = 'APP_LOADING_HIDE';

const appLoadingHide = () =>{

  return { type:APP_LOADING_HIDE }

};

const defaultState = true;

const AppLoading = (state=defaultState,actions ) => {


    switch (actions.type) {

        case APP_LOADING_HIDE:

            return false;

        case APP_LOADING_SHOW:

            return true;

        default:

            return state;

    }


};

export default AppLoading;