import UpDataState from "../../actions/UpDataState";
// import DataState from "./../DataState";
import Public from "../../../../common/js/public";

const MainData = (
  state = {
    GradeData: {
      Class: 0,
      CourseTecher: 0,
      Student: 0,
      List: [],
    },
    ClassData: {
      GradeID: "",
      GradeName: "",
      Class: 0,
      CourseTecher: 0,
      Student: 0,
      Total: 0,
      List: [],
    },
    ClassStudentData: {
      Total: 0, //学生人数
      
      List: [],
      PageIndex:0

    },
    ClassTeacherData: {
      GradeID: "",
      GradeName: "",
      ClassID: "",
      ClassName: "",
      Total: 0, //教师人数
      Ganger: {
        IsSet: false, //是否设置；
        UserID: "", //班主任ID
        UserName: "", //姓名
        Gender: "", //性别
        PhotoPath: "", //头像
      },
      List: [],
    },
    SubjectData:{
      Total:0,
      List:[],
    },
    SubjectTeacherData: {
       
      Total: 0, //教师人数
       
      List: [],
    },
    UserDetail:{isNull:true},
    GradeAndClassList:{
      GradeList:[],
      AllClasses:{},
    }
  },
  actions
) => {
  switch (actions.type) {
    case UpDataState.MAIN_GET_GRADE_CLASS_TREE:
      let GradeAndClassList = handleTreeData(actions.data)
      return Object.assign({}, state, {
        GradeAndClassList: GradeAndClassList,
      });
    case UpDataState.MAIN_GET_USER_DETAIL:
      let Data = handleData(actions.data)
      return Object.assign({}, state, {
        UserDetail: Data,
      });
    case UpDataState.MAIN_GET_TEACHER_TO_PAGE:
      return Object.assign({}, state, {
        SubjectTeacherData: actions.data,
      });
    case UpDataState.MAIN_GET_SUBJECT:
      return Object.assign({}, state, {
        SubjectData: actions.data,
      });
    case UpDataState.MAIN_GET_CLASS_TEACHER:
      return Object.assign({}, state, {
        ClassTeacherData: actions.data,
      });
    case UpDataState.MAIN_GET_STUDENT_TO_PAGE:
      return Object.assign({}, state, {
        ClassStudentData: actions.data,
      });
    case UpDataState.MAIN_GET_GRADE_DATA:
      return Object.assign({}, state, {
        GradeData: actions.data,
      });
    case UpDataState.MAIN_GET_CLASS_DATA:
      return Object.assign({}, state, {
        ClassData: actions.data,
      });

    default:
      return state;
  }
};
function handleTreeData(data) {
  let Grades = data.Grades;
  let len = Grades.length;

  let GradeArr = [];
  let NewGrade = [];
  let AllClasses = {};
  for (let i = 0; i < len; i++) {
    let Grade = { value: Grades[i].GradeID, title: Grades[i].GradeName };
    let ClassArr = [];
    for (let j = 0; j < Grades[i].Classes.length; j++) {
      let Class = {
        value: Grades[i].Classes[j].ClassID,
        title: Grades[i].Classes[j].ClassName
      };
      ClassArr.push(Class);
    }
    AllClasses[Grades[i].GradeID] = ClassArr;

    GradeArr.push(Grade);
     
  }

  return {   GradeList: GradeArr, AllClasses: AllClasses };
}
function handleData(data) {
  // console.log(data===null)
  if(data===null||(!data&&!(data instanceof Array))){
      return {isNull:true}
  }
  return {
      userName: data.UserName,
      userImg: data.PhotoPath_NoCache||data.PhotoPath,
      Gende: data.Gender,
      userText: data.Sign,
      userID: data.UserID,
      userGrade: data.GradeName,
      userClass: data.ClassName,
      userIDCard: data.IDCardNo,
      userPhone: data.Telephone,
      userMail: data.Email,
      userAddress: data.HomeAddress,
      titleName: data.TitleName,
      subjectName: data.SubjectNames,
      source: data.Source,
      Position: data.Position,
      sign: data.Sign,
      userType: data.UserType,
      isNull:false
  }
}
export default MainData;
