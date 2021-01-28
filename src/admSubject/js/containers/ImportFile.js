import React, { Component } from "react";
import { connect } from "react-redux";

import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import history from "./history";

import { getDataStorage } from "../../../common/js/public";
// import "../../scss/index.scss";

import ImportExcel from "../../../common/js/Import/ImportExcel";
import ImportPhoto from "../../../common/js/Import/ImportPhoto";

class ImportFile extends React.Component {
  constructor(props) {
    super(props);
    // baseMsg.ProductUseRange:学校场景
    // 1：单个专业英语院校，
    // 2：单个普通大学，
    // 3：单个中小学校，
    // 4：多个中小学，
    // 5：单个中职学校，
    // 6：单个高职学校，
    // 7：多个大学，
    // 8：多个中职学校，
    // 9：多个高职学校。
    let path = history.location.pathname.split("/");
    let { ProductUseRange } = getDataStorage("LgBasePlatformInfo"); //获取平台版本，看是大学还是中小学
    ProductUseRange = parseInt(ProductUseRange);
    // 根据身份和产品类型判断显示的版本
    let version = "_middle";
    switch (ProductUseRange) {
      // 1，2，6：单个大学，为高校版本学校端
      case 1:
      case 2:
      case 6:
      case 9:
        version = "_university";

        break;
      // 3,5:单个中小学，为教育局版本学校端
      case 3:
      case 4:
      case 8:
      case 5:
        // if (IdentityCode.includes("IC000")) {
        //学校
        version = "_middle";
        break;
      // 4,8:多个中小学，为教育局版本教育局端

      default:
        version = "_middle";
    }
    let route = path[2];
    // console.log( route, props);
    this.state = {
      select: "file",
      userMsg: props.DataState.LoginUser,
      show: true,

      Route: route + version,

      // userType:
      //   props.DataState.LoginUser.UserClass === 1 ||
      //   props.DataState.LoginUser.UserClass === 2
      //     ? true
      //     : false //1、2表示是学校管理员，4表示学院管理员
    };
    const { dispatch, DataState } = this.props;
  }

  componentWillMount() {
 
    // document.title=route === 'Teacher' ? '导入教师档案' :route === 'Leader'?'导入领导 档案'  :route === 'Student'?'导入学生档案':'导入毕业生档案'
  }
 

    // this.setState({
    //     type:type,
    //     route:route
    // })
    // this.ImportHtml(name,route)
//   };
  render() {
    const { UIState, DataState } = this.props;
 
 
 
    return (
      <React.Fragment>
    
        {/* <div
          className={"content-box"}
          style={{
            borderRadius:
              this.state.Route === "graduate"
                ? "12px 12px 12px 12px"
                : "0 12px 12px 12px",
          }}
        > */}
           
            <ImportExcel
              ImportTitle={this.props.title}
              ImportTarget={this.state.Route}
            ></ImportExcel>
           
        {/* </div> */}
        {/* </div>
        </Frame> */}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState,
  };
};

export default connect(mapStateToProps)(ImportFile);
