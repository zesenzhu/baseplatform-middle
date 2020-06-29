import UpDataState from '../../actions/UpDataState';

function handleData(data,pageIndex,pageSize) {
    const {Total,List} = data;
    let keyList = [];
    let newList = List.map((child,index) => {
        let list = {}
        list.key = index;
        list.OrderNo=index+pageIndex*pageSize;
        list.UserName = {
            Name: child.UserName,
            UserID: child.UserID,
            key: index
        }
        list.ShortName = child.ShortName;
        list.Sign = child.Sign;
        list.Gender = child.Gender;
        list.UserImg = child.PhotoPath;
        list.UserContact = {
            QQ: child.QQ,
            WeiXin: child.Weixin,
            Telephone: child.Telephone,
            Weibo: child.Weibo
        }
        list.handle = {
            key:index,
            OrderNo:index+pageIndex*pageSize
        }
        keyList.push(list.key);
        
        
        let {UserID,Grader,GradeName,ClassName,PhotoPath,UserName,...others} = child;
        list.Others = child;
        return list

    })
    return {Total:Total,newList,keyList};
}
const SubjectTeacherPreview = (state={Total:0,newList:[],keyList:[]},actions)=>{
    let returnData = {grades:null};
    switch (actions.type) {
        case UpDataState.GET_SUBJECT_TEACHER_PREVIEW:
            returnData = handleData(actions.data,actions.pageIndex,actions.pageSize);
            
            return Object.assign({},state,{...returnData});
        default:
            return state;
    }
} ;


export default  SubjectTeacherPreview;