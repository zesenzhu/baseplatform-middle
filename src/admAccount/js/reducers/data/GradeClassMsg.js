import UpDataState from '../../actions/UpDataState';

function handleData(data) {
    let Grades = data.Grades; 
    let len = Grades.length;
    
    let GradeArr = [{value:0,title:'全部年级'}];
    let AllClasses = {};
    for(let i = 0; i < len; i++){
        let Grade = {value:Grades[i].GradeID,title:Grades[i].GradeName};
        let ClassArr = []
        for(let j = 0;j < Grades[i].Classes.length;j++){
            let Class = {value:Grades[i].Classes[j].ClassID,title:Grades[i].Classes[j].ClassName};
            ClassArr.push(Class);
        }
        AllClasses[Grades[i].GradeID] = ClassArr;
        
        GradeArr.push(Grade)
    }
    
    return {grades:GradeArr,AllClasses:AllClasses}
}
const GradeClassMsg = (state={returnData:{grades:null}},actions)=>{
    let returnData = {grades:null};
    switch (actions.type) {
        case UpDataState.GET_GRADE_CLASS_MSG:
            returnData = handleData(actions.data);
            return Object.assign({},state,{returnData:returnData});
        default:
            return state;
    }
} ;


export default  GradeClassMsg;