import React,{useEffect,useRef,useState,useMemo,useCallback,memo} from 'react';

import Header from './header';

import Content from './content';

import Footer from './footer';

import {Alert,Loading} from "../../../common";

import {useSelector,useDispatch} from 'react-redux';

import {firstPageLoad,getQueryVariable} from "../../../common/js/disconnect";

import {GetSelfIdentity,GetIdentityTypeByCode} from '../actions/apiActions';

import {
    GetBaseInfoForPages,
    GetSubSystemsMainServerBySubjectID,
    GetCurrentTermInfo,
    GetUserDetailForHX,
    GetUserLogForHX,
    getDetailStuStatus,
    getTeacherDetailIntroduction
} from "../actions/apiActions";

import {loginUserInfoUpdate} from "../actions/loginUserActions";

import  DoucumentTitle from 'react-document-title'

import dynamicFile from 'dynamic-file';

import {targetUserInfoUpdate} from '../actions/targetUserActions';

import {pageUsedChange} from '../actions/pageUsedTypeActions';

import {systemUrlUpdate} from '../actions/systemUrlActions';

import {appLoadingHide} from "../actions/appLoadingActions";

import {termInfoUpdate} from "../actions/termInfoActions";

import {userArchivesUpdate} from "../actions/userArchivesActions";

import {userStatusUpdate,userStatusReady,userStatusReceiveData} from "../actions/userStatusActions";

import {userInfoLosUpdate} from "../actions/userInfoLogsActions";

import {identifyChange} from "../actions/identifyInfoActions";

import "../../../common/scss/public.scss";

