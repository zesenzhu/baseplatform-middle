import BaseActions from '../actions/BaseActions';

const BaseSetting = (state={

    loadingShow:true,

    editorStatus:false,

    ShortNameValue:'',

    ShortNameTipsShow:false,

    QQValue:'',

    QQTipsShow:false,

    WeixinValue:'',

    WeixinTipsShow:false,

    WeiboValue:'',

    WeiboTipsShow:false,

    TelephoneValue:'',

    TelephoneTipsShow:false,

    SignValue:'',

    ManagerModuleShow:false,

    TeacherRoalDetails:[

        {

            show:false

        },
        {

            show:false

        },
        {

            show:false

        }

    ],

    PicUploader:{

        token:'',

        resWebUrl: "http://192.168.129.1:30101/lgftp/", //资源站点地址

        userType:'Admin',   //用户类型，可选值Admin、Student、Teacher、SchoolLeader

        userID:'', //新增时传空字符串、编辑时传相应UserID

        curImgPath:'', //用户当前头像，新增时可不传

        size:"small"

    }

},actions) => {

    switch (actions.type) {

        case BaseActions.BASE_INFO_UPDATE:

            return {

                ...state,

                editorStatus:false,

                ShortNameTipsShow:false,

                QQTipsShow:false,

                WeixinTipsShow:false,

                WeiboTipsShow:false,

                TelephoneTipsShow:false,

                ...actions.data

            };

        case BaseActions.BASE_SETTING_EDITOR_OPEN:

            return {

                ...state,

                editorStatus:true,

                ShortNameValue:state.ShortName,

                QQValue:state.QQ,

                WeixinValue:state.Weixin,

                WeiboValue:state.Weibo,

                TelephoneValue:state.Telephone,

                SignValue:state.Sign

            };

        case BaseActions.BASE_SETTING_EDITOR_CLOSE:

            return{...state,editorStatus:false};

        case BaseActions.BASE_SETTING_QQ_CHANGE:

            return {...state, QQValue:actions.data};

        case BaseActions.BASE_SETTING_WEIXIN_CHANGE:

            return {...state, WeixinValue:actions.data};

        case BaseActions.BASE_SETTING_WEIBO_CHANGE:

            return {...state,WeiboValue:actions.data};

        case BaseActions.BASE_SETTING_SHORT_NAME_CHANGE:

            return {...state,ShortNameValue:actions.data};

        case BaseActions.BASE_SETTING_TEL_CHANGE:

            return {...state, TelephoneValue:actions.data};

        case BaseActions.BASE_SETTING_SIGN_CHANGE:

            return {...state,SignValue:actions.data};

        case BaseActions.BASE_SETTING_SHORT_NAME_TIPS_SHOW:

            return {...state,ShortNameTipsShow:true};

        case BaseActions.BASE_SETTING_SHORT_NAME_TIPS_HIDE:

            return {...state, ShortNameTipsShow:false};

        case BaseActions.BASE_SETTING_QQ_TIPS_SHOW:

            return {...state,QQTipsShow:true};

        case BaseActions.BASE_SETTING_QQ_TIPS_HIDE:

            return {...state, QQTipsShow:false};

        case BaseActions.BASE_SETTING_WEIXIN_TIPS_SHOW:

            return {...state, WeixinTipsShow:true};

        case BaseActions.BASE_SETTING_WEIXIN_TIPS_HIDE:

            return {...state, WeixinTipsShow:false};

        case BaseActions.BASE_SETTING_WEIBO_TIPS_SHOW:

            return {...state, WeiboTipsShow:true};

        case BaseActions.BASE_SETTING_WEIBO_TIPS_HIDE:

            return {...state, WeiboTipsShow:false};

        case BaseActions.BASE_SETTING_TEL_TIPS_SHOW:

            return {...state, TelephoneTipsShow:true};

        case BaseActions.BASE_SETTING_TEL_TIPS_HIDE:

            return {...state, TelephoneTipsShow:false};

        case BaseActions.BASE_SETTING_MANAGER_MODULES_SHOW:

            return {...state, ManagerModuleShow:true};

        case BaseActions.BASE_SETTING_MANAGER_MODULES_HIDE:

            return {...state, ManagerModuleShow:false};

        case BaseActions.BASE_SETTING_TEACHER_ROAL_DETAILS_STATUS_SHOW:

            state.TeacherRoalDetails[actions.data]['show']=true;

            return {...state,TeacherRoalDetails:{...state.TeacherRoalDetails}};

        case BaseActions.BASE_SETTING_TEACHER_ROAL_DETAILS_STATUS_HIDE:

            state.TeacherRoalDetails[actions.data]['show']=false;

            return {...state, TeacherRoalDetails:{...state.TeacherRoalDetails}};

        case BaseActions.BASE_SETTING_LOADING_SHOW:

            return { ...state,loadingShow:true };

        case BaseActions.BASE_SETTING_LOADING_HIDE:

            return { ...state,loadingShow:false };

        case BaseActions.PICUPLOADER_OPTIONS_UPDATE:

            return { ...state,PicUploader:{ ...state.PicUploader,...actions.data} };

        default:

            return state;

    }

};

export default BaseSetting