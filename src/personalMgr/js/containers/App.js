import React,{Component} from 'react';

import {Loading,Alert,MenuLeftNoLink} from "../../../common";

import publicJS from '../../../common/js/public';

import Frame from '../../../common/Frame';

import {TokenCheck_Connect} from "../../../common/js/disconnect";

import {connect} from 'react-redux';

import BaseSetting from './BaseSetting';

import SafeSetting from "./SafeSetting";

import AuthorSetting from "./AuthorSetting";

import MCIActions from '../actions/ModuleCommonInfoActions';

import LoginUserActions from '../actions/LoginUserActions';

import logo from "../../images/logo.png";





class App extends Component{

    /*constructor(props) {

        super(props);

        const { dispatch } = props;

        if(publicJS.IEVersion()){

            TokenCheck_Connect(false,()=>{

                if (sessionStorage.getItem('UserInfo')){
    
                    let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));
    
                    dispatch({type:LoginUserActions.UPDATE_LOGIN_USER,data:UserInfo});
    
                    dispatch({type:MCIActions.MODULE_COMMON_INFO_MENU_CHANGE,data:"base"});
    
    
                }else{
    
    
                    let getUserInfo = setInterval(()=>{
    
                        if (sessionStorage.getItem('UserInfo')){
    
                            let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));
    
                            dispatch({type:LoginUserActions.UPDATE_LOGIN_USER,data:UserInfo});
    
                            dispatch({type:MCIActions.MODULE_COMMON_INFO_MENU_CHANGE,data:"base"});
    
                            clearInterval(getUserInfo);
    
                        }
    
                    },20);
    
                }
    
            });

        }

    }*/
    //点击menu
    menuClick(e){

        const { dispatch } = this.props;

        dispatch({type:MCIActions.MODULE_COMMON_INFO_MENU_CHANGE,data:e.ident});

    }

    pageInit(){

        const { dispatch } = this.props;

        let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

        dispatch({type:LoginUserActions.UPDATE_LOGIN_USER,data:UserInfo});

        dispatch({type:MCIActions.MODULE_COMMON_INFO_MENU_CHANGE,data:"base"});

    }


    render() {

        let { LoginUser,ModuleCommonInfo,AppAlert,AppLoading } = this.props;

        let BaseSettings  = this.props.BaseSetting;

        let Component = '';

        let Menu = [

            {name:"基本资料",menu:"menu31",ident:"base",default:true},

            {name:"账号安全",menu:"menu29",ident:"safe",default:false},

            {name:"第三方登录账号",menu:"menu30",ident:"author",default:false},

            ];

        return (

           <React.Fragment>

               {

                   AppLoading.show?

                       <Loading size="large" tip="加载中..."  opacity={false}></Loading>

                       :''

               }

                <Frame
                module={{
                    cnname: "个人账号管理",
                    enname: "Personal Account Management",
                    image: logo
                }}
                /*userInfo={{
                    name:LoginUser.UserName,
                    image:BaseSettings.PhotoPath_NoCache?BaseSettings.PhotoPath_NoCache:LoginUser.PhotoPath_NoCache
                }}*/
                type="triangle"
                showBarner={false}
                showLeftMenu={true}
                pageInit={this.pageInit.bind(this)}
                >

                <div ref="frame-left-menu">

                    <div className="frame_left_menu_pic clearfix">

                        <div className="header-pic" style={{backgroundImage:`url(${BaseSettings.PhotoPath_NoCache?BaseSettings.PhotoPath_NoCache:LoginUser.PhotoPath_NoCache})`}}></div>

                        <div className="user-name">{LoginUser.UserName}</div>

                    </div>

                    <MenuLeftNoLink Menu={Menu} menuClick={this.menuClick.bind(this)}></MenuLeftNoLink>

                </div>


                <div ref="frame-right-content">

                    {

                        ModuleCommonInfo.menuActive==='base'?

                            <BaseSetting></BaseSetting>:''

                    }

                    {

                        ModuleCommonInfo.menuActive==='safe'?

                            <SafeSetting></SafeSetting>:''

                    }

                    {

                        ModuleCommonInfo.menuActive==='author'?

                            <AuthorSetting></AuthorSetting>:''

                    }

                </div>

            </Frame>

               <Alert
                   show={AppAlert.show}
                   type={AppAlert.type}
               onOk={AppAlert.ok}
               onCancel={AppAlert.cancel}
               onHide={AppAlert.hide}
               title={AppAlert.title}
               abstract={AppAlert.abstract}>

               </Alert>

           </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {

    const { LoginUser,ModuleCommonInfo,AppAlert,AppLoading,BaseSetting } = state;

    return {

        LoginUser,

        ModuleCommonInfo,

        AppAlert,

        AppLoading,

        BaseSetting

    }

};

export default connect(mapStateToProps)(App);