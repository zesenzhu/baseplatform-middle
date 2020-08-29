import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import { Tabs, DatePicker, Tooltip } from "antd";
import Public from "../../../../common/js/public";
import "./scss/index.scss";
import { Loading, Empty } from "../../../../common";
import ContentItem from "../contentItem";
import LinkBtn from "../linkBtn";
import moment from "moment";
const { TabPane } = Tabs;
let { MainActions, CommonActions } = actions;

class MoralEdu extends Component {
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
          MoralEduParams: { semester, PageNum, PageSize, Title },
        },
      },
      systemUrl: { Urls },
      targetUser: { UserID },
      termInfo: { Term },
      loginUser: { SchoolID },

      userArchives: { ClassID, GradeID },
    } = nextProps;
    // let {}
    let token = sessionStorage.getItem("token");
    if (firstTime && Term && token && UserID && Urls["E34"].WebUrl) {
      this.setState({
        firstTime: false,
      });
      dispatch(
        CommonActions.SetClassMoralEduInfoByCriteriasParams({
          Proxy: Urls["E34"].WebUrl,
          // Urls["810"].WsUrl,
          Token: token,
          Semester: Term,

          UserID,
          // SelectBar: "NearExam",
        })
      );
      dispatch(
        MainActions.GetClassMoralEduInfoByCriterias({
          func: () => {},
        })
      );
    }
  }
  onShowAllClick = () => {
    let { dispatch } = this.props;
    dispatch(
      CommonActions.SetClassMoralEduInfoByCriteriasParams({
        ShowAll: true,
        // SelectBar: "NearExam",
      })
    );
  };
  render() {
    let {
      MoreData: {
        CommonData: {
          MoralEduParams: { ShowAll },
        },
        MainData: {
          MoralEduInfo: {
            totalScore,
            data: { data },
          },
        },
      },
    } = this.props;
    let { firstTime } = this.state;
    let AllScore = 0;
    data instanceof Array && data.forEach((child, index) => {});
    return (
      <ContentItem type="pe" tabName={"德育"}>
        <Loading
          //  tip="加载中..."
          size="small"
          opacity={false}
          spinning={firstTime}
        >
          <div className="MoralEdu">
            <div className="SR-top">
              <span className="SRt-left">
                德育总分:
                <span title={totalScore || totalScore === 0 ? totalScore : ""}>
                  {totalScore || totalScore === 0 ? totalScore : "--"}
                </span>
              </span>
              {data instanceof Array && data.length > 2 ? (
                <LinkBtn
                  onClick={this.onShowAllClick}
                  type="all"
                  className="SRt-go"
                >
                  查看全部
                </LinkBtn>
              ) : (
                ""
              )}
            </div>
            <div className="SQ-box">
              {data instanceof Array && data.length > 0 ? (
                data.map((child, index) => {
                  let people = [];
                  let peopleStr = [];
                  child.userInfo instanceof Array &&
                    child.userInfo.map((child, index) => {
                      people.push(child.userName);
                    });
                  peopleStr = people.join(",");
                  let moralityExaminationStandard = child.moralityExaminationStandard
                    ? child.moralityExaminationStandard
                    : {};
                  let content =
                    moralityExaminationStandard.examinationItems instanceof
                    Array
                      ? moralityExaminationStandard.examinationItems.find(
                          (chid) => {
                            return chid.id === child.examinationItemId;
                          }
                        )
                      : {};
                  let ScoreType = "";
                  let ScoreCType = "";

                  if (moralityExaminationStandard.examinationType === 1) {
                    ScoreType = "well";
                    ScoreCType = "奖励";
                  } else if (
                    moralityExaminationStandard.examinationType === 0
                  ) {
                    ScoreType = "bad";
                    ScoreCType = "惩罚";
                  } else {
                    ScoreType = "normal";
                    ScoreCType = "--";
                  }
                  let ExamTime = moment(child.examinationTime).format(
                    "YYYY-MM-DD"
                  );
                  if (index >= 2 && !ShowAll) {
                    //没有显示全部就只显示2个
                    return;
                  }
                  return (
                    <div key={index} className="ME-box">
                      <p
                        title={
                          moralityExaminationStandard.examinationContent
                            ? moralityExaminationStandard.examinationContent
                            : ""
                        }
                        className="examinationContent"
                      >
                        <i></i>
                        {moralityExaminationStandard.examinationContent
                          ? moralityExaminationStandard.examinationContent
                          : "--"}
                      </p>
                      <p
                        className="itemContent"
                        title={
                          peopleStr +
                          people.length +
                          "位同学" +
                          (ScoreType === "well" ? "荣获" : "") +
                          (content.itemContent ? content.itemContent : "")
                        }
                      >
                        {peopleStr +
                          people.length +
                          "位同学" +
                          (ScoreType === "well" ? "荣获" : "") +
                          (content.itemContent ? content.itemContent : "")}
                      </p>
                      <p className="content">
                        <span className={`score ${ScoreType}`}>
                          考核分数:
                          <span
                            title={
                              content.itemScore || content.itemScore === 0
                                ? content.itemScore + "分"
                                : ""
                            }
                          >
                            {content.itemScore || content.itemScore === 0
                              ? (content.ScoreType === "well" ? "+" : "") +
                                content.itemScore
                              : "--"}
                            分
                          </span>
                        </span>
                        <span className="type">
                          考核类型: <span>{ScoreCType}</span>
                        </span>
                        <span className="time">
                          考核时间: <span title={ExamTime}>{ExamTime}</span>
                        </span>
                        <span className="examinationDept">
                          考核部门:
                          <span title={child.examinationDept}>
                            {child.examinationDept}
                          </span>
                        </span>
                      </p>
                      <p className="remark">
                        <span className="title">备注说明:</span>

                        <span
                          className="tip"
                          title={child.remark ? child.remark : ""}
                        >
                          {child.remark ? child.remark : "--"}
                        </span>
                      </p>
                    </div>
                  );
                })
              ) : (
                <Empty
                  style={{ marginBottom: "20px" }}
                  type={"4"}
                  title={"暂无德育信息"}
                ></Empty>
              )}
              {/* {StuQualityList instanceof Array && StuQualityList.length > 0 ? (
                StuQualityList.map((child, index) => {
                  return (
                    <div className="SQb-bar">
                      {child.map((child1, index1) => {
                        return (
                          <div className={`SQb-content`}>
                            <div
                              title={child1.RankName ? child1.RankName : ""}
                              className="SQbc-top"
                            >
                              {child1.RankName ? child1.RankName : "--"}
                            </div>
                            <p className="SQbc-bottom">{child1.ItemName}</p>
                          </div>
                        );
                      })}
                    </div>
                  );
                })
              ) : (
                <Empty
                  style={{ marginBottom: "20px" }}
                  type={"4"}
                  title={"暂无综合评价"}
                ></Empty>
              )} */}
            </div>
          </div>{" "}
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
export default connect(mapStateToProps)(MoralEdu);
