import React from "react";
import { connect } from "react-redux";
import actions from "../actions";
import "../../scss/Class.scss";
import { postData, getData } from "../../../common/js/fetch";

import history from "../containers/history";
import CONFIG from "../../../common/js/config";
import {
  Table,
  Button,
  PagiNation,
  CheckBox,
  CheckBoxGroup,
  Empty,
  Loading
} from "../../../common";

class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "序号",
          align: "left",
          key: "OrderNO",
          width: 158,
          dataIndex: "OrderNO",
          render: OrderNO => {
            return (
              <div className="CheckBox-content">
                <label>
                  <CheckBox
                    value={OrderNO.key}
                    type="gray"
                    onChange={this.onTableCheckBoxChange.bind(this)}
                  ></CheckBox>
                  <span className="key-content">
                    {OrderNO.OrderNO >= 10
                      ? OrderNO.OrderNO
                      : "0" + OrderNO.OrderNO}
                  </span>
                </label>
              </div>
            );
          }
        },
        {
          title: "班级名称",
          align: "left",
          dataIndex: "CourseClass",
          width: 150,
          key: "CourseClass",
          render: courseClass => {
            return (
              <React.Fragment>
                <span
                  title={courseClass.ClassName}
                  onClick={this.onCourseClassClick.bind(
                    this,
                    courseClass.ClassID
                  )}
                  className="courseClass-name"
                >
                  {courseClass.ClassName}
                </span>
              </React.Fragment>
            );
          }
        },
        {
          title: "任课教师",
          align: "center",
          dataIndex: "ClassMsg",
          width: 200,
          key: "ClassMsg",
          render: Class => {
            return Class.TeacherID === 0 || Class.TeacherID ? (
              <React.Fragment>
                <img
                  className="Class-img"
                  alt={Class.TeacherName}
                  src={Class.TeacherImg}
                />
                <span title={Class.TeacherName} className="Class-name">
                  {Class.TeacherName}
                </span>
                <span title={Class.TeacherID} className="Class-id">
                  (<span> {Class.TeacherID}</span>)
                </span>
              </React.Fragment>
            ) : (
              <span>--</span>
            );
          }
        },
        {
          title: "学生人数",
          align: "center",
          dataIndex: "StudentCount",
          width: 165,
          key: "StudentCount",
          render: StudentCount => {
            return (
              <span title={StudentCount} className="StudentCount">
                {StudentCount}
              </span>
            );
          }
        },
        {
          title: "操作",
          align: "center",
          width: 185,
          key: "handle",
          dataIndex: "key",
          render: key => {
            return (
              <div className="handle-content">
                <Button
                  color="blue"
                  type="default"
                  onClick={this.onHandleClassClick.bind(this, key)}
                  className="handle-btn"
                >
                  编辑
                </Button>
                <Button
                  color="blue"
                  type="default"
                  onClick={this.onDeleteClassClick.bind(this, key)}
                  className="handle-btn"
                >
                  删除
                </Button>
              </div>
            );
          }
        }
      ],
      pagination: 1,
      checkedList: [],
      checkAll: false,
      UserMsg: props.DataState.LoginUser,
      Subjects: {},
      pageSize:props.DataState.SetPagiSizeMsg.ClassPagisize
    };
  }

  //钩子函数
  componentWillReceiveProps(nextProps) {
    const { DataState, UIState } = nextProps;

    let options = [];
    let tableSource = nextProps.DataState.GetClassAllMsg.allClass.TableData
      ? nextProps.DataState.GetClassAllMsg.allClass.TableData
      : [];
    options =
      tableSource instanceof Array &&
      tableSource.map((child, index) => {
        return index;
      });
    // console.log(nextProps.DataState.GetClassAllMsg.allClass.pageIndex,this.state.pagination)
    // 页码
    if (
      nextProps.DataState.GetClassAllMsg.allClass.pageIndex &&
      nextProps.DataState.GetClassAllMsg.allClass.pageIndex !==
        this.state.pagination
    ) {
      this.setState({
        pagination: nextProps.DataState.GetClassAllMsg.allClass.pageIndex
      });
    }
    this.setState({
      options: options
    });

    let route = history.location.pathname;
    let pathArr = route.split("/");
    let handleRoute = pathArr[1];
    let routeID = pathArr[2];
    let subjectID = pathArr[3];
    let classID = pathArr[4];
    // let isExist = false;
    if (!routeID) {
      return;
    }
    if (!(DataState.GetCoureClassAllMsg.Subjects instanceof Object)) {
      return;
    }
    if (this.state.Subjects === DataState.GetCoureClassAllMsg.Subjects) {
      return;
    }
    this.setState({
      Subjects: DataState.GetCoureClassAllMsg.Subjects
    });
    let isExist = false;

    for (let index in DataState.GetCoureClassAllMsg.Subjects) {
      if (index === routeID) {
        isExist = true;
      }
    }
    if (!isExist) {
      history.push("/All");
    }
  }
  // componentWillMount() {
  //   const { DataState, UIState } = this.props;
  //   if (
  //     !(DataState.GetCoureClassAllMsg.Subjects instanceof Object) ||
  //     DataState.GetClassAllMsg.allClass.subject === undefined
  //   ) {
  //     return;
  //   }
  //   let isExist = false;

  //   for (let index in DataState.GetCoureClassAllMsg.Subjects) {
  //     if (index === DataState.GetClassAllMsg.allClass.subject) {
  //       isExist = true;
  //     }
  //   }
  //   if (!isExist) {
  //     history.push("/All");
  //   }
  // }
  //列表复选框改变事件
  onTableCheckBoxChange = e => {
    //console.log(e.target.value)
    const { DataState, UIState } = this.props;
    let checkedList = this.state.checkedList;
  };
  //列表班级点击事件
  onCourseClassClick = classID => {
    // console.log('ss' + classID)
    const { dispatch, DataState, UIState } = this.props;
    dispatch(actions.UpUIState.CourseClassDetailsModalOpen());
    dispatch(
      actions.UpDataState.getCourseClassDetailsMsg(
        "/GetCourseClassDetail?courseClassID=" + classID
      )
    );
  };
  //列表操作编辑点击事件
  onHandleClassClick = key => {
    const { dispatch, DataState, UIState } = this.props;
    let ClassID =
      DataState.GetClassAllMsg.allClass.TableData[key].CourseClass.ClassID;
    // console.log(key)

    dispatch(actions.UpUIState.ChangeCourseClassModalOpen());
    dispatch(
      actions.UpDataState.getCourseClassDetailsHandleClassMsg(
        "/GetCourseClassDetail?courseClassID=" + ClassID
      )
    );
  };
  //列表操作删除点击事件
  onDeleteClassClick = key => {
    const { dispatch, DataState, UIState } = this.props;
    let checkedList = this.state.checkedList;
    let len = checkedList.length;
    let source = DataState.GetClassAllMsg.allClass.TableData;
    //console.log(key)
    let courseClassID = source[key].CourseClass.ClassID;
    dispatch(
      actions.UpUIState.showErrorAlert({
        type: "btn-warn",
        title: "确定删除所勾选的教学班吗？",
        ok: this.onAppAlertDeleteOK.bind(this, courseClassID),
        cancel: this.onAppAlertCancel.bind(this),
        close: this.onAppAlertClose.bind(this)
      })
    );
  };
  //列表分页改变事件
  onPagiNationChange = (value)=> {
    const { dispatch, DataState } = this.props;

    let route = history.location.pathname;
    let pathArr = route.split("/");
    let handleRoute = pathArr[1];
    let routeID = pathArr[2];
    let subjectID = pathArr[3];
    let classID = pathArr[4];
    dispatch(
      actions.UpDataState.getClassAllMsg(
        "/GetGradeCouseclassDetailForPage?schoolID=" +
          this.state.UserMsg.SchoolID +
          "&pageIndex=" +
          value +
          "&key=&pageSize="+this.state.pageSize+"&subjectID=" +
          routeID +
          "&gradeID=" +
          classID,
        routeID,
        classID
      )
    );
    this.setState({
      // pagination: value,
      checkedList: [],
      checkAll: false
    });
  };
  // 页数改变
  onPagiSizeChange = (current,size) => {
    const { dispatch, DataState } = this.props;
    let route = history.location.pathname;
    let pathArr = route.split("/");
    let handleRoute = pathArr[1];
    let routeID = pathArr[2];
    let subjectID = pathArr[3];
    let classID = pathArr[4];
    // console.log(current,size)
    dispatch(
      actions.UpDataState.getClassAllMsg(
        "/GetGradeCouseclassDetailForPage?schoolID=" +
          this.state.UserMsg.SchoolID +
          "&pageIndex=" +
          1 +
          "&key=&pageSize="+size+"&subjectID=" +
          routeID +
          "&gradeID=" +
          classID,
        routeID,
        classID
      )
    );
    dispatch(actions.UpDataState.ClassPagisizeMsg(size))
    this.setState({
      pageIndex:1,
      pageSize:size,
      checkedList: [],
      checkAll: false
    })

  }
  //列表多选
  onCheckBoxGroupChange = value => {
    let checkAll = false;
    if (value.length === this.state.options.length) {
      checkAll = true;
    }
    this.setState({
      checkedList: value,
      checkAll: checkAll
    });
  };
  //列表全选
  OnCheckAllChange = e => {
    //console.log(e.target,this.state.options)
    const { DataState, UIState } = this.props;

    let checkList = [];
    if (e.target.checked) {
      checkList = this.state.options;
    } else {
      checkList = [];
    }
    this.setState({
      checkAll: e.target.checked,
      checkedList: checkList
    });
  };
  //全选删除
  onDeleteAllClick = () => {
    const { dispatch, DataState } = this.props;
    let checkedList = this.state.checkedList;
    let len = checkedList.length;
    let courseClassID = [];
    let source = DataState.GetClassAllMsg.allClass.TableData;
    // checkedList.map((child, index) => {
    //     // if (index !== len - 1)
    //     courseClassID = source[child].CourseClass.ClassID + ',';
    //     // else
    //     //     courseClassID = source[child].CourseClass.ClassID;

    // })
    checkedList.map((child, index) => {
      courseClassID.push(source[child].CourseClass.ClassID);
    });
    courseClassID = courseClassID.join();

    // console.log(this.state.checkedList)
    if (len === 0) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "请先勾选所要删除的教学班",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this)
        })
      );
    } else {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-warn",
          title: "确定删除勾选的教学班吗？",
          ok: this.onAppAlertDeleteAllOK.bind(this, courseClassID),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this)
        })
      );
    }
  };
  //通用提示弹窗
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

  //删除提示框
  onAppAlertDeleteAllOK = id => {
    const { dispatch } = this.props;
    let route = history.location.pathname;
    let pathArr = route.split("/");
    let handleRoute = pathArr[1];
    let routeID = pathArr[2];
    let subjectID = pathArr[3];
    let classID = pathArr[4];
    let url = "/DeleteCourseClass";
    dispatch(actions.UpUIState.hideErrorAlert());
    postData(
      CONFIG.CourseClassProxy + url,
      {
        courseClassIDs: id,
        schoolID: this.state.UserMsg.SchoolID,
        userID: this.state.UserMsg.UserID,
        userType: this.state.UserMsg.UserType
      },
      2,
      "json"
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 400) {
          // console.log('错误码：' + json.StatusCode)
        } else if (json.StatusCode === 200) {
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "成功",
              onHide: this.onAlertWarnHide.bind(this)
            })
          );
          this.setState({
            checkedList: [],
            checkAll: false
          });
          dispatch(
            actions.UpDataState.getClassAllMsg(
              "/GetGradeCouseclassDetailForPage?schoolID=" +
                this.state.UserMsg.SchoolID +
                "&pageIndex=" +
                this.state.pagination +
                "&key=&pageSize="+this.state.pageSize+"&subjectID=" +
                routeID +
                "&gradeID=" +
                classID,
              routeID,
              classID
            )
          );
        }
      });
  };
  //单个删除
  onAppAlertDeleteOK = id => {
    const { dispatch, DataState, UIState } = this.props;
    let route = history.location.pathname;
    let pathArr = route.split("/");
    let handleRoute = pathArr[1];
    let routeID = pathArr[2];
    let subjectID = pathArr[3];
    let classID = pathArr[4];
    let url = "/DeleteCourseClass";
    dispatch(actions.UpUIState.hideErrorAlert());
    postData(
      CONFIG.CourseClassProxy + url,
      {
        courseClassIDs: id,
        schoolID: this.state.UserMsg.SchoolID,
        userID: this.state.UserMsg.UserID,
        userType: this.state.UserMsg.UserType
      },
      2,
      "json"
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 400) {
          // console.log('错误码：' + json.StatusCode)
        } else if (json.StatusCode === 200) {
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "成功",
              onHide: this.onAlertWarnHide.bind(this)
            })
          );
          this.setState({
            checkedList: [],
            checkAll: false
          });
          dispatch(
            actions.UpDataState.getClassAllMsg(
              "/GetGradeCouseclassDetailForPage?schoolID=" +
                this.state.UserMsg.SchoolID +
                "&pageIndex=" +
                this.state.pagination +
                "&key=&pageSize="+this.state.pageSize+"&subjectID=" +
                routeID +
                "&gradeID=" +
                classID,
              routeID,
              classID
            )
          );
        }
      });
  };
  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  render() {
    const { DataState, UIState } = this.props;
    if (
      !(DataState.GetCoureClassAllMsg.Subjects instanceof Array) &&
      DataState.GetClassAllMsg.allClass.subject === undefined
    ) {
      // history.push('/All')

      return "";
    }
    let isExist = false;

    for (let index in DataState.GetCoureClassAllMsg.Subjects) {
      if (index === DataState.GetClassAllMsg.allClass.subject) {
        isExist = true;
      }
    }
    if (!isExist) {
      // history.push('/All')
      return "";
    }
    // console.log(DataState.GetClassAllMsg.allClass.subject , DataState.GetCoureClassAllMsg)
    let tips =
      DataState.GetClassAllMsg.allClass.subject &&
      DataState.GetCoureClassAllMsg.Subjects &&
      DataState.GetCoureClassAllMsg.Subjects[
        DataState.GetClassAllMsg.allClass.subject
      ].subjectName
        ? DataState.GetCoureClassAllMsg.Subjects[
            DataState.GetClassAllMsg.allClass.subject
          ].subjectName +
          "教学班>" +
          (DataState.GetCoureClassAllMsg.Subjects[
            DataState.GetClassAllMsg.allClass.subject
          ][DataState.GetClassAllMsg.allClass.Class]
            ? DataState.GetCoureClassAllMsg.Subjects[
                DataState.GetClassAllMsg.allClass.subject
              ][DataState.GetClassAllMsg.allClass.Class]
            : "")
        : "";
    let Total = DataState.GetClassAllMsg.allClass
      ? DataState.GetClassAllMsg.allClass.CourseClassCount
      : 0;
    return (
      <div className="Class">
        <div className="Class-box">
          <div className="Class-top">
            <span className="top-tips">
              <span className="tips tip-menu">{tips}</span>
            </span>
          </div>
          <div className="Class-hr"></div>
          <div className="Class-content">
            <Loading
              tip="加载中..."
              opacity={false}
              size="large"
              spinning={UIState.AppLoading.TableLoading}
            >
              <CheckBoxGroup
                style={{ width: "100%" }}
                value={this.state.checkedList}
                onChange={this.onCheckBoxGroupChange.bind(this)}
              >
                {DataState.GetClassAllMsg.allClass &&
                DataState.GetClassAllMsg.allClass.TableData instanceof Array &&
                  DataState.GetClassAllMsg.allClass.TableData.length !== 0 ? (
                  <Table
                    className="table"
                    loading={UIState.AppLoading.TableLoading}
                    columns={this.state.columns}
                    pagination={false}
                    dataSource={
                      DataState.GetClassAllMsg.allClass
                        ? DataState.GetClassAllMsg.allClass.TableData
                        : []
                    }
                  ></Table>
                ) : (
                  <Empty
                    title={"暂无教学班"}
                    type="3"
                    style={{ marginTop: "150px" }}
                  ></Empty>
                )}
              </CheckBoxGroup>
              {Total ? (
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
                    color="blue"
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
                  // defaultCurrent={DataState.GetClassAllMsg.allClass ? DataState.GetClassAllMsg.allClass.PageIndex : 1}
                  // defaultPageSize={10}
                  showSizeChanger={true}
                  pageSize={this.state.pageSize}

                  current={this.state.pagination}
                  total={
                    DataState.GetClassAllMsg.allClass
                      ? DataState.GetClassAllMsg.allClass.CourseClassCount
                      : 0
                  }
                  onShowSizeChange={this.onPagiSizeChange.bind(this)}
                  onChange={this.onPagiNationChange.bind(this)}
                ></PagiNation>
              </div>
            </Loading>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState
  };
};
export default connect(mapStateToProps)(Class);
