import React from "react";
import "../../../scss/Cards/SelectTeacherCard.scss";
class SelectTeacherCard extends React.Component {
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
      onCardClick,
      data,
      selectKey,
      searchValue,
      ganger,
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
    } = data
      ? data
      : {
          IsSet: false, //是否设置；
          UserID: "", //班主任ID
          UserName: "", //姓名
          Gender: "", //性别
          PhotoPath: "", //头像
        };
    if (type !== "ganger" && searchValue !== "") {
      if (typeof UserID === "string") {
        let idArr = UserID.split(searchValue);
        UserID = idArr.map((child, index) => {
          if (index !== idArr.length - 1)
            return (
              <React.Fragment key={index}>
                <span>{child}</span>
                <span style={{ color: "#ff6600" }}>{searchValue}</span>
              </React.Fragment>
            );
          else return <span key={index}>{child}</span>;
        });
      }
      if (typeof UserName === "string") {
        let nameArr = UserName.split(searchValue);

        UserName = nameArr.map((child, index) => {
          if (index !== nameArr.length - 1)
            return (
              <React.Fragment key={index}>
                <span>{child}</span>
                <span style={{ color: "#ff6600" }}>{searchValue}</span>
              </React.Fragment>
            );
          else return <span key={index}>{child}</span>;
        });
      }
    }
    return (
      <div
        onClick={() => onCardClick(data)}
        className={`SelectTeacherCard ${
          type === "ganger" ? "st-ganger" : "st-teacher"
        } ${selectKey === UserID ? "card-select" : ""} ${className}`}
        {...params}
      >
        {ganger ? (
          <p
            className={
              ganger === "new" ? "title-top title-new" : "title-top  title-old"
            }
          >
            {ganger === "new"
              ? "新任班主任"
              : ganger === "old"
              ? "原任班主任"
              : "班主任"}
          </p>
        ) : (
          ""
        )}
        <i
          style={IsSet === false ?{}:{
            background: `url(${
              PhotoPath_NoCache ? PhotoPath_NoCache : PhotoPath
            }) no-repeat center top/cover`,
          }}
          className={"teacher-photo"}
        ></i>
        { IsSet === false ? (
          <p className="teacher-id">未选择</p>
        ) : (
          <React.Fragment>
            <p
              title={data.UserName ? data.UserName : "--"}
              className="teacher-name"
            >
              {UserName ? UserName : "--"}
            </p>
            <p
              title={data.UserID ? "[" + data.UserID + "]" : "--"}
              className="teacher-id"
            >
              [{UserID ? UserID : "--"}]
            </p>
          </React.Fragment>
        )}
      </div>
    );
  }
}
SelectTeacherCard.defaultProps = {
  className: "",
  data: {},
  searchValue: "",
  selectKey: "",
  ganger: "", //可以设置是班主任的数据
  onSetGangerClick: () => {},
  onReSetClick: () => {},
  onDeleteClick: () => {},
  canControl: false,
  onCardClick: () => {},
};
export default SelectTeacherCard;
