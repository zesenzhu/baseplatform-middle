import React, { Component, createRef } from "react";

import { Loading, Alert, MenuLeftNoLink } from "../../../common";

import publicJS from "../../../common/js/public";

import Frame from "../../../common/Frame";

import { getQueryVariable } from "../../../common/js/disconnect";

import { connect } from "react-redux";

import BaseSetting from "./BaseSetting";

import SafeSetting from "./SafeSetting";

import AuthorSetting from "./AuthorSetting";

import MCIActions from "../actions/ModuleCommonInfoActions";

import LoginUserActions from "../actions/LoginUserActions";

import logo from "../../images/个人账号管理.png";

import { getBaseInfo } from "../actions/BaseActions";

import BaseActions from "../actions/BaseActions";

import $ from "jquery";

class App extends Component {
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
  constructor(props) {
    super(props);
    this.Frame = createRef;
  }
  //点击menu
  menuClick(e) {
    const { dispatch } = this.props;

    dispatch({
      type: MCIActions.MODULE_COMMON_INFO_MENU_CHANGE,
      data: e.ident,
    });
  }
  componentWillMount() {
    const { dispatch, DataState } = this.props;

    // 获取人脸库地址
    dispatch(
      BaseActions.GetSubSystemsMainServerBySubjectID({
        fn: () => {
          // this.SetBannerList(); //获取到后再次进行列表更新
        },
      })
    );
  }

  pageInit() {
    const { dispatch } = this.props;

    let UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

    const { UserID, UserType, Gender } = UserInfo;

    dispatch({ type: LoginUserActions.UPDATE_LOGIN_USER, data: UserInfo });

    dispatch({ type: MCIActions.MODULE_COMMON_INFO_MENU_CHANGE, data: "base" });

    const isSafeSetting = getQueryVariable("isSafeSetting");
    let ModuleID = "";
    this.Frame.getIdentity({}, (identity) => {
      // console.log(identify);
      dispatch({
        type: LoginUserActions.UPDATE_LOGIN_USER,
        data: { ...UserInfo, identity },
      });
    });
    getBaseInfo({ UserID, UserType, dispatch }).then((data) => {
      if (data) {
        if (data.AvatarPath === BaseSetting.AvatarPath) {
          //不需要刷新photo头像
          // delete data.AvatarPath;
          // delete data.AvatarPath;
        }

        dispatch({ type: BaseActions.BASE_INFO_UPDATE, data: data });
        dispatch(BaseActions.Init());
      }

      if (isSafeSetting) {
        dispatch({
          type: MCIActions.MODULE_COMMON_INFO_MENU_CHANGE,
          data: "safe",
        });

        $(".frame_leftmenu_mainitem.no_child").removeClass("active selected");

        $(".frame_leftmenu_mainitem.no_child:nth-child(2)").addClass(
          "active selected"
        );
      } else {
        dispatch({
          type: MCIActions.MODULE_COMMON_INFO_MENU_CHANGE,
          data: "base",
        });
      }
    });
  }
  onRef = (ref) => {
    this.Frame = ref;
  };
  render() {
    let {
      LoginUser,
      ModuleCommonInfo,
      AppAlert,
      AppLoading,
      BaseSetting: { SysUrl },
    } = this.props;

    let BaseSettings = this.props.BaseSetting;

    let Component = "";

    let Menu = [
      { name: "基本资料", menu: "menu31", ident: "base", default: true },

      { name: "账号安全", menu: "menu29", ident: "safe", default: false },

      {
        name: "第三方登录账号",
        menu: "menu30",
        ident: "author",
        default: false,
      },
      {
        name: "我的人脸",
        menu: "menu_face",
        ident: "face",
        default: false,
      },
    ];
    let faceUrl = "";

    if (
      LoginUser.UserType === "0" ||
      !(SysUrl instanceof Array && SysUrl.length > 0)
    ) {
      Menu.pop();
    } else {
      let token = sessionStorage.getItem("token");

      faceUrl = SysUrl[0].WebSvrAddr + "MyFace.html?type=1&lg_tk=" + token;
    }
    let rate = 944 / 1200; //人脸缩放
    return (
      <React.Fragment>
        {AppLoading.show ? (
          <Loading size="large" tip="加载中..." opacity={false}></Loading>
        ) : (
          ""
        )}

        <Frame
          module={{
            cnname: "个人账号管理",
            enname: "Personal Account Management",
            image: logo,
          }}
          userInfo={{
            name: null,
            image: null,
          }}
          type="triangle"
          showBarner={false}
          showLeftMenu={true}
          pageInit={this.pageInit.bind(this)}
          onRef={this.onRef}
        >
          <div ref="frame-left-menu">
            <div className="frame_left_menu_pic clearfix">
              <div
                className="header-pic"
                style={{
                  backgroundImage: `url(${
                    BaseSettings.AvatarPath
                      ? BaseSettings.AvatarPath
                      : LoginUser.AvatarPath
                  })`,
                }}
              ></div>

              <div className="user-name">{LoginUser.UserName}</div>
            </div>

            <MenuLeftNoLink
              Menu={Menu}
              menuClick={this.menuClick.bind(this)}
            ></MenuLeftNoLink>
          </div>

          <div ref="frame-right-content">
            {ModuleCommonInfo.menuActive === "base" ? (
              <BaseSetting></BaseSetting>
            ) : (
              ""
            )}

            {ModuleCommonInfo.menuActive === "safe" ? (
              <SafeSetting></SafeSetting>
            ) : (
              ""
            )}

            {ModuleCommonInfo.menuActive === "author" ? (
              <AuthorSetting></AuthorSetting>
            ) : (
              ""
            )}
            {ModuleCommonInfo.menuActive === "face" ? (
              <div style={{ position:'relative',transform: `scale(${rate})`, }}>
                <iframe
                style={{border: "none",position:'absolute',top:0,left:-(1-rate)/2*(1200)}}
                  title={"我的人脸"}
                  width={1200}
                  height={753}
                  src={faceUrl}
                ></iframe>
              </div>
            ) : (
              ""
            )}
          </div>
        </Frame>

        <Alert
          show={AppAlert.show}
          type={AppAlert.type}
          onOk={AppAlert.ok}
          onCancel={AppAlert.cancel}
          onHide={AppAlert.hide}
          title={AppAlert.title}
          abstract={AppAlert.abstract}
        ></Alert>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    LoginUser,
    ModuleCommonInfo,
    AppAlert,
    AppLoading,
    BaseSetting,
  } = state;

  return {
    LoginUser,

    ModuleCommonInfo,

    AppAlert,

    AppLoading,

    BaseSetting,
  };
};

export default connect(mapStateToProps)(App);
