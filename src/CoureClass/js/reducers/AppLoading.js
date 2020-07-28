const defaultState = true;

export const APP_LOADING_HIDE = 'APP_LOADING_HIDE';

export const appLoadingHide = () => {

    return {type:APP_LOADING_HIDE}

};

const AppLoading = (state=defaultState,actions) =>{

    switch (actions.type) {

        case APP_LOADING_HIDE:

            return false;

        default:

            return state;

    }

};

export default AppLoading;

