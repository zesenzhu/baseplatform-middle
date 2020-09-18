import UpDataState from "../../actions/UpDataState";
// import DataState from "./../DataState";
import Public from "../../../../common/js/public";
const TermData = (
  state = {
    TermStartYear: "",
    TermEndYear: "",
    TermYearStatus: "",
    ID: 0,
    Term: "",
    TermStartDate: "",
    TermEndDate: "",
    SchoolID: "",
    TermStatus: -1, //学期当前状态:
    //0:表示学期未开始
    //1:表示在学期中
    //2:表示学期结束
    CurrentWeek: -1,
    TotalWeeks: -1,
    MomentStartDate: {},
    MomentEndDate: {},
    TermList: [],
    NextTermEndDate: "",
    NextTermStartDate: "",
  },
  actions
) => {
  let Data = {};
  switch (actions.type) {
    case UpDataState.MAIN_GET_CURRENT_TERM_INFO_FOR_MULTI_DATA:
      return Object.assign({}, state, { ...actions.data });

    default:
      return state;
  }
};

export default TermData;
