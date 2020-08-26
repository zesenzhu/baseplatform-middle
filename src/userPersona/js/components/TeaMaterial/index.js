import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import { Tabs, DatePicker, Tooltip } from "antd";
import Public from "../../../../common/js/public";
import "./scss/index.scss";
import { Loading, Empty, DropDown } from "../../../../common";
import ContentItem from "../contentItem";
import LinkBtn from "../linkBtn";
import echarts from "echarts";
const { TabPane } = Tabs;
let { MainActions, CommonActions } = actions;

class TeaMaterial extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      firstTime: true, //是否第一次，进行接口请求控制
      firstShow: false, //是否第一次，进行接口请求控制
      secondShow: false, //是否第一次，进行接口请求控制
      thirdShow: false, //是否第一次，进行接口请求控制
      firstAllScore: 0,
      firstSubjectScore: 0,
      secondAllScore: 0,
      secondSubjectScore: 0,
      thirdAllScore: 0,
      thirdSubjectScore: 0,
    };
  }
  componentWillMount() {}
  componentWillReceiveProps(nextProps) {
    let { firstTime, firstShow, secondShow, thirdShow } = this.state;
    let {
      dispatch,
      MoreData: {
        CommonData: {
          TeaWorkParams: { Semester, Proxy },
        },
      },
      systemUrl: { Urls },
      targetUser: { UserID, UserType },
      termInfo: { Term, TermEndDate, TermStartDate },
      userArchives: { ShortName, ClassID, GradeID, SchoolID, UserName },
    } = nextProps;
    // let {}
    let that = this;
    let token = sessionStorage.getItem("token");
    if (firstTime && UserID && UserType && SchoolID) {//获取周信息
      this.setState({
        firstTime: false,
      });
      dispatch(MainActions.GetTermAndPeriodAndWeekNOInfo({}));
    }
    // 电子资源
    if (
      !firstShow &&
      token &&
      TermStartDate &&
      TermEndDate &&
      Urls["C10"].WebUrl
    ) {
      this.setState({
        firstShow: true,
      });
      dispatch(
        CommonActions.SetTeaMaterialParams({
          FirstProxy: Urls["C10"].WebUrl,
          // Urls["810"].WsUrl,
          Token: token,
          StartTime: TermStartDate,
          EndTime: TermEndDate,
          // SelectBar: "NearExam",
        })
      );

      dispatch(
        MainActions.GetTeacherResView({
          func: this.ResVeiwChart,
        })
      );
    }
    // 教案
    if (
      !secondShow &&
      token &&
      TermStartDate &&
      TermEndDate &&
      Urls["301"].WebUrl
    ) {
      this.setState({
        secondShow: true,
      });
      dispatch(
        CommonActions.SetTeaMaterialParams({
          SecondProxy: Urls["301"].WebUrl,
          // Urls["810"].WsUrl,
          Token: token,
          StartTime: TermStartDate,
          EndTime: TermEndDate,
          // SelectBar: "NearExam",
        })
      );

      dispatch(
        MainActions.GetTeachPlanStatistics({
          func: this.TeachPlanChart,
        })
      );
    }
    // 课程精品
    if (
      !thirdShow &&
      token &&
      TermStartDate &&
      TermEndDate &&
      Urls["D21"].WebUrl
    ) {
      this.setState({
        thirdShow: true,
      });
      dispatch(
        CommonActions.SetTeaMaterialParams({
          ThirdProxy: Urls["D21"].WebUrl,
          // Urls["810"].WsUrl,
          Token: token,
          StartTime: TermStartDate,
          EndTime: TermEndDate,
          // SelectBar: "NearExam",
        })
      );

      dispatch(
        MainActions.GetTeacherpercentage({
          func: this.TeachPercentChart,
        })
      );
    }

    // 测试
    this.ResVeiwChart(this.props);
    this.TeachPlanChart(this.props);
    this.TeachPercentChart(this.props);
  }

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
      MainActions.GetTeachPlanStatistics({
        func: () => {},
      })
    );
  };
  //
  ResVeiwChart = () => {
    let {
      MoreData: {
        MainData: {
          TeacherResView: {
            UploadAllScale, //上传数量领先全校比值
            UploadSubjectScale, //上传数量领先本学科比值
          },
        },
      },
    } = this.props;
    let that = this;

    let SubjectScale = 0;
    UploadAllScale =
      UploadAllScale || UploadAllScale === 0 ? UploadAllScale : 0;
    UploadSubjectScale instanceof Array &&
      UploadSubjectScale.map((child) => {});
    if (document.getElementById("ResView")) {
      let mychart = echarts.init(document.getElementById("ResView"), null, {
        renderer: "svg",
      });
      mychart.resize();

      if (
        UploadSubjectScale instanceof Array &&
        UploadSubjectScale.length > 0
      ) {
        let len = UploadSubjectScale.length;
        UploadSubjectScale.map((child, index) => {
          setTimeout(() => {
            let data = {
              SubjectName: child.SubjectName,
              UploadAllScale,
              SubjectScale: child.SubjectScale,
            };
            that.setState({
              firstAllScore: UploadAllScale,
              firstSubjectScore: child.SubjectScale,
            });
            that.SetEChart(data, mychart);
            setInterval(() => {
              that.setState({
                firstAllScore: UploadAllScale,
                firstSubjectScore: child.SubjectScale,
              });
              that.SetEChart(data, mychart);
            }, len * 4000);
          }, 4000 * index);
        });
      } else {
        let data = {
          SubjectName: "同学科",
          UploadAllScale,
          SubjectScale: 0,
        };
        that.SetEChart(data, mychart);
      }

      window.addEventListener("resize", () => {
        mychart.resize();
      });
    }
  };
  //
  TeachPlanChart = () => {
    let {
      MoreData: {
        MainData: {
          TeachPlan: {
            UploadAllScale, //上传数量领先全校比值
            UploadSubjectScale, //上传数量领先本学科比值
          },
        },
      },
    } = this.props;
    let that = this;

    let SubjectScale = 0;
    UploadAllScale =
      UploadAllScale || UploadAllScale === 0 ? UploadAllScale : 0;
    UploadSubjectScale instanceof Array &&
      UploadSubjectScale.map((child) => {});
    if (document.getElementById("TeachPlan")) {
      let mychart = echarts.init(document.getElementById("TeachPlan"), null, {
        renderer: "svg",
      });
      mychart.resize();

      if (
        UploadSubjectScale instanceof Array &&
        UploadSubjectScale.length > 0
      ) {
        let len = UploadSubjectScale.length;
        UploadSubjectScale.map((child, index) => {
          setTimeout(() => {
            let data = {
              SubjectName: child.SubjectName,
              UploadAllScale,
              SubjectScale: child.SubjectScale,
            };
            that.setState({
              secondAllScore: UploadAllScale,
              secondSubjectScore: child.SubjectScale,
            });
            that.SetEChart(data, mychart);
            setInterval(() => {
              that.setState({
                secondAllScore: UploadAllScale,
                secondSubjectScore: child.SubjectScale,
              });
              that.SetEChart(data, mychart);
            }, len * 4000);
          }, 4000 * index);
        });
      } else {
        let data = {
          SubjectName: "同学科",
          UploadAllScale,
          SubjectScale: 0,
        };
        that.SetEChart(data, mychart);
      }

      window.addEventListener("resize", () => {
        mychart.resize();
      });
    }
  };
  //
  TeachPercentChart = () => {
    let {
      MoreData: {
        MainData: {
          TeachPercent: {
            uploadAllScale: UploadAllScale, //上传数量领先全校比值
            UploadSubjectScale, //上传数量领先本学科比值
          },
        },
      },
    } = this.props;
    let that = this;

    let SubjectScale = 0;
    UploadAllScale =
      UploadAllScale || UploadAllScale === 0 ? UploadAllScale : 0;
    UploadSubjectScale instanceof Array &&
      UploadSubjectScale.map((child) => {});
    if (document.getElementById("TeachPercent")) {
      let mychart = echarts.init(
        document.getElementById("TeachPercent"),
        null,
        {
          renderer: "svg",
        }
      );
      mychart.resize();

      if (
        UploadSubjectScale instanceof Array &&
        UploadSubjectScale.length > 0
      ) {
        let len = UploadSubjectScale.length;
        UploadSubjectScale.map((child, index) => {
          setTimeout(() => {
            let data = {
              SubjectName: child.SubjectName,
              UploadAllScale,
              SubjectScale: child.SubjectScale,
            };
            that.setState({
              thirdAllScore: UploadAllScale,
              thirdSubjectScore: child.SubjectScale,
            });
            that.SetEChart(data, mychart);
            setInterval(() => {
              that.setState({
                thirdAllScore: UploadAllScale,
                thirdSubjectScore: child.SubjectScale,
              });
              that.SetEChart(data, mychart);
            }, len * 4000);
          }, 4000 * index);
        });
      } else {
        let data = {
          SubjectName: "同学科",
          UploadAllScale,
          SubjectScale: 0,
        };
        that.SetEChart(data, mychart);
      }

      window.addEventListener("resize", () => {
        mychart.resize();
      });
    }
  };
  // 设置echart
  SetEChart = (data, mychart) => {
    let { SubjectName, UploadAllScale, SubjectScale } = data;

    let option = {
      legend: {
        orient: "vertical",
        left: "center",
        top: "center",
        data: ["全校教师", SubjectName],
        itemWidth: 12,
        itemHeight: 12,
        selectedMode: false,
        textStyle: {
          fontFamily: "微软雅黑",
          fontSize: 12,
        },
      },
      color: ["#ff6f61", "#8099ff"],
      angleAxis: {
        max: 100, // 满分
        clockwise: false, // 逆时针
        // 隐藏刻度线
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      radiusAxis: {
        type: "category",
        // 隐藏刻度线
        axisLine: {
          show: false,
        },
        z: 10,
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          interval: 0,
        },
        splitLine: {
          show: true,
        },
      },
      polar: {
        center: ["50%", "50%"],
        radius: "163%", //图形大小
      },
      series: [
        {
          type: "bar",
          name: SubjectName,
          data: [
            {
              value: `${SubjectScale <= 0 ? 0.1 : SubjectScale * 100}`,
              itemStyle: {
                normal: {
                  color: "#ff6f61",
                },
              },
            },
          ],
          coordinateSystem: "polar",
          roundCap: true,
          barWidth: 10,
          barGap: 0.8,
        },
        {
          type: "bar",
          name: "全校教师",
          data: [
            {
              value: `${UploadAllScale <= 0 ? 0.1 : UploadAllScale * 100}`,
              itemStyle: {
                color: "#8099ff",
              },
            },
          ],
          coordinateSystem: "polar",
          roundCap: true,
          barWidth: 10,
        },
      ],
    };
    mychart.setOption(option);
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
          TeacherResView,
          TeachPlan,
          TeachPercent,
        },
      },
    } = this.props;
    let {
      firstShow,
      secondShow,
      thirdShow,
      firstAllScore,
      firstSubjectScore,
      secondAllScore,
      secondSubjectScore,
      thirdAllScore,
      thirdSubjectScore,
    } = this.state;

    return (
      <ContentItem type="material" tabName={"教学资料统计"}>
        <Loading
          //  tip="加载中..."
          size="small"
          opacity={false}
          spinning={
            false
            // !firstShow && !secondShow && !thirdShow
          }
        >
          <div className="TeaMaterial">
            <div className="SR-top">
              {/* {AllTerm instanceof Array && AllTerm.length > 0 ? (
                <DropDown
                  ref="Semester"
                  width={180}
                  height={240}
                  style={{ zIndex: 10 }}
                  onChange={this.onSemesterChange}
                  dropList={AllTerm}
                  dropSelectd={{ value: Semester, title: SemesterC }}
                ></DropDown>
              ) : (
                ""
              )} */}
            </div>
            <div className="SQ-box">
              <div className="TW-content">
                <div className="TWc-left">
                  <p
                    title={
                      TeacherResView.UploadCount ||
                      TeacherResView.UploadCount === 0
                        ? TeacherResView.UploadCount
                        : ""
                    }
                    className="count"
                  >
                    {TeacherResView.UploadCount ||
                    TeacherResView.UploadCount === 0
                      ? TeacherResView.UploadCount
                      : "--"}
                  </p>
                  <p className="name">上传电子资源</p>
                  <p className="UseCount">
                    浏览:
                    <span title={TeacherResView.BrowseCount}>
                      {TeacherResView.BrowseCount}
                    </span>
                  </p>
                </div>
                <div className="TWc-right">
                  <div className="chartsbox" id="ResView"></div>
                  <p className="AllScore">
                    领先
                    {firstAllScore > 0
                      ? (firstAllScore * 100).toFixed(1)
                      : "0.0"}
                    %
                  </p>
                  <p className="SubjectScore">
                    领先
                    {firstSubjectScore > 0
                      ? (firstSubjectScore * 100).toFixed(1)
                      : "0.0"}
                    %
                  </p>
                </div>
              </div>
              <div className="TW-content">
                <div className="TWc-left">
                  <p
                    title={
                      TeachPlan.UploadCount || TeachPlan.UploadCount === 0
                        ? TeachPlan.UploadCount
                        : ""
                    }
                    className="count"
                  >
                    {TeachPlan.UploadCount || TeachPlan.UploadCount === 0
                      ? TeachPlan.UploadCount
                      : "--"}
                  </p>
                  <p className="name">制作教学方案</p>
                  <p className="UseCount">
                    应用数:
                    <span title={TeachPlan.UseCount}>
                      {TeachPlan.UseCount}次
                    </span>
                  </p>
                </div>
                <div className="TWc-right">
                  <div className="chartsbox" id="TeachPlan"></div>
                  <p className="AllScore">
                    领先
                    {secondAllScore > 0
                      ? (secondAllScore * 100).toFixed(1)
                      : "0.0"}
                    %
                  </p>
                  <p className="SubjectScore">
                    领先
                    {secondSubjectScore > 0
                      ? (secondSubjectScore * 100).toFixed(1)
                      : "0.0"}
                    %
                  </p>
                </div>
              </div>
              <div className="TW-content">
                <div className="TWc-left">
                  <p
                    title={
                      TeachPercent.uploadCount || TeachPercent.uploadCount === 0
                        ? TeachPercent.uploadCount
                        : ""
                    }
                    className="count"
                  >
                    {TeachPercent.uploadCount || TeachPercent.uploadCount === 0
                      ? TeachPercent.uploadCount
                      : "--"}
                  </p>
                  <p className="name">录制精品课程</p>
                  <p className="UseCount">
                    浏览:
                    <span title={TeachPercent.browseCount}>
                      {TeachPercent.browseCount}
                    </span>
                  </p>
                </div>
                <div className="TWc-right">
                  <div className="chartsbox" id="TeachPercent"></div>
                  <p className="AllScore">
                    领先
                    {thirdAllScore > 0
                      ? (thirdAllScore * 100).toFixed(1)
                      : "0.0"}
                    %
                  </p>
                  <p className="SubjectScore">
                    领先
                    {thirdSubjectScore > 0
                      ? (thirdSubjectScore * 100).toFixed(1)
                      : "0.0"}
                    %
                  </p>
                </div>
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
export default connect(mapStateToProps)(TeaMaterial);
