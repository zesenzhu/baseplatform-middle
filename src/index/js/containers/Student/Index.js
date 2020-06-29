import React, { Component } from "react";

import $ from "jquery";

import AppAlertActions from "../../actions/AppAlertActions";

import HeaderActions from "../../actions/Student/HeaderActions";

import TeacherPageActions from "../../actions/Student/TeacherPageActions";

import TeacherCustomActions from "../../actions/Student/TeacherCustomActions";

import ModuleActions from "../../actions/Student/ModuleActions";

import Header from "../../components/Student/Header";

import Content from "../../components/Student/Content";

import { connect } from "react-redux";

import { Modal, Loading } from "../../../../common";

import config from "../../../../common/js/config";

import { getData, postData } from "../../../../common/js/fetch";

import { getQueryVariable, LogOut } from "../../../../common/js/disconnect";

import TeacherCustomContent from "../../components/Student/TeacherCustomContent";

import AddWebsiteCustom from "../../components/Student/Custom/AddWebsiteCustom";

import ToolCustom from "../../components/Student/Custom/ToolCustom";

import TPActions from '../../actions/Student/TeacherPageActions';

class Index extends Component {

  constructor(props) {

    super(props);

    const { dispatch } = props;

    dispatch(TeacherPageActions.PageInit());

  }

  //点击header的menu按钮

  HeaderMenuToggle(e) {

    e.stopPropagation();

    const { dispatch } = this.props;

    dispatch({ type: HeaderActions.STUDENT_HEADER_MENU_TOGGLE });

    $(".content-wrapper").css("zIndex", "5");

  }

  //点击学科按钮
  SubjectMenuToggle(e) {

    e.stopPropagation();

    const { dispatch } = this.props;

    dispatch({ type: HeaderActions.TEACHER_SUBJECT_MENU_TOGGLE });

    $(".content-wrapper").css("zIndex", "5");

  }

  SubjectClick(info) {

    const { dispatch } = this.props;

    dispatch(HeaderActions.SubjectClick(info));

  }

  //图片加载成功调用
  ModuleImgLoad({ GroupID, PNO, CNO }) {

    const { dispatch } = this.props;

    dispatch(ModuleActions.ImgLoad({ GroupID, PNO, CNO }));



  }

  //图片加载失败调用
  ModuleImgErrorLoad({ GroupID, PNO, CNO }) {

    const { dispatch } = this.props;

    dispatch(ModuleActions.ImgErrorLoad({ GroupID, PNO, CNO }));

  }

  //点击了组合
  GroupToggle({ GroupID, PNO, Event }) {

    const { dispatch } = this.props;

    //Event.stopPropagation();

    //dispatch(ModuleActions.GroupToggle({GroupID,OrderNo}));

    let itemGroup = $(Event.target).closest(".module-item.group");

    let detailWrapper = itemGroup.children(".module-detail-wrapper");

    //判断是否需要向下展开
    if (itemGroup.offset().top + 40 - detailWrapper.height() < 0) {

      detailWrapper.css({ bottom: "auto", top: "40px" });

    }

    detailWrapper.slideToggle();

    //将下层的zindex覆盖住上层的zindex
    $(".content-wrapper").css("zIndex", "101");

  }

  //点击了模块

