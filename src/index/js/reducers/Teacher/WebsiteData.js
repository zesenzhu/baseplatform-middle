import HeaderActions from "../../actions/Teacher/HeaderActions";
import TeacherCustomActions from "../../actions/Teacher/TeacherCustomActions";

const WebsiteData = (
  state = {
    WebName: "",
    WebAddress: "",
    SubjectName: [],
    SubjectID: [],
    WebType:{},
    PeriodID: "",
    PeriodName: "",
    WebsiteId:''
  },
  actions
) => {
  switch (actions.type) {
    case TeacherCustomActions.SET_HANDLE_WEBSITE_INIT_DATA:
      let initData = handleInitData(actions.data, state);
      return Object.assign({}, state, { ...initData });
    case TeacherCustomActions.SET_HANDLE_WEBSITE_DATA:
      return Object.assign({}, state, { ...actions.data });
    default:
      return state;
  }
};

function handleInitData(initData, state) {
  let data = {};
  for (let key in state) {
    let isExist = false;
    for (let index in initData) {
      if (index === key) {
        data[key] = initData[index];
        isExist = true;
      }
    }
    if (!isExist) {
      if (key === "SubjectID" && key === "SubjectName") {
        data[key] = [];
      } if(key === "WebType"){
        data[key] = {};

      }else {
        data[key] = '';
      }
    }
  }
  return data;
}
export default WebsiteData;
