import CONFIG from "../../../../common/js/config";
import AppLoadingActions from "../AppLoadingActions";
import { getData, PostData, postData } from "../../../../common/js/fetch";
const STU_GET_CUSTOM_DATA = "STU_GET_CUSTOM_DATA";

const STU_SET_CUSTOM_DATA = "STU_SET_CUSTOM_DATA";

const STU_SET_ONE_CUSTOM_DATA = "STU_SET_ONE_CUSTOM_DATA";
const STU_GET_ALTER_PERIOD_DATA = "STU_GET_ALTER_PERIOD_DATA";
const STU_GET_ALTER_DATA = "STU_GET_ALTER_DATA";
const STU_GET_WEBSITE_ALTER_TIPS = "STU_GET_WEBSITE_ALTER_TIPS";
const STU_GET_APP_ALTER_TIPS = "STU_GET_APP_ALTER_TIPS";
const STU_GET_TOOL_ALTER_TIPS = "STU_GET_TOOL_ALTER_TIPS";
const STU_GET_DATABASE_ALTER_TIPS = "STU_GET_DATABASE_ALTER_TIPS";

const STU_ADD_WEBSITE_CUSTOM_MODAL_OPEN =
  "STU_ADD_WEBSITE_CUSTOM_MODAL_OPEN";

const STU_ADD_WEBSITE_CUSTOM_MODAL_CLOSE =
  "STU_ADD_WEBSITE_CUSTOM_MODAL_CLOSE";

const STU_EDIT_WEBSITE_CUSTOM_MODAL_OPEN =
  "STU_EDIT_WEBSITE_CUSTOM_MODAL_OPEN";

const STU_EDIT_WEBSITE_CUSTOM_MODAL_CLOSE =
  "STU_EDIT_WEBSITE_CUSTOM_MODAL_CLOSE";

const STU_ADD_TOOL_CUSTOM_MODAL_OPEN = "STU_ADD_TOOL_CUSTOM_MODAL_OPEN";

const STU_ADD_TOOL_CUSTOM_MODAL_CLOSE =
  "STU_ADD_TOOL_CUSTOM_MODAL_CLOSE";

const STU_EDIT_TOOL_CUSTOM_MODAL_OPEN =
  "STU_EDIT_TOOL_CUSTOM_MODAL_OPEN";

const STU_EDIT_TOOL_CUSTOM_MODAL_CLOSE =
  "STU_EDIT_TOOL_CUSTOM_MODAL_CLOSE";

const STU_EDIT_COMBINE_CUSTOM_MODAL_OPEN =
  "STU_EDIT_COMBINE_CUSTOM_MODAL_OPEN";

const STU_EDIT_COMBINE_CUSTOM_MODAL_CLOSE =
  "STU_EDIT_COMBINE_CUSTOM_MODAL_CLOSE";

const STU_SET_CUSTOM_TIPS_VISIBLE = "STU_SET_CUSTOM_TIPS_VISIBLE";

const STU_SET_HANDLE_WEBSITE_DATA = "STU_SET_HANDLE_WEBSITE_DATA";

const STU_SET_HANDLE_WEBSITE_INIT_DATA = "STU_SET_HANDLE_WEBSITE_INIT_DATA";

const STU_GET_TYPE_LIST = "STU_GET_TYPE_LIST";

const STU_GET_PERIOD_LIST = "STU_GET_PERIOD_LIST";

const STU_SET_HANDLE_TOOL_INIT_DATA = "STU_SET_HANDLE_TOOL_INIT_DATA";

const STU_SET_HANDLE_TOOL_DATA = "STU_SET_HANDLE_TOOL_DATA";

const STU_SET_COMBINE_CUSTOM_DATA = "STU_SET_COMBINE_CUSTOM_DATA";

const STU_SET_MY_COMBINE_CUSTOM_DATA = "STU_SET_MY_COMBINE_CUSTOM_DATA";

const STU_SET_COMBINE_CUSTOM_MODAL_DATA = "STU_SET_COMBINE_CUSTOM_MODAL_DATA";

const STU_SET_ALL_CUSTOM_DATA = "STU_SET_ALL_CUSTOM_DATA";

const STU_SET_COMBINE_NAME_DATA = "STU_SET_COMBINE_NAME_DATA";

const STU_GET_IMG_URL_PROXY = "STU_GET_IMG_URL_PROXY";

