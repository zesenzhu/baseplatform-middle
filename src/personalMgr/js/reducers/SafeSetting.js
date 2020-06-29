import SafeSettingActions from '../actions/SafeSettingAcions';


const SafeSetting = (state={

    loadingShow:true,

    initData:'',

    pwdSetShow:false,

    emailSetShow:false,

    qaSetShow:false,

    addQaShow:false,

    qaSelectd:{value:"self",title:"自定义密保问题"},

    questionsList:[],

    pwdErrorTips:{

        origin:false,

        originTips:'',

        new:false,

        newTips:'',

        reNew:false,

        reNewTips:''

    },

    qaErrorTips:{

        self:false,

        selfTips:'',

        answer:false,

        answerTips:'',

        pwd:false,

        pwdTips:''

    },

    emailErrorTips:{

        newEmail:false,

        newEmailTips:'',

        pwd:false,

        pwdTips:''

    },

    pwdValue:{

        originPwd:'',

        newPwd:'',

        reNewPwd:''

    },

    qaValue:{

        selfQa:'',

        answer:'',

        pwd:''

    },

    emailValue:{

        newEmail:'',

        pwd:''

    },

    delQuestionsModal:{

        show:false,

        question:'',

        pwd:'',

        pwdTipsShow:false,

        pwdTips:''

    },

    editQuestionsModal:{

        show:false,

        originQuestion:'',

        newQuestionDropSelectd:{value:"self",title:"自定义密保问题"},

        pwd:'',

        pwdTipsShow:false,

        pwdTips:'',

        selfQa:'',

        selfQaTips:'',

        selfQaTipsShow:false,

        newAnswer:'',

        newAnswerTips:'',

        newAnswerTipsShow:false

    },

    loginHistory:{

        show:false

    }

},actions) => {

    switch (actions.type) {

        case SafeSettingActions.SAFE_SETTING_INIT_DATA_UPDATE:

            return { ...state,initData:{...state.initData,...actions.data}};

        case SafeSettingActions.SAFE_SETTING_ERROR_TIPS_INIT:

            return {

                ...state,

                pwdErrorTips:{

                    ...state.pwdErrorTips,

                    origin:false,

                    new:false,

                    reNew:false

                },

                qaErrorTips:{

                    ...state.qaErrorTips,

                    self:false,

                    answer:false,

                    pwd:false

                },

                emailErrorTips:{

                    ...state.emailErrorTips,

                    newEmail:false,

                    pwd:false

                }

            };
            
        case SafeSettingActions.SAFE_SETTING_CONTENT_SLIDE_UP:
            
            switch (actions.data) {

                case 'pwd':

                    return { ...state,pwdSetShow:false};

                case 'qa':

                    return {...state,qaSetShow:false};

                case 'email':

                    return {...state,emailSetShow:false};

                default:

                    return {...state,pwdSetShow:false,qaSetShow:false,emailSetShow:false};

            }

        case SafeSettingActions.SAFE_SETTING_CONTENT_SLIDE_DOWN:

            switch (actions.data) {

                case 'pwd':

                    return { ...state,pwdSetShow:true};

                case 'qa':

                    return {...state,qaSetShow:true};

                case 'email':

                    return {...state,emailSetShow:true};

                default:

                    return {...state,pwdSetShow:true,qaSetShow:true,emailSetShow:true};

            }

        case SafeSettingActions.SAFE_SETTING_PWD_VALUE_CHANGE:

            switch (actions.data.type) {

                case 'origin':

                    return {

                        ...state,

                        pwdValue: {

                            ...state.pwdValue,

                            originPwd:actions.data.value

                        }

                    };

                case 'new':

                    return {

                        ...state,

                        pwdValue: {

                            ...state.pwdValue,

                            newPwd:actions.data.value

                        }

                    };

                case 'reNew':

                    return {

                        ...state,

                        pwdValue: {

                            ...state.pwdValue,

                            reNewPwd:actions.data.value

                        }

                    };

                default:

                    return state;

            }
            
        case SafeSettingActions.SAFE_SETTING_PWD_TIPS_SHOW:
            
            switch (actions.data.type) {

                case 'origin':

                    return {

                        ...state,

                        pwdErrorTips:{

                            ...state.pwdErrorTips,

                            origin:true,

                            originTips:actions.data.tips

                        }

                    };

                case 'new':

                    return {

                        ...state,

                        pwdErrorTips:{

                            ...state.pwdErrorTips,

                            new:true,

                            newTips:actions.data.tips

                        }

                    };

                case 'reNew':

                    return {

                        ...state,

                        pwdErrorTips:{

                            ...state.pwdErrorTips,

                            reNew:true,

                            reNewTips:actions.data.tips

                        }

                    };

                default:

                    return state;

            }

        case SafeSettingActions.SAFE_SETTING_PWD_TIPS_HIDE:

            switch (actions.data.type) {

                case 'origin':

                    return {

                        ...state,

                        pwdErrorTips:{

                            ...state.pwdErrorTips,

                            origin:false

                        }

                    };

                case 'new':

                    return {

                        ...state,

                        pwdErrorTips:{

                            ...state.pwdErrorTips,

                            new:false

                        }

                    };

                case 'reNew':

                    return {

                        ...state,

                        pwdErrorTips:{

                            ...state.pwdErrorTips,

                            reNew:false

                        }

                    };

                default:

                    return state;

            }

        case SafeSettingActions.SAFE_SETTING_QUESTIONS_WRAPPER_SHOW:

            return { ...state,addQaShow: true  };

        case SafeSettingActions.SAFE_SETTING_QUESTIONS_WRAPPER_HIDE:

            return { ...state,addQaShow: false  };

        case SafeSettingActions.SAFE_SETTING_QUESTIONS_LIST_UPDATE:

            return { ...state,questionsList:actions.data  };

        case SafeSettingActions.SAFE_SETTING_QUESTIONS_PICK_CHANGE:

            return { ...state,qaSelectd:actions.data  };

        case SafeSettingActions.SAFE_SETTING_QUESTIONS_INPUT_CHANGE:

            switch (actions.data.type) {

                case 'self':

                    return {

                        ...state,

                        qaValue: {

                            ...state.qaValue,

                            selfQa:actions.data.value

                        }

                    };

                case 'answer':

                    return {

                        ...state,

                        qaValue: {

                            ...state.qaValue,

                            answer:actions.data.value

                        }

                    };

                case 'pwd':

                    return {

                        ...state,

                        qaValue: {

                            ...state.qaValue,

                            pwd:actions.data.value

                        }

                    };

                default:

                    return state;

            }

        case SafeSettingActions.SAFE_SETTING_QUESTIONS_TIPS_SHOW:

            switch (actions.data.type) {

                case 'self':

                    return {

                        ...state,

                        qaErrorTips:{

                            ...state.qaErrorTips,

                            self:true,

                            selfTips:actions.data.tips

                        }

                    };

                case 'answer':

                    return {

                        ...state,

                        qaErrorTips:{

                            ...state.qaErrorTips,

                            answer:true,

                            answerTips:actions.data.tips

                        }

                    };

                case 'pwd':

                    return {

                        ...state,

                        qaErrorTips:{

                            ...state.qaErrorTips,

                            pwd:true,

                            pwdTips:actions.data.tips

                        }

                    };

                default:

                    return state;

            }

        case SafeSettingActions.SAFE_SETTING_QUESTIONS_TIPS_HIDE:

            switch (actions.data.type) {

                case 'self':

                    return {

                        ...state,

                        qaErrorTips:{

                            ...state.qaErrorTips,

                            self:false

                        }

                    };

                case 'answer':

                    return {

                        ...state,

                        qaErrorTips:{

                            ...state.qaErrorTips,

                            answer:false

                        }

                    };

                case 'pwd':

                    return {

                        ...state,

                        qaErrorTips:{

                            ...state.qaErrorTips,

                            pwd:false

                        }

                    };

                default:

                    return state;

            }

        case SafeSettingActions.SAFE_SETTING_DEL_QUESTIONS_MODAL_SHOW:

            return {

                ...state,

                delQuestionsModal: {

                    ...state.delQuestionsModal,

                    show:true,

                    question:actions.data,

                    pwd:'',

                    pwdTipsShow:false,

                    pwdTips:''

                }

            };

        case SafeSettingActions.SAFE_SETTING_DEL_QUESTIONS_MODAL_HIDE:

            return {

                ...state,

                delQuestionsModal: {

                    ...state.delQuestionsModal,

                    show:false

                }

            };

        case SafeSettingActions.SAFE_SETTING_DEL_QUESTIONS_INPUT_CHANGE:

            return { ...state,delQuestionsModal:{...state.delQuestionsModal,pwd:actions.data} };

        case SafeSettingActions.SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_SHOW:

            return {...state,delQuestionsModal:{...state.delQuestionsModal,pwdTipsShow:true,pwdTips:actions.data}};

        case SafeSettingActions.SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_HIDE:

            return {...state,delQuestionsModal:{...state.delQuestionsModal,pwdTipsShow:false}};


        case SafeSettingActions.SAFE_SETTING_EDIT_QUESTIONS_MODAL_SHOW:

            return {

                ...state,

                editQuestionsModal: {

                    ...state.editQuestionsModal,

                    show:true,

                    originQuestion:actions.data,

                    newQuestionDropSelectd:{value:"self",title:"自定义密保问题"},

                    pwd:'',

                    pwdTipsShow:false,

                    pwdTips:'',

                    selfQa:'',

                    selfQaTips:'',

                    selfQaTipsShow:false,

                    newAnswer:'',

                    newAnswerTips:'',

                    newAnswerTipsShow:false

                }

            };

        case SafeSettingActions.SAFE_SETTING_EDIT_QUESTIONS_MODAL_HIDE:

            return {

                ...state,

                editQuestionsModal: {

                    ...state.editQuestionsModal,

                    show:false

                }

            };

        case SafeSettingActions.SAFE_SETTING_EDIT_QUESTIONS_PICK:

            return { ...state,editQuestionsModal:{...state.editQuestionsModal,newQuestionDropSelectd:actions.data} };

        case SafeSettingActions.SAFE_SETTING_EDIT_QUESTIONS_INPUT_CHANGE:

            switch (actions.data.type) {

                case 'self':

                    return {

                        ...state,

                        editQuestionsModal: {

                            ...state.editQuestionsModal,

                            selfQa:actions.data.value

                        }

                    };

                case 'answer':

                    return {

                        ...state,

                        editQuestionsModal: {

                            ...state.editQuestionsModal,

                            newAnswer:actions.data.value

                        }

                    };

                case 'pwd':

                    return {

                        ...state,

                        editQuestionsModal: {

                            ...state.editQuestionsModal,

                            pwd:actions.data.value

                        }

                    };

                default:

                    return state;

            }

        case SafeSettingActions.SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW:

            switch (actions.data.type) {

                case 'self':

                    return {

                        ...state,

                        editQuestionsModal:{

                            ...state.editQuestionsModal,

                            selfQaTipsShow:true,

                            selfQaTips:actions.data.tips

                        }

                    };

                case 'answer':

                    return {

                        ...state,

                        editQuestionsModal:{

                            ...state.editQuestionsModal,

                            newAnswerTipsShow:true,

                            newAnswerTips:actions.data.tips

                        }

                    };

                case 'pwd':

                    return {

                        ...state,

                        editQuestionsModal:{

                            ...state.editQuestionsModal,

                            pwdTipsShow:true,

                            pwdTips:actions.data.tips

                        }

                    };

                default:

                    return state;

            }

        case SafeSettingActions.SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE:

            switch (actions.data.type) {

                case 'self':

                    return {

                        ...state,

                        editQuestionsModal:{

                            ...state.editQuestionsModal,

                            selfQaTipsShow:false

                        }

                    };

                case 'answer':

                    return {

                        ...state,

                        editQuestionsModal:{

                            ...state.editQuestionsModal,

                            newAnswerTipsShow:false

                        }

                    };

                case 'pwd':

                    return {

                        ...state,

                        editQuestionsModal:{

                            ...state.editQuestionsModal,

                            pwdTipsShow:false

                        }

                    };

                default:

                    return state;

            }




        case SafeSettingActions.SAFE_SETTING_EMAIL_INPUT_CHANGE:

            switch (actions.data.type) {

                case 'new':

                    return {

                        ...state,

                        emailValue:{

                            ...state.emailValue,

                            newEmail:actions.data.value

                        }

                    };

                case 'pwd':

                    return {

                        ...state,

                        emailValue:{

                            ...state.emailValue,

                            pwd:actions.data.value

                        }

                    };

                default:

                    return {

                        ...state,

                        emailValue:{

                            newEmail:'',

                            pwd:''

                        }

                    };

            }

        case SafeSettingActions.SAFE_SETTING_EMAIL_TIPS_SHOW:

            switch (actions.data.type) {

                case 'new':

                    return {

                        ...state,

                        emailErrorTips:{

                            ...state.emailErrorTips,

                            newEmail:true,

                            newEmailTips:actions.data.value

                        }

                    };

                case 'pwd':

                    return {

                        ...state,

                        emailErrorTips:{

                            ...state.emailErrorTips,

                            pwd:true,

                            pwdTips:actions.data.value

                        }

                    };

                default:

                    return state;

            }

        case SafeSettingActions.SAFE_SETTING_EMAIL_TIPS_HIDE:

            switch (actions.data.type) {

                case 'new':

                    return {

                        ...state,

                        emailErrorTips:{

                            ...state.emailErrorTips,

                            newEmail:false

                        }

                    };

                case 'pwd':

                    return {

                        ...state,

                        emailErrorTips:{

                            ...state.emailErrorTips,

                            pwd:false

                        }

                    };

                default:

                    return state;

            }



        case SafeSettingActions.SAFE_SETTING_LOGIN_HISTORY_SHOW:

            return {

                ...state,

                loginHistory: {

                    ...state.loginHistory,

                    show:true

                }

            };

        case SafeSettingActions.SAFE_SETTING_LOGIN_HISTORY_HIDE:

            return {

                ...state,

                loginHistory: {

                    ...state.loginHistory,

                    show:false

                }

            };



        case SafeSettingActions.SAFE_SETTING_LOADING_HIDE:


            return { ...state,loadingShow:false };

        case SafeSettingActions.SAFE_SETTING_LOADING_SHOW:


            return { ...state,loadingShow:true };


        default:

            return state;

    }

};

export default SafeSetting