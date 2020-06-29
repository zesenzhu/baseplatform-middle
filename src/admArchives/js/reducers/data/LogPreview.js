import UpDataState from '../../actions/UpDataState';



const LogPreview = (state = {
    unreadLogCount: 0, unreadLog: {
        List: {
            PageIndex:0
        },
        Add: 0,
        Delete: 0,
        Edit: 0,
        Total: 0
    }
}, actions) => {
    switch (actions.type) {
        case UpDataState.GET_UNREAD_LOG_COUNT_PREVIEW:
            return Object.assign({}, state, { unreadLogCount: actions.data })
        // case UpDataState.GET_UNREAD_LOG_PREVIEW:
        // return Object.assign({},state,{unreadLog:actions.data})               
        case UpDataState.GET_UNREAD_LOG_PREVIEW:
            let { List, ...others } = actions.data;
            // console.log(List, others)
            let list = handleData(List, actions.pageIndex, actions.pageSize);
            //// console.log(actions.GradeID||{value:List.newList[0].child.GradeID,title:List.newList[0].child.GradeName})
            return Object.assign({}, state, { unreadLog: { ...others, List: list } });
        default:
            return state;
    }
};

function handleData(data, pageIndex, pageSize) {
    let keyList = [];
    let pensonalList = [];
    let newList = data instanceof Array && data.map((child, index) => {
        let list = {}
        list.UserName = {
            key: index,
            PhotoPath: child.PhotoPath_NoCache||child.PhotoPath ,
            UserName: child.UserName,
            UserID: child.UserID
        };
        list.Gender = child.Gender;
        list.UserType_Txt = child.UserType_Txt;
        list.UserType = child.UserType;
        list.Logs = child.Logs;
        list.Deleted = child.Deleted;
        list.key = index;
        keyList.push(list.key);
        list.OperationType_Txt = child.OperationType_Txt;
        list.OperationCount = child.OperationCount;
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
            userAddress: child.HomeAddress,
            
        }
        pensonalList.push(person)
        return { ...list, child }

    })

    return { newList, keyList, pensonalList };
}

export default LogPreview;