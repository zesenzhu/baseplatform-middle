import React from "react";
import "../../../scss/Cards/StudentCard.scss";
class StudentCard extends React.Component {
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
      type,
      className,
      onSetMonitorClick,
      onSelectStudentClick,
      onCardClick,
      data,
      onReNameClick,
      children,
      onDetailModalShow,
      isSelect,
      ...params
    } = this.props;
    let {
      PhotoPath_NoCache,
      PhotoPath,
      IsSet,
      Gender,
      UserID,
      UserName,
      UserClass,
      SubjectID,
      SubjectName,
      UserType
    } = data ? data : {};
    // console.log(data)

    return (
      <div
        // onClick={() => onCardClick(data)}
        className={`StudentCard   ${className}`}
        {...params}
      >
        <div className="sc-shadow"></div>
        <div className="StudentCard-main">
          <div
            className="cm-content"
            onClick={() => onDetailModalShow("student", UserID,UserType)}
          >
            <div
              className="cm-img"
              style={{
                background: `url(${
                  PhotoPath_NoCache ? PhotoPath_NoCache : PhotoPath
                }) no-repeat center center /contain`,
              }}
            ></div>
            <div className="cm-msg">
              <p
                title={UserName ? UserName : "--"}
                className={`cm-t-name ${
                  Gender === "男"
                    ? "male"
                    : Gender === "女"
                    ? "female"
                    : "unKnown"
                }`}
              >
                {UserName ? UserName : "--"}
              </p>
              <p title={UserID ? UserID : "--"} className="cm-t-id">
                {UserID ? UserID : "--"}
              </p>
              {canControl ? (
                <div
                  onClick={(e) => {
                    // 阻止合成事件的冒泡
                    e.stopPropagation();
                    // 阻止与原生事件的冒泡
                    e.nativeEvent.stopImmediatePropagation();
                    onSelectStudentClick(
                      { value: UserID, title: UserName },
                      !isSelect
                    );
                  }}
                  className={`check-box ${isSelect ? "checked" : ""}`}
                >
                  {" "}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          {canControl ? (
            UserClass === 1 ? (
              <div className="handle-content">
                <span
                  onClick={(e) => onSetMonitorClick("")}
                  className="set-tips"
                >
                  撤销班长
                </span>
              </div>
            ) : (
              <div className="handle-content">
                <span
                  onClick={(e) => onSetMonitorClick(UserID)}
                  className="set-tips"
                >
                  设为班长
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
          {UserClass === 1 ? <div className="monitor-tips">班长</div> : ""}
        </div>
      </div>
    );
  }
}
StudentCard.defaultProps = {
  className: "",
  data: {},
  onSetGangerClick: () => {},
  onReSetClick: () => {},
  onDeleteClick: () => {},
  onSetMonitorClick: () => {},
  onSelectStudentClick: () => {},
  onDetailModalShow: () => {},

  canControl: false,
};
export default StudentCard;
