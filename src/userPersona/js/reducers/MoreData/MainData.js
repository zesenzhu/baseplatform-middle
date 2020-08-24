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
      TotalScore: 0,
      RankClass: 0,
      RankGrade: 0,
      LevelName: "",
      StartTime: "",
      EndTime: "",
      CourseScoreList: [
        // {
        //   CourseNO: "A56EDCF6-8407-4BF6-9CC4-BA58E7EF942B",
        //   CourseName: "语文",
        //   SubjectID: "S2-Chinese",
        //   SubjectName: "语文",
        //   Score: 82,
        //   ClassAvgScore: 0,
        //   GradeAvgScore: 0,
        //   ClassRank: 0,
        //   GradeRank: 0,
        // },
        // {
        //   CourseNO: "FCDFF6-8407-4BF6-9CC4-BA58E7EF942B",
        //   CourseName: "英语",
        //   SubjectID: "S2-English",
        //   SubjectName: "英语",
        //   Score: 90,
        //   ClassAvgScore: 0,
        //   GradeAvgScore: 0,
        //   ClassRank: 0,
        //   GradeRank: 0,
        // },
        // {
        //   CourseNO: "A56EDCF6-8407-4BF6-9CC4-BA58E7EF942B",
        //   CourseName: "语文",
        //   SubjectID: "S2-Chinese",
        //   SubjectName: "语文",
        //   Score: 82,
        //   ClassAvgScore: 0,
        //   GradeAvgScore: 0,
        //   ClassRank: 0,
        //   GradeRank: 0,
        // },
        // {
        //   CourseNO: "FCDFF6-8407-4BF6-9CC4-BA58E7EF942B",
        //   CourseName: "英语",
        //   SubjectID: "S2-English",
        //   SubjectName: "英语",
        //   Score: 90,
        //   ClassAvgScore: 0,
        //   GradeAvgScore: 0,
        //   ClassRank: 0,
        //   GradeRank: 0,
        // },
        // {
        //   CourseNO: "A56EDCF6-8407-4BF6-9CC4-BA58E7EF942B",
        //   CourseName: "语文",
        //   SubjectID: "S2-Chinese",
        //   SubjectName: "语文",
        //   Score: 82,
        //   ClassAvgScore: 0,
        //   GradeAvgScore: 0,
        //   ClassRank: 0,
        //   GradeRank: 0,
        // },
        // {
        //   CourseNO: "FCDFF6-8407-4BF6-9CC4-BA58E7EF942B",
        //   CourseName: "英语",
        //   SubjectID: "S2-English",
        //   SubjectName: "英语",
        //   Score: 90,
        //   ClassAvgScore: 0,
        //   GradeAvgScore: 0,
        //   ClassRank: 0,
        //   GradeRank: 0,
        // },
        // {
        //   CourseNO: "A56EDCF6-8407-4BF6-9CC4-BA58E7EF942B",
        //   CourseName: "语文",
        //   SubjectID: "S2-Chinese",
        //   SubjectName: "语文",
        //   Score: 82,
        //   ClassAvgScore: 0,
        //   GradeAvgScore: 0,
        //   ClassRank: 0,
        //   GradeRank: 0,
        // },
        // {
        //   CourseNO: "FCDFF6-8407-4BF6-9CC4-BA58E7EF942B",
        //   CourseName: "英语",
        //   SubjectID: "S2-English",
        //   SubjectName: "英语",
        //   Score: 90,
        //   ClassAvgScore: 0,
        //   GradeAvgScore: 0,
        //   ClassRank: 0,
        //   GradeRank: 0,
        // },
      ],
    },
    StudentReportData: [
      // {
      //   SubjectName: "语文",
      //   CourseName: "语文",
      //   Score: 80,
      //   Rank: "B",
      //   Comment: null,
      // },
      // {
      //   SubjectName: "英语",
      //   CourseName: "英语",
      //   Score: 90,
      //   Rank: "A",
      //   Comment: null,
      // },
      // {
      //   SubjectName: "语文",
      //   CourseName: "语文",
      //   Score: 80,
      //   Rank: "B",
      //   Comment: null,
      // },
      // {
      //   SubjectName: "英语",
      //   CourseName: "英语",
      //   Score: 90,
      //   Rank: "A",
      //   Comment: null,
      // },
      // {
      //   SubjectName: "语文",
      //   CourseName: "语文",
      //   Score: 80,
      //   Rank: "C",
      //   Comment: null,
      // },
      // {
      //   SubjectName: "英语",
      //   CourseName: "英语",
      //   Score: 90,
      //   Rank: "A",
      //   Comment: null,
      // },
      // {
      //   SubjectName: "-1",
      //   CourseName: "-1",
      //   Score: 0,
      //   Rank: null,
      //   Comment: `生活中的你时而活泼开朗，时而恬静文雅，是一个有礼貌的女孩。尊敬师长，团结同学，遵守校规校纪，积极参与学校组织的各项活动，舞蹈方面的特长为你
      //   赢得了观众的喝彩，同样也在同学中树立了你的形象。你是一个多才多艺的女孩，音体美样样精通，但作为一名中学生，最重要的是搞好学习，在这一点上你
      //   做得很不够。`,
      // },
    ],
    StuQualityData: [
      {
        ItemID: "4EBDF92E-FA6C-4B6C-A4F0-55C002C3AF23-1",
        ItemName: "品德表现",
        RankName: null,
      },
      {
        ItemID: "4EBDF92E-FA6C-4B6C-A4F0-55C002C3AF23-2",
        ItemName: "运动健康",
        RankName: null,
      },
      {
        ItemID: "4EBDF92E-FA6C-4B6C-A4F0-55C002C3AF23-3",
        ItemName: "艺术修养",
        RankName: null,
      },
      {
        ItemID: "4EBDF92E-FA6C-4B6C-A4F0-55C002C3AF23-4",
        ItemName: "创新实践",
        RankName: null,
      },
    ],
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
