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
      data: {
        pageNum: 1,
        pageSize: 2000,
        totalCount: 2,
        pageCount: 1,
        data: [
          // {
          //   id: 1,
          //   remark: "查寝不在",
          //   examinationDept: "宿舍管理科",
          //   examinationTime: "2020-08-25T01:07:42.000+00:00",
          //   semester: "2019-202002",
          //   examinationItemId: 1,
          //   examinationScore: -2.0,
          //   extend1: null,
          //   standardIdNew: null,
          //   userInfo: [{ userName: "陈捷", userId: "Stu001" }],
          //   moralityExaminationStandard: {
          //     id: 1,
          //     isReiterated: "1",
          //     deleteFlag: "1",
          //     editFlag: "0",
          //     examinationItems: [
          //       {
          //         id: 1,
          //         itemContent: "夜不归宿",
          //         itemScore: -2.0,
          //         standardId: 1,
          //         flag: "1",
          //       },
          //     ],
          //     examinationContent: "夜不归宿",
          //     examinationType: 0,
          //   },
          // },
          // {
          //   id: 2,
          //   remark: `青少年科技创新大赛(China Adolescents Science & Technology Innovation Contest;简称创新大赛，CASTIC)是一项具有20多年历史的全国性青少年科技
          //   创新成果和科学探究项目的综合性科技竞赛，是面向在校中小学生开展的具有示范性和导向性的科技教育活动之一，是目前我国中小学各类科技活动优秀成果
          //   集中展示的一种形式。`,
          //   examinationDept: "行政处",
          //   examinationTime: "2020-08-25T01:08:15.000+00:00",
          //   semester: "2019-202002",
          //   examinationItemId: 3,
          //   examinationScore: 3.0,
          //   extend1: null,
          //   standardIdNew: null,
          //   userInfo: [{ userName: "陈捷", userId: "Stu001" }],
          //   moralityExaminationStandard: {
          //     id: 2,
          //     isReiterated: "1",
          //     deleteFlag: "1",
          //     editFlag: "0",
          //     examinationItems: [
          //       {
          //         id: 3,
          //         itemContent: "一等奖",
          //         itemScore: 3.0,
          //         standardId: 2,
          //         flag: "1",
          //       },
          //     ],
          //     examinationContent: "英语竞赛",
          //     examinationType: 1,
          //   },
          // },
          // {
          //   id: 1,
          //   remark: "查寝不在",
          //   examinationDept: "宿舍管理科",
          //   examinationTime: "2020-08-25T01:07:42.000+00:00",
          //   semester: "2019-202002",
          //   examinationItemId: 1,
          //   examinationScore: -2.0,
          //   extend1: null,
          //   standardIdNew: null,
          //   userInfo: [{ userName: "陈捷", userId: "Stu001" }],
          //   moralityExaminationStandard: {
          //     id: 1,
          //     isReiterated: "1",
          //     deleteFlag: "1",
          //     editFlag: "0",
          //     examinationItems: [
          //       {
          //         id: 1,
          //         itemContent: "夜不归宿",
          //         itemScore: -2.0,
          //         standardId: 1,
          //         flag: "1",
          //       },
          //     ],
          //     examinationContent: "夜不归宿",
          //     examinationType: 0,
          //   },
          // },
          // {
          //   id: 2,
          //   remark: `青少年科技创新大赛(China Adolescents Science & Technology Innovation Contest;简称创新大赛，CASTIC)是一项具有20多年历史的全国性青少年科技
          //   创新成果和科学探究项目的综合性科技竞赛，是面向在校中小学生开展的具有示范性和导向性的科技教育活动之一，是目前我国中小学各类科技活动优秀成果
          //   集中展示的一种形式。`,
          //   examinationDept: "行政处",
          //   examinationTime: "2020-08-25T01:08:15.000+00:00",
          //   semester: "2019-202002",
          //   examinationItemId: 3,
          //   examinationScore: 3.0,
          //   extend1: null,
          //   standardIdNew: null,
          //   userInfo: [{ userName: "陈捷", userId: "Stu001" }],
          //   moralityExaminationStandard: {
          //     id: 2,
          //     isReiterated: "1",
          //     deleteFlag: "1",
          //     editFlag: "0",
          //     examinationItems: [
          //       {
          //         id: 3,
          //         itemContent: "一等奖",
          //         itemScore: 3.0,
          //         standardId: 2,
          //         flag: "1",
          //       },
          //     ],
          //     examinationContent: "英语竞赛",
          //     examinationType: 1,
          //   },
          // },
          // {
          //   id: 1,
          //   remark: "查寝不在",
          //   examinationDept: "宿舍管理科",
          //   examinationTime: "2020-08-25T01:07:42.000+00:00",
          //   semester: "2019-202002",
          //   examinationItemId: 1,
          //   examinationScore: -2.0,
          //   extend1: null,
          //   standardIdNew: null,
          //   userInfo: [{ userName: "陈捷", userId: "Stu001" }],
          //   moralityExaminationStandard: {
          //     id: 1,
          //     isReiterated: "1",
          //     deleteFlag: "1",
          //     editFlag: "0",
          //     examinationItems: [
          //       {
          //         id: 1,
          //         itemContent: "夜不归宿",
          //         itemScore: -2.0,
          //         standardId: 1,
          //         flag: "1",
          //       },
          //     ],
          //     examinationContent: "夜不归宿",
          //     examinationType: 0,
          //   },
          // },
          // {
          //   id: 2,
          //   remark: `青少年科技创新大赛(China Adolescents Science & Technology Innovation Contest;简称创新大赛，CASTIC)是一项具有20多年历史的全国性青少年科技
          //   创新成果和科学探究项目的综合性科技竞赛，是面向在校中小学生开展的具有示范性和导向性的科技教育活动之一，是目前我国中小学各类科技活动优秀成果
          //   集中展示的一种形式。`,
          //   examinationDept: "行政处",
          //   examinationTime: "2020-08-25T01:08:15.000+00:00",
          //   semester: "2019-202002",
          //   examinationItemId: 3,
          //   examinationScore: 3.0,
          //   extend1: null,
          //   standardIdNew: null,
          //   userInfo: [{ userName: "陈捷", userId: "Stu001" }],
          //   moralityExaminationStandard: {
          //     id: 2,
          //     isReiterated: "1",
          //     deleteFlag: "1",
          //     editFlag: "0",
          //     examinationItems: [
          //       {
          //         id: 3,
          //         itemContent: "一等奖",
          //         itemScore: 3.0,
          //         standardId: 2,
          //         flag: "1",
          //       },
          //     ],
          //     examinationContent: "英语竞赛",
          //     examinationType: 1,
          //   },
          // },
        ],
      },
      // totalScore: 101.0,
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
    StuQualityData: [],
    TeaWorkData: {
      pageCount: 0,
      pageNum: 1,
      pageSize: 10000,
      totalCount: 0,
      data: [],
    },
    AllTerm: [],
    TeacherResView: {
      TeacherID: "",
      SubjectID: "",
      SubjectName: "",
      Url: "",
      UploadCount: 0, //上传资源数量
      BrowseCount: 0, //浏览数
      UploadAllScale: 0,
      SubjectScale: 0,
      UploadSubjectScale: [
        // { SubjectScale: 0.562, SubjectID: "111", SubjectName: "语文" },
        // { SubjectScale: 1, SubjectID: "111", SubjectName: "英语" },
      ],
    },
    TeachPlan: {
      PCLink: "",
      PCType: -1,
      SysID: "",
      UploadAllScale: 0, //上传数量领先全校比值
      UploadCount: 0,
      SubjectScale: 0, //上传数量领先本学科比值
      UploadSubjectScale: [
        // { SubjectScale: 0.562, SubjectID: "111", SubjectName: "语文" },
        // { SubjectScale: 1, SubjectID: "111", SubjectName: "英语" },
      ],
      UseCount: 0, //浏览数
    },
    TeachPercent: {
      teacherID: "",
      url: "",
      uploadCount: 0, //上传精品资源数量
      browseCount: 0, //浏览量
      uploadAllScale: 0, //上传资源领先全校百分比

      UploadSubjectScale: [
        // { SubjectScale: 0.562, SubjectID: "111", SubjectName: "语文" },
        // { SubjectScale: 1, SubjectID: "111", SubjectName: "英语" },
      ],
    },
    TermAndPeriod: {
      WeekList: [],
      ItemWeek:[],
      NowWeekSelect: { value: 1, title: "第1周" },
    },
  },
  actions
) => {
  let ApplyModuleSort = [];
  switch (actions.type) {
    case MainActions.MAIN_GET_TERM_AND_PERIOD:
      return Object.assign({}, state, {
        TermAndPeriod: actions.data,
      });
    case MainActions.MAIN_GET_TEACHER_PERCENT_AGE:
      return Object.assign({}, state, {
        TeachPercent: actions.data,
      });
    case MainActions.MAIN_GET_TEACHER_PLAN_STATISTICS:
      return Object.assign({}, state, {
        TeachPlan: actions.data,
      });
    case MainActions.MAIN_GET_TEACHER_RES_VIEW:
      return Object.assign({}, state, {
        TeacherResView: actions.data,
      });
    case MainActions.MAIN_GET_ALL_TERM:
      return Object.assign({}, state, {
        AllTerm: actions.data,
      });
    case MainActions.MAIN_GET_TEACHER_WORK:
      return Object.assign({}, state, {
        TeaWorkData: actions.data,
      });
    case MainActions.MAIN_GET_STUDENT_QUALITY:
      return Object.assign({}, state, {
        StuQualityData: actions.data,
      });
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
