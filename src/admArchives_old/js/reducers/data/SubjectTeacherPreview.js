import UpDataState from '../../actions/UpDataState';

const SubjectTeacherPreview = (state = {pageIndex:0}, actions) => {
    switch (actions.type) {
        case UpDataState.GET_SUBJECT_TEACHER_PREVIEW:
            let { Total, ...list } = actions.data;

            let List = handleData(list,actions.pageIndex,actions.pageSize);

            return Object.assign({}, state, { Total, ...List, loading: false });
        case UpDataState.SET_SUBJECTID:
            return Object.assign({}, state, { SubjectID: actions.SubjectID });

        default:
            return state;
    }
};
function handleData(data,pageIndex,pageSize) {
    let keyList = [];
    let pensonalList = [];
    let PageIndex = data.PageIndex ;
    
    let newList = data.List.map((child, index) => {
        let list = {}
        list.UserName = { key: index, UserName: child.UserName };
        list.UserID = child.UserID;
        list.UserImgs = { key: index, UserName: child.UserName, UserImg: child.PhotoPath_NoCache||child.PhotoPath, UserImg_Nocache: child.PhotoPath_NoCache };
        list.Gender = child.Gender;
        list.OrderNo = { key: index, OrderNo: index + PageIndex * pageSize };
        list.key = index;
        keyList.push(list.key);

        let NewSubject = handleSubject(child.SubjectNames, child.SubjectIDs);
        list.SubjectNames = NewSubject;
        list.Titles = { TitleID: child.TitleID, TitleName: child.TitleName };

        //let {UserID,Grader,GradeName,ClassName,PhotoPath,UserName,...others} = child;
        list.handleMsg = { ...child, key: index, ...NewSubject };
        list.Others = child
        let person = {
            userName: child.UserName,
            userImg:child.PhotoPath_NoCache|| child.PhotoPath,
            Gende: child.Gender,
            userText: child.Sign,
            subjectName: child.SubjectNames,
            userID: child.UserID,
            titleName:child.TitleName,
            userGrade: child.GradeName,
            userClass: child.ClassName,
            userIDCard: child.IDCardNo,
            userPhone: child.Telephone,
            userType:child.UserType,
            userMail: child.Email,
            userAddress: child.HomeAddress
        }
        pensonalList.push(person)
        return { ...list, child }

    })
    return { newList, keyList, pensonalList,pageIndex:PageIndex,pageSize };
}
function handleSubject(name = '', id = '') {
    if(typeof name !== 'string'){
        name = ''
    }
    let nameArr = name.split(',');
    let idArr = id.split(',');
    let showTwo = '';
    nameArr.map((child, index) => {
        if (index !== nameArr.length - 1)
            showTwo += child + ',';
        else
            showTwo += child
    })

    let newSubjects = [];
    let SubjectArr = [];
    nameArr.map((name, index) => {
        newSubjects[idArr[index]] = name;
        SubjectArr.push(idArr[index])
    })

    return { showTwo: showTwo, newSubjects: newSubjects, SubjectArr: SubjectArr }
}

export default SubjectTeacherPreview;