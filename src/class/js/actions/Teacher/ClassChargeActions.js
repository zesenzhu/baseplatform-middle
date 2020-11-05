//界面初始化

import ApiActions from "../ApiActions";

import AppLoadingActions from "../AppLoadingActions";

import ModuleActions from "../ModuleActions";

import TeacherLogo from "../../../images/teacher-logo.png";

import AppAlertActions from "../AppAlertActions";

import SIMActions from "./StudentInfoModalActions";
import AASActions from "../AppAlertSuccess";

import utils from "../utils";
import {
    matchParamfromArray,
    matchTypeAdd,
  } from "../../../../common/js/public";
const TEACHER_CLASS_CHARGE_PAGE_INIT = "TEACHER_CLASS_CHARGE_PAGE_INIT";

const TEACHER_CLASS_CHARGE_CLASS_ACTIVE = "TEACHER_CLASS_CHARGE_CLASS_ACTIVE";

const TEACHER_CLASS_CHARGE_ACTIVE_CLASS_INFO_INIT =
  "TEACHER_CLASS_CHARGE_ACTIVE_CLASS_INFO_INIT";

const TEACHER_CLASS_CHARGE_LOADING_SHOW = "TEACHER_CLASS_CHARGE_LOADING_SHOW";

const TEACHER_CLASS_CHARGE_LOADING_HIDE = "TEACHER_CLASS_CHARGE_LOADING_HIDE";

//教师

const TEACHER_CLASS_CHARGE_TEACHER_LOADING_SHOW =
  "TEACHER_CLASS_CHARGE_TEACHER_LOADING_SHOW";

const TEACHER_CLASS_CHARGE_TEACHER_LOADING_HIDE =
  "TEACHER_CLASS_CHARGE_TEACHER_LOADING_HIDE";

const TEACHER_CLASS_CHARGE_TEACHER_LIST_UPDATE =
  "TEACHER_CLASS_CHARGE_TEACHER_LIST_UPDATE";

//学生变化

const TEACHER_CLASS_CHARGE_STUDENT_LIST_UPDATE =
  "TEACHER_CLASS_CHARGE_STUDENT_LIST_UPDATE";

const TEACHER_CLASS_CHARGE_STUDENT_SEARCH_VALUE_CHANGE =
  "TEACHER_CLASS_CHARGE_STUDENT_SEARCH_VALUE_CHANGE";

const TEACHER_CLASS_CHARGE_STUDENT_PAGE_INDEX_UPDATE =
  "TEACHER_CLASS_CHARGE_STUDENT_PAGE_INDEX_UPDATE";

const TEACHER_CLASS_CHARGE_STUDENT_SEARCH_RESULT_SHOW =
  "TEACHER_CLASS_CHARGE_STUDENT_SEARCH_RESULT_SHOW";

const TEACHER_CLASS_CHARGE_STUDENT_SEARCH_RESULT_HIDE =
  "TEACHER_CLASS_CHARGE_STUDENT_SEARCH_RESULT_HIDE";

const TEACHER_CLASS_CHARGE_STUDENT_SEARCH_CANCEL_SHOW =
  "TEACHER_CLASS_CHARGE_STUDENT_SEARCH_CANCEL_SHOW";

const TEACHER_CLASS_CHARGE_STUDENT_SEARCH_CANCEL_HIDE =
  "TEACHER_CLASS_CHARGE_STUDENT_SEARCH_CANCEL_HIDE";

const TEACHER_CLASS_CHARGE_STUDENT_LOADING_SHOW =
  "TEACHER_CLASS_CHARGE_STUDENT_LOADING_SHOW";

const TEACHER_CLASS_CHARGE_STUDENT_LOADING_HIDE =
  "TEACHER_CLASS_CHARGE_STUDENT_LOADING_HIDE";

const TEACHER_CLASS_CHARGE_STUDENT_CHECK_CHANGE =
  "TEACHER_CLASS_CHARGE_STUDENT_CHECK_CHANGE";

const TEACHER_CLASS_CHARGE_STUDENT_CHECK_ALL_FALSE =
  "TEACHER_CLASS_CHARGE_STUDENT_CHECK_ALL_FALSE";

const TEACHER_CLASS_CHARGE_STUDENT_CHECK_ALL_TRUE =
  "TEACHER_CLASS_CHARGE_STUDENT_CHECK_ALL_TRUE";

const TEACHER_CLASS_CHARGE_STUDENT_SEARCH_RESULT_KEY_CHANGE =
  "TEACHER_CLASS_CHARGE_STUDENT_SEARCH_RESULT_KEY_CHANGE";

