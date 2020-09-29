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
  Tips,
  DetailsModal,
  Table,
  CheckBox,
  CheckBoxGroup,
  PagiNation,
} from "../../../../../common";
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
import history from "../../../config/history";
//import TimeBanner from '../component/TimeBanner'
import CONFIG from "../../../../../common/js/config";

import { HandleAction, DataAction, PublicAction } from "../../../actions";
import Public from "../../../../../common/js/public";
import Scrollbars from "react-custom-scrollbars";
import Columns from "./Columns";
// import Table from "../../component/Table";
let { getQueryVariable, setRole, ArrayNoRepeat } = Public;
// const { HandleAction, DataAction, PublicAction } = actions;

class DefaultIndentityUser extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }
  //   修改columns
  UpdataColumns = () => {};
  onPagiNationChange = (value) => {
    let { dispatch } = this.props;
    dispatch(
      HandleAction.ParamsSetCheckMember({
        PageIndex: value,
      })
    );
    dispatch(DataAction.GetIdentityUser({}));
  };
  render() {
    const {
      HandleState: {
        ParamsData: {
          CheckMember: {
            PageSize,
            UserType,
            IdentityName,
            IdentityCode,
            type, //add,edit
          },
        },
        CommonData: { RoleList },
        ControlData: {
          ModalVisible: { DefaultIndentityUserVisible },
        },
      },
      DataState: {
        GetData: {
          IdentityUser: { PageIndex, Total, List },
        },
      },
      PublicState: {
        Loading: { AppLoading, ContentLoading, ModalLoading, MoreLoadingClose },
      },
    } = this.props;
    let title_1 = "姓名";
    let title_2 = "工号";
    let title_3 = "所管班级";
    let TopComponent = <></>;

    if (IdentityCode === "IC0009") {
      //院系管理员
      title_3 = "所管院系";
      TopComponent = (
        <p className="TopComponent CollegeAdmin">
          共<span className="count">{Total}</span>名院系管理员
        </p>
      );
    } else if (IdentityCode === "IC0011") {
      //任课教师
      title_3 = "所教班级";
      TopComponent = (
        <p className="TopComponent Teacher">
          共<span className="count">{Total}</span>
          名任课教师，如需要管理教师可前往
          <span
            onClick={() => {
              window.open("/html/admArchives#/UserArchives/Teacher/all");
            }}
            className="to"
          >
            教师档案管理
          </span>
          进行管理，如需要调整教师所教班级可前往
          <span
            onClick={() => {
              window.open("/html/CoureClass#/manage");
            }}
            className="to"
          >
            教学班管理
          </span>{" "}
          进行管理。
        </p>
      );
    } else if (IdentityCode === "IC0012") {
      //班主任
      title_3 = "所管班级";
      TopComponent = (
        <p className="TopComponent MainTeacher">
          共<span className="count">{Total}</span>
          班主任，如需要管理班主任可前往
          <span
            onClick={() => {
              window.open("/html/admclass#/Grade");
            }}
            className="to"
          >
            年级班级管理
          </span>
          进行管理
        </p>
      );
    } else if (IdentityCode === "IC0013") {
      //教研组长
      title_3 = "所管学科";
      TopComponent = (
        <p className="TopComponent HeadOfTeacher">
          共<span className="count">{Total}</span>
          学科教研组长，如需要调整学科教研组长可前往
          <span
            onClick={() => {
              window.open("/html/admSubject");
            }}
            className="to"
          >
            学科管理
          </span>
          进行管理
        </p>
      );
      Columns[2].render = (data) => {
        let { Content } = data;
        if (Content instanceof Array) {
          return (
            <span title={Content.join("；")} className="Content">
              {Content.length > 0 ? Content.join("；") : "--"}
            </span>
          );
        } else {
          return <span className="Content">--</span>;
        }
      };
    } else if (IdentityCode === "IC0014") {
      //学生
      title_3 = "所在班级";
      title_2 = "学号";
      TopComponent = (
        <p className="TopComponent Student">
          共<span className="count">{Total}</span>
          名学生，如需要管理学生可前往
          <span
            onClick={() => {
              window.open("/html/admArchives#/UserArchives/Student/all");
            }}
            className="to"
          >
            学生档案管理
          </span>
          进行管理
        </p>
      );
    } else if (IdentityCode === "IC0015") {
      //家长
      title_3 = "子女班级";
      title_2 = "编号";

      TopComponent = (
        <p className="TopComponent Parents">
          共<span className="count">{Total}</span>
          名家长
        </p>
      );
    }
    Columns[0].title = title_1;
    Columns[1].title = title_2;
    Columns[2].title = title_3;
    let UserTypeName = [];
    UserType instanceof Array &&
      RoleList instanceof Array &&
      UserType.length > 0 &&
      RoleList.map((child, index) => {
        if (UserType.map((value) => parseInt(value)).includes(child.value)) {
          UserTypeName.push(child.title);
        }
      });

    return (
      <>
        {TopComponent}
        {List instanceof Array ? (
          <>
            <Table
              className="table"
              //   bordered={true}
              columns={Columns}
              loading={MoreLoadingClose}
              pagination={false}
              dataSource={List}
            ></Table>
            <PagiNation
            className='pagenation'
              showQuickJumper
              pageSize={PageSize}
              current={PageIndex}
              hideOnSinglePage={true}
              total={Total}
              onChange={this.onPagiNationChange}
            ></PagiNation>
          </>
        ) : (
          ""
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
export default connect(mapStateToProps)(DefaultIndentityUser);
