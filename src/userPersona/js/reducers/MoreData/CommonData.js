import Actions from "../../actions";

// import DataState from "./../DataState";
import Public from "../../../../common/js/public";
let { CommonActions } = Actions;
const CommonData = (
  state = {
    MoralEduParams: {
      UserID: "",
      Title: "",
      PageSize: 10000,
      PageNum: 1,
      Proxy: "",
      Token: "",
      Semester: "",
      ShowAll: false,
    },
    StuResultParams: {
      Term: "",
      ClassID: "",
      GradeID: "",
      SchoolID: "",
      XH: "",
      Proxy: "",
      TabLoadingVisible: true,
      SelectBar: "NearExam", //NearExam:最近考试，TermReport:期末总评
    },
    StuQualityParams: {
      XH: "",
      Term: "",
      Proxy: "",
    },
    TeaWorkParams: {
      UserName: "",
      PageSize: 10000,
      PageNum: 1,
      Semester: "",
      Token: "",
      Proxy: "",
    },
    TeaMaterialParams:{
      StartTime:'',
      EndTime:'',
      FirstProxy:'',
      SecondProxy:'',
      ThirdProxy:'',
      Token:'',
      SelectWeek:{}
    }
  },
  actions
) => {
  let communicationData = {};
  switch (actions.type) {
    case CommonActions.COMMON_SET_TEA_MATERIAL_PARAMS:
      return Object.assign({}, state, {
        TeaMaterialParams: {
          ...state.TeaMaterialParams,
          ...actions.data,
        },
      });
    case CommonActions.COMMON_SET_TEA_WORK_PARAMS:
      return Object.assign({}, state, {
        TeaWorkParams: {
          ...state.TeaWorkParams,
          ...actions.data,
        },
      });
    case CommonActions.COMMON_SET_STU_QUALITY_PARAMS:
      return Object.assign({}, state, {
        StuQualityParams: {
          ...state.StuQualityParams,
          ...actions.data,
        },
      });
    case CommonActions.COMMON_SET_CLASS_MORAL_EDU_INFO_BY_CRITERIAS_PARAMS:
      return Object.assign({}, state, {
        MoralEduParams: {
          ...state.MoralEduParams,
          ...actions.data,
        },
      });
    case CommonActions.COMMON_SET_STU_RESULT_PARAMS:
      return Object.assign({}, state, {
        StuResultParams: {
          ...state.StuResultParams,
          ...actions.data,
        },
      });
    default:
      return state;
  }
};

export default CommonData;
