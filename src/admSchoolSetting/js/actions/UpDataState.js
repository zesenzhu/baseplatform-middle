import { postData, getData } from "../../../common/js/fetch";
import UpUIState from "./UpUIState";
import CONFIG from "../../../common/js/config";
import "whatwg-fetch";
import actions from "./index";
import Public from "../../../common/js/public";
import moment from "moment";
let { SchoolSettingProxy } = CONFIG;

//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = "GET_LOGIN_USER_INFO";
//根据条件查询学校基础信息
const QUERY_SCHOOL_INFO = "QUERY_SCHOOL_INFO";
//设置Modal数据
const SET_SCHOOL_MODAL_DATA = "SET_SCHOOL_MODAL_DATA";
//设置Modal初始数据
const SET_SCHOOL_MODAL_INIT_DATA = "SET_SCHOOL_MODAL_INIT_DATA";
//设置Modal初始数据
const SET_SCHOOL_STATUS_DATA = "SET_SCHOOL_STATUS_DATA";
//单选
const SET_MAIN_EDIT_DATA = "SET_MAIN_EDIT_DATA";

// 设置查询参数
const SET_QUERY_SCHOOL_PARAMS = "SET_QUERY_SCHOOL_PARAMS";
// 初始化查询参数
const INIT_QUERY_SCHOOL_PARAMS = "INIT_QUERY_SCHOOL_PARAMS";
// 获取照片上传链接
const GET_IMG_URL_PROXY = "GET_IMG_URL_PROXY";
//操作的执行
//获取登录用户信息
const getLoginUser = (data) => {
  return (dispatch) => {
    dispatch({ type: GET_LOGIN_USER_INFO, data: data });
  };
};
const QuerySchoolInfo = ({ Status, keyword, currentIndex, pageSize }) => {
  return (dispatch, getState) => {
    let State = getState();
    const { DataState } = State;
    if (pageSize === undefined) {
      pageSize = DataState.CommonData.QuerySchoolParams.pageSize;
    }
    if (Status === undefined) {
      Status = DataState.CommonData.QuerySchoolParams.Status;
    }
    if (!currentIndex) {
      currentIndex = DataState.CommonData.QuerySchoolParams.currentIndex;
    }
    if (!keyword) {
      keyword = DataState.CommonData.QuerySchoolParams.keyWord;
    }
    // console.log(pageSize);
    dispatch(UpUIState.ContentLoadingOpen());

    querySchoolInfo({
      Status,
      keyword,
      currentIndex,
      pageSize,
      dispatch,
    }).then((res) => {
      // console.log(res);
      if (res) {
        dispatch(SetMainEditInitData());

        dispatch({
          type: QUERY_SCHOOL_INFO,
          data: res.Data,
          pageSize: DataState.CommonData.QuerySchoolParams.pageSize,
        });
        dispatch(UpUIState.ContentLoadingClose());
      }
    });
  };
};
const SetSchoolModalData = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_SCHOOL_MODAL_DATA, data });
  };
};
const SetSchoolModalInitData = (data) => {
  return (dispatch, getState) => {
    // dispatch({ type: UpUIState.ModalLoadingOpen() });

    dispatch({ type: SET_SCHOOL_MODAL_INIT_DATA, data });
    // dispatch({ type: UpUIState.ModalLoadingClose() });
  };
};
const SetSchoolStatusData = (data) => {
  return (dispatch, getState) => {
    // dispatch({ type: UpUIState.ModalLoadingOpen() });

    dispatch({ type: SET_SCHOOL_STATUS_DATA, data });
    // dispatch({ type: UpUIState.ModalLoadingClose() });
  };
};
const SetMainEditData = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_MAIN_EDIT_DATA, data });
  };
};
const SetMainEditInitData = () => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_MAIN_EDIT_DATA,
      data: {
        checkList: [],
        checkAll: false,
      },
    });
  };
};
const SetQuerySchoolParams = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_QUERY_SCHOOL_PARAMS, data });
  };
};
const InitQuerySchoolParams = () => {
  return (dispatch, getState) => {
    dispatch({ type: INIT_QUERY_SCHOOL_PARAMS });
  };
};

