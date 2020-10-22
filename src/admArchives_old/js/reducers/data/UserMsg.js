import UpDataState from '../../actions/UpDataState';



const UserMsg = (state = {isNull:true}, actions) => {
    switch (actions.type) {
        case UpDataState.GET_TEACHER_MSG:

            let newData = handleData(actions.data)

            return Object.assign({}, state, { ...newData });
        case UpDataState.GET_USER_MSG:

            let Data = handleData(actions.data)
            // console.log(Data)
            return Object.assign({}, state, { ...Data });
        default:
            return state;
    }
};
function handleData(data) {
    // console.log(data===null)
    if(data===null||(!data&&!(data instanceof Array))){
        return {isNull:true}
    }
    return {
        userName: data.UserName,
        userImg: data.PhotoPath_NoCache||data.PhotoPath,
        Gende: data.Gender,
        userText: data.Sign,
        userID: data.UserID,
        userGrade: data.GradeName,
        userClass: data.ClassName,
        userIDCard: data.IDCardNo,
        userPhone: data.Telephone,
        userMail: data.Email,
        userAddress: data.HomeAddress,
        titleName: data.TitleName,
        subjectName: data.SubjectNames,
        source: data.Source,
        Position: data.Position,
        sign: data.Sign,
        userType: data.UserType,
        isNull:false
    }
}
export default UserMsg;