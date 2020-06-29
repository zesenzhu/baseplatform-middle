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

//右侧内容区loading
const RIGHT_LOADING_CLOSE =  'RIGHT_LOADING_CLOSE';
const RIGHT_LOADING_OPEN =  'RIGHT_LOADING_OPEN';
//Table的loading
const TABLE_LOADING_CLOSE =  'TABLE_LOADING_CLOSE';
const TABLE_LOADING_OPEN =  'TABLE_LOADING_OPEN';
//Table的loading
const COURSE_CLASS_DETAILS_MODAL_CLOSE =  'COURSE_CLASS_DETAILS_MODAL_CLOSE';
const COURSE_CLASS_DETAILS_MODAL_OPEN =  'COURSE_CLASS_DETAILS_MODAL_OPEN';

//编辑教学班弹窗
const CHANGE_COURSE_CLASS_MODAL_OPEN = 'CHANGE_COURSE_CLASS_MODAL_OPEN'
const CHANGE_COURSE_CLASS_MODAL_CLOSE = 'CHANGE_COURSE_CLASS_MODAL_CLOSE'
//添加教学班弹窗
const ADD_COURSE_CLASS_MODAL_OPEN = 'ADD_COURSE_CLASS_MODAL_OPEN'
const ADD_COURSE_CLASS_MODAL_CLOSE = 'ADD_COURSE_CLASS_MODAL_CLOSE'
//添加/编辑教学班-教师

const ADD_TEACHER_MODAL_OPEN = 'ADD_TEACHER_MODAL_OPEN';
const ADD_TEACHER_MODAL_CLOSE = 'ADD_TEACHER_MODAL_CLOSE'

//添加/编辑教学班-学生
const ADD_STUDENT_MODAL_OPEN = 'ADD_STUDENT_MODAL_OPEN';
const ADD_STUDENT_MODAL_CLOSE = 'ADD_STUDENT_MODAL_CLOSE'


//编辑、添加教学班-loading
const TEACHER_LOADING_MODAL_OPEN = 'TEACHER_LOADING_MODAL_OPEN';
const TEACHER_LOADING_MODAL_COLSE = 'TEACHER_LOADING_MODAL_COLSE';
const STUDENT_LOADING_MODAL_OPEN = 'STUDENT_LOADING_MODAL_OPEN';
const STUDENT_LOADING_MODAL_COLSE = 'STUDENT_LOADING_MODAL_COLSE';

const CLASS_STUDENT_LOADING_MODAL_COLSE = 'CLASS_STUDENT_LOADING_MODAL_COLSE';
const CLASS_STUDENT_LOADING_MODAL_OPEN = 'CLASS_STUDENT_LOADING_MODAL_OPEN'



//教学班更新动态
const COURSE_CLASS_DYNAMIC_LOADING_CLOSE = 'COURSE_CLASS_DYNAMIC_LOADING_CLOSE'
const COURSE_CLASS_DYNAMIC_LOADING_OPEN = 'COURSE_CLASS_DYNAMIC_LOADING_OPEN'
//教学班调整详情
const LOG_DETAILS_MODAL_OPEN = 'LOG_DETAILS_MODAL_OPEN'
const LOG_DETAILS_MODAL_CLOSE = 'LOG_DETAILS_MODAL_CLOSE'

// 教师端
const TEACHER_ADD_COURECLASS_LOADING_OPEN = 'TEACHER_ADD_COURECLASS_LOADING_OPEN';
const TEACHER_ADD_COURECLASS_LOADING_CLOSE = 'TEACHER_ADD_COURECLASS_LOADING_CLOSE'

//提示
const NAME_TIPS_SHOW_OPEN = 'NAME_TIPS_SHOW_OPEN'
const NAME_TIPS_SHOW_CLOSE = 'NAME_TIPS_SHOW_CLOSE'
//提示
const SUBJECT_TIPS_SHOW_OPEN = 'SUBJECT_TIPS_SHOW_OPEN'
const SUBJECT_TIPS_SHOW_CLOSE = 'SUBJECT_TIPS_SHOW_CLOSE'
//提示
const GRADE_TIPS_SHOW_OPEN = 'GRADE_TIPS_SHOW_OPEN'
const GRADE_TIPS_SHOW_CLOSE = 'GRADE_TIPS_SHOW_CLOSE'
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
//教学班详情
const CourseClassDetailsModalOpen = () => {
    return {type:COURSE_CLASS_DETAILS_MODAL_OPEN};
}
const CourseClassDetailsModalClose = () => {
    return {type:COURSE_CLASS_DETAILS_MODAL_CLOSE};
}
//编辑教学班
const ChangeCourseClassModalOpen = () => {
    return {type:CHANGE_COURSE_CLASS_MODAL_OPEN};
}
const ChangeCourseClassModalClose = () => {
    return {type:CHANGE_COURSE_CLASS_MODAL_CLOSE};
}
//添加教学班
const AddCourseClassModalOpen = () => {
    return {type:ADD_COURSE_CLASS_MODAL_OPEN};
}
const AddCourseClassModalClose = () => {
    return {type:ADD_COURSE_CLASS_MODAL_CLOSE};
}
//添加/编辑教学班-教师
const AddTeacherModalOpen= () => {
    return {type:ADD_TEACHER_MODAL_OPEN};
}