// 学校编辑：学校名称修改检查
const checkSchoolName = (func = (error, SchoolNameError) => {}) => {
  //error:普通错误，SchoolNameError：抛出没改变错误
  return (dispatch, getState) => {
    let { DataState, UIState } = getState();
    let SchoolNameError = false;

    let Test = /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,20}$/;
    let SchoolName = DataState.CommonData.SchoolModalData.SchoolName;
    let InitSchoolName = DataState.CommonData.SchoolModalInitData.SchoolName;
    let error = false;
    if (SchoolName === "") {
      dispatch({
        type: UpUIState.SET_APP_TIPS,
        data: { SchoolNameTips: "学校名称不能为空" },
      });
      dispatch(
        UpUIState.AppTipsVisible({
          SchoolNameTipsVisible: true,
        })
      );
      error = true;
    } else if (!Test.test(SchoolName)) {
      dispatch({
        type: UpUIState.SET_APP_TIPS,
        data: { SchoolNameTips: "学校名称格式不正确" },
      });
      dispatch(
        UpUIState.AppTipsVisible({
          SchoolNameTipsVisible: true,
        })
      );
      error = true;
    } else {
      dispatch(
        UpUIState.AppTipsVisible({
          SchoolNameTipsVisible: false,
        })
      );
      dispatch({
        type: UpUIState.SET_APP_TIPS,
        data: { SchoolNameTips: "学校名称格式不正确" },
      });
      if (Public.comparisonObject(InitSchoolName, SchoolName)) {
        SchoolNameError = true;
      }
      // console.log(error)
    }
    func(error, SchoolNameError);
  };
};
// 学校编辑：学校编号修改检查
const checkSchoolCode = (func = (error, SchoolCodeError) => {}) => {
  return (dispatch, getState) => {
    let { DataState, UIState } = getState();
    let Test = /^([a-zA-Z0-9]{1,24})$/;
    let SchoolCodeError = false;

    let SchoolCode = DataState.CommonData.SchoolModalData.SchoolCode;
    let InitSchoolCode = DataState.CommonData.SchoolModalInitData.SchoolCode;
    let error = false;

    if (SchoolCode === "") {
      dispatch({
        type: UpUIState.SET_APP_TIPS,
        data: { SchoolCodeTips: "学校编号不能为空" },
      });
      dispatch(
        UpUIState.AppTipsVisible({
          SchoolCodeTipsVisible: true,
        })
      );
      error = true;
    } else if (!Test.test(SchoolCode)) {
      dispatch({
        type: UpUIState.SET_APP_TIPS,
        data: { SchoolCodeTips: "学校编号格式不正确" },
      });
      dispatch(
        UpUIState.AppTipsVisible({
          SchoolCodeTipsVisible: true,
        })
      );
      error = true;
    } else {
      dispatch(
        UpUIState.AppTipsVisible({
          SchoolCodeTipsVisible: false,
        })
      );
      // dispatch({type:UpUIState.SET_APP_TIPS,data:{SchoolCodeTips:'学校编号格式不正确'}});
      // dispatch({type:UpUIState.SET_APP_TIPS,data:{CollegeNameTips:''}});
      if (Public.comparisonObject(InitSchoolCode, SchoolCode)) {
        SchoolCodeError = true;
      }
    }
    func(error, SchoolCodeError);
  };
};
// 学校编辑：联系人修改检查
const checkSchoolLinkman = (func = (error, SchoolLinkmanError) => {}) => {
  return (dispatch, getState) => {
    let { DataState, UIState } = getState();
    let Test = /^[a-zA-Z0-9_\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_\u4e00-\u9fa5]$|^[a-zA-Z0-9_\u4e00-\u9fa5]{1,50}$/;
    let SchoolLinkmanError = false;

    let SchoolLinkman = DataState.CommonData.SchoolModalData.SchoolLinkman;
    let InitSchoolLinkman =
      DataState.CommonData.SchoolModalInitData.SchoolLinkman;
    let error = false;

    if (SchoolLinkman && !Test.test(SchoolLinkman)) {
      dispatch({
        type: UpUIState.SET_APP_TIPS,
        data: { SchoolLinkmanTips: "联系人姓名格式不正确" },
      });
      dispatch(
        UpUIState.AppTipsVisible({
          SchoolLinkmanTipsVisible: true,
        })
      );
      error = true;
    } else {
      dispatch(
        UpUIState.AppTipsVisible({
          SchoolLinkmanTipsVisible: false,
        })
      );
      // dispatch({type:UpUIState.SET_APP_TIPS,data:{SchoolLinkmanTips:'学校编号格式不正确'}});
      // dispatch({type:UpUIState.SET_APP_TIPS,data:{CollegeNameTips:''}});
      if (Public.comparisonObject(InitSchoolLinkman, SchoolLinkman)) {
        SchoolLinkmanError = true;
      }
    }
    func(error, SchoolLinkmanError);
  };
};
// 学校编辑：联系电话修改检查
const checkSchoolTel = (func = (error, SchoolTelError) => {}) => {
  return (dispatch, getState) => {
    let { DataState, UIState } = getState();
    let Test = /^([0-9\/-]){1,40}$/;
    let SchoolTelError = false;

    let SchoolTel = DataState.CommonData.SchoolModalData.SchoolTel;
    let InitSchoolTel = DataState.CommonData.SchoolModalInitData.SchoolTel;
    let error = false;

    if (SchoolTel && !Test.test(SchoolTel)) {
      dispatch({
        type: UpUIState.SET_APP_TIPS,
        data: { SchoolTelTips: "联系电话格式不正确" },
      });
      dispatch(
        UpUIState.AppTipsVisible({
          SchoolTelTipsVisible: true,
        })
      );
      error = true;
    } else {
      dispatch(
        UpUIState.AppTipsVisible({
          SchoolTelTipsVisible: false,
        })
      );
      // dispatch({type:UpUIState.SET_APP_TIPS,data:{SchoolTelTips:'学校编号格式不正确'}});
      // dispatch({type:UpUIState.SET_APP_TIPS,data:{CollegeNameTips:''}});
      if (Public.comparisonObject(InitSchoolTel, SchoolTel)) {
        SchoolTelError = true;
      }
    }
    func(error, SchoolTelError);
  };
};
const checkAllData = (
  success = () => {},
  error = () => {},
  error2 = () => {}
) => {
  return (dispatch, getState) => {
    let { DataState, UIState } = getState();

    let SchoolTelError = false;
    let SchoolLinkmanError = false;
    let SchoolCodeError = false;
    let SchoolNameError = false;
    let SchoolTelError2 = false;
    let SchoolLinkmanError2 = false;
    let SchoolCodeError2 = false;
    let SchoolNameError2 = false;
    let AppTipsVisible = UIState.AppTipsVisible;
    let isError = false;
    for (let visible in AppTipsVisible) {
      if (AppTipsVisible[visible]) {
        isError = true;
      }
    }
    if (isError) {
      error();
      return;
    }
    let {
      SchoolLevel,
      SchoolSessionType,
      SchoolImgUrl,
    } = DataState.CommonData.SchoolModalData;

    let InitSchoolLevel = DataState.CommonData.SchoolModalInitData.SchoolLevel;
    let InitSchoolSessionType =
      DataState.CommonData.SchoolModalInitData.SchoolSessionType;
    let InitSchoolImgUrl =
      DataState.CommonData.SchoolModalInitData.SchoolImgUrl;
    dispatch(
      checkSchoolTel((error, Error2) => {
        SchoolTelError = error;
        SchoolTelError2 = Error2;
      })
    );
    dispatch(
      checkSchoolLinkman((error, Error2) => {
        SchoolLinkmanError = error;
        SchoolLinkmanError2 = Error2;
      })
    );
    dispatch(
      checkSchoolCode((error, Error2) => {
        SchoolCodeError = error;
        SchoolCodeError2 = Error2;
      })
    );
    dispatch(
      checkSchoolName((error, Error2) => {
        SchoolNameError = error;
        SchoolNameError2 = Error2;
      })
    );

    // if (
    //   SchoolImgUrl === InitSchoolImgUrl &&
    //   SchoolLevel.value === InitSchoolLevel.value &&
    //   SchoolSessionType.value === InitSchoolSessionType.value &&
    //   SchoolNameError2 &&
    //   SchoolTelError2 &&
    //   SchoolCodeError2 &&
    //   SchoolLinkmanError2
    // ) {
    //   dispatch(
    //     actions.UpUIState.showErrorAlert({
    //       title: "学校信息未修改",
    //     })
    //   );
    //   error2();
    // } else 
    if (
      SchoolNameError ||
      SchoolTelError ||
      SchoolCodeError ||
      SchoolLinkmanError
    ) {
      error();
    } else {
      success();
    }
  };
};
const AddSchoolInfo = (func = () => {},data={}) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/AddSchoolInfo";
    let { DataState } = getState();
    let {
      SchoolLevel,
      SchoolSessionType,
      SchoolID,
      ...other
    } = DataState.CommonData.SchoolModalData;
    postData(
      CONFIG.SchoolSettingProxy + url,
      {
        ...other,
        SchoolLevel: 2,
        // SchoolType: 1,
        SchoolImgUrl_Long:'',
        SchoolSessionType: SchoolSessionType.value,
        ...data

      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch(SetMainEditInitData());
          func();
        }
      });
  };
};
const EditSchoolInfo = (func = () => {},data={}) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/EditSchoolInfo";
    let url_univ = '/EditSchoolInfo_Univ'
    let { DataState } = getState();
    let {
      SchoolLevel,
      SchoolSessionType,
      SchoolID,SchoolImgUrl_Long,
      ...other
    } = DataState.CommonData.SchoolModalData;
    let {isUniv,...Data} =data;
    postData(
      CONFIG.SchoolSettingProxy + (isUniv?url_univ:url),
      {
        ...other,
        SchoolLevel: 2,
        // SchoolType: 1,
        SchoolID,
        SchoolImgUrl_Long:SchoolImgUrl_Long,
        SchoolSessionType: SchoolSessionType.value,
        ...Data
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch(SetMainEditInitData());
          func();
        }
      });
  };
};
const UpdateSchoolState = (State, SchoolID, func = () => {}) => {
  //State:1开启，2关闭
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/UpdateSchoolState";
    let { DataState } = getState();
    postData(
      CONFIG.SchoolSettingProxy + url,
      {
        State,
        SchoolID,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch(
            actions.UpUIState.showErrorAlert({
              title: "操作成功",
              type: "success",
            })
          );
          dispatch(SetMainEditInitData());
          func();
        }
      });
  };
};
const DeleteSchoolInfo = (SchoolID, func = () => {}) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/DeleteSchoolInfo";

    postData(
      CONFIG.SchoolSettingProxy + url,
      {
        SchoolID,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch(
            actions.UpUIState.showErrorAlert({
              title: "操作成功",
              type: "success",
            })
          );
          dispatch(SetMainEditInitData());
          func();
        }
      });
  };
};
const DeleteSchoolInfoPatch = (SchoolIDs, func = () => {}) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/DeleteSchoolInfoPatch";

    postData(
      CONFIG.SchoolSettingProxy + url,
      {
        SchoolIDs,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch(
            actions.UpUIState.showErrorAlert({
              title: "操作成功",
              type: "success",
            })
          );
          dispatch(SetMainEditInitData());
          func();
        }
      });
  };
};
// 接口
const getImgUrlProxy = () => {
  return (dispatch) => {
    // console.log(url)
    let url = "/Base/GetBaseServerAddr";
    getData(CONFIG.ImgUrlProxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json === false) {
          return false;
        }
        if (json.StatusCode === 200) {
          dispatch({ type: GET_IMG_URL_PROXY, data: json.Data });
        }
      });
  };
};

