import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import { Tabs, DatePicker, Tooltip } from "antd";
import Public from "../../../../common/js/public";
import "./scss/index.scss";
import { Loading, Empty } from "../../../../common";
import ContentItem from "../contentItem";
import LinkBtn from "../linkBtn";

const { TabPane } = Tabs;
let { MainActions, CommonActions } = actions;

class StuQuality extends Component {
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
        CommonData: { StuQualityParams },
      },
      systemUrl: { Urls },
      targetUser: { UserID },
      termInfo: { Term },
      loginUser: { SchoolID },

      userArchives: { ClassID, GradeID },
    } = nextProps;
    // let {}

    if (firstTime && Term && UserID && Urls["810"].WsUrl) {
      this.setState({
        firstTime: false,
      });
      dispatch(
        CommonActions.SetStuQualityParams({
          Proxy: Urls["810"].WsUrl,

          Term,

          XH: UserID,
          // SelectBar: "NearExam",
        })
      );
      dispatch(
        MainActions.GetStudentQuality({
          func: () => {},
        })
      );
    }
  }

  render() {
    let {
      MoreData: {
        CommonData: { StuQualityParams },
        MainData: { StuQualityData },
      },
      systemUrl: {
        Urls: { E34 },
      },
      identifyInfo,
    } = this.props;
    let { firstTime } = this.state;
    let List = [];
    let StuQualityList = [];
    let i = 0;
    StuQualityData instanceof Array &&
      StuQualityData.forEach((child, index) => {
        if (i < 4) {
          List.push(child);
          i++;
          if (index === StuQualityData.length - 1) {
            StuQualityList.push(List);
          }
        } else {
          i = 0;
          List.push(child);

          StuQualityList.push(List);
          List = [];
        }
      });
    return (
      <ContentItem type="comment" tabName={"综合评价"}>
        <Loading
          //  tip="加载中..."
          size="small"
          opacity={false}
          spinning={firstTime}
        >
          <div className="StuQuality">
            <div className="SR-top">
              {E34 && E34.WebUrl ? (
                <LinkBtn
                  type="comment"
                  className="SRt-go"
                  onClick={() => {
                    let token = sessionStorage.getItem("token");
                    window.open(
                      E34.WebUrl +
                        "/index_user.html?lg_tk=" +
                        token +
                        "&lg_ic=" +
                        identifyInfo[0].IdentityCode +
                        "#6|3|0"
                    );
                  }}
                >
                  综合素养查询
                </LinkBtn>
              ) : (
                ""
              )}
            </div>
            <div className="SQ-box">
              {StuQualityList instanceof Array && StuQualityList.length > 0 ? (
                StuQualityList.map((child, index) => {
                  return (
                    <div key={index} className="SQb-bar">
                      {child.map((child1, index1) => {
                        return (
                          <div key={index1} className={`SQb-content`}>
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
              )}
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
export default connect(mapStateToProps)(StuQuality);
