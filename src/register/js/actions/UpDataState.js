import { postData, getData } from "../../../common/js/fetch";
import UpUIState from "./UpUIState";
import CONFIG from "../../../common/js/config";
import "whatwg-fetch";
import actions from "./index";

//操作常量
// 设置用户注册信息
const SET_USER_MSG = "SET_USER_MSG";
// 获取学生年级，班级
const GET_GRADE_CLASS_DATA = "GET_GRADE_CLASS_DATA";
// 获取学科信息
const GET_SUBJECT_DATA = "GET_SUBJECT_DATA";

// 获取学校信息
const GET_SCHOOL_INFO = "GET_SCHOOL_INFO";
//获取网站资源数据
// const getWebsiteResourceData = url => {
//   return dispatch => {
//     getData(CONFIG.WebsiteProxy + url, 2)
//       .then(res => {
//         dispatch({ type: actions.UpUIState.APP_LOADING_OPEN });
//         return res.json();
//       })
//       .then(json => {
//         if (json.StatusCode === 200) {
//           dispatch({ type: GET_WEBSITE_RESOURCE_DATA, data: json.Data });
//           dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
//         }
//       });
//   };
// };

const setUserMsg = (data) => {
  //data:{userMsg:userMsg}
  return (dispatch) => {
    dispatch({ type: SET_USER_MSG, data: data });
  };
};
const getGradeClassData = ({ SchoolID = "" }) => {
  return (dispatch) => {
    getData(
      CONFIG.RegisterNoTokenProxy + "/GetGradeClassTree?SchoolID=" + SchoolID
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_GRADE_CLASS_DATA, data: json.Data });
        }
      });
  };
};
const getSubjectData = ({ SchoolID = "" }) => {
  return (dispatch, getState) => {
    getData(CONFIG.RegisterProxy + "/GetSubject?SchoolID=" + SchoolID)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_SUBJECT_DATA, data: json.Data });
        }
      });
  };
};

// 接口
const getSchoolInfo = () => {
  return (dispatch, getState) => {
    dispatch(UpUIState.AppLoadingOpen());
    getData(CONFIG.RegisterProxy + "/GeSchoolInfo")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_SCHOOL_INFO, data: json.Data });
          let { DataState } = getState();
          if (
            DataState.getReisterData.SchoolList instanceof Array &&
            DataState.getReisterData.SchoolList.length === 1
          ) {
            dispatch(
              getGradeClassData({
                SchoolID: DataState.getReisterData.SchoolList[0].value,
              })
            );
            dispatch(
              getSubjectData({
                SchoolID: DataState.getReisterData.SchoolList[0].value,
              })
            );
            dispatch(
              setUserMsg({
                SchoolID: DataState.getReisterData.SchoolList[0].value,
              })
            );
            dispatch(UpUIState.AppLoadingClose());
          } else {
            dispatch(UpUIState.AppLoadingClose());
          }
        }
      });
  };
};
const GET_BASE_INFO_FOR_PAGES = "GET_BASE_INFO_FOR_PAGES";
const GetBaseInfoForPages = ({ func = () => {} }) => {
  return (dispatch, getState) => {
    getData(CONFIG.GlobalProxy + "/GetBaseInfoForPages")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_BASE_INFO_FOR_PAGES, data: json.Data });
          func(getState());
        }
      });
  };
};
const GET_VC_CODE = "GET_VC_CODE";
const GetVCCode = ({ func = () => {} }) => {
  //废
  return (dispatch, getState) => {
    getData(
      CONFIG.RegisterProxy + "/VCCode",
      1,
      "cors",
      false,
      true,
      "image/png"
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        dispatch({ type: GET_VC_CODE, data: json });
        // if (json.StatusCode === 200) {
        //   dispatch({ type: GET_VC_CODE, data: json.Data });
        //   func(getState())
        // }
      });
  };
};
const VCCodeEquals = ({ VCCode = "", func = () => {} }) => {
  return (dispatch, getState) => {
    getData(
      CONFIG.RegisterProxy + "/VCCodeEquals?code=" + VCCode,
      1,
      "cors",
      false,
      true,
      {credentials:'include' }
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch({ type: GET_SUBJECT_DATA, data: json.Data });
          func(json.Data, getState());
        }
      });
  };
};
export default {
  VCCodeEquals,

  GET_VC_CODE,
  GetVCCode,

  GET_BASE_INFO_FOR_PAGES,
  GetBaseInfoForPages,

  SET_USER_MSG,
  setUserMsg,
  GET_GRADE_CLASS_DATA,
  getGradeClassData,
  getSubjectData,
  GET_SUBJECT_DATA,
  getSchoolInfo,
  GET_SCHOOL_INFO,
};