const STU_GET_CUSTOM_ONE_DATA = 'STU_GET_CUSTOM_ONE_DATA'
const getCustomData = (
  key, //模块：App,Website,tool,database
  techerID, //教师 id
  keyword = "", //搜索关键词
  subjectID = "", //学科id
  periodId = "0" //学段id
) => {
  let url = ""; //桌面数据
  let url2 = ""; //备选
  let urlTips =
    "/SubjectResMgr/CommonMgr/Teacher/IsNotify?TeacherId=" + techerID;
  if (key === "tool") {
    url = "/SubjectResMgr/ToolMgr/Teacher/ListDeskTop?TeacherId=" + techerID;
    url2 =
      "/SubjectResMgr/ToolMgr/Teacher/ListAvaliableTools?TeacherId=" +
      techerID +
      "&keyWord=" +
      keyword;
    urlTips += "&SectionID=4";
  } else if (key === "App") {
    url = "/SubjectResMgr/AppMgr/Teacher/ListDeskTop?TeacherId=" + techerID;
    urlTips += "&SectionID=1";
    url2 =
      "/SubjectResMgr/AppMgr/Teacher/ListAvaliableApp?TeacherId=" +
      techerID +
      "&keyWord=" +
      keyword;
  } else if (key === "Website") {
    url = "/SubjectResMgr/WebSiteMgr/Teacher/ListDeskTop?TeacherId=" + techerID + '&SubjectId='+subjectID;
    url2 =
      "/SubjectResMgr/WebSiteMgr/Teacher/ListAvailableWebsites?TeacherID=" +
      techerID +
      "&keyWord=" +
      keyword +
      "&SubjectId=" +
      subjectID +
      "&PeriodId=" +
      periodId;
    urlTips += "&SectionID=2";
  } else if (key === "database") {
    url = "/SubjectResMgr/ResLibMgr/Teacher/ListDeskTop?TeacherId=" + techerID;
    url2 =
      "/SubjectResMgr/ResLibMgr/Teacher/listAvalibleResLib?TeacherId=" +
      techerID;
    urlTips += "&SectionID=3";
  } else {
    console.log("key值有误");
    return;
  }
  return (dispatch, getState) => {
    dispatch({ type: AppLoadingActions.CUSTOM_OPACITY_LOADING_OPEN });
    dispatch(getAlterTips(urlTips, key));

    getData(CONFIG.CustomProxy + url, 2)
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.Status === 400) {
          console.log("错误码：" + json.Status);
        } else if (json.StatusCode === 200) {
          let data1 = json.Data;
          getData(CONFIG.CustomProxy + url2, 2)
            .then(res => {
              return res.json();
            })
            .then(json => {
              if (json.StatusCode === 200) {
                dispatch({
                  type: STU_GET_CUSTOM_DATA,
                  data: data1,
                  data2: json.Data,
                  key: key
                });
                let state = getState();
                let Row = state.Student.TeacherCustomData.CombineModalData.Row;
                let Key = state.Student.TeacherCustomData.CombineModalData.key;
                let Data = {};
                if (key === "tool") {
                  Data = state.Student.TeacherCustomData.ToolData;
                } else if (key === "App") {
                  Data = state.Student.TeacherCustomData.AppData;
                } else if (key === "Website") {
                  Data = state.Student.TeacherCustomData.WebsiteData;
                } else if (key === "database") {
                  Data = state.Student.TeacherCustomData.DataBaseData;
                } else {
                  console.log("key值有误");
                  return;
                }
                console.log(Data, key);
                if (
                  Data[Row] &&
                  Data[Row].List[Key] &&
                  Data[Row].List[Key].List
                ) {
                  dispatch(setCombineCustomModalData(Data[Row].List[Key]));
                } else {
                  dispatch(
                    setCombineCustomModalData({
                      Row: -1,
                      type: "",
                      List: []
                    })
                  );
                }
                dispatch({
                  type: AppLoadingActions.CUSTOM_OPACITY_LOADING_CLOSE
                });
                dispatch({ type: AppLoadingActions.CUSTOM_LOADING_CLOSE });
              }
            });
        }
      });
  };
};
const getCumstomData = (
  key,
  keyword = "", //搜索关键词
  subjectID = "", //学科id
  periodId = "0" //学段id
) => {
  let url2 = ""; //备选
  let techerID = JSON.parse(sessionStorage.getItem("UserInfo")).UserID;
  if (key === "tool") {
    url2 =
      "/SubjectResMgr/ToolMgr/Teacher/ListAvaliableTools?TeacherId=" +
      techerID +
      "&keyWord=" +
      keyword;
  } else if (key === "App") {
    url2 =
      "/SubjectResMgr/AppMgr/Teacher/ListAvaliableApp?TeacherId=" +
      techerID +
      "&keyWord=" +
      keyword;
  } else if (key === "Website") {
    url2 =
      "/SubjectResMgr/WebSiteMgr/Teacher/ListAvailableWebsites?TeacherID=" +
      techerID +
      "&keyWord=" +
      keyword +
      "&SubjectId=" +
      subjectID +
      "&PeriodId=" +
      periodId;
  } else if (key === "database") {
    url2 =
      "/SubjectResMgr/ResLibMgr/Teacher/listAvalibleResLib?TeacherId=" +
      techerID;
  } else {
    console.log("key值有误");
    return;
  }
  return (dispatch, getState) => {
    getData(CONFIG.CustomProxy + url2, 2)
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          let data = getState();
          dispatch({
            type: STU_GET_CUSTOM_ONE_DATA,
            data: json.Data,
            key: key
          });
        }
      });
  };
};
// 同滑块内
const setCustomData = (dataType, dataObj, source, destination) => {
  return dispatch => {
    dispatch({ type: STU_SET_CUSTOM_DATA, dataType, dataObj, source, destination });
  };
};
// 更改main数据
const fetchCustomData = (url, dataType = "Website") => {
  return (dispatch, getState) => {
    dispatch({ type: AppLoadingActions.CUSTOM_LOADING_OPEN });
    let State = getState();
    let MainData = State.Student.TeacherCustomData.WebsiteData;
    if (dataType === "Website") {
      MainData = State.Student.TeacherCustomData.WebsiteData;
    } else if (dataType === "App") {
      MainData = State.Student.TeacherCustomData.AppData;
    } else if (dataType === "tool") {
      MainData = State.Student.TeacherCustomData.ToolData;
    } else if (dataType === "database") {
      MainData = State.Student.TeacherCustomData.DataBaseData;
    }

    let NewData = {};
    let List = [];
    let Groups = [];
    let OrderNo = 1;
    MainData.map((Child, Index) => {
      Child.List.map((child, index) => {
        let group = {};
        if (child.IsGroup) {
          group.GroupName = child.Name;
          group.List = [];
          let No = 0;
          child.List.map((child1, index1) => {
            child1.List.map(child2 => {
              group.List.push({
                ID: child2.ID,
                OrderNo: No++
              });
            });
          });
          group.OrderNo = OrderNo++;
          Groups.push(group);
        } else {
          List.push({
            ID: child.ID,
            OrderNo: OrderNo++
          });
        }
      });
    });

    NewData = { TeacherID: State.LoginUser.UserID, List: List, Groups: Groups };

    postData(
      CONFIG.CustomProxy + url,
      {
        TeacherID: State.LoginUser.UserID,
        List: List,
        Groups: Groups
      },
      2,
      "json"
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch({ type: AppLoadingActions.CUSTOM_LOADING_CLOSE });
        }
      });
  };
};