//界面初始化
const PageInit = () => {
  return (dispatch, getState) => {
    const { UserID } = getState().DataState.LoginUser;

    ApiActions.GetClassAndPower({ UserID, dispatch }).then((data) => {
      if (data) {
        let ActiveClassID = data.Class[0].ClassID;

        let StudentPower = false;

        let TeacherPower = false;

        data.Power.map((item, key) => {
          if (item.PowerID === "Ganger_Student_CURD") {
            if (item.Status === 1) {
              StudentPower = true;
            }
          }

          if (item.PowerID === "Ganger_CourseClassTeacher_CURD") {
            if (item.Status === 1) {
              TeacherPower = true;
            }
          }
        });

        if (!StudentPower && !TeacherPower) {
          dispatch({
            type: ModuleActions.MODULE_SETTING_INFO_UPDATE,
            data: {
              ShowLeftMenu: false,

              ShowBarner: false,

              ModuleInfo: {
                cnname: "班级管理",

                enname: "Class management",

                image: TeacherLogo,

                subtitle: "班级详情",
              },
            },
          });
        }

        dispatch({
          type: TEACHER_CLASS_CHARGE_PAGE_INIT,
          data: { ...data, StudentPower, TeacherPower },
        });
        let ClassList =
          data.Class instanceof Array
            ? data.Class.map((child) => {
                return { value: child.ClassID, title: child.ClassName };
              })
            : [];
        matchParamfromArray({ array: ClassList }, (res) => {
          console.log(res, ClassList);

          if (res) {
            ActiveClassID = res.value;
          }
          dispatch({
            type: TEACHER_CLASS_CHARGE_CLASS_ACTIVE,
            data: ActiveClassID,
          });

          dispatch(ClassInfoUpdate(ActiveClassID));

          matchTypeAdd({}, (type) => {
            console.log(type);
            if (type) {
              dispatch({
                type: SIMActions.TEACHER_STUDENT_INFO_MODAL_CLASS_DROP_CHANGE,
                data: res,
              });
              dispatch({ type: SIMActions.TEACHER_STUDENT_INFO_MODAL_SHOW });
            }
          });
        });
        // dispatch({type:TEACHER_CLASS_CHARGE_CLASS_ACTIVE,data:ActiveClassID});

        // dispatch(ClassInfoUpdate(ActiveClassID));
      }
    });
  };
};

//整个班级界面更新

const ClassInfoUpdate = (ClassID) => {
  return (dispatch) => {
    dispatch({ type: TEACHER_CLASS_CHARGE_LOADING_SHOW });

    const GetClassTeacher = ApiActions.GetClassTeacher({ ClassID, dispatch });

    const GetStudentToPage = ApiActions.GetStudentToPage({
      ClassID,
      Keyword: "",
      PageIndex: 0,
      PageSize: 20,
      dispatch,
    });

    Promise.all([GetClassTeacher, GetStudentToPage]).then((res) => {
      const json1 = res[0];

      const json2 = res[1];

      let Teacher,
        Student = {};

      let StudentPlainOptions = [];

      if (json1) {
        Teacher = json1;
      }

      if (json2) {
        Student = json2;

        StudentPlainOptions = Student.List.map((item) => {
          return item.UserID;
        });
      }

      dispatch({
        type: TEACHER_CLASS_CHARGE_ACTIVE_CLASS_INFO_INIT,
        data: { Teacher, Student, StudentPlainOptions },
      });

      dispatch({ type: TEACHER_CLASS_CHARGE_LOADING_HIDE });

      dispatch(AppLoadingActions.hide());
    });
  };
};

//教师更新

const TeacherUpdate = () => {
  return (dispatch, getState) => {
    dispatch({ type: TEACHER_CLASS_CHARGE_TEACHER_LOADING_SHOW });

    const { ActiveClassID } = getState().Teacher.ClassCharge;

    ApiActions.GetClassTeacher({ ClassID: ActiveClassID, dispatch }).then(
      (data) => {
        if (data) {
          dispatch({
            type: TEACHER_CLASS_CHARGE_TEACHER_LIST_UPDATE,
            data: data,
          });
        }

        dispatch({ type: TEACHER_CLASS_CHARGE_TEACHER_LOADING_HIDE });
      }
    );
  };
};

//学生更新

