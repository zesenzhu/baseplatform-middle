import React, { Component } from "react";

import { connect } from "react-redux";

import TitleBar from "../../component/TitleBar";

import { Empty, Loading, Modal, DetailsModal } from "../../../../common";

import AddTeacherModal from "../../component/AddTeacherModal";

import AppAlertActions from "../../actions/AppAlertActions";

import TMActions from "../../actions/Teacher/TeacherModalActions";

import DMActions from "../../actions/DetailModalActions";

class TeacherWrapper extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;

    this.state = {
      subjectTipsShow: false,
    };
  }

  //弹出添加教师的弹窗
  TeacherModalShow(opt) {
    const { dispatch, ClassCharge } = this.props;

    switch (opt.type) {
      case 1:
        dispatch({ type: TMActions.TEACHER_TEACHER_MODAL_SHOW });

        break;

      case 2:
        dispatch({
          type: TMActions.TEACHER_TEACHER_MODAL_SHOW,
          options: {
            originTeacherShow: true,

            originTeacherInfo: opt.originTeacherInfo,

            originTeacherTitle: "原任课教师",

            newTeacherTitle: "新任课教师",

            modalTitle: "更改任课教师",

            type: 2,

            SubjectID: opt.originTeacherInfo.SubjectID,
          },
        });

        break;

      default:
        dispatch({ type: TMActions.TEACHER_TEACHER_MODAL_SHOW });
    }
    //初始化所有的教师和学科的数据
    dispatch(
      TMActions.getTeacherData({ ClassID: ClassCharge.ActiveClassID, ...opt })
    );
  }

  //选择下拉后的事件
  teacherModalDropChange(e) {
    const { dispatch } = this.props;

    dispatch({
      type: TMActions.TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_CHANGE,
      data: e,
    });

    dispatch(TMActions.teacherModalSelectChange(e));

    this.setState({ subjectTipsShow: false });
  }

  //点击选中某一个教师的事件
  itemLick(info) {
    const { dispatch } = this.props;

    dispatch({
      type: TMActions.TEACHER_TEACHER_MODAL_UPDATE_NEW_TEACHER,
      data: info,
    });
  }

  //教师弹窗输入框值变化
  teacherModalInputContentChange(e) {
    const { dispatch } = this.props;

    dispatch({
      type: TMActions.TEACHER_TEACHER_MODAL_INPUT_CHANGE,
      data: e.target.value,
    });
  }

  //教师弹窗点击搜索按钮
  teacherSearchBtnClick(e) {
    const { dispatch, Teacher } = this.props;

    const { inputContent } = Teacher.TeacherModal;

    if (inputContent !== "") {
      //输入的列表中不等于空

      dispatch(TMActions.teacherSearchBtnClick());
    } else {
      //如果等于空的时候弹框警告

      dispatch(AppAlertActions.alertWarn({ title: "请输入搜索的内容！" }));
    }
  }

  teacherSearchClose(e) {
    const { dispatch } = this.props;

    dispatch({ type: TMActions.TEACHER_TEACHER_MODAL_CLOSE_HIDE });

    dispatch({ type: TMActions.TEACHER_TEACHER_MODAL_INPUT_CHANGE, data: "" });

    dispatch(TMActions.teacherSearchClose());

    this.setState({ subjectTipsShow: false });
  }
  //点击OK的时候
  teacherModalOk(e) {
    const { dispatch, Teacher, ClassCharge } = this.props;

    const { TeacherModal } = Teacher;

    //先判断是否选中一个新的教师

    if (TeacherModal.subjectsSelect.value !== "none") {
      if (TeacherModal.newPickTeacher.id) {
        dispatch(
          TMActions.updateTeacher({ ClassID: ClassCharge.ActiveClassID })
        );
      } else {
        dispatch(AppAlertActions.alertWarn({ title: "请先选择一个老师！" }));
      }
    } else {
      // dispatch(AppAlertActions.alertWarn({title:"请先选择一个学科！"}));

      this.setState({ subjectTipsShow: true });
    }
  }

  //删除教师

  delSubjectTeacher({ SubjectID }) {
    const { dispatch, ClassCharge } = this.props;

    dispatch(
      AppAlertActions.alertQuery({
        title: "您确定要删除该学科任课教师么？",

        ok: () => {
          return (e) => {
            return dispatch(
              TMActions.delSubjectTeacher({
                ClassID: ClassCharge.ActiveClassID,
                SubjectID,
              })
            );
          };
        },
      })
    );
  }

  //关闭教师弹窗
  teacherModalHide(e) {
    const { dispatch } = this.props;

    dispatch({ type: TMActions.TEACHER_TEACHER_MODAL_HIDE });
  }

  //

  //用户详情弹窗出现

  TeacherDetailShow(Params) {
    const { dispatch } = this.props;
    let token = sessionStorage.getItem("token");
    window.open(
      "/html/userPersona#/?userType=" +
        Params.UserType +
        "&userID=" +
        Params.UserID +
        "&lg_tk=" +
        token
    );
    // dispatch(DMActions.Init(Params));
  }

  //弹窗消失

  DetailModalHide(e) {
    const { dispatch } = this.props;

    dispatch(DMActions.Hide());
  }

  render() {
    const { ClassCharge, Teacher, DetailModal } = this.props;

    const { TeacherModal } = Teacher;

    const { TeacherPower, TeacherLoading } = ClassCharge;

    const { Total, List } = ClassCharge.Teacher;

    return (
      <div className="teacher-teacher-list-wrapper">
        <Loading spinning={TeacherLoading}>
          <TitleBar
            type="icon3"
            title="班级教师"
            abstract={`(共${List.length}人)`}
          ></TitleBar>

          <div className="teacher-list-wrapper clearfix">
            {List.length > 0 ? (
              List.map((item, key) => {
                let projects = "";

                switch (item.SubjectName) {
                  case "语文":
                  case "物理":
                    projects = "physics";
                    break;
                  case "英语":
                  case "生物":
                    projects = "english";
                    break;
                  case "数学":
                  case "政治":
                    projects = "math";
                    break;
                  case "历史":
                  case "地理":
                    projects = "history";
                    break;
                  default:
                    projects = "other";
                }

                return (
                  <div key={key} className="admclass-teacher-item clearfix">
                    <div
                      className="admclass-teacher-photo"
                      onClick={this.TeacherDetailShow.bind(this, {
                        UserID: item.UserID,
                        UserType: 1,
                      })}
                      style={{ backgroundImage: `url(${item.PhotoPath})` }}
                    ></div>

                    <div className="admclass-teacher-info">
                      <div className="admclass-teacher-tab">
                        <div
                          className="admclass-teacher-name"
                          onClick={this.TeacherDetailShow.bind(this, {
                            UserID: item.UserID,
                            UserType: 1,
                          })}
                          title={item.UserName}
                        >
                          {item.UserName}
                        </div>
                      </div>

                      <div className="admclass-teacher-id" title={item.UserID}>
                        {item.UserID}
                      </div>
                    </div>

                    <div
                      className={`admclass-teacher-project ${projects}`}
                      title={item.SubjectName}
                    >
                      {item.SubjectName}
                    </div>

                    {TeacherPower
                      ? ""
                      : // <div className="cooperate">

                        //     <div className="reset" onClick={() => this.TeacherModalShow({type:2,originTeacherInfo:{id:item.UserID,name:item.UserName,photo:item.PhotoPath,SubjectID:item.SubjectID,SubjectName:item.SubjectName}})}>更改</div>

                        //     <div className="line"></div>

                        //     <div className="delete" onClick={()=>this.delSubjectTeacher({SubjectID:item.SubjectID})}>删除</div>

                        // </div>

                        ""}
                  </div>
                );
              })
            ) : (
              <Empty type="3" title="还没有任课教师，请先添加！"></Empty>
            )}
          </div>

          <Modal
            type={1}
            title={TeacherModal.modalTitle}
            visible={TeacherModal.show}
            mask={true}
            width={1000}
            bodyStyle={{ height: 536 }}
            className="addTeacherModal"
            onCancel={this.teacherModalHide.bind(this)}
            cancelText="取消"
            onOk={this.teacherModalOk.bind(this)}
          >
            <AddTeacherModal
              loadingShow={TeacherModal.loadingShow}
              subjects={TeacherModal.subjects}
              teacherList={TeacherModal.teacherList}
              subjectsSelect={TeacherModal.subjectsSelect}
              itemClick={this.itemLick.bind(this)}
              closeShow={TeacherModal.closeShow}
              newPickTeacher={{
                id: TeacherModal.newPickTeacher.id,
                name: TeacherModal.newPickTeacher.name,
                photo: TeacherModal.newPickTeacher.photo,
              }}
              originTeacherShow={TeacherModal.originTeacherShow}
              originTeacherInfo={TeacherModal.originTeacherInfo}
              newTeacherTitle={TeacherModal.newTeacherTitle}
              originTeacherTitle={TeacherModal.originTeacherTitle}
              teacherModalDropChange={this.teacherModalDropChange.bind(this)}
              teacherLoadingShow={TeacherModal.teacherLoadingShow}
              inputContent={TeacherModal.inputContent}
              inputContentChange={this.teacherModalInputContentChange.bind(
                this
              )}
              searchBtnClick={this.teacherSearchBtnClick.bind(this)}
              emptyShow={TeacherModal.emptyShow}
              searchClose={this.teacherSearchClose.bind(this)}
              subjectDropDisabled={TeacherModal.subjectDropDisabled}
              subjectTipsShow={this.state.subjectTipsShow}
            ></AddTeacherModal>
          </Modal>

          <DetailsModal
            visible={DetailModal.Show}
            module={1}
            data={DetailModal[DetailModal.ActiveInfo]}
            type={DetailModal.ActiveInfo}
            onCancel={this.DetailModalHide.bind(this)}
          ></DetailsModal>
        </Loading>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { Teacher, DetailModal } = state;

  const { ClassCharge } = state.Teacher;

  return {
    ClassCharge,
    Teacher,
    DetailModal,
  };
};

export default connect(mapStateToProps)(TeacherWrapper);