  ClickModule({ ModuleStatus, AccessType, AccessParam, SysID, Event,ModuleType }) {

    Event.stopPropagation();

    const { dispatch,BsToCs,Student } = this.props;

    const {CanVisit} = BsToCs;

    const SubjectID = '';


    switch (ModuleStatus) {

      //判断模块状态
      case 1:

        if (AccessType === "href") {

          if (SysID !== "") {

            let lg_tk = getQueryVariable("lg_tk") || sessionStorage.getItem("token");

            //判断是否是应用
            if (ModuleType==='application'){

                window.open(`${AccessParam}?lg_tk=${lg_tk}&subjectid=${SubjectID}`);

            }else{

                window.open(`${AccessParam}?lg_tk=${lg_tk}`);

            }


          } else {

              //判断是否是应用
              if (ModuleType==='application'){

                  window.open(`${AccessParam}?subjectid=${SubjectID}`);

              }else{

                  window.open(AccessParam);

              }

          }

        } else if (AccessType==='exe') {

          //判断是否有基础插件包
          if (CanVisit){

              console.log(ModuleType);

              // let  AccessParam = 'lgsoft://LgExplorer::LgExplorer::LgExplorer.exe::{Web_Basic}|{lg_tk}|{SubjectID}|localDisk|';

              const PoroTolType = AccessParam.split('://')[0];

              const BasicWebUrl = `${window.location.protocol}//${window.location.host}/`;

              const token = sessionStorage.getItem('token');

              //判断是否是网站或者资源库
              if (ModuleType==='website'||ModuleType==='reslib') {

                  const PoroTol = ModuleType==='website'?`${BasicWebUrl}|${token}|${SubjectID}|website|${AccessParam}||`:`${BasicWebUrl}|${token}|${SubjectID}|localDisk|${AccessParam}||`;

                  window.BsToCs.start('SubjectResMgr','LgCollector',BasicWebUrl,'LgCollector.exe',PoroTol);

              }else{

                  //判断调用插件启动方式
                  if (PoroTolType==='lgsoft'){

                      const proName = AccessParam.split('::')[0].split('://')[1];

                      const moduleName = AccessParam.split('::')[1];

                      const exeName = AccessParam.split('::')[2];

                      const porotol = AccessParam.split('::')[3].replace(/{Web_Basic}/g,BasicWebUrl).replace(/{lg_tk}/g,token).replace(/{SubjectID}/g,SubjectID);

                      window.BsToCs.start(proName,moduleName,BasicWebUrl,exeName,porotol);

                  }

              }

            }else{//没有安装基础插件包的情况下

              dispatch(AppAlertActions.alertWarn({ title: "您还未安装基础插件包，请先下载和安装插件包！" }));

            }

          }else{


        }

        break;

      case 2:

        dispatch(AppAlertActions.alertWarn({ title:"该功能尚未购买（未检测到加密锁信息），请联系管理员购买后再使用" }));

        break;

      case 3:
        dispatch(AppAlertActions.alertWarn({ title: "该功能尚未完成部署，请稍候再试" }));

        break;

      case 4:

        dispatch(AppAlertActions.alertWarn({ title: "该功能正在维护中，请稍候再试" }));

        break;

      case 5:

        dispatch(AppAlertActions.alertWarn({ title: "该功能已过试用期，请联系管理员购买后再使用" }));

        break;

      default:

        return;

    }

    //将其他的module-detail-wrapper隐藏

    $(".module-item.group")
      .children(".module-detail-wrapper")
      .hide();
  }

  OutMenuEvent(e) {
    const { dispatch } = this.props;

    let HDM = document.getElementById("header-down-menu");

    if (!HDM.contains(e.target)) {
      dispatch({ type: HeaderActions.STUDENT_HEADER_MENU_HIDE });
    }

    /*dispatch(ModuleActions.GroupDetailHide());*/

    $(".module-item.group").each((i, that) => {
      if (!that.contains(e.target)) {
        $(that)
          .children(".module-detail-wrapper")
          .hide();
      }
    });
  }

  //点击menu之外
  componentDidMount() {
    addEventListener("click", this.OutMenuEvent.bind(this));

    $(document).scroll(e => {
      this.EmptyLoad();
    });
  }

  //退出登录
  LogOut() {
    const { dispatch } = this.props;

    dispatch(
      AppAlertActions.alertQuery({
        title: "确定要退出登录吗?",
        ok: () => {
          return this.GoOut;
        }
      })
    );
  }

  GoOut() {
    LogOut();
  }

  EmptyLoad() {
    let WHeight = $(window).height();

    let ScrollTop = $(window).scrollTop();

    $(".teacher-empty").each((index, that) => {
      let OffSetTop = $(that).offset().top;

      //console.log(ScrollTop);
    });
  }

  // 桌面定制
  CustomClick = (key = "tool") => {

    let closeAssistantFn = closeAssistantFn?closeAssistantFn:null;


    if (closeAssistantFn){

        closeAssistantFn();

    }

    const { dispatch, Student } = this.props;
    dispatch({ type: HeaderActions.STUDENT_CUSTOM_MODAL_OPEN, key: key });
  };

