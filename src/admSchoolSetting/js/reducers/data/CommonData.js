import UpDataState from "../../actions/UpDataState";
// import DataState from "./../DataState";
import Public from "../../../../common/js/public";
const CommonData = (
  state = {
    SchoolStatusData: {
      StatusList: [
        { value: 0, title: "全部" },
        { value: 1, title: "开启" },
        { value: 2, title: "关闭" },
      ],
      StatusMainSelect: { value: 0, title: "全部" },
    },
    SchoolModalData: {
      SchoolName: "", //学校名字
      SchoolCode: "", //学校代码
      SchoolID: "", //学校id
      SchoolImgUrl: "", //学校图片
      SchoolLevel: { value: 1, title: "大学" }, //学校类型，大学，小学，中学
      SchoolSessionType: { value: 3, title: "三年制" }, //学校学制
      SchoolTel: "", //学校联系电话
      SchoolLinkman: "", //学校联系人
      SchoolImgUrl_Long:""
    },
    SchoolModalInitData: {
      SchoolName: "", //学校名字
      SchoolCode: "", //学校代码
      SchoolID: "", //学校id
      SchoolImgUrl: "", //学校图片
      SchoolLevel: { value: 1, title: "大学" }, //学校类型，大学，小学，中学
      SchoolSessionType: { value: 3, title: "三年制" }, //学校学制
      SchoolTel: "", //学校联系电话
      SchoolLinkman: "", //学校联系人
      SchoolImgUrl_Long:''
    },
    QuerySchoolParams: {
      keyWord: "",
      searchValue: "",
      CancelBtnShow: "n",
      pageSize: 10,
      currentIndex: 1,
      Status: 0,
    },
    MainEditData: {
      checkList: [],
      checkAll: false,
    },
    ImgUrlProxy: "",
    List: [
      { value: "School", title: "学校信息管理" },
      { value: "Term", title: "学年学期设置" },
    ],
    SetYearParams: {
      Visible: false,
      NextTermEndDate: "",
      NextTermStartDate: "",
      Term: { value: "", title: "" },
    },
    SetYearData: {},
  },
  actions
) => {
  let SchoolModalData = {};
  let SchoolModalInitData = {};
  let QuerySchoolParams = {};
  let MainEditData = {};
  let SchoolStatusData = {};
  switch (actions.type) {
    case UpDataState.COMMON_SET_YEAR_PARAMS:
      return Object.assign({}, state, {
        SetYearParams: { ...state.SetYearParams, ...actions.data },
      });
    case UpDataState.GET_IMG_URL_PROXY:
      return Object.assign({}, state, { ImgUrlProxy: actions.data.ResHttp });
    case UpDataState.SET_QUERY_SCHOOL_PARAMS:
      QuerySchoolParams = Object.assign({}, state.QuerySchoolParams, {
        ...actions.data,
      });
      return Object.assign({}, state, { QuerySchoolParams });
    case UpDataState.INIT_QUERY_SCHOOL_PARAMS:
      QuerySchoolParams = Object.assign({}, state.QuerySchoolParams, {
        keyWord: "",
        currentIndex: 1,
        searchValue: "",
        CancelBtnShow: "n",
      });
      return Object.assign({}, state, { QuerySchoolParams });
    case UpDataState.SET_MAIN_EDIT_DATA:
      MainEditData = Object.assign({}, state.MainEditData, {
        ...actions.data,
      });
      return Object.assign({}, state, { MainEditData });
    case UpDataState.SET_SCHOOL_MODAL_DATA:
      SchoolModalData = Object.assign({}, state.SchoolModalData, {
        ...actions.data,
      });
      return Object.assign({}, state, { SchoolModalData });
    case UpDataState.SET_SCHOOL_MODAL_INIT_DATA:
      SchoolModalData = Object.assign({}, state.SchoolModalData, {
        SchoolName: "", //学校名字
        SchoolCode: "", //学校代码
        SchoolID: "", //学校id
        SchoolImgUrl: "", //学校图片
        SchoolLevel: { value: 1, title: "大学" }, //学校类型，大学，小学，中学
        SchoolSessionType: { value: 3, title: "三年制" }, //学校学制
        SchoolTel: "", //学校联系电话
        SchoolLinkman: "", //学校联系人,
        ...actions.data,
      });
      SchoolModalInitData = Object.assign({}, state.SchoolModalInitData, {
        SchoolName: "", //学校名字
        SchoolCode: "", //学校代码
        SchoolID: "", //学校id
        SchoolImgUrl: "", //学校图片
        SchoolLevel: { value: 1, title: "大学" }, //学校类型，大学，小学，中学
        SchoolSessionType: { value: 3, title: "三年制" }, //学校学制
        SchoolTel: "", //学校联系电话
        SchoolLinkman: "", //学校联系人,
        ...actions.data,
      });
      return Object.assign({}, state, { SchoolModalData, SchoolModalInitData });
    case UpDataState.SET_SCHOOL_STATUS_DATA:
      SchoolStatusData = Object.assign({}, state.SchoolStatusData, {
        StatusMainSelect: actions.data,
      });
      QuerySchoolParams = Object.assign({}, state.QuerySchoolParams, {
        Status: actions.data.value,
      });
      return Object.assign({}, state, { SchoolStatusData, QuerySchoolParams });
    default:
      return state;
  }
};

function handleInitData(initData) {
  return initData;
}

export default CommonData;
