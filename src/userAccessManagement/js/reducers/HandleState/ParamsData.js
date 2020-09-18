import HandleAction from "../../actions/HandleAction";
const ParamsData = (
  state = {
    CustomIdentity: {
      IdentityName: "",
      Description: "",
      UserType: [],
      type: "add", //add,edit
    },
  },
  actions
) => {
  switch (actions.type) {
    case HandleAction.PARAMS_SET_CUETOM_IDENTITY:
      return Object.assign({}, state, {
        CustomIdentity: { ...state.CustomIdentity, ...actions.data },
      });
    default:
      return state;
  }
};

export default ParamsData;
