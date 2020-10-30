import React,{Component} from 'react';

import { Loading,Alert } from "../../../common";

import publicJS from '../../../common/js/public';

import {TokenCheck_Connect, LogOut, firstPageLoad, getQueryVariable} from "../../../common/js/disconnect";

import LoginUserActions from '../actions/LoginUserActions';

import AppAlertActions from '../actions/AppAlertActions';

import { connect } from 'react-redux';

import DeskTop from './DeskTop';

import {getData} from "../../../common/js/fetch";

import CONFIG from "../../../common/js/config";

import {productInfoChange} from "../reducers/ProductInfo";

import apiActions from '../actions/ApiActions';

import dynamicFile from 'dynamic-file';
import {GetIdentityTypeByCode, GetSelfIdentity} from "../../../userPersona/js/actions/apiActions";
import {identifyChange} from "../../../userPersona/js/actions/identifyInfoActions";

class App extends Component {

    constructor(props){

        super(props);

    }


    componentDidMount(){

        this.GetProduct().then(data=>{

                    if (data){

                        sessionStorage.setItem("LgBasePlatformInfo",JSON.stringify(data));

                        firstPageLoad(()=>{

                            this.pageInit();

                        });

                    }

                });

    }


    pageInit(){

        const identifyCode  = getQueryVariable('lg_ic');

        if (identifyCode){

            GetIdentityTypeByCode(identifyCode).then(data=>{

                this.nextPageStep(data); //下一步展示界面

            });

        }else{

            GetSelfIdentity().then(data=>{

                this.nextPageStep(data);

            })

        }

    }


    nextPageStep(identifyList){

        const { dispatch } = this.props;

        if (identifyList&&identifyList.length>0){

            dispatch(identifyChange(identifyList));

        }

        const UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

        const token = sessionStorage.getItem("token");

        const {UserType,UserClass} = UserInfo;

        const ProductInfo = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

        //填充产品信息


        if ((parseInt(UserType)===1&&parseInt(UserClass)===2)||parseInt(UserType)===6){

            ProductInfo['MessageShow'] = false;

        }else{

            ProductInfo['MessageShow'] = true;

            apiActions.GetMsgWebServerAddress({dispatch}).then(data=>{

                if (data){

                    let PsnMgrLgAssistantAddr = data.WebSvrAddr;

                    sessionStorage.setItem('PsnMgrToken',token);//用户Token

                    sessionStorage.setItem('PsnMgrMainServerAddr',ProductInfo.WebRootUrl); //基础平台IP地址和端口号 形如：http://192.168.129.1:30103/

                    sessionStorage.setItem('PsnMgrLgAssistantAddr',PsnMgrLgAssistantAddr);

                    dynamicFile([

                        `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/css/lancoo.cp.assistantInfoCenter.css`,

                        `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/js/jquery-1.7.2.min.js`

                    ]).then(()=>{

                        dynamicFile([

                            `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/assets/jquery.pagination.js`,

                            `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/js/lancoo.cp.assistantInfoCenter.js`

                        ])

                    })

                }

            });

        }

        document.title = ProductInfo.ProductName;

        dispatch(productInfoChange(ProductInfo));


        //判断用户信息

        if ([0,1,2,3,7,10].includes(parseInt(UserType))){

            dispatch({type:LoginUserActions.LOGIN_USER_INFO_UPDATE,data:UserInfo});

        }else if(parseInt(UserType)===6){

            window.location.href = '/html/admSchoolSetting/';

        }else{

            dispatch(AppAlertActions.alertTips({title:'目前只对管理员和教师以及学生开放，其他用户敬请期待',cancel:()=>{ return this.Logout }}));

        }


    }

    async GetProduct() {

        const result = await getData(CONFIG.Import + '/Global/GetBaseInfoForPages', 1);

        const res = await result.json();

        if (res.StatusCode === 200) {

            return res.Data;

        }

    }


    Logout(){

        LogOut();

    }




    render() {

        const { AppAlert,LoginUser,AppLoading } = this.props;


        return (

            <div className="desk-top-wrapper">

                {

                    AppLoading.show?

                        <Loading tip="加载中请稍后..." size="large" opacity={false}></Loading>

                        :''

                }



                {

                    Object.keys(LoginUser).length>0?

                        <DeskTop></DeskTop>

                        :null

                }


                <Alert
                    type={AppAlert.type}
                    title={AppAlert.title}
                    onOk={AppAlert.ok}
                    onCancel={AppAlert.cancel}
                    onHide={AppAlert.hide}
                    onClose={AppAlert.close}
                    show={AppAlert.show}
                >

                </Alert>


            </div>

        );

    }

}


const mapStateToProps = (state)=>{

    const { LoginUser,AppAlert,AppLoading } = state;

    return {

        LoginUser,

        AppAlert,

        AppLoading

    }

};

export default connect(mapStateToProps)(App);