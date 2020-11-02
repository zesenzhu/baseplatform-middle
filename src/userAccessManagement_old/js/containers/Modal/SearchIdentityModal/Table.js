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
import $ from "jquery";

import { HandleAction, DataAction, PublicAction } from "../../../actions";
import Public from "../../../../../common/js/public";
import Scrollbars from "react-custom-scrollbars";
import clamp from "clamp-js";

// import Columns from './Columns';
// import Table from "../../component/Table";
let { getQueryVariable, setRole, ArrayNoRepeat } = Public;
// const { HandleAction, DataAction, PublicAction } = actions;

class Left extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      columns: [
        {
          title: "姓名",
          align: "left",
          key: "UserNameID",
          width: 210,
          colSpan: 1,
          render: (data) => {
            let { UserName, UserID } = data;
            const {
              HandleState: {
                ParamsData: {
                  SearchIdentity: {
                    SearchValue,
                    KeyWord,
                    CancelBtnShow,
                    PageSize,
                  },
                },
              },
            } = this.props;
            let UserNameObj = "";
            let UserIDObj = "";
            if (typeof UserName === "string") {
              let UserNameList = UserName.split(KeyWord);
              UserNameObj = UserNameList.map((child, index) => {
                if (index !== UserNameList.length - 1) {
                  return (
                    <>
                      {child}
                      <span className="searchValue">{KeyWord}</span>
                    </>
                  );
                } else {
                  return <>{child}</>;
                }
              });
            }
            if (typeof UserID === "string") {
              let UserIDList = UserID.split(KeyWord);
              UserIDObj = UserIDList.map((child, index) => {
                if  ( index !== UserIDList.length - 1) {
                  return (
                    <>
                      {child}
                      <span className="searchValue">{KeyWord}</span>
                    </>
                  );
                } else {
                  return <>{child}</>;
                }
              });
            }
            return (
              <div className="Shadow-Box Shadow-Box-2">
                <p className="Shadow-Content UserName">
                  <span title={UserName} className="UN-UserName">
                    {UserNameObj}
                  </span>
                  [
                  <span title={UserID} className="UN-UserID">
                    {UserIDObj}
                  </span>
                  ]
                </p>
              </div>
            );
          },
        },
        {
          title: "账号类型",
          align: "center ",
          colSpan: 1,
          width: 130,
          key: "UserTypeName",
          render: (data) => {
            let { UserType, key } = data;
            let {
              HandleState: {
                CommonData: { RoleList },
                ParamsData: {
                  SearchIdentity: { EditIndex, UserTypeList },
                },
              },
            } = this.props;
            let UserTypeName = "";
            RoleList instanceof Array &&
              RoleList.map((child, index) => {
                if (UserType === child.value) {
                  UserTypeName = child.title;
                }
              });

            return (
              <div className="Shadow-Box Shadow-Box-2">
                <span
                  title={UserTypeName}
                  className="Shadow-Content UserType   "
                >
                  {UserTypeName}
                </span>
              </div>
            );
          },
        },
        {
          title: "身份",
          align: "left ",
          colSpan: 1,
          width: 330,
          key: "IdentityName",
          render: (data) => {
            let {
              HandleState: {
                CommonData: { RoleList },
                ParamsData: {
                  SearchIdentity: { EditIndex, IdentityIDsList },
                },
              },
              DataState: {
                GetData: { IdentityTypeForAccredit },
              },
              PublicState: {
                Loading: { MoreLoading },
              },
            } = this.props;
            let { IdentityList, IdentityNames, key } = data;
            let isEdit = EditIndex === key;

            return (
              <div className="Shadow-Box">
                {isEdit ? (
                  <Loading opacity={false} size="small" spinning={MoreLoading}>
                    <CheckBoxGroup
                      value={IdentityIDsList}
                      onChange={this.onIdentityIDsListChange}
                    >
                      {IdentityTypeForAccredit instanceof Array &&
                        IdentityTypeForAccredit.map((child, index) => {
                          return (
                            <CheckBox
                              disabled={child.ReadOnly}
                              value={child.IdentityID}
                            >
                              <span title={child.IdentityName}>
                                {child.IdentityName}
                              </span>
                            </CheckBox>
                          );
                        })}
                    </CheckBoxGroup>
                  </Loading>
                ) : (
                  <p title={IdentityNames} className="Shadow-Content Identity">
                    {IdentityNames}
                  </p>
                )}
              </div>
            );
          },
        },
        {
          title: "操作",
          align: "center ",
          colSpan: 1,
          width: 190,
          key: "HandleBox",
          render: (data) => {
            let { IdentityList, key } = data;
            let {
              HandleState: {
                ParamsData: {
                  SearchIdentity: { EditIndex },
                },
              },
            } = this.props;
            let isEdit = EditIndex === key;
            let Editable = true;
            // EditIndex === -1;
            return (
              <div className="Shadow-Box Shadow-Box-2">
                {isEdit ? (
                  <div className="btn-box">
                    <span
                      onClick={this.onConfirmClick.bind(this, data)}
                      className="btn-Confirm"
                    >
                      确定修改
                    </span>
                    <span
                      onClick={this.onCancelClick.bind(this, data)}
                      className="btn-Cancel"
                    >
                      取消
                    </span>
                  </div>
                ) : (
                  <span
                    onClick={() => {
                      if (Editable) this.onEditIdentityClick(data);
                    }}
                    className={`Shadow-Content Handle ${
                      Editable ? "btn-Handle" : "btn-cannot"
                    }`}
                  >
                    修改身份
                  </span>
                )}
              </div>
            );
          },
        },
      ],
    };
  }
  componentWillReceiveProps(nextProps) {
    let { module: Module } = nextProps;
    let wrapText = $(".Identity");
    wrapText.each(function (index, element) {
      clamp(element, { clamp: 2 });
    });
  }
  // 确认
  onConfirmClick = (data) => {
    let { dispatch,HandleState: {
      ParamsData: {
        SearchIdentity: { IdentityIDsList, UserID },
      },
    }, } = this.props;
     if(IdentityIDsList.length<1){
       dispatch(PublicAction.showErrorAlert({
         type:'warn',
         title:'身份最少选择1个'
       }))
       return
     }
    dispatch(
      DataAction.UpdateUserIdentity({
        fn: () => {
          this.onCancelClick();
        },
      })
    );
  };
  // 取消
  onCancelClick = () => {
    let { dispatch, onCancelClick } = this.props;
    onCancelClick();
    // dispatch(
    //   HandleAction.ParamsSetSearchIdentity({
    //     EditIndex: -1,
    //   })
    // );
    // //  置空
    // dispatch({
    //   type: DataAction.GET_IDENTITY_TYPE_FOR_ACCREDIT,
    //   data: [],
    // });
  };
  // 编辑
  onEditIdentityClick = (data) => {
    let { dispatch } = this.props;
    this.onCancelClick();
    dispatch(DataAction.GetIdentityTypeForAccredit({ userID: data.UserID }));
    dispatch(
      HandleAction.ParamsSetSearchIdentity({
        EditIndex: data.key,
        UserID: data.UserID,
        IdentityIDsList:
          typeof data.IdentityIDs === "string"
            ? data.IdentityIDs.split(",")
            : [],
      })
    );
  };
  onIdentityIDsListChange = (e) => {
    let { dispatch } = this.props;
    // console.log(e)
    if(e.length<1)
    return
    dispatch(
      HandleAction.ParamsSetSearchIdentity({
        IdentityIDsList: e,
      })
    );
  };
  // 重构行
  ConstructRow = ({ index, className, children, ...props }) => {
    let {
      HandleState: {
        ParamsData: {
          SearchIdentity: { EditIndex },
        },
      },
    } = this.props;
    let key = props["data-row-key"];
    return (
      <tr
        className={`${className} TableRow ${
          EditIndex === key ? "EditRow" : ""
        }`}
        {...props}
      >
        {children}
      </tr>
    );
  };
  onPagiNationChange = (value) => {
    this.onCancelClick();

    let { dispatch } = this.props;
    dispatch(
      HandleAction.ParamsSetSearchIdentity({
        PageIndex: value,
      })
    );
    dispatch(DataAction.SearchIdentityUser({}));
  };
  render() {
    const {
      HandleState: {
        ParamsData: {
          SearchIdentity: { SearchValue, KeyWord, CancelBtnShow, PageSize },
        },
        CommonData: { RoleList },
        ControlData: {
          ModalVisible: { LeftVisible },
        },
      },
      DataState: {
        GetData: {
          SearchIdentity: { PageIndex, Total, List },
        },
      },
      PublicState: {
        Loading: {
          TableLoading,
          ContentLoading,
          ModalLoading,
          MoreLoadingClose,
        },
      },
      onCancel,
      onOk,
    } = this.props;

    // let UserTypeList = [];
    // UserType instanceof Array &&
    //   RoleList instanceof Array &&
    //   UserType.length > 0 &&
    //   RoleList.map((child, index) => {
    //     if (UserType.map((value) => parseInt(value)).includes(child.value)) {
    //       UserTypeList.push(child);
    //     }
    //   });
    let count = 0;
    return (
      <Scrollbars autoHeight autoHeightMax={480}>
        <div className="table-box">
          <Table
            className="table"
            loading={ModalLoading}
            columns={this.state.columns}
            pagination={false}
            dataSource={List}
            // scroll={{y:440}}
            components={{
              body: {
                row: this.ConstructRow,
              },
            }}
          ></Table>
          <PagiNation
            className="pagenation"
            showQuickJumper
            pageSize={PageSize}
            current={PageIndex}
            hideOnSinglePage={true}
            total={Total}
            onChange={this.onPagiNationChange}
          ></PagiNation>
        </div>
      </Scrollbars>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
export default connect(mapStateToProps)(Left);
