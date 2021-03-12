export const CHANGE_PWD_PARAMS = "CHANGE_PWD_PARAMS";

export const ChangePwdParams = (params) => {
  return (dispatch, getState) => {
    // let data = getState().changePwd;
    dispatch({ type: CHANGE_PWD_PARAMS, data: params });
  };
};

const changePwd = (
  state = {
    visible: false,
    onOk: () => {},
    onCancel: () => {},
    loading: false,
    oldPwd: "",
  },
  actions
) => {
  switch (actions.type) {
    case CHANGE_PWD_PARAMS:
      return { ...state, ...actions.data };

    default:
      return state;
  }
};
export default changePwd;
