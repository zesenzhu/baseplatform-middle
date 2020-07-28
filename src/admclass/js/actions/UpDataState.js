import { postData, getData } from "../../../common/js/fetch";
import UpUIState from "./UpUIState";
import CONFIG from "../../../common/js/config";
import "whatwg-fetch";
import actions from "./index";
import Public from "../../../common/js/public";
import PublicAction from "./PublicAction";

const { ClassProxy, UserInfoProxy } = CONFIG;
//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = "GET_LOGIN_USER_INFO";

//操作的执行
//获取登录用户信息
const getLoginUser = (data) => {
  return (dispatch) => {
    dispatch({ type: GET_LOGIN_USER_INFO, data: data });
  };
};
// 获取年级总览
const MAIN_GET_GRADE_DATA = "MAIN_GET_GRADE_DATA";
const GetSummary = ({ schoolID, func = () => {} }) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.TableLoadingOpen());

    if (schoolID === undefined) {
      schoolID = getState().PublicState.LoginMsg.SchoolID;
    }
    getSummary(schoolID).then((data) => {
      if (data !== false) {
        dispatch({ type: MAIN_GET_GRADE_DATA, data });
        dispatch(PublicAction.TableLoadingClose());
        func(getState());
      }
    });
  };
};
const getSummary = async (schoolID) => {
  let res = await getData(ClassProxy + "/GetSummary?schoolID=" + schoolID, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    return json.Data;
  } else {
    return false;
  }
};
//设置窗口显示
const COMMON_MODAL_VISIBLE = "COMMON_MODAL_VISIBLE";
const SetModalVisible = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_MODAL_VISIBLE, data: data });
  };
};
//设置提示显示
const COMMON_TIPS_VISIBLE = "COMMON_TIPS_VISIBLE";
const SetTipsVisible = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_TIPS_VISIBLE, data: data });
  };
};
// //设置提示内容
const COMMON_SET_TIPS = "COMMON_SET_TIPS";
const SetTips = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_TIPS, data: data });
  };
};
////设置年级数据
const COMMON_SET_GRADE_DATA = "COMMON_SET_GRADE_DATA";
const SetGradeData = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_GRADE_DATA, data: data });
  };
};
// //设置年级选择
const COMMON_SET_SELECT_GRADE_DATA = "COMMON_SET_SELECT_GRADE_DATA";
const SetSelectGradeData = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_SELECT_GRADE_DATA, data: data });
  };
};
// 获取年级总览
const MAIN_GET_CLASS_DATA = "MAIN_GET_CLASS_DATA";
const GetGradeSummary = ({
  schoolID,
  GradeID,
  Keyword,
  PageIndex,
  PageSize,
  func = () => {},
}) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.TableLoadingOpen());
    let {
      DataState: {
        CommonData: { ClassParams, selectGrade },
      },
    } = getState();
    if (schoolID === undefined) {
      schoolID = getState().PublicState.LoginMsg.SchoolID;
    }
    if (GradeID === undefined) {
      GradeID = selectGrade.value;
    }
    if (Keyword === undefined) {
      Keyword = ClassParams.Keyword;
    }
    if (PageIndex === undefined) {
      PageIndex = ClassParams.PageIndex;
    }
    if (PageSize === undefined) {
      PageSize = ClassParams.PageSize;
    }
    getGradeSummary(schoolID, GradeID, Keyword, PageIndex, PageSize).then(
      (data) => {
        if (data !== false) {
          dispatch({ type: MAIN_GET_CLASS_DATA, data });
          dispatch(PublicAction.TableLoadingClose());
          func(getState());
        }
      }
    );
  };
};
const getGradeSummary = async (
  schoolID,
  GradeID,
  Keyword,
  PageIndex,
  PageSize
) => {
  let res = await getData(
    ClassProxy +
      "/GetGradeSummary?GradeID=" +
      GradeID +
      (Keyword !== "" ? "&Keyword=" + Keyword : "") +
      "&PageIndex=" +
      PageIndex +
      "&PageSize=" +
      PageSize +
      "&schoolID=" +
      schoolID,
    2
  );
  let json = await res.json();
  if (json.StatusCode === 200) {
    return json.Data;
  } else {
    return false;
  }
};
// 设置班级的参数
const COMMON_SET_CLASS_PARAMS = "COMMON_SET_CLASS_PARAMS";
const SetClassParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_CLASS_PARAMS, data: data });
  };
};
// 设置班级的参数
const COMMON_SET_CLASS_DATA = "COMMON_SET_CLASS_DATA";
const SetClassData = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_CLASS_DATA, data: data });
  };
};
// 删除班级
const DeleteClass = ({
  ClassIDs,
  GradeID,

  func = () => {},
}) => {
  return (dispatch, getState) => {
    let {
      DataState: {
        CommonData: { ClassData },
      },
    } = getState();

    if (GradeID === undefined) {
      GradeID = ClassData.GradeID;
    }
    if (ClassIDs === undefined) {
      ClassIDs = ClassData.ClassID;
    }
    postData(
      ClassProxy + "/DeleteClass",
      {
        ClassIDs,
        GradeID,
      },
      2
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          func(getState());
        }
      });
  };
};
// 设置选中的班级信息
const COMMON_SET_SELECT_CLASS_DATA = "COMMON_SET_SELECT_CLASS_DATA";
const SetSelectClassData = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_SELECT_CLASS_DATA, data: data });
  };
};
// 编辑班级
const EditClass = ({
  ClassID,
  ClassName,

  func = () => {},
}) => {
  return (dispatch, getState) => {
    let {
      DataState: {
        CommonData: { ClassData },
      },
    } = getState();

    if (ClassName === undefined) {
      ClassName = ClassData.ClassName;
    }
    if (ClassID === undefined) {
      ClassID = ClassData.ClassID;
    }
    postData(
      ClassProxy + "/EditClass",
      {
        ClassName,
        ClassID,
      },
      2
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          func(getState());
        }
      });
  };
};
// 添加班级参数设置

