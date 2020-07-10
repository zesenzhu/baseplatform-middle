import UpDataState from '../../actions/UpDataState';

function handleData(data) {
    //let SubjectList = data.SubjectList; 
    let len = data.length;
    let newSubject = [];
    let SubjectListChange = [];
    for(let i = 0; i < len; i++){
        let Subject = {value:data[i].SubjectID,title:data[i].SubjectName};
        
        
        newSubject.push(Subject)
        if(data[i].SubjectID!=='all')
        SubjectListChange.push(Subject)
    }
    
    return {SubjectList:newSubject,SubjectListChange:SubjectListChange}
}
const SubjectTeacherMsg = (state={
    returnData:{SubjectListChange:[]}
},actions)=>{
    let returnData = {grades:null};
    switch (actions.type) {
        case UpDataState.GET_SUBJECT_TEACHER_MSG:
            returnData = handleData(actions.data);
            
            return Object.assign({}, state,{returnData});
        default:
            return state;
    }
} ;


export default  SubjectTeacherMsg;