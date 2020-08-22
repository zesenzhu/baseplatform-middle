// import MainActions from "../../../actions/MainActions";
import Actions from "../../actions";
// import DataState from "./../DataState";
import Public from "../../../../common/js/public";
import { func } from "prop-types";
import Config from "../../../../common/js/config";
let { MainActions } = Actions;
const MainData = (
  state = {
    MoralEduInfo: {
      pageNum: 1,
      pageSize: 20,
      totalCount: 0,
      pageCount: 0,
      data: [],
    },
    StuNearExamData: {
      PubName: "",
      TotalScore: "",
      RankClass: "",
      RankGrade: "",
      LevelName: "",
      StartTime: "",
      EndTime: "",
      CourseScoreList: [
        {
          CourseNO: "A56EDCF6-8407-4BF6-9CC4-BA58E7EF942B",
          CourseName: "语文",
          SubjectID: "S2-Chinese",
          SubjectName: "语文",
          Score: 82,
          ClassAvgScore: 0,
          GradeAvgScore: 0,
          ClassRank: 0,
          GradeRank: 0,
        },
        {
          CourseNO: "FCDFF6-8407-4BF6-9CC4-BA58E7EF942B",
          CourseName: "英语",
          SubjectID: "S2-English",
          SubjectName: "英语",
          Score: 90,
          ClassAvgScore: 0,
          GradeAvgScore: 0,
          ClassRank: 0,
          GradeRank: 0,
        },
      ],
    },
    StudentReportData: [],
  },
  actions
) => {
  let ApplyModuleSort = [];
  switch (actions.type) {
    case MainActions.MAIN_GET_CLASS_MORAL_EDU_INFO_BY_CRITERIAS:
      return Object.assign({}, state, {
        MoralEduInfo: actions.data,
      });
    case MainActions.MAIN_GET_STU_NEAR_EXAM:
      return Object.assign({}, state, {
        StuNearExamData: actions.data,
      });
    case MainActions.MAIN_GET_STUDENT_REPORT:
      return Object.assign({}, state, {
        StudentReportData: actions.data,
      });
    default:
      return state;
  }
};

export default MainData;
