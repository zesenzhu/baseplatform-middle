import React from "react";
import { connect } from "react-redux";
import {
  Alert,
  DetailsModal,
  DropDown,
  PagiNation,
  Search,
  Table,
  Button,
  Tips,
  CheckBox,
  CheckBoxGroup,
  Modal,
  Empty,
  Loading,
} from "../../../common/index";
//import '../../../common/scss/_left_menu.scss'
import { Link } from "react-router-dom";
import "../../scss/Admin.scss";
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";
import { Tooltip, Input, Modal as AntdModal } from "antd";
import TipsContact from "./TipsContact";
import TipsPower from "./TipsPower";
import md5 from "md5";
import history from "../containers/history";
import EditModal from "./EditModal";
//import IconLocation from '../../images/icon-location.png'
import actions from "../actions";
//import AdminChangeRecord from './AdminChangeRecord'
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //GradeArr:[{value:0,title:'全部年级'}]
      secondDropList: [{ value: 0, title: "全部班级" }],
      DropMenuShow: false,
      selectedRowKeys: [],
      columns: [
        {
          title: "",
          dataIndex: "handle",
          width: 68,
          key: "key",
          align: "left",
          render: (handle) => {
            return (
              <div className="registerTime-content">
                <label style={{ whiteSpace: "nowrap" }}>
                  <CheckBox
                    type="gray"
                    value={handle.key}
                    onChange={this.onCheckChange}
                  ></CheckBox>
                  <span className="key-content">
                    {handle.OrderNo + 1 >= 10
                      ? handle.OrderNo + 1
                      : "0" + (handle.OrderNo + 1)}
                  </span>
                </label>
              </div>
            );
          },
        },
        {
          title: "",
          align: "right",
          key: "UserImg",
          width: 70,
          colSpan: 0,
          // dataIndex: "UserName",
          render: (arr) => {
            return (
              <div className="name-content">
                <i
                  alt={arr.UserName.UserName}
                  onClick={this.onUserNameClick.bind(this, arr.UserName.UserID)}
                  className="name-img"
                  style={{
                    width: "47px",
                    height: "47px",
                    display: "inline-block",
                    background: `url(${arr.Others.AvatarPath}) no-repeat center center / 47px`,
                  }}
                ></i>
              </div>
            );
          },
        },
        {
          title: "姓名",
          align: "left",
          width: 130,
          colSpan: 2,

          key: "UserName",
          dataIndex: "UserName",
          sorter: true,
          render: (arr) => {
            return (
              <div className="name-content">
                <span
                  className="name-UserName"
                  onClick={this.onUserNameClick.bind(this, arr.UserID)}
                  title={arr.Name}
                >
                  {arr.Name}
                </span>
                <br />
                <span className="name-UserID" title={arr.UserID}>
                  (<span className="UserID-content">{arr.UserID}</span>)
                </span>
              </div>
            );
          },
        },
        // {
        //   title: "用户名",
        //   width: 160,
        //   align: "center",
        //   dataIndex: "ShortName",
        //   key: "ShortName",
        //   sorter: true,
        //   render: ShortName => {
        //     return (
        //       <span title={ShortName} className="UserName">
        //         {ShortName ? ShortName : "--"}
        //       </span>
        //     );
        //   }
        // },
        {
          title: "最后一次登录",
          align: "center",
          width: 200,
          // dataIndex: "LastTime",
          key: "LastTime",
          render: (data) => {
            return (
              <div className="LastTime">
                <p
                  className="last"
                  title={
                    data.Others && data.Others.LastTimeLogin
                      ? data.Others.LastTimeLogin
                      : "--"
                  }
                >
                  时间:
                  {data.Others && data.Others.LastTimeLogin
                    ? data.Others.LastTimeLogin
                    : "--"}
                </p>
                <p
                  className="last"
                  title={
                    data.Others && data.Others.LastTimeIP
                      ? data.Others.LastTimeIP
                      : "--"
                  }
                >
                  IP:
                  {data.Others && data.Others.LastTimeIP
                    ? data.Others.LastTimeIP
                    : "--"}
                </p>
              </div>
            );
          },
        },
        {
          title: "联系方式",
          align: "center",
          width: 270,
          key: "UserContact",
          dataIndex: "UserContact",
          render: (UserContact) => {
            return (
              <div className="uc">
                <div className="uc-float">
                  <p className="uc-box uc-left">
                    <span
                      title={UserContact.QQ ? UserContact.QQ : "--"}
                      className="uc-title uc-QQ"
                    >
                      {UserContact.QQ ? UserContact.QQ : "--"}
                    </span>
                    <span
                      title={UserContact.Weibo ? UserContact.Weibo : "--"}
                      className="uc-title uc-Weibo"
                    >
                      {UserContact.Weibo ? UserContact.Weibo : "--"}
                    </span>
                  </p>
                </div>
                <div className="uc-float">
                  <p className="uc-box uc-right">
                    <span
                      title={UserContact.WeiXin ? UserContact.WeiXin : "--"}
                      className="uc-title uc-WeiXin"
                    >
                      {UserContact.WeiXin ? UserContact.WeiXin : "--"}
                    </span>
                    <span
                      title={
                        UserContact.Telephone ? UserContact.Telephone : "--"
                      }
                      className="uc-title uc-Telephone"
                    >
                      {UserContact.Telephone ? UserContact.Telephone : "--"}
                    </span>
                  </p>
                </div>
              </div>
            );
          },
        },
        // {
        //   title: "访问权限",
        //   width: 120,
        //   align: "center",
        //   dataIndex: "Power",
        //   key: "Power",
        //   render: Power => {
        //     return (
        //       <Tooltip
        //         placement="topLeft"
        //         width={540}
        //         trigger="click"
        //         overlayClassName="PowerTip"
        //         arrowPointAtCenter={true}
        //         title={<TipsPower data={Power}></TipsPower>}
        //       >
        //         <span className="Power">查看</span>
        //       </Tooltip>
        //     );
        //   }
        // },
        // {
        //   title: "联系方式",
        //   width: 120,
        //   align: "center",
        //   key: "UserContact",
        //   dataIndex: "UserContact",
        //   render: UserContact => {
        //     return (
        //       <Tooltip
        //         placement="topLeft"
        //         trigger="click"
        //         arrowPointAtCenter={true}
        //         title={<TipsContact data={UserContact}></TipsContact>}
        //       >
        //         <span
        //           className="UserContact"
        //           onClick={this.onUserContactClick.bind(this, UserContact)}
        //         >
        //           查看
        //         </span>
        //       </Tooltip>
        //     );
        //   }
        // },
        {
          title: "操作",
          align: "center",
          width: 260,
          key: "handle",
          dataIndex: "key",
          render: (key) => {
            return (
              <div className="handle-content">
                <Button
                  color="blue"
                  type="default"
                  onClick={this.onChangePwdClick.bind(this, key)}
                  className="handle-btn"
                >
                  重置密码
                </Button>
                <Button
                  color="blue"
                  type="default"
                  onClick={this.onHandleClick.bind(this, key)}
                  className="handle-btn"
                >
                  编辑
                </Button>
              </div>
            );
          },
        },
      ],
      data: [
        {
          key: 1,
          UserName: { key: "01", PhotoPath: "", UserName: "祝泽森" },
          UserID: "S00001",
          Grader: "男",
          GradeName: "一年级",
          ClassName: "一年1班",
          Others: {},
        },
      ],
      PwdTipsTitle:
        "密码应由8-20位字母、数字及特殊字符`~!@#$%^&*()_+-={}|[]:\";'<>?,./\\的任意两种及以上组成",
      pagination: 1,
      loading: false,
      selectedAll: false,
      checkedList: [],
      checkAll: false,
      AdminModalVisible: false,
      userKey: "change",
      AdminChangeKey: 0,
      ChangePwdMadalVisible: false,
      alertShow: false,
      alertTitle: "提示信息",
      alertQueryShow: false,
      alertQueryTitle: "查询提示~",
      AdminDetailsMsgModalVisible: false,
      addAdminModalVisible: false,
      defaultPwd: "pwd888888",
      onClickKey: 0,
      userMsgKey: 0,
      keyList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      destroyOnCloce: true,
      changeAdminModalVisible: false,
      keyword: "",
      CancelBtnShow: "n",
      searchValue: "",
      userMsg: props.DataState.LoginUser,
      sortType: "",
      sortFiled: "",
      PwdStrong: 0,
      pageSize: 10,
    };
    window.AdminCancelSearch = this.AdminCancelSearch.bind(this);
  }
  AdminCancelSearch = () => {
    this.setState({
      CancelBtnShow: "n",
      keyword: "",
      searchValue: "",
      checkAll: false,
      // pagination: 1,
      checkedList: [],
    });
  };
  componentDidMount() {
    history.listen(() => {
      this.setState({
        pageSize: 10,
        pagination: 1,
        CancelBtnShow: "n",
        keyword: "",
        searchValue: "",
        checkAll: false,
        // pagination: 1,
        checkedList: [],
      });
    });
  }
  componentWillMount() {
    const { dispatch } = this.props;
    let pwd = "0";

    dispatch(actions.UpDataState.getChangeInputValue(pwd));
    dispatch(actions.UpDataState.GetIdentityTypeForAdmin());
  }
  componentWillReceiveProps(nextProps) {
    let Grades = this.props.DataState.GradeClassMsg.Grades
      ? this.props.DataState.GradeClassMsg.Grades
      : [];
    let len = Grades.lenght;
    //  console.log(Grades)
    let GradeArr = [{ value: 0, title: "全部年级" }];

    for (let i = 0; i < len; i++) {
      let Grade = { value: Grades[i].GradeID, title: Grades[i].GradeName };
      GradeArr.push(Grade);
    }
    if (
      nextProps.DataState.AdminPreview.PageIndex !== undefined &&
      nextProps.DataState.AdminPreview.PageIndex + 1 !== this.state.pagination
    ) {
      this.setState({
        pagination: nextProps.DataState.AdminPreview.PageIndex + 1,
      });
    }
    this.setState({
      GradeArr: GradeArr,
    });
  }

  // 搜索
  AdminSearch = (e) => {
    const { dispatch } = this.props;

    if (e.value === "") {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "请输入关键字搜索",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
      return;
    }
    let Test = /^[A-Za-z0-9]{1,30}$|^[a-zA-Z0-9_.·\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_.·\u4e00-\u9fa5]$/.test(
      e.value
    );
    if (!Test) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-error",
          title: "输入的工号或姓名格式不正确",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this),
        })
      );
      return;
    }
    this.setState({
      checkedList: [],
      checkAll: false,
      keyword: e.value,
      CancelBtnShow: "y",
      // pagination: 1
    });
    dispatch(
      actions.UpDataState.getAdminPreview(
        "/GetAdminToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=0&PageSize=" +
          this.state.pageSize +
          "&keyword=" +
          e.value +
          this.state.sortFiled +
          this.state.sortType
      )
    );
  };
  onChangeSearch = (e) => {
    this.setState({
      searchValue: e.target.value.trim(),
    });
  };

  onUserContactClick = (UserContact) => {
    //  console.log(UserContact)
    // this.setState({
    //     AdminChangeMadalVisible: true,
    //     AdminChangeKey: key
    // })
  };
  // onChangePwdClick = (e, key) => {
  //   //  console.log(e, key)
  //     this.setState({
  //         AdminChangeMadalVisible: true,
  //         AdminChangeKey: key
  //     })
  // }

  OnCheckAllChange = (e) => {
    const { dispatch, DataState } = this.props;
    //  console.log(e)
    if (e.target.checked) {
      this.setState({
        checkedList: DataState.AdminPreview.keyList,
        checkAll: e.target.checked,
      });
    } else {
      this.setState({
        checkedList: [],
        checkAll: e.target.checked,
      });
    }
  };
  // 全选
  onCheckBoxGroupChange = (checkedList) => {
    //  console.log(checkedList)
    this.setState({
      checkedList,
      checkAll: checkedList.length === this.state.keyList.length ? true : false,
    });
  };
  handleAdminModalOk = (e) => {
    //  console.log(e)
    this.setState({
      AdminModalVisible: false,
    });
  };
  handleAdminModalCancel = (e) => {
    //  console.log(e)
    this.setState({
      AdminModalVisible: false,
    });
  };

  // ChangePwdMadalOk = (e) => {
  //   //  console.log(e)
  //     this.setState({
  //         ChangePwdMadalVisible: false
  //     })
  // }

  onDeleteAllClick = () => {
    const { dispatch } = this.props;
    //  console.log(this.state.checkedList)
    if (this.state.checkedList.length === 0) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "请先勾选所要删除的管理员账号",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
    } else {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-query",
          title: "确定删除勾选的管理员吗？",
          ok: this.onAlertDeleteOk.bind(this),
          cancel: this.onAlertQueryClose.bind(this),
          close: this.onAlertQueryClose.bind(this),
        })
      );
    }
  };
  onChangePwdClick = (key) => {
    const { dispatch, DataState } = this.props;
    let data = this.state.AdminAccountData;
    let pwd = "pwd888888";
    this.setState({
      ChangePwdMadalVisible: true,
      onClickKey: key,
    });
  };
  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    //console.log('ddd')
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  onHandleClick = (key) => {
    const { dispatch, UIState } = this.props;

    //console.log(this.state.AdminAccountData[key])
    dispatch(actions.UpDataState.GetIdentityTypeForAdmin());

    this.setState({
      AdminChangeKey: key,
      changeAdminModalVisible: true,
      userKey: "change",
    });
  };
  onAddAdmin = (e) => {
    //  console.log(e)
    const { dispatch, UIState } = this.props;

    if (UIState.AppLoading.TableLoading) {
      return;
    }
    dispatch(actions.UpDataState.GetIdentityTypeForAdmin());

    this.setState({
      addAdminModalVisible: true,
      userKey: "add",
    });
  };
  onAlertWarnClose = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  onAlertWarnOk = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  onAlertQueryClose = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  //
  onAlertQueryOk = (pwd) => {
    const { dispatch, DataState } = this.props;
    let url = "/DeleteAdmin";

    dispatch(actions.UpUIState.hideErrorAlert());
    //  console.log(pwd);
    this.setState({
      checkedList: [],
      checkAll: false,
    });
  };
  // 删除
  onAlertDeleteOk = () => {
    const { dispatch, DataState } = this.props;
    let url = "/DeleteAdmin";
    console.log(this.state.checkedList);
    let Total = DataState.AdminPreview.Total;

    let UserIDs = this.state.checkedList.map((child) => {
      return DataState.AdminPreview.newList[child].UserName.UserID;
    });
    let len = UserIDs.length;
    let pagination = this.state.pagination - 1;
    postData(
      CONFIG.UserAccountProxy + url,
      {
        UserIDs: UserIDs.join(),
      },
      2
    )
      .then((res) => {
        if (res.StatusCode === "401") {
          //  console.log('错误码：' + res.StatusCode)
        }
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 400) {
          //  console.log(json.StatusCode)
        } else if (json.StatusCode === 200) {
          dispatch(actions.UpUIState.hideErrorAlert());
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "操作成功",
              onHide: this.onAlertWarnHide.bind(this),
            })
          );
          // if((Total-len)%(this.state.pagination-1)===0){
          //   pagination = this.state.pagination - 2;
          //   this.setState({
          //     pagination:pagination+1
          //   })
          // }
          this.setState({
            checkedList: [],
            checkAll: false,
          });
          if (this.state.keyword !== "")
            dispatch(
              actions.UpDataState.getAdminPreview(
                "/GetAdminToPage?SchoolID=" +
                  this.state.userMsg.SchoolID +
                  "&PageIndex=" +
                  pagination +
                  "&PageSize=" +
                  this.state.pageSize +
                  "&Keyword=" +
                  this.state.keyword +
                  this.state.sortFiled +
                  this.state.sortType
              )
            );
          else
            dispatch(
              actions.UpDataState.getAdminPreview(
                "/GetAdminToPage?SchoolID=" +
                  this.state.userMsg.SchoolID +
                  "&PageIndex=" +
                  (this.state.pagination - 1) +
                  "&PageSize=" +
                  this.state.pageSize +
                  "" +
                  this.state.sortFiled +
                  this.state.sortType
              )
            );
        }
      });
  };
  // 分页
  onPagiNationChange = (value) => {
    const { dispatch } = this.props;
    this.setState({
      // pagination: value,
      checkedList: [],
      checkAll: false,
    });

    let keyword = "";

    if (this.state.keyword !== "") {
      keyword = "&keyword=" + this.state.keyword;
    }
    dispatch(
      actions.UpDataState.getAdminPreview(
        "/GetAdminToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=" +
          --value +
          "&PageSize=" +
          this.state.pageSize +
          "" +
          this.state.sortFiled +
          this.state.sortType
      )
    );
  };
  // 改变显示条目数
  onShowSizeChange = (current, pageSize) => {
    // console.log(current, pageSize);
    const { dispatch } = this.props;

    this.setState({
      checkedList: [],
      checkAll: false,
      pageSize,
      pagination: 1,
    });
    let keyword = "";

    if (this.state.keyword !== "") {
      keyword = "&keyword=" + this.state.keyword;
    }
    dispatch(
      actions.UpDataState.getAdminPreview(
        "/GetAdminToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=" +
          0 +
          "&PageSize=" +
          pageSize +
          "" +
          this.state.sortFiled +
          this.state.sortType
      )
    );
  };
  onUserNameClick = (UserID) => {
    const { dispatch } = this.props;

    dispatch(
      actions.UpDataState.getUserMsg("/GetUserDetail?userid=" + UserID, () => {
        this.setState({
          AdminDetailsMsgModalVisible: true,
        });
      })
    );

    this.setState({
      AdminDetailsMsgModalVisible: true,
    });
  };
  AdminDetailsMsgModalOk = () => {
    this.setState({
      AdminDetailsMsgModalVisible: false,
    });
  };
  AdminDetailsMsgModalCancel = () => {
    this.setState({
      AdminDetailsMsgModalVisible: false,
    });
  };

  handleAddAdminModalOk = (e) => {
    const { dispatch, UIState, DataState } = this.props;

    let picObj = DataState.GetPicUrl.picObj;
    let isFlase = false;
    if (
      UIState.TipsVisible.UserIDTipsVisible ||
      !DataState.AdminPreview.TrasferData.UserID
    ) {
      // dispatch(
      //   actions.UpUIState.showErrorAlert({
      //     type: "btn-warn",
      //     title: "工号有错误",
      //     ok: this.onAlertWarnOk.bind(this),
      //     cancel: this.onAlertWarnClose.bind(this),
      //     close: this.onAlertWarnClose.bind(this)
      //   })
      // );
      dispatch(actions.UpUIState.UserIDTipsVisibleOpen());
      isFlase = true;
    }
    if (
      UIState.TipsVisible.UserNameTipsVisible ||
      !DataState.AdminPreview.TrasferData.UserName
    ) {
      // dispatch(
      //   actions.UpUIState.showErrorAlert({
      //     type: "btn-warn",
      //     title: "姓名有错误",
      //     ok: this.onAlertWarnOk.bind(this),
      //     cancel: this.onAlertWarnClose.bind(this),
      //     close: this.onAlertWarnClose.bind(this)
      //   })
      // );
      dispatch(actions.UpUIState.UserNameTipsVisibleOpen());

      isFlase = true;
    }
    // 身份在ProductType为3出来
    const { ProductType, ResHttpRootUrl } = sessionStorage.getItem(
      "LgBasePlatformInfo"
    )
      ? JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"))
      : {};
    let HaveIdentity = parseInt(ProductType) === 3;
    if (
      HaveIdentity &&
      (UIState.TipsVisible.IdentityTipsVisible ||
        !DataState.AdminPreview.TrasferData.IdentityIDs)
    ) {
      // dispatch(
      //   actions.UpUIState.showErrorAlert({
      //     type: "btn-warn",
      //     title: "姓名有错误",
      //     ok: this.onAlertWarnOk.bind(this),
      //     cancel: this.onAlertWarnClose.bind(this),
      //     close: this.onAlertWarnClose.bind(this)
      //   })
      // );
      dispatch(actions.UpUIState.SetTipsVisible({ IdentityTipsVisible: true }));

      isFlase = true;
    }
    if (
      UIState.TipsVisible.TelphoneTipsVisible ||
      UIState.TipsVisible.WeixinTipsVisible ||
      UIState.TipsVisible.WeiboTipsVisible ||
      UIState.TipsVisible.QQTipsVisible
    ) {
      // dispatch(actions.UpUIState.UserNameTipsVisibleOpen());

      isFlase = true;
    }
    if (isFlase) {
      return;
    }
    if (
      !DataState.AdminPreview.TrasferData.isChange &&
      !picObj.picUploader.isChanged()
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "管理员信息不能为空",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
      return;
    }
    let url = "/AddAdmin";
    // let ModulesID = []
    // DataState.AdminPreview.TrasferData.ModuleIDs.map((child) => {
    //   //  console.log(child.length)
    //     if (child.length !== 0)
    //         ModulesID.push(child.join())
    // })
    if (picObj.picUploader.uploadSubmit()) {
      postData(
        CONFIG.UserAccountProxy + url,
        {
          userID: DataState.AdminPreview.TrasferData.UserID,
          UserName: DataState.AdminPreview.TrasferData.UserName,
          ModuleIDs: DataState.AdminPreview.TrasferData.ModuleIDs,
          AvatarPath: picObj.picUploader.getCurImgPath(),
          Pwd: "0",
          Telephone: DataState.AdminPreview.TrasferData.Telephone,
          QQ: DataState.AdminPreview.TrasferData.QQ,
          Weixin: DataState.AdminPreview.TrasferData.Weixin,
          Weibo: DataState.AdminPreview.TrasferData.Weibo,
          IdentityIDs: DataState.AdminPreview.TrasferData.IdentityIDs,
          
        },
        2
      )
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          // if (json.StatusCode !== 200) {
          //     dispatch(actions.UpUIState.showErrorAlert({
          //         type: 'btn-error',
          //         title: json.Msg,
          //         ok: this.onAlertWarnOk.bind(this),
          //         cancel: this.onAlertWarnClose.bind(this),
          //         close: this.onAlertWarnClose.bind(this)
          //     }));
          // } else
          if (json.StatusCode === 200) {
            dispatch(
              actions.UpUIState.showErrorAlert({
                type: "success",
                title: "操作成功",
                onHide: this.onAlertWarnHide.bind(this),
              })
            );
            this.setState({
              addAdminModalVisible: false,
              checkedList: [],
              checkAll: false,
            });
            dispatch(
              actions.UpDataState.setAdminPreview({
                isChange: false,
                UserID: "",
                UserName: "",
                ModuleIDs: "",
                PhotoPath: "",
                Pwd: "0",
              })
            );
            dispatch(
              actions.UpDataState.getAdminPreview(
                "/GetAdminToPage?SchoolID=" +
                  this.state.userMsg.SchoolID +
                  "&PageIndex=" +
                  (this.state.pagination - 1) +
                  "&PageSize=" +
                  this.state.pageSize +
                  "" +
                  (this.state.keyword ? "&Keyword=" + this.state.keyword : "") +
                  this.state.sortFiled +
                  this.state.sortType
              )
            );
            dispatch(actions.UpUIState.AllTipsVisibleClose());
          }
        });
    }
  };
  //检测手机
  UserComm_CheckPhoneNumber(strInput) {
    return /^[0-9]{11}$/.test(strInput);
  }
  //检测电话
  UserComm_CheckTelephone(strInput) {
    return /^([0-9\/-]){1,40}$/.test(strInput);
  }
  //检测QQ
  UserComm_CheckQQ(strInput) {
    return /^[1-9]*[1-9][0-9]{4,18}$/.test(strInput); //QQ号
  }
  //检测邮箱
  UserComm_CheckEmail(strInput) {
    //\S表示非空字符
    if (!/^(\S)+@(\S)+\.[a-zA-Z]{2,3}$/.test(strInput)) {
      return false;
    } else {
      return /^([a-zA-Z0-9]+[_|\-|\.]*)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]*)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/gi.test(
        strInput
      );
    }
  }
  handleAddAdminModalCancel = (e) => {
    const { dispatch, DataState } = this.props;
    dispatch(
      actions.UpDataState.setAdminPreview({
        isChange: false,
        UserID: "",
        UserName: "",
        ModuleIDs: "",
        PhotoPath: "",
        Pwd: "0",
      })
    );
    this.setState({
      addAdminModalVisible: false,
    });
    dispatch(actions.UpUIState.AllTipsVisibleClose());
  };
  handleChangeAdminModalOk = (e) => {
    const { dispatch, UIState, DataState } = this.props;
    let {
      isChange,
      UserID,
      UserName,
      ModuleIDs,
      PhotoPath,
      IdentityIDs,
    } = DataState.AdminPreview.TrasferData;
    let picObj = DataState.GetPicUrl.picObj;

    if (UIState.TipsVisible.UserIDTipsVisible) {
      // dispatch(
      //   actions.UpUIState.showErrorAlert({
      //     type: "btn-warn",
      //     title: "工号有错误",
      //     ok: this.onAlertWarnOk.bind(this),
      //     cancel: this.onAlertWarnClose.bind(this),
      //     close: this.onAlertWarnClose.bind(this)
      //   })
      // );
      dispatch(actions.UpUIState.UserIDTipsVisibleOpen());
      return;
    }
    if (UIState.TipsVisible.UserNameTipsVisible) {
      // dispatch(
      //   actions.UpUIState.showErrorAlert({
      //     type: "btn-warn",
      //     title: "姓名有错误",
      //     ok: this.onAlertWarnOk.bind(this),
      //     cancel: this.onAlertWarnClose.bind(this),
      //     close: this.onAlertWarnClose.bind(this)
      //   })
      // );
      dispatch(actions.UpUIState.UserNameTipsVisibleOpen());

      return;
    }
    // 身份在ProductType为3出来
    const { ProductType, ResHttpRootUrl } = sessionStorage.getItem(
      "LgBasePlatformInfo"
    )
      ? JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"))
      : {};
    let HaveIdentity = parseInt(ProductType) === 3;
    if (
      HaveIdentity &&
      (UIState.TipsVisible.IdentityTipsVisible || IdentityIDs === "")
    ) {
      // dispatch(
      //   actions.UpUIState.showErrorAlert({
      //     type: "btn-warn",
      //     title: "姓名有错误",
      //     ok: this.onAlertWarnOk.bind(this),
      //     cancel: this.onAlertWarnClose.bind(this),
      //     close: this.onAlertWarnClose.bind(this)
      //   })
      // );
      dispatch(actions.UpUIState.SetTipsVisible({ IdentityTipsVisible: true }));

      return;
    }
    if (
      UIState.TipsVisible.TelphoneTipsVisible ||
      UIState.TipsVisible.WeixinTipsVisible ||
      UIState.TipsVisible.WeiboTipsVisible ||
      UIState.TipsVisible.QQTipsVisible
    ) {
      // dispatch(actions.UpUIState.UserNameTipsVisibleOpen());

      return;
    }

    let InitPower = DataState.AdminPreview.InitData.ModuleIDs.split(",");
    let len = InitPower.length;

    // let CopyPower = InitPower.slice()
    let Modules = ModuleIDs.split(",");
    // console.log(Modules.length, len);

    let ModulesIsChange = false;
    if (Modules.length !== len) {
      ModulesIsChange = true;
    } else {
      Modules.map((child) => {
        //console.log(child.length)

        InitPower instanceof Array &&
          InitPower.map((power) => {
            console.log(power, child);
            if (power === child) {
              len--;
            }
          });
      });
      if (len !== 0) {
        ModulesIsChange = true;
      }
    }
    if (!isChange) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "信息没有发生改变",
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
      return;
    }
    // console.log(Modules.length,len)

    // if (
    //   // !ModulesIsChange &&
    //   UserID === DataState.AdminPreview.InitData.UserID &&
    //   UserName === DataState.AdminPreview.InitData.UserName &&
    //   // PhotoPath === DataState.AdminPreview.InitData.PhotoPath&&
    //   // UserID === DataState.AdminPreview.InitData.UserID&&
    //   // !DataState.AdminPreview.TrasferData.isChange &&
    //   !picObj.picUploader.isChanged()
    // ) {
    //   dispatch(
    //     actions.UpUIState.showErrorAlert({
    //       type: "warn",
    //       title: "管理员信息没有发生改变",
    //       ok: this.onAlertWarnOk.bind(this),
    //       cancel: this.onAlertWarnClose.bind(this),
    //       close: this.onAlertWarnClose.bind(this),
    //       onHide: this.onAlertWarnHide.bind(this),
    //     })
    //   );
    //   return;
    // }

    let url = "/EditAdmin";
    // let ModulesID = []
    // DataState.AdminPreview.TrasferData.ModuleIDs.map((child) => {
    //   //  console.log(child.length)
    //     if (child.length !== 0)
    //         ModulesID.push(child.join())
    // })
    let PhotoEdit = 0;
    if (picObj.picUploader.isChanged()) {
      PhotoEdit = 1;
    }
    if (picObj.picUploader.uploadSubmit()) {
      postData(
        CONFIG.UserAccountProxy + url,
        {
          userID: DataState.AdminPreview.TrasferData.UserID,
          UserName: DataState.AdminPreview.TrasferData.UserName,
          ModuleIDs: DataState.AdminPreview.TrasferData.ModuleIDs,
          AvatarPath: picObj.picUploader.getCurImgPath(),
          Pwd: "0",
          PhotoEdit: PhotoEdit,
          EditPower: ModulesIsChange ? 1 : 0,
          Telephone: DataState.AdminPreview.TrasferData.Telephone,
          QQ: DataState.AdminPreview.TrasferData.QQ,
          Weixin: DataState.AdminPreview.TrasferData.Weixin,
          Weibo: DataState.AdminPreview.TrasferData.Weibo,
          IdentityIDs: DataState.AdminPreview.TrasferData.IdentityIDs,

        },
        2
      )
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          if (json.StatusCode === 200) {
            dispatch(
              actions.UpUIState.showErrorAlert({
                type: "success",
                title: "操作成功",
                onHide: this.onAlertWarnHide.bind(this),
              })
            );
            this.setState({
              changeAdminModalVisible: false,
              checkedList: [],
              checkAll: false,
            });
            dispatch(
              actions.UpDataState.setAdminPreview({
                isChange: false,
                UserID: "",
                UserName: "",
                ModuleIDs: "",
                PhotoPath: "",
                Pwd: "0",
              })
            );
            dispatch(
              actions.UpDataState.getAdminPreview(
                "/GetAdminToPage?SchoolID=" +
                  this.state.userMsg.SchoolID +
                  "&PageIndex=" +
                  (this.state.pagination - 1) +
                  "&PageSize=" +
                  this.state.pageSize +
                  "" +
                  (this.state.keyword ? "&Keyword=" + this.state.keyword : "") +
                  this.state.sortFiled +
                  this.state.sortType
              )
            );
            dispatch(actions.UpUIState.AllTipsVisibleClose());
          }
        });
    }
  };
  handleChangeAdminModalCancel = (e) => {
    const { dispatch, DataState } = this.props;
    dispatch(
      actions.UpDataState.setAdminPreview({
        isChange: false,
        UserID: "",
        UserName: "",
        ModuleIDs: "",
        PhotoPath: "",
        Pwd: "0",
      })
    );
    this.setState({
      changeAdminModalVisible: false,
    });
    dispatch(actions.UpUIState.AllTipsVisibleClose());
  };
  //修改密码
  onPwdchangeOk = () => {
    const { dispatch, DataState, UIState } = this.props;
    let pwd = this.state.defaultPwd;
    if (this.state.defaultPwd === "") {
      dispatch({ type: actions.UpUIState.PWD_TIPS_OPEN });
      return;
    } else if (UIState.TipsVisible.PwdTipsShow) {
      // dispatch({type:actions.UpUIState.PWD_TIPS_OPEN})
      return;
    }
    //  console.log(this.state.onClickKey)
    let url = "/ResetPwd";
    postData(
      CONFIG.UserAccountProxy + url,
      {
        userID:
          DataState.AdminPreview.newList[this.state.onClickKey].UserName.UserID,
        userType: 0,
        newPwd: md5(pwd),
      },
      2
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "操作成功",
              onHide: this.onAlertWarnHide.bind(this),
            })
          );
          this.setState({
            ChangePwdMadalVisible: false,
            defaultPwd: "pwd888888",
            checkAll: false,
            checkedList: [],
            PwdStrong: 0,
          });
          if (this.state.keyword !== "")
            dispatch(
              actions.UpDataState.getAdminPreview(
                "/GetAdminToPage?SchoolID=" +
                  this.state.userMsg.SchoolID +
                  "&PageIndex=" +
                  (this.state.pagination - 1) +
                  "&PageSize=" +
                  this.state.pageSize +
                  "&Keyword=" +
                  this.state.keyword +
                  this.state.sortFiled +
                  this.state.sortType
              )
            );
          else
            dispatch(
              actions.UpDataState.getAdminPreview(
                "/GetAdminToPage?SchoolID=" +
                  this.state.userMsg.SchoolID +
                  "&PageIndex=" +
                  (this.state.pagination - 1) +
                  "&PageSize=" +
                  this.state.pageSize +
                  "" +
                  this.state.sortFiled +
                  this.state.sortType
              )
            );
        }
      });
  };
  onPwdchangeClose = () => {
    const { dispatch } = this.props;

    dispatch({ type: actions.UpUIState.PWD_TIPS_CLOSE });
    this.setState({
      ChangePwdMadalVisible: false,
      defaultPwd: "pwd888888",
      PwdStrong: 0,
    });
  };
  onPwdchange = (e) => {
    const { dispatch } = this.props;
    //  console.log(e.target.value)
    this.setState({
      defaultPwd: e.target.value.trim(),
    });
  };

  // onPowerClick = (Power) => {
  //   //  console.log(Power)
  // }

  //table改变，进行排序操作
  onTableChange = (a, b, sorter) => {
    const { DataState, dispatch } = this.props;
    let keyword = "";

    if (this.state.keyword !== "") {
      keyword = "&keyword=" + this.state.keyword;
    }
    // console.log(sorter)
    if (
      sorter &&
      (sorter.columnKey === "UserName" || sorter.columnKey === "ShortName")
    ) {
      let sortType =
        sorter.order === "descend"
          ? "&SortType=DESC"
          : sorter.order === "ascend"
          ? "&SortType=ASC"
          : "";
      this.setState({
        sortType: "&" + sortType,
        sortFiled: "&sortFiled=" + sorter.columnKey,
        checkAll: false,
        checkedList: [],
      });
      dispatch(
        actions.UpDataState.getAdminPreview(
          "/GetAdminToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageSize=" +
            this.state.pageSize +
            "&sortFiled=" +
            sorter.columnKey +
            sortType +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            keyword
        )
      );
    } else if (sorter) {
      this.setState({
        sortType: "",
        sortFiled: "",
        checkAll: false,
        checkedList: [],
      });
      dispatch(
        actions.UpDataState.getAdminPreview(
          "/GetAdminToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageSize=" +
            this.state.pageSize +
            "" +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            keyword
        )
      );
    }
  };
  // 取消搜索
  onCancelSearch = (e) => {
    const { dispatch } = this.props;

    this.setState({
      CancelBtnShow: "n",
      keyword: "",
      searchValue: "",
      checkAll: false,
      // pagination: 1,
      checkedList: [],
    });
    dispatch(
      actions.UpDataState.getAdminPreview(
        "/GetAdminToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=" +
          0 +
          "&PageSize=" +
          this.state.pageSize +
          "" +
          this.state.sortFiled +
          this.state.sortType
      )
    );
  };
  onPwdBlur = (e) => {
    const { dispatch } = this.props;
    // console.log(e.target.value);
    let value = e.target.value;
    const { isOK, txt } = this.UserComm_ValidatePwd(value);
    // this.setState({
    //   PwdTipsTitle: txt
    // });
    let PwdStrong = this.UserComm_PwdStrong(value);
    this.setState({
      PwdStrong: PwdStrong,
    });
    if (!isOK) {
      dispatch({ type: actions.UpUIState.PWD_TIPS_OPEN });
      return;
    } else {
      dispatch({ type: actions.UpUIState.PWD_TIPS_CLOSE });
      return;
    }
    // let Test = /^([0-9a-zA-Z`~\!@#$%\^&*\(\)_\+-={}|\[\]:\";\'<>\?,.\/\\]){6,20}$/.test(
    //   value
    // );
    // if (!Test || value === "") {
    //   dispatch({ type: actions.UpUIState.PWD_TIPS_OPEN });
    //   return;
    // } else {
    //   dispatch({ type: actions.UpUIState.PWD_TIPS_CLOSE });
    //   return;
    // }
  };
  //密码合法判断
  UserComm_ValidatePwd = (pwd) => {
    let lengthOver8 = true;
    let lengthLess20 = true;
    let containNumber = true;
    let containLetters = true;
    let containSymbol = true;
    let isOK = true;

    let txt = "";

    lengthOver8 = pwd.length >= 8;
    lengthLess20 = pwd.length <= 20;
    containNumber = /[0-9]+/.test(pwd);
    containLetters = /[a-zA-Z]+/.test(pwd);
    containSymbol = /[`~\!@#$%\^&*\(\)_\+={}|\[\]:\";\'<>\?,.\/\\-]+/.test(pwd);
    isOK = /^([0-9a-zA-Z`~\!@#$%\^&*\(\)_\+={}|\[\]:\";\'<>\?,.\/\\-]){8,20}$/.test(
      pwd
    );

    if (!lengthOver8) {
      txt += "密码长度不足8位、";
    }
    if (!lengthLess20) {
      txt += "密码长度不能超过20位、";
    }

    if (
      (containNumber && containLetters) ||
      (containNumber && containSymbol) ||
      (containLetters && containSymbol) ||
      (containNumber && containLetters && containSymbol)
    ) {
      //密码合法
    } else {
      txt += "至少包含字母、数字及特殊符号中的两种、";
    }

    if (lengthOver8 && lengthLess20 && !isOK) {
      txt += "密码包含非法字符、";
    }

    if (txt === "") {
      txt = "密码合法";
      return { isOK: true, txt: txt };
    } else {
      txt = txt.substr(0, txt.length - 1);
      return { isOK: false, txt: txt };
    }
  };
  // 密码强度
  UserComm_PwdStrong = (pwd) => {
    const containNumber = /[0-9]+/.test(pwd);

    const containLetters = /[a-zA-Z]+/.test(pwd);

    const containSymbol = /[`~\!@#$%\^&*\(\)_\+={}|\[\]:\";\'<>\?,.\/\\-]+/.test(
      pwd
    );

    //判断是否是强

    if (containLetters && containNumber && containSymbol) {
      return 3;
    } else if (
      (containLetters && !containSymbol && !containNumber) ||
      (containSymbol && !containLetters && !containNumber) ||
      (containNumber && !containLetters && !containSymbol)
    ) {
      //判断是否是弱类型

      return 1;
    } else if (!containLetters && !containNumber && !containSymbol) {
      //是否是这样的类型
      return 0;
    } else {
      //是否是中等类型

      return 2;
    }
  };
  render() {
    const { UIState, DataState } = this.props;
    const data = {
      userName: "康欣",
      userImg: "",
      Gende: "男",
      userText: "学如逆水行舟，不进则退",
      userID: "20170025444",
      userGrade: "一年级",
      userClass: "1班",
      userIDCard: "",
      userPhone: "15626248624",
      userMail: "1519406168@qq.com",
      userAddress: "蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团",
    };
    return (
      <div className="Admin">
        <div className="Admin-box">
          <div className="Admin-top">
            <span className="top-tips">
              <span className="tips menu34 ">管理员账号管理</span>
            </span>
            <div className="top-nav">
              {/* <span className='divide'>|</span> */}
              <span
                className="link"
                style={{ cursor: "pointer" }}
                onClick={this.onAddAdmin.bind(this)}
              >
                <span className="add">添加管理员</span>
              </span>
            </div>
          </div>
          <div className="Admin-hr"></div>
          <div className="Admin-content">
            <div className="content-top">
              <Search
                placeHolder="请输入工号或姓名进行搜索..."
                onClickSearch={this.AdminSearch}
                height={30}
                width={250}
                onCancelSearch={this.onCancelSearch}
                Value={this.state.searchValue}
                onChange={this.onChangeSearch.bind(this)}
                CancelBtnShow={this.state.CancelBtnShow}
              ></Search>
            </div>
            <div className="content-render">
              <Loading
                tip="加载中..."
                opacity={false}
                size="large"
                spinning={UIState.AppLoading.TableLoading}
              >
                <div>
                  <CheckBoxGroup
                    style={{ width: "100%" }}
                    value={this.state.checkedList}
                    onChange={this.onCheckBoxGroupChange.bind(this)}
                  >
                    {DataState.AdminPreview.newList instanceof Array &&
                    DataState.AdminPreview.newList.length !== 0 ? (
                      <Table
                        className="table"
                        onChange={this.onTableChange.bind(this)}
                        columns={this.state.columns}
                        pagination={false}
                        loading={UIState.AppLoading.TableLoading}
                        dataSource={DataState.AdminPreview.newList}
                      ></Table>
                    ) : (
                      <Empty
                        title={
                          this.state.CancelBtnShow === "y"
                            ? "暂无符合条件的管理员账号"
                            : "暂无管理员账号"
                        }
                        type="3"
                        style={{ marginTop: "150px" }}
                      ></Empty>
                    )}
                  </CheckBoxGroup>
                  {DataState.AdminPreview.Total ? (
                    <div style={{ display: "inline-block" }}>
                      <CheckBox
                        className="checkAll-box"
                        type="gray"
                        onChange={this.OnCheckAllChange}
                        checked={this.state.checkAll}
                      >
                        <span className="checkAll-title">全选</span>
                      </CheckBox>
                      <Button
                        onClick={this.onDeleteAllClick}
                        className="deleteAll"
                        color="red"
                      >
                        删除
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="pagination-box">
                    <PagiNation
                      showQuickJumper
                      hideOnSinglePage={
                        DataState.AdminPreview.Total === 0 ? true : false
                      }
                      current={this.state.pagination}
                      total={DataState.AdminPreview.Total}
                      onChange={this.onPagiNationChange}
                      pageSize={this.state.pageSize}
                      showSizeChanger
                      onShowSizeChange={this.onShowSizeChange}
                    ></PagiNation>
                  </div>
                </div>
              </Loading>
            </div>
          </div>
        </div>

        {/* 模态框 */}
        {/* <Modal
                    ref='handleAdminMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    title='编辑学生'
                    visible={this.state.AdminModalVisible}
                    onOk={this.handleAdminModalOk}
                    onCancel={this.handleAdminModalCancel}
                    
                >
                    <EditModal userKey={this.state.userKey}></EditModal>
                </Modal> */}
        {/* <Modal
                    ref='AdminChangeMadal'
                    bodyStyle={{ padding: 0 }}
                    type='2'
                    width={650}
                    visible={this.state.AdminChangeMadalVisible}
                    onOk={this.AdminChangeMadalOk}
                    onCancel={this.AdminChangeMadalCancel}
                >
                    <div className='modal-AdminChange'>
                        <div className='content-top'>
                            <img src={IconLocation} width='30' height='40' alt='icon-location' />
                            <span className='top-text'>毛峰的档案变更记录</span>
                        </div>
                        <div className='content'>
                            <AdminChangeRecord data={''}></AdminChangeRecord>
                        </div>
                    </div>
                </Modal> */}
        <Modal
          ref="handleAdminMadal"
          bodyStyle={{ padding: 0, height: "370px" }}
          type="1"
          title={"添加管理员"}
          visible={this.state.addAdminModalVisible}
          onOk={this.handleAddAdminModalOk}
          onCancel={this.handleAddAdminModalCancel}
        >
          {this.state.addAdminModalVisible ? (
            <EditModal
              type="Admin"
              userKey={this.state.userKey}
              data={DataState.AdminPreview.newList[this.state.AdminChangeKey]}
              PowerList={DataState.AdminPreview.PowerList}
            ></EditModal>
          ) : (
            ""
          )}
        </Modal>
        <Modal
          ref="handleAdminMadal"
          bodyStyle={{ padding: 0, height: "370px" }}
          type="1"
          title={"编辑管理员"}
          visible={this.state.changeAdminModalVisible}
          onOk={this.handleChangeAdminModalOk}
          onCancel={this.handleChangeAdminModalCancel}
        >
          {this.state.changeAdminModalVisible ? (
            <EditModal
              type="Admin"
              userKey={this.state.userKey}
              data={DataState.AdminPreview.newList[this.state.AdminChangeKey]}
              PowerList={DataState.AdminPreview.PowerList}
            ></EditModal>
          ) : (
            ""
          )}
        </Modal>
        <DetailsModal
          ref="AdminDetailsMsgModal"
          visible={this.state.AdminDetailsMsgModalVisible}
          onOk={this.AdminDetailsMsgModalOk}
          onCancel={this.AdminDetailsMsgModalCancel}
          data={DataState.GetUserMsg}
          type="admin"
        ></DetailsModal>
        {/* <AntdModal
                    ref='changePwdMadal'
                    
                    footer={null}
                    title='重置密码'
                    visible={this.state.ChangePwdMadalVisible}
                    onOk={this.ChangePwdMadalOk}
                    onCancel={this.ChangePwdMadalCancel}
                >
                    <div>

                    </div>
                </AntdModal> */}
        {/* 提示框 */}
        <Alert
          show={this.state.ChangePwdMadalVisible}
          type={"btn-query"}
          abstract={
            <div className="alert-pwd">
              <span className="alert-pwd-tips">新密码：</span>
              <Tips
                overlayClassName="tips"
                visible={UIState.TipsVisible.PwdTipsShow}
                title={this.state.PwdTipsTitle}
                getPopupContainer={(e) => e.parentNode}
              >
                <Input
                  size="small"
                  onChange={this.onPwdchange.bind(this)}
                  onBlur={this.onPwdBlur.bind(this)}
                  style={{ width: 120 + "px" }}
                  value={this.state.defaultPwd}
                ></Input>
              </Tips>
              <div
                className="PwdStrong"
                style={{ display: this.state.PwdStrong ? "block" : "none" }}
              >
                <span className="strongTips">密码强度：</span>
                <span className="pwd-box">
                  <span
                    className={`color-first-${this.state.PwdStrong} box-first `}
                  ></span>
                  <span
                    className={`color-second-${this.state.PwdStrong} box-second`}
                  ></span>
                  <span
                    className={`color-third-${this.state.PwdStrong} box-third`}
                  ></span>
                </span>
                <span
                  className={`strongTips tips-color-${this.state.PwdStrong} `}
                >
                  {this.state.PwdStrong === 1
                    ? "弱"
                    : this.state.PwdStrong === 2
                    ? "中"
                    : this.state.PwdStrong === 3
                    ? "强"
                    : ""}
                </span>
              </div>
            </div>
          }
          title={
            this.state.ChangePwdMadalVisible ? (
              <p className="alert-Title">
                确定重置
                <span
                  title={
                    DataState.AdminPreview.newList[this.state.onClickKey]
                      .UserName.Name
                  }
                  className="alert-Title-name"
                >
                  {
                    DataState.AdminPreview.newList[this.state.onClickKey]
                      .UserName.Name
                  }
                </span>
                <span
                  title={
                    DataState.AdminPreview.newList[this.state.onClickKey]
                      .UserName.UserID
                  }
                  className="alert-Title-id"
                >
                  (
                  {
                    DataState.AdminPreview.newList[this.state.onClickKey]
                      .UserName.UserID
                  }
                  )
                </span>{" "}
                的密码？
              </p>
            ) : (
              ""
            )
          }
          onOk={this.onPwdchangeOk}
          onCancel={this.onPwdchangeClose}
          onClose={this.onPwdchangeClose}
        ></Alert>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState,
  };
};
export default connect(mapStateToProps)(Admin);
