import UpDataState from '../../actions/UpDataState';



const TeacherMsg = (state = '', actions) => {
    switch (actions.type) {
        case UpDataState.GET_TEACHER_MSG:
            
            let newData = handleData(actions.data)
            
            return { data:newData };
        default:
            return state;
    }
};
function handleData(data){
    // console.log(data)
    return {
        userName:data.UserName,
        userImg:data.PhotoPath,
        Gende:data.Gender,
        userText:data.Sign,
        userID:data.UserID,
        userGrade:data.GradeName,
        userClass:data.ClassName,
        userIDCard:data.IDCardNo,
        userPhone:data.Telephone,
        userMail:data.Email,
        userAddress:data.HomeAddress,
        titleName:data.TitleName,
        subjectNames:data.SubjectNames,
        source:data.Source,
        position:data.Position
    }
}
export default TeacherMsg;