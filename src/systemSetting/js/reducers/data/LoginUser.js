import UpDataState from  '../../action/data/UpDataState';
const LoginUser = (state = {isLogin:false,UserName:"",PhotoPath:"",UserID:'',Gender:"",UserType:"",UserClass:"",SchoolID:""}, actions)=>{
    switch (actions.type) {
        case UpDataState.GET_LOGIN_USER_INFO:
            
            return {isLogin:true,...actions.data};
        default:
            return state;
    }
};

export default LoginUser;