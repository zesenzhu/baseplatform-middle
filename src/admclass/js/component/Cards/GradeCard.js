import React from "react";
import "../../../scss/Cards/GradeCard.scss";
class GradeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onReNameClick = (e,data) => {
    let { onReNameClick } = this.props;
    // 阻止合成事件的冒泡
    e.stopPropagation();
    // 阻止与原生事件的冒泡
    e.nativeEvent.stopImmediatePropagation();
    onReNameClick(data);
  };
  render() {
    let { canControl,className, onCardClick,data, onReNameClick, children, ...params } = this.props;
    let {
      GradeName,
      GradeID,
      Class,
      CourseTecher,
      Ganger,

      Student,
    } = data;
    return (
      <div onClick={()=>onCardClick(data)} className={`GradeCard ${className}`} {...params}>
        {/* <div className="card-bg"></div> */}
        <div className="card-main">
          <div title={GradeName ? GradeName : "--"} className="card-name">
            {GradeName ? GradeName : "--"}
          </div>
          <div className="card-msg">
            <p className="card-msg-row">
              <span className="card-msg-row-left">班级数量:</span>
              <span
                title={Class ? Class + "个" : "0个"}
                className="card-msg-row-right"
              >
                {Class ? Class + "个" : "0个"}
              </span>
            </p>
            <p className="card-msg-row">
              <span className="card-msg-row-left">班主任:</span>
              <span
                title={Ganger ? Ganger + "人" : "0人"}
                className="card-msg-row-right"
              >
                {Ganger ? Ganger + "人" : "0人"}
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
              <span className="card-msg-row-left">学生人数:</span>
              <span
                title={Student ? Student + "人" : "0人"}
                className="card-msg-row-right"
              >
                {Student ? Student + "人" : "0人"}
              </span>
            </p>
          </div>
          {canControl?<div
            onClick={(e) => this.onReNameClick(e, data)}
            className="handle-content"
          >
            <i className="icon-rename"></i>
            <span className="rename-tips">重命名</span>
          </div>:''}
        </div>
      </div>
    );
  }
}
GradeCard.defaultProps = {
  className: "",
  data: {},
  onReNameClick: () => {},
  onCardClick: () => {},
  canControl:false
  
};
export default GradeCard;
