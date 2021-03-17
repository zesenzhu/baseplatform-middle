import UpDataState from "../../actions/UpDataState";

const SetSubjectTeacherMsg = (
  state = { SubjectTeacherList: [], SubjectTeacherMsg: [] },
  actions
) => {
  switch (actions.type) {
    case UpDataState.SET_SUBJECT_TEACHER_MSG:
      let SubjectTeacherList = {};
      if (actions.data.grades === "P1")
        SubjectTeacherList = Object.assign({}, state.SubjectTeacherList, {
          P1: handleData(actions.data.Teacher),
        });
      else if (actions.data.grades === "P2")
        SubjectTeacherList = Object.assign({}, state.SubjectTeacherList, {
          P2: handleData(actions.data.Teacher),
        });
      else if (actions.data.grades === "P3")
        SubjectTeacherList = Object.assign({}, state.SubjectTeacherList, {
          P3: handleData(actions.data.Teacher),
        });
      else if (actions.data.grades === "M")
        SubjectTeacherList = Object.assign({}, state.SubjectTeacherList, {
          M: handleData(actions.data.Teacher),
        });
        else if (actions.data.grades === "K")
        SubjectTeacherList = Object.assign({}, state.SubjectTeacherList, {
            K: handleData(actions.data.Teacher),
        });
        else if (actions.data.grades === "O")
        SubjectTeacherList = Object.assign({}, state.SubjectTeacherList, {
            O: handleData(actions.data.Teacher),
        });

      return Object.assign({}, state, {
        SubjectTeacherList: SubjectTeacherList,
      });
    case UpDataState.SET_SUBJECT_TEACHER_MSG_All:
      let grades = [];
      actions.data.allGrades.map((child, index) => {
        if (child === "P1") grades["P1"] = handleData(actions.data.Teacher);
        else if (child === "P2")
          grades["P2"] = handleData(actions.data.Teacher);
        else if (child === "P3")
          grades["P3"] = handleData(actions.data.Teacher);
        else if (child === "M") grades["M"] = handleData(actions.data.Teacher);
        else if (child === "O") grades["O"] = handleData(actions.data.Teacher);
        else if (child === "K") grades["K"] = handleData(actions.data.Teacher);
      });
      return Object.assign({}, state, { SubjectTeacherList: grades });
    case UpDataState.GET_SUBJECT_TEACHER_MSG:
      return Object.assign({}, state, { SubjectTeacherMsg: actions.data });
    default:
      return state;
  }
};
function handleData(data) {
  // let Data = {}
  // for (let key in data){
  //     Data.push({
  //         id:data[key].TeacherID,
  //         name:data[key].TeacherName
  //     })
  // }
  //
  return data.map((child, index) => {
    return {
      id: child.TeacherID,
      name: child.TeacherName,
    };
  });
}
export default SetSubjectTeacherMsg;
