import UpDataState from "../../actions/UpDataState";
const GetTeachingSolutionMsg = (
  state = { solutionData: [], solutionTerm: [{ value: "", title: "全部",StartDate:'', EndDate:'' }] },
  actions
) => {
  switch (actions.type) {
    case UpDataState.GET_TEACHING_SOLUTION_MSG:
      const { List, ...others } = actions.data;
      return Object.assign({}, state, { solutionData: List, ...others });
    case UpDataState.GET_TEACHING_SOLUTION_TERM_MSG:
      let Term = handleTerm(actions.data);
      return Object.assign({}, state, { solutionTerm: Term });
    default:
      return state;
  }
};
function handleData(data) {
  const { List, ...others } = data;
  return data;
}
function handleTerm(data) {
  let solutionTerm = [{ value: "", title: "全部",StartDate:'', EndDate:'' }];
  data instanceof Array &&
    data.map((child, index) => {
      let { TermInfo, ...Others } = child;
      let len = TermInfo.length;
      let year = TermInfo.substring(0, len - 2);
      let term = TermInfo.substring(len - 2, len);
      let title = year + "学年 ";
      if (term === "01") {
        title += "第一学期";
      } else {
        title += "第二学期";
      }
      solutionTerm.push({ value: TermInfo, title, ...Others });
    });

  return solutionTerm;
}
export default GetTeachingSolutionMsg;
