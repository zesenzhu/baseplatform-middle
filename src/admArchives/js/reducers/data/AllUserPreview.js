import UpDataState from '../../actions/UpDataState';
import { Children } from 'react';

const AllUserPreview = (state={Student:'',Teacher:'',SchoolLeader:'',Total:'',NewGrades:{},NewSubjects:{}},actions)=>{
    switch (actions.type) {
        case UpDataState.GET_ALL_USER_PREVIEW:
            let newData = handleData(actions.data)
            return Object.assign({}, state, {...newData});
        default:
            return state;
    }
} ;
function handleData(data){
    const {Grades,Subjects,...oldData} = data;
    let NewGrades = {};
    let NewSubjects = {};
    let GradeNames = [];
    let SubjectNames = []
    Grades.map((child,index) => {
        NewGrades[child.GradeName] = child
        GradeNames.push(child.GradeName);
        
    })
    Subjects.map((child,index) => {
        
        NewSubjects[child.SubjectName] = child;
        SubjectNames.push(child.SubjectName)
    })
    return {...data,NewSubjects:NewSubjects,SubjectNames:SubjectNames,GradeNames:GradeNames,NewGrades:NewGrades}
}
export default  AllUserPreview;