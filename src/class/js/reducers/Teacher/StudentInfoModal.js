import SIMActions from '../../actions/Teacher/StudentInfoModalActions';

const StudentInfoModal = (state={

    Show:false,

    Loading:true,

    Title:"添加学生",

    EditorStudentID:'',

    PhotoPath:'',

    PhotoPath_NOcache:'',

    //提示
    UserIDTipsVisible: false,

    UserIDTipsTitle: '学号应由1-24位字母与数字组成',

    UserNameTipsVisible: false,

    UserNameTipsTitle: '姓名应由1-20位的汉字/字母/数字/下划线/空格组成',

    TelephoneTipsVisible: false,

    TelephoneTipsTitle: '电话应由数字及-/组成',

    EmailTipsVisible: false,

    EmailTipsTitle: '邮箱格式错误',

    IDCardNoTipsVisible: false,

    IDCardNoTipsTitle: '身份证格式错误',

    HomeAdressTipsVisible: false,

    HomeAdressTipsTitle: '家庭住址格式错误',

    GenderTipsVisible: false,

    GenderTipsTitle: '请选择性别',

    ClassTipsVisible: false,

    ClassTipsTitle: '请选择班级',

    //ID

    UserIDValue:'',

    UserNameValue:'',

    IDCardValue:'',

    PhoneValue:'',

    MailValue:'',

    AddressValue:'',

    //班级
    ClassDropShow:false,

    Classes:[],

    ClasName:'',

    ClassID:'',

    ClassDrop:{value:'none',title:"请选择班级"},

    //性别

    SexDrop:{value:3,title:"保密"},


    //ftp服务器地址

    FtpServer:'',


},actions) => {

    switch (actions.type) {

        case SIMActions.TEACHER_STUDENT_INFO_MODAL_SHOW:

            return {

                ...state,

                Show:true,

                Loading:true

            };

        case SIMActions.TEACHER_STUDENT_INFO_MODAL_HIDE:

            return {

                ...state,

                Show:false,

                EditorStudentID:'',

                Title:"添加学生",

                PhotoPath:'',

                PhotoPath_NOcache:'',

                //提示
                UserIDTipsVisible: false,

                UserIDTipsTitle: '由1-24位字母与数字组成',

                UserNameTipsVisible: false,

                UserNameTipsTitle: '姓名由1-20位的汉字、字母、数字、下划线、空格组成',

                TelephoneTipsVisible: false,

                TelephoneTipsTitle: '电话由数字及-/组成',

                EmailTipsVisible: false,

                EmailTipsTitle: '邮箱格式错误',

                IDCardNoTipsVisible: false,

                IDCardNoTipsTitle: '身份证格式错误',

                HomeAdressTipsVisible: false,

                HomeAdressTipsTitle: '家庭住址格式错误',

                GenderTipsVisible: false,

                GenderTipsTitle: '请选择性别',

                ClassTipsVisible: false,

                ClassTipsTitle: '请选择班级',

                //ID

                UserIDValue:'',

                UserNameValue:'',

                IDCardValue:'',

                PhoneValue:'',

                MailValue:'',

                AddressValue:'',

                //班级
                ClassDropShow:false,

                Classes:[],

                ClasName:'',

                ClassID:'',

                ClassDrop:{value:'none',title:"请选择班级"},

                //性别

                SexDrop:{value:3,title:"保密"}

            };

        case SIMActions.TEACHER_STUDENT_INFO_EDITOR_STUDENT_ID_CHANGE:

            return {

                ...state,

                EditorStudentID:actions.data,

                Title:"编辑学生"

            };

        case SIMActions.TEACHER_STUDENT_INFO_MODAL_INIT:

            return {

                ...state,

                ...actions.data

            };

        case SIMActions.TEACHER_STUDENT_INFO_MODAL_LOADING_SHOW:

            return {...state,Loading:true};

        case SIMActions.TEACHER_STUDENT_INFO_MODAL_LOADING_HIDE:

            return {...state,Loading:false};

         //班级

        case SIMActions.TEACHER_STUDENT_INFO_MODAL_CLASS_DROP_SHOW:

            return {

                ...state,

                ClassDropShow:true

            };

        case SIMActions.TEACHER_STUDENT_INFO_MODAL_CLASS_DROP_HIDE:

            return {

                ...state,

                ClassDropShow:false

            };

        case SIMActions.TEACHER_STUDENT_INFO_MODAL_CLASS_DROP_CHANGE:

            return {

                ...state,

                ClassDrop:actions.data

            };

        case SIMActions.TEACHER_STUDENT_INFO_MODAL_CLASS_NANE_ID_UPDATE:

            return {

                ...state,

                ...actions.data

            };

        case SIMActions.TEACHER_STUDENT_INFO_MODAL_CLASS_LIST_UPDATE:

            return {

                ...state,

                Classes:actions.data

            };

        case SIMActions.TEACHER_STUDENT_INFO_MODAL_USER_ID_CHANGE:

            return { ...state,UserIDValue:actions.data };

        case SIMActions.TEACHER_STUDENT_INFO_MODAL_USER_NAME_CHANGE:

            return { ...state,UserNameValue:actions.data };

        case SIMActions.TEACHER_STUDENT_INFO_MODAL_ID_CARD_CHANGE:

            return { ...state,IDCardValue:actions.data };

        case SIMActions.TEACHER_STUDENT_INFO_MODAL_PHONE_CHANGE:

            return { ...state,PhoneValue:actions.data };

        case SIMActions.TEACHER_STUDENT_INFO_MODAL_MAIL_CHANGE:

            return { ...state,MailValue:actions.data };

        case SIMActions.TEACHER_STUDENT_INFO_MODAL_ADDRESS_CHANGE:

            return { ...state,AddressValue:actions.data };

        case SIMActions.TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_SHOW:

            switch (actions.data.type) {

                case 'ID':

                    return {

                        ...state,

                        UserIDTipsVisible:true,

                        UserIDTipsTitle:actions.data.title?actions.data.title:state.UserIDTipsTitle

                    };

                case 'Name':

                    return {

                        ...state,

                        UserNameTipsVisible:true,

                        UserNameTipsTitle:actions.data.title?actions.data.title:state.UserNameTipsTitle


                    };

                case 'IDCard':

                    return {

                        ...state,

                        IDCardNoTipsVisible:true,

                        IDCardNoTipsTitle:actions.data.title?actions.data.title:state.IDCardNoTipsTitle


                    };

                case 'Phone':

                    return {

                        ...state,

                        TelephoneTipsVisible:true,

                        TelephoneTipsTitle:actions.data.title?actions.data.title:state.TelephoneTipsTitle


                    };

                case 'Mail':

                    return {

                        ...state,

                        EmailTipsVisible:true,

                        EmailTipsTitle:actions.data.title?actions.data.title:state.EmailTipsTitle


                    };

                case 'Address':

                    return {

                        ...state,

                        HomeAdressTipsVisible:true,

                        HomeAdressTipsTitle:actions.data.title?actions.data.title:state.HomeAdressTipsTitle

                    };

                default:

                    return {

                    ...state,

                    UserIDTipsVisible:true,

                    HomeAdressTipsTitle:true,

                    EmailTipsVisible:true,

                    TelephoneTipsVisible:true,

                    IDCardNoTipsVisible:true,

                    UserNameTipsVisible:true

                };

            }

        case SIMActions.TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_HIDE:

            switch (actions.data.type) {

                case 'ID':

                    return {

                        ...state,

                        UserIDTipsVisible:false

                    };

                case 'Name':

                    return {

                        ...state,

                        UserNameTipsVisible:false

                    };

                case 'IDCard':

                    return {

                        ...state,

                        IDCardNoTipsVisible:false

                    };

                case 'Phone':

                    return {

                        ...state,

                        TelephoneTipsVisible:false

                    };

                case 'Mail':

                    return {

                        ...state,

                        EmailTipsVisible:false

                    };

                case 'Address':

                    return {

                        ...state,

                        HomeAdressTipsVisible:false

                    };

                default:

                    return {

                        ...state,

                        UserIDTipsVisible:false,

                        HomeAdressTipsTitle:false,

                        EmailTipsVisible:false,

                        TelephoneTipsVisible:false,

                        IDCardNoTipsVisible:false,

                        UserNameTipsVisible:false

                    };

            }

        case SIMActions.TEACHER_STUDENT_INFO_MODAL_SEX_CHANGE:

            return { ...state,SexDrop:actions.data };

        case SIMActions.TEACHER_STUDENT_INFO_MODAL_CLASS_CHANGE:

            return { ...state,ClassDrop:actions.data };

        case SIMActions.TEACHER_STUDENT_INFO_MODAL_FTP_SERVER_UPDATE:

            return {...state,FtpServer:actions.data};

        default:

            return state;

    }

};

export default StudentInfoModal;