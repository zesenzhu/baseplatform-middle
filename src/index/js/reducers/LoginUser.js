import LoginUserActions from '../actions/LoginUserActions';

const LoginUser = (state={},actions) => {

    switch (actions.type) {

        case LoginUserActions.LOGIN_USER_INFO_UPDATE:

            return { ...state, ...actions.data };

        default:

            return state;

    }

};

export default LoginUser