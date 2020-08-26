import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import { Tabs, DatePicker, Tooltip } from "antd";
import Public from "../../../../common/js/public";
import "./scss/index.scss";
import { Loading, Empty, DropDown } from "../../../../common";
import ContentItem from "../contentItem";
import LinkBtn from "../linkBtn";

const { TabPane } = Tabs;
let { MainActions, CommonActions } = actions;

class TeaWork extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      firstTime: true, //是否第一次，进行接口请求控制
    };
  }
  componentWillMount() {}
  componentWillReceiveProps(nextProps) {
    let { firstTime } = this.state;
    let {
      dispatch,
      MoreData: {
        CommonData: {
          TeaWorkParams: { Semester, Proxy },
        },
      },
      systemUrl: { Urls },
      targetUser: { UserID },
      termInfo: { Term },
      loginUser:{SchoolID},

      userArchives: { ShortName, ClassID, GradeID, UserName },
    } = nextProps;
    // let {}
    let token = sessionStorage.getItem("token");
    if (firstTime && token && Term && ShortName && Urls["E34"].WsUrl) {
      this.setState({
        firstTime: false,
      });
      dispatch(
        CommonActions.SetTeaWorkParams({
          Proxy: Urls["E34"].WsUrl,
          // Urls["810"].WsUrl,
          Token: token,
          Semester: Term,
          UserName: UserID,
          SemesterC: this.constructTerm(Term),
          // SelectBar: "NearExam",
        })
      );

      dispatch(
        MainActions.GetAllTerm({
          func: () => {},
        })
      );
      dispatch(
        MainActions.GetTeacherWork({
          func: () => {},
        })
      );
    }
  }
  constructTerm = (Term) => {
    if (Term.includes("-")) {
      let Term1 = Term.slice(0, Term.length - 2);
      let Term2 = Term.slice(Term.length - 2, Term.length);
      let TermC = "";
      if (Term2 === "01") {
        TermC = "第一学期";
      } else if (Term2 === "02") {
        TermC = "第二学期";
      }
      return Term1 + "学年" + TermC;
    }
    return "";
  };
  onSemesterChange = (value) => {
    let { dispatch } = this.props;
    dispatch(
      CommonActions.SetTeaWorkParams({
        // Urls["810"].WsUrl,
        Semester: value.value,
        SemesterC: value.title,
        // SelectBar: "NearExam",
      })
    );
    dispatch(
      MainActions.GetTeacherWork({
        func: () => {},
      })
    );
  };
  render() {
    let {
      MoreData: {
        CommonData: {
          TeaWorkParams: { SemesterC, Semester },
        },
        MainData: {
          TeaWorkData: { data },
          AllTerm,
        },
      },
    } = this.props;
    let { firstTime } = this.state;
    let List = {};
    let {
      administrativeClassNum, //行政班数
      classNum, //教学班数
      invigilationNum, //监考数
      scheduleCount, //课程数
    } = data instanceof Array && data.length > 0 ? data[0] : {};
    return (
      <ContentItem type="work" tabName={"教学工作量统计"}>
        <Loading
          //  tip="加载中..."
          size="small"
          opacity={false}
          spinning={firstTime}
        >
          <div className="TeaWork">
            <div className="SR-top">
              {AllTerm instanceof Array && AllTerm.length > 0 ? (
                <DropDown
                  ref="Semester"
                  width={180}
                  height={240}
                  style={{zIndex:10}}
                  onChange={this.onSemesterChange}
                  dropList={AllTerm}
                  dropSelectd={{ value: Semester, title: SemesterC }}
                ></DropDown>
              ) : (
                ""
              )}
            </div>
            <div className="SQ-box">
              <div className="TW-content">
                <div className="TWc-ball scheduleCount">
                  <p
                    className="num"
                    title={
                      scheduleCount || scheduleCount === 0 ? scheduleCount : ""
                    }
                  >
                    {scheduleCount || scheduleCount === 0
                      ? scheduleCount
                      : "--"}
                  </p>
                </div>
                <p className="title">课程总节数</p>
              </div>
              <div className="TW-content">
                <div className="TWc-ball administrativeClassNum">
                  <p
                    className="num "
                    title={
                      administrativeClassNum || administrativeClassNum === 0
                        ? administrativeClassNum
                        : ""
                    }
                  >
                    {administrativeClassNum || administrativeClassNum === 0
                      ? administrativeClassNum
                      : "--"}
                  </p>
                </div>
                <p className="title">行政班数(班主任)</p>
              </div>
              <div className="TW-content">
                <div className="TWc-ball classNum">
                  <p
                    className="num "
                    title={classNum || classNum === 0 ? classNum : ""}
                  >
                    {classNum || classNum === 0 ? classNum : "--"}
                  </p>
                </div>
                <p className="title">教学班数(任课教师)</p>
              </div>
              <div className="TW-content">
                <div className="TWc-ball invigilationNum">
                  <p
                    className="num "
                    title={
                      invigilationNum || invigilationNum === 0
                        ? invigilationNum
                        : ""
                    }
                  >
                    {invigilationNum || invigilationNum === 0
                      ? invigilationNum
                      : "--"}
                  </p>
                </div>
                <p className="title">监考数量</p>
              </div>
            </div>
          </div>
        </Loading>
      </ContentItem>
    );
  }
}

const mapStateToProps = (state) => {
  let { UIState, DataState, PublicState } = state;
  return {
    ...state,
  };
};
export default connect(mapStateToProps)(TeaWork);
