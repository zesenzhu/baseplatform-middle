import actions from './index'

//操作名称
const APP_LOADING_CLOSE = 'APP_LOADING_CLOSE';
const APP_LOADING_OPEN = 'APP_LOADING_OPEN';
const SHOW_ERROR_ALERT = 'SHOW_ERROR_ALERT';
const CLOSE_ERROR_ALERT = 'CLOSE_ERROR_ALERT';
const SHOW_WARN_ALERT = 'SHOW_WARN_ALERT';
const CLOSE_WARN_ALERT = 'CLOSE_WARN_ALERT';
const SHOW_QUERY_ALERT = 'SHOW_QUERY_ALERT';
const CLOSE_QUERY_ALERT = 'CLOSE_QUERY_ALERT';

//右侧内容区loading
const RIGHT_LOADING_CLOSE = 'RIGHT_LOADING_CLOSE';
const RIGHT_LOADING_OPEN = 'RIGHT_LOADING_OPEN';
//Table
const TABLE_LOADING_OPEN = 'TABLE_LOADING_OPEN';
const TABLE_LOADING_CLOSE = 'TABLE_LOADING_CLOSE';
//editModalTipsVisible
const EDIT_MODAL_TIPS_VISIBLE = 'EDIT_MODAL_TIPS_VISIBLE'

// 添加/编辑领导
const ADD_LEADER_MODAL_OPEN = 'ADD_LEADER_MODAL_OPEN'
const ADD_LEADER_MODAL_CLOSE = 'ADD_LEADER_MODAL_CLOSE'
const HANDLE_LEADER_MODAL_OPEN = 'HANDLE_LEADER_MODAL_OPEN'
const HANDLE_LEADER_MODAL_CLOSE = 'HANDLE_LEADER_MODAL_CLOSE';

// 毕业生档案
const HANDLE_GRADUATE_MODAL_CLOSE = 'HANDLE_GRADUATE_MODAL_CLOSE'
const HANDLE_GRADUATE_MODAL_OPEN = 'HANDLE_GRADUATE_MODAL_OPEN';

const HANDLE_GRADUATE_CONTACT_MODAL_CLOSE = 'HANDLE_GRADUATE_CONTACT_MODAL_CLOSE'
const HANDLE_GRADUATE_CONTACT_MODAL_OPEN = 'HANDLE_GRADUATE_CONTACT_MODAL_OPEN';
// 弹窗loading
const MODAL_LOADING_OPEN = 'MODAL_LOADING_OPEN'
const MODAL_LOADING_CLOSE = 'MODAL_LOADING_CLOSE'

// 毕业生去向tip
const GRADUATE_JOBTYPE_VISIBLE_OPEN = 'GRADUATE_JOBTYPE_VISIBLE_OPEN'
const GRADUATE_JOBTYPE_VISIBLE_CLOSE = 'GRADUATE_JOBTYPE_VISIBLE_CLOSE'
// 用户详情弹窗
const USER_INFO_MODAL_OPEN = 'USER_INFO_MODAL_OPEN'
const USER_INFO_MODAL_CLOSE = 'USER_INFO_MODAL_CLOSE'
//ALL
const EDIT_ALL_MODAL_TIPS_VISIBLE = 'EDIT_ALL_MODAL_TIPS_VISIBLE'

