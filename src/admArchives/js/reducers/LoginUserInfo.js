const LoginUserInfo = (state = {isLogin:false,username:"",image:""},actions)=>{
    switch (actions.type) {
        case "login":
            return {...state};
        default:
            return state;
    }
};
export default LoginUserInfo;