function App(props) {


    //documenttitle

    const [domTitle,setDomTitle] = useState('加载中...');


    //footer

    const [footerTitle,setFooterTitle] = useState('蓝鸽科技  版权所有');

    //铃铛是否显示
    const [bellShow,setBellShow] = useState(false);


    //appAlert
    const { appAlert,appSuccessAlert } = useSelector(state=>state.appAlert);

    //appLoading
    const appLoading = useSelector(state=>state.appLoading);

    //系统的地址
    const  {Urls,ModuleRely}  = useSelector(state=>state.systemUrl);


    const dispatch = useDispatch();

    useEffect(()=>{

        GetBaseInfoForPages({dispatch}).then(data=>{

            if (data){

                sessionStorage.setItem('LgBasePlatformInfo',JSON.stringify(data));

                setFooterTitle(data.ProVersion);

                firstPageLoad(firstLoad)

            }

        });

    },[]);


    const proxy = useMemo(()=>{

        return 'http://192.168.2.202:7300/mock/5f40ff6044c5b010dca04032/userPersona';

    },[]);


    const firstLoad = () =>{

        const identifyCode  = getQueryVariable('lg_ic');

        if (identifyCode){

            GetIdentityTypeByCode(identifyCode).then(data=>{

                nextPageStep(data); //下一步展示界面

            });

        }else{

            GetSelfIdentity().then(data=>{

                nextPageStep(data);

            })

        }
    };


    //下一步展示界面的函数
    const nextPageStep = (identifyList) =>{

        if (identifyList&&identifyList.length>0){

	        sessionStorage.setItem('LgBaseIdentifyInfo',JSON.stringify(identifyList[0]));

            dispatch(identifyChange(identifyList));

        }

        const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

        const CopyUserInfo = UserInfo;

        CopyUserInfo['UserType'] = parseInt(UserInfo['UserType']);

        dispatch(loginUserInfoUpdate(CopyUserInfo));

        const targetUserID = getQueryVariable('userID');

        const targetUserType = parseInt(getQueryVariable('userType'));

        if (targetUserID&&targetUserType&&([1,2].includes(targetUserType))) {

            const {WebRootUrl} = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

            const token = sessionStorage.getItem('token');

            const sysIDs = Object.keys(Urls).join(',');

            const getTerm = GetCurrentTermInfo({SchoolID:CopyUserInfo.SchoolID,dispatch});

            const getSys =  GetSubSystemsMainServerBySubjectID({sysIDs,dispatch});

            const getUserInfo = GetUserDetailForHX({UserID:targetUserID,UserType:targetUserType,proxy,dispatch});

            const getUserLog = GetUserLogForHX({UserID:targetUserID,UserType:targetUserType,proxy,dispatch});

            Promise.all([getTerm,getSys,getUserInfo,getUserLog]).then(res=>{

                if (res[0]){

                    const data = res[0];

                    dispatch(termInfoUpdate(data));

                }

                if (res[1]){

                    const data = res[1];

                    const AssistUrl = data.find(i=>i.SysID==='200')?data.find(i=>i.SysID==='200').WebSvrAddr:'';

                    if (!(CopyUserInfo.UserType === 0 && CopyUserInfo === 2) && (CopyUserInfo.UserType !== 6)&&AssistUrl) {

                        let PsnMgrLgAssistantAddr = AssistUrl;

                        sessionStorage.setItem('PsnMgrToken', token);//用户Token

                        sessionStorage.setItem('PsnMgrMainServerAddr', WebRootUrl); //基础平台IP地址和端口号 形如：http://192.168.129.1:30103/

                        sessionStorage.setItem('PsnMgrLgAssistantAddr', PsnMgrLgAssistantAddr);

                        dynamicFile([

                            `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/css/lancoo.cp.assistantInfoCenter.css`,

                            `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/js/jquery-1.7.2.min.js`

                        ]).then(() => {

                            dynamicFile([

                                `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/assets/jquery.pagination.js`,

                                `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/js/lancoo.cp.assistantInfoCenter.js`

                            ])

                        });

                        setBellShow(true);

                    } else {

                        setBellShow(false);

                    }

                    let urlObj = {...Urls};

                    data.map(i=>{

                        urlObj[i.SysID] = { WebUrl:i.WebSvrAddr,WsUrl:i.WsSvrAddr };

                    });

                    dispatch(systemUrlUpdate(urlObj));

                    if (urlObj['E34'].WebUrl){

                        const getDetail = targetUserType===1?

                            getTeacherDetailIntroduction({teacherId:targetUserID,proxy:urlObj['E34'].WebUrl,dispatch}):

                            getDetailStuStatus({userId:targetUserID,proxy:urlObj['E34'].WebUrl,dispatch});

                        getDetail.then(data=>{

                            if (data){

                                dispatch(userStatusUpdate(data));

                                dispatch(userStatusReceiveData(true));

                            }else{

                                dispatch(userStatusReceiveData(false));

                            }

                            dispatch(userStatusReady());

                        });

                    }else{

                        dispatch(userStatusReady());

                        dispatch(userStatusReceiveData(false));

                    }

                }

                if (res[2]){

                    let docTitle = targetUserType===2?'学生档案详情':'教师档案详情';

                    dispatch(targetUserInfoUpdate({UserID: targetUserID, UserType: targetUserType}));

                    const { LockerVersion } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

                    if (parseInt(LockerVersion)===1){

                        if (targetUserType===1){

                            dispatch(pageUsedChange({user:'Other',targetUser:'Teacher',usedType:'OtherToTeacher'}));

                        }else if (targetUserType===2) {

                            dispatch(pageUsedChange({user:'Other',targetUser:'Stu',usedType:'OtherToStu'}));

                        }

                    }else{

                        switch (`${CopyUserInfo['UserType']}${targetUserType}`) {

                            case '02':

                                dispatch(pageUsedChange({user:'Adm',targetUser:'Stu',usedType:'AdmToStu'}));

                                break;

                            case '72':

                            case '102':

                                dispatch(pageUsedChange({user:'Leader',targetUser:'Stu',usedType:'LeaderToStu'}));

                                break;

                            case '32':

                                if (res[2].IsMyChild){

                                    dispatch(pageUsedChange({user:'Parents',targetUser:'Stu',usedType:'ParentsToStu'}));

                                }else{

                                    dispatch(pageUsedChange({user:'Other',targetUser:'Stu',usedType:'OtherToStu'}));

                                }

                                docTitle = '子女档案详情';

                                break;

                            case '12':

                                if (res[2].IsMyStudent){

                                    dispatch(pageUsedChange({user:'HeaderTeacher',targetUser:'Stu',usedType:'HeaderTeacherToStu'}));

                                }else{

                                    dispatch(pageUsedChange({user:'Other',targetUser:'Stu',usedType:'OtherToStu'}));

                                }

                                break;

                            case '22':

                                if (CopyUserInfo['UserID']===targetUserID){

                                    dispatch(pageUsedChange({user:'Stu',targetUser:'Stu',usedType:'StuToStu'}));

                                    docTitle = '我的档案';

                                }else{

                                    dispatch(pageUsedChange({user:'Other',targetUser:'Stu',usedType:'OtherToStu'}));

                                }

                                break;

                            case '01':

                                dispatch(pageUsedChange({user:'Adm',targetUser:'Teacher',usedType:'AdmToTeacher'}));

                                break;

                            case '101':

                            case '71':

                                dispatch(pageUsedChange({user:'Leader',targetUser:'Teacher',usedType:'LeaderToTeacher'}));

                                break;

                            case '11':

                                if (CopyUserInfo['UserID']===targetUserID){

                                    dispatch(pageUsedChange({user:'Teacher',targetUser:'Teacher',usedType:'TeacherToTeacher'}));

                                    docTitle = '我的档案';

                                }else{

                                    dispatch(pageUsedChange({user:'Other',targetUser:'Teacher',usedType:'OtherToTeacher'}));

                                }

                                break;

                            default:

                                if (targetUserType===1){

                                    dispatch(pageUsedChange({user:'Other',targetUser:'Teacher',usedType:'OtherToTeacher'}));

                                }else if (targetUserType===2) {

                                    dispatch(pageUsedChange({user:'Other',targetUser:'Stu',usedType:'OtherToStu'}));

                                }

                        }

                    }

                    setDomTitle(docTitle);

                    dispatch(userArchivesUpdate(res[2]));

                }

                if (res[3]){

                    dispatch(userInfoLosUpdate(res[3]));

                }

                dispatch(appLoadingHide());

            });

        }else{

            window.location.href='/Error.aspx?errcode=E012';

        }

    };



    return(

        <DoucumentTitle title={domTitle}>

            <Loading spinning={appLoading} opacity={false} tip={"加载中,请稍候..."}>

                <div className={"app"}>

                    <Header bellShow={bellShow} tabTitle={domTitle}></Header>

                    {/*<AppRoutes></AppRoutes>*/}

                    <Content></Content>

                    <Footer footerTitle={footerTitle}></Footer>

                    <Alert type={appAlert.type} show={appAlert.show} title={appAlert.title} onOk={appAlert.ok} onCancel={appAlert.cancel} onClose={appAlert.close} abstract={appAlert.abstract} okShow={appAlert.okShow} cancelShow={appAlert.cancelShow}></Alert>

                    <Alert type={appSuccessAlert.type} show={appSuccessAlert.show} title={appSuccessAlert.title} onHide={appSuccessAlert.hide}></Alert>

                </div>

            </Loading>

        </DoucumentTitle>

    )

}

export default memo(App)