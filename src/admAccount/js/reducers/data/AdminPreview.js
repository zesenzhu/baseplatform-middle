import UpDataState from '../../actions/UpDataState';



const AdminPreview = (state = {
    keyList: [], newList: [], Total: 0,PageIndex:0, TrasferData: {
        isChange: false,
        UserID: '',
        UserName: '',
        ModuleIDs: '',
        PhotoPath: '',
        Pwd: '0'
    },
    InitData: {
        isChange: false,
        UserID: '',
        UserName: '',
        ModuleIDs: '',
        PhotoPath: '',
        Pwd: '0'
    }
}, actions) => {
    switch (actions.type) {
        case UpDataState.GET_ADMIN_PREVIEW:
            //let { Total, ...list } = actions.data;

            let data = handleData(actions.data, actions.pageIndex, actions.pageSize);

            return Object.assign({}, state, { ...data });
        case UpDataState.SET_ADMIN_PREVIEW:
            let TrasferData = Object.assign({}, state.TrasferData, { ...actions.data })
            return Object.assign({}, state, { TrasferData:TrasferData })
            case UpDataState.SET_ADMIN_INIT_PREVIEW:
            let InitData = Object.assign({}, state.InitData, { ...actions.data })
            return Object.assign({}, state, { InitData:InitData })
        default:
            return state;
    }
};

function handleData(data, pageIndex, pageSize) {
    const { Total,PageIndex, ...others } = data;
    let keyList = [];
    let TrasferData = {
        isChange: false,
        UserID: '',
        UserName: '',
        ModuleIDs: '',
        PhotoPath: '',
        Pwd: '0'
    }
    let InitData = {
        isChange: false,
        UserID: '',
        UserName: '',
        ModuleIDs: '',
        PhotoPath: '',
        Pwd: '0'
    }
    let newList = data.List.map((child, index) => {
        let list = {}
        list.key = index;
        list.OrderNo = index + PageIndex * pageSize;
        list.UserName = {
            Name: child.UserName,
            UserID: child.UserID,
            key: index
        }
        list.ShortName = child.ShortName;
        list.Sign = child.Sign;
        list.Gender = child.Gender;
        list.UserImg = child.PhotoPath_NoCache||child.PhotoPath;
        list.UserContact = {
            QQ: child.QQ,
            WeiXin: child.Weixin,
            Telephone: child.Telephone,
            Weibo: child.Weibo
        }
        list.handle = {
            key: index,
            OrderNo: index + PageIndex * pageSize
        }
        keyList.push(list.key);


        let { UserID, Grader, GradeName, ClassName, PhotoPath, UserName, ...others } = child;
        list.Others = child;


        let Powers = child.Modules.map((power, key) => {
            let PowerName = power.ModuleGroupName;
            let value = power.ModuleGroupID;
            let PowerChild = power.ModuleList.map((list, listIndex) => {
                return {
                    value: list.ModuleID,
                    PowerChildName: list.ModuleName,
                    PowerMsg: list
                }
            })
            return {
                PowerName,
                value,
                PowerChild
            }
        })
        list.Power = {
            key: index,
            Powers: Powers
        }
        return list

    })

    let PowerList = data.Modules.map((child, index) => {
        let PowerName = child.ModuleGroupName;
        let value = child.ModuleGroupID;
        let PowerChild = child.ModuleList.map((list, index) => {
            return {
                value: list.ModuleID,
                PowerChildName: list.ModuleName,
                PowerMsg: list
            }
        })
        return {
            PowerName,
            value,
            PowerChild
        }
    })
    return { PowerList, Total, newList, keyList, InitData,TrasferData,PageIndex };
}

export default AdminPreview;