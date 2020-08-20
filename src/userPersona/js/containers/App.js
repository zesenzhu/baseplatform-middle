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


function App(props) {


    //铃铛是否显示
    const [bellShow,setBellShow] = useState(false);

    //appAlert
    const { appAlert,appSuccessAlert } = useSelector(state=>state.appAlert);

    const dispatch = useDispatch();

    useEffect(()=>{

        const LgBasePlatformInfo = sessionStorage.getItem("LgBasePlatformInfo");

        if (LgBasePlatformInfo){

            firstPageLoad(firstLoad);

        }else{

            GetBaseInfoForPages({dispatch}).then(data=>{

                if (data){

                    sessionStorage.setItem('LgBasePlatformInfo',JSON.stringify(data));

                    firstPageLoad(firstLoad)

                }

            })

        }

    },[]);


    const firstLoad = () =>{

        const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

        const CopyUserInfo = UserInfo;

        CopyUserInfo['UserType'] = parseInt(UserInfo['UserType']);

        dispatch(loginUserInfoUpdate(CopyUserInfo));

        const {WebRootUrl} = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

       const token = sessionStorage.getItem('token');

        if (!(CopyUserInfo.UserType===0&&CopyUserInfo===2)&&(CopyUserInfo.UserType!==6)){

            GetSubSystemsMainServerBySubjectID({sysIDs:'200',dispatch}).then(data=>{

                if (data){

                    let PsnMgrLgAssistantAddr = data[0].WebSvrAddr;

                    sessionStorage.setItem('PsnMgrToken',token);//用户Token

                    sessionStorage.setItem('PsnMgrMainServerAddr',WebRootUrl); //基础平台IP地址和端口号 形如：http://192.168.129.1:30103/

                    sessionStorage.setItem('PsnMgrLgAssistantAddr',PsnMgrLgAssistantAddr);

                    dynamicFile([

                        `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/css/lancoo.cp.assistantInfoCenter.css`,

                        `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/js/jquery-1.7.2.min.js`

                    ]).then(()=>{

                        dynamicFile([

                            `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/assets/jquery.pagination.js`,

                            `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/js/lancoo.cp.assistantInfoCenter.js`

                        ])

                    });

                    setBellShow(true);

                }else{

                    setBellShow(false);

                }

            })

        }else{

            setBellShow(false);

        }



    };

    return(

        <DoucumentTitle title={"111"}>

            <div className={"app"}>

                <Header bellShow={bellShow} tabTitle={"测试标签"}></Header>

                <Content></Content>

                <Alert type={appAlert.type} show={appAlert.show} title={appAlert.title} onOk={appAlert.ok} onCancel={appAlert.cancel} onClose={appAlert.close} abstract={appAlert.abstract} okShow={appAlert.okShow} cancelShow={appAlert.cancelShow}></Alert>

                <Alert type={appSuccessAlert.type} show={appSuccessAlert.show} title={appSuccessAlert.title} onHide={appSuccessAlert.hide}></Alert>

            </div>

        </DoucumentTitle>

    )

}

export default memo(App)