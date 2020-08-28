import { postData, getData } from "../../../common/js/fetch";
import UpUIState from "./UpUIState";
import Public from "../../../common/js/public";
import CONFIG from "../../../common/js/config";
import "whatwg-fetch";
import actions from "./index";

//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = "GET_LOGIN_USER_INFO";
//获取所有年级总览信息
const GET_ALL_USER_PREVIEW = "GET_ALL_USER_PREVIEW";
//获取学生档案信息
const GET_GRADE_STUDENT_PREVIEW = "GET_GRADE_STUDENT_PREVIEW";
//获取教师档案信息
const GET_SUBJECT_TEACHER_PREVIEW = "GET_SUBJECT_TEACHER_PREVIEW";
//获取领导档案信息
const GET_SCHOOL_LEADER_PREVIEW = "GET_SCHOOL_LEADER_PREVIEW";
//获取年级班级信息
const GET_GRADE_CLASS_MSG = "GET_GRADE_CLASS_MSG";
//获取职称信息
const GET_TEACHER_TITLE_MSG = "GET_TEACHER_TITLE_MSG";
//获取学科信息
const GET_SUBJECT_TEACHER_MSG = "GET_SUBJECT_TEACHER_MSG";
//编辑/添加学生
const SET_STUDENT_MSG = "SET_STUDENT_MSG";
//编辑/添加学生:默认
const SET_INIT_STUDENT_MSG = "SET_INIT_STUDENT_MSG";

//编辑/添加教师
const SET_TEACHER_MSG = "SET_TEACHER_MSG";
//编辑/添加教师:默认
const SET_INIT_TEACHER_MSG = "SET_INIT_TEACHER_MSG";
//编辑/添加领导
const SET_INIT_LEADER_MSG = "SET_INIT_LEADER_MSG";
//编辑/添加领导:默认
const SET_LEADER_MSG = "SET_LEADER_MSG";
//已审核
const GET_DID_SIGN_UP_LOG_MSG = "GET_DID_SIGN_UP_LOG_MSG";
//待审核
const GET_WILL_SIGN_UP_LOG_MSG = "GET_WILL_SIGN_UP_LOG_MSG";
//审核状态
const SET_SIGN_UP_LOG_STATUS_MSG = "SET_SIGN_UP_LOG_STATUS_MSG";

// 设置学科选择
const SET_SUBJECTID = "SET_SUBJECTID";
//设置年级选择
const SET_GRADEID = "SET_GRADEID";

// 毕业生档案
const GET_GRADUATE_GRADE_CLASS_MSG = "GET_GRADUATE_GRADE_CLASS_MSG";
// 分页获取毕业生信息
const GET_GRADUATE_PREVIEW = "GET_GRADUATE_PREVIEW";
// 编辑毕业生去向
const GET_GRADUATE_MSG = "GET_GRADUATE_MSG";
const SET_GRADUATE_MSG = "SET_GRADUATE_MSG";
// 编辑联系方式
const GET_GRADUATE_CONTACT_MSG = "GET_GRADUATE_CONTACT_MSG";
const SET_GRADUATE_CONTACT_MSG = "SET_GRADUATE_CONTACT_MSG";
// 获取未读的档案变更数量
const GET_UNREAD_LOG_COUNT_PREVIEW = "GET_UNREAD_LOG_COUNT_PREVIEW";
// 分页获取最近档案动态
const GET_UNREAD_LOG_PREVIEW = "GET_UNREAD_LOG_PREVIEW";
// 分页获取所有档案变更记录
const GET_LOG_RECORD_PREVIEW = "GET_LOG_RECORD_PREVIEW";
// 获取用户信息
const GET_USER_MSG = "GET_USER_MSG";
// 获取图片上传链接
const GET_PIC_URL = "GET_PIC_URL";
// 获取图片对象
const GET_PIC_OBJECT = "GET_PIC_OBJECT";
// 获取班主任所带的行政班
const GET_TEACHER_CLASS_DATA = "GET_TEACHER_CLASS_DATA";
// 设置学生注册审核年级班级
const SET_REGISTER_GRADE_CLASS_MSG = "SET_REGISTER_GRADE_CLASS_MSG";
// 获取变更记录
const GET_USER_LOG = "GET_USER_LOG";
// 设置教师注册审核年级班级
const SET_TEACHER_REGISTER_GRADE_CLASS_MSG =
  "SET_TEACHER_REGISTER_GRADE_CLASS_MSG";
