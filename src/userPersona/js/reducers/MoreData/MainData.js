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
      CourseScoreList: [],
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
