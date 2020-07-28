import UpDataState from "../../actions/UpDataState";
// import DataState from "./../DataState";
import Public from "../../../../common/js/public";
const RegisterMsg = (
  state = {
    UserID:'',
    UserName:'',
    Gender:'',
    GradeID:'',
    ClassID:'',
    Pwd:'',
    SubjectIDs:[],
    SchoolID:'',
    ShortName:''
  },
  actions
) => {
  switch (actions.type) {
    case UpDataState.SET_USER_MSG:
      return Object.assign({}, state, { ...actions.data });
   
    default:
      return state;
  }
};



export default RegisterMsg;
