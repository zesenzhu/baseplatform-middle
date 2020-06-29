import AppLoadingActions from '../actions/AppLoadingActions';

const AppLoading = (state = {

    show: true,
    modalLoading: false,
    customLoading: false,
    customOpacityLoading:false

}, actions) => {

    switch (actions.type) {

        case AppLoadingActions.APP_LOADING_SHOW:

            return {

                ...state,

                show: true,

            };

        case AppLoadingActions.APP_LOADING_HIDE:

            return {

                ...state,

                show: false,

            };
        case AppLoadingActions.MODAL_LOADING_OPEN:

            return Object.assign({}, state, {

                modalLoading: true

            });

        case AppLoadingActions.MODAL_LOADING_CLOSE:

            return Object.assign({}, state, {

                modalLoading: false

            });
        case AppLoadingActions.CUSTOM_LOADING_OPEN:

            return Object.assign({}, state, {

                customLoading: true

            });

        case AppLoadingActions.CUSTOM_LOADING_CLOSE:

            return Object.assign({}, state, {

                customLoading: false

            });
        case AppLoadingActions.CUSTOM_OPACITY_LOADING_OPEN:

            return Object.assign({}, state, {

                customOpacityLoading: true

            });

        case AppLoadingActions.CUSTOM_OPACITY_LOADING_CLOSE:

            return Object.assign({}, state, {

                customOpacityLoading: false

            });
        default:

            return state;

    }

};

export default AppLoading