////教师
//已审核
const GET_TEACHER_DID_SIGN_UP_LOG_MSG = "GET_TEACHER_DID_SIGN_UP_LOG_MSG";
//待审核
const GET_TEACHER_WILL_SIGN_UP_LOG_MSG = "GET_TEACHER_WILL_SIGN_UP_LOG_MSG";
//审核状态
const SET_TEACHER_SIGN_UP_LOG_STATUS_MSG = "SET_TEACHER_SIGN_UP_LOG_STATUS_MSG";
//操作的执行
//获取登录用户信息
const getLoginUser = (data) => {
  return (dispatch) => {
    dispatch({ type: GET_LOGIN_USER_INFO, data: data });
  };
};
//获取所有用户总览信息/改
const getAllUserPreview = (url) => {
  return (dispatch) => {
    // console.log(CONFIG.proxy+url);
    dispatch(actions.UpUIState.RightLoadingOpen());
    getData(CONFIG.UserInfoProxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_ALL_USER_PREVIEW, data: json.Data });
        }
      })
      .then(() => {
        dispatch(
          getUnreadLogCountPreview(() => {
            dispatch(actions.UpUIState.RightLoadingClose());
            dispatch(actions.UpUIState.TableLoadingClose());
          })
        );
      });
  };
};

//获取学生档案信息/改
const getGradeStudentPreview = (
  url,
  GradeID = { value: 0, title: "全部年级" },
  ClassID = { value: 0, title: "全部班级" }
) => {
  // console.log(GradeID, ClassID)
  let pageIndex = Public.getUrlQueryVariable(url, "PageIndex");
  let pageSize = Public.getUrlQueryVariable(url, "pageSize");
  return (dispatch) => {
    dispatch(actions.UpUIState.TableLoadingOpen());
    getData(CONFIG.UserInfoProxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({
            type: GET_GRADE_STUDENT_PREVIEW,
            data: json.Data,
            GradeID: GradeID,
            ClassID: ClassID,
            pageIndex: pageIndex,
            pageSize: pageSize,
          });
        }
      })
      .then(() => {
        dispatch(
          getUnreadLogCountPreview(() => {
            dispatch(actions.UpUIState.RightLoadingClose());
            dispatch(actions.UpUIState.TableLoadingClose());
          })
        );
      });
  };
};

