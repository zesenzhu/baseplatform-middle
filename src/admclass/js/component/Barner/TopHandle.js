import React from "react";
import history from "../../containers/history";
import "../../../scss/Barner/TopHandle.scss";
import { Button } from "../../../../common";
class TopHandle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { onAddClassClick, onImportClick, userPower, handleRoute } = this.props;

    return (
      <div className="top-handle">
        {userPower === "Admin" && handleRoute !== "ClassDetails" ? (
          <React.Fragment>
            <Button
              className="btn-handle"
              height={"24"}
              color={"blue"}
              shape={"round"}
              width={"90"}
              onClick={() => onAddClassClick()}
            >
              添加班级
            </Button>
            <Button
              className="btn-handle"
              height={"24"}
              color={"blue"}
              shape={"round"}
              width={"142"}
              onClick={() => onImportClick()}
            >
              导入班主任及班长
            </Button>
          </React.Fragment>
        ) : (
          ""
        )}
        {(userPower === "Admin"||userPower === "MainTeacher") && handleRoute === "ClassDetails" ? (
          <React.Fragment>
            <Button
              className="btn-handle"
              height={"24"}
              color={"blue"}
              shape={"round"}
              width={"90"}
              onClick={() => onGoLoginUpClick()}
            >
              学生注册审核
            </Button>
            <Button
              className="btn-handle"
              height={"24"}
              color={"blue"}
              shape={"round"}
              width={"142"}
              onClick={() => onAddStudentClick()}
            >
              添加学生
            </Button>
            <Button
              className="btn-handle"
              height={"24"}
              color={"blue"}
              shape={"round"}
              width={"142"}
              onClick={() => onImportStudentClick()}
            >
              导入学生
            </Button>
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    );
  }
}
TopHandle.defaultProps = {
  onAddClassClick: () => {},
  onImportClick: () => {},
  onImportStudentClick: () => {},
  onAddStudentClick: () => {},
  onGoLoginUpClick: () => {},
};
export default TopHandle;
