import MainAction from "../../actions/MainAction";
// import DataState from "./../DataState";
import Public from "../../../../common/js/public";

const MainData = (
  state = {
    SysUrl: [],
    SummaryData: {
      Total: 0,
      Student: 0,
      Teacher: 0,
      Leader: 0,
      StudentList: [],
      TeacherList: [],
      StudentAcount: [],
      TeacherAcount: [],
      Grades:[],
      Subjects:[]
    },
    StudentTree: {
      CollegeList: [],
      MajorList: [],
      GradeList: [],
      ClassList: [],
    },
    StudentData: {
      Total: 0,
      PageIndex: 0,
      List: [],
    },
    TeacherTree: {
      CollegeList: [],
      GroupList: [],
    },
    TeacherData: {
      Total: 0,
      PageIndex: 0,
      List: [],
    },
    LeaderData: {
      Total: 0,
      PageIndex: 0,
      List: [],
    },
    GraduateTree: {
      CollegeList: [],
      MajorList: [],
      GradeList: [],
      ClassList: [],
    },
    GraduateData: {
      Total: 0,
      PageIndex: 0,
      List: [],
    },
    UserLog: {},
    TitleList: [],
    SubjectList: [],
    StudentRegisterData: {
      Total: 0,
      PageIndex: 0,
      List: [],
    },
    TeacherClassList: [],
    TeacherRegisterData: {
      Total: 0,
      PageIndex: 0,
      List: [],
    },
    UnreadLogCount: 0,
    LogDynamicData: {
      TotalUser: 0, //档案变更总数
      Add: 0, //录入数量
      Edit: 0, //更新数量
      Delete: 0, //删除数量
      Total: 0, //列表行总数
      PageIndex: 0, //当前页码
      List: [],
    },
    LogRecordData: {
      Total: 0,
      PageIndex: 0,
      List: [],
    },
  },
  actions
) => {
  switch (actions.type) {
    case MainAction.MAIN_GET_ALL_LOG_TO_PAGE:
      return Object.assign({}, state, {
        LogRecordData: actions.data,
      });
    case MainAction.MAIN_GET_UNREAD_LOG_TO_PAGE:
      return Object.assign({}, state, {
        LogDynamicData: actions.data,
      });
    case MainAction.MAIN_GET_UNREAD_LOG_COUNT_DATA:
      return Object.assign({}, state, {
        UnreadLogCount: actions.data,
      });
    case MainAction.MAIN_GET_TEACHER_SIGN_UP_LOG_TO_PAGE:
      return Object.assign({}, state, {
        TeacherRegisterData: actions.data,
      });
    case MainAction.MAIN_GET_CLASS_AND_POWER_DATA:
      return Object.assign({}, state, {
        TeacherClassList: actions.data,
      });
    case MainAction.MAIN_GET_SIGN_UP_LOG_TO_PAGE:
      return Object.assign({}, state, {
        StudentRegisterData: actions.data,
      });
    case MainAction.MAIN_GET_SUBJECT_DATA:
      return Object.assign({}, state, {
        SubjectList: actions.data,
      });
    case MainAction.MAIN_GET_TITLE_TREE_DATA:
      return Object.assign({}, state, {
        TitleList: actions.data,
      });
    case MainAction.MAIN_GET_GRADUATE_TO_PAGE:
      return Object.assign({}, state, {
        GraduateData: actions.data,
      });
    case MainAction.MAIN_GET_GRADUATE_TREE_DATA:
      return Object.assign({}, state, {
        GraduateTree: actions.data,
      });
    case MainAction.MAIN_GET_LEADER_TO_PAGE:
      return Object.assign({}, state, {
        LeaderData: actions.data,
      });
    case MainAction.MAIN_GET_TEACHER_TO_PAGE:
      return Object.assign({}, state, {
        TeacherData: actions.data,
      });
    case MainAction.MAIN_GET_TEACHER_TREE_DATA:
      return Object.assign({}, state, {
        TeacherTree: actions.data,
      });
    case MainAction.MAIN_GET_USER_LOG_DATA:
      return Object.assign({}, state, {
        UserLog: actions.data,
      });
    case MainAction.MAIN_GET_STUDENT_TO_PAGE:
      return Object.assign({}, state, {
        StudentData: actions.data,
      });
    case MainAction.MAIN_GET_TREE_DATA:
      return Object.assign({}, state, {
        StudentTree: actions.data,
      });
    case MainAction.MAIN_GET_SUMMARY_DATA:
      return Object.assign({}, state, {
        SummaryData: actions.data,
      });
    case MainAction.MAIN_GET_SUB_SYSTEMS_MAIN_SERVER:
      return Object.assign({}, state, {
        SysUrl: actions.data,
      });

    default:
      return state;
  }
};

export default MainData;