//获取教师档案信息/改
const getSubjectTeacherPreview = (
  url,
  SubjectID = {
    value: "all",
    title: "全部学科",
  }
) => {
  // console.log(url)
  let pageIndex = Public.getUrlQueryVariable(url, "PageIndex");
  let pageSize = Public.getUrlQueryVariable(url, "pageSize");
  return (dispatch, getState) => {
    dispatch(actions.UpUIState.TableLoadingOpen());
    getData(CONFIG.UserInfoProxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({
            type: GET_SUBJECT_TEACHER_PREVIEW,
            data: json.Data,
            pageIndex: pageIndex,
            pageSize: pageSize,
          });
          if (SubjectID instanceof Object) {
            dispatch({ type: SET_SUBJECTID, SubjectID: SubjectID });
          } else {
            let state = getState();
            let SubjectList =
              state.DataState.SubjectTeacherMsg.returnData.SubjectList;
            let subject = { value: "all", title: "全部学科" };
            SubjectList.map((child, index) => {
              if (child.value === SubjectID) {
                subject = child;
              }
            });
            dispatch({ type: SET_SUBJECTID, SubjectID: subject });
          }
        }
      })
      .then(() => {
        dispatch(
          getUnreadLogCountPreview(() => {
            dispatch(actions.UpUIState.RightLoadingClose());
            dispatch(actions.UpUIState.TableLoadingClose());
          })
        );
      });
  };
};
//获取领导档案信息
const getSchoolLeaderPreview = (url) => {
  return (dispatch) => {
    dispatch(actions.UpUIState.TableLoadingOpen());
    // console.log(CONFIG.UserInfoProxy + url);
    getData(CONFIG.UserInfoProxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_SCHOOL_LEADER_PREVIEW, data: json.Data });
        }
      })
      .then(() => {
        dispatch(
          getUnreadLogCountPreview(() => {
            dispatch(actions.UpUIState.RightLoadingClose());
            dispatch(actions.UpUIState.TableLoadingClose());
          })
        );
      });
  };
};
//获取年级班级信息/改
const getGradeClassMsg = (url) => {
  return (dispatch) => {
    getData(CONFIG.UserInfoProxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_GRADE_CLASS_MSG, data: json.Data });
        }
      });
  };
};
//获取学科信息/改
const getSubjectTeacherMsg = (url, SubjectID = "all") => {
  return (dispatch, getState) => {
    getData(CONFIG.UserInfoProxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_SUBJECT_TEACHER_MSG, data: json.Data });
          if (SubjectID !== false) {
            if (SubjectID !== "all") {
              let state = getState();
              let SubjectList =
                state.DataState.SubjectTeacherMsg.returnData.SubjectList;
              let subject = {};
              SubjectList.map((child, index) => {
                if (child.value === SubjectID) {
                  subject = child;
                }
              });
              dispatch({ type: SET_SUBJECTID, SubjectID: subject });
              console.log(subject, SubjectID);
            } else {
              dispatch({
                type: SET_SUBJECTID,
                SubjectID: {
                  value: "all",
                  title: "全部学科",
                },
              });
            }
          }
        }
      });
  };
};
//获取职称信息/改
const getTeacherTitleMsg = (url) => {
  return (dispatch) => {
    getData(CONFIG.UserInfoProxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_TEACHER_TITLE_MSG, data: json.Data });
        }
      });
  };
};
//学生信息编辑/添加
const setStudentMsg = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_STUDENT_MSG, data: data });
  };
};
//学生信息编辑/添加：默认
const setInitStudentMsg = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_INIT_STUDENT_MSG, data: data });
  };
};
//教师信息编辑/添加
const setTeacherMsg = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_TEACHER_MSG, data: data });
  };
};
//教师信息编辑/添加：默认
const setInitTeacherMsg = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_INIT_TEACHER_MSG, data: data });
  };
};

//领导信息编辑/添加
const setLeaderMsg = (data) => {
  // console.log(data)
  return (dispatch) => {
    dispatch({ type: SET_LEADER_MSG, data: data });
  };
};
//领导信息编辑/添加：默认
const setInitLeaderMsg = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_INIT_LEADER_MSG, data: data });
  };
};

//获取学生注册记录-已审核
const getDidSignUpLog = (url) => {
  return (dispatch) => {
    dispatch(actions.UpUIState.TableLoadingOpen());

    getData(CONFIG.UserInfoProxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_DID_SIGN_UP_LOG_MSG, data: json.Data });
          dispatch(actions.UpUIState.TableLoadingClose());
          dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
        }
      });
  };
};
//获取学生注册记录-未审核
const getWillSignUpLog = (url) => {
  return (dispatch) => {
    dispatch(actions.UpUIState.TableLoadingOpen());

    getData(CONFIG.UserInfoProxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_WILL_SIGN_UP_LOG_MSG, data: json.Data });
          dispatch(actions.UpUIState.TableLoadingClose());
          dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
        }
      });
  };
};
//获取学生注册记录-修改审核次数
const setSignUpLogCountMsg = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_SIGN_UP_LOG_STATUS_MSG, data: data });
  };
};

