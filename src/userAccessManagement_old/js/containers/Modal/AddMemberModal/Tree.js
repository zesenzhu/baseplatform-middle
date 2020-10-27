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
import { Modal as AntdModal, Input, Collapse } from "antd";
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
// import Table from "../../component/Table";
let { getQueryVariable, setRole, ArrayNoRepeat } = Public;
// const { HandleAction, DataAction, PublicAction } = actions;
const { Panel } = Collapse;

class Tree extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }
  // 面板变化
  onPanelChange = (e) => {
    console.log(e);
    let {
      dispatch,
      HandleState: {
        ParamsData: {
          CheckMember: { type },
        },
      },
    } = this.props;

    dispatch(
      HandleAction.ParamsSetAddMember({
        SelectRole: e,
      })
    );
    if (e === "0") {
      dispatch(DataAction.GetUser({}));
    } else {
      dispatch(DataAction.GetTree({}));
    }
  };
  onCheckChange = (e) => {
    const {
      HandleState: {
        ParamsData: {
          AddMember: {
            IdentityCode,
            IdentityName,
            UserType,
            IdentityID,
            MemberList,
            SelectRole,
            NodeType,
            LayoutType,
            List,
          },
        },
      },
      DataState: {
        GetData: { IdentityUser },
      },
      dispatch,
    } = this.props;
    let noOtherList = []; //没有该结构的数组
    MemberList.forEach((member) => {
      //已选的用户列表
      if (!List.some((child) => child.NodeID === member.NodeID)) {
        //List 当前的tree列表，属于List 的member 都去掉
        noOtherList.push(member);
      }
    });
    // 更新
    List.forEach((child) => {
      //e为新选的，进行合并
      if (
        e.includes(child.NodeID) &&
        !IdentityUser.List.some((user) => user.UserID === child.NodeID) // 去掉以前就在的member
      ) {
        noOtherList.push(child);
      }
    });

    dispatch(HandleAction.ParamsSetAddMember({ MemberList: noOtherList }));
  };
  onCheckAllChange = (e) => {
    const {
      HandleState: {
        ParamsData: {
          AddMember: {
            IdentityCode,
            IdentityName,
            UserType,
            IdentityID,
            MemberList,
            SelectRole,
            NodeType,
            LayoutType,
            List,
          },
        },
      },
      DataState: {
        GetData: { IdentityUser },
      },
      dispatch,
    } = this.props;
    let UpDataList = []; //没有该结构的数组

    let isHave = true;
    if (List instanceof Array && List.length > 0) {
      List.forEach((child) => {
        if (!IdentityUser.List.some((user) => user.UserID === child.NodeID)) {
          isHave = false;
        }
      });
    } else {
      isHave = false;
    }

    if (isHave) {
      return;
    }
    MemberList.forEach((member) => {
      if (!List.some((child) => child.NodeID === member.NodeID)) {
        UpDataList.push(member);
      }
    });
    if (e.target.checked) {
      List.forEach((child) => {
        if (NodeType === "tree") {
          if (child.UserCount) UpDataList.push(child);
        } else {
          if (!IdentityUser.List.some((user) => user.UserID === child.NodeID)) {
            UpDataList.push(child);
          }
        }
      });
    }
    // console.log(UpDataList)
    dispatch(HandleAction.ParamsSetAddMember({ MemberList: UpDataList }));
  };

  // 下一级
  onNextClick = (data) => {
    let {
      dispatch,
      HandleState: {
        ParamsData: {
          AddMember: { SelectRole },
        },
        CommonData: { RoleList },
      },
    } = this.props;
    let FullID = [];
    let FullName = [];
    RoleList.forEach((child) => {
      if (child.code === SelectRole) {
        FullID.push(child.code);
        FullName.push(child.title);
      }
    });
    if (typeof data.FullID === "string") {
      let Pop = data.FullID.split(">");
      Pop.pop();
      FullID = FullID.concat(Pop);
    }

    if (typeof data.FullName === "string") {
      let Pop = data.FullName.split(">");
      Pop.pop();
      FullName = FullName.concat(Pop);
    }
    if (data.LastTreeNode) {
      dispatch(
        HandleAction.ParamsSetAddMember({
          LayoutType: "level",
          NodeID: data.NodeID,
          NodeName: data.NodeName,
          FullID: FullID,
          FullName: FullName,
        })
      );
      dispatch(DataAction.GetUser({ fn: () => {} }));
    } else if (data.UserCount) {
      dispatch(
        HandleAction.ParamsSetAddMember({
          List: data.Children,
          LayoutType: "level",
          NodeID: data.NodeID,
          NodeName: data.NodeName,
          FullID: FullID,
          FullName: FullName,
        })
      );
    }
  };
  render() {
    const {
      HandleState: {
        ParamsData: {
          AddMember: {
            IdentityCode,
            IdentityName,
            UserType,
            IdentityID,
            MemberList,
            SelectRole,
            NodeType,
            LayoutType,
            List,
          },
        },
        CommonData: { RoleList },
        ControlData: {
          ModalVisible: { TreeVisible },
        },
      },
      DataState: {
        GetData: { TreeList, UserList, IdentityUser },
      },
      PublicState: {
        Loading: { AppLoading, ContentLoading, ModalLoading, MoreLoading },
      },
      height,
    } = this.props;
    let SelectList = [];
    let AllList = []; //包括以前选的
    let checked = true;
    let oldSelect = [];
    MemberList instanceof Array &&
      MemberList.forEach((child, index) => {
        SelectList.push(child.NodeID);
        AllList.push(child);
      });
    // 加上已选的成员

    IdentityUser &&
      IdentityUser.List instanceof Array &&
      IdentityUser.List.forEach((child) => {
        SelectList.push(child.UserID);
        oldSelect.push(child.UserID);
        AllList.push({ LastTreeNode: true, NodeID: child.UserID });
      });
    if (List instanceof Array) {
      List.forEach((child) => {
        if (NodeType === "tree") {
          if (
            child.UserCount &&
            !(
              AllList instanceof Array &&
              AllList.some((member, index) => {
                return member.NodeID === child.NodeID;
              })
            )
          ) {
            checked = false;
          }
        } else {
          //最后一级
          if (
            !(
              AllList instanceof Array &&
              AllList.some((member, index) => {
                return member.NodeID === child.NodeID;
              })
            )
          ) {
            checked = false;
          }
        }
      });
    } else {
      checked = false;
    }
    let Height = height;
    if (LayoutType === "type") {
      Height = height - UserType.length * 46;
    } else if (LayoutType === "level") {
      Height = height - 80;
    }
    return (
      <div style={{ height: Height + "px" }} className="Tree-Box">
        <Loading opacity={false} size="small" spinning={MoreLoading}>
          {List instanceof Array && List.length > 0 ? (
            <>
              <div className="check select-all">
                <CheckBox onChange={this.onCheckAllChange} checked={checked}>
                  <span className="bar-name">全选</span>
                </CheckBox>
              </div>
              <Scrollbars autoHeight autoHeightMax={Height - 48}>
                <CheckBoxGroup value={SelectList} onChange={this.onCheckChange}>
                  {List.map((child, index) => {
                    return (
                      <div className="check select-bar" key={index}>
                        <CheckBox
                          className={`select-check ${
                            NodeType !== "tree" ? "last-select" : ""
                          }`}
                          disabled={
                            (NodeType === "tree" && !child.UserCount) ||
                            oldSelect.includes(child.NodeID)
                          }
                          value={child.NodeID}
                        >
                          {NodeType !== "tree" ? (
                            <i
                              style={{
                                background: `url(${child.AvatarPath}) no-repeat center center /24px 24px`,
                              }}
                            ></i>
                          ) : (
                            ""
                          )}
                          <span
                            className={`bar-name ${
                              NodeType !== "tree" ? "bar-name-2" : ""
                            }`}
                            title={child.NodeName}
                          >
                            {child.NodeName}
                          </span>
                          (
                          {NodeType !== "tree" ? (
                            <span className={`bar-id`} title={child.NodeID}>
                              {child.NodeID}
                            </span>
                          ) : (
                            <>
                              <span
                                className={`bar-count`}
                                title={child.UserCount}
                              >
                                {child.UserCount}
                              </span>
                              人
                            </>
                          )}
                          )
                        </CheckBox>
                        {NodeType === "tree" ? (
                          <>
                            <i className="devide"></i>

                            <span
                              onClick={() => {
                                if (
                                  child.UserCount &&
                                  !SelectList.includes(child.NodeID)
                                )
                                  this.onNextClick(child);
                              }}
                              className={`go ${
                                child.UserCount &&
                                !SelectList.includes(child.NodeID)
                                  ? "next"
                                  : "no-next"
                              }`}
                            >
                              下级
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                </CheckBoxGroup>
              </Scrollbars>
            </>
          ) : (
            <p className="no-tree">暂无数据</p>
          )}
        </Loading>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
export default connect(mapStateToProps)(Tree);
