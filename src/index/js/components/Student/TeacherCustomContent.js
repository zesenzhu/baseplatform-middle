import React from "react";
import { connect } from "react-redux";
import {
  Table,
  Button,
  PagiNation,
  CheckBox,
  CheckBoxGroup
} from "../../../../common";
import TeacherCustomActions from "../../actions/Student/TeacherCustomActions";
import { postData, getData } from "../../../../common/js/fetch";
import CONFIG from "../../../../common/js/config";
import "../../../scss/TeacherCustomContent.scss";
import { Tabs, Modal, Input } from "antd";
import Website from "./Custom/Website";
import Tool from "./Custom/Tool";
import CombineModal from "./Custom/CombineModal";
import DataBase from "./Custom/DataBase";
import App from "./Custom/App";
const { TabPane } = Tabs;

class TeacherCustomContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: props.Student.TeacherCustomModalShow.key || "tool",
      userMsg: props.LoginUser,
      TabChange: true,
      GroupName:
        props.Student.TeacherCustomData.CombineModalData.data.GroupName,
      ChangeName: false
    };

    const { dispatch, Student } = props;

    dispatch(
      TeacherCustomActions.getCustomData(
        this.state.activeKey,
        this.state.userMsg.UserID,
        "",
        '',
        this.handlePeriod(props.LoginUser.StudyLevel).value
      )
    );
  }
  OutMenuEvent(e) {
    const { dispatch } = this.props;
    let titleName = document.getElementById("titleName");
    // console.log(titleName);

    if (!titleName) {
      return;
    }

    if (!titleName.contains(e.target)) {
      this.setState({
        ChangeName: false
      });
    }

    /*dispatch(ModuleActions.GroupDetailHide());*/
  }

  //点击menu之外
  componentDidMount() {
    addEventListener("click", this.OutMenuEvent.bind(this));
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch, Student } = nextProps;
    let TeacherCustomModalShow = Student.TeacherCustomModalShow;

    if (!TeacherCustomModalShow.EditCombineCustomModalShow) {
      this.setState({
        GroupName: ""
      });
    }
    if (
      TeacherCustomModalShow.EditCombineCustomModalShow &&
      this.state.GroupName === ""
    ) {
      this.setState({
        GroupName:
          nextProps.Student.TeacherCustomData.CombineModalData.data.GroupName
      });
    }
  }
  // Tab change
  onTabsChange = key => {
    const { dispatch, Student } = this.props;

    // console.log(key)
    this.setState({
      activeKey: key,
      TabChange: true
    });
    if (key !== "Website") {
      this.setState({
        TabChange: false
      });
    } else {
      this.setState({
        TabChange: true
      });
    }
    dispatch(
      TeacherCustomActions.getCustomData(
        key,
        this.state.userMsg.UserID,
        "",
        '',
        this.handlePeriod(this.props.LoginUser.StudyLevel).value
      )
    );
  };
  handlePeriod = StudyLevel => {
    let firstSelect = { value: "0", title: "全部学段" };
    if (StudyLevel === "") {
      firstSelect = { value: "0", title: "全部学段" };
    } else if (StudyLevel === "A") {
      firstSelect = { value: "1", title: "小学" };
    } else if (StudyLevel === "B") {
      firstSelect = { value: "2", title: "初中" };
    } else if (StudyLevel === "C") {
      firstSelect = { value: "4", title: "高中" };
    }
    return firstSelect;
  };
  // 关闭合并小组
  onEditCombineCancel = () => {
    const { dispatch, Student } = this.props;
    dispatch({
      type: TeacherCustomActions.STU_EDIT_COMBINE_CUSTOM_MODAL_CLOSE
    });
  };
  // 组名change
  onGroupNameChange = e => {
    this.setState({
      GroupName: e.target.value
    });
  };
  //组名blur
  onGroupNameBlur = e => {
    const { dispatch, Student } = this.props;
    let TeacherCustomData = Student.TeacherCustomData;
    let type = TeacherCustomData.CombineModalData.data.type;
    const { Row, key } = TeacherCustomData.CombineModalData;
    let Url = "";
    let MainData = "";
    let AlterData = "";
    let Data = {};
    if (type === "Website") {
      MainData = Student.TeacherCustomData.WebsiteData;
      AlterData = Student.TeacherCustomData.WebsiteAlterData;
      Data["WebsiteData"] = MainData;
      Data["WebsiteAlterData"] = AlterData;
      Url = "/SubjectResMgr/WebSiteMgr/Teacher/EditDeskTop";
    } else if (type === "App") {
      MainData = Student.TeacherCustomData.AppData;
      AlterData = Student.TeacherCustomData.AppAlterData;
      Data["AppData"] = MainData;
      Data["AppAlterData"] = AlterData;
      Url = "/SubjectResMgr/AppMgr/Teacher/EditDeskTop";
    } else if (type === "tool") {
      MainData = Student.TeacherCustomData.ToolData;
      AlterData = Student.TeacherCustomData.ToolAlterData;
      Data["ToolData"] = MainData;
      Data["ToolAlterData"] = AlterData;
      Url = "/SubjectResMgr/ToolMgr/Teacher/EditDeskTop";
    } else if (type === "database") {
      MainData = Student.TeacherCustomData.DataBaseData;
      AlterData = Student.TeacherCustomData.DataBaseAlterData;
      Data["DataBaseData"] = MainData;
      Data["DataBaseAlterData"] = AlterData;
      Url = "/SubjectResMgr/ResLibMgr/Teacher/EditDeskTopInfo";
    } else {
      return;
    }
    console.log(MainData, Row, key);
    MainData[Row].List[key].Name = e.target.value;
    MainData[Row].List[key].GroupName = e.target.value;
    this.setState({
      ChangeName: false
    });
    dispatch(TeacherCustomActions.setCombineNameData(Data));
    if (
      MainData[Row] &&
      MainData[Row].List[key] &&
      MainData[Row].List[key].List
    ) {
      dispatch(
        TeacherCustomActions.setCombineCustomModalData(MainData[Row].List[key])
      );
    } else {
      dispatch(
        TeacherCustomActions.setCombineCustomModalData({
          Row: -1,
          type: "",
          List: []
        })
      );
    }

    dispatch(TeacherCustomActions.fetchCustomData(Url, type));
  };
  render() {
    const { LoginUser, Student, AppLoading } = this.props;
    let TeacherCustomModalShow = Student.TeacherCustomModalShow;
    let TeacherCustomData = Student.TeacherCustomData;
    // console.log(this.state.ChangeName);
    return (
      <div id="TeacherCustomContent" className="TeacherCustomContent">
        <div className="top-content">
          {/* <span className={`custom-btn  ${this.state.}` }><i className='icon-tool'></i>常用工具定制</span> */}
        </div>
        <div className="main-content">
          <Tabs
            type="card"
            onChange={this.onTabsChange.bind(this)}
            activeKey={this.state.activeKey}
          >
            <TabPane
              tab={
                <span className="my-tab">
                  <i className="tool"></i>
                  <span className="vertical">常用工具定制</span>
                </span>
              }
              key="tool"
            >
              <Tool></Tool>
            </TabPane>
            <TabPane
              tab={
                <span className="my-tab">
                  <i className="App"></i>
                  <span className="vertical">应用定制</span>
                </span>
              }
              key="App"
            >
              <App></App>
            </TabPane>

          </Tabs>
        </div>
        {
          <Modal
            className="EditCombineCustomModal"
            destroyOnClose
            mask={false}
            // maskClosable={false}
            visible={TeacherCustomModalShow.EditCombineCustomModalShow}
            closable={true}
            footer={false}
            width={641}
            centered={true}
            // getContainer={document.getElementById("Website")}
            // wrapClassName='TeacherCustomContent'
            onCancel={this.onEditCombineCancel.bind(this)}
            // onClose={this.onEditCombineCancel.bind(this)}
            // title={TeacherCustomData.CombineModalData.data.GroupName}
            title={
              <div
                id="titleName"
                
                className="title"
              >
                {!this.state.ChangeName ? (
                  <span className="titleBox"
                  onClick={e => {
                    e.stopPropagation()
                    this.setState({ ChangeName: true });
                  }}
                  >
                    <span className="titleSpan">{this.state.GroupName}</span>
                    <span className="icon-change"></span>
                  </span>
                ) : (
                  <Input
                    value={this.state.GroupName}
                    maxLength={10}
                    onChange={this.onGroupNameChange.bind(this)}
                    onBlur={this.onGroupNameBlur.bind(this)}
                  ></Input>
                )}
              </div>
            }
          >
            {TeacherCustomModalShow.EditCombineCustomModalShow ? (
              <CombineModal
                type={TeacherCustomData.CombineModalData.data.type}
                CombineData={TeacherCustomData.CombineModalData.data}
              ></CombineModal>
            ) : (
              ""
            )}
          </Modal>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { LoginUser, Student, AppLoading } = state;

  return {
    LoginUser,

      Student,

    AppLoading
  };
};
export default connect(mapStateToProps)(TeacherCustomContent);
