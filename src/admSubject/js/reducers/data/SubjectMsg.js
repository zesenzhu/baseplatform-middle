import UpDataState from "../../actions/UpDataState";
import English from "../../../images/English.png";
import Biology from "../../../images/Biology.png";
import Chemistry from "../../../images/Chemistry.png";
import Geography from "../../../images/Geography.png";
import History from "../../../images/History.png";
import Physics from "../../../images/Physics.png";
import Politics from "../../../images/Politics.png";
import Maths from "../../../images/Math.png";
import Chinese from "../../../images/Chinese.png";
import Others from "../../../images/Others.png";
import Science from "../../../images/Science.png";
import IT from "../../../images/IT.png";
import PE from "../../../images/PE.png";
import Arts from "../../../images/Art.png";
// 新增
// import Music from "../../../images/Music.png";
// import Painting from "../../../images/Painting.png";
// import Practical from "../../../images/Practical.png";
import Music from "../../../images/Others.png";
import Painting from "../../../images/Painting.png";
import Practical from "../../../images/Others.png";
const SubjectMsg = (state = { Total: 0 }, actions) => {
  switch (actions.type) {
    case UpDataState.GET_SUBJECT_MSG:
      let { SubjectItem, ...data } = actions.data;
      let oldData = actions.data;
      let newData = handleData(SubjectItem);

      return Object.assign({}, state, {
        ...data,
        SubjectItem: newData,
        oldData: oldData
      });
    case UpDataState.GET_SUBJECT_MODAL_MSG:
      let addSubjectMsg = handleAddSubjectMsg(actions.data.ItemSubject);

      return Object.assign({}, state, { addSubjectMsg: addSubjectMsg });
    default:
      return state;
  }
};

function handleAddSubjectMsg(data = []) {
  let initData = [{ value: 0, title: "自定义", GlabalGrades: "" }];
  let endData =
    data instanceof Array &&
    data.map((child, index) => {
      let value = child.SubjectID;
      let title = child.SubjectName;

      //let GlabalGrades = handleAllGrades(child.GlabalGrades);
      return {
        value: value,
        title: title,
        GlabalGrades: child.Grades instanceof String?child.Grades:''
      };
    });
  let newData = initData.concat(endData);
  return newData;
}

function handleAllGrades(grade) {
  let endGrade = "";
  let gradeArr1 = grade.split(",");
  if (!gradeArr1.length) return "";
  let gradeArr2 = gradeArr1.map((child, index) => {
    return child.split("-")[0];
  });
  return gradeArr2;
}

function handleData(data) {
  data = data || [];
  let newData =
    data instanceof Array &&
    data.map((child, index) => {
      let SubjectName = handleSubjectName(child);
      // {
      //     SubjectID:child.SubjectID,
      //     SubjectName:child.SubjectName,
      //     SubjectImg:SubjectImg
      // };
      let Grades = {
        P1Grades: handleGrade(child.P1Grade),
        P2Grades: handleGrade(child.P2Grade),
        P3Grades: handleGrade(child.P3Grade)
      };
      let Teacher = handleTeacher(child.Teachers);
      let key = index;
      return {
        SubjectName: SubjectName,
        Grades: Grades,
        Teacher: Teacher,
        key: key
      };
    });
  return newData;
}

function handleSubjectName(Subject) {
  let SubjectLogo = Others;
  if (Subject.IsDefault) {
    if (
      Subject.SubjectID === "S1-English" ||
      Subject.SubjectID === "S2-English" ||
      Subject.SubjectID === "S3-English" ||
      Subject.SubjectID === "S4-English"
    )
      SubjectLogo = English;
    else if (Subject.SubjectID === "S2-Maths") SubjectLogo = Maths;
    else if (Subject.SubjectID === "S2-Chinese") SubjectLogo = Chinese;
    else if (Subject.SubjectID === "S2-Geography") SubjectLogo = Geography;
    else if (Subject.SubjectID === "S2-History") SubjectLogo = History;
    else if (Subject.SubjectID === "S2-Politics") SubjectLogo = Politics;
    else if (Subject.SubjectID === "S2-Physics") SubjectLogo = Physics;
    else if (Subject.SubjectID === "S2-Chemistry") SubjectLogo = Chemistry;
    else if (Subject.SubjectID === "S2-Biology") SubjectLogo = Biology;
    else if (Subject.SubjectID === "S2-Science") SubjectLogo = Science;
    else if (Subject.SubjectID === "S2-IT") SubjectLogo = IT;
    else if (Subject.SubjectID === "S2-PE") SubjectLogo = PE;
    else if (Subject.SubjectID === "S2-Arts") SubjectLogo = Arts;
    else if (Subject.SubjectID === "S2-Music") SubjectLogo = Music;
    else if (Subject.SubjectID === "S2-Painting") SubjectLogo = Painting;
    else if (Subject.SubjectID === "S2-Practical") SubjectLogo = Practical;
  }
  return {
    SubjectImg: SubjectLogo,
    SubjectName: Subject.SubjectName,
    SubjectID: Subject.SubjectID
  };
}

function handleTeacher(teacher='') {
  let teacherArr = teacher?teacher.split(","):[];
  let allTeacherArr =
    teacherArr instanceof Array &&
    teacherArr.map((child, index) => {
      let childArr = child.split("/");
      let Grade = "";
      let TeacherID = "";
      let TeacherName = "";
      if (childArr.length !== 0) {
        Grade = childArr[0];
        TeacherID = childArr[1];
        TeacherName = childArr[2];
      }
      return {
        Grade: Grade,
        TeacherID: TeacherID,
        TeacherName: TeacherName
      };
    });
  return allTeacherArr;
}

function handleGrade(grade) {
  if (grade === "") return "";
  let GradeArr = grade.split(",");
  // console.log(grade, GradeArr)
  let sort = [];
  let Grades = [];
  let returnGrade = "";
  let isSeries = true;
  GradeArr instanceof Array &&
    GradeArr.map((child, index) => {
      let childArr = child.split("-");
      sort.push(childArr[0].slice(1));
      Grades.push(childArr[1]);
    });
  sort.map((child, index) => {
    if (
      sort.length === 1 ||
      (index !== sort.length - 1 && Number(child) !== sort[index + 1] - 1)
    )
      isSeries = false;
  });

  if (isSeries && Grades.length !== 0) {
    returnGrade = Grades[0] + "~" + Grades[Grades.length - 1];
  } else if (!isSeries && Grades.length !== 0) {
    Grades instanceof Array &&
      Grades.map((child, index) => {
        if (index !== Grades.length - 1) returnGrade += child + ",";
        else returnGrade += child;
      });
  }
  return returnGrade;
}
export default SubjectMsg;
