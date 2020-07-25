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
import "../../../scss/Modal/SetGanderModal.scss";
const { UpDataState, UpUIState } = actions;
const { TabPane } = Tabs;
// require("../../../common/js/PicUpload/juqery.cp.picUploader");
class SetGanderModal extends React.Component {
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
  // tab选择
  onTapChange = (key) => {
    let { dispatch } = this.props;
    this.setState({
      activeKey: key,
    });
    // dispatch(UpDataState.GetTeacherToPage({}));
  };
  onCardClick = (data) => {
    let { dispatch } = this.props;
    dispatch(
      UpDataState.SetSelectGanderData({
        IsSet: true,
        UserID: data.UserID,
        UserName: data.UserName,
        PhotoPath: data.PhotoPath_NoCache || data.PhotoPath,
      })
    );
  };
  onSelecSubjectChange = (e) => {
    let { dispatch } = this.props;
    console.log(e);
    dispatch(
      UpDataState.SetSubjectTeacherParams({
        SubjectIDs: e.value,
        SUbjectNames: e.title,
      })
    );
    dispatch(UpDataState.GetTeacherToPage({}));
  };
  onSearchKeyChange = (e) => {
    let { dispatch } = this.props;
    this.setState({
      SearchValue: e.target.value,
    });
    // dispatch(
    //   UpDataState.SetSubjectTeacherParams({
    //     // SearchValue: e.target.value,
    //     Keyword: e.target.value,
    //   })
    // );
  };
  onSearchClick = () => {
    let { dispatch } = this.props;
    dispatch(
      UpDataState.SetSubjectTeacherParams({
        CancelBtnShow: "y",
        SearchValue: this.state.SearchValue,
        Keyword: this.state.SearchValue,
      })
    );
    dispatch(UpDataState.GetTeacherToPage({}));
  };
  onCancelSearchClick = () => {
    let { dispatch } = this.props;
    this.setState({
      SearchValue: "",
    });
    dispatch(
      UpDataState.SetSubjectTeacherParams({
        CancelBtnShow: "n",
        SearchValue: "",
        Keyword: "",
      })
    );
    dispatch(UpDataState.GetTeacherToPage({}));
  };
  render() {
    const {
      DataState: {
        MainData: { ClassTeacherData, SubjectData, SubjectTeacherData },
        CommonData: {
          UserPower,
          ModalVisible: { EditGangerModalVisible },
          SubjectTeacherParams,
          SelectGanderData,
          LoadingVisible: { SubjectTeacherLoadingVisible },
        },
      },
      PublicState: {
        Loading: { TableLoading, ModalLoading },
      },
    } = this.props;
    let { activeKey } = this.state;
    let SubjectList = [];
    SubjectData.List instanceof Array &&
      SubjectData.List.forEach((child) => {
        SubjectList.push({
          value: child.SubjectID,
          title: child.SubjectName,
        });
      });
    return (
      <div className={`SetGanderModal`}>
        <Tabs
          className="select-teacher-box"
          animated={true}
          activeKey={activeKey}
          onChange={this.onTapChange}
        >
          <TabPane tab="本班教师" key="1">
            <div className="tab-contant">
              <div style={{ height: "100%" }} className="card-content">
                <Scrollbars>
                  {ClassTeacherData.List instanceof Array &&
                  ClassTeacherData.List.length > 0 ? (
                    ClassTeacherData.List.map((child, index) => {
                      return (
                        <SelectTeacherCard
                          selectKey={SelectGanderData.UserID}
                          data={child}
                          type="teacher"
                          onCardClick={this.onCardClick}
                          key={index}
                        ></SelectTeacherCard>
                      );
                    })
                  ) : (
                    <Empty
                      type={"3"}
                      title={"暂无任课教师"}
                      style={{ marginTop: "100px" }}
                    ></Empty>
                  )}
                </Scrollbars>
              </div>
            </div>
          </TabPane>
          <TabPane tab="全校教师" key="2">
            <div className="tab-contant">
              <div className="handle-top-box">
                <div className="handle-row">
                  <span className="row-left">所教学科:</span>
                  <span className="row-right">
                    <DropDown
                      style={{ zIndex: 5 }}
                      ref="subject"
                      width={120}
                      height={240}
                      // title="班级："
                      dropSelectd={{
                        value: SubjectTeacherParams.SubjectIDs,
                        title: SubjectTeacherParams.SUbjectNames,
                      }}
                      dropList={SubjectList}
                      onChange={this.onSelecSubjectChange}
                    ></DropDown>
                  </span>
                </div>
                <div className="handle-row">
                  <span className="row-left">关键词:</span>
                  <span className="row-right">
                    <Input
                      width={265}
                      height={28}
                      placeholder="请输入工号或姓名进行搜索..."
                      // title="班级："
                      className="search-input"
                      value={this.state.SearchValue}
                      onChange={this.onSearchKeyChange}
                    ></Input>
                    <i
                      style={{
                        display:
                          SubjectTeacherParams.CancelBtnShow === "y"
                            ? "inline-block"
                            : "none",
                      }}
                      className="cancel-btn"
                      onClick={this.onCancelSearchClick}
                    ></i>
                    <Button
                      onClick={this.onSearchClick}
                      height={"28"}
                      color={"blue"}
                      className="search-btn"
                    >
                      确定
                    </Button>
                  </span>
                </div>
              </div>
              <Loading
                opacity={false}
                // tip="加载中..."
                size="large"
                spinning={SubjectTeacherLoadingVisible}
              >
                <div style={{ height: "350px" }} className="card-content">
                  <Scrollbars>
                    {SubjectTeacherData.List instanceof Array &&
                    SubjectTeacherData.List.length > 0 ? (
                      SubjectTeacherData.List.map((child, index) => {
                        return (
                          <SelectTeacherCard
                            searchValue={SubjectTeacherParams.SearchValue}
                            selectKey={SelectGanderData.UserID}
                            data={child}
                            onCardClick={this.onCardClick}
                            type="teacher"
                            key={index}
                          ></SelectTeacherCard>
                        );
                      })
                    ) : (
                      <Empty
                        type={"3"}
                        title={"暂无符合条件的教师"}
                        style={{ marginTop: "100px" }}
                      ></Empty>
                    )}
                  </Scrollbars>
                </div>
              </Loading>
            </div>
          </TabPane>
        </Tabs>
        <div className="ganger-show-box">
          {!ClassTeacherData.Ganger.IsSet ? (
            <div className="now">
              <SelectTeacherCard
                ganger="now"
                data={SelectGanderData}
                className='my-ganger'
                type="ganger"
              ></SelectTeacherCard>
            </div>
          ) : (
            <div className="new">
              <SelectTeacherCard
                ganger="old"
                data={ClassTeacherData.Ganger}
                type="ganger"
                className='my-ganger'
              ></SelectTeacherCard>
              <SelectTeacherCard
                ganger="new"
                data={SelectGanderData}
                className='my-ganger'
                type="ganger"
              ></SelectTeacherCard>
            </div>
          )}
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
export default connect(mapStateToProps)(SetGanderModal);
