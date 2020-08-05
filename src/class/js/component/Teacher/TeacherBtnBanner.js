import React, { Component } from "react";

import { connect } from "react-redux";

import { Button } from "../../../../common";

import Public from "../../../../common/js/public";

import config from "../../../../common/js/config";

let { checkUrlAndPostMsg } = Public;

class TeacherBtnBanner extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;
  }

  render() {
    const { ClassCharge, TeacherModalShow, AddStudentShow } = this.props;

    const { StudentPower, TeacherPower } = ClassCharge;

    return (
      <div className="teacher-btn-wrapper">
        {StudentPower ? (
          <React.Fragment>
            <Button
              color="blue"
              className="import-class"
              onClick={(e) => {
                let url = config.HashPrevProxy + '/html/class'+ window.location.search +'#/Import/Student';

                // console.log(url);
                checkUrlAndPostMsg({ btnName:'导入学生', url });
                // window.open("/html/class/#/Import/Student");
              }}
            >
              导入学生
            </Button>

            <Button
              color="blue"
              className="import-class"
              onClick={(e) => AddStudentShow(e)}
            >
              添加学生
            </Button>

            <Button
              color="blue"
              className="import-teacher"
              onClick={(e) => {
                let url = config.HashPrevProxy + '/html/admArchives'+ window.location.search ;

                // console.log(url);
                checkUrlAndPostMsg({ btnName:'学生注册审核', url });
                // window.open("/html/admArchives");
              }}
            >
              学生注册审核
            </Button>
          </React.Fragment>
        ) : (
          ""
        )}

        {TeacherPower
          ? ""
          : // <Button color="blue" className="import-teacher" onClick={e=>TeacherModalShow({type:1})}>添加任课教师</Button>

            ""}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { ClassCharge } = state.Teacher;

  return {
    ClassCharge,
  };
};

export default connect(mapStateToProps)(TeacherBtnBanner);
