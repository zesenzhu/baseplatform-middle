import React from "react";
import { connect } from "react-redux";
import actions from "../actions";
import "../../scss/CourseClassDetails.scss";


import { Table, Button, DetailsModal, Empty } from "../../../common";
import { Scrollbars } from "react-custom-scrollbars";

import {getQueryVariable} from "../../../common/js/disconnect";

class CourseClassDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "序号",
          align: "center",
          key: "OrderNO",
          width: 90,
          dataIndex: "OrderNO",
          render: OrderNO => {
            return (
              <span className="key-content">
                {OrderNO >= 10 ? OrderNO : "0" + OrderNO}
              </span>
            );
          }
        },
        {
          title: "姓名",
          align: "center",
          width: 164,
          dataIndex: "StudentName",
          key: "StudentName",
          render: StudentName => {
            return (
              <span
                title={StudentName.StudentName}
                className="StudentName-name"
              >
                {StudentName.StudentName}
              </span>
            );
          }
        },
        {
          title: "学号",
          width: 164,
          align: "center",
          dataIndex: "StudentID",
          key: "StudentID",
          render: StudentID => {
            return (
              <span title={StudentID} className="StudentID">
                { StudentID }
              </span>
            );
          }
        },
        {
          title: "性别",
          width: 70,
          align: "center",
          dataIndex: "Gender",
          key: "Gender",
          render: Gender => {
            return (
              <span title={Gender} className="Gender">
                {Gender ? Gender : "--"}
              </span>
            );
          }
        },
        {
          title: "所属行政班",
          width: 230,
          align: "center",
          key: "Class",
          dataIndex: "Class",
          render: Class => {
            return (
              <span
                title={Class.Grade + ">" + Class.Class}
                className="Grade-Class"
              >
                {Class.Grade + ">" + Class.Class}
              </span>
            );
          }
        }
      ],
      UserMsg: props.DataState.LoginUser
    };
  }

  //点击头部任课教师
  onTeacherNameClick = id => {

    const { dispatch } = this.props;

      const token = sessionStorage.getItem("token");

      const lg_ic = getQueryVariable('lg_ic');

      window.open(`/html/userPersona/index.html?userID=${id}&userType=1&lg_tk=${token}&lg_ic=${lg_ic}`);


      // dispatch(actions.UpDataState.getTeacherMsg("/GetUserDetail?userID=" + id));
  };
  //关闭教师详情弹窗
  TeacherMsgModalCancel = () => {
    const { dispatch } = this.props;
    dispatch({ type: actions.UpUIState.SUBJECT_DETAILS_MODAL_CLOSE });
  };

  render() {
    const { DataState, UIState } = this.props;
    let GetCourseClassDetailsMsg = DataState.GetCourseClassDetailsMsg;
    let dataSource = GetCourseClassDetailsMsg
      ? GetCourseClassDetailsMsg.TableSource
      : [];
    // console.log(GetCourseClassDetailsMsg)
    return (
      <React.Fragment>
        <div className="CourseClassDetails">
          <div className="details-tips">
            <span
              title={
                GetCourseClassDetailsMsg
                  ? GetCourseClassDetailsMsg.CourseClassName
                  : ""
              }
              className="tips-content className"
            >
              {GetCourseClassDetailsMsg
                ? GetCourseClassDetailsMsg.CourseClassName
                : ""}
            </span>
            <span className="tips-content classTeacher">
              <span className="tips">任课教师：</span>
              {GetCourseClassDetailsMsg ? (
                GetCourseClassDetailsMsg.TeacherID ? (
                  <span
                    onClick={this.onTeacherNameClick.bind(
                      this,
                      GetCourseClassDetailsMsg.TeacherID
                    )}
                    title={
                      GetCourseClassDetailsMsg.TeacherName +
                      "(" +
                      GetCourseClassDetailsMsg.TeacherID +
                      ")"
                    }
                  >
                    {GetCourseClassDetailsMsg.TeacherName +
                      "(" +
                      GetCourseClassDetailsMsg.TeacherID +
                      ")"}
                  </span>
                ) : (
                  "--"
                )
              ) : (
                "--"
              )}
            </span>
            <span
              title={
                GetCourseClassDetailsMsg
                  ? GetCourseClassDetailsMsg.SubjectName
                  : ""
              }
              className="tips-content subject"
            >
              <span className="tips">学科：</span>
              {GetCourseClassDetailsMsg
                ? GetCourseClassDetailsMsg.SubjectName
                : ""}
            </span>
            <span
              title={
                GetCourseClassDetailsMsg
                  ? GetCourseClassDetailsMsg.GradeName
                  : ""
              }
              className="tips-content grade"
            >
              <span className="tips">年级：</span>
              {GetCourseClassDetailsMsg
                ? GetCourseClassDetailsMsg.GradeName
                : ""}
            </span>
            <span
              title={
                GetCourseClassDetailsMsg
                  ? GetCourseClassDetailsMsg.StudentCount
                  : ""
              }
              className="tips-content studentCount"
            >
              <span className="tips">学生人数：</span>
              {GetCourseClassDetailsMsg
                ? GetCourseClassDetailsMsg.StudentCount
                : ""}
            </span>
          </div>
          <div style={{display:dataSource instanceof Array && dataSource.length > 0?'block':'none'}} className="table-head">
            <span className="table-head-th">
              <span className="ant-table-header-column">
                <div>
                  <span className="ant-table-column-title">序号</span>
                </div>
              </span>
            </span>
            <span className="table-head-th">
              <span className="ant-table-header-column">
                <div>
                  <span className="ant-table-column-title">姓名</span>
                </div>
              </span>
            </span>
            <span className="table-head-th">
              <span className="ant-table-header-column">
                <div>
                  <span className="ant-table-column-title">学号</span>
                </div>
              </span>
            </span>
            <span className="table-head-th">
              <span className="ant-table-header-column">
                <div>
                  <span className="ant-table-column-title">性别</span>
                </div>
              </span>
            </span>
            <span className="table-head-th">
              <span className="ant-table-header-column">
                <div>
                  <span className="ant-table-column-title">所属行政班</span>
                </div>
              </span>
            </span>
          </div>
          <div style={{ height: "28px" }}></div>
          {dataSource instanceof Array && dataSource.length > 0 ? (
            <Scrollbars style={{ width: 100 + "%", height: 390 + "px" }}>
              <Table
                // scroll={{y:true}}
                className="table"
                columns={this.state.columns}
                pagination={false}
                showHeader={false}
                dataSource={dataSource}
              ></Table>
            </Scrollbars>
          ) : (
            <Empty
              type="4"
              title={"暂无学生"}
              style={{ marginTop: "200px", transform: "translateY(-50%)" }}
            ></Empty>
          )}
        </div>
        <DetailsModal
          ref="SubjectDetailsMsgModal"
          mask={false}
          visible={UIState.SubjectDetailsMsgModalShow.Show}
          onCancel={this.TeacherMsgModalCancel}
          data={DataState.TeacherMsg ? DataState.TeacherMsg.data : {}}
          type="teacher"
        ></DetailsModal>
      </React.Fragment>
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
export default connect(mapStateToProps)(CourseClassDetails);