// 毕业生档案管理-获取年级班级信息
const getGraduateGradeClassMsg = (url) => {
  return (dispatch) => {
    dispatch(actions.UpUIState.RightLoadingOpen());

    getData(CONFIG.UserInfoProxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_GRADUATE_GRADE_CLASS_MSG, data: json.Data });
          dispatch(actions.UpUIState.RightLoadingClose());
        }
      });
  };
};
// 分页获取毕业生信息
const getGraduatePreview = (url) => {
  let pageIndex = Public.getUrlQueryVariable(url, "PageIndex");
  let pageSize = Public.getUrlQueryVariable(url, "pageSize");
  return (dispatch) => {
    dispatch(actions.UpUIState.TableLoadingOpen());

    getData(CONFIG.UserInfoProxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({
            type: GET_GRADUATE_PREVIEW,
            data: json.Data,
            pageIndex: pageIndex,
            pageSize: pageSize,
          });
          dispatch(actions.UpUIState.TableLoadingClose());
        }
      });
  };
};

// 编辑毕业生去向
const getGraduateMsg = (
  data = {
    UserName: "",
    UserID: "",
    JobType: "",
    Discription: "",
  }
) => {
  return (dispatch) => {
    dispatch({ type: GET_GRADUATE_MSG, data: data });
  };
};
const setGraduateMsg = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_GRADUATE_MSG, data: data });
  };
};
// 编辑联系方式
const getGraduateContactMsg = (
  data = {
    UserID: "",
    Email: "",
    Telephone: "",
    HomeAddress: "",
  }
) => {
  return (dispatch) => {
    dispatch({ type: GET_GRADUATE_CONTACT_MSG, data: data });
  };
};
const setGraduateContactMsg = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_GRADUATE_CONTACT_MSG, data: data });
  };
};
// 获取未读的档案变更数量
const getUnreadLogCountPreview = (
  func,
  url = "/GetUnreadLogCount?OnlineUserID="
) => {
  return (dispatch, getState) => {
    // console.log(getState())
    url += getState().DataState.LoginUser.UserID;
    getData(CONFIG.UserInfoProxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_UNREAD_LOG_COUNT_PREVIEW, data: json.Data });
        }
        func();
      });
  };
};
// 分页获取最近档案动态
const getUnreadLogPreview = (url) => {
  let pageIndex = Public.getUrlQueryVariable(url, "PageIndex");
  let pageSize = Public.getUrlQueryVariable(url, "pageSize");
  return (dispatch, getState) => {
    // console.log(getState())
    dispatch(actions.UpUIState.TableLoadingOpen());
    //url += getState().DataState.LoginUser.UserID
    getData(CONFIG.UserInfoProxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({
            type: GET_UNREAD_LOG_PREVIEW,
            data: json.Data,
            pageIndex: pageIndex,
            pageSize: pageSize,
          });
          dispatch(actions.UpUIState.TableLoadingClose());
          dispatch(actions.UpUIState.RightLoadingClose());
        }
      });
  };
};
// 分页获取所有档案变更记录
const getLogRecordPreview = (url) => {
  let pageIndex = Public.getUrlQueryVariable(url, "PageIndex");
  let pageSize = Public.getUrlQueryVariable(url, "pageSize");
  return (dispatch, getState) => {
    // console.log(getState())
    //url += getState().DataState.LoginUser.UserID
    dispatch(actions.UpUIState.TableLoadingOpen());

    getData(CONFIG.UserInfoProxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({
            type: GET_LOG_RECORD_PREVIEW,
            data: json.Data,
            pageIndex: pageIndex,
            pageSize: pageSize,
          });
          dispatch(actions.UpUIState.TableLoadingClose());
          dispatch(actions.UpUIState.RightLoadingClose());
        }
      });
  };
};
//获取用户信息
const getUserMsg = (url) => {
  return (dispatch, getState) => {
    getData(CONFIG.Xproxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_USER_MSG, data: json.Data });
          let state = getState();
          let DataState = state.DataState;
          if (DataState.UserMsg.isNull) {
            dispatch(
              actions.UpUIState.showErrorAlert({
                type: "error",
                title: "该用户已删除",
                onHide: () => {
                  dispatch(actions.UpUIState.hideErrorAlert());
                },
              })
            );
          } else {
            dispatch({ type: actions.UpUIState.USER_INFO_MODAL_OPEN });
          }
        }
      });
  };
};
//关闭
const onAlertWarnHide = (dispatch) => {
  // const { dispatch } = this.props;
  //console.log('ddd')
  dispatch(actions.UpUIState.hideErrorAlert());
};
// 获取照片上传链接
const getPicObject = (data) => {
  return (dispatch) => {
    dispatch({ type: GET_PIC_OBJECT, data: data });
  };
};

