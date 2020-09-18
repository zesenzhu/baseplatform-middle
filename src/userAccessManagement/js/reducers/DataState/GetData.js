import DataAction from "../../actions/DataAction";
const GetData = (
  state = {
    IdentityTypeList: [],//[]
  },
  actions
) => {
  switch (actions.type) {
    case DataAction.GET_INDENTITY_TYPE_LIST:
      return Object.assign({}, state, {
        IdentityTypeList: actions.data,
      });
    default:
      return state;
  }
};

export default GetData;
