///刷新loading
const APP_LOADING_CLOSE = 'APP_LOADING_CLOSE';
const APP_LOADING_OPEN = 'APP_LOADING_OPEN';
const MODAL_LOADING_CLOSE = 'MODAL_LOADING_CLOSE';
const MODAL_LOADING_OPEN = 'MODAL_LOADING_OPEN';
const RIGHT_LOADING_CLOSE = 'RIGHT_LOADING_CLOSE';
const RIGHT_LOADING_OPEN = 'RIGHT_LOADING_OPEN';
// end

// 提示窗口alert
const SHOW_ERROR_ALERT = 'SHOW_ERROR_ALERT';
const CLOSE_ERROR_ALERT = 'CLOSE_ERROR_ALERT';
const SHOW_WARN_ALERT = 'SHOW_WARN_ALERT';
const CLOSE_WARN_ALERT = 'CLOSE_WARN_ALERT';
const SHOW_QUERY_ALERT = 'SHOW_QUERY_ALERT';
const CLOSE_QUERY_ALERT = 'CLOSE_QUERY_ALERT';
//end

// 提示开关
const APP_TIPS_VISIBLE = 'APP_TIPS_VISIBLE'
//end
// 模态框
const AGREEMENT_MODAL_OPEN = 'AGREEMENT_MODAL_OPEN'
const AGREEMENT_MODAL_CLOSE = 'AGREEMENT_MODAL_CLOSE'
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


//loading
const ModalLoadingOpen = () => {
    return {type:MODAL_LOADING_OPEN};
}
const ModalLoadingClose = () => {
    return {type:MODAL_LOADING_CLOSE};
}
const AppLoadingOpen = () => {
    return {type:APP_LOADING_OPEN};
}
const AppLoadingClose = () => {
    return {type:APP_LOADING_CLOSE};
}
const RightLoadingOpen = () => {
    return {type:RIGHT_LOADING_OPEN};
}
const RightLoadingClose = () => {
    return {type:RIGHT_LOADING_CLOSE};
}


//提示
const AppTipsVisible = (data)=> {
    return {type:APP_TIPS_VISIBLE,data:data};
};

// 模态框
const AgreementModalOpen = ()=> {
    return{type:AGREEMENT_MODAL_OPEN}
}
const AgreementModalClose = ()=> {
    return{type:AGREEMENT_MODAL_CLOSE}
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



    APP_TIPS_VISIBLE,
    AppTipsVisible,
    RightLoadingClose,
    RightLoadingOpen,
    AppLoadingOpen,
    AppLoadingClose,


    AGREEMENT_MODAL_OPEN,
    AGREEMENT_MODAL_CLOSE,

    AgreementModalOpen,
    AgreementModalClose,
}