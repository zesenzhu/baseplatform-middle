import React from "react";
import "../../../scss/Cards/TeacherCard.scss";
class TeacherCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onSetGangerClick = (e, data) => {
    let { onSetGangerClick } = this.props;
    // 阻止合成事件的冒泡
    e.stopPropagation();
    // 阻止与原生事件的冒泡
    e.nativeEvent.stopImmediatePropagation();
    onSetGangerClick(data);
  };
  onReSetClick = (e, data) => {
    let { onReSetClick } = this.props;
    // 阻止合成事件的冒泡
    e.stopPropagation();
    // 阻止与原生事件的冒泡
    e.nativeEvent.stopImmediatePropagation();
    onReSetClick(data);
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
      onSetGangerClick,
      canControl,
      onReSetClick,
      onDeleteClick,
      type,onDetailModalShow,
      className,
      onCardClick,
      data,
      onReNameClick,
      children,
      ...params
    } = this.props;
    let {
      PhotoPath_NoCache,
      PhotoPath,
      IsSet,
      Gender,
      UserID,
      UserName,
      SubjectID,
      SubjectName,
      UserType
    } = data?data:{};
    let SubjectColor = "other";
    if (SubjectName === "英语" || SubjectName === "生物") {
      SubjectColor = "english";
    } else if (SubjectName === "数学") {
      SubjectColor = "math";
    } else if (SubjectName === "科学" || SubjectName === "物理") {
      SubjectColor = "physics";
    } else if (SubjectName === "历史" || SubjectName === "化学") {
      SubjectColor = "history";
    } else if (SubjectName === "语文") {
      SubjectColor = "chinese";
    }
    return (
      <div
        // onClick={() => onCardClick(data)}
        className={`TeacherCard ${
          type === "ganger" ? "tc-bg-ganger" : "tc-bg-teacher"
        } ${className}`}
        {...params}
      >
        {/* <div className="card-bg"></div> */}
        {/* <div className="card-main"> */}
        <div className="cm-content" onClick={type !== "ganger"||IsSet?()=>onDetailModalShow('teacher',UserID,UserType):()=>{}}>
          <div
            className="cm-img"
            style={
              IsSet === true || type === "teacher"
                ? {
                    background: `url(${
                      PhotoPath_NoCache ? PhotoPath_NoCache : PhotoPath
                    }) no-repeat center center /contain`,
                  }
                : {}
            }
          ></div>
          <div className="cm-msg">
            <p title={type === "ganger" && IsSet !== true ? "未设置" : UserName} className="cm-t-name">
              {type === "ganger" && IsSet !== true ? "未设置" : UserName}
            </p>
            <p title={type === "ganger" && IsSet !== true ? "未设置" : UserID} className="cm-t-id">
              {type === "ganger" && IsSet !== true ? "未设置" : UserID}
            </p>
          </div>
        </div>
        {type === "teacher" ? (
          <div title={SubjectName} className={`cm-subject ${SubjectColor}`}>
            {SubjectName}
          </div>
        ) : (
          ""
        )}
        {canControl && type === "ganger" ? (
          IsSet !== true ? (
            <div
              onClick={(e) => this.onSetGangerClick(e, data)}
              className="handle-content"
            >
              <span className="SetGanger-tips">设置</span>
            </div>
          ) : (
            <div className="handle-content">
              <span
                className="handle-box"
                onClick={(e) => this.onReSetClick(e, data)}
              >
                <span className="ReSet-tips">更改</span>
              </span>
              <span className="handle-devide"></span>
              <span
                className="handle-box"
                onClick={(e) => this.onDeleteClick(e, data)}
              >
                <span className=" delete-tips">删除</span>
              </span>
            </div>
          )
        ) : (
          ""
        )}
        {/* </div> */}
        {/* <div
          className={`tc-bg ${
            type === "ganger" ? "tc-bg-ganger" : "tc-bg-teacher"
          }`}
        ></div> */}
        {type === "ganger" ? <div className="ganger-tips">班主任</div> : ""}
      </div>
    );
  }
}
TeacherCard.defaultProps = {
  className: "",
  data: {},
  onSetGangerClick: () => {},
  onReSetClick: () => {},
  onDeleteClick: () => {},
  onDetailModalShow: () => {},
  
  canControl: false,
};
export default TeacherCard;
