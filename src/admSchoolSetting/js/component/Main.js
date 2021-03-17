import React, { Component, createRef } from "react";
import {
  Loading,
  Empty,
  DropDown,
  CheckBox,
  CheckBoxGroup,
  PagiNation,
  Modal,
  Button,
  Search,
} from "../../../common";
import { connect } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import history from "../containers/history";
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";
import actions from "../actions";
import "../../scss/Main.scss";
import SchoolModal from "./SchoolModal";
import ImgDefault from "../../images/icon-common.png";
import { Table } from "antd";
const { UpDataState, UpUIState } = actions;
class Main extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    let { ProductUseRange } = sessionStorage.getItem("LgBasePlatformInfo")
      ? JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"))
      : {};
    ProductUseRange = parseInt(ProductUseRange);
    let isUniv =
      ProductUseRange === 5 ||
      ProductUseRange === 8 ||
      ProductUseRange === 10 ||
      ProductUseRange === 11;
    this.state = {
      columns: [
        {
          title: "",
          dataIndex: "orderNo",
          key: "orderNo",
          width: 68,
          align: "left",
          render: (key) => {
            return (
              <div className="registerTime-content">
                <label style={{ whiteSpace: "nowrap" }}>
                  <CheckBox
                    value={key.key}
                    // type="gray"
                    onChange={this.onCheckChange}
                  ></CheckBox>
                  <span className="key-content">{key.No}</span>
                </label>
              </div>
            );
          },
        },
        {
          title: "",
          align: "right",
          width: 40,
          key: "SchoolImgUrl",
          dataIndex: "SchoolImgUrl",
          // sorter: true,
          render: (SchoolImgUrl) => {
            return (
              <div
                style={{
                  background: SchoolImgUrl
                    ? `url(${SchoolImgUrl})no-repeat center/28px`
                    : "",
                  // backgroundSize: "28px",
                  // backgroundPosition: "center",
                  // backgroundRepeat: "no-repeat",
                }}
                className="SchoolImgUrl"
              ></div>
            );
          },
        },
        {
          title: "学校名称",
          align: "left",
          width: 200,
          key: "SchoolName",
          //dataIndex: "SchoolName",
          // sorter: true,
          render: ({
            SchoolName,
            SchoolState,
            CityName,
            CountyName,
            ProvinceName,
          } = data) => {
            return (
              <div className="name-content">
                <span
                  title={SchoolName}
                  className="SchoolName"
                  // onClick={this.onSchoolNameClick.bind(this, arr.key)}
                >
                  {SchoolName ? SchoolName : "--"}
                </span>
                {SchoolState.value === 2 ? (
                  <span
                    className={`SchoolState ${
                      SchoolState.value === 1 ? "School-open" : "School-close"
                    }`}
                  >
                    {SchoolState.title ? SchoolState.title : "--"}
                  </span>
                ) : (
                  ""
                )}
                {ProvinceName && CityName && CountyName ? (
                  <p
                    title={ProvinceName + ">" + CityName + ">" + CountyName}
                    className="addr"
                  >
                    {ProvinceName + ">" + CityName + ">" + CountyName}
                  </p>
                ) : (
                  ""
                )}
              </div>
            );
          },
        },
        {
          title: "代码",
          align: "center",
          width: 95,
          dataIndex: "SchoolCode",
          key: "SchoolCode",
          // sorter: true,
          render: (SchoolCode) => {
            return (
              <span title={SchoolCode} className="SchoolCode">
                {SchoolCode ? SchoolCode : "--"}
              </span>
            );
          },
        },
        // {
        //   title: "类型",
        //   align: "center",
        //   width: 80,
        //   dataIndex: "SchoolLevel",
        //   key: "SchoolLevel",
        //   render: (SchoolLevel) => {
        //     return (
        //       <span title={SchoolLevel.title} className="SchoolLevel">
        //         {SchoolLevel.title ? SchoolLevel.title : "--"}
        //       </span>
        //     );
        //   },
        // },
        {
          title: isUniv ? "学制" : "学校类型",
          align: "center",
          width: 100,
          dataIndex: "SchoolSessionType",
          key: "SchoolSessionType",
          render: (SchoolSessionType) => {
            return (
              <span title={SchoolSessionType.more} className="SchoolLevel">
                {SchoolSessionType.title ? SchoolSessionType.title : "--"}
              </span>
            );
          },
        },
        // {
        //   title: "学生人数",
        //   align: "center",
        //   width: 90,
        //   dataIndex: "StudentCount",
        //   key: "StudentCount",
        //   render: (StudentCount) => {
        //     return (
        //       <span title={StudentCount} className="SchoolLevel">
        //         {StudentCount ? StudentCount : "0"}
        //       </span>
        //     );
        //   },
        // },
        // {
        //   title: "教职工人数",
        //   align: "center",
        //   width: 90,
        //   dataIndex: "TeacherAndWorkerCount",
        //   key: "TeacherAndWorkerCount",
        //   render: (TeacherAndWorkerCount) => {
        //     return (
        //       <span title={TeacherAndWorkerCount} className="SchoolLevel">
        //         {TeacherAndWorkerCount ? TeacherAndWorkerCount : "0"}
        //       </span>
        //     );
        //   },
        // },

        {
          title: "联系人",
          align: "center",
          width: 100,
          dataIndex: "SchoolLink",
          key: "SchoolLink",
          render: (SchoolLink) => {
            return (
              <span className="SchoolLink">
                <span
                  className="SchoolLinkman"
                  title={
                    SchoolLink.SchoolLinkman ? SchoolLink.SchoolLinkman : "--"
                  }
                >
                  {SchoolLink.SchoolLinkman ? SchoolLink.SchoolLinkman : "--"}
                </span>
                <span
                  className="SchoolTel"
                  title={SchoolLink.SchoolTel ? SchoolLink.SchoolTel : "--"}
                >
                  {SchoolLink.SchoolTel ? SchoolLink.SchoolTel : "--"}
                </span>
              </span>
            );
          },
        },
        {
          title: "学校人数",
          align: "center",
          width: 80,
          dataIndex: "SchoolTotlaCount",
          key: "SchoolTotlaCount",
          render: (SchoolTotlaCount) => {
            return (
              <span title={SchoolTotlaCount} className="SchoolLevel">
                {SchoolTotlaCount ? SchoolTotlaCount : "0"}
              </span>
            );
          },
        },
        {
          title: "管理员账号",
          align: "center",
          width: 130,
          dataIndex: "AdminAccount",
          key: "AdminAccount",
          render: (AdminAccount) => {
            return (
              <span title={AdminAccount} className="AdminAccount">
                {AdminAccount ? AdminAccount : "--"}
              </span>
            );
          },
        },
        // {
        //   title: "状态",
        //   align: "center",
        //   width: 90,
        //   dataIndex: "SchoolState",
        //   key: "SchoolState",
        //   render: (SchoolState) => {
        //     return (
        //       <span
        //         title={SchoolState.title}
        //         className={`SchoolLevel ${
        //           SchoolState.value === 1 ? "School-open" : "School-close"
        //         }`}
        //       >
        //         {SchoolState.title ? SchoolState.title : "--"}
        //       </span>
        //     );
        //   },
        // },
        {
          title: "运行时长",
          align: "center",
          width: 120,
          dataIndex: "Runtime",
          key: "Runtime",
          render: (Runtime) => {
            return (
              <span title={Runtime} className="Runtime">
                {Runtime ? Runtime : "--"}
              </span>
            );
          },
        },
        {
          title: "操作",
          align: "center",
          key: "Key",
          width: 200,
          // dataIndex: "Key",
          render: (data) => {
            // console.log(data.SchoolID)

            return (
              <div className="handle-content">
                <span
                  color="blue"
                  type="default"
                  onClick={this.onSchoolCloseClick.bind(this, data.orderNo)}
                  className="handle-btn switch-btn"
                >
                  {data.SchoolState.value === 1 ? "关闭" : "开启"}
                </span>
                <span
                  color="blue"
                  type="default"
                  onClick={this.onSchoolEditClick.bind(this, data.orderNo)}
                  className="handle-btn edit-btn"
                >
                  编辑
                </span>
                <span
                  color="blue"
                  type="default"
                  onClick={this.onSchoolDeleteClick.bind(this, data.orderNo)}
                  className="handle-btn delete-btn"
                >
                  删除
                </span>
              </div>
            );
          },
        },
      ],
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
      ImgDefault: [true, true, true, true, true, true, true, true],
    };
    this.AreaCheck = createRef();
    this.SchoolType = createRef();
  }
  componentWillReceiveProps(nextProps) {
    const { DataState } = nextProps;
  }

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
        close: this.onAppAlertClose.bind(this),
      })
    );
  };
  // 确认删除
  onDeleteOK = (WebsiteIds) => {
    const { dispatch, DataState } = this.props;
    let pageParam = "&pageSize=8&currentIndex=" + this.state.pagination;

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
        WebsiteIds: WebsiteIds,
      },
      2
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "操作成功",
              onHide: this.onAlertWarnHide.bind(this),
            })
          );
          dispatch(actions.UpDataState.getWebsiteResourceData(Url));
          this.setState({
            checkList: [],
            checkAll: false,
            // pagination: 1,
            pageParam: "&pageSize=8&currentIndex=" + this.state.pagination,
            ImgType: [true, true, true, true, true, true, true, true],
            ImgDefault: [true, true, true, true, true, true, true, true],
          });
        }
      });
  };
  // 添加弹窗成功-关闭
  AddModalOk = () => {
    const { dispatch, DataState, UIState } = this.props;
    let {
      provinceID,
      showProvinceTip,
      hideProvinceTip,
      cityID,
      hideCityTip,
      showCityTip,
      countyID,
      showCountyTip,
      hideCountyTip,
    } = this.AreaCheck.current;
    let data = {};
    if (this.SchoolType.current) {
      let {
        CheckSchoolType,
        SchoolSessionType,
        SchoolType,
      } = this.SchoolType.current;
      if (CheckSchoolType()) {
        return;
      }
      data = { SchoolSessionType, SchoolType };
      // data.SchoolSessionType =SchoolSessionType
      // data.SchoolType =SchoolType
    } else {
      data = {
        SchoolLevel: 1,
        SchoolType: 1,
      };
    }

    // console.log(this.AreaCheck.current);
    dispatch(
      UpDataState.checkAllData(() => {
        //判断省市县
        if (provinceID) {
          // provinceOk = true;

          hideProvinceTip();
        } else {
          showProvinceTip();
          return;
        }

        if (cityID) {
          // cityOk = true;

          hideCityTip();
        } else {
          showCityTip();
          return;
        }

        if (countyID) {
          // countyOk = true;

          hideCountyTip();
        } else {
          showCountyTip();
          return;
        }
        dispatch(
          UpDataState.AddSchoolInfo(
            () => {
              dispatch({ type: UpUIState.ADD_MODAL_CLOSE });
              this.ModalDataInit();
              dispatch(UpDataState.QuerySchoolInfo({}));
            },
            { CountyID: countyID, ...data }
          )
        );
      })
    );
  };
  // 窗口数据初始化
  ModalDataInit = () => {
    const { dispatch, DataState, UIState } = this.props;

    dispatch({ type: UpUIState.APP_TIPS_ALL_CLOSE });
    dispatch(UpDataState.SetSchoolModalInitData({}));
  };
  // 添加弹窗关闭
  AddModalCancel = () => {
    const { dispatch, DataState } = this.props;
    dispatch({ type: UpUIState.ADD_MODAL_CLOSE });
    this.ModalDataInit();
  };

  // 编辑弹窗成功-关闭
  EditModalOk = () => {
    const { dispatch, DataState, UIState } = this.props;
    let {
      provinceID,
      showProvinceTip,
      hideProvinceTip,
      cityID,
      hideCityTip,
      showCityTip,
      countyID,
      showCountyTip,
      hideCountyTip,
    } = this.AreaCheck.current;
    // let {
    //   CheckSchoolType,
    //   SchoolSessionType,
    //   SchoolType,
    // } = this.SchoolType.current;
    // if (CheckSchoolType()) {
    //   return;
    // }

    let data = {};
    let isUniv = false
    if (this.SchoolType.current) {
      let {
        CheckSchoolType,
        SchoolSessionType,
        SchoolType,
      } = this.SchoolType.current;
      if (CheckSchoolType()) {
        return;
      }
      data = { SchoolSessionType, SchoolType };
      // data.SchoolSessionType =SchoolSessionType
      // data.SchoolType =SchoolType
    } else {
      data = {
        SchoolLevel: 1,
        SchoolType: 1,
      };
      isUniv=true
    }
    // console.log(this.AreaCheck.current);

    dispatch(
      UpDataState.checkAllData(() => {
        //判断省市县
        if (provinceID) {
          // provinceOk = true;

          hideProvinceTip();
        } else {
          showProvinceTip();
          return;
        }

        if (cityID) {
          // cityOk = true;

          hideCityTip();
        } else {
          showCityTip();
          return;
        }

        if (countyID) {
          // countyOk = true;

          hideCountyTip();
        } else {
          showCountyTip();
          return;
        }
        dispatch(
          UpDataState.EditSchoolInfo(
            () => {
              dispatch({ type: UpUIState.EDIT_MODAL_CLOSE });
              this.ModalDataInit();
              dispatch(UpDataState.QuerySchoolInfo({}));
            },
            { CountyID: countyID, ...data,isUniv }
          )
        );
      })
    );
  };

  // 编辑弹窗关闭
  EditModalCancel = () => {
    const { dispatch, DataState } = this.props;
    dispatch({ type: UpUIState.EDIT_MODAL_CLOSE });
    this.ModalDataInit();
  };

  // 复选
  onCheckBoxClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  // 学校状态选择
  onStatusDropMenuChange = (e) => {
    const { dispatch } = this.props;
    dispatch(UpDataState.SetSchoolStatusData(e));
  };
  // 当laoding时阻止二次点击
  preventDoubleClick = () => {
    let { dispatch, UIState } = this.props;
    if (UIState.AppLoading.TableLoading) {
      return true;
    } else {
      return false;
    }
  };
  // 多选
  onCheckBoxGroupChange = (e) => {
    const { dispatch, DataState } = this.props;
    let checkAll = false;
    if (e.length === DataState.SchoolData.keyList.length) {
      checkAll = true;
    }
    dispatch(UpDataState.SetMainEditData({ checkList: e, checkAll }));
  };
  // 多选
  onCheckAllChange = (e) => {
    const { dispatch, DataState } = this.props;

    dispatch(
      UpDataState.SetMainEditData({
        checkList: e.target.checked ? DataState.SchoolData.keyList : [],
        checkAll: e.target.checked,
      })
    );
  };
  //  批量删除
  onDeleteAllClick = () => {
    const { dispatch, DataState } = this.props;
    let { checkList } = DataState.CommonData.MainEditData;
    let { SchoolList } = DataState.SchoolData;
    let SchoolIDs = "";
    let SchoolIDArr = [];
    checkList instanceof Array &&
      checkList.map((child, index) => {
        SchoolIDArr.push(SchoolList[child].SchoolID);
      });
    SchoolIDs = SchoolIDArr.join();
    dispatch(
      actions.UpUIState.showErrorAlert({
        title: "确定删除所选择的学校吗？",
        onOk: () => {
          dispatch(UpUIState.hideErrorAlert());
          dispatch(
            UpDataState.DeleteSchoolInfoPatch(SchoolIDs, () => {
              dispatch(UpDataState.QuerySchoolInfo({}));
            })
          );
        },
      })
    );
  };

  //  搜索
  onSchoolSearch = () => {
    const { dispatch, DataState } = this.props;
    dispatch(
      UpDataState.SetQuerySchoolParams({
        currentIndex: 1,
      })
    );
    dispatch(actions.UpDataState.QuerySchoolInfo({}));
  };
  onChangeSearch = (e) => {
    const { dispatch, DataState } = this.props;
    dispatch(
      UpDataState.SetQuerySchoolParams({
        searchValue: e.target.value,
        keyWord: e.target.value,
        CancelBtnShow: "y",
      })
    );
  };
  onCancelSearch = () => {
    const { dispatch, DataState } = this.props;
    dispatch(UpDataState.InitQuerySchoolParams());
    dispatch(actions.UpDataState.QuerySchoolInfo({}));
  };
  onPagiNationChange = (e) => {
    const { dispatch, DataState } = this.props;

    dispatch(
      UpDataState.SetQuerySchoolParams({
        currentIndex: e,
      })
    );
    dispatch(actions.UpDataState.QuerySchoolInfo({}));
  };
  // 添加学校
  onAddSchoolClick = () => {
    const { dispatch, DataState } = this.props;

    dispatch(UpDataState.SetSchoolModalInitData({}));
    dispatch({ type: UpUIState.ADD_MODAL_OPEN });
  };
  // 选择状态
  onStatusDropMenuChange = (e) => {
    const { dispatch, DataState } = this.props;
    dispatch(UpDataState.InitQuerySchoolParams());
    dispatch(UpDataState.SetSchoolStatusData(e));
    dispatch(actions.UpDataState.QuerySchoolInfo({}));
  };
  // 关闭
  onSchoolCloseClick = (orderNo) => {
    const { dispatch, DataState } = this.props;
    let { SchoolState, SchoolID } = DataState.SchoolData.SchoolList[
      orderNo.key
    ];
    let State = "";
    if (SchoolState.value === 1) {
      State = 2;
    } else {
      State = 1;
    }
    // console.log(State,SchoolID)
    dispatch(
      UpDataState.UpdateSchoolState(State, SchoolID, () => {
        dispatch(UpDataState.QuerySchoolInfo({}));
      })
    );
  };
  // 编辑
  onSchoolEditClick = (key) => {
    const { dispatch, DataState } = this.props;
    let { SchoolList } = DataState.SchoolData;
    let {
      SchoolName,
      SchoolCode,
      SchoolLevel,
      SchoolSessionType,
      SchoolLink,
      SchoolImgUrl,
      SchoolID,
      CityID,
      CountyID,
      ProvinceID,
      SchoolImgUrl_Long,
    } = SchoolList[key.key];
    let { SchoolLinkman, SchoolTel } = SchoolLink;

    dispatch(
      UpDataState.SetSchoolModalInitData({
        SchoolName,
        SchoolCode,
        SchoolLevel,
        SchoolSessionType,
        SchoolImgUrl,
        SchoolID,
        SchoolLinkman,
        SchoolTel,
        CityID,
        CountyID,
        ProvinceID,
        SchoolImgUrl_Long,
      })
    );
    dispatch({ type: UpUIState.EDIT_MODAL_OPEN });
  };
  // 删除
  onSchoolDeleteClick = (orderNo) => {
    const { dispatch, DataState } = this.props;
    let { SchoolID } = DataState.SchoolData.SchoolList[orderNo.key];

    dispatch(
      actions.UpUIState.showErrorAlert({
        title: "确定删除该学校吗？",
        onOk: () => {
          dispatch(UpUIState.hideErrorAlert());
          dispatch(
            UpDataState.DeleteSchoolInfo(SchoolID, () => {
              dispatch(UpDataState.QuerySchoolInfo({}));
            })
          );
        },
      })
    );
  };
  render() {
    const { DataState, UIState } = this.props;
    const { CommonData, SchoolData } = DataState;
    let {
      SchoolList,
      Total,
      TotalSchoolCount,
      CurrentPage,
      ClosedCount,
    } = SchoolData;
    let { checkList, checkAll } = CommonData.MainEditData;
    let {
      keyWord,
      searchValue,
      CancelBtnShow,
      pageSize,
    } = CommonData.QuerySchoolParams;
    // 加中职和幼儿园,当做大学处理ProductUseRange为5，8，10，11
    let { ProductUseRange } = sessionStorage.getItem("LgBasePlatformInfo")
      ? JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"))
      : {};
    ProductUseRange = parseInt(ProductUseRange);
    let isUniv =
      ProductUseRange === 5 ||
      ProductUseRange === 8 ||
      ProductUseRange === 10 ||
      ProductUseRange === 11;
    let isMiddle = ProductUseRange === 5 || ProductUseRange === 8; //中职
    return (
      <div id="Main" className="Main Content">
        <div className="Main-top">
          <span className="top-name">学校信息管理</span>
          <div
            onClick={this.onAddSchoolClick.bind(this)}
            className=" top-right btn-box"
          >
            <i className="btn-icon-add"></i>
            <span className="btn-title">创建学校</span>
          </div>
        </div>
        <div className="Main-hr"></div>
        <div className="Main-content">
          <div className="top-box top-left period-box">
            <span className="box-tips">访问状态:</span>
            <DropDown
              ref="Status-DropMenu"
              className="box-dropmenu period-dropmenu"
              onChange={this.onStatusDropMenuChange.bind(this)}
              width={108}
              height={240}
              dropSelectd={CommonData.SchoolStatusData.StatusMainSelect}
              dropList={CommonData.SchoolStatusData.StatusList}
            ></DropDown>
            <span className="Status-data-box">
              总共有
              <span className="Status-data-red">[{TotalSchoolCount}]</span>
              所学校，其中
              <span className="Status-data-red">[{ClosedCount}]</span>
              所学校已关闭访问
            </span>
            <Search
              placeHolder="请输入学校名称或代码进行搜索..."
              onClickSearch={this.onSchoolSearch.bind(this)}
              height={30}
              width={270}
              className="search"
              Value={searchValue}
              onCancelSearch={this.onCancelSearch}
              onChange={this.onChangeSearch.bind(this)}
              CancelBtnShow={CancelBtnShow}
            ></Search>
          </div>

          {SchoolList instanceof Array && SchoolList.length > 0 ? (
            <CheckBoxGroup
              value={checkList}
              onChange={this.onCheckBoxGroupChange.bind(this)}
            >
              <Table
                className="table"
                loading={UIState.AppLoading.TableLoading}
                columns={this.state.columns}
                pagination={false}
                // onChange={this.onTableChange.bind(this)}
                dataSource={SchoolList}
              ></Table>
            </CheckBoxGroup>
          ) : (
            <Empty
              type="4"
              className="Empty"
              title={
                CommonData.QuerySchoolParams.keyWord !== "" ||
                CommonData.QuerySchoolParams.Status !== 0
                  ? "暂无符合条件的学校"
                  : "暂无学校"
              }
            ></Empty>
          )}
        </div>

        <div className="Main-event-box">
          {SchoolList instanceof Array && SchoolList.length > 0 ? (
            <div>
              <CheckBox
                // type="gray"
                className="checkBox-All"
                checked={checkAll}
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
            current={CurrentPage}
            hideOnSinglepage={true}
            pageSize={pageSize}
            total={Total}
            onChange={this.onPagiNationChange.bind(this)}
          ></PagiNation>
        </div>
        {/* 模态框 */}
        <Modal
          bodyStyle={{ padding: 0, height: isUniv ? "340px" : "420px" }}
          type="1"
          title={"创建学校"}
          width={700}
          visible={UIState.AppModal.AddModal}
          destroyOnClose={true}
          onOk={this.AddModalOk}
          onCancel={this.AddModalCancel}
        >
          {/* <Loading spinning={UIState.AppLoading.modalLoading}> */}
          {UIState.AppModal.AddModal ? (
            <SchoolModal
              // getAreaCheck={(AreaCheck) => {
              //   this.AreaCheck.current = AreaCheck;
              // }}
              AreaCheck={this.AreaCheck}
              SchoolType={this.SchoolType}
              ref={(ref) => (this.AreaCheckRef = ref)}
              type="add"
              isUniv={isUniv}
              isMiddle={isMiddle}
            ></SchoolModal>
          ) : (
            ""
          )}
          {/* </Loading> */}
        </Modal>
        <Modal
          bodyStyle={{ padding: 0,height: isUniv ? "340px" : "420px" }}
          type="1"
          title={"编辑学校"}
          width={700}
          destroyOnClose={true}
          visible={UIState.AppModal.EditModal}
          onOk={this.EditModalOk}
          onCancel={this.EditModalCancel}
        >
          {/* <Loading spinning={UIState.AppLoading.modalLoading}> */}
          {UIState.AppModal.EditModal ? (
            <SchoolModal
              // getAreaCheck={(AreaCheck) => {
              //   this.AreaCheck.current = AreaCheck;
              // }}
              // ref={this.AreaCheck}
              AreaCheck={this.AreaCheck}
              SchoolType={this.SchoolType}
              isUniv={isUniv}
              isMiddle={isMiddle}
              type="edit"
            ></SchoolModal>
          ) : (
            ""
          )}
          {/* </Loading> */}
        </Modal>
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
export default connect(mapStateToProps)(Main);
