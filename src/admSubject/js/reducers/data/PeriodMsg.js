import UpDataState from "../../actions/UpDataState";
const PeriodMsg = (state = "", actions) => {
  switch (actions.type) {
    case UpDataState.GET_PERIOD_MSG:
      let newData = handleData(actions.data);
      return { value: newData };
    default:
      return state;
  }
};

function handleData(data = []) {
  let initData = [{ value: 0, title: "全部学段" }];

  let newData = data.map((child, index) => {
    let grades = {};
    let gradenames =
      typeof child.GradeNames === "string" ? child.GradeNames.split(",") : [];
    typeof child.Grades === "string" &&
      child.Grades.split(",").forEach((c, i) => {
        grades[c] = { value: c, title: gradenames[i] };
      });
    return {
      value: child.PeriodID,
      title: child.PeriodName,
      Grades: child.Grades,
      GradeNames: child.GradeNames,
      grades,
    };
  });
  let returnData = initData.concat(newData);

  return returnData;
}
export default PeriodMsg;
