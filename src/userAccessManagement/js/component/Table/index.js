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
  //1
  ImgRender = (data) => {
    let { IdentityCode, IconUrl } = data; //IC0002

    return (
      <div className="Img-Box">
        <i className={`IB-bg`}>
          <span
            className="IB-tilte"
            style={{
              width: "74px",
              height: "16px",
              background: `url(${ IconUrl}) no-repeat center center / contain`,
            }}
          ></span>
        </i>
      </div>
    );
  };
  SetColumns = () => {
    columns[0].render = this.ImgRender;
    return columns
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
