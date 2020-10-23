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
import echarts from "echarts";

// import "../../scss/Main.scss";
import $ from "jquery";
const { MainAction, CommonAction, PublicAction } = actions;

class All extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      Chart_teacher: "",
      Chart_student: "",
      TeacherID: "all-teacher-content",
      StudentID: "all-student-conten",
    };
  }
  componentDidMount() {
    let { dispatch } = this.props;
    let Chart_teacher = this.initEChart(this.state.TeacherID);
    let Chart_student = this.initEChart(this.state.StudentID);
    Chart_teacher.on("click", (params) => {
      let {
        DataState: {
          MainData: {
            SummaryData: { StudentList, TeacherList },
          },
        },
      } = this.props;
      let { dataIndex } = params;
      let id = TeacherList[dataIndex] ? TeacherList[dataIndex].value : "";
      console.log(params, id);
      dispatch(PublicAction.TableLoadingOpen());

      history.push("/UserArchives/Teacher/" + id);
    });
    Chart_student.on("click", (params) => {
      let {
        DataState: {
          MainData: {
            SummaryData: { StudentList, TeacherList },
          },
        },
      } = this.props;
      let { dataIndex } = params;
      let id = StudentList[dataIndex] ? StudentList[dataIndex].value : "";
      console.log(params, StudentList, StudentList[dataIndex], id);
      dispatch(PublicAction.TableLoadingOpen());

      history.push("/UserArchives/Student/" + id);
    });
    this.setState({
      Chart_teacher,
      Chart_student,
    });
  }
  initEChart(id) {
    //获取Chart的真实DOM,虽然react不推荐操作真实DOM,但是Echart对图表的渲染就是基于真实DOM的
    let myChart = echarts.getInstanceByDom(document.getElementById(id));
    if (myChart === undefined) {
      myChart = echarts.init(document.getElementById(id));
    }

    // myChart.setOption(config)
    return myChart;
  }
  componentWillReceiveProps(nextProps) {
    const { DataState } = nextProps;
    this.StudentECharts();
    this.TeacherECharts();
  }
  // 学生总览
  StudentECharts = () => {
    let {
      DataState: {
        MainData: {
          SummaryData: { StudentList, StudentAcount },
        },
        CommonData: {
          RolePower: { LockerVersion_1, IsCollege },
        },
      },
      PublicState: {
        LoginMsg: { Role },
      },
    } = this.props;
    let { Chart_student } = this.state;
    // 绘制图表
    Chart_student.setOption({
      color: new echarts.graphic.LinearGradient(
        0,
        0,
        0,
        1,
        [
          {
            // 0% 处的颜色
            offset: 0,
            color: "#42cfff",
          },
          {
            // 100% 处的颜色
            offset: 1,
            color: "#7c7cfc",
          },
        ],
        false
      ),
      title: {},
      xAxis: {
        type: "category",
        data: this.XData(StudentList),
        //   data: ['一年级','二年级','一年级','二年级','一年级','二年级'],
        name: !IsCollege ? "年级" : "专业",
        nameTextStyle: {
          color: "#999",
          fontSize: "12",
        },
        axisLabel: {
          // interval: 0,
          rotate: this.Xrotate(StudentList),
          width: 30,

          textStyle: {
            color: "#999",
            fontSize: "12",
          },
        },
        axisTick: {
          inside: true,
        },
      },
      yAxis: {
        axisLine: {
          show: false, //隐藏y轴
        },
        axisTick: {
          show: false, //隐藏y轴刻度
        },
        // max: function(value) {
        //     for(let i = 0;)
        //     return value.max + 20;
        // },
        boundaryGap: ["0", "10%"], //y轴上留白
        type: "value",
        name: "学生人数",
        nameTextStyle: {
          color: "#999",
          fontSize: "12",
          padding: [0, 0, 0, 0],
        },
        splitLine: {
          //分隔线样式
          lineStyle: {
            type: "dotted",
            // 使用深浅的间隔色
            color: ["#ccc"],
          },
        },
        axisLabel: {
          // interval: 0,

          textStyle: {
            color: "#999",
            fontSize: "12",
          },
        },
      },
      grid: {
        width: "90%",
        left: "5%",
      },
      series: [
        {
          data: StudentAcount,
          type: "bar",
          label: {
            normal: {
              show: true,
              position: "top",
              textStyle: { color: "#333", fontSize: "12" },
              // backgroundColor:'rgba(250,250,250,0.3)',
              // borderRadius:'4'
            },
            //   emphasis: {
            //     show: true,
            //     textStyle: {
            //       fontSize: "16",
            //     //   fontWeight: "bold"
            //     }
            //   }
          },
          // encode: {
          //   x: [1, 2],
          //   y: 0,
          //   // 表示『维度2』和『维度3』要显示到 tooltip 中。
          //   tooltip: [2, 3]
          // },
          // // 表示给『维度2』和『维度3』分别取名为『年龄』和『满意度』，显示到 tooltip 中。
          // dimensions: [null, null, "年龄", "满意度"],
          formatter: function (params) {
            // console.log(params)
          },
        },
      ],
      barMinHeight: 0, // 最小高度改为0
      // barMaxWidth: '',
      // barWidth: null,        // 默认自适应
      barGap: "30%", // 柱间距离，默认为柱形宽度的30%，可设固定值
      barCategoryGap: this.BarWidth(StudentList), // 类目间柱形距离，默认为类目间距的20%，可设固定值
      itemStyle: {
        barBorderRadius: [5, 5, 0, 0], // 柱条边线圆角，单位px，默认为0
        //   normal: {
        //     // color: '各异',

        //     barBorderColor: "#7c7cfc", // 柱条边线
        //     barBorderRadius: 5, // 柱条边线圆角，单位px，默认为0
        //     barBorderWidth: 1, // 柱条边线线宽，单位px，默认为1
        //     label: {
        //       show: false
        //       // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
        //       //           'inside'|'left'|'right'|'top'|'bottom'
        //       // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
        //     }
        //   },
        //   emphasis: {
        //     // color: '各异',
        //     barBorderColor: "rgba(0,0,0,0)", // 柱条边线
        //     barBorderRadius: 5, // 柱条边线圆角，单位px，默认为0
        //     barBorderWidth: 1, // 柱条边线线宽，单位px，默认为1
        //     label: {
        //       show: false
        //       // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
        //       //           'inside'|'left'|'right'|'top'|'bottom'
        //       // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
        //     }
        //   }
      },
    });
  };
  // 学生总览
  TeacherECharts = () => {
    let {
      DataState: {
        MainData: {
          SummaryData: { TeacherList, TeacherAcount },
        },
        CommonData: {
          RolePower: { LockerVersion_1, IsCollege },
        },
      },
      PublicState: {
        LoginMsg: { Role },
      },
    } = this.props;
    let { Chart_teacher } = this.state;
    // 绘制图表
    Chart_teacher.setOption({
      color: new echarts.graphic.LinearGradient(
        0,
        0,
        0,
        1,
        [
          {
            // 0% 处的颜色
            offset: 0,
            color: "#fb3737",
          },
          {
            // 100% 处的颜色
            offset: 1,
            color: "#ffa800",
          },
        ],
        false
      ),
      title: {},
      xAxis: {
        type: "category",
        data: this.XData(TeacherList),
        name: !IsCollege ? "学科" : "教研室",
        nameTextStyle: {
          color: "#999",
          fontSize: "12",
        },
        axisTick: {
          inside: true,
        },
        axisLabel: {
          // interval: 0,
          rotate: this.Xrotate(TeacherList),
          width: 30,
          rich: {},
          textStyle: {
            color: "#999",
            // bold:false
            fontSize: "12",
          },
        },
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        boundaryGap: ["0", "10%"],
        type: "value",
        name: "教师人数",
        nameTextStyle: {
          color: "#999",
          fontSize: "12",
          padding: [0, 0, 0, 0], //控制name位置
        },
        axisLabel: {
          // interval: 0,

          textStyle: {
            color: "#999",
            fontSize: "12",
          },
        },
        color: "#999",
        fontSize: "12",
        splitLine: {
          lineStyle: {
            type: "dotted",
            // 使用深浅的间隔色
            color: ["#ccc"],
          },
        },
        //   axisTick:{
        //     lineStyle:{type:'dotted'}
        //   } ,
      },
      grid: {
        width: "90%", //图像宽度
        left: "5%", //图像容器左偏移
      },
      series: [
        {
          data: TeacherAcount,

          type: "bar",
          label: {
            normal: {
              show: true,
              position: "top",
              textStyle: { color: "#333", fontSize: "12" },
            },
          },
        },
      ],
      barMinHeight: 0, // 最小高度改为0
      // barWidth: null,        // 默认自适应
      barGap: "30%", // 柱间距离，默认为柱形宽度的30%，可设固定值
      barCategoryGap: this.BarWidth(TeacherList), // 类目间柱形距离，默认为类目间距的20%，可设固定值
      itemStyle: {
        barBorderRadius: [5, 5, 0, 0], // 柱条边线圆角，单位px，默认为0

        //   normal: {
        //     // color: '各异',

        //     barBorderColor: "#ffa800", // 柱条边线
        //     barBorderRadius: 5, // 柱条边线圆角，单位px，默认为0
        //     barBorderWidth: 1, // 柱条边线线宽，单位px，默认为1
        //     label: {
        //       show: false
        //       // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
        //       //           'inside'|'left'|'right'|'top'|'bottom'
        //       // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
        //     }
        //   },
        //   emphasis: {
        //     // color: '各异',
        //     barBorderColor: "rgba(0,0,0,0)", // 柱条边线
        //     barBorderRadius: 5, // 柱条边线圆角，单位px，默认为0
        //     barBorderWidth: 1, // 柱条边线线宽，单位px，默认为1
        //     label: {
        //       show: false
        //       // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
        //       //           'inside'|'left'|'right'|'top'|'bottom'
        //       // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
        //     }
        //   }
      },
    });
  };
  // x坐标倾斜
  Xrotate = (data) => {
    // console.log(data)
    if (!(data instanceof Array)) {
      return 25;
    }
    let len = data.length;
    if (len <= 6) {
      return 0;
    } else {
      return 25;
    }
  };
  // X处理名称样式
  XData = (data) => {
    // console.log(data)
    if (!(data instanceof Array)) {
      return data;
    }
    return data.map((child) => {
      let dots = "";
      if (child.title.length >= 9) {
        dots = "...";
      }
      let value = child.title.split("").splice(0, 8).join("") + dots;
      let textStyle = {};
      return { value, textStyle };
    });
  };
  // 柱状图 柱宽
  BarWidth = (data) => {
    if (!(data instanceof Array)) {
      return "50%";
    }
    let len = data.length;
    if (len <= 3) {
      return "80%";
    } else if (len <= 6) {
      return "65%";
    } else return "50%";
  };
  render() {
    const {
      DataState: {
        MainData: {
          SummaryData: {
            Total,
            Student,
            Teacher,
            Leader,
            StudentList,
            TeacherList,
          },
        },
        CommonData: {
          RolePower: { LockerVersion_1, IsCollege, NoLeader },
        },
      },
      PublicState: {
        LoginMsg: { Role },
      },
    } = this.props;
    return (
      <div id="All" className="Content">
        <div className="All-box All-user">
          <p className="All-tips">
            <span
              className="tips "
              style={{
                paddingLeft: 0,
                fontSize: "14px",
                fontWeight: "blod",
                color: "#999",
              }}
            >
              用户总人数:
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "blod",
                  color: "#ff6600",
                }}
              >
                {Total}
              </span>
              ，其中学生人数:
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "blod",
                  color: "#ff6600",
                }}
              >
                {Student}
              </span>
              ，教师人数:
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "blod",
                  color: "#ff6600",
                }}
              >
                {Teacher}
              </span>
              {!LockerVersion_1 && !NoLeader ? (
                <>
                  ，领导人数:
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "blod",
                      color: "#ff6600",
                    }}
                  >
                    {Leader}
                  </span>
                </>
              ) : (
                ""
              )}
            </span>
          </p>
        </div>
        <div className="All-box All-student">
          <p className="All-tips">
            <span className="tips menu10 ">
              {!IsCollege ? "各年级学生人数统计" : "各专业学生人数统计"}
            </span>
          </p>
          <div className="All-hr"></div>
          <div
            id={this.state.StudentID}
            className="All-content student-content"
          ></div>
        </div>
        <div className="All-box All-teacher">
          <p className="All-tips">
            <span className="tips menu10 ">
              {!IsCollege ? "各学科教师人数统计" : "各教研室教师人数统计"}
            </span>
          </p>
          <div className="All-hr"></div>
          <div
            id={this.state.TeacherID}
            className="All-content teacher-content"
          ></div>
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
export default connect(mapStateToProps)(All);