  // 桌面定制-关闭
  TeacherCustomModalCancel = () => {

    const { dispatch, Student } = this.props;

    dispatch({ type: HeaderActions.STUDENT_CUSTOM_MODAL_CLOSE });

      dispatch(TPActions.PageUpdate());

  };

  // 桌面定制-添加网站
  AddCustomWebsiteMadalOk = () => {
    const { dispatch, Student, LoginUser } = this.props;
    let WebsiteData = Student.WebsiteData;
    let TeacherTipsVisible = Student.TeacherTipsVisible;
    let isHaveFalse = false;
    let url = "/SubjectResMgr/WebSiteMgr/Teacher/AddWebsiteInfo";
    if (WebsiteData.WebName === "") {
      isHaveFalse = true;
      dispatch(
        TeacherCustomActions.setCustomTipsVisible({ WebNameTipsVisible: true })
      );
    }

    if (WebsiteData.WebAddress === "") {
      isHaveFalse = true;
      dispatch(
        TeacherCustomActions.setCustomTipsVisible({
          WebAddressTipsVisible: true
        })
      );
    }

    if (
      TeacherTipsVisible.WebNameTipsVisible ||
      TeacherTipsVisible.WebAddressTipsVisible
    ) {
      isHaveFalse = true;
    }
    if (isHaveFalse) {
      return;
    }

    // post数据
    let Period = 0;
    WebsiteData.PeriodID.map((child, index) => {
      Period += Number(child);
    });
    postData(
      config.CustomProxy + url,
      {
        CreatorID: LoginUser.UserID,
        Name: WebsiteData.WebName,
        Url: WebsiteData.WebAddress,
        SubTypeID: WebsiteData.WebType.value || 3,
        Type: 1,
        SubjectIDs: '',
        Period: Period
      },
      2
    )
      .then(data => data.json())
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch(
            TeacherCustomActions.setCustomTipsVisible({
              WebAddressTipsVisible: false,
              WebNameTipsVisible: false
            })
          );
          dispatch(TeacherCustomActions.setHandleWebsiteInitData({}));
          dispatch({
            type: TeacherCustomActions.STU_ADD_WEBSITE_CUSTOM_MODAL_CLOSE
          });
          dispatch(
            TeacherCustomActions.getCustomData(
              'Website',
              LoginUser.UserID,
              "",
              '',
              this.handlePeriod(LoginUser.StudyLevel).value
            )
          );
        }
      });
  };
  handlePeriod = StudyLevel => {
    let firstSelect = { value: "0", title: "全部学段" };
    if (StudyLevel === "") {
      firstSelect = { value: "0", title: "全部学段" };
    } else if (StudyLevel === "A") {
      firstSelect = { value: "1", title: "小学" };
    } else if (StudyLevel === "B") {
      firstSelect = { value: "2", title: "初中" };
    } else if (StudyLevel === "C") {
      firstSelect = { value: "4", title: "高中" };
    }
    return firstSelect;
  };
  // 桌面定制-关闭-添加网站
  AddCustomWebsiteMadalCancel = () => {
    const { dispatch, Student } = this.props;
    dispatch(
      TeacherCustomActions.setCustomTipsVisible({
        WebAddressTipsVisible: false,
        WebNameTipsVisible: false
      })
    );
    dispatch(TeacherCustomActions.setHandleWebsiteInitData({}));
    dispatch({
      type: TeacherCustomActions.STU_ADD_WEBSITE_CUSTOM_MODAL_CLOSE
    });
  };

  // 桌面定制-修改网站
  EditCustomWebsiteMadalOk = () => {
    const { dispatch, Student, LoginUser } = this.props;
    let WebsiteData = Student.WebsiteData;
    let TeacherTipsVisible = Student.TeacherTipsVisible;
    let isHaveFalse = false;
    let url = "/SubjectResMgr/WebSiteMgr/Teacher/EditWebsiteInfo";
    if (WebsiteData.WebName === "") {
      isHaveFalse = true;
      dispatch(
        TeacherCustomActions.setCustomTipsVisible({ WebNameTipsVisible: true })
      );
    }

    if (WebsiteData.WebAddress === "") {
      isHaveFalse = true;
      dispatch(
        TeacherCustomActions.setCustomTipsVisible({
          WebAddressTipsVisible: true
        })
      );
    }

    if (
      TeacherTipsVisible.WebNameTipsVisible ||
      TeacherTipsVisible.WebAddressTipsVisible
    ) {
      isHaveFalse = true;
    }
    if (isHaveFalse) {
      return;
    }

    // post数据
    let Period = 0;
    WebsiteData.PeriodID.map((child, index) => {
      Period += Number(child);
    });
    postData(
      config.CustomProxy + url,
      {
        SchoolID: LoginUser.SchoolID,
        WebsiteId: WebsiteData.WebsiteId,
        TeacherID:LoginUser.UserID,
        Name: WebsiteData.WebName,
        Url: WebsiteData.WebAddress,
        SubTypeID: WebsiteData.WebType.value || 3,
        Type: 1,
        SubjectIDs:'',
        Period: Period
      },
      2
    )
      .then(data => data.json())
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch(
            TeacherCustomActions.setCustomTipsVisible({
              WebAddressTipsVisible: false,
              WebNameTipsVisible: false
            })
          );
          dispatch(TeacherCustomActions.setHandleWebsiteInitData({}));
          dispatch({
            type: TeacherCustomActions.STU_EDIT_WEBSITE_CUSTOM_MODAL_CLOSE
          });
          dispatch(
            TeacherCustomActions.getCustomData(
              'Website',
              LoginUser.UserID,
              "",
             '',
              this.handlePeriod(LoginUser.StudyLevel).value
            )
          );
        }
      });
  };

  // 桌面定制-关闭-修改网站
  EditCustomWebsiteMadalCancel = () => {
    const { dispatch, Student } = this.props;
    dispatch(
      TeacherCustomActions.setCustomTipsVisible({
        WebAddressTipsVisible: false,
        WebNameTipsVisible: false
      })
    );
    dispatch(TeacherCustomActions.setHandleWebsiteInitData({}));
    dispatch({
      type: TeacherCustomActions.STU_EDIT_WEBSITE_CUSTOM_MODAL_CLOSE
    });
  };


  // 桌面定制-添加工具
  AddCustomToolMadalOk = () => {
    const { dispatch, Student, LoginUser } = this.props;
    let ToolData = Student.ToolData;
    let TeacherTipsVisible = Student.TeacherTipsVisible;
    let isHaveFalse = false;
    let url = "/SubjectResMgr/ToolMgr/Teacher/AddToolsInfo";
    if (ToolData.ToolName === "") {
      isHaveFalse = true;
      dispatch(
        TeacherCustomActions.setCustomTipsVisible({ ToolNameTipsVisible: true })
      );
    }

    if (ToolData.ToolUrl === "") {
      isHaveFalse = true;
      dispatch(
        TeacherCustomActions.setCustomTipsVisible({
            ToolUrlTipsVisible: true
        })
      );
    }
   
    if (
      TeacherTipsVisible.ToolNameTipsVisible ||
      TeacherTipsVisible.ToolUrlTipsVisible
    ) {
      isHaveFalse = true;
    }
    if (isHaveFalse) {
      return;
    }
    let ToolImgUrl = ToolData.ToolImgUrl||'Base/ResLib/default.png'
    // if(ToolData.ToolImgUrl===''){
    //   ToolImgUrl = ''
    //   // dispatch(
    //   //   AppAlertActions.alertWarn({
    //   //     title: "请上传工具图标"
    //   //   })
    //   // );
    //   // return;
    // }
    
    
    postData(
      config.CustomProxy + url,
      {
        TeacherID:LoginUser.UserID,
        Name: ToolData.ToolName,
        Url: ToolData.ToolUrl,
        Type: ToolData.ToolType,
        ImgUrl: ToolImgUrl,
        GroupID:'Group002'
        
      },
      2
    )
      .then(data => data.json())
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch(
            TeacherCustomActions.setCustomTipsVisible({
                ToolNameTipsVisible: false,
                ToolUrlTipsVisible: false
            })
          );
          dispatch(TeacherCustomActions.setHandleToolInitData({}));
          dispatch({
            type: TeacherCustomActions.STU_ADD_TOOL_CUSTOM_MODAL_CLOSE
          });
          dispatch(
            TeacherCustomActions.getCustomData(
              'tool',
              LoginUser.UserID,
              "",
              ''
            )
          );
        }
      });
  };

  // 桌面定制-关闭-添加工具
  AddCustomToolMadalCancel = () => {
    const { dispatch, Student } = this.props;
    dispatch(
      TeacherCustomActions.setCustomTipsVisible({
        ToolNameTipsVisible: false,
                ToolUrlTipsVisible: false
      })
    );
    dispatch(TeacherCustomActions.setHandleToolInitData({}));
    dispatch({
      type: TeacherCustomActions.STU_ADD_TOOL_CUSTOM_MODAL_CLOSE
    });
  };
   // 桌面定制-修改工具
   EditCustomToolMadalOk = () => {
    const { dispatch, Student, LoginUser } = this.props;
    let ToolData = Student.ToolData;
    let TeacherTipsVisible = Student.TeacherTipsVisible;
    let isHaveFalse = false;
    let url = "/SubjectResMgr/ToolMgr/Teacher/EditToolsInfo";
    if (ToolData.ToolName === "") {
      isHaveFalse = true;
      dispatch(
        TeacherCustomActions.setCustomTipsVisible({ ToolNameTipsVisible: true })
      );
    }

    if (ToolData.ToolUrl === "") {
      isHaveFalse = true;
      dispatch(
        TeacherCustomActions.setCustomTipsVisible({
            ToolUrlTipsVisible: true
        })
      );
    }

    if (
      TeacherTipsVisible.ToolNameTipsVisible ||
      TeacherTipsVisible.ToolUrlTipsVisible
    ) {
      isHaveFalse = true;
    }
    if (isHaveFalse) {
      return;
    }

    
    postData(
      config.CustomProxy + url,
      {
        TeacherID:LoginUser.UserID,
        Name: ToolData.ToolName,
        Url: ToolData.ToolUrl,
        Type: ToolData.ToolType,
        ImgUrl: ToolData.ToolImgUrl,
        ID:ToolData.ToolID
      },
      2
    )
      .then(data => data.json())
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch(
            TeacherCustomActions.setCustomTipsVisible({
                ToolNameTipsVisible: false,
                ToolUrlTipsVisible: false
            })
          );
          dispatch(TeacherCustomActions.setHandleToolInitData({}));
          dispatch({
            type: TeacherCustomActions.STU_EDIT_TOOL_CUSTOM_MODAL_CLOSE
          });
          dispatch(
            TeacherCustomActions.getCustomData(
              'tool',
              LoginUser.UserID,
              "",
              ''
            )
          );
        }
      });
  };

  // 桌面定制-关闭-修改工具
  EditCustomToolMadalCancel = () => {
    const { dispatch, Student } = this.props;
    dispatch(
      TeacherCustomActions.setCustomTipsVisible({
        ToolNameTipsVisible: false,
                ToolUrlTipsVisible: false
      })
    );
    dispatch(TeacherCustomActions.setHandleToolInitData({}));
    dispatch({
      type: TeacherCustomActions.STU_EDIT_TOOL_CUSTOM_MODAL_CLOSE
    });
  };
  render() {
    const { LoginUser, Student, AppLoading } = this.props;

    const { HeaderSetting, Modules } = Student;

    const { ModuleGroups, ModulesLoading } = Modules;

    return (
      <div className="teacher-desk-top">
        <Header
          LoginUser={LoginUser}
          HeaderSetting={HeaderSetting}
          HeaderMenuToggle={this.HeaderMenuToggle.bind(this)}
          LogOut={this.LogOut.bind(this)}
          CustomClick={this.CustomClick.bind(this)}
        ></Header>

        <Content
          ModuleGroups={ModuleGroups}
          ImgLoad={this.ModuleImgLoad.bind(this)}
          ImgErrorLoad={this.ModuleImgErrorLoad.bind(this)}
          GroupToggle={this.GroupToggle.bind(this)}
          ClickModule={this.ClickModule.bind(this)}
          ModulesLoading={ModulesLoading}
          EmptyLoad={this.EmptyLoad.bind(this)}
          CustomClick={this.CustomClick.bind(this)}
        ></Content>

        <Modal
          ref="TeacherCustomMadal"
          bodyStyle={{ padding: 0, height: 734 + "px" }}
          type="1"
          title={"桌面定制"}
          width={1150}
          footer={null}
          destroyOnClose={true}
          visible={Student.TeacherCustomModalShow.Show}
          onCancel={this.TeacherCustomModalCancel}
        >
          {Student.TeacherCustomModalShow.Show ? (
            <TeacherCustomContent></TeacherCustomContent>
          ) : (
            ""
          )}
        </Modal>
        <Modal
          ref="AddCustomWebsiteMadal"
          bodyStyle={{ padding: 0, height: 245 + "px" }}
          type="1"
          title={"添加网站"}
          mask={false}
          width={585}
          destroyOnClose={true}
          visible={Student.TeacherCustomModalShow.AddWebsiteCustomModalShow}
          onCancel={this.AddCustomWebsiteMadalCancel}
          onOk={this.AddCustomWebsiteMadalOk}
        >
          <Loading opacity={false} spinning={AppLoading.modalLoading}>
            {Student.TeacherCustomModalShow.AddWebsiteCustomModalShow ? (
              <AddWebsiteCustom></AddWebsiteCustom>
            ) : (
              ""
            )}
          </Loading>
        </Modal>
        <Modal
          ref="EditCustomWebsiteMadal"
          bodyStyle={{ padding: 0, height: 245 + "px" }}
          type="1"
          title={"修改网站"}
          mask={false}
          width={585}
          destroyOnClose={true}
          visible={Student.TeacherCustomModalShow.EditWebsiteCustomModalShow}
          onCancel={this.EditCustomWebsiteMadalCancel}
          onOk={this.EditCustomWebsiteMadalOk}
        >
          <Loading opacity={false} spinning={AppLoading.modalLoading}>
            {Student.TeacherCustomModalShow.EditWebsiteCustomModalShow ? (
              <AddWebsiteCustom></AddWebsiteCustom>
            ) : (
              ""
            )}
          </Loading>
        </Modal>
        <Modal
          ref="AddCustomToolMadal"
          bodyStyle={{ padding: 0, height: 256 + "px" }}
          type="1"
          title={"添加工具"}
          width={684}
          mask={false}

          destroyOnClose={true}
          visible={Student.TeacherCustomModalShow.AddToolCustomModalShow}
          onCancel={this.AddCustomToolMadalCancel}
          onOk={this.AddCustomToolMadalOk}
        >
          <Loading opacity={false} spinning={AppLoading.modalLoading}>
            {Student.TeacherCustomModalShow.AddToolCustomModalShow ? (
              <ToolCustom></ToolCustom>
            ) : (
              ""
            )}
          </Loading>
        </Modal>

        <Modal
          ref="EditCustomToolMadal"
          bodyStyle={{ padding: 0, height: 256 + "px" }}
          type="1"
          title={"修改工具"}
          mask={false}
          width={684}
          destroyOnClose={true}
          visible={Student.TeacherCustomModalShow.EditToolCustomModalShow}
          onCancel={this.EditCustomToolMadalCancel}
          onOk={this.EditCustomToolMadalOk}
        >
          <Loading opacity={false} spinning={AppLoading.modalLoading}>
            {Student.TeacherCustomModalShow.EditToolCustomModalShow ? (
              <ToolCustom></ToolCustom>
            ) : (
              ""
            )}
          </Loading>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { LoginUser, Student, AppLoading,BsToCs } = state;

  return {
    LoginUser,

    Student,

    AppLoading,

    BsToCs

  };
};

export default connect(mapStateToProps)(Index);
