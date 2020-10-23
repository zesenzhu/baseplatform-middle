import UpDataState from '../../actions/UpDataState';



const LogRecordPreview = (state = { unreadLogCount: 0, LogRecord: {
    List:{},
    Total:0
} }, actions) => {
    switch (actions.type) {
                    
        case UpDataState.GET_LOG_RECORD_PREVIEW:
            let { List, ...others } = actions.data;
            // console.log(List, others)
            let list = handleData(List, actions.pageIndex, actions.pageSize);
            //// console.log(actions.GradeID||{value:List.newList[0].child.GradeID,title:List.newList[0].child.GradeName})
            return Object.assign({}, state, { LogRecord: { ...others, List:list } });
        default:
            return state;
    }
};

function handleData(data, pageIndex, pageSize) {
    let keyList = [];
    let pensonalList = [];
    let newList = data instanceof Array && data.map((child, index) => {
        let list = {}
        list.UserName = { key: index, 
            PhotoPath: child.PhotoPath_NoCache||child.PhotoPath, 
            UserName: child.UserName,
            UserID:  child.UserID};
        list.Gender = child.Gender;
        list.UserType_Txt = child.UserType_Txt;
        list.UserType = child.UserType;
        list.LogID = child.LogID;
        list.Deleted = child.Deleted;
        list.LogTime = child.LogTime;
        list.OperatorIP = child.OperatorIP;
        list.OperatorDetail=[]
        list.OperatorDetail.push({Content:child.OperationDetail});
        list.Operator = {OperatorName:child.OperatorName,OperatorID:child.OperatorID};
        list.key = index;
        keyList.push(list.key);
        list.OperationType_Txt = child.OperationType_Txt;
        list.OrderNo = { key: index, OrderNo: index + pageIndex * pageSize };
        let { UserID, Grader, GradeName, ClassName, PhotoPath, UserName, ...others } = child;
        list.Others = others;
        let person = {
            userName: child.UserName,
            userImg: child.PhotoPath_NoCache||child.PhotoPath,
            Gende: child.Gender,
            userText:child.Sign,
            userID: child.UserID,
            userGrade: child.GradeName,
            userClass: child.ClassName,
            userIDCard: child.IDCardNo,
            userPhone: child.Telephone,
            userMail: child.Email,
            userAddress: child.HomeAddress
        }
        pensonalList.push(person)
        return { ...list, child }

    })

    return { newList, keyList, pensonalList };
}

export default LogRecordPreview;