import UpDataState from '../../actions/UpDataState';
import history from '../../containers/history'
import { utimes } from 'fs';

const GetClassAllMsg = (state = {allClass:{}}, actions) => {
    switch (actions.type) {
        case UpDataState.GET_CLASS_ALL_MSG:
            
            let data = handleData(actions.data,actions.subject,actions.Class)
            return Object.assign({}, state, {allClass:data} );
            case UpDataState.INSERT_NEW_CLASSL_MSG:
            
            let NewData = InsertData(allClass,actions.Class)
            return Object.assign({}, state, {allClass:NewData} );
        default:
            return state;
    }
};

function handleData(data,subject,Class) {
    
    const {Item,...others} = data;
    let TableData = Item.map((item,index) => {
        return {
            isInsert:false,
            OrderNO:{OrderNO:item.OrderNO,key:index},
            CourseClass:{
                ClassID:item.CourseClassID,
                ClassName:item.CourseClassName,
                GradeID:item.GradeID,
                GradeName:item.GradeName,
                SubjectID:item.SubjectID,
                SubjectName:item.SubjectName,
                CourseClassLogoURL:item.CourseClassLogoURL
            },
            ClassMsg:{
                TeacherName:item.TeacherName,
                TeacherID:item.TeacherID,
                TeacherImg:item.TeacherProfilePictureURL
            },
            StudentCount:item.StudentCount,
            key:index,
        }
    })
    return {...data,TableData:TableData,subject:subject,Class:Class};
}

function InsertData(data,Class) {
    let {TableData} = data;

//    data = 
   TableData.unshift(Class)
   console.log(TableData)
    // return {...data,TableData:TableData,subject:subject,Class:Class};
}
export default GetClassAllMsg;