// 删除数据
const fetchDeleteCustomData = (url, ID, dataType = "Website") => {
  return (dispatch, getState) => {
    dispatch({ type: AppLoadingActions.CUSTOM_LOADING_OPEN });
    let State = getState();
    let IDObj = {};
    if (dataType === "Website") {
      IDObj = { WebsiteID: ID };
    } else if (dataType === "tool") {
      IDObj = { ToolID: ID };
    }
    postData(
      CONFIG.CustomProxy + url,
      {
        TeacherID: State.LoginUser.UserID,
        SchoolID: State.LoginUser.SchoolID,
        ...IDObj
      },
      2,
      "json"
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch({ type: AppLoadingActions.CUSTOM_LOADING_CLOSE });
        }
      });
  };
};

// 同滑块内
const setOneCustomData = (dataObj, source) => {
  return dispatch => {
    dispatch({ type: STU_SET_ONE_CUSTOM_DATA, dataObj, source });
  };
};

// 获取学段
const getAlterPeriodData = url => {
  return dispatch => {
    getData(CONFIG.CustomProxy + url, 2)
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch({ type: STU_GET_ALTER_PERIOD_DATA, data: json.Data });
        }
      });
  };
};

// 获取备选
const getAlterData = url => {
  return dispatch => {
    getData(CONFIG.CustomProxy + url, 2)
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch({ type: STU_GET_ALTER_DATA, data: json.Data });
        }
      });
  };
};
// 获取提示
const getAlterTips = (url, type = "Website") => {
  return dispatch => {
    getData(CONFIG.CustomProxy + url, 2)
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          if (type === "Website") {
            dispatch({ type: STU_GET_WEBSITE_ALTER_TIPS, data: json.Data });
          } else if (type === "App") {
            dispatch({ type: STU_GET_APP_ALTER_TIPS, data: json.Data });
          } else if (type === "tool") {
            dispatch({ type: STU_GET_TOOL_ALTER_TIPS, data: json.Data });
          } else if (type === "database") {
            dispatch({ type: STU_GET_DATABASE_ALTER_TIPS, data: json.Data });
          }
        }
      });
  };
};
// 获取提示
const setAlterTips = (data, type = "Website") => {
  let url = "/SubjectResMgr/CommonMgr/Teacher/SetNotNotify";

  return dispatch => {
    if (type === "Website") {
      dispatch({ type: STU_GET_WEBSITE_ALTER_TIPS, data: false });
    } else if (type === "App") {
      dispatch({ type: STU_GET_APP_ALTER_TIPS, data: false });
    } else if (type === "tool") {
      dispatch({ type: STU_GET_TOOL_ALTER_TIPS, data: false });
    } else if (type === "database") {
      dispatch({ type: STU_GET_DATABASE_ALTER_TIPS, data: false });
    }
    dispatch({ type: AppLoadingActions.CUSTOM_LOADING_OPEN });

    postData(CONFIG.CustomProxy + url, data, 2, "json")
      .then(res => {
        return res.json();
      })
      .then(json => {
        dispatch({ type: AppLoadingActions.CUSTOM_LOADING_CLOSE });

        if (json.StatusCode === 200) {
        }
      });
  };
};
const setCustomTipsVisible = visibleObj => {
  return dispatch => {
    dispatch({ type: STU_SET_CUSTOM_TIPS_VISIBLE, data: visibleObj });
  };
};

