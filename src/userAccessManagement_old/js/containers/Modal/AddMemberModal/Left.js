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
import { Modal as AntdModal, Input, Collapse, Tooltip } from "antd";
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
import Tag from "../../../component/Tag";
import Tree from "./Tree";
import $ from "jquery";
import "../../../../scss/Modal/AddMember_2.scss";
// import Table from "../../component/Table";
let { getQueryVariable, setRole, ArrayNoRepeat } = Public;
// const { HandleAction, DataAction, PublicAction } = actions;
const { Panel } = Collapse;

class Left extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }
  onTagCancel = (data) => {
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
      dispatch,
    } = this.props;
    let UpDataList = [];
    MemberList.forEach((member) => {
      if (data.NodeID !== member.NodeID) {
        UpDataList.push(member);
      }
    });
    dispatch(HandleAction.ParamsSetAddMember({ MemberList: UpDataList }));
  };
  componentDidMount() {
    let { dispatch } = this.props;
    let btn = document.getElementsByClassName("search");
    let box = document.getElementsByClassName("ant-tooltip");
    let box_in = document.getElementsByClassName("search-box");
    let that = this;
    document.addEventListener("click", (node) => {
      let {
        HandleState: {
          ParamsData: {
            AddMember: { SearchUserWordVisible, SearchUserWord },
          },
        },
      } = that.props;
      // console.log(
      //   SearchUserWordVisible,
      //   btn[0] && !btn[0].contains(node.target),
      //   box[0] && !box[0].contains(node.target),
      //   ((btn[0] && btn[0].contains(node.target)) ||
      //     (box[0] && box[0].contains(node.target))) &&
      //     SearchUserWordVisible === false
      // );
      let isOut = false;
      // let { isOut } = this.state;
      if (
        btn[0] &&
        !btn[0].contains(node.target) &&
        // !root.contains(node.target) &&
        box[0] &&
        !box[0].contains(node.target) &&
        // ||
        // (box_in[0] && box_in[0].contains(node.target))
        SearchUserWordVisible === true
      ) {
        //判断是否包含点击的节点
        isOut = true;
        // console.log("dd1");
        dispatch(
          HandleAction.ParamsSetAddMember({ SearchUserWordVisible: false })
        );
        return;
      }
      if (
        ((btn[0] && btn[0].contains(node.target)) ||
          (box[0] &&
            box[0].contains(node.target) &&
            box_in[0] &&
            !box_in[0].contains(node.target))) &&
        SearchUserWordVisible === false &&
        SearchUserWord
      ) {
        // let dom = $("#search-user").parent().parent();
        // if (!dom.hasClass("search-user")) dom.addClass("search-user");
        // console.log(dom);
        // console.log("dd");
        dispatch(
          HandleAction.ParamsSetAddMember({ SearchUserWordVisible: true })
        );
        return;
      }
      // if (isOut) {
      //   //点击的位置不在搜索框和搜索内容显示区
      //   dispatch(
      //     HandleAction.ParamsSetAddMember({ SearchUserWordVisible: false })
      //   );
      // }
    });
  }
  onSearchUserFocus = () => {
    let { dispatch } = this.props;
    // dispatch(HandleAction.ParamsSetAddMember({ SearchUserWordVisible: true }));
  };
  onSearchUserChange = (e) => {
    let { dispatch } = this.props;
    dispatch(
      HandleAction.ParamsSetAddMember({
        SearchUserWord: e.target.value,
      })
    );
    if (e.target.value.trim() !== "")
      dispatch(
        DataAction.SearchUser({
          fn: () => {
            dispatch(
              HandleAction.ParamsSetAddMember({
                SearchUserWordVisible: true,
              })
            );
          },
        })
      );
  };
  onSelectUser = (data) => {
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
    let noOtherList = MemberList; //没有该结构的数组
    // MemberList.forEach((member) => {
    //   //已选的用户列表
    //   if (!List.some((child) => child.NodeID === member.NodeID)) {
    //     //List 当前的tree列表，属于List 的member 都去掉
    //     noOtherList.push(member);
    //   }
    // });
    // // 更新
    // List.forEach((child) => {
    //   //e为新选的，进行合并
    //   if (
    //      child.NodeID===data.NodeID &&
    //     !IdentityUser.List.some((user) => user.UserID === child.NodeID)// 去掉以前就在的member
    //   ) {
    //     noOtherList.push(child);
    //   }
    // });
    if (MemberList.some((child) => child.NodeID === data.NodeID)) {
      //重复，不允许添加
      dispatch(
        PublicAction.showErrorAlert({
          title: "不能重复选择",
          type: "warn",
        })
      );
      dispatch(
        HandleAction.ParamsSetAddMember({
          SearchUserWordVisible: false,
          SearchUserWord: "",
        })
      );
      return;
    }
    if (
      !IdentityUser.List.some((user) => user.UserID === data.NodeID) // 去掉以前就在的member
    ) {
      noOtherList.push(data);
    }

    dispatch(HandleAction.ParamsSetAddMember({ MemberList: noOtherList }));
    dispatch(
      HandleAction.ParamsSetAddMember({
        SearchUserWordVisible: false,
        SearchUserWord: "",
      })
    );
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
            NodeID,
            NodeName,
            FullID,
            FullName,
            SelectRole,
            LayoutType,
            NodeType,
            SearchUserWord,
            SearchUserWordVisible,
          },
        },
        CommonData: { RoleList },
        ControlData: {
          ModalVisible: { LeftVisible },
        },
      },
      DataState: {
        GetData: {
          IdentityUser: { PageIndex, Total, List },
          SearchUser: { List: SearchList },
        },
      },
      PublicState: {
        Loading: { AppLoading, ContentLoading, ModalLoading, MoreLoadingClose },
      },
      onCancel,
      onOk,
    } = this.props;

    let UserTypeList = [];
    UserType instanceof Array &&
      RoleList instanceof Array &&
      UserType.length > 0 &&
      RoleList.map((child, index) => {
        if (UserType.map((value) => parseInt(value)).includes(child.value)) {
          UserTypeList.push(child);
        }
      });
    let count = 0;
    return (
      <>
        <div className="select-box">
          <Scrollbars>
            {
              // MemberList instanceof Array && MemberList.length>0?
              MemberList.map((child, index) => {
                if (child.nodeType === "user") {
                  count += 1;
                } else {
                  count += child.UserCount;
                }
                return (
                  <Tag
                    key={index}
                    id={
                      child.nodeType === "user"
                        ? child.NodeID
                        : child.UserCount + "人"
                    }
                    type={"edit"}
                    styleType={"dashed"}
                    onCancel={this.onTagCancel.bind(this, child)}
                    name={child.NodeName}
                  ></Tag>
                );
              })
              // :<Empty type='4' title="请在右侧选择成员添加" style={{marginTop:'150px'}}></Empty>
            }

            <Tooltip
              placement="bottomLeft"
              // trigger={["focus"]}
              autoAdjustOverflow={true}
              // getPopupContainer={(e) => e.parentNode}
              // arrowPointAtCenter={true}
              // overlayClassName={"search-user"}
              // id={'searchUser'}
              id={"search-user"}
              visible={SearchUserWordVisible}
              // onVisibleChange={() => {
              //   let dom = $("#search-user").parent().parent();
              //   if (!dom.hasClass("search-user")) dom.addClass("search-user");
              //   console.log(dom);
              // }}
              title={
               
                  <div className="search-box">
                     <Scrollbars autoHide autoHeight autoHeightMax={344}> 
                    {SearchList instanceof Array && SearchList.length > 0 ? (
                      SearchList.map((child, index) => {
                        let { NodeName, NodeID, AvatarPath } = child;
                        let NodeNameObj = "";
                        let NodeIDObj = "";
                        if (typeof NodeName === "string") {
                          let NodeNameList = NodeName.split(SearchUserWord);
                          NodeNameObj = NodeNameList.map((child, index) => {
                            if (index !== NodeNameList.length - 1) {
                              return (
                                <>
                                  {child}
                                  <span className="searchValue">
                                    {SearchUserWord}
                                  </span>
                                </>
                              );
                            } else {
                              return <>{child}</>;
                            }
                          });
                        }
                        if (typeof NodeID === "string") {
                          let NodeIDList = NodeID.split(SearchUserWord);
                          NodeIDObj = NodeIDList.map((child, index) => {
                            if (index !== NodeIDList.length - 1) {
                              return (
                                <>
                                  {child}
                                  <span className="searchValue">
                                    {SearchUserWord}
                                  </span>
                                </>
                              );
                            } else {
                              return <>{child}</>;
                            }
                          });
                        }
                        return (
                          <p
                            onClick={this.onSelectUser.bind(this, child)}
                            key={index}
                            className="search-bar"
                          >
                            <i
                              style={{
                                background: `url(${AvatarPath}) no-repeat center center /24px 24px`,
                              }}
                            ></i>
                            <span className="search-user-title">
                              <span className="nodename" title={NodeName}>
                                {NodeNameObj}
                              </span>
                              (
                              <span className="nodeid" title={NodeID}>
                                {NodeIDObj}
                              </span>
                              )
                            </span>
                          </p>
                        );
                      })
                    ) : (
                      <p className="no-searchUserch">没有匹配到任何结果</p>
                    )}</Scrollbars>
                  </div>
                
              }
            >
              <Input
                value={SearchUserWord}
                placeholder="搜索..."
                className="search"
                onChange={this.onSearchUserChange}
                onFocus={this.onSearchUserFocus}
                id={"search-input"}
              ></Input>
            </Tooltip>
          </Scrollbars>
        </div>
        <div className="my-footer">
          <span onClick={onOk} className="btn btn-comfirm">
            确定(已选{count}人)
          </span>
          <span onClick={onCancel} className="btn btn-cancel">
            取消
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
export default connect(mapStateToProps)(Left);