const StudentUpdate = (PageIndex, IsResetPageIndex = false) => {
  return (dispatch, getState) => {
    //const FrontEndPageIndex = getState().Teacher.ClassCharge.Student.PageIndex;

    dispatch({ type: TEACHER_CLASS_CHARGE_STUDENT_LOADING_SHOW });

    const {
      ActiveClassID,
      StudentPage,
      StudentSearchOpen,
      StudentSearchValue,
    } = getState().Teacher.ClassCharge;

    let Keyword = StudentSearchOpen ? StudentSearchValue : "";

    ApiActions.GetStudentToPage({
      ClassID: ActiveClassID,
      Keyword,
      PageIndex,
      PageSize: 20,
      dispatch,
    }).then((data) => {
      if (data) {
        const { List } = data;

        const BackEndPageIndex = data.PageIndex;

        const StudentPlainOptions = List.map((item) => {
          return item.UserID;
        });

        if (IsResetPageIndex) {
          dispatch({
            type: TEACHER_CLASS_CHARGE_STUDENT_PAGE_INDEX_UPDATE,
            data: BackEndPageIndex + 1,
          });
        } else {
          dispatch({
            type: TEACHER_CLASS_CHARGE_STUDENT_PAGE_INDEX_UPDATE,
            data: PageIndex + 1,
          });
        }

        dispatch({
          type: TEACHER_CLASS_CHARGE_STUDENT_LIST_UPDATE,
          data: { Student: data, StudentPlainOptions },
        });
      }

      dispatch({ type: TEACHER_CLASS_CHARGE_STUDENT_LOADING_HIDE });
    });
  };
};

//班级变化

const ClassChange = (ClassID) => {
  return (dispatch, getState) => {
    dispatch({ type: TEACHER_CLASS_CHARGE_CLASS_ACTIVE, data: ClassID });

    dispatch(ClassInfoUpdate(ClassID));
  };
};

//设置取消班长
const SetMonitor = ({ UserID, isMonitor }) => {
  return (dispatch, getState) => {
    let MonitorID = "";

    const { List, Total } = getState().Teacher.ClassCharge.Student;

    const { ActiveClassID } = getState().Teacher.ClassCharge;

    if (!isMonitor) {
      MonitorID = UserID;
    }

    ApiActions.SetMonitor({
      UserID: MonitorID,
      ClassID: ActiveClassID,
      dispatch,
    }).then((data) => {
      if (data === 0) {
        /* let StudentList = List.map(item=>{

                    if (item.UserID === UserID){

                        let UserClass = isMonitor?0:1;

                        return {

                            ...item,

                            UserClass

                        }

                    }else{

                        return {

                            ...item,

                            UserClass:0

                        };

                    }

                 });

                let Student = { Total,List:StudentList };

                dispatch({type:TEACHER_CLASS_CHARGE_STUDENT_LIST_UPDATE,data:Student});*/

        /* dispatch(AppAlertActions.alertSuccess({title:`成功${isMonitor?'取消':'设置'}班长`}));
         */
        dispatch(
          AASActions.AlertSuccess({
            title: `成功${isMonitor ? "取消" : "设置"}班长`,
          })
        );

        dispatch(StudentUpdate(0));
      }
    });
  };
};

//搜索学生

const StuSearchClick = () => {
  return (dispatch, getState) => {
    const {
      ActiveClassID,
      StudentPage,
      StudentSearchValue,
    } = getState().Teacher.ClassCharge;

    let Keyword = StudentSearchValue.trim();

    if (Keyword !== "") {
      let RegResult = utils.SearchReg({
        type: 1,
        ErrorTips: "您输入的姓名或学号格式不正确!",
        dispatch,
        key: Keyword,
      });

      if (RegResult) {
        dispatch({ type: TEACHER_CLASS_CHARGE_STUDENT_SEARCH_RESULT_SHOW });

        dispatch({ type: TEACHER_CLASS_CHARGE_STUDENT_SEARCH_CANCEL_SHOW });

        dispatch(StudentUpdate(0));

        dispatch({
          type: TEACHER_CLASS_CHARGE_STUDENT_SEARCH_RESULT_KEY_CHANGE,
        });
      }
    } else {
      dispatch(AppAlertActions.alertWarn({ title: "搜索不能为空！" }));
    }
  };
};

//学生取消搜索

const StuCancelSearch = () => {
  return (dispatch, getState) => {
    dispatch({ type: TEACHER_CLASS_CHARGE_STUDENT_SEARCH_RESULT_HIDE });

    dispatch({ type: TEACHER_CLASS_CHARGE_STUDENT_SEARCH_CANCEL_HIDE });

    dispatch({
      type: TEACHER_CLASS_CHARGE_STUDENT_SEARCH_VALUE_CHANGE,
      data: "",
    });

    dispatch(StudentUpdate(0));
  };
};

//学生页码发生变化

const StudentPageChange = (PageIndex) => {
  return (dispatch, getState) => {
    dispatch({
      type: TEACHER_CLASS_CHARGE_STUDENT_PAGE_INDEX_UPDATE,
      data: PageIndex,
    });

    dispatch(StudentUpdate(PageIndex - 1));
  };
};

//点击学生选择

