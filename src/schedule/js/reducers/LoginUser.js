import LoginUserActions from '../actions/LoginUserActions';
//登录用户的加载中
const LoginUser = (state={},actions) => {

    switch (actions.type) {

        case LoginUserActions.UPDATE_LOGIN_USER:

            return {...state,...actions.data};

        default:

            return state;

    }

};

export default LoginUser;