const AddTeacherModalClose= () => {
    return {type:ADD_TEACHER_MODAL_CLOSE};
}

//添加/编辑教学班-学生
const AddStudentModalOpen= () => {
    return {type:ADD_STUDENT_MODAL_OPEN};
}

const AddStudentModalClose= () => {
    return {type:ADD_STUDENT_MODAL_CLOSE};
}
//添加、编辑教学班-loading
const StudentLoadingModalOpen = () => {
    return {type:STUDENT_LOADING_MODAL_OPEN};
}
const StudentLoadingModalClose = () => {
    return {type:STUDENT_LOADING_MODAL_COLSE};
}
const TeacherLoadingModalClose = () => {
    return {type:TEACHER_LOADING_MODAL_COLSE};
}
const TeacherLoadingModalOpen = () => {
    return {type:TEACHER_LOADING_MODAL_OPEN};
}
const ClassStudentLoadingModalClose = () => {
    return {type:CLASS_STUDENT_LOADING_MODAL_COLSE};
}
const ClassStudentLoadingModalOpen = () => {
    return {type:CLASS_STUDENT_LOADING_MODAL_OPEN};
}
const CourseClassDynamicLoadingClose = () => {
    return {type:COURSE_CLASS_DYNAMIC_LOADING_CLOSE};
}
const CourseClassDynamicLoadingOpen = () => {
    return {type:COURSE_CLASS_DYNAMIC_LOADING_OPEN};
}
const LogDetailsModalClose = () => {
    return {type:LOG_DETAILS_MODAL_CLOSE};
}
const LogDetailsModalOpen = () => {
    return {type:LOG_DETAILS_MODAL_OPEN};
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

    RIGHT_LOADING_OPEN,
    RIGHT_LOADING_CLOSE,
    TABLE_LOADING_OPEN,
    TABLE_LOADING_CLOSE,
    COURSE_CLASS_DETAILS_MODAL_OPEN,
    COURSE_CLASS_DETAILS_MODAL_CLOSE,
    CourseClassDetailsModalOpen,
    CourseClassDetailsModalClose,
    CHANGE_COURSE_CLASS_MODAL_OPEN,
    CHANGE_COURSE_CLASS_MODAL_CLOSE,
    ADD_COURSE_CLASS_MODAL_OPEN,
    ADD_COURSE_CLASS_MODAL_CLOSE,
    ChangeCourseClassModalOpen,
    ChangeCourseClassModalClose,
    AddCourseClassModalOpen,
    AddCourseClassModalClose,
    AddTeacherModalClose,
    AddTeacherModalOpen,
    ADD_TEACHER_MODAL_OPEN,
    ADD_TEACHER_MODAL_CLOSE,

    AddStudentModalOpen,
    AddStudentModalClose,
    ADD_STUDENT_MODAL_CLOSE,
    ADD_STUDENT_MODAL_OPEN,

    TEACHER_LOADING_MODAL_OPEN,
    TEACHER_LOADING_MODAL_COLSE,
    STUDENT_LOADING_MODAL_OPEN,
    STUDENT_LOADING_MODAL_COLSE,
    StudentLoadingModalOpen,
    StudentLoadingModalClose,
    TeacherLoadingModalClose,
    TeacherLoadingModalOpen,
    ClassStudentLoadingModalOpen,
    ClassStudentLoadingModalClose,
    CLASS_STUDENT_LOADING_MODAL_COLSE,
    CLASS_STUDENT_LOADING_MODAL_OPEN,

    CourseClassDynamicLoadingOpen,
    CourseClassDynamicLoadingClose,
    COURSE_CLASS_DYNAMIC_LOADING_CLOSE,
    COURSE_CLASS_DYNAMIC_LOADING_OPEN,

    LogDetailsModalOpen,
    LogDetailsModalClose,
    LOG_DETAILS_MODAL_OPEN,
    LOG_DETAILS_MODAL_CLOSE,

    TEACHER_ADD_COURECLASS_LOADING_CLOSE,
    TEACHER_ADD_COURECLASS_LOADING_OPEN,

    NAME_TIPS_SHOW_OPEN,
    NAME_TIPS_SHOW_CLOSE,
    SUBJECT_TIPS_SHOW_OPEN,
    SUBJECT_TIPS_SHOW_CLOSE,
    GRADE_TIPS_SHOW_OPEN,
    GRADE_TIPS_SHOW_CLOSE
   
}