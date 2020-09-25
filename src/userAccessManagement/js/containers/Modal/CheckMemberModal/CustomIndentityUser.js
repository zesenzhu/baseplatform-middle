/*
 *
 *    ┏┓　　　┏┓
 *  ┏┛┻━━━┛┻┓
 *  ┃　　　　　　　┃
 *  ┃　　　━　　　┃
 *  ┃　＞　　　＜　┃
 *  ┃　　　　　　　┃
 *  ┃...　⌒　...　┃
 *  ┃　　　　　　　┃
 *  ┗━┓　　　┏━┛
 *      ┃　　　┃
 *      ┃　　　┃
 *      ┃　　　┃
 *      ┃　　　┃  神兽保佑
 *      ┃　　　┃  代码无bug
 *      ┃　　　┃
 *      ┃　　　┗━━━┓
 *      ┃　　　　　　　┣┓
 *      ┃　　　　　　　┏┛
 *      ┗┓┓┏━┳┓┏┛
 *        ┃┫┫　┃┫┫
 *        ┗┻┛　┗┻┛
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-09-21 15:31:20
 * @LastEditTime: 2020-09-25 09:49:42
 * @Description:编辑成员和查看成员共用
 * @FilePath: \baseplatform-middle\src\userAccessManagement\js\containers\Modal\CheckMemberModal\CustomIndentityUser.js
 */

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
import Tag from "../../../component/Tag";
import { HandleAction, DataAction, PublicAction } from "../../../actions";
import Public from "../../../../../common/js/public";
import Scrollbars from "react-custom-scrollbars";
// import Table from "../../component/Table";
let { getQueryVariable, setRole, ArrayNoRepeat } = Public;
// const { HandleAction, DataAction, PublicAction } = actions;
class CustomIndentityUser extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }
  onEditMemberClick = () => {
    let {
      dispatch,
      HandleState: {
        ParamsData: {
          CheckMember: { IdentityCode, IdentityName, UserType, IdentityID },
        },
        CommonData: { RoleList },
      },
      DataState: {
        GetData: { IdentityUser },
      },
    } = this.props;
    let SelectRole = "";
    if (UserType instanceof Array && UserType.length === 1) {
      //一个的时候直接默认打开

      RoleList instanceof Array &&
        RoleList.map((child, index) => {
          if (UserType.map((value) => parseInt(value)).includes(child.value)) {
            SelectRole = child.code;
          }
        });
        if (SelectRole === "admin") {
          dispatch(DataAction.GetUser({ SelectRole, NodeID: "" }));
        } else {
          dispatch(DataAction.GetTree({ SelectRole }));
        }
    }
    
    dispatch(
      HandleAction.ParamsSetAddMember({
        IdentityCode,
        IdentityName,
        UserType,
        IdentityID,
        MemberList: [],
        // IdentityUser.List.map((chil)=>{
        //   return {NodeID:child.UserID,NodeName:child.UserName,LastTreeNode}
        // })
        SelectRole: SelectRole,
        NodeID: "",
        NodeType: "tree",
        LayoutType: "type",
        List: [],
      })
    );

    dispatch(HandleAction.SetModalVisible({ AddMemberModalVisible: true }));
  };
  onTagCancel = (data) => {
    let {
      HandleState: {
        ParamsData: {
          CheckMember: {
            PageSize,
            UserType,
            IdentityName,
            Description,
            IdentityCode,
            type, //add,edit
          },
        },
      },
      dispatch,
    } = this.props;
    let { UserID } = data;
    if (type === "edit") {
      dispatch(DataAction.DeleteIdentityUser({ UserID }));
    }
  };
  render() {
    const {
      HandleState: {
        ParamsData: {
          CheckMember: {
            PageSize,
            UserType,
            IdentityName,
            Description,
            IdentityCode,
            type, //add,edit
          },
        },
        CommonData: { RoleList },
        ControlData: {
          ModalVisible: { CustomIndentityUserVisible },
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
        <div className="row">
          <span className="left">身份类型:</span>
          <span className="right">
            <span title={IdentityName} className="IdentityName">
              {IdentityName ? IdentityName : "--"}
            </span>
            <span title={Description} className="Description">
              ({Description ? Description : "--"})
            </span>
          </span>
        </div>
        <div className="row">
          <span className="left">账号类型:</span>
          <span className="right UserTypeName">
            {UserTypeName.length > 0 ? UserTypeName.join("、") : "--"}
          </span>
        </div>
        <div className="row row-member">
          <span className="left">当前成员:</span>
          <span className="right">
            <div className="Member-box">
              <Scrollbars>
                {List instanceof Array && List.length > 0 ? (
                  List.map((child, index) => {
                    return (
                      <Tag
                        key={index}
                        id={child.UserID}
                        type={type}
                        onCancel={this.onTagCancel.bind(this, child)}
                        name={child.UserName}
                      ></Tag>
                    );
                  })
                ) : (
                  <Empty
                    type="4"
                    style={{ marginTop: "30px" }}
                    title={"当前暂无成员"}
                  ></Empty>
                )}
              </Scrollbars>
              {IdentityCode !== 1 && IdentityCode !== 2 ? (
                <div className="Handle-box">
                  <span className="Total">
                    共<span className="count">{Total}</span>人
                  </span>
                  <span
                    onClick={this.onEditMemberClick}
                    className="edit-member"
                  >
                    添加成员
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
          </span>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
export default connect(mapStateToProps)(CustomIndentityUser);
