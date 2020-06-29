import HeaderActions from "../../actions/Teacher/HeaderActions";
import TeacherCustomActions from "../../actions/Teacher/TeacherCustomActions";

const ToolData = (
  state = {
    ToolName: "",
    ToolUrl: "",
    ToolType:1,
    ToolImgUrl: "",
    ToolID: "",
    
  },
  actions
) => {
  switch (actions.type) {
    case TeacherCustomActions.SET_HANDLE_TOOL_INIT_DATA:
      let initData = handleInitData(actions.data, state);
      return Object.assign({}, state, { ...initData });
    case TeacherCustomActions.SET_HANDLE_TOOL_DATA:
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
        if(key === "ToolType"){
          if(initData[index]==='href'){
            data[key] = 1
          }else if(initData[index]==='exe'){
            data[key] = 2

          }else {
            data[key] = 1

          }
        }else{
          data[key] = initData[index];

        }
        isExist = true;
      }
    }
    if (!isExist) {
      if (key === "ToolType" ) {
        data[key] = 1;
      } else {
        data[key] = '';
      }
    }
  }
  return data;
}
export default ToolData;
