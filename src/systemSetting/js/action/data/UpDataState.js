import Api from "../data/Api";
import { getData, postData } from "../../../../common/js/fetch";

import config from "../../../../common/js/config";
let { TextBookProxy, TextBookProxy_2 } = config;
let { getMethod, postMethod } = Api;
//获取登录用户信息
const GET_LOGIN_USER_INFO = "GET_LOGIN_USER_INFO";
//获取登录用户信息
const getLoginUser = (data) => {
  return (dispatch) => {
    dispatch({ type: GET_LOGIN_USER_INFO, data: data });
  };
};
// // 查看系统信息初始化情况
// const GET_SYSSETTING_INIT_DATA =
//   "GET_SYSSETTING_INIT_DATA";
// const GetSysSettingInitData = ({func=()=>{}}) => {
//   return (dispatch, getState) => {
//     let {SchoolID} = getState().DataState.LoginUser;
//     let url = InitSeytemProxy+'GetSubjectInitializationState?SchoolID='+SchoolID
//     getMethod(url).then(json=>{
//         dispatch({type:GET_SYSSETTING_INIT_DATA,data:json.Data})
//         func(getState())
//     })
//   };
// };
// 获取学校学科列表

const GET_SUBJECT_LIST_DATA = "GET_SUBJECT_LIST_DATA";
const GetSubjectListData = ({ isFirstLoad = true, func = () => { } }) => {
  return (dispatch, getState) => {
    let { SchoolID } = getState().DataState.LoginUser;
    // console.log('dssd')
    if (!SchoolID) {
      return;
    }
    let url = TextBookProxy + "/GetSubjectList?SchoolID=" + SchoolID;
    dispatch(SetSubjectsLoading(true));
    getData(url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        dispatch({ type: GET_SUBJECT_LIST_DATA, data: json.Data });

        if (isFirstLoad) {
          dispatch(
            SetOpenSubjectData({
              OpenList: [
                getState().DataState.TextBookData.SubjectList.SubjectList[0]
                  .value,
              ],
            })
          );
          let SubjectList = getState().DataState.TextBookData.SubjectList
            .SubjectList;
          let SelectSubjectsLoading = {};
          SubjectList instanceof Array &&
            SubjectList.map((child) => {
              SelectSubjectsLoading[child.value] = false;
            });
          dispatch(SetSelectSubjectLoading(SelectSubjectsLoading));
        }

        func(getState());
        dispatch(SetSubjectsLoading(false));
      });
  };
};
const GET_GRADE_SUBJECT_LIST_DATA = "GET_GRADE_SUBJECT_LIST_DATA";
const GetGradeSubjectInfo = ({ schoolId, func = () => { } }) => {
  return (dispatch, getState) => {
    let { SchoolID } = getState().DataState.LoginUser;
    // console.log('dssd')
    if (!SchoolID) {
      return;
    }
    let url = TextBookProxy + "/GetGradeSubjectInfo?SchoolID=" + SchoolID;
    dispatch(SetSelectSubjectLoading(true));
    getData(url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        let { InitData } = getState().DataState.TextBookData.SubjectList;
        json.Data.unshift({
          GradeId: "",
          GradeName: "全部年级",
          OrderNo: 0,
          Subjects:JSON.parse(JSON.stringify(InitData))
        })
        dispatch({ type: GET_GRADE_SUBJECT_LIST_DATA, data: json.Data });

        // if (isFirstLoad) {
        //   dispatch(
        //     SetOpenSubjectData({
        //       OpenList: [
        //         getState().DataState.TextBookData.SubjectList.SubjectList[0]
        //           .value,
        //       ],
        //     })
        //   );
        //   let SubjectList = getState().DataState.TextBookData.SubjectList
        //     .SubjectList;
        //   let SelectSubjectsLoading = {};
        //   SubjectList instanceof Array &&
        //     SubjectList.map((child) => {
        //       SelectSubjectsLoading[child.value] = false;
        //     });
        //   dispatch(SetSelectSubjectLoading(SelectSubjectsLoading));
        // }
        dispatch(SetSelectSubjectLoading(false));
        func(getState().DataState.TextBookData);
        // dispatch(SetSubjectsLoading(false));
      });
  };
};
// 获取教材指定信息列表

