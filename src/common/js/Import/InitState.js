import CONFIG from '../../../common/js/config';

const InitState = ({props,type}) => {

    if (type==='excel'){

        return {

            Step:1,

            ImportTitle:props.ImportTitle?props.ImportTitle:"",

            ImportTarget:props.ImportTarget?props.ImportTarget:'',

            FtpPath:'',

           /* UpLoadLoading:true,

            ModulesLink:[],*/

            UpLoadFileName:'请选择文件...',

            ImportMouldes:[

                {

                    ID:'student',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FUserInfoMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E5%AD%A6%E7%94%9F%E4%BF%A1%E6%81%AF.xls`

                },

                {

                    ID:'teacher',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FUserInfoMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E6%95%99%E5%B8%88%E4%BF%A1%E6%81%AF.xls`

                },

                {

                    ID:'leader',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FUserInfoMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E5%AD%A6%E6%A0%A1%E9%A2%86%E5%AF%BC%E4%BF%A1%E6%81%AF.xls`

                },

                {

                    ID:'courseteacher',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FClassMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E4%BB%BB%E8%AF%BE%E6%95%99%E5%B8%88%E4%BF%A1%E6%81%AF.xls`

                },

                {

                    ID:'gangermonitor',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FClassMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E7%8F%AD%E4%B8%BB%E4%BB%BB%E7%8F%AD%E9%95%BF%E4%BF%A1%E6%81%AF.xls`

                },

                {

                    ID:'graduate',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FUserInfoMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E6%AF%95%E4%B8%9A%E5%8E%BB%E5%90%91%E4%BF%A1%E6%81%AF.xls`

                },

                {
                    //中小学导入课表

                    ID:'scheduleMiddle',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FTeachInfoMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E8%AF%BE%E7%A8%8B%E8%A1%A8%E4%BF%A1%E6%81%AF%EF%BC%88%E4%B8%AD%E5%B0%8F%E5%AD%A6%E7%89%88%EF%BC%89.xls`

                },

                {

                    //中小学教学班导入
                    ID:'courseclass',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FTeachInfoMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E7%8F%AD%E7%BA%A7%E4%BF%A1%E6%81%AF.xls`

                },

                {

                    //大学版教学班导入
                    ID:'courseclassuniversity',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FTeachInfoMgr%2FTemplate%2F【模板】教学班信息 (大学版).xls`

                },

                {

                    //大学版课表导入
                    ID:'scheduleUnMiddle',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FTeachInfoMgr%2FTemplate%2F【模板】课程表信息（非中小学版）.xls`

                },

                {

                    //大学版学生
                    ID:'student_1',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FUserInfoMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E5%AD%A6%E7%94%9F%E4%BF%A1%E6%81%AF%28%E9%AB%98%E6%95%99%E7%89%88%29.xls`

                },

                {

                    //大学版教师

                    ID:'teacher_1',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FUserInfoMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E6%95%99%E5%B8%88%E4%BF%A1%E6%81%AF%28%E9%AB%98%E6%95%99%E7%89%88%29.xls`

                },

                {

                    //大学版学校领导

                    ID:'leader_1',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FUserInfoMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E5%AD%A6%E6%A0%A1%E9%A2%86%E5%AF%BC%E4%BF%A1%E6%81%AF%28%E9%AB%98%E6%95%99%E7%89%881%29.xls`

                },

                {

                    //大学版学院管理员

                    ID:'leader_2',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FUserInfoMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E5%AD%A6%E6%A0%A1%E9%A2%86%E5%AF%BC%E4%BF%A1%E6%81%AF%28%E9%AB%98%E6%95%99%E7%89%882%29.xls`

                },

                {

                    //大学版（普教精简版 学生）

                    ID:'student_0',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FUserInfoMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E5%AD%A6%E7%94%9F%E4%BF%A1%E6%81%AF%28%E6%99%AE%E6%95%99%E7%B2%BE%E7%AE%80%E7%89%88%29.xls`

                },

                {

                    //大学版（普教精简版 教师）

                    ID:'teacher_0',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FUserInfoMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E6%95%99%E5%B8%88%E4%BF%A1%E6%81%AF%28%E6%99%AE%E6%95%99%E7%B2%BE%E7%AE%80%E7%89%88%29.xls`

                },

                {

                    //大学版（普教精简版 领导）

                    ID:'leader_0',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FUserInfoMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E9%A2%86%E5%AF%BC%E4%BF%A1%E6%81%AF%28%E6%99%AE%E6%95%99%E7%B2%BE%E7%AE%80%E7%89%88%29.xls`

                },

                {

                    //大学版（高校精简版 学生）

                    ID:'student_2',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FUserInfoMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E5%AD%A6%E7%94%9F%E4%BF%A1%E6%81%AF%28%E9%AB%98%E6%95%99%E7%B2%BE%E7%AE%80%E7%89%88%29.xls`

                },

                {

                    //大学版（高校精简版 教师）

                    ID:'teacher_2',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FUserInfoMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E6%95%99%E5%B8%88%E4%BF%A1%E6%81%AF%28%E9%AB%98%E6%95%99%E7%B2%BE%E7%AE%80%E7%89%88%29.xls`

                },

                {

                    //大学版（高校精简版 学校领导）

                    ID:'leader_3',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FUserInfoMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E5%AD%A6%E6%A0%A1%E9%A2%86%E5%AF%BC%E4%BF%A1%E6%81%AF%28%E9%AB%98%E6%95%99%E7%B2%BE%E7%AE%80%E7%89%881%29.xls`

                },

                {

                    //大学版（高校精简版 学院领导）

                    ID:'leader_4',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FUserInfoMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E5%AD%A6%E6%A0%A1%E9%A2%86%E5%AF%BC%E4%BF%A1%E6%81%AF%28%E9%AB%98%E6%95%99%E7%B2%BE%E7%AE%80%E7%89%882%29.xls`

                }

            ],

            StepLoading:false,

            UpLoadFile:'',

            AlertObj:{

                Type:1,

                Title:'',

                Show:false,

                Hide:'',

                Close:'',

                Cancel:'',

                Ok:''

            },

            BackEndData:[],

            BackEndDataCopy:[],

            BackEndFileParam:{



            },

            UpLoadResult:{

                Success:0,

                Error:0,

                Unique:0,

                DownLoadPath:''

            }

        }

    }else if (type==='photo') {

        return {

            Step:1,

            ImportTitle:props.ImportTitle?props.ImportTitle:"",

            ImportTarget:props.ImportTarget?props.ImportTarget:'Student',

            UpLoadFileName:'请选择文件...',

            UpLoadFile:'',

            AlertObj:{

                Type:1,

                Title:'',

                Show:false,

                Hide:'',

                Close:'',

                Cancel:'',

                Ok:''

            },

            UpLoadResult:{

                CompressFaile: [],

                Error: 0,

                NotExist: [],

                NotPic: [],

                Total: 0

            },

            BlockSize:1024 * 1024 * 2,

            UpLoadPercent:0,

            FtpPath:''

        }

    }



};

export default InitState;