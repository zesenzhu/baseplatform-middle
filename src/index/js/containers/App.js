import React,{Component} from 'react';

import { Loading,Alert } from "../../../common";

import publicJS from '../../../common/js/public';

import {TokenCheck_Connect, LogOut, firstPageLoad} from "../../../common/js/disconnect";

import LoginUserActions from '../actions/LoginUserActions';

import AppAlertActions from '../actions/AppAlertActions';

import { connect } from 'react-redux';

import TeacherDeskTop from './Teacher/Index';

import ManagerDeskTop from './Manager/Index';

import StudentDeskTop from './Student/Index';

import Bs2CsCommon from "../actions/Bs2CsCommon";

import BTCActions from '../actions/BsToCsActions';

import {getData} from "../../../common/js/fetch";

import CONFIG from "../../../common/js/config";

class App extends Component {

    constructor(props){

        super(props);

    }


    componentDidMount(){


        if(publicJS.IEVersion()){

            if (sessionStorage.getItem("LgBasePlatformInfo")){

                firstPageLoad(()=>{

                    this.pageInit();

                });

            }else{

                this.GetProduct().then(data=>{

                    if (data){

                        sessionStorage.setItem("LgBasePlatformInfo",JSON.stringify(data));


                        firstPageLoad(()=>{

                            this.pageInit();

                        });

                    }

                });

            }

           /* TokenCheck_Connect(true,()=>{

                if (sessionStorage.getItem('UserInfo')){

                    let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

                    const {UserType,SubjectIDs} = UserInfo;

                    if (parseInt(UserType)===0||parseInt(UserType)===1||parseInt(UserType)===2){

                        if (parseInt(UserType)===1&&SubjectIDs===''){

                            window.location.href='/Error.aspx?errcode=E011';

                        }else{

                            dispatch({type:LoginUserActions.LOGIN_USER_INFO_UPDATE,data:UserInfo});

                        }

                        window.BsToCs = new Bs2CsCommon((e)=>dispatch(that.BsToCsCallBack(e)));

                    }else if(parseInt(UserType)===6){

                        window.location.href = '/html/admSchoolSetting/';

                    }else{

                        dispatch(AppAlertActions.alertTips({title:'目前只对管理员和教师以及学生开放，其他用户敬请期待',cancel:()=>{ return this.Logout }}));

                    }

                }else{

                    let getUserInfo = setInterval(()=>{

                        if (sessionStorage.getItem('UserInfo')){

                            let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

                            const {UserType,SubjectIDs} = UserInfo;

                            if (parseInt(UserType)===0||parseInt(UserType)===1||parseInt(UserType)===2){

                                if (parseInt(UserType)===1&&SubjectIDs===''){

                                    window.location.href='/Error.aspx?errcode=E011';

                                }else{

                                    dispatch({type:LoginUserActions.LOGIN_USER_INFO_UPDATE,data:UserInfo});

                                }

                                window.BsToCs = new Bs2CsCommon((e)=>dispatch(that.BsToCsCallBack(e)));

                            }else if(parseInt(UserType)===6){

                                window.location.href = '/html/admSchoolSetting/';

                            }else{


                                dispatch(AppAlertActions.alertTips({title:'目前只对管理员和教师以及学生开放，其他用户敬请期待',cancel:()=>{ return this.Logout }}));


                            }

                            clearInterval(getUserInfo);

                        }

                    },20)

                }

            });*/

        }

    }


    pageInit(){

        const { dispatch } = this.props;

        const that = this;

        let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

        const {UserType,SubjectIDs} = UserInfo;

        if (parseInt(UserType)===0||parseInt(UserType)===1||parseInt(UserType)===2){

            if (parseInt(UserType)===1&&SubjectIDs===''){

                window.location.href='/Error.aspx?errcode=E011';

            }else{

                dispatch({type:LoginUserActions.LOGIN_USER_INFO_UPDATE,data:UserInfo});

            }

            window.BsToCs = new Bs2CsCommon((e)=>dispatch(that.BsToCsCallBack(e)));

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

    //判断是否有基础平台的插件
     BsToCsCallBack(data){

        return dispatch=>{

            if (data){

                dispatch({type:BTCActions.BTC_TO_TRUE});

            }else{

                dispatch({type:BTCActions.BTC_TO_FALSE});

            }

        }

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

                    LoginUser.UserType === "0"?

                        <ManagerDeskTop></ManagerDeskTop>

                        :''

                }

                {

                    LoginUser.UserType === "1"?

                    <TeacherDeskTop></TeacherDeskTop>

                    :''

                }

                {

                    LoginUser.UserType === "2"?

                        <StudentDeskTop></StudentDeskTop>

                        :''

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