const COMMON_SET_ADD_CLASS_PARAMS = "COMMON_SET_ADD_CLASS_PARAMS";
const SetAddClassParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_ADD_CLASS_PARAMS, data: data });
  };
};
// 添加班级
const AddClass = ({
  GradeID,
  ClassName,

  func = () => {},
}) => {
  return (dispatch, getState) => {
    let {
      DataState: {
        CommonData: { AddClassParams },
      },
    } = getState();

    if (ClassName === undefined) {
      ClassName = AddClassParams.ClassName;
    }
    if (GradeID === undefined) {
      GradeID = AddClassParams.GradeID;
    }
    postData(
      ClassProxy + "/AddClass",
      {
        ClassName,
        GradeID,
      },
      2
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          func(getState());
        }
      });
  };
};
// 权限控制
const COMMON_SET_USER_POWER = "COMMON_SET_USER_POWER";
const SetUserPower = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_USER_POWER, data: data });
  };
};
// 获取某班级学生列表
const MAIN_GET_STUDENT_TO_PAGE = "MAIN_GET_STUDENT_TO_PAGE";
const GetStudentToPage = ({
  ClassID,
  Keyword,
  PageIndex,
  PageSize,
  func = () => {},
}) => {
  return (dispatch, getState) => {
    // dispatch(PublicAction.TableLoadingOpen());
    let {
      DataState: {
        CommonData: { ClassDetailsParams, selectGrade },
      },
    } = getState();

    if (ClassID === undefined) {
      ClassID = ClassDetailsParams.ClassID;
    }
    if (Keyword === undefined) {
      Keyword = ClassDetailsParams.Keyword;
    }
    if (PageIndex === undefined) {
      PageIndex = ClassDetailsParams.PageIndex;
    }
    if (PageSize === undefined) {
      PageSize = ClassDetailsParams.PageSize;
    }
    getStudentToPage(ClassID, Keyword, PageIndex, PageSize).then((data) => {
      if (data !== false) {
        dispatch({ type: MAIN_GET_STUDENT_TO_PAGE, data });
        // dispatch(PublicAction.TableLoadingClose());
        func(getState());
      }
    });
  };
};
const getStudentToPage = async (ClassID, Keyword, PageIndex, PageSize) => {
  let res = await getData(
    UserInfoProxy +
      "/GetStudentToPage?ClassID=" +
      ClassID +
      (Keyword !== "" ? "&Keyword=" + Keyword : "") +
      "&PageIndex=" +
      PageIndex +
      "&PageSize=" +
      PageSize,
    2
  );
  let json = await res.json();
  if (json.StatusCode === 200) {
    return json.Data;
  } else {
    return false;
  }
};
// 获取某班级教师列表
const MAIN_GET_CLASS_TEACHER = "MAIN_GET_CLASS_TEACHER";
const GetClassTeacher = ({
  ClassID,

  func = () => {},
}) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.TableLoadingOpen());
    let {
      DataState: {
        CommonData: { ClassDetailsParams, selectGrade },
      },
    } = getState();

    if (ClassID === undefined) {
      ClassID = ClassDetailsParams.ClassID;
    }

    getClassTeacher(ClassID).then((data) => {
      if (data !== false) {
        if (!data.ganger) {
          data.ganger = { IsSet: false };
        }
        // data = data.map(child=>{
        //   if(!child.ganger){
        //     child.ganger ={IsSet:false}
        //   }
        //   return child
        // })
        dispatch({ type: MAIN_GET_CLASS_TEACHER, data });
        dispatch(PublicAction.TableLoadingClose());
        func(getState());
      }
    });
  };
};
const getClassTeacher = async (ClassID) => {
  let res = await getData(
    ClassProxy + "/GetClassTeacher?ClassID=" + ClassID,
    2
  );
  let json = await res.json();
  if (json.StatusCode === 200) {
    return json.Data;
  } else {
    return false;
  }
};
// 设置班级详情参数
const COMMON_SET_CLASS_DETAILS_PARAMS = "COMMON_SET_CLASS_DETAILS_PARAMS";
const SetClassDetailsParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_CLASS_DETAILS_PARAMS, data: data });
  };
};
// 获取某班级学科列表
const MAIN_GET_SUBJECT = "MAIN_GET_SUBJECT";
const GetSubject = ({
  ClassID,

  func = () => {},
}) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.ModalLoadingOpen());
    let {
      DataState: {
        CommonData: { ClassDetailsParams, selectGrade },
      },
    } = getState();

    if (ClassID === undefined) {
      ClassID = ClassDetailsParams.ClassID;
    }

    getSubject(ClassID).then((data) => {
      if (data !== false) {
        dispatch({ type: MAIN_GET_SUBJECT, data });
        dispatch(
          SetSubjectTeacherParams({
            SubjectIDs: data[0] ? data[0].SubjectID : "all",
            SUbjectNames: data[0] ? data[0].SubjectName : "全部学科",
          })
        );
        dispatch(GetTeacherToPage({}));

        dispatch(PublicAction.ModalLoadingClose());
        func(getState());
      }
    });
  };
};
const getSubject = async (ClassID) => {
  let res = await getData(ClassProxy + "/GetSubject?ClassID=" + ClassID, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    return json.Data;
  } else {
    return false;
  }
};
// 分页获取教师