// 变更记录弹窗
const STUDENT_CHANGE_MODAL_CLOSE = 'STUDENT_CHANGE_MODAL_CLOSE'
const STUDENT_CHANGE_MODAL_OPEN = 'STUDENT_CHANGE_MODAL_OPEN'
const TEACHER_CHANGE_MODAL_CLOSE = 'TEACHER_CHANGE_MODAL_CLOSE'
const TEACHER_CHANGE_MODAL_OPEN = 'TEACHER_CHANGE_MODAL_OPEN'
const LEADER_CHANGE_MODAL_CLOSE = 'LEADER_CHANGE_MODAL_CLOSE'
const LEADER_CHANGE_MODAL_OPEN = 'LEADER_CHANGE_MODAL_OPEN'
//操作 
const showErrorAlert = (alertMsg) => {
    return { type: SHOW_ERROR_ALERT, msg: alertMsg };
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
//EditModalTipsVisible
const editModalTipsVisible = (data) => {
    return { type: EDIT_MODAL_TIPS_VISIBLE, data: data }
}
const editAlltModalTipsVisible = () => {
    return { type: EDIT_ALL_MODAL_TIPS_VISIBLE }
}

// 添加/编辑领导
const AddLeaderModalOpen = () => {
    return { type: ADD_LEADER_MODAL_OPEN }
}
const AddLeaderModalClose = () => {
    return { type: ADD_LEADER_MODAL_CLOSE }
}
const HandleLeaderModalOpen = () => {
    return { type: HANDLE_LEADER_MODAL_OPEN }
}
const HandleLeaderModalClose = () => {
    return { type: HANDLE_LEADER_MODAL_CLOSE }
}
const HandleGraduateModalOpen = () => {
    return { type: HANDLE_GRADUATE_MODAL_OPEN }
}
const HandleGraduateModalClose = () => {
    return (dispatch) => {
        dispatch(actions.UpUIState.editModalTipsVisible({ GraduateJobTypeVisible: false }))

        dispatch({ type: HANDLE_GRADUATE_MODAL_CLOSE })
    }
}
const HandleGraduateContactModalOpen = () => {
    return { type: HANDLE_GRADUATE_CONTACT_MODAL_OPEN }
}
const HandleGraduateContactModalClose = () => {
    return { type: HANDLE_GRADUATE_CONTACT_MODAL_CLOSE }
}
// 弹窗Loading
const ModalLoadingOpen = () => {
    return { type: MODAL_LOADING_OPEN }
}
const ModalLoadingClose = () => {
    return { type: MODAL_LOADING_CLOSE }
}
// 毕业生去向tip
const GraduateJobTypeVisibleOpen = () => {
    return { type: GRADUATE_JOBTYPE_VISIBLE_OPEN }
}
const GraduateJobTypeVisibleClose = () => {
    return { type: GRADUATE_JOBTYPE_VISIBLE_Close }
}
// 用户详情
const UserInfoModalOpen = () => {
    return { type: USER_INFO_MODAL_OPEN }
}
const UserInfoModalClose = () => {
    return { type: USER_INFO_MODAL_CLOSE }
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
    RIGHT_LOADING_OPEN,
    RIGHT_LOADING_CLOSE,
    TABLE_LOADING_CLOSE,
    TABLE_LOADING_OPEN,

    showErrorAlert,
    hideErrorAlert,
    showWarnAlert,
    hideWarnAlert,
    showQueryAlert,
    hideQueryAlert,
    RightLoadingOpen,
    RightLoadingClose,
    TableLoadingOpen,
    TableLoadingClose,

    EDIT_MODAL_TIPS_VISIBLE,
    editModalTipsVisible,

    ADD_LEADER_MODAL_OPEN,
    ADD_LEADER_MODAL_CLOSE,
    HANDLE_LEADER_MODAL_OPEN,
    HANDLE_LEADER_MODAL_CLOSE,

    AddLeaderModalOpen,
    AddLeaderModalClose,
    HandleLeaderModalOpen,
    HandleLeaderModalClose,

    HandleGraduateModalOpen,
    HandleGraduateModalClose,
    HANDLE_GRADUATE_MODAL_OPEN,
    HANDLE_GRADUATE_MODAL_CLOSE,

    ModalLoadingOpen,
    ModalLoadingClose,
    MODAL_LOADING_OPEN,
    MODAL_LOADING_CLOSE,
    HANDLE_GRADUATE_CONTACT_MODAL_OPEN,
    HANDLE_GRADUATE_CONTACT_MODAL_CLOSE,
    HandleGraduateContactModalOpen,
    HandleGraduateContactModalClose,

    GRADUATE_JOBTYPE_VISIBLE_CLOSE,
    GRADUATE_JOBTYPE_VISIBLE_OPEN,
    GraduateJobTypeVisibleClose,
    GraduateJobTypeVisibleOpen,
    USER_INFO_MODAL_OPEN,
    USER_INFO_MODAL_CLOSE,
    UserInfoModalOpen,
    UserInfoModalClose,

    editAlltModalTipsVisible,
    EDIT_ALL_MODAL_TIPS_VISIBLE,
    STUDENT_CHANGE_MODAL_OPEN,
    STUDENT_CHANGE_MODAL_CLOSE,
    TEACHER_CHANGE_MODAL_OPEN,
    TEACHER_CHANGE_MODAL_CLOSE,
    LEADER_CHANGE_MODAL_OPEN,
    LEADER_CHANGE_MODAL_CLOSE,
    
}