import React from "react";
import history from "../../containers/history";
import "../../../sass/newEdition/TopMenu.scss";
class TopMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [
        { value: "Semester", title: "学年学期设置", icon: "Semester" },
        { value: "School", title: "学校基础资料设置", icon: "School" },
        { value: "Subsystem", title: "子系统访问设置", icon: "Subsystem" },
        
      ],
    };
  }
  onSelectMenu = (key) => {
    let route = history.location.pathname;

    let pathArr = route.split("/");
    let handleRoute = pathArr[2];
    // if (key !== "All") {
    //   // console.log(key)
    //   if (handleRoute === "Student") {
    //     window.StudentCancelSearch && window.StudentCancelSearch();
    //   } else if (handleRoute === "Teacher") {
    //     window.TeacherCancelSearch && window.TeacherCancelSearch();
    //   } else if (handleRoute === "Leader") {
    //     window.LeaderCancelSearch && window.LeaderCancelSearch();
    //   }
    //   history.push("/UserArchives/" + key + "/all");
    // } else {
      console.log(key,history)
      history.push("/MainContent/" + key);
    // }
    // history.push('/'+key)

   
  };

  render() {
    let { List } = this.props;
    // let pathname = history.location.pathname;

    // let pathArr = pathname.split("/");
    // let handleRoute = pathArr[2];
    // console.log(handleRoute,history)
    return (
      <div className="top-menu">
        {List instanceof Array &&
          List.map((child, index) => {

            return (
              <span
              key={index}
                onClick={this.onSelectMenu.bind(this, child.value)}
                className={`menu-bar ${this.props.path === child.value?'active':''}`}
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
