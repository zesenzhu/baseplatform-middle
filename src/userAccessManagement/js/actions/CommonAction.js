///操作名称
const COMMON_SET_FRAME_PARAMS = "COMMON_SET_FRAME_PARAMS";

// 设置Frame 的数据
const SetFrameParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_FRAME_PARAMS, data: data });
  };
};
///操作名称
const COMMON_SET_BANNER_PARAMS = "COMMON_SET_BANNER_PARAMS";

// 设置Frame 的数据
const SetBannerParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_BANNER_PARAMS, data: data });
  };
};
// 设置Frame 的数据
const COMMON_SET_ROUTE_PARAMS = "COMMON_SET_ROUTE_PARAMS";
const SetRouteParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_ROUTE_PARAMS, data: data });
  };
};
// 设置版本或角色权限 的数据
const COMMON_SET_ROLE_POWER_PARAMS = "COMMON_SET_ROLE_POWER_PARAMS";
const SetRolePowerParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_ROLE_POWER_PARAMS, data: data });
  };
};
// 设置学生参数
const COMMON_SET_STUDENT_PARAMS = "COMMON_SET_STUDENT_PARAMS";
const SetStudentParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_STUDENT_PARAMS, data: data });
  };
};
// 设置Modal参数
const COMMON_SET_MODAL_VISIBLE = "COMMON_SET_MODAL_VISIBLE";
const SetModalVisible = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_MODAL_VISIBLE, data: data });
  };
};
// 设置用户档案的公共参数
const COMMON_SET_USER_ARCHIVES_PARAMS = "COMMON_SET_USER_ARCHIVES_PARAMS";
const SetUserArchivesParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_USER_ARCHIVES_PARAMS, data: data });
  };
};
// 设置教师参数
const COMMON_SET_TEACHER_PARAMS = "COMMON_SET_TEACHER_PARAMS";
const SetTeacherParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_TEACHER_PARAMS, data: data });
  };
};
// 设置领导参数
const COMMON_SET_LEADER_PARAMS = "COMMON_SET_LEADER_PARAMS";
const SetLeaderParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_LEADER_PARAMS, data: data });
  };
};
// 设置毕业生参数
const COMMON_SET_GRADUATE_PARAMS = "COMMON_SET_GRADUATE_PARAMS";
const SetGraduateParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_GRADUATE_PARAMS, data: data });
  };
};
// 设置编辑添加用户的数据
const COMMON_SET_EDIT_USER_ARCHIVES_PARAMS =
  "COMMON_SET_EDIT_USER_ARCHIVES_PARAMS";
const SetEditUserArchivesData = (data) => {
  return (dispatch, getState) => {
    let {
      DataState: {
        CommonData: { EditUserArchivesData },
      },
    } = getState();
    let Data = Object.assign({}, EditUserArchivesData, data);
    if (!data) {
      Data = {};
    }
    console.log(data, EditUserArchivesData, Data);

    dispatch({ type: COMMON_SET_EDIT_USER_ARCHIVES_PARAMS, data: Data });
  };
};
// 设置编辑添加初始用户的数据
const COMMON_SET_INIT_EDIT_USER_ARCHIVES_PARAMS =
  "COMMON_SET_INIT_EDIT_USER_ARCHIVES_PARAMS";
const SetInitEditUserArchivesData = (data) => {
  return (dispatch, getState) => {
    let {
      DataState: {
        CommonData: { EditUserArchivesData },
      },
    } = getState();
    let Data = { ...data };
    if (!data) {
      Data = {};
    }
    dispatch({ type: COMMON_SET_INIT_EDIT_USER_ARCHIVES_PARAMS, data: Data });
  };
};
// 设置毕业生编辑参数
const COMMON_SET_GRADUATE_EDIT_PARAMS = "COMMON_SET_GRADUATE_EDIT_PARAMS";
const SetGraduateEditParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_GRADUATE_EDIT_PARAMS, data: data });
  };
};
// 设置提示visible参数
const COMMON_SET_TIPS_VISIBLE_PARAMS = "COMMON_SET_TIPS_VISIBLE_PARAMS";
const SetTipsVisibleParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_TIPS_VISIBLE_PARAMS, data: data });
  };
};
// 设置提示Title
const COMMON_SET_TIPS_TITLE_PARAMS = "COMMON_SET_TIPS_TITLE_PARAMS";
const SetTipsTitleParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_TIPS_TITLE_PARAMS, data: data });
  };
};
// 设置编辑添加专业参数
const COMMON_SET_MAJOR_EDIT_PARAMS = "COMMON_SET_MAJOR_EDIT_PARAMS";
const SetMajorEditParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_MAJOR_EDIT_PARAMS, data: data });
  };
};
// 设置编辑添加教研室参数
const COMMON_SET_GROUP_EDIT_PARAMS = "COMMON_SET_GROUP_EDIT_PARAMS";
const SetGroupEditParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_GROUP_EDIT_PARAMS, data: data });
  };
};
// 设置注册参数
const COMMON_SET_REGISTER_EXAMINE_PARAMS = "COMMON_SET_REGISTER_EXAMINE_PARAMS";
const SetRegisterExamineParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_REGISTER_EXAMINE_PARAMS, data: data });
  };
};
// 设置动态参数
const COMMON_SET_LOG_PARAMS = "COMMON_SET_LOG_PARAMS";
const SetLogParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_LOG_PARAMS, data: data });
  };
};
export default {
  COMMON_SET_LOG_PARAMS,
  SetLogParams,

  COMMON_SET_REGISTER_EXAMINE_PARAMS,
  SetRegisterExamineParams,
  
  COMMON_SET_GROUP_EDIT_PARAMS,
  SetGroupEditParams,

  COMMON_SET_MAJOR_EDIT_PARAMS,
  SetMajorEditParams,

  SetInitEditUserArchivesData,
  COMMON_SET_INIT_EDIT_USER_ARCHIVES_PARAMS,

  COMMON_SET_TIPS_TITLE_PARAMS,
  SetTipsTitleParams,

  COMMON_SET_TIPS_VISIBLE_PARAMS,
  SetTipsVisibleParams,

  COMMON_SET_GRADUATE_EDIT_PARAMS,
  SetGraduateEditParams,

  SetGraduateParams,
  COMMON_SET_GRADUATE_PARAMS,

  COMMON_SET_EDIT_USER_ARCHIVES_PARAMS,
  SetEditUserArchivesData,

  COMMON_SET_LEADER_PARAMS,
  SetLeaderParams,

  COMMON_SET_TEACHER_PARAMS,
  SetTeacherParams,

  COMMON_SET_USER_ARCHIVES_PARAMS,
  SetUserArchivesParams,

  COMMON_SET_MODAL_VISIBLE,
  SetModalVisible,

  COMMON_SET_STUDENT_PARAMS,
  SetStudentParams,

  SetRolePowerParams,
  COMMON_SET_ROLE_POWER_PARAMS,

  COMMON_SET_ROUTE_PARAMS,
  SetRouteParams,

  COMMON_SET_BANNER_PARAMS,
  SetBannerParams,

  COMMON_SET_FRAME_PARAMS,
  SetFrameParams,
};
