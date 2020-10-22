import React, { Component } from "react";
import {
  Loading,
  Empty,
  DropDown,
  CheckBox,
  CheckBoxGroup,
  PagiNation,
  Modal,
  Button,
  Search,
} from "../../../../common";
import { connect } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import { Icon, Table } from "antd";
import history from "../../containers/history";
import { postData, getData } from "../../../../common/js/fetch";
import CONFIG from "../../../../common/js/config";
import actions from "../../actions";
import TipsLog from "./TipsLog";
import UserArchivesModal from "../Modal/UserArchivesModal";
import All from "./All";
import Student from "./Student";
import Teacher from "./Teacher";
import Leader from "./Leader";
import Graduate from "./Graduate";
import LogDynamic from "../Log/LogDynamic";
import LogRecord from "../Log/LogRecord";
import Temple from "../Temple";

// import "../../scss/Main.scss";
import $ from "jquery";
const { MainAction, CommonAction, PublicAction } = actions;

class UserArchives extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = { Modalshow: false,TimeOut:'' };
  }
  componentWillReceiveProps(nextProps) {
    const {
      DataState: {
        CommonData: { ModalVisible },
      },
    } = nextProps;
    // 因为弹窗组件会提前加载，
    // 所以导致上传图片无法进行节点获取和数据更新，
    // 需要在外控制modal的挂载
    // let {
    //   DataState: {
    //     CommonData: {
    //       ModalVisible: { UserArchivesModalVisible },
    //     },
    //   },
    // } = this.props;
    // let {TimeOut} = this.state
    // if (
    //   ModalVisible.UserArchivesModalVisible === false &&
    //   UserArchivesModalVisible === true
    // ) {
    //   clearTimeout(TimeOut)

    //   TimeOut = setTimeout(() => {
    //     this.setState({
    //       Modalshow: false,
    //     });
    //   }, 3000);
    // } else if (
    //   ModalVisible.UserArchivesModalVisible === true
    //   //  &&
    //   // UserArchivesModalVisible === false
    // ) {
    //   if(TimeOut){
    //     clearTimeout(TimeOut)
    //   }
    //   this.setState({
    //     Modalshow: true,
    //   });
    // }
    // this.setState({
    //   TimeOut
    // })
  }
  componentDidMount() {}
  StudentChangeMadalCancel = () => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetModalVisible({
        UserLogModalVisible: false,
      })
    );
  };
  render() {
    const {
      DataState: {
        MainData: { UserLog },
        CommonData: {
          ModalVisible: { UserLogModalVisible, UserArchivesModalVisible },
          UserArchivesParams: { TipsLogName },
        },
      },
      PublicState: {
        Loading: { ModalLoading,ContentLoading },
      },
    } = this.props;
    let { Modalshow } = this.state;
    return (
      // <Loading
      //           opacity={false}
      //           // tip="加载中..."
      //           size="small"
      //           spinning={ContentLoading}
      //         >
      <div id="UserArchives" className="UserArchives">
        {/* {this.props.children} */}
        <Route path="/UserArchives/All" exact component={All}></Route>
        <Route path="/UserArchives/Student*" component={Student} exact></Route>
        <Route path="/UserArchives/Teacher*" component={Teacher} exact></Route>
        <Route path="/UserArchives/Leader*" component={Leader} exact></Route>
        <Route path="/UserArchives/Graduate*" component={Graduate} exact></Route>
        <Route path="/UserArchives/LogDynamic*" component={LogDynamic} exact></Route>
        <Route path="/UserArchives/LogRecord*" component={LogRecord} exact></Route>
        
        <Modal
          bodyStyle={{ padding: 0 }}
          type="2"
          width={650}
          footer={null}
          visible={UserLogModalVisible}
          onCancel={this.StudentChangeMadalCancel}
        >
          <Loading
            opacity={false}
            // tip="加载中..."
            size="small"
            spinning={ModalLoading}
          >
            <TipsLog userName={TipsLogName} data={UserLog}></TipsLog>
          </Loading>
        </Modal>
        {/* {Modalshow ?  */}
        <UserArchivesModal></UserArchivesModal>
         {/* : ""} */}
      </div>
      // </Loading>
    );
  }
}

const mapStateToProps = (state) => {
  let { UIState, DataState, PublicState } = state;
  return {
    UIState,
    DataState,
    PublicState,
  };
};
export default connect(mapStateToProps)(UserArchives);
