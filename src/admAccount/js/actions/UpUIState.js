//操作名称
const APP_LOADING_CLOSE = 'APP_LOADING_CLOSE';
const APP_LOADING_OPEN = 'APP_LOADING_OPEN';
const SHOW_ERROR_ALERT = 'SHOW_ERROR_ALERT';
const CLOSE_ERROR_ALERT = 'CLOSE_ERROR_ALERT';
const SHOW_WARN_ALERT = 'SHOW_WARN_ALERT';
const CLOSE_WARN_ALERT = 'CLOSE_WARN_ALERT';
const SHOW_QUERY_ALERT = 'SHOW_QUERY_ALERT';
const CLOSE_QUERY_ALERT = 'CLOSE_QUERY_ALERT';

//tips提示
const USER_NAME_TIPS_VISIBLE_CLOSE = 'USER_NAME_TIPS_VISIBLE_CLOSE';
const USER_NAME_TIPS_VISIBLE_OPEN = 'USER_NAME_TIPS_VISIBLE_OPEN';
const USER_ID_TIPS_VISIBLE_CLOSE = 'USER_ID_TIPS_VISIBLE_CLOSE';
const USER_ID_TIPS_VISIBLE_OPEN = 'USER_ID_TIPS_VISIBLE_OPEN';

const ALL_TIPS_VISIBLE_CLOSE = 'ALL_TIPS_VISIBLE_CLOSE';

//右侧内容区loading
const RIGHT_LOADING_CLOSE = 'RIGHT_LOADING_CLOSE';
const RIGHT_LOADING_OPEN = 'RIGHT_LOADING_OPEN';
//Table
const TABLE_LOADING_OPEN = 'TABLE_LOADING_OPEN';
const TABLE_LOADING_CLOSE = 'TABLE_LOADING_CLOSE';
// 弹窗loading
const MODAL_LOADING_OPEN = 'MODAL_LOADING_OPEN'
const MODAL_LOADING_CLOSE = 'MODAL_LOADING_CLOSE'

// 密码提示
const PWD_TIPS_OPEN = 'PWD_TIPS_OPEN'
const PWD_TIPS_CLOSE = 'PWD_TIPS_CLOSE'

//操作
const showErrorAlert = (alertMsg)=> {
    return {type:SHOW_ERROR_ALERT,msg:alertMsg};
};

const hideErrorAlert = () =>{
    return {type:CLOSE_ERROR_ALERT};
};
const showWarnAlert = (alertMsg)=> {
    return {type:SHOW_WARN_ALERT,msg:alertMsg};
};

const hideWarnAlert = () =>{
    return {type:CLOSE_WARN_ALERT};
};
const showQueryAlert = (alertMsg)=> {
    return {type:SHOW_QUERY_ALERT,msg:alertMsg};
};

const hideQueryAlert = () =>{
    return {type:CLOSE_QUERY_ALERT};
};

//tip提示

const UserNameTipsVisibleOpen = (alertMsg)=> {
    return {type:USER_NAME_TIPS_VISIBLE_OPEN,msg:alertMsg};
};
const UserNameTipsVisibleClose = (alertMsg)=> {
    return {type:USER_NAME_TIPS_VISIBLE_CLOSE,msg:alertMsg};
};
const UserIDTipsVisibleOpen = (alertMsg)=> {
    return {type:USER_ID_TIPS_VISIBLE_OPEN,msg:alertMsg};
};
const UserIDTipsVisibleClose = (alertMsg)=> {
    return {type:USER_ID_TIPS_VISIBLE_CLOSE,msg:alertMsg};
};

const AllTipsVisibleClose = (alertMsg)=> {
    return {type:ALL_TIPS_VISIBLE_CLOSE};
};
//右侧loading
const RightLoadingOpen = () => {
    return { type: RIGHT_LOADING_OPEN };
}
const RightLoadingClose = () => {
    return { type: RIGHT_LOADING_CLOSE };
}
//Table
const TableLoadingOpen = () => {
    return { type: TABLE_LOADING_OPEN };
}
const TableLoadingClose = () => {
    return { type: TABLE_LOADING_CLOSE };
}
// 弹窗Loading
const ModalLoadingOpen = () => {
    return { type: MODAL_LOADING_OPEN }
}
const ModalLoadingClose = () => {
    return { type: MODAL_LOADING_CLOSE }
}
export default {
    APP_LOADING_CLOSE,
    APP_LOADING_OPEN,
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

    UserNameTipsVisibleOpen,
    UserNameTipsVisibleClose,
    USER_NAME_TIPS_VISIBLE_OPEN,
    USER_NAME_TIPS_VISIBLE_CLOSE,
    USER_ID_TIPS_VISIBLE_OPEN,
    USER_ID_TIPS_VISIBLE_CLOSE,
    UserIDTipsVisibleOpen,
    UserIDTipsVisibleClose,
    AllTipsVisibleClose,
    ALL_TIPS_VISIBLE_CLOSE,


    RIGHT_LOADING_OPEN,
    RIGHT_LOADING_CLOSE,
    TABLE_LOADING_CLOSE,
    TABLE_LOADING_OPEN,
    RightLoadingOpen,
    RightLoadingClose,
    TableLoadingOpen,
    TableLoadingClose,
    ModalLoadingOpen,
    ModalLoadingClose,
    MODAL_LOADING_OPEN,
    MODAL_LOADING_CLOSE,
    PWD_TIPS_OPEN,
    PWD_TIPS_CLOSE
}