import React from "react";
import history from "../../containers/history";
import "../../../scss/newEdition/TopMenu.scss";
class TopMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [
        { value: "All", title: "用户档案总览", icon: "All" },
        { value: "Student", title: "学生档案", icon: "Student" },
        { value: "Teacher", title: "教师档案", icon: "Teacher" },
        { value: "Leader", title: "领导档案", icon: "Leader" },
        { value: "Graduate", title: "毕业生档案 ", icon: "Graduate" },
      ],
    };
  }
  onSelectMenu = (key) => {
    let route = history.location.pathname;

    let pathArr = route.split("/");
    let handleRoute = pathArr[2];
    if (key !== "All") {
      // console.log(key)
      if (handleRoute === "Student") {
        window.StudentCancelSearch();
      } else if (handleRoute === "Teacher") {
        window.TeacherCancelSearch();
      } else if (handleRoute === "Leader") {
        window.LeaderCancelSearch();
      }
      history.push("/UserArchives/" + key + "/all");
    } else {
      history.push("/UserArchives/" + key);
    }
    // history.push('/'+key)
  };

  render() {
    let { List } = this.state;
    let pathname = history.location.pathname;

    let pathArr = pathname.split("/");
    let handleRoute = pathArr[2];
    // console.log(handleRoute)
    return (
      <div className="top-menu">
        {List instanceof Array &&
          List.map((child, index) => {

            return (
              <span
              key={index}
                onClick={this.onSelectMenu.bind(this, child.value)}
                className={`menu-bar ${handleRoute === child.value?'active':''}`}
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

export default TopMenu;