const GET_SUBJECT_INFO_DATA = "GET_SUBJECT_INFO_DATA";
const GetSubjectInfoData = ({
  subjectId,
  func = () => { },
  useDefault = true,
}) => {
  return (dispatch, getState) => {
    // let { SchoolID } = getState().DataState.LoginUser;
    let url = TextBookProxy + "/SubjectInfo?subjectId=" + subjectId;
    let SelectSubjectsLoading = {};
    SelectSubjectsLoading[subjectId] = true;
    dispatch(SetSelectSubjectLoading(SelectSubjectsLoading));
    getData(url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        dispatch({ type: GET_SUBJECT_INFO_DATA, data: json.Data, subjectId });
        if (useDefault) {
          // dispatch(SetOpenSubjectData({ subjectId, isAdd: true }));
          let SelectSubjectsLoading = {};

          SelectSubjectsLoading[subjectId] = false;
          dispatch(SetSelectSubjectLoading(SelectSubjectsLoading));
        }
        func(getState());
      });
  };
};
// 设置打开的卡片抽屉
const SET_OPEN_SUBJECT_DATA = "SET_OPEN_SUBJECT_DATA";
const SetOpenSubjectData = ({ OpenList = [] }) => {
  return (dispatch, getState) => {
    let OldOpenList = getState().DataState.TextBookParams.SelectSubjects
      .OpenList;
    // let OpenList = [];
    // let isRepeat = false;
    // OldOpenList instanceof Array &&
    //   OldOpenList.map((child) => {
    //     //去重
    //     if (isAdd) {
    //       if (subjectId === child) {
    //         isRepeat = true;
    //       }
    //       OpenList.push(child);
    //     } else {
    //       if (subjectId !== child) {
    //         OpenList.push(child);
    //       }
    //     }
    //   });
    // if (isAdd && !isRepeat) {
    //   OpenList.push(subjectId);
    // }
    let Array_large = [];
    let Array_small = [];
    let isAdd = false;
    if (OpenList.length > OldOpenList.length) {
      Array_large = OpenList;
      Array_small = OldOpenList;
      isAdd = true;
    } else if (OpenList.length < OldOpenList.length) {
      Array_large = OldOpenList;
      Array_small = OpenList;
    } else {
      Array_large = OldOpenList;
      Array_small = OpenList;
    }
    let IDofOpen = "";
    Array_large.map((largeChild, largeIndex) => {
      let isEqual = false;
      Array_small.map((smallChild, smallIndex) => {
        if (largeChild === smallChild) {
          isEqual = true;
        }
      });
      if (!isEqual && isAdd) {
        IDofOpen = largeChild;
      }
    });
    if (IDofOpen) {
      dispatch({
        type: SET_OPEN_SUBJECT_DATA,
        data: { OpenList, OpenPanel: IDofOpen },
      });
      dispatch(GetSubjectInfoData({ subjectId: IDofOpen }));
    } else dispatch({ type: SET_OPEN_SUBJECT_DATA, data: { OpenList } });
  };
};
// 设置每个学科loading
const SET_SELECT_SUBJECT_LOADING = "SET_SELECT_SUBJECT_LOADING";
const SetSelectSubjectLoading = (selectSubjectLoading) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_SELECT_SUBJECT_LOADING, data: selectSubjectLoading });
  };
};
// 设置教材总loading
const SET_SUBJECTS_LOADING = "SET_SUBJECTS_LOADING";
const SetSubjectsLoading = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_SUBJECTS_LOADING, data });
  };
};

// 设置教材
const SET_TEXT_BOOK_DATA = "SET_TEXT_BOOK_DATA";
const SetTextBookData = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_TEXT_BOOK_DATA, data });
  };
};
// 设置初始数据
const SET_TEXT_BOOK_INIT_DATA = "SET_TEXT_BOOK_INIT_DATA";
const SetTextBookInitData = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_TEXT_BOOK_INIT_DATA, data });
  };
};
// 设置textbookModal visible
const SET_TEXT_BOOK_MODAL_PARAMS = "SET_TEXT_BOOK_MODAL_PARAMS";
const SetTextBookModalParams = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_TEXT_BOOK_MODAL_PARAMS, data });
  };
};
// 获取教材节点

