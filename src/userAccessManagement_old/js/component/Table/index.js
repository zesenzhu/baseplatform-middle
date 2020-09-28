import React, { Component } from "react";
import {
  Menu,
  Loading,
  Alert,
  Modal,
  // Frame,
  Button,
  Empty,
  Search,
  DetailsModal,
  Table,
} from "../../../../common";
import { connect } from "react-redux";
import { Modal as AntdModal, Input } from "antd";
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  // IndexRedirect ,
  BrowserRouter,
} from "react-router-dom";
import { IndexRedirect } from "react-router";
import history from "../../config/history";
//import TimeBanner from '../component/TimeBanner'
import CONFIG from "../../../../common/js/config";
import {
  TokenCheck_Connect,
  TokenCheck,
  getUserInfo,
} from "../../../../common/js/disconnect";
import "./index.scss";
import { HandleAction, DataAction, PublicAction } from "../../actions";
import Public from "../../../../common/js/public";
import Scrollbars from "react-custom-scrollbars";
import columns from "./columns";
import Reload from "../Reload";
import $ from "jquery";
import clamp from "clamp-js";

let { getQueryVariable, setRole } = Public;
// const { HandleAction, DataAction, PublicAction } = actions;
class TableRender extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    let { module: Module } = nextProps;
    let wrapText = $(".Module-Box");
    wrapText.each(function (index, element) {
      clamp(element, { clamp: 2 });
    });
  }
  //1:图片和标签
  ImgRender = (data) => {
    let { IdentityCode, IdentityName, IconUrl, UserType } = data; //IC0002
    let className = "";
    if (IdentityCode.includes("IC0010")) {
      //领导是最特别的
      className = "leader";
    } else if (UserType.includes("0")) {
      //包括0就是管理员，级别最高
      //前九个都是默认的管理员，后面再加
      className = "admin";
    } else if (UserType.includes("1")) {
      //教师
      //前九个都是默认的管理员，后面再加
      className = "teacher";
    } else if (UserType.includes("2")) {
      //学生
      //前九个都是默认的管理员，后面再加
      className = "student";
    } else if (UserType.includes("3")) {
      //家长
      //前九个都是默认的管理员，后面再加
      className = "parent";
    }
    let isCustom = false; //是否是自定义身份
    if (IdentityCode.includes("IC1")) {
      isCustom = true;
    }
    return (
      <div className="Img-Box">
        <i className={`IB-bg ${"IB-" + className}`}>
          <span
            className="IB-tilte"
            style={{
              background: `url(${IconUrl}) no-repeat center center / contain`,
            }}
          >
            {isCustom ? IdentityName : ""}
          </span>
        </i>
      </div>
    );
  };
  //2：身份类型
  IdentityRender = (data) => {
    let { IdentityName, Description } = data; //IC0002

    return (
      <div className="Identity-Box">
        <p className="IB-Name" title={IdentityName}>
          {IdentityName ? IdentityName : "--"}
        </p>
        <p className="IB-Description" title={Description}>
          {Description ? Description : "--"}
        </p>
      </div>
    );
  };
  //3:账号类型
  UserTypeRender = (data) => {
    let { UserType, Description } = data; //IC0002
    let {
      HandleState: {
        CommonData: { RoleList },
      },
    } = this.props;
    UserType = UserType.split(",").map((child) => parseInt(child));
    // UserType=[0,1,2,3]
    return (
      <div className="UserType-Box">
        {UserType.map((child, index) => {
          return RoleList[child] ? (
            <span className="UB-Bar" title={RoleList[child].title} key={index}>
              {RoleList[child].title}
            </span>
          ) : (
            ""
          );
        })}
      </div>
    );
  };
  //4：身份权限
  ModuleRender = (data) => {
    let { ModuleNames, ModuleIDs } = data; //IC0002

    return (
      <p title={ModuleNames} className=" Module-Box">
        {ModuleNames ? ModuleNames : "--"}
      </p>
    );
  };
  //5：	成员人数

  UserCountRender = (data) => {
    let { UserCount, ModuleIDs, IdentityCode, IdentityLevel } = data; //IC0001为学校管理员，不能点击

    return (
      <p
        title={UserCount}
        onClick={this.onCheckMemberClick.bind(this, data)}
        className={` UserCount-Box  ${
          IdentityCode === "IC0001" || IdentityLevel === 1 ? "unClick" : ""
        }`}
      >
        {UserCount || UserCount === 0 ? UserCount : "--"}
      </p>
    );
  };
  //6：	操作

  HandleRender = (data) => {
    let { IdentityLevel, ModuleIDs } = data; //IC0002
    //1：表示不允许任何操作（如系统超管），
    //2：表示仅允许编辑权限（如院系管理员、任课教师）
    //3：表示允许编辑权限、编辑成员（如教务管理员）
    //4：表示自定义身份
    return (
      <div className={` Handle-Box ${IdentityLevel === 1 ? "null" : ""}`}>
        {IdentityLevel !== 1 ? (
          <>
            {IdentityLevel === 4 ? (
              <>
                <span
                  onClick={this.onEditIdentityClick.bind(this, data)}
                  className="handle-btn edit-identity"
                >
                  编辑身份
                </span>
                <span
                  onClick={this.onDeleteIdentityClick.bind(this, data)}
                  className="handle-btn delete-identity"
                >
                  删除身份
                </span>
              </>
            ) : (
              ""
            )}
            {IdentityLevel !== 2 ? (
              <span onClick={this.onEditMemberClick.bind(this, data)} className="handle-btn edit-member">编辑成员</span>
            ) : (
              ""
            )}

            <span
              onClick={this.onEditPowerClick.bind(this, data)}
              className="handle-btn edit-power"
            >
              编辑权限
            </span>
          </>
        ) : (
          "--"
        )}
      </div>
    );
  };
  // 编辑成员
  onEditMemberClick= (data) => {
    let {
      dispatch,
      HandleState: {
        CommonData: { DefaultIdentity },
      },
    } = this.props;

    let {
      IdentityLevel,
      ModuleIDs,
      IdentityID,
      IdentityCode,
      IdentityName,
      UserType,
      Description,
    } = data; //IC0001为学校管理员，不能点击
    if (IdentityCode === "IC0001") {
      return;
    }
    let PageIndex = 0;
    let type = "edit";
    
    dispatch(PublicAction.ModalLoadingOpen());
    dispatch(
      HandleAction.ParamsSetCheckMember({
        IdentityCode,
        IdentityName,
        UserType:UserType.split(','),
        IdentityID,
        Description,
        PageIndex: PageIndex,
        PageSize: 8,
        type, //add,edit
      })
    );
    dispatch(
      DataAction.GetIdentityUser({
        fn: () => {
          dispatch(PublicAction.ModalLoadingClose());
        },
      })
    );
    dispatch(HandleAction.SetModalVisible({ CheckMemberModalVisible: true }));
  };
  // 查看成员
  onCheckMemberClick = (data) => {
    let {
      dispatch,
      HandleState: {
        CommonData: { DefaultIdentity },
      },
    } = this.props;

    let {
      IdentityLevel,
      ModuleIDs,
      IdentityID,
      IdentityCode,
      IdentityName,
      UserType,
      Description,
    } = data; //IC0001为学校管理员，不能点击
    if (IdentityCode === "IC0001") {
      return;
    }
    let PageIndex = 0;
    let type = "custom";
    if (IdentityLevel === 1 || IdentityLevel === 2) {
      //不允许编辑成员的
      DefaultIdentity.forEach((child) => {
        if (child.value === IdentityCode) {
          //默认
          type = IdentityCode;
          PageIndex = 1;
        }
      });
      // if (DefaultIdentity.some((child) => child.value === IdentityCode)) {
      //   //默认
      //   type = IdentityCode;
      // }
    } else {
    }
    dispatch(PublicAction.ModalLoadingOpen());
    dispatch(
      HandleAction.ParamsSetCheckMember({
        IdentityCode,
        IdentityName,
        UserType:UserType.split(','),
        IdentityID,
        Description,
        PageIndex: PageIndex,
        PageSize: 8,
        type, // edit：编辑，custom：自定义的,id:表示默认的都是不确定的id
      })
    );
    dispatch(
      DataAction.GetIdentityUser({
        fn: () => {
          dispatch(PublicAction.ModalLoadingClose());
        },
      })
    );
    dispatch(HandleAction.SetModalVisible({ CheckMemberModalVisible: true }));
  };
  // 编辑权限
  onEditPowerClick = (data) => {
    let { IdentityID, IdentityName, Description, UserType, ModuleIDs } = data;
    let { dispatch } = this.props;
    dispatch(
      HandleAction.ParamsSetIdentityPower({
        ModuleIDs: typeof ModuleIDs === "string" ? ModuleIDs.split(",") : [],
        InitModuleIDs:
          typeof ModuleIDs === "string" ? ModuleIDs.split(",") : [],
        Description,
        IdentityName,
        IdentityID,
        UserType: typeof UserType === "string" ? UserType.split(",") : [],
        type: "edit", //add,edit
      })
    );
    dispatch(DataAction.GetIdentityModule({}))
    dispatch(HandleAction.SetModalVisible({ IdentityPowerModalVisible: true }));
  };
  // 删除身份，自定义
  onDeleteIdentityClick = (data) => {
    let { IdentityID, IdentityName, Description, UserType } = data;
    let { dispatch } = this.props;

    dispatch(
      PublicAction.showErrorAlert({
        type: "btn-warn",
        title: "确认删除该身份？",
        onOk: () => {
          console.log(IdentityID);
          dispatch(
            HandleAction.ParamsSetCustomIdentity({
              IdentityID,
            })
          );
          dispatch(DataAction.DeleteIdentityType({}));
          dispatch(PublicAction.hideErrorAlert());
        },
      })
    );
  };
  // 编辑身份
  onEditIdentityClick = (data) => {
    let { IdentityID, IdentityName, Description, UserType } = data;
    let { dispatch } = this.props;
    UserType = UserType.split(",").map((child) => parseInt(child));
    dispatch(
      HandleAction.ParamsSetCustomIdentity({
        IdentityName,
        Description,
        IdentityID,
        InitIdentityName: IdentityName,
        InitDescription: Description,
        InitUserType: UserType,
        UserType: UserType,
        type: "edit",
      })
    );

    dispatch(
      HandleAction.SetModalVisible({ CustomIdentityModalVisible: true })
    );
  };
  SetColumns = () => {
    columns[0].render = this.ImgRender;
    columns[1].render = this.IdentityRender;
    columns[2].render = this.UserTypeRender;
    columns[3].render = this.ModuleRender;
    columns[4].render = this.UserCountRender;
    columns[5].render = this.HandleRender;
    return columns;
  };
  render() {
    const {
      HandleState: {
        CommonData: {
          FrameData: {
            type: FrameType,
            cnname,
            enname,
            image,
            showLeftMenu,
            showBarner,
            className,
          },
        },
        ControlData: { ModalVisible },
      },
      DataState: {
        GetData: { IdentityTypeList },
      },
      PublicState: {
        Loading: { AppLoading, ContentLoading, TableLoading },
        Alert: {
          appAlert,
          title,
          type,
          littleTitle,
          onOk,
          onHide,
          onCancel,
          onClose,
        },
        LoginMsg: { UserName, PhotoPath },
      },
    } = this.props;
    // let columns =
    this.SetColumns();
    return (
      <div className="TableRender" id="TableRender">
        {IdentityTypeList instanceof Array ? (
          IdentityTypeList.length > 0 ? (
            <Table
              className="table"
              loading={TableLoading}
              columns={columns}
              pagination={false}
              dataSource={IdentityTypeList}
            ></Table>
          ) : (
            <Empty
              title={"暂无角色权限设置"}
              type="4"
              style={{ marginTop: "200px" }}
            ></Empty>
          )
        ) : IdentityTypeList === null ? (
          ""
        ) : (
          <Reload></Reload>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
export default connect(mapStateToProps)(TableRender);
