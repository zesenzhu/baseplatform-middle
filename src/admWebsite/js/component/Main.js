import React, { Component } from "react";
import {
  Loading,
  Empty,
  DropDown,
  CheckBox,
  CheckBoxGroup,
  PagiNation,
  Modal
} from "../../../common";
import { connect } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import history from "../containers/history";
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";
import actions from "../actions";
import "../../scss/Main.scss";
import WebsiteCustom from "../component/WebsiteCustom";
import ImgDefault from "../../images/icon-common.png";
class Main extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      UserMsg: props.DataState.LoginUser,
      PeriodSelect: { value: 0, title: "全部" },
      SubjectSelect: { value: 0, title: "全部" },
      TypeSelect: { value: 0, title: "全部" },
      selfSelect: false,
      checkList: [],
      checkAll: false,
      plainOption: [0, 1, 2, 3, 4, 5, 6, 7],
      pagination: 1,
      pageParam: "&pageSize=8&currentIndex=1",
      PeriodParam: "",
      SubjectParam: "",
      TypeParam: "",
      SelfParam: "",
      PeriodID: "",
      ImgType: [true, true, true, true, true, true, true, true],
      ImgDefault: [true, true, true, true, true, true, true, true]
    };
  }
  componentWillReceiveProps(nextProps) {
    const {DataState} = nextProps;
    this.setState({
      pagination:DataState.GetWebsiteResourceData.CurrentIndex
    })
  }
  // 学段选择
  PeriodDropMenu = e => {
    const { dispatch, DataState } = this.props;
    let PeriodID = "";
    let PeriodParam = "&Period=" + e.value;
    let Url =
      "/SubjectResMgr/WebSiteMgr/GetWebsiteInfoList?TypeID=1&pageSize=8&currentIndex=1" +
      PeriodParam +
      this.state.SelfParam;

    if (e.value === 1) {
      PeriodID = "P1";
    } else if (e.value === 2) {
      PeriodID = "P2";
    } else if (e.value === 4) {
      PeriodID = "P3";
    }

    dispatch(
      actions.UpDataState.getSubjectData(
        "/SubjectResMgr/WebSiteMgr/GetSubjectList?schoolId=" +
          this.state.UserMsg.SchoolID +
          "&periodId=" +
          PeriodID
      )
    );
    dispatch(
      actions.UpDataState.getTypeData(
        "/SubjectResMgr/WebSiteMgr/GetTypeList?SubjectID=&Period=" + e.value
      )
    );

    dispatch(actions.UpDataState.getWebsiteResourceData(Url));

    this.setState({
      checkList: [],
      checkAll: false,
      // pagination: 1,
      PeriodSelect: e,
      SubjectSelect: { value: 0, title: "全部" },
      SubjectParam: "&SubjectID=",
      pageParam: "&pageSize=8&currentIndex=1",
      PeriodParam: PeriodParam,
      TypeSelect: { value: 0, title: "全部" },
      TypeParam: "&SubTypeID=0",
      PeriodID: PeriodID,
      ImgType: [true, true, true, true, true, true, true, true],
      ImgDefault: [true, true, true, true, true, true, true, true]
    });
  };
  // 学科选择
  SubjectDropMenu = e => {
    const { dispatch, DataState } = this.props;

    let SubjectParam = "";
    if (e.value) {
      SubjectParam = "&SubjectID=" + e.value;
    } else {
      SubjectParam = "&SubjectID=";
    }
    let Url =
      "/SubjectResMgr/WebSiteMgr/GetWebsiteInfoList?TypeID=1&pageSize=8&currentIndex=1" +
      SubjectParam +
      this.state.PeriodParam +
      this.state.SelfParam;
    dispatch(
      actions.UpDataState.getTypeData(
        "/SubjectResMgr/WebSiteMgr/GetTypeList?SubjectID=" +
          (e.value ? e.value : "") +
          "&Period=" +
          this.state.PeriodID
      )
    );

    dispatch(actions.UpDataState.getWebsiteResourceData(Url));
    this.setState({
      checkList: [],
      checkAll: false,
      // pagination: 1,
      SubjectSelect: e,
      TypeSelect: { value: 0, title: "全部" },
      TypeParam: "&SubTypeID=0",
      pageParam: "&pageSize=8&currentIndex=1",
      SubjectParam: SubjectParam,
      ImgType: [true, true, true, true, true, true, true, true],
      ImgDefault: [true, true, true, true, true, true, true, true]
    });
  };
  // 分类选择
  TypeDropMenu = e => {
    const { dispatch, DataState } = this.props;

    let TypeParam = "&SubTypeID=" + e.value;
    let Url =
      "/SubjectResMgr/WebSiteMgr/GetWebsiteInfoList?TypeID=1&pageSize=8&currentIndex=1" +
      TypeParam +
      this.state.SubjectParam +
      this.state.SelfParam +
      this.state.PeriodParam;

    dispatch(actions.UpDataState.getWebsiteResourceData(Url));
    this.setState({
      checkList: [],
      checkAll: false,
      // pagination: 1,
      TypeSelect: e,
      pageParam: "&pageSize=8&currentIndex=1",
      TypeParam: TypeParam,
      ImgType: [true, true, true, true, true, true, true, true],
      ImgDefault: [true, true, true, true, true, true, true, true]
    });
  };
  // 只显示本学校
  onSelfCheckChange = e => {
    const { dispatch, DataState } = this.props;

    let SelfParam = "&isFromOurSchool=" + e.target.checked;
    let Url =
      "/SubjectResMgr/WebSiteMgr/GetWebsiteInfoList?TypeID=1&pageSize=8&currentIndex=1" +
      SelfParam +
      this.state.SubjectParam +
      this.state.TypeParam +
      this.state.PeriodParam;

    dispatch(actions.UpDataState.getWebsiteResourceData(Url));
    this.setState({
      checkList: [],
      checkAll: false,
      // pagination: 1,
      selfSelect: e.target.checked,
      pageParam: "&pageSize=8&currentIndex=1",
      SelfParam: SelfParam,
      ImgType: [true, true, true, true, true, true, true, true],
      ImgDefault: [true, true, true, true, true, true, true, true]
    });
  };
  // 添加网站
  onAddWebsiteClick = e => {
    const { dispatch, DataState, UIState } = this.props;

    dispatch(
      actions.UpDataState.setInitWebsiteData({
        WebType: DataState.GetMenuData.TypeList[1],
        Subject: DataState.GetMenuData.SubjectList[1],
        Period: DataState.GetMenuData.PeriodList[1],
        PeriodID: [DataState.GetMenuData.PeriodList[1].value]
      })
    );
    dispatch({ type: actions.UpUIState.ADD_MODAL_OPEN });
  };
  // 多选change
  onCheckBoxGroupChange = e => {
    this.setState({
      checkList: e,
      checkAll: e.length === this.state.plainOption.length ? true : false
    });
  };

  // 全选
  onCheckAllChange = e => {
    this.setState({
      checkAll: e.target.checked,
      checkList: e.target.checked ? this.state.plainOption : []
    });
  };
  // 分页
  onPagiNationChange = page => {
    const { dispatch, DataState } = this.props;

    let pageParam = "&pageSize=8&currentIndex=" + page;
    let Url =
      "/SubjectResMgr/WebSiteMgr/GetWebsiteInfoList?TypeID=1" +
      pageParam +
      this.state.SelfParam +
      this.state.SubjectParam +
      this.state.TypeParam +
      this.state.PeriodParam;

    dispatch(actions.UpDataState.getWebsiteResourceData(Url));
    this.setState({
      checkList: [],
      checkAll: false,
      // pagination: page,
      pageParam: pageParam,
      ImgType: [true, true, true, true, true, true, true, true],
      ImgDefault: [true, true, true, true, true, true, true, true]
    });
  };
  // 图片加载失败
  onImgError = key => {
    let ImgType = this.state.ImgType;
    let ImgDefault = this.state.ImgDefault;
    ImgType[key] = false;
    ImgDefault[key] = false;
    // console.log('error-'+ImgType[key],ImgType,key)
    this.setState({
      ImgType: ImgType,
      ImgDefault: ImgDefault
    });
  };
  // 图片加载成功
  onImgSuccess = key => {
    let ImgType = this.state.ImgType;
    let ImgDefault = this.state.ImgDefault;
    ImgType[key] = true;
    // console.log('success-'+ImgType[key],ImgType,key)
    ImgDefault[key] = false;
    this.setState({
      ImgType: ImgType,
      ImgDefault: ImgDefault
    });
  };

  // 删除全部
  onDeleteAllClick = () => {
    const { dispatch, DataState } = this.props;
    let checkList = this.state.checkList;
    if (checkList.length === 0) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-warn",
          title: "您还没有选择",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this)
        })
      );
      return;
    }
    let List = DataState.GetWebsiteResourceData.List;
    let ListSelect = [];
    checkList instanceof Array &&
      checkList.map((child, index) => {
        if (List[child]) {
          ListSelect.push(List[child].ID);
        }
      });
    let WebsiteIds = ListSelect.join();
    dispatch(
      actions.UpUIState.showErrorAlert({
        type: "btn-query",
        title: "您确定删除吗？",
        ok: this.onDeleteOK.bind(this, WebsiteIds),
        cancel: this.onAppAlertCancel.bind(this),
        close: this.onAppAlertClose.bind(this)
      })
    );
  };
  //自动关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  //提示弹窗
  onAppAlertOK() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  onAppAlertCancel() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  onAppAlertClose() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  // 编辑
  onEditClick = (e, index) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    console.log(index);
    const { dispatch, DataState } = this.props;
    dispatch(
      actions.UpDataState.setInitWebsiteData({
        WebName: DataState.GetWebsiteResourceData.List[index].Name,
        WebAddress: DataState.GetWebsiteResourceData.List[index].Url,
        WebType: {
          value: DataState.GetWebsiteResourceData.List[index].SubTypeId,
          title: DataState.GetWebsiteResourceData.List[index].SubTypeNamefield
        },
        Subject: {
          value: DataState.GetWebsiteResourceData.List[index].SubjectId,
          title: DataState.GetWebsiteResourceData.List[index].SubjectName
        },
        // Period:{value:DataState.GetWebsiteResourceData.List[index].PeriodId,title:DataState.GetWebsiteResourceData.List[index].PeriodName},
        PeriodID: this.EditPeriod(
          DataState.GetWebsiteResourceData.List[index].Period
        ),
        WebsiteId: DataState.GetWebsiteResourceData.List[index].ID
      })
    );
    dispatch({ type: actions.UpUIState.EDIT_MODAL_OPEN });
  };

  // 处理学段
  EditPeriod = Period => {
    let PeriodID = [];
    switch (Period) {
      case 1:
        PeriodID = [1];
        break;
      case 2:
        PeriodID = [2];
        break;
      case 3:
        PeriodID = [1, 2];
        break;
      case 4:
        PeriodID = [4];
        break;
      case 5:
        PeriodID = [1, 4];
        break;
      case 6:
        PeriodID = [2, 4];
        break;
      case 7:
        PeriodID = [1, 2, 4];
        break;
      default:
        PeriodID = [];
        break;
    }
    return PeriodID;
  };
  // 删除
  onDeleteClick = (e, index) => {
    console.log(index);
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const { dispatch, DataState } = this.props;
    let List = DataState.GetWebsiteResourceData.List;

    let WebsiteIds = List[index].ID;
    dispatch(
      actions.UpUIState.showErrorAlert({
        type: "btn-query",
        title: "您确定删除吗？",
        ok: this.onDeleteOK.bind(this, WebsiteIds),
        cancel: this.onAppAlertCancel.bind(this),
        close: this.onAppAlertClose.bind(this)
      })
    );
  };
  // 确认删除
  onDeleteOK = WebsiteIds => {
    const { dispatch, DataState } = this.props;
    let pageParam = "&pageSize=8&currentIndex="+this.state.pagination;

    let url = "/SubjectResMgr/WebSiteMgr/DeleteMultiWebsites";
    let Url =
      "/SubjectResMgr/WebSiteMgr/GetWebsiteInfoList?TypeID=1" +
      pageParam +
      this.state.SelfParam +
      this.state.SubjectParam +
      this.state.TypeParam +
      this.state.PeriodParam;

    postData(
      CONFIG.WebsiteProxy + url,
      {
        WebsiteIds: WebsiteIds
      },
      2
    )
      .then(res => res.json())
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "操作成功",
              onHide: this.onAlertWarnHide.bind(this)
            })
          );
          dispatch(actions.UpDataState.getWebsiteResourceData(Url));
          this.setState({
            checkList: [],
            checkAll: false,
            // pagination: 1,
            pageParam: "&pageSize=8&currentIndex="+this.state.pagination,
            ImgType: [true, true, true, true, true, true, true, true],
            ImgDefault: [true, true, true, true, true, true, true, true]
          });
        }
      });
  };
  // 添加弹窗成功-关闭
  AddModalOk = () => {
    const { dispatch, DataState, UIState } = this.props;
    const { WebName, WebAddress, Subject, WebType } = DataState.WebsiteData;
    let Url =
      "/SubjectResMgr/WebSiteMgr/GetWebsiteInfoList?TypeID=1&pageSize=8&currentIndex="+this.state.pagination +
      this.state.SubjectParam +
      this.state.PeriodParam +
      this.state.SelfParam +
      this.state.TypeParam;

    let WebsiteData = DataState.WebsiteData;
    let TeacherTipsVisible = UIState.AppTipsVisible;
    let isHaveFalse = false;
    let url = "/SubjectResMgr/WebSiteMgr/AddWebsiteInfo";
    if (WebName === "") {
      isHaveFalse = true;
      dispatch(actions.UpUIState.AppTipsVisible({ WebNameTipsVisible: true }));
    }

    if (WebAddress === "") {
      isHaveFalse = true;
      dispatch(
        actions.UpUIState.AppTipsVisible({
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
      CONFIG.CustomProxy + url,
      {
        SchoolID: this.state.UserMsg.SchoolID,
        CreatorID: this.state.UserMsg.UserID,
        Name: WebsiteData.WebName,
        Url: WebsiteData.WebAddress,
        SubTypeID: WebsiteData.WebType.value,
        Type: 1,
        SubjectIDs: WebsiteData.Subject.value,
        Period: Period
      },
      2
    )
      .then(data => data.json())
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch(
            actions.UpUIState.AppTipsVisible({
              WebAddressTipsVisible: false,
              WebNameTipsVisible: false
            })
          );
          this.setState({
            checkList: [],
            checkAll: false,
            // pagination: 1,
            pageParam: "&pageSize=8&currentIndex="+this.state.pagination,
            ImgType: [true, true, true, true, true, true, true, true],
            ImgDefault: [true, true, true, true, true, true, true, true]
          });
          dispatch(actions.UpDataState.setInitWebsiteData({}));
          dispatch({ type: actions.UpUIState.ADD_MODAL_CLOSE });
          dispatch(actions.UpDataState.getWebsiteResourceData(Url));
        }
      });
    // dispatch({ type: actions.UpUIState.ADD_MODAL_CLOSE });
    // dispatch(
    //   actions.UpUIState.AppTipsVisible({
    //     WebNameTipsVisible: false,
    //     WebAddressTipsVisible: false
    //   })
    // );

    // dispatch(actions.UpDataState.setInitWebsiteData({}));
  };

  // 添加弹窗关闭
  AddModalCancel = () => {
    const { dispatch, DataState } = this.props;
    dispatch({ type: actions.UpUIState.ADD_MODAL_CLOSE });
    dispatch(
      actions.UpUIState.AppTipsVisible({
        WebNameTipsVisible: false,
        WebAddressTipsVisible: false
      })
    );
    dispatch(actions.UpDataState.setInitWebsiteData({}));
  };

  // 编辑弹窗成功-关闭
  EditModalOk = () => {
    const { dispatch, DataState, UIState } = this.props;
    const { WebName, WebAddress, Subject, WebType } = DataState.WebsiteData;
    let Url =
      "/SubjectResMgr/WebSiteMgr/GetWebsiteInfoList?TypeID=1&pageSize=8&currentIndex="+this.state.pagination +
      this.state.SubjectParam +
      this.state.PeriodParam +
      this.state.SelfParam +
      this.state.TypeParam;

    let WebsiteData = DataState.WebsiteData;
    let TeacherTipsVisible = UIState.AppTipsVisible;
    let isHaveFalse = false;
    let url = "/SubjectResMgr/WebSiteMgr/EditWebsiteInfo";
    if (WebName === "") {
      isHaveFalse = true;
      dispatch(actions.UpUIState.AppTipsVisible({ WebNameTipsVisible: true }));
    }

    if (WebAddress === "") {
      isHaveFalse = true;
      dispatch(
        actions.UpUIState.AppTipsVisible({
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
      CONFIG.CustomProxy + url,
      {
        SchoolID: this.state.UserMsg.SchoolID,
        WebsiteId: WebsiteData.WebsiteId,
        Name: WebsiteData.WebName,
        Url: WebsiteData.WebAddress,
        SubTypeID: WebsiteData.WebType.value,

        SubjectIDs: Subject.value ? Subject.value : "",
        Period: Period
      },
      2
    )
      .then(data => data.json())
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch(
            actions.UpUIState.AppTipsVisible({
              WebAddressTipsVisible: false,
              WebNameTipsVisible: false
            })
          );
          this.setState({
            checkList: [],
            checkAll: false,
            // pagination: 1,
            pageParam: "&pageSize=8&currentIndex="+this.state.pagination,
            ImgType: [true, true, true, true, true, true, true, true],
            ImgDefault: [true, true, true, true, true, true, true, true]
          });
          dispatch(actions.UpDataState.setInitWebsiteData({}));
          dispatch({ type: actions.UpUIState.EDIT_MODAL_CLOSE });

          dispatch(actions.UpDataState.getWebsiteResourceData(Url));
        }
      });
    // dispatch({ type: actions.UpUIState.EDIT_MODAL_CLOSE });
    // dispatch(
    //   actions.UpUIState.AppTipsVisible({
    //     WebNameTipsVisible: false,
    //     WebAddressTipsVisible: false
    //   })
    // );
    // dispatch(actions.UpDataState.setInitWebsiteData({}));
  };

  // 编辑弹窗关闭
  EditModalCancel = () => {
    const { dispatch, DataState } = this.props;
    dispatch({ type: actions.UpUIState.EDIT_MODAL_CLOSE });
    dispatch(
      actions.UpUIState.AppTipsVisible({
        WebNameTipsVisible: false,
        WebAddressTipsVisible: false
      })
    );
    dispatch(actions.UpDataState.setInitWebsiteData({}));
  };
  // 卡点击
  onContentCardClick = url => {
    window.open(url);
  };
  // 复选
  onCheckBoxClick = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  render() {
    const { DataState, UIState } = this.props;
    let { List, Total, Current } = DataState.GetWebsiteResourceData;
    let TypeList = DataState.GetMenuData.TypeList;
    let PeriodList = DataState.GetMenuData.PeriodList;
    let SubjectList = DataState.GetMenuData.SubjectList;
    return (
      <div id="Main" className="Main">
        <div className="Main-top">
          <div className="top-box top-left period-box">
            <span className="box-tips">学段:</span>
            <DropDown
              ref="period-DropMenu"
              className="box-dropmenu period-dropmenu"
              onChange={this.PeriodDropMenu.bind(this)}
              width={108}
              height={240}
              dropSelectd={this.state.PeriodSelect}
              dropList={PeriodList}
            ></DropDown>
          </div>
          <div className="top-box top-left subject-box">
            <span className="box-tips">学科:</span>
            <DropDown
              ref="subject-DropMenu"
              className="box-dropmenu subject-dropmenu"
              onChange={this.SubjectDropMenu.bind(this)}
              width={108}
              height={240}
              dropSelectd={this.state.SubjectSelect}
              dropList={SubjectList}
            ></DropDown>
          </div>
          <div className="top-box top-left type-box">
            <span className="box-tips">分类:</span>
            <DropDown
              ref="type-DropMenu"
              className="box-dropmenu type-dropmenu"
              onChange={this.TypeDropMenu.bind(this)}
              width={108}
              height={240}
              dropSelectd={this.state.TypeSelect}
              dropList={TypeList}
            ></DropDown>
          </div>
          <div className="top-box top-left self-box">
            <CheckBox
              type="gray"
              checked={this.state.selfSelect}
              onChange={this.onSelfCheckChange.bind(this)}
              value={"self"}
            >
              只显示本学校添加的
            </CheckBox>
          </div>
          <div
            onClick={this.onAddWebsiteClick.bind(this)}
            className="top-box top-right btn-box"
          >
            <i className="btn-icon-add"></i>
            <span className="btn-title">添加网站</span>
          </div>
        </div>
        <div className="Main-hr"></div>
        <div className="Main-content">
          {List instanceof Array && List.length > 0 ? (
            <CheckBoxGroup
              value={this.state.checkList}
              onChange={this.onCheckBoxGroupChange.bind(this)}
            >
              {List.map((child, index) => {
                return (
                  <div
                    key={index}
                    className="content-card"
                    onClick={this.onContentCardClick.bind(this, child.Url)}
                  >
                    <div className="card-left">
                      <CheckBox
                        onClick={e => this.onCheckBoxClick(e)}
                        type="gray"
                        value={index}
                      ></CheckBox>
                      {this.state.ImgType[index] ? (
                        <div
                          className={`img-box ${
                            !this.state.ImgDefault[index]
                              ? "ImgError_" + child.TypeColor
                              : ""
                          }`}
                        >
                          <img
                            style={{
                              display: !this.state.ImgDefault[index]
                                ? "inline-block"
                                : "none"
                            }}
                            className={`left-img `}
                            onError={this.onImgError.bind(this, index)}
                            onLoad={this.onImgSuccess.bind(this, index)}
                            src={child.ImgUrl}
                            alt={child.ImgUrl}
                          ></img>
                          <img
                            // className={`left-img `}
                            style={{
                              display: this.state.ImgDefault[index]
                                ? "inline-block"
                                : "none"
                            }}
                            width={42}
                            height={42}
                            src={ImgDefault}
                            alt={"默认"}
                          ></img>
                        </div>
                      ) : (
                        <span
                          className={`ImgError ${"ImgError_" +
                            child.TypeColor}`}
                        >
                          {child.Name.slice(0, 1)}
                        </span>
                      )}
                    </div>
                    <div className="card-rigth">
                      <p
                        title={child.Name}
                        className="rigth-content webName-content "
                      >
                        <span className="webName">{child.Name}</span>
                        <span
                          title={child.SubTypeNamefield}
                          className={`WebType ${"WebType_" + child.TypeColor}`}
                        >
                          {child.SubTypeNamefield}
                        </span>
                      </p>
                      <p
                        title={child.SubjectName}
                        className="rigth-content webSubject"
                      >
                        {"学科：" + child.SubjectName}
                      </p>
                      <p
                        // target="_blank"
                        // href={child.Url}
                        title={child.Url}
                        className="rigth-content webUrl"
                      >
                        {child.Url}
                      </p>
                    </div>
                    <div className="Edit-content">
                      <span
                        onClick={e => this.onDeleteClick(e, index)}
                        className="card-btn btn-delete"
                      ></span>
                      <span
                        onClick={e => this.onEditClick(e, index)}
                        className="card-btn btn-edit"
                      ></span>
                    </div>
                  </div>
                );
              })}
            </CheckBoxGroup>
          ) : (
            <Empty
              type="4"
              className="Empty"
              title={this.state.PeriodSelect.value!==0||this.state.SubjectSelect.value!==0||this.state.TypeSelect.value!==0?"暂无符合条件的网站资源":"暂无网站资源"}
            ></Empty>
          )}
        </div>
        <div style={{display:List instanceof Array && List.length > 0 ?'block':'none'}} className="Main-hr-2"></div>
        <div className="Main-event-box">
          {List instanceof Array && List.length > 0 ? (
            <div>
              <CheckBox
                type="gray"
                className="checkBox-All"
                checked={this.state.checkAll}
                onChange={this.onCheckAllChange.bind(this)}
              >
                全选
              </CheckBox>
              <div
                onClick={this.onDeleteAllClick.bind(this)}
                className="btn-delete-All"
              >
                批量删除
              </div>
            </div>
          ) : (
            ""
          )}
          <PagiNation
            className="pagination"
            showQuickJumper
            current={this.state.pagination}
            hideOnSinglepage={true}
            pageSize={8}
            total={Total}
            onChange={this.onPagiNationChange.bind(this)}
          ></PagiNation>
        </div>
        {/* 模态框 */}
        <Modal
          ref="AddMadal"
          bodyStyle={{ padding: 0, height: 245 + "px" }}
          type="1"
          title={"添加网站"}
          width={585}
          visible={UIState.AppModal.AddModal}
          destroyOnClose={true}
          onOk={this.AddModalOk}
          onCancel={this.AddModalCancel}
        >
          <Loading spinning={UIState.AppLoading.modalLoading}>
            {UIState.AppModal.AddModal ? <WebsiteCustom></WebsiteCustom> : ""}
          </Loading>
        </Modal>
        <Modal
          ref="EditMadal"
          bodyStyle={{ padding: 0, height: 245 + "px" }}
          type="1"
          title={"修改网站"}
          width={585}
          destroyOnClose={true}
          visible={UIState.AppModal.EditModal}
          onOk={this.EditModalOk}
          onCancel={this.EditModalCancel}
        >
          <Loading spinning={UIState.AppLoading.modalLoading}>
            {UIState.AppModal.EditModal ? <WebsiteCustom></WebsiteCustom> : ""}
          </Loading>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState
  };
};
export default connect(mapStateToProps)(Main);
