import UpDataState from "../../actions/UpDataState";
// import DataState from "./../DataState";
import Public from "../../../../common/js/public";
const getReisterData = (
  state = {
    GradeList: [{ value: 0, title: "暂无年级" }],
    ClassList: {},
    SubjectList: [
      { value: 0, title: "暂无学科" },
      
    ],
    // SchoolList:[{value:'',title:'暂无学校'}],
    SchoolList: [
      // { value: "S27-511-AF57", title: "一体化教育云    平台sadasda" },
      { value: "2", title: "暂无学校" }
    ]
    // SubjectList:[{value:0,title:'暂无学科'}]
  },
  actions
) => {
  let data = "";

  switch (actions.type) {
    // case UpDataState.SET_USER_MSG:
    //   return Object.assign({}, state, { ...actions.data });
    case UpDataState.GET_GRADE_CLASS_DATA:
      data = handleGradeInfo(actions.data);
      return Object.assign({}, state, { ...data });
      case UpDataState.GET_SUBJECT_DATA:
      data = handleSubjectInfo(actions.data);
      return Object.assign({}, state, { ...data });
    case UpDataState.GET_SCHOOL_INFO:
      data = handleSchoolInfo(actions.data);
      return Object.assign({}, state, { SchoolList: data });
    default:
      return state;
  }
};
function handleSubjectInfo(data) {
  if (data instanceof Array) {
    let SubjectList = [];
    
    data.map((child, index) => {
      if(child.SubjectID==='all'){
        return
      }else{
        SubjectList.push({
          value: child.SubjectID,
          title: child.SubjectName
        });
      }
      
      
    });
    return {
      SubjectList
    };
  } else {
    return {
      GradeList: [{ value: 0, title: "暂无年级" }],
      ClassList: {}
    };
  }
}
function handleGradeInfo(data) {
  if (data.Grades instanceof Array) {
    let GradeList = [];
    let ClassList = {};
    data.Grades.map((child, index) => {
      GradeList.push({
        value: child.GradeID,
        title: child.GradeName
      });
      let Class = []
        child.Classes instanceof Array &&
        child.Classes.map((child1, index1) => {
          Class.push({
            value: child1.ClassID,
            title: child1.ClassName,
            GradeID:child1.GradeID
          });
        });
        if(Class.length===0){
          Class ={ value: 0, title: "暂无班级"}
        }
        ClassList[child.GradeID] = Class
    });
    return {
      GradeList,
      ClassList
    };
  } else {
    return {
      GradeList: [{ value: 0, title: "暂无年级" }],
      ClassList: {}
    };
  }
}
function handleSchoolInfo(data) {
  if (data instanceof Array) {
    let SchoolList = data.map((child, index) => {
      return {
        value: child.SchoolID,
        title: child.SchoolName
      };
    });
    return SchoolList;
  } else {
    return [{ value: "", title: "暂无学校" }];
  }
}

export default getReisterData;