const GET_NODE_INFO_DATA = "GET_NODE_INFO_DATA";
const GetNodeInfoData = ({ upId, func = () => { } }) => {
  return (dispatch, getState) => {
    // let { SchoolID } = getState().DataState.LoginUser;
    dispatch(
      SetNodeInfoData({
        TextBookModalVisible: true,
        TextBookModalLaoding: true,
        TextBookID: upId,
      })
    );
    // let url = TextBookProxy_2 + "/GetNodeInfo?upId=" + upId;
    let url = TextBookProxy + "/GetChildNodes?upId=" + upId;
    getData(url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        dispatch({ type: GET_NODE_INFO_DATA, data: json.Data });
        dispatch(SetNodeInfoData({ TextBookModalLaoding: false }));

        func(getState());
      });
  };
};
// 设置教材节点信息
const SET_NODE_INFO_DATA = "SET_NODE_INFO_DATA";
const SetNodeInfoData = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_NODE_INFO_DATA, data });
  };
};
// 获取学校学科列表

const SET_TEXT_BOOK_INFO_DATA = "SET_TEXT_BOOK_INFO_DATA";
const SetTextBookInfoData = ({
  subjectId,
  gradeId,
  textbookId,
  periodId,
  func = () => { },
}) => {
  return (dispatch, getState) => {
    let { SchoolID } = getState().DataState.LoginUser;
    let url = TextBookProxy + "/SetTextBookInfo";
    postData(
      url,
      {
        subjectId,
        gradeId,
        textbookId,
        SchoolID,
        periodId
      },
      2
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        dispatch({ type: SET_TEXT_BOOK_INFO_DATA, data: json.Data });
        func(getState());
      });
  };
};
// 获取对应年级的教材列表
const GET_TEXT_BOOK_LIST_DATA = "GET_TEXT_BOOK_LIST_DATA";
const GetTextBookList = ({
  subjectId,
  gradeId,
  // SchoolID,
  // periodId,
  func = () => { },
}) => {
  return (dispatch, getState) => {
    dispatch(
      SetTextBookModalParams({ SetTextBookModalLoading: true })
    );
    let SchoolID = getState().DataState.LoginUser.SchoolID;
    let url =
      TextBookProxy +
      "/GetTextBookList?SchoolID=" +
      SchoolID +
      "&subjectId=" +
      subjectId +
      "&gradeId=" +
      gradeId
      ;
    getData(url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        dispatch({ type: GET_TEXT_BOOK_LIST_DATA, data: json.Data });
        dispatch(
          SetTextBookModalParams({
            SetTextBookModalLoading: false,
          })
        );

        func(getState());
      });
  };
};
export default {
  GET_TEXT_BOOK_LIST_DATA,
  GetTextBookList,
  SetTextBookModalParams,
  SET_TEXT_BOOK_MODAL_PARAMS,

  SetTextBookData,
  SET_TEXT_BOOK_DATA,

  SetTextBookInitData,
  SET_TEXT_BOOK_INIT_DATA,

  SetSubjectsLoading,
  SET_SUBJECTS_LOADING,

  SetSelectSubjectLoading,
  SET_SELECT_SUBJECT_LOADING,

  SET_TEXT_BOOK_INFO_DATA,
  SetTextBookInfoData,

  SET_NODE_INFO_DATA,
  SetNodeInfoData,

  GET_NODE_INFO_DATA,
  GetNodeInfoData,

  SET_OPEN_SUBJECT_DATA,
  SetOpenSubjectData,

  GET_SUBJECT_INFO_DATA,
  GetSubjectInfoData,

  getLoginUser,
  GET_LOGIN_USER_INFO,

  GET_SUBJECT_LIST_DATA,
  GetSubjectListData,

  GET_GRADE_SUBJECT_LIST_DATA,
  GetGradeSubjectInfo,
};