const setHandleWebsiteData = data => {
  return dispatch => {
    dispatch({ type: STU_SET_HANDLE_WEBSITE_DATA, data: data });
  };
};
const setHandleWebsiteInitData = data => {
  return dispatch => {
    dispatch({ type: STU_SET_HANDLE_WEBSITE_INIT_DATA, data: data });
  };
};

const setHandleToolData = data => {
  return dispatch => {
    dispatch({ type: STU_SET_HANDLE_TOOL_DATA, data: data });
  };
};
const setHandleToolInitData = data => {
  return dispatch => {
    dispatch({ type: STU_SET_HANDLE_TOOL_INIT_DATA, data: data });
  };
};

// 获取网站类型列表
const getTypeList = (url, type = "add") => {
  return (dispatch, getState) => {
    getData(CONFIG.CustomProxy + url, 2)
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch({ type: STU_GET_TYPE_LIST, data: json.Data });
          if (type === "add") {
            let { Student } = getState();
            if (Student.TeacherCustomData.WebTypeList[0])
              dispatch(
                setHandleWebsiteData({
                  WebType: Student.TeacherCustomData.WebTypeList[0]
                })
              );
          }
        }
      });
  };
};

const getPeriodList = data => {
  return dispatch => {
    dispatch({ type: STU_GET_PERIOD_LIST, data: data });
  };
};
const setCombineCustomData = data => {
  return dispatch => {
    dispatch({ type: STU_SET_COMBINE_CUSTOM_DATA, data: data });
  };
};
const setMyCombineCustomData = (data, type) => {
  return (dispatch, getState) => {
    dispatch({ type: STU_SET_MY_COMBINE_CUSTOM_DATA, data: data });
    let state = getState();
    let { Row, key } = state.Student.TeacherCustomData.CombineModalData;
    let Data = {};
    if (type === "tool") {
      Data = state.Student.TeacherCustomData.ToolData;
    } else if (type === "App") {
      Data = state.Student.TeacherCustomData.AppData;
    } else if (type === "Website") {
      Data = state.Student.TeacherCustomData.WebsiteData;
    } else if (type === "database") {
      Data = state.Student.TeacherCustomData.DataBaseData;
    } else {
      console.log("type值有误");
      return;
    }
    if (Data[Row] && Data[Row].List[key] && Data[Row].List[key].List) {
      dispatch(setCombineCustomModalData(Data[Row].List[key]));
    } else {
      dispatch(
        setCombineCustomModalData({
          Row: -1,
          type: "",
          List: []
        })
      );
    }
  };
};
const setCombineCustomModalData = (data, Row = "", key = "") => {
  return dispatch => {
    let Data = {};
    if (Row === "" && key === "") {
      Data = { data: data };
    } else {
      Data = { data: data, Row: Row, key: key };
    }
    dispatch({ type: STU_SET_COMBINE_CUSTOM_MODAL_DATA, data: Data });
  };
};
const setAllCustomData = data => {
  return dispatch => {
    dispatch({ type: STU_SET_ALL_CUSTOM_DATA, data: data });
  };
};
const setCombineNameData = data => {
  return dispatch => {
    dispatch({ type: STU_SET_COMBINE_NAME_DATA, data: data });
  };
};