// 获取用户变更记录
const getUserLog = (url, type = "student") => {
  let modal = "";
  return (dispatch) => {
    dispatch(actions.UpUIState.ModalLoadingOpen());

    if (type === "student") {
      modal = actions.UpUIState.STUDENT_CHANGE_MODAL_OPEN;
    } else if (type === "teacher") {
      modal = actions.UpUIState.TEACHER_CHANGE_MODAL_OPEN;
    } else if (type === "leader") {
      modal = actions.UpUIState.LEADER_CHANGE_MODAL_OPEN;
    }
    dispatch({ type: modal });

    getData(CONFIG.Xproxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_USER_LOG, data: json.Data });
        }
        dispatch(actions.UpUIState.ModalLoadingClose());
      });
  };
};

//获取班主任所带的行政班
const getTeacherClassMsg = (url, route = "0") => {
  return (dispatch, getState) => {
    dispatch({ type: actions.UpUIState.APP_LOADING_OPEN });

    getData(CONFIG.AdmClassProxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_TEACHER_CLASS_DATA, data: json.Data });
          let { DataState } = getState();
          if (
            DataState.GradeClassMsg.TeacherClass instanceof Array ||
            DataState.GradeClassMsg.TeacherClass[0]
          ) {
            dispatch(
              getWillSignUpLog(
                "/GetSignUpLogToPage?SchoolID=" +
                  DataState.LoginUser.SchoolID +
                  "&PageIndex=0&PageSize=10&status=" +
                  route +
                  "&classID=" +
                  DataState.GradeClassMsg.TeacherClass[0].value
              )
            );
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
          }
        }
      });
  };
};
//获取教师注册记录-已审核
const getTeacherDidSignUpLog = (url) => {
  return (dispatch) => {
    dispatch(actions.UpUIState.TableLoadingOpen());

    getData(CONFIG.UserInfoProxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_TEACHER_DID_SIGN_UP_LOG_MSG, data: json.Data });
          dispatch(actions.UpUIState.TableLoadingClose());
          dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
        }
      });
  };
};
//获取教师注册记录-未审核
const getTeacherWillSignUpLog = (url) => {
  return (dispatch) => {
    dispatch(actions.UpUIState.TableLoadingOpen());

    getData(CONFIG.UserInfoProxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_TEACHER_WILL_SIGN_UP_LOG_MSG, data: json.Data });
          dispatch(actions.UpUIState.TableLoadingClose());
          dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
        }
      });
  };
};
//获取教师注册记录-修改审核次数
const setTeacherSignUpLogCountMsg = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_TEACHER_SIGN_UP_LOG_STATUS_MSG, data: data });
  };
};

// 选择学科对添加教师学科的控制
const SET_SUBJECT_OF_ADD_TEACHER = "SET_SUBJECT_OF_ADD_TEACHER";
const setSubjectOfAddTeacher = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_SUBJECT_OF_ADD_TEACHER, data: data });
  };
};