const StuCheckedChange = (e) => {
  return (dispatch, getState) => {
    dispatch({ type: TEACHER_CLASS_CHARGE_STUDENT_CHECK_CHANGE, data: e });

    let {
      StudentPlainOptions,
      StudentCheckList,
    } = getState().Teacher.ClassCharge;

    if (StudentPlainOptions.length === StudentCheckList.length) {
      dispatch({ type: TEACHER_CLASS_CHARGE_STUDENT_CHECK_ALL_TRUE });
    } else {
      dispatch({ type: TEACHER_CLASS_CHARGE_STUDENT_CHECK_ALL_FALSE });
    }
  };
};

//学生全选或者全不选\
const StudentCheckAll = (CheckAll) => {
  return (dispatch, getState) => {
    let { StudentPlainOptions } = getState().Teacher.ClassCharge;

    let StudentCheckList = [];

    if (CheckAll) {
      dispatch({ type: TEACHER_CLASS_CHARGE_STUDENT_CHECK_ALL_FALSE });
    } else {
      StudentCheckList = StudentPlainOptions;

      dispatch({ type: TEACHER_CLASS_CHARGE_STUDENT_CHECK_ALL_TRUE });
    }

    dispatch({
      type: TEACHER_CLASS_CHARGE_STUDENT_CHECK_CHANGE,
      data: StudentCheckList,
    });
  };
};

//删除学生
const DelStudent = () => {
  return (dispatch, getState) => {
    const { StudentCheckList, StudentPage } = getState().Teacher.ClassCharge;

    const { SchoolID } = getState().DataState.LoginUser;

    if (StudentCheckList.length > 0) {
      const UserIDs = StudentCheckList.join(",");

      dispatch(
        AppAlertActions.alertQuery({
          title: "确定要删除这些学生吗？",
          ok: () => {
            return () =>
              DelStudentOk({
                PageIndex: StudentPage - 1,
                UserIDs,
                SchoolID,
                dispatch,
              });
          },
        })
      );
    } else {
      dispatch(AppAlertActions.alertWarn({ title: "请先勾选学生" }));
    }
  };
};

//确定删除学生

const DelStudentOk = ({ PageIndex, SchoolID, UserIDs, dispatch }) => {
  return ApiActions.DeleteStudent({ SchoolID, UserIDs, dispatch }).then(
    (data) => {
      if (data === 0) {
        dispatch({ type: AppAlertActions.CLOSE_ERROR_ALERT });

        /*dispatch(AppAlertActions.alertSuccess({title:"删除成功！"}));*/

        /*dispatch(AASActions.AlertSuccess({title:'删除成功！'}));*/

        dispatch(AASActions.AlertSuccess({ title: `删除成功！` }));

        dispatch(StudentUpdate(PageIndex, true));
      }
    }
  );
};

export default {
  TEACHER_CLASS_CHARGE_PAGE_INIT,

  TEACHER_CLASS_CHARGE_CLASS_ACTIVE,

  TEACHER_CLASS_CHARGE_ACTIVE_CLASS_INFO_INIT,

  TEACHER_CLASS_CHARGE_LOADING_SHOW,

  TEACHER_CLASS_CHARGE_LOADING_HIDE,

  TEACHER_CLASS_CHARGE_STUDENT_LIST_UPDATE,

  TEACHER_CLASS_CHARGE_STUDENT_SEARCH_VALUE_CHANGE,

  TEACHER_CLASS_CHARGE_STUDENT_PAGE_INDEX_UPDATE,

  TEACHER_CLASS_CHARGE_STUDENT_SEARCH_CANCEL_SHOW,

  TEACHER_CLASS_CHARGE_STUDENT_SEARCH_CANCEL_HIDE,

  TEACHER_CLASS_CHARGE_STUDENT_SEARCH_RESULT_SHOW,

  TEACHER_CLASS_CHARGE_STUDENT_SEARCH_RESULT_HIDE,

  TEACHER_CLASS_CHARGE_STUDENT_LOADING_SHOW,

  TEACHER_CLASS_CHARGE_STUDENT_LOADING_HIDE,

  TEACHER_CLASS_CHARGE_TEACHER_LIST_UPDATE,

  TEACHER_CLASS_CHARGE_TEACHER_LOADING_SHOW,

  TEACHER_CLASS_CHARGE_TEACHER_LOADING_HIDE,

  TEACHER_CLASS_CHARGE_STUDENT_CHECK_CHANGE,

  TEACHER_CLASS_CHARGE_STUDENT_CHECK_ALL_TRUE,

  TEACHER_CLASS_CHARGE_STUDENT_CHECK_ALL_FALSE,

  TEACHER_CLASS_CHARGE_STUDENT_SEARCH_RESULT_KEY_CHANGE,

  PageInit,

  ClassChange,

  SetMonitor,

  StuSearchClick,

  StuCancelSearch,

  StudentPageChange,

  TeacherUpdate,

  StuCheckedChange,

  StudentCheckAll,

  DelStudent,

  StudentUpdate,
};
