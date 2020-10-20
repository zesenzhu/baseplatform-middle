import React from "react";
import { connect } from "react-redux";
import {
  Table,
  Button,
  PagiNation,
  CheckBox,
  CheckBoxGroup,
  Empty
} from "../../../common";
import actions from "../actions";
import history from "../containers/history";
import ShowCardTeacher from "./ShowCardTeacher";
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";
import "../../scss/Teacher.scss";

class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { DataState, UIState } = this.props;
    return (
      <div id="Teacher" className="Teacher">
        {DataState.GetTeacherCourseClassMsg.CourseClassSource instanceof
          Array &&
        DataState.GetTeacherCourseClassMsg.CourseClassSource.length > 0 ? (
          DataState.GetTeacherCourseClassMsg.CourseClassSource.map(
            (child, index) => {
              return (
                <ShowCardTeacher
                  key={child.CourseClassID}
                  params={child}
                ></ShowCardTeacher>
              );
            }
          )
        ) : (
          <Empty
            type="4"
            title="您还没有教学班"
            style={{ marginTop: "200px", transform: "translateY(-50%)" }}
          ></Empty>
        )}
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
export default connect(mapStateToProps)(Teacher);