//获取子系统的服务器地址信息
let GET_SUB_SYSTEMS_MAIN_SERVER = "GET_SUB_SYSTEMS_MAIN_SERVER";
const GetSubSystemsMainServerBySubjectID = () => {
  return (dispatch) => {
    dispatch(actions.UpUIState.TableLoadingOpen());
    let url =
      "/BaseApi/Global/GetSubSystemsMainServerBySubjectID?appid=000&access_token=4d39af1bff534514e24948568b750f6c&sysIDs=E27&subjectID=";
    getData(CONFIG.BasicProxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_SUB_SYSTEMS_MAIN_SERVER, data: json.Data });
        }
      });
  };
};
export default {
  GetSubSystemsMainServerBySubjectID,
  GET_SUB_SYSTEMS_MAIN_SERVER,

  setSubjectOfAddTeacher,
  SET_SUBJECT_OF_ADD_TEACHER,
  getLoginUser,
  getAllUserPreview,
  GET_LOGIN_USER_INFO,
  GET_ALL_USER_PREVIEW,
  getSubjectTeacherPreview,
  getGradeStudentPreview,
  getSchoolLeaderPreview,
  getSubjectTeacherMsg,
  GET_GRADE_STUDENT_PREVIEW,
  GET_SUBJECT_TEACHER_PREVIEW,
  GET_SCHOOL_LEADER_PREVIEW,
  getGradeClassMsg,
  GET_GRADE_CLASS_MSG,
  GET_SUBJECT_TEACHER_MSG,

  SET_STUDENT_MSG,
  SET_INIT_STUDENT_MSG,
  setStudentMsg,
  setInitStudentMsg,

  setTeacherMsg,
  setInitTeacherMsg,
  SET_TEACHER_MSG,
  SET_INIT_TEACHER_MSG,

  getTeacherTitleMsg,
  GET_TEACHER_TITLE_MSG,

  GET_DID_SIGN_UP_LOG_MSG,
  getDidSignUpLog,
  GET_WILL_SIGN_UP_LOG_MSG,
  getWillSignUpLog,
  setSignUpLogCountMsg,
  SET_SIGN_UP_LOG_STATUS_MSG,

  SET_SUBJECTID,
  SET_GRADEID,

  setLeaderMsg,
  setInitLeaderMsg,
  SET_INIT_LEADER_MSG,
  SET_LEADER_MSG,

  GET_GRADUATE_GRADE_CLASS_MSG,
  getGraduateGradeClassMsg,

  GET_GRADUATE_PREVIEW,
  getGraduatePreview,
  GET_GRADUATE_MSG,
  SET_GRADUATE_MSG,
  getGraduateMsg,
  setGraduateMsg,

  SET_GRADUATE_CONTACT_MSG,
  GET_GRADUATE_CONTACT_MSG,
  setGraduateContactMsg,
  getGraduateContactMsg,
  GET_UNREAD_LOG_COUNT_PREVIEW,
  getUnreadLogCountPreview,
  getUnreadLogPreview,
  GET_UNREAD_LOG_PREVIEW,
  getUserMsg,
  GET_USER_MSG,
  GET_LOG_RECORD_PREVIEW,
  getLogRecordPreview,
  GET_PIC_URL,
  getPicObject,
  GET_PIC_OBJECT,
  GET_USER_LOG,
  getUserLog,
  GET_TEACHER_CLASS_DATA,
  getTeacherClassMsg,
  SET_REGISTER_GRADE_CLASS_MSG,
  GET_TEACHER_WILL_SIGN_UP_LOG_MSG,
  GET_TEACHER_DID_SIGN_UP_LOG_MSG,
  SET_TEACHER_SIGN_UP_LOG_STATUS_MSG,
  SET_TEACHER_REGISTER_GRADE_CLASS_MSG,
  getTeacherDidSignUpLog,
  getTeacherWillSignUpLog,
  setTeacherSignUpLogCountMsg,
};
