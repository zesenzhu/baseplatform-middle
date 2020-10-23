import UpDataState from '../../actions/UpDataState';

const SchoolLeaderPreview = (state={Total:0,newList:[],keyList:[],pensonalList:[]},actions)=>{
    switch (actions.type) {
        case UpDataState.GET_SCHOOL_LEADER_PREVIEW:
            let data = handleData(actions.data)
            return Object.assign({},state,{...data});
        default:
            return state;
    }
} ;
function handleData(data,pageIndex=0,pageSize=0){
    const {List ,...Total} = data
    let keyList = [];
    let pensonalList = [];
    let newList = []
    List instanceof Array &&List.map((child,index) => {
        let list = {}
        list.UserName = {key:index,PhotoPath:child.PhotoPath_NoCache||child.PhotoPath,UserName:child.UserName};
        list.UserID = child.UserID;
        list.Gender = child.Gender;
        list.key = index;
        list.Position = child.Position;
        keyList.push(list.key);
        list.OrderNo = { key: index, OrderNo: index + pageIndex * pageSize };
        let {UserID,Grader,PhotoPath,UserName,...others} = child;
        list.Others = others;
        let person = {
            userName:child.UserName,
            userImg:child.PhotoPath_NoCache||child.PhotoPath,
            Gende:child.Gender,
            userText:child.Sign,
            userID:child.UserID,
            userIDCard:child.IDCardNo,
            userPhone:child.Telephone,
            userMail:child.Email,
            userAddress:child.HomeAddress,
            Position:child.Position
        }
        pensonalList.push(person)
        newList.push({...list,child}) 

    })
    
    return {...Total,newList,keyList,pensonalList};
}
export default  SchoolLeaderPreview;