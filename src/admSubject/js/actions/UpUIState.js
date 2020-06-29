//操作名称
const APP_LOADING_CLOSE = 'APP_LOADING_CLOSE';
const APP_LOADING_OPEN = 'APP_LOADING_OPEN';
const MODAL_LOADING_CLOSE = 'MODAL_LOADING_CLOSE';
const MODAL_LOADING_OPEN = 'MODAL_LOADING_OPEN';
const SHOW_ERROR_ALERT = 'SHOW_ERROR_ALERT';
const CLOSE_ERROR_ALERT = 'CLOSE_ERROR_ALERT';
const SHOW_WARN_ALERT = 'SHOW_WARN_ALERT';
const CLOSE_WARN_ALERT = 'CLOSE_WARN_ALERT';
const SHOW_QUERY_ALERT = 'SHOW_QUERY_ALERT';
const CLOSE_QUERY_ALERT = 'CLOSE_QUERY_ALERT';
//Subject
const SUBJECT_TABLE_LOADING_OPEN = 'SUBJECT_TABLE_LOADING_OPEN';
const SUBJECT_TABLE_LOADING_CLOSE = 'SUBJECT_TABLE_LOADING_CLOSE';

const SUBJECT_DETAILS_MODAL_OPEN = 'SUBJECT_DETAILS_MODAL_OPEN';
const SUBJECT_DETAILS_MODAL_CLOSE = 'SUBJECT_DETAILS_MODAL_CLOSE';

//编辑学科弹窗
const CHANGE_SUBJECT_MODAL_OPEN = 'CHANGE_SUBJECT_MODAL_OPEN'
const CHANGE_SUBJECT_MODAL_CLOSE = 'CHANGE_SUBJECT_MODAL_CLOSE'
//添加学科弹窗
const ADD_SUBJECT_MODAL_OPEN = 'ADD_SUBJECT_MODAL_OPEN'
const ADD_SUBJECT_MODAL_CLOSE = 'ADD_SUBJECT_MODAL_CLOSE'
//设置教研组长
const ADD_SUBJECT_TEACHER_MODAL_OPEN = 'ADD_SUBJECT_TEACHER_MODAL_OPEN'
const ADD_SUBJECT_TEACHER_MODAL_CLOSE = 'ADD_SUBJECT_TEACHER_MODAL_CLOSE'
//设置教研组长查询
const SEARCH_LOADING_OPEN = 'SEARCH_LOADING_OPEN'
const SEARCH_LOADING_CLOSE = 'SEARCH_LOADING_CLOSE'
// tip visible
const TIPS_VISIBLE_OPEN = 'TIPS_VISIBLE_OPEN'
const TIPS_VISIBLE_CLOSE = 'TIPS_VISIBLE_CLOSE'
const TIPS_VISIBLE_GRADE_OPEN = 'TIPS_VISIBLE_GRADE_OPEN'
const TIPS_VISIBLE_GRADE_CLOSE = 'TIPS_VISIBLE_GRADE_CLOSE'
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
//编辑学科
const changeSubjectModalOpen = () => {
    return {type:CHANGE_SUBJECT_MODAL_OPEN};
}
const changeSubjectModalClose = () => {
    return {type:CHANGE_SUBJECT_MODAL_CLOSE};
}
//添加学科
const addSubjectModalOpen = () => {
    return {type:ADD_SUBJECT_MODAL_OPEN};
}
const addSubjectModalClose = () => {
    return {type:ADD_SUBJECT_MODAL_CLOSE};
}
const setSubjectTeacherModalOpen = () => {
    return {type:ADD_SUBJECT_TEACHER_MODAL_OPEN};
}
const setSubjectTeacherModalClose = () => {
    return {type:ADD_SUBJECT_TEACHER_MODAL_CLOSE};
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
    SUBJECT_TABLE_LOADING_OPEN,
    SUBJECT_TABLE_LOADING_CLOSE,
    SUBJECT_DETAILS_MODAL_OPEN,
    SUBJECT_DETAILS_MODAL_CLOSE,
    CHANGE_SUBJECT_MODAL_OPEN,
    CHANGE_SUBJECT_MODAL_CLOSE,
    showErrorAlert,
    hideErrorAlert,
    showWarnAlert,
    hideWarnAlert,
    showQueryAlert,
    hideQueryAlert,
    changeSubjectModalOpen,
    changeSubjectModalClose,
    addSubjectModalOpen,
    addSubjectModalClose,
    ADD_SUBJECT_MODAL_CLOSE,
    ADD_SUBJECT_MODAL_OPEN,
    MODAL_LOADING_CLOSE,
    MODAL_LOADING_OPEN,
    ADD_SUBJECT_TEACHER_MODAL_OPEN,
    ADD_SUBJECT_TEACHER_MODAL_CLOSE,
    setSubjectTeacherModalOpen,
    setSubjectTeacherModalClose,
    SEARCH_LOADING_OPEN,
    SEARCH_LOADING_CLOSE,
    TIPS_VISIBLE_CLOSE,
    TIPS_VISIBLE_OPEN,
    TIPS_VISIBLE_GRADE_CLOSE,
    TIPS_VISIBLE_GRADE_OPEN
}