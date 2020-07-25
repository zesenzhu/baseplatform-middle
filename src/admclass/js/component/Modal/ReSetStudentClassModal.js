import React from "react";
import { connect } from "react-redux";
import {
  CheckBox,
  CheckBoxGroup,
  Tips,
  DropDown,
  Button,
  Empty,
  Loading,
} from "../../../../common";
import { Input, Tabs } from "antd";
import actions from "../../actions";
import { postData, getData } from "../../../../common/js/fetch";
import CONFIG from "../../../../common/js/config";
import ClassCropperModal from "../../../../common/js/CropperModal";
import SelectTeacherCard from "../Cards/SelectTeacherCard";
import Scrollbars from "react-custom-scrollbars";
import "../../../scss/Modal/ReSetStudentClassModal.scss";
const { UpDataState, UpUIState } = actions;
const { TabPane } = Tabs;
// require("../../../common/js/PicUpload/juqery.cp.picUploader");
class ReSetStudentClassModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      SearchValue: "",
    };
  }

  componentWillMount() {
    const { dispatch, DataState, UIState } = this.props;
  }
  componentDidMount() {
    const { dispatch, DataState, UIState } = this.props;
  }
  onGradeChange = (e) => {
    let { dispatch } = this.props;
    dispatch(
      UpDataState.SetResetClassParams({
        Grade: e,
        Class:{value:'',title:'请选择班级'},
      })
    );
  };
  onClassChange = (e) => {
    let { dispatch } = this.props;
    dispatch(
      UpDataState.SetResetClassParams({
        Class: e,
      })
    );
    dispatch(
      UpDataState.SetTipsVisible({
        ResetClassTipsVisible: false,
        // Class:{value:'',title:'请选择班级'},
      })
    );
  };
  render() {
    const {
      DataState: {
        MainData: {
          GradeAndClassList: { GradeList, AllClasses },
        },
        CommonData: {
          ClassDetailsParams: { CheckList },
          ResetClassParams: { Grade, Class },
          TipsVisible: { ResetClassTipsVisible },
          Tips: { ResetClassNameTips },
        },
      },
      PublicState: {
        Loading: { TableLoading, ModalLoading },
      },
    } = this.props;
    let student = "";
    let studentTitle = "";
    console.log(GradeList);
    if (CheckList instanceof Array) {
      // studentTitle = CheckList.join(",");
      CheckList.map((child, index) => {
        if (CheckList.length > 20) {
          if (index === 20) {
            student += child.title + "等";
          } else if (index < 20) {
            student += child.title + ",";
          }
        } else {
          if (index !== CheckList.length - 1) {
            student += child.title + ",";
          } else {
            student += child.title;
          }
        }
        if (index !== CheckList.length - 1) {
          studentTitle += child.title + ",";
        } else {
          studentTitle += child.title;
        }
      });
    }

    return (
      <div className={`ReSetStudentClassModal`}>
        <div className="before-tips">
          提示：为保证系统的正常运行，请勿在教学活动进行时或学期期末时对学生调班。
        </div>
        <div className="main-content">
          <p className="row">
            <span className="row-left">调班对象:</span>
            <span title={studentTitle} className="row-right">
              {student}
              <span className="member">
                (共<span className="member-red">
                {CheckList instanceof Array ? CheckList.length : 0}</span>人)
              </span>
            </span>
          </p>
          <p className="row row-drop">
            <span className="row-left">目标班级:</span>
            <Tips
              overlayClassName="tips"
              placement={"right"}
              getPopupContainer={(e) => e.parentNode}
              autoAdjustOverflow={false}
              visible={ResetClassTipsVisible}
              title={ResetClassNameTips}
            >
              <span className="row-right ">
                <DropDown
                  style={{ zIndex: 10 }}
                  ref="grade"
                  width={120}
                  height={240}
                  // title="班级："
                  dropSelectd={Grade}
                  dropList={GradeList}
                  onChange={this.onGradeChange}
                ></DropDown>
                <DropDown
                  style={{ zIndex: 9 }}
                  ref="grade"
                  width={120}
                  height={240}
                  disabled={Grade.value !== "" ? false : true}
                  // title="班级："
                  dropSelectd={Class}
                  dropList={AllClasses[Grade.value]}
                  onChange={this.onClassChange}
                ></DropDown>
              </span>
            </Tips>
          </p>
        </div>
      </div>
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
export default connect(mapStateToProps)(ReSetStudentClassModal);