const MAIN_GET_TEACHER_TO_PAGE = "MAIN_GET_TEACHER_TO_PAGE";
const GetTeacherToPage = ({
  SchoolID,
  SubjectIDs,
  Keyword,
  func = () => {},
}) => {
  return (dispatch, getState) => {
    dispatch(
      SetLoadingVisible({
        SubjectTeacherLoadingVisible: true,
      })
    );
    let {
      DataState: {
        CommonData: { ClassDetailsParams, SubjectTeacherParams },
      },
      PublicState: { LoginMsg },
    } = getState();

    if (SchoolID === undefined) {
      SchoolID = LoginMsg.SchoolID;
    }

    if (SubjectIDs === undefined) {
      SubjectIDs = SubjectTeacherParams.SubjectIDs;
    }
    if (Keyword === undefined) {
      Keyword = SubjectTeacherParams.Keyword;
    }
    getTeacherToPage({ SchoolID, SubjectIDs, Keyword }).then((data) => {
      if (data !== false) {
        dispatch({ type: MAIN_GET_TEACHER_TO_PAGE, data });
        dispatch(
          SetLoadingVisible({
            SubjectTeacherLoadingVisible: false,
          })
        );
        func(getState());
      }
    });
  };
};
const getTeacherToPage = async ({ SubjectIDs, Keyword, SchoolID }) => {
  let res = await getData(
    ClassProxy +
      "/GetTeacherToPage?SchoolID=" +
      SchoolID +
      (Keyword !== "" ? "&Keyword=" + Keyword : "") +
      "&SubjectIDs=" +
      SubjectIDs +
      "&PageIndex=" +
      0 +
      "&PageSize=" +
      0,
    2
  );
  let json = await res.json();
  if (json.StatusCode === 200) {
    return json.Data;
  } else {
    return false;
  }
};
// 设置学科参数
const COMMON_SET_SUBJECT_TEACHER_PARAMS = "COMMON_SET_SUBJECT_TEACHER_PARAMS";
const SetSubjectTeacherParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_SUBJECT_TEACHER_PARAMS, data: data });
  };
};
// 设置选择的班主任参数参数
const COMMON_SET_SELECT_GANDER_PARAMS = "COMMON_SET_SELECT_GANDER_PARAMS";
const SetSelectGanderData = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_SELECT_GANDER_PARAMS, data: data });
  };
};
// 设置Loading
const COMMON_SET_LOADING_VISIBLE = "COMMON_SET_LOADING_VISIBLE";
const SetLoadingVisible = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_LOADING_VISIBLE, data: data });
  };
};
// 设置班主任
const SetGanger = ({
  ClassID,
  UserID,

  func = () => {},
}) => {
  return (dispatch, getState) => {
    let {
      DataState: {
        CommonData: { ClassDetailsParams, SelectGanderData },
      },
      PublicState: { LoginMsg },
    } = getState();

    if (UserID === undefined) {
      UserID = SelectGanderData.UserID;
    }
    if (ClassID === undefined) {
      ClassID = ClassDetailsParams.ClassID;
    }
    postData(
      ClassProxy + "/SetGanger",
      {
        UserID,
        ClassID,
      },
      2
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          func(getState());
        }
      });
  };
};
// 设置班长
const SetMonitor = ({
  ClassID,
  UserID,

  func = () => {},
}) => {
  return (dispatch, getState) => {
    let {
      DataState: {
        CommonData: { ClassDetailsParams, SelectGanderData },
      },
      PublicState: { LoginMsg },
    } = getState();
    if (ClassID === undefined) {
      ClassID = ClassDetailsParams.ClassID;
    }
    if (UserID === undefined) {
      UserID = ""; //默认取消班长
    }

    postData(
      ClassProxy + "/SetMonitor",
      {
        UserID,
        ClassID,
      },
      2
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          func(getState());
        }
      });
  };
};
// 学生调班
const ReSetStudentClass = ({
  ClassID,
  UserIDs,

  func = () => {},
}) => {
  return (dispatch, getState) => {
    let {
      DataState: {
        CommonData: { ClassDetailsParams, ResetClassParams },
      },
      PublicState: { LoginMsg },
    } = getState();

    if (ClassID === undefined) {
      ClassID = ResetClassParams.Class.value;
    }
    if (UserIDs === undefined) {
      UserIDs = ClassDetailsParams.CheckList.map(child=>child.value).join(','); //不传就不跳班
    }

    postData(
      ClassProxy + "/ReSetStudentClass",
      {
        UserIDs,
        ClassID,
      },
      2
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          func(getState());
        }
      });
  };
};
// 设置选择的学生
const COMMON_SET_SELECT_STUDENT = "COMMON_SET_SELECT_STUDENT";
const SetSelectStudent = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_SELECT_STUDENT, data: data });
  };
};
// 获取某班级学生列表
const MAIN_GET_GRADE_CLASS_TREE = "MAIN_GET_GRADE_CLASS_TREE";
const GetGradeClassTree = ({
  schoolID,

  func = () => {},
}) => {
  return (dispatch, getState) => {
    dispatch(SetLoadingVisible({ ModalLoading: true }));
    let {
      DataState: {
        CommonData: { ClassDetailsParams, selectGrade },
        
      },
      PublicState: { LoginMsg },
    } = getState();

    if (schoolID === undefined) {
      schoolID = LoginMsg.SchoolID;
    }

    getGradeClassTree(schoolID).then((data) => {
      if (data !== false) {
        dispatch({ type: MAIN_GET_GRADE_CLASS_TREE, data });
        dispatch(SetLoadingVisible({ ModalLoading: false }));

        // dispatch(PublicAction.TableLoadingClose());
        func(getState());
      }
    });
  };
};
const getGradeClassTree = async (schoolID) => {
  let res = await getData(
    UserInfoProxy + "/GetGradeClassTree?schoolID=" + schoolID,
    2
  );
  let json = await res.json();
  if (json.StatusCode === 200) {
    return json.Data;
  } else {
    return false;
  }
};
// 设置详情角色
const COMMON_SET_DETAILS_MODAL_ROLE = "COMMON_SET_DETAILS_MODAL_ROLE";
const SetDetailsModalRole = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_DETAILS_MODAL_ROLE, data: data });
  };
};
// 获取某班级学生列表
const MAIN_GET_USER_DETAIL = "MAIN_GET_USER_DETAIL";
const GetUserDetail = ({
  UserID,

  func = () => {},
}) => {
  return (dispatch, getState) => {
    // dispatch(PublicAction.TableLoadingOpen());
    // let {
    //   DataState: {
    //     CommonData: { ClassDetailsParams, selectGrade },
    //     PublicState:{LoginMsg}
    //   },
    // } = getState();

    getUserDetail(UserID).then((data) => {
      if (data !== false) {
        dispatch({ type: MAIN_GET_USER_DETAIL, data });
        // dispatch(PublicAction.TableLoadingClose());
        func(getState());
      }
    });
  };
};
const getUserDetail = async (UserID) => {
  let res = await getData(UserInfoProxy + "/GetUserDetail?UserID=" + UserID, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    return json.Data;
  } else {
    return false;
  }
};
// 设置年级班级
const COMMON_SET_RESET_CLASS_PARAMS = "COMMON_SET_RESET_CLASS_PARAMS";
const SetResetClassParams = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_RESET_CLASS_PARAMS, data: data });
  };
};
// 设置年级班级
const COMMON_SET_TOP_LEFT_DATA = "COMMON_SET_TOP_LEFT_DATA";
const SetTopLeftData = (data) => {
  return (dispatch) => {
    dispatch({ type: COMMON_SET_TOP_LEFT_DATA, data: data });
  };
};
// 设置班长
const EditGrade = ({
  GradeID,
  GradeName,

  func = () => {},
}) => {
  return (dispatch, getState) => {
    let {
      DataState: {
        CommonData: { gradeData, SelectGanderData },
      },
      PublicState: { LoginMsg },
    } = getState();
    if (GradeID === undefined) {
      GradeID = gradeData.GradeID;
    }
    if (GradeName === undefined) {
      GradeName = gradeData.GradeName
    }

    postData(
      ClassProxy + "/EditGrade",
      {
        GradeID,
        GradeName,
      },
      2
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          func(getState());
        }
      });
  };
};
export default {
  EditGrade,

  SetTopLeftData,
  COMMON_SET_TOP_LEFT_DATA,
  
  SetResetClassParams,
  COMMON_SET_RESET_CLASS_PARAMS,

  GetUserDetail,
  MAIN_GET_USER_DETAIL,

  COMMON_SET_DETAILS_MODAL_ROLE,
  SetDetailsModalRole,

  GetGradeClassTree,
  MAIN_GET_GRADE_CLASS_TREE,

  COMMON_SET_SELECT_STUDENT,
  SetSelectStudent,

  ReSetStudentClass,

  SetMonitor,

  SetGanger,

  COMMON_SET_LOADING_VISIBLE,
  SetLoadingVisible,

  SetSelectGanderData,
  COMMON_SET_SELECT_GANDER_PARAMS,

  COMMON_SET_SUBJECT_TEACHER_PARAMS,
  SetSubjectTeacherParams,

  GetTeacherToPage,
  MAIN_GET_TEACHER_TO_PAGE,

  GetSubject,
  MAIN_GET_SUBJECT,

  COMMON_SET_CLASS_DETAILS_PARAMS,
  SetClassDetailsParams,

  GetClassTeacher,
  MAIN_GET_CLASS_TEACHER,

  MAIN_GET_STUDENT_TO_PAGE,
  GetStudentToPage,

  COMMON_SET_USER_POWER,
  SetUserPower,

  AddClass,

  SetAddClassParams,
  COMMON_SET_ADD_CLASS_PARAMS,

  EditClass,

  COMMON_SET_SELECT_CLASS_DATA,
  SetSelectClassData,

  DeleteClass,

  SetClassData,
  COMMON_SET_CLASS_DATA,

  COMMON_SET_CLASS_PARAMS,
  SetClassParams,

  getGradeSummary,
  GetGradeSummary,
  MAIN_GET_CLASS_DATA,

  SetSelectGradeData,
  COMMON_SET_SELECT_GRADE_DATA,

  COMMON_SET_GRADE_DATA,
  SetGradeData,

  SetTips,
  COMMON_SET_TIPS,

  COMMON_TIPS_VISIBLE,
  SetTipsVisible,

  SetModalVisible,
  COMMON_MODAL_VISIBLE,

  GetSummary,
  MAIN_GET_GRADE_DATA,

  getLoginUser,
  GET_LOGIN_USER_INFO,
};
