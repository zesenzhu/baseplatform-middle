import React from "react";
import "../../../scss/Cards/ClassCard.scss";
class ClassCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onReNameClick = (e, data) => {
    let { onReNameClick } = this.props;
    // 阻止合成事件的冒泡
    e.stopPropagation();
    // 阻止与原生事件的冒泡
    e.nativeEvent.stopImmediatePropagation();
    onReNameClick(data);
  };
  onDeleteClick = (e, data) => {
    let { onDeleteClick } = this.props;
    // 阻止合成事件的冒泡
    e.stopPropagation();
    // 阻止与原生事件的冒泡
    e.nativeEvent.stopImmediatePropagation();
    onDeleteClick(data);
  };

  render() {
    let {
      className,
      onCardClick,
      data,
      onReNameClick,
      onDeleteClick,
      children,
      canControl,
      ...params
    } = this.props;
    let {
      ClassName,
      ClassID,
      MonitorName,
      CourseTecher,
      GangerName,

      Student,
    } = data;
    return (
      <div
        onClick={() => onCardClick(data)}
        className={`ClassCard ${className}`}
        {...params}
      >
        <div className="card-bg"></div>
        <div className="card-main">
          <div title={ClassName ? ClassName : "--"} className="card-name">
            {ClassName ? ClassName : "--"}
          </div>
          <div className="card-msg">
            <p className="card-msg-row">
              <span className="card-msg-row-left">班主任:</span>
              <span
                title={GangerName ? GangerName : "--"}
                className="card-msg-row-right"
              >
                {GangerName ? GangerName : "--"}
              </span>
            </p>
            <p className="card-msg-row">
              <span className="card-msg-row-left">任课教师:</span>
              <span
                title={CourseTecher ? CourseTecher + "人" : "0人"}
                className="card-msg-row-right"
              >
                {CourseTecher ? CourseTecher + "人" : "0人"}
              </span>
            </p>
            <p className="card-msg-row">
              <span className="card-msg-row-left">班长:</span>
              <span
                title={MonitorName ? MonitorName : "--"}
                className="card-msg-row-right"
              >
                {MonitorName ? MonitorName : "--"}
              </span>
            </p>
            <p className="card-msg-row">
              <span className="card-msg-row-left">学生人数:</span>
              <span
                title={Student ? Student + "人" : "0人"}
                className="card-msg-row-right"
              >
                {Student ? Student + "人" : "0人"}
              </span>
            </p>
          </div>
          {canControl ? (
            <div className="handle-content">
              <span
                className="handle-box"
                onClick={(e) => this.onReNameClick(e, data)}
              >
                <span className="rename-tips">重命名</span>
              </span>
              <span className="handle-devide"></span>
              <span
                className="handle-box"
                onClick={(e) => this.onDeleteClick(e, data)}
              >
                <span className=" delete-tips">删除</span>
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
ClassCard.defaultProps = {
  className: "",
  data: {},
  onReNameClick: () => {},
  onCardClick: () => {},
  onDeleteClick: () => {},
  canControl: false,
};
export default ClassCard;
