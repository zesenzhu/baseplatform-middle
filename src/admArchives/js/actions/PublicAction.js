///操作名称
const APP_LOADING_CLOSE = "APP_LOADING_CLOSE";
const APP_LOADING_OPEN = "APP_LOADING_OPEN";
const MODAL_LOADING_CLOSE = "MODAL_LOADING_CLOSE";
const MODAL_LOADING_OPEN = "MODAL_LOADING_OPEN";
const TABLE_LOADING_CLOSE = "TABLE_LOADING_CLOSE";
const TABLE_LOADING_OPEN = "TABLE_LOADING_OPEN";
const SHOW_ERROR_ALERT = "SHOW_ERROR_ALERT";
const CLOSE_ERROR_ALERT = "CLOSE_ERROR_ALERT";
const SHOW_WARN_ALERT = "SHOW_WARN_ALERT";
const CLOSE_WARN_ALERT = "CLOSE_WARN_ALERT";
const SHOW_QUERY_ALERT = "SHOW_QUERY_ALERT";
const CLOSE_QUERY_ALERT = "CLOSE_QUERY_ALERT";
const CONTENT_LOADING_CLOSE = "CONTENT_LOADING_CLOSE";
const CONTENT_LOADING_OPEN = "CONTENT_LOADING_OPEN";
//操作
const showErrorAlert = ({
  type = "btn-error",
  title = "",
  littleTitle = "",
  onOk,
  onCancel,
  onClose,
  onHide,
}) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_ERROR_ALERT,
      msg: {
        type,
        title,
        littleTitle,
        onOk:onOk?onOk: ()=>onAppAlertOK(dispatch),
        onCancel:onCancel?onCancel:()=>onAppAlertCancel(dispatch),
        onClose:onClose?onClose:()=>onAppAlertClose(dispatch),
        onHide:onHide?onHide:()=>onAlertWarnHide(dispatch),
      },
    });
  };
};

const hideErrorAlert = () => {
  return { type: CLOSE_ERROR_ALERT };
};
const showWarnAlert = (alertMsg) => {
  return { type: SHOW_WARN_ALERT, msg: alertMsg };
};

const hideWarnAlert = () => {
  return { type: CLOSE_WARN_ALERT };
};
const showQueryAlert = (alertMsg) => {
  return { type: SHOW_QUERY_ALERT, msg: alertMsg };
};

const hideQueryAlert = () => {
  return { type: CLOSE_QUERY_ALERT };
};
 

//loading
const ModalLoadingOpen = () => {
  return { type: MODAL_LOADING_OPEN };
};
const ModalLoadingClose = () => {
  return { type: MODAL_LOADING_CLOSE };
};
//loading
const TableLoadingOpen = () => {
  return (dispatch,getState) => {
    let state = getState()
    if(!state.PublicState.Loading.ContentLoading)
    dispatch({ type: TABLE_LOADING_OPEN });
  };
};
const TableLoadingClose = () => {
  return { type: TABLE_LOADING_CLOSE };
};
const AppLoadingOpen = () => {
  return { type: APP_LOADING_OPEN };
};
const AppLoadingClose = () => {
  return { type: APP_LOADING_CLOSE };
};
const ContentLoadingOpen = () => {
  return { type: CONTENT_LOADING_OPEN };
};
const ContentLoadingClose = () => {
  return { type: CONTENT_LOADING_CLOSE };
};
//自动关闭
const onAlertWarnHide = (dispatch) => {
  dispatch(hideErrorAlert());
};
//提示弹窗
const onAppAlertOK = (dispatch) => {
  dispatch(hideErrorAlert());
};
const onAppAlertCancel = (dispatch) => {
  dispatch(hideErrorAlert());
};
const onAppAlertClose = (dispatch) => {
  dispatch(hideErrorAlert());
};

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
export default {
  GET_LOGIN_USER_INFO,
  getLoginUser,

  
  onAlertWarnHide,
  onAppAlertOK,
  onAppAlertCancel,
  onAppAlertClose,
  APP_LOADING_CLOSE,
  APP_LOADING_OPEN,
  AppLoadingOpen,
  AppLoadingClose,



  SHOW_ERROR_ALERT,
  CLOSE_ERROR_ALERT,
  SHOW_WARN_ALERT,
  CLOSE_WARN_ALERT,
  SHOW_QUERY_ALERT,
  CLOSE_QUERY_ALERT,

  showErrorAlert,
  hideErrorAlert,
  showWarnAlert,
  hideWarnAlert,
  showQueryAlert,
  hideQueryAlert,

  

  MODAL_LOADING_CLOSE,
  MODAL_LOADING_OPEN,
  ModalLoadingOpen,
  ModalLoadingClose,

  

  TABLE_LOADING_OPEN,
  TABLE_LOADING_CLOSE,
  TableLoadingOpen,
  TableLoadingClose,
  CONTENT_LOADING_CLOSE,
  CONTENT_LOADING_OPEN,

  ContentLoadingOpen,
  ContentLoadingClose
};
