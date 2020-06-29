import UpDataState from "../../actions/UpDataState";
// import DataState from "./../DataState";
import Public from "../../../../common/js/public";
const WebsiteData = (
  state = {
    WebName: "",
    WebAddress: "",
    SubjectName: [],
    SubjectID: [],
    Subject: {},
    WebType: {},
    PeriodID: [],
    PeriodName: [],
    WebsiteId: "",
    Period:{}
  },
  actions
) => {
  let Data = {};
  switch (actions.type) {
    case UpDataState.SET_WEBSITE_DATA:
      return Object.assign({}, state, { ...actions.data });
    case UpDataState.SET_INIT_WEBSITE_DATA:
      Data = handleInitData(actions.data,state,actions.DataState);
      return Object.assign({}, state, { ...Data });
    default:
      return state;
  }
};

function handleInitData(initData, state,DataState) {
  let data = {};
  // console.log(DataState.GetMenuData)
  for (let key in state) {
    let isExist = false;
    for (let index in initData) {
      if (index === key) {
        data[key] = initData[index];
        isExist = true;
      }
    }
    if (!isExist) {
      if (key === "PeriodID" && key === "PeriodName") {
        data[key] = [];
      } else if (key === "WebType") {
        data[key] = DataState.GetMenuData.TypeList[1];
      } else if (key === "Subject") {
        data[key] = DataState.GetMenuData.SubjectList[1];
      }else if (key === "Period") {
        data[key] = DataState.GetMenuData.PeriodList[1];
        // data['PeriodID'] = DataState.GetMenuData.PeriodList[1].value
      } if (key === "PeriodID") {
        // data[key] = DataState.GetMenuData.PeriodList[1];
        data['PeriodID'] = DataState.GetMenuData.PeriodList[1].value
      } else {
        data[key] = "";
      }
    }
  }
  return data;
}

export default WebsiteData;
