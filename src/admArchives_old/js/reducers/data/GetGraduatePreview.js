import UpDataState from '../../actions/UpDataState';

const GetGraduatePreview = (state = {Total:0,loading:false,}, actions) => {
    switch (actions.type) {
        case UpDataState.GET_GRADUATE_PREVIEW:
            let { Total, ...list } = actions.data;

            let List = handleData(list,actions.pageIndex,actions.pageSize);

            return Object.assign({}, state, { Total, ...List, loading: false });
        

        default:
            return state;
    }
};
function handleData(data,pageIndex,pageSize) {
    let keyList = [];
    let pensonalList = [];
    let newList = data.List instanceof Array&& data.List.map((child, index) => {
        let list = {}
        list.UserName = { key: index, UserName: child.UserName };
        list.UserID = child.UserID;
        list.Grade ={GradeName: child.GradeName,GradeID:child.GradeID,Year:child.Year};
        list.Class = {ClassID:child.ClassID,ClassName:child.ClassName};
        list.JobType = {JobType:child.JobType,HasTrack:child.HasTrack,Discription:child.Discription};
        list.UserImgs = { key: index, UserName: child.UserName, UserImg: child.PhotoPath_NoCache||child.PhotoPath, UserImg_Nocache: child.PhotoPath_NoCache };
        list.Gender = child.Gender;
        list.Telephone = child.Telephone;
        list.OrderNo = { key: index, OrderNo: index + pageIndex * pageSize };
        list.key = index;
        list.userText=child.Sign;
        keyList.push(list.key);

       

        //let {UserID,Grader,GradeName,ClassName,PhotoPath,UserName,...others} = child;
        list.handleMsg = { ...child, key: index };
        let person = {
            userName: child.UserName,
            userImg: child.PhotoPath_NoCache||child.PhotoPath,
            Gende: child.Gender,
            userID: child.UserID,
            jobType:child.JobType,
            hasTrack:child.HasTrack,
            discription:child.Discription,
            year: child.Year,
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

export default GetGraduatePreview;