const querySchoolInfo = async ({
  pageSize,
  currentIndex,
  Status = 0,
  keyword = "",
  dispatch,
}) => {
  let url =
    CONFIG.SchoolSettingProxy +
    "/QuerySchoolInfo?Status=" +
    Status +
    "&keyword=" +
    keyword +
    "&pageSize=" +
    pageSize +
    "&currentIndex=" +
    currentIndex;
  let res = await getData(url, 2);
  // console.log(res)
  let json = await res.json();

  if (json.StatusCode === 200) {
    return json;
  } else {
    dispatch(
      actions.UpUIState.showErrorAlert({
        title: json.Msg ? json.Msg : "未知异常",
      })
    );
    return false;
  }
};

// 获取总览信息
const MAIN_GET_CURRENT_TERM_INFO_FOR_MULTI_DATA =
  "MAIN_GET_CURRENT_TERM_INFO_FOR_MULTI_DATA";
// 获取学校总览--大学
const GetCurrentTermInfoForMulti = ({ func = () => {}, schoolID }) => {
  return (dispatch, getState) => {
    // dispatch(PublicAction.ContentLoadingOpen());
    dispatch(UpUIState.ContentLoadingOpen());

    let State = getState();

    getCurrentTermInfoForMulti({
      schoolID,
    }).then((res) => {
      if (res) {
        let { Term, TermStartDate, TermEndDate } = res.Data;
        let TermDetails = {};

        let TermStartYear = (TermDetails.TermStartYear = Term.slice(
          0,
          Term.length - 2
        ).split("-")[0]);
        let TermEndYear = (TermDetails.TermEndYear = Term.slice(
          0,
          Term.length - 2
        ).split("-")[1]);
        let TermYearStatus = (TermDetails.TermYearStatus = Term.slice(
          Term.length - 1
        ));
        TermStartDate = moment(TermStartDate);
        TermEndDate = moment(TermEndDate);
        TermDetails.MomentStartDate = {
          Day: TermStartDate.format("DD"),
          Month: TermStartDate.format("MM"),
          Year: TermStartDate.format("YYYY"),
        };
        TermDetails.MomentEndDate = {
          Day: TermEndDate.format("DD"),
          Month: TermEndDate.format("MM"),
          Year: TermEndDate.format("YYYY"),
        };
        let TermList = [];
        let NextTermEndDate = "";
        let NextTermStartDate = "";
        TermStartYear = parseInt(TermStartYear);
        TermEndYear = parseInt(TermEndYear);
        if (parseInt(TermYearStatus) === 1) {
          NextTermEndDate = TermEndYear + "-07-01 00:00:00";
          NextTermStartDate = TermEndYear + "-03-01 00:00:00";
          TermList.push({
            value: TermStartYear + "-" + TermEndYear + "02",
            title: TermStartYear + "-" + TermEndYear + "  第二学期",
          });
          TermList.push({
            value: TermStartYear + 1 + "-" + (TermEndYear + 1) + "01",
            title: TermStartYear + 1 + "-" + (TermEndYear + 1) + "  第一学期",
          });
        } else if (parseInt(TermYearStatus) === 2) {
          NextTermEndDate = TermEndYear + 1 + "-02-01 00:00:00";
          NextTermStartDate = TermStartYear + 1 + "-09-01 00:00:00";
          TermList.push({
            value: TermStartYear + 1 + "-" + (TermEndYear + 1) + "01",
            title: TermStartYear + 1 + "-" + (TermEndYear + 1) + "  第一学期",
          });
          TermList.push({
            value: TermStartYear + 1 + "-" + (TermEndYear + 1) + "02",
            title: TermStartYear + 1 + "-" + (TermEndYear + 1) + "  第二学期",
          });
        }
        dispatch({
          type: MAIN_GET_CURRENT_TERM_INFO_FOR_MULTI_DATA,
          data: {
            ...res.Data,
            ...TermDetails,
            NextTermEndDate,
            NextTermStartDate,
            TermList,
          },
        });

        func(getState());
        // dispatch(PublicAction.ContentLoadingOpen());
        dispatch(UpUIState.ContentLoadingClose());
      }
    });
  };
};
const getCurrentTermInfoForMulti = async ({ schoolID = "" }) => {
  let url = SchoolSettingProxy + "/GetCurrentTermInfoForMulti";
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
const COMMON_SET_YEAR_PARAMS = "COMMON_SET_YEAR_PARAMS";
const SetYearParams = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: COMMON_SET_YEAR_PARAMS, data: data });
  };
};
//  启用新学期（仅多学校环境）
const SetNewTermInfoForMulti = ({
  StartDate,
  EndDate,
  TermName,
  func = () => {},
}) => {
  return (dispatch, getState) => {
    dispatch({ type: UpUIState.MODAL_LOADING_OPEN });

    let {
      DataState: {
        CommonData: {
          SetYearParams: { NextTermEndDate, NextTermStartDate, Term },
        },
        LoginUser: { UserID },
      },
    } = getState();

    if (StartDate === undefined) {
      StartDate = NextTermStartDate;
    }
    if (EndDate === undefined) {
      EndDate = NextTermEndDate;
    }
    if (TermName === undefined) {
      TermName = Term.value;
    }

    postData(
      SchoolSettingProxy + "/SetNewTermInfoForMulti",
      {
        StartDate,
        EndDate,
        UserID,
        TermName,
      },
      2
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          func(getState());
        }
        dispatch({ type: UpUIState.MODAL_LOADING_CLOSE });

      });
  };
};
export default {
  SetNewTermInfoForMulti,
  SetYearParams,
  COMMON_SET_YEAR_PARAMS,

  MAIN_GET_CURRENT_TERM_INFO_FOR_MULTI_DATA,
  getCurrentTermInfoForMulti,
  GetCurrentTermInfoForMulti,

  getLoginUser,
  GET_LOGIN_USER_INFO,

  querySchoolInfo,
  QuerySchoolInfo,
  QUERY_SCHOOL_INFO,
  SET_SCHOOL_MODAL_DATA,
  SET_SCHOOL_MODAL_INIT_DATA,
  SetSchoolModalData,
  SetSchoolModalInitData,
  SET_SCHOOL_STATUS_DATA,
  SetSchoolStatusData,
  SET_MAIN_EDIT_DATA,
  SetMainEditData,
  SetQuerySchoolParams,
  SET_QUERY_SCHOOL_PARAMS,
  INIT_QUERY_SCHOOL_PARAMS,
  InitQuerySchoolParams,
  // getPicObject,
  GET_IMG_URL_PROXY,
  getImgUrlProxy,
  checkSchoolName,
  checkSchoolCode,
  checkSchoolLinkman,
  checkSchoolTel,
  AddSchoolInfo,
  checkAllData,
  EditSchoolInfo,
  UpdateSchoolState,
  DeleteSchoolInfo,
  DeleteSchoolInfoPatch,
  SetMainEditInitData,
};