const getImgUrlProxy = url => {
  return dispatch => {
    // console.log(url)
    getData(CONFIG.ImgUrlProxy + url, 2)
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json === false) {
          return false;
        }
        if (json.StatusCode === 200) {
          dispatch({ type: STU_GET_IMG_URL_PROXY, data: json.Data });
        }
      });
  };
};

export default {
  STU_GET_CUSTOM_DATA,

  getCustomData,

  setCustomData,

  STU_SET_CUSTOM_DATA,

  fetchCustomData,

  STU_SET_ONE_CUSTOM_DATA,

  setOneCustomData,
  fetchDeleteCustomData,

  getAlterPeriodData,

  STU_GET_ALTER_PERIOD_DATA,

  STU_GET_ALTER_DATA,

  getAlterData,
  STU_GET_WEBSITE_ALTER_TIPS,
  STU_GET_APP_ALTER_TIPS,
  STU_GET_TOOL_ALTER_TIPS,
  STU_GET_DATABASE_ALTER_TIPS,
  setAlterTips,
  STU_ADD_WEBSITE_CUSTOM_MODAL_CLOSE,
  STU_ADD_WEBSITE_CUSTOM_MODAL_OPEN,
  STU_EDIT_WEBSITE_CUSTOM_MODAL_CLOSE,
  STU_EDIT_WEBSITE_CUSTOM_MODAL_OPEN,
  STU_SET_CUSTOM_TIPS_VISIBLE,
  setCustomTipsVisible,
  STU_SET_HANDLE_WEBSITE_DATA,
  setHandleWebsiteData,
  STU_SET_HANDLE_WEBSITE_INIT_DATA,
  setHandleWebsiteInitData,
  STU_GET_TYPE_LIST,
  getTypeList,
  STU_GET_PERIOD_LIST,
  getPeriodList,
  STU_ADD_TOOL_CUSTOM_MODAL_OPEN,
  STU_ADD_TOOL_CUSTOM_MODAL_CLOSE,
  STU_EDIT_TOOL_CUSTOM_MODAL_OPEN,
  STU_EDIT_TOOL_CUSTOM_MODAL_CLOSE,
  STU_SET_HANDLE_TOOL_INIT_DATA,
  STU_SET_HANDLE_TOOL_DATA,
  setHandleToolData,
  setHandleToolInitData,
  STU_SET_COMBINE_CUSTOM_DATA,
  STU_SET_MY_COMBINE_CUSTOM_DATA,
  setCombineCustomData,
  setMyCombineCustomData,
  STU_EDIT_COMBINE_CUSTOM_MODAL_CLOSE,
  STU_EDIT_COMBINE_CUSTOM_MODAL_OPEN,
  STU_SET_COMBINE_CUSTOM_MODAL_DATA,
  setCombineCustomModalData,
  STU_SET_ALL_CUSTOM_DATA,
  setAllCustomData,
  STU_SET_COMBINE_NAME_DATA,
  setCombineNameData,
  STU_GET_IMG_URL_PROXY,
  getImgUrlProxy,
  getCumstomData,
  STU_GET_CUSTOM_ONE_DATA
};
