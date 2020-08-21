import { postData, getData } from "../../../../common/js/fetch";

import CONFIG from "../../../../common/js/config";
import "whatwg-fetch";
import { CommonActions } from "../index";
import Public from "../../../../common/js/public";

const { HashPrevProxy } = CONFIG;
// 查询我的班级德育信息
const MAIN_GET_CLASS_MORAL_EDU_INFO_BY_CRITERIAS =
  "MAIN_GET_CLASS_MORAL_EDU_INFO_BY_CRITERIAS";

const GetClassMoralEduInfoByCriterias = ({
  func = () => {},
  userId,
  title,
  pageSize,
  pageNum,
}) => {
  return (dispatch, getState) => {
    let State = getState();
    let {
      MoreData: {
        CommonData: {
          MoralEduParams: { UserID, Title, PageSize, PageNum },
        },
      },
    } = State;
    if (userId === undefined) {
      userId = UserID;
    }
    if (title === undefined) {
      title = Title;
    }
    if (pageSize === undefined) {
      pageSize = PageSize;
    }
    if (pageNum === undefined) {
      pageNum = PageNum;
    }
    getClassMoralEduInfoByCriterias({
      Proxy,
      title,
      userId,
      pageSize,
      pageNum,
    }).then((res) => {
      if (res) {
        dispatch({
          type: MAIN_GET_CLASS_MORAL_EDU_INFO_BY_CRITERIAS,
          data: res.data,
        });
        func(getState());
        dispatch(
          UpDataState.SetLoadingVisible({ ScheduleLoadingVisible: false })
        );
      }
    });
  };
};
const getClassMoralEduInfoByCriterias = async ({
  title = "",
  userId = "",
  pageSize = "",
  pageNum = "",
  Proxy,
}) => {
  let url =
    Proxy +
    "/getClassMoralEduInfoByCriterias?title=" +
    title +
    "&userId=" +
    userId +
    "&pageSize=" +
    pageSize +
    "&pageNum=" +
    pageNum;
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.code === 0) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 关闭日程提醒_支持一次性删除多个
// const CloseScheduleRemind = ({ func = () => {}, data }) => {
//   return (dispatch, getState) => {
//     let State = getState();
//     // "scheduleid":"94964516824249168309,15156",//要关闭日程的ID串多个时用,号分割
//     // "scheduledate":"2019-09-18,2019-09-18",//要关闭日程对应的日程日期多个时用,号分割
//     // "scheduletype":"0,5",//要关闭日程对应的日程类型标识串多个时用,号分割
//     // "remindflag":"0,0",//要关闭日程对应的日程提醒标识串多个时用,号分割
//     // "deleteplanflag":"0,1"//要关闭日程对应的关闭类型标识串多个时用,号分割0自动关闭1手动关闭
//     let url = WorkScheduleProxy + "/CloseScheduleRemind";

//     postData(url, data, 2)
//       .then((res) => res.json())
//       .then((json) => {
//         if (json.StatusCode === 200) {
//           func(getState());
//         } else {
//           dispatch(
//             PublicAction.showErrorAlert({ type: "error", title: json.Msg })
//           );
//         }
//       });
//   };
// };
// 获取学生期末总评
const MAIN_GET_STUDENT_REPORT = "MAIN_GET_STUDENT_REPORT";
const GetStudentReport = ({
  func = () => {},
  Term,
  ClassID,
  GradeID,
  SchoolID,
  Proxy,
  XH,
}) => {
  return (dispatch, getState) => {
    let State = getState();
    let {
      MoreData: {
        CommonData: { StuResultParams },
      },
      systemUrl,
    } = State;
    if (Term === undefined) {
      Term = StuResultParams.Term;
    }
 
    if (SchoolID === undefined) {
      SchoolID = StuResultParams.SchoolID;
    }
    if (Proxy === undefined) {
      Proxy = systemUrl["810"].WebUrl;
    }
    if (XH === undefined) {
      XH = StuResultParams.XH;
    }
    getStudentReport({ Term, ClassID, GradeID, SchoolID, Proxy, XH }).then(
      (res) => {
        if (res) {
          dispatch({ type: MAIN_GET_STUDENT_REPORT, data: res.data });
          func(getState());
          
        }
      }
    );
  };
};
const getStudentReport = async ({
  Term = "",
  // ClassID = "",
  // GradeID = "",
  SchoolID = "",
  Proxy = "",
  XH = "",
}) => {
  let url =
    Proxy +
    "/api/JWCJZP/GetStudentReport?Term=" +
    Term +
    "&XH=" +
    XH +
    "&SchoolID=" +
    SchoolID;
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.code === 0) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 获取学生最近一次考试

const MAIN_GET_STU_NEAR_EXAM = "MAIN_GET_STU_NEAR_EXAM";
const GetStuNearExam = ({
  func = () => {},
  Term,
  ClassID,
  GradeID,
  SchoolID,
  Proxy,
  XH,
}) => {
  return (dispatch, getState) => {
    let State = getState();
    let {
      MoreData: {
        CommonData: { StuResultParams },
      },
      systemUrl,
    } = State;
    if (Term === undefined) {
      Term = StuResultParams.Term;
    }
    if (ClassID === undefined) {
      ClassID = StuResultParams.ClassID;
    }
    if (GradeID === undefined) {
      GradeID = StuResultParams.GradeID;
    }
    if (SchoolID === undefined) {
      SchoolID = StuResultParams.SchoolID;
    }
    if (Proxy === undefined) {
      Proxy = systemUrl["810"].WebUrl;
    }
    if (XH === undefined) {
      XH = StuResultParams.XH;
    }
    getStuNearExam({ Term, ClassID, GradeID, SchoolID, Proxy, XH }).then(
      (res) => {
        if (res) {
          dispatch({ type: MAIN_GET_STU_NEAR_EXAM, data: res.data });
          func(getState());
          
        }
      }
    );
  };
};
const getStuNearExam = async ({
  Term = "",
  ClassID = "",
  GradeID = "",
  SchoolID = "",
  Proxy = "",
  XH = "",
}) => {
  let url =
    Proxy +
    "/api/JWCJZP/GetStuNearExam?Term=" +
    Term +
    "&ClassID=" +
    ClassID +
    "&GradeID=" +
    GradeID +
    "&XH=" +
    XH +
    "&SchoolID=" +
    SchoolID;
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.code === 0) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
const MainActions = {
  GetStudentReport,
  MAIN_GET_STUDENT_REPORT,

  GetStuNearExam,
  MAIN_GET_STU_NEAR_EXAM,

  MAIN_GET_CLASS_MORAL_EDU_INFO_BY_CRITERIAS,
  GetClassMoralEduInfoByCriterias,
};
export default MainActions;
