import React,{useEffect,useRef,useState,useMemo,useCallback,memo} from 'react';

import Header from './header';

import Content from './content';

import {Alert} from "../../../common";

import {useSelector,useDispatch} from 'react-redux';

import {firstPageLoad} from "../../../common/js/disconnect";

import {GetBaseInfoForPages,GetSubSystemsMainServerBySubjectID} from "../actions/apiActions";

import {loginUserInfoUpdate} from "../actions/loginUserActions";

import  DoucumentTitle from 'react-document-title'

import dynamicFile from 'dynamic-file';

import {getQueryVariable} from "../../../common/js/disconnect";

import {btnErrorAlertShow} from "../actions/appAlertActions";

import {targetUserInfoUpdate} from '../actions/targetUserActions';

import {pageUsedChange} from '../actions/pageUsedTypeActions';

import {systemUrlUpdate} from '../actions/systemUrlActions';

import AnchorPoint from '../components/anchorPoint';


function App(props) {


    //铃铛是否显示
    const [bellShow,setBellShow] = useState(false);

    //appAlert
    const { appAlert,appSuccessAlert } = useSelector(state=>state.appAlert);

    //系统的地址
    const  systemUrl  = useSelector(state=>state.systemUrl);

    const dispatch = useDispatch();

    useEffect(()=>{

        GetBaseInfoForPages({dispatch}).then(data=>{

            if (data){

                sessionStorage.setItem('LgBasePlatformInfo',JSON.stringify(data));

                firstPageLoad(firstLoad)

            }

        });

    },[]);


    const firstLoad = () =>{

        const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

        const CopyUserInfo = UserInfo;

        CopyUserInfo['UserType'] = parseInt(UserInfo['UserType']);

        dispatch(loginUserInfoUpdate(CopyUserInfo));

        const targetUserID = getQueryVariable('userID');

        const targetUserType = parseInt(getQueryVariable('userType'));

        if (targetUserID&&targetUserType&&([1,2].includes(targetUserType))) {

            dispatch(targetUserInfoUpdate({UserID: targetUserID, UserType: targetUserType}));

             switch (`${CopyUserInfo['UserType']}${targetUserType}`) {

                 case '02':

                     dispatch(pageUsedChange({user:'Adm',targetUser:'Stu',usedType:'AdmToStu'}));

                     break;

                 case '72':

                 case '102':

                     dispatch(pageUsedChange({user:'Leader',targetUser:'Stu',usedType:'LeaderToStu'}));

                     break;

                 case '12':

                     dispatch(pageUsedChange({user:'HeaderTeacher',targetUser:'Stu',usedType:'HeaderTeacherToStu'}));

                     break;

                 case '22':

                     if (CopyUserInfo['UserID']===targetUserID){

                         dispatch(pageUsedChange({user:'Stu',targetUser:'Stu',usedType:'StuToStu'}));


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


                     }else{

                         dispatch(pageUsedChange({user:'Other',targetUser:'Teacher',usedType:'OtherToTeacher'}));

                     }

                     break;

             }
            
        }else{

            dispatch(btnErrorAlertShow({title:'参数错误'}));

        }

       const {WebRootUrl} = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

       const token = sessionStorage.getItem('token');

       const sysIDs = Object.keys(systemUrl).join(',');

       GetSubSystemsMainServerBySubjectID({sysIDs,dispatch}).then(data=>{

            if (data) {

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

               let urlObj = {...systemUrl};

               data.map(i=>{

                   urlObj[i.SysID] = { WebUrl:i.WebSvrAddr,WsUrl:i.WsSvrAddr };

               });

               dispatch(systemUrlUpdate(urlObj));

            }

       });

    };

    return(

        <DoucumentTitle title={"111"}>

            <div className={"app"}>

                <Header bellShow={bellShow} tabTitle={"测试标签"}></Header>

                {/*<AppRoutes></AppRoutes>*/}

                <Content></Content>

                <Alert type={appAlert.type} show={appAlert.show} title={appAlert.title} onOk={appAlert.ok} onCancel={appAlert.cancel} onClose={appAlert.close} abstract={appAlert.abstract} okShow={appAlert.okShow} cancelShow={appAlert.cancelShow}></Alert>

                <Alert type={appSuccessAlert.type} show={appSuccessAlert.show} title={appSuccessAlert.title} onHide={appSuccessAlert.hide}></Alert>

            </div>

        </DoucumentTitle>

    )

}

export default memo(App)