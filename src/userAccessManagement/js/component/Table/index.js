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
    this.state = {
      columns: [
        {
          title: "",
          align: "right",
          key: "Img",
          width: 96,
          colSpan: 0,
          render: (data) => {
            let { IdentityCode, IconUrl } = data; //IC0002

            return (
              <div className="Img-Box">
                <i className={`IB-bg`}>
                  <span
                    className="IB-tilte"
                    style={{
                      width: "74px",
                      height: "16px",
                      background: `url(${data.IconUrl}) no-repeat center center / contain`,
                    }}
                  ></span>
                </i>
              </div>
            );
          },
        },
        // {
        //   title: "姓名",
        //   align: "left",
        //   colSpan: 2,
        //   width: 90,
        //   key: "UserName",
        //   dataIndex: "UserName",
        //   sorter: true,
        //   render: (arr) => {
        //     return (
        //       <div className="name-content">
        //         <span
        //           title={arr.UserName}
        //           className="name-UserName"
        //           onClick={this.onUserNameClick.bind(this, arr.key)}
        //         >
        //           {arr.UserName ? arr.UserName : "--"}
        //         </span>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   title: "学号",
        //   align: "center",
        //   width: 120,
        //   dataIndex: "UserID",
        //   key: "UserID",
        //   sorter: true,
        //   render: (UserID) => {
        //     return (
        //       <span title={UserID} className="UserID">
        //         {UserID ? UserID : "--"}
        //       </span>
        //     );
        //   },
        // },
        // {
        //   title: "性别",
        //   align: "center",
        //   width: 80,
        //   dataIndex: "Gender",
        //   key: "Gender",
        //   render: (Gender) => {
        //     return (
        //       <span title={Gender} className="Gender">
        //         {Gender ? Gender : "--"}
        //       </span>
        //     );
        //   },
        // },
        // {
        //   title: "年级",
        //   align: "center",
        //   key: "GradeName",
        //   width: 110,
        //   dataIndex: "GradeName",
        //   render: (GradeName) => {
        //     return (
        //       <span title={GradeName} className="GradeName">
        //         {GradeName ? GradeName : "--"}
        //       </span>
        //     );
        //   },
        // },
        // {
        //   title: "班级",
        //   align: "center",
        //   width: 110,
        //   key: "ClassName",
        //   dataIndex: "ClassName",
        //   render: (ClassName) => {
        //     return (
        //       <span title={ClassName} className="ClassName">
        //         {ClassName ? ClassName : "--"}
        //       </span>
        //     );
        //   },
        // },
        // {
        //   title: "操作",
        //   align: "center",
        //   key: "handle",
        //   width: 232,
        //   dataIndex: "key",
        //   render: (key) => {
        //     return (
        //       <div className="handle-content">
        //         <Button
        //           color="blue"
        //           type="default"
        //           onClick={this.StudentEdit.bind(this, key)}
        //           className="handle-btn"
        //         >
        //           编辑
        //         </Button>
        //         <Button
        //           color="blue"
        //           type="default"
        //           onClick={this.StudentChange.bind(this, key)}
        //           className="check-btn"
        //         >
        //           查看变更记录
        //         </Button>
        //       </div>
        //     );
        //   },
        // },
      ],
    };
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
    let { UserCount, ModuleIDs } = data; //IC0002

    return (
      <p title={UserCount} className=" UserCount-Box">
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
      <div
        className={` Handle-Box ${IdentityLevel === 1 ? "null" : ""}`}
      >
        {IdentityLevel !== 1 ? (
          <>
          {IdentityLevel === 4 ? (
              <>
                <span className="handle-btn edit-identity">编辑身份</span>
                <span className="handle-btn delete-identity">删除身份</span>
              </>
            ) : (
              ""
            )}
            {IdentityLevel !== 2 ? (
              <span className="handle-btn edit-member">编辑成员</span>
            ) : (
              ""
            )}

            <span className="handle-btn edit-power">编辑权限</span>
            
          </>
        ) : (
          "--"
        )}
      </div>
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
