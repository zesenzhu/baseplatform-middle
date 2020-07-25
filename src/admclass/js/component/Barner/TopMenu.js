import React from "react";
import history from "../../containers/history";
import "../../../scss/Barner/TopMenu.scss";
class TopMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [
        { value: "Grade", title: "年级管理", icon: "Grade" },
        { value: "Class", title: "行政班级管理", icon: "Class" },
      ],
    };
  }
  

  render() {
    let { List } = this.state;
    let { onSelectMenu } = this.props;
    let pathname = history.location.pathname;

    let pathArr = pathname.split("/");
    let handleRoute = pathArr[1];
    // console.log(handleRoute)
    return (
      <div className="top-menu">
        {List instanceof Array &&
          List.map((child, index) => {
            return (
              <span
                key={index}
                onClick={()=>onSelectMenu( child.value)}
                className={`menu-bar ${
                  handleRoute === child.value ? "active" : ""
                }`}
              >
                <span className={`bar-content ${"bar-icon-" + child.icon}`}>
                  {child.title}
                </span>
              </span>
            );
          })}
      </div>
    );
  }
}
TopMenu.defaultProps = {
  onSelectMenu: () => {},
};
export default TopMenu;
