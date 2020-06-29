import UpDataState from "../../actions/UpDataState";
import history from "../../containers/history";

const GetTeacherSubjectAndGradeMsg = (
  state = { Subjects: [] },
  actions
) => {
  switch (actions.type) {
    case UpDataState.GET_SUBJECT_AND_GRADE__MSG:
      let data = handleData(actions.data);
      return Object.assign({}, state, {Subjects:data });
    default:
      return state;
  }
};

function handleData(data) {
  let Subjects = [];
  const { ItemSubject, ItemGrade } = data;
  if (ItemSubject instanceof Array) {
    Subjects = ItemSubject.map((child, index) => {
      let list = {};
      list.value = child.SubjectID;
      list.title = child.SubjectName;
      let grade = []
      if (ItemGrade instanceof Array) {
          ItemGrade.map((gradeChild,gradeIndex) => {
            if(gradeChild.SubjectID===child.SubjectID){
                grade.push({
                    value:gradeChild.GradeID,
                    title:gradeChild.GradeName
                })
            }
          })
      }
      list.grade = grade
      return list
    });
  }
  return Subjects;
}
export default GetTeacherSubjectAndGradeMsg;
