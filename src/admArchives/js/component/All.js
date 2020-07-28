import React from "react";
import { connect } from "react-redux";
import "../../scss/All.scss";
import PropTypes from "prop-types";
import "../../../common/scss/_left_menu.scss";
import history from "../containers/history";
import echarts from "echarts";
import actions from "../actions";

class All extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UIState: props.UIState,
      DataState: props.DataState,
      refresh: true,
      userMsg: props.DataState.LoginUser
    };
  }
  componentDidMount() {}
  componentWillUpdate() {}
  componentWillReceiveProps(nextProps) {
    const { DataState, UIState, dispatch } = nextProps;
    let userMsg = DataState.LoginUser;
    let userData = DataState.AllUserPreview;
    // if (JSON.stringify(userData) !== '{}')
    if (
      Object.keys(userData.NewGrades).length > 0 &&
      Object.keys(userData.NewSubjects).length > 0 &&
      this.state.refresh
    ) {
      this.setState({
        refresh: false
      });
      // console.log(userData)
      // 基于准备好的dom，初始化echarts实例
      let Chart_user = echarts.init(
        document.getElementById("all-user-content")
      );
      // 绘制图表
      Chart_user.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        // color: [
        //   "#7c7cfc",
        //   "#ffa800",
        //   "#90b915",
        //   "#d48265",
        //   "#91c7ae",
        //   "#749f83",
        //   "#ca8622",
        //   "#bda29a",
        //   "#6e7074",
        //   "#546570",
        //   "#c4ccd3"
        // ],
        legend: {
          orient: "vertical",
          tooltip: {
            show: true
          },
          left: 408,
          top: 115,
          itemWidth: 18,
          itemHeight: 12,

          data: [
            // '学生人数',
            // '教师人数',
            // '领导人数'
            // {
            //     name: '学生人数',
            //     textStyle: {
            //         color: '#666666'
            //     },
            // },
            // {
            //     name: '教师人数',
            //     textStyle: {
            //         color: '#666666'
            //     },
            //     },
            // {
            //     name: '领导人数',
            //     textStyle: {
            //         color: '#666666'
            //     },
            // }
          ]
        },
        // pie:{
        //     center: ['40%', '50%'],
        // },
        series: [
          {
            name: "总人数:"+userData.Total,
            type: "pie",
            radius: ["23.5%", "70.6%"],
            avoidLabelOverlap: false,
            center: ["476", "50%"],
            cursor:'auto',
            label: {
              normal: {
                show: false,
                position: "left"
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: "16",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: userData.Student,
                name: "学生人数",
                itemStyle: {
                  normal: {
                    borderColor: "#fff",
                    borderWidth: 1,
                    // color: new echarts.graphic.RadialGradient(
                    //     0.5, 0.5, 0.5,
                    //     [

                    //       {
                    //         // 0% 处的颜色
                    //         offset: 0,
                    //         color: "#7c7cfc"
                    //       },
                    //     //   {
                    //     //       offset:0.5,
                    //     //       color:'#3da5cb'
                    //     //   },
                    //       {
                    //         // 100% 处的颜色
                    //         offset: 1,
                    //         color: '#42cfff'
                    //       }
                    //     ],
                    //     false
                    //   ),
                    color: new echarts.graphic.LinearGradient(
                      1,
                      0,
                      0,
                      1,
                      [
                        {
                          // 0% 处的颜色
                          offset: 0,
                          color: "#7c7cfc"
                        },
                        {
                          // 100% 处的颜色
                          offset: 1,
                          color: "#42cfff"
                        }
                      ],
                      false
                    )

                    //               // 阴影的大小
                    // shadowBlur: 10,
                    // // 阴影水平方向上的偏移
                    // shadowOffsetX: -10 -10,
                    // // 阴影垂直方向上的偏移
                    // shadowOffsetY: -10 -10,
                    // // 阴影颜色
                    // shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              },
              {
                value: userData.Teacher,
                name: "教师人数",
                itemStyle: {
                  normal: {
                    borderColor: "#fff",
                    borderWidth: 1,
                    color: new echarts.graphic.LinearGradient(
                      1,
                      0,
                      0,
                      1,
                      [
                        {
                          // 0% 处的颜色
                          offset: 0,
                          color: "#ffa800"
                        },
                        {
                          // 100% 处的颜色
                          offset: 1,
                          color: "#fb3737"
                        }
                      ],
                      false
                    )
                  }
                }
              },
              {
                value: userData.SchoolLeader,
                name: "领导人数",
                itemStyle: {
                  normal: {
                    borderColor: "#fff",
                    borderWidth: 1,
                    color: new echarts.graphic.LinearGradient(
                      1,
                      0,
                      0,
                      1,
                      [
                        {
                          // 0% 处的颜色
                          offset: 0,
                          color: "#90b915"
                        },
                        {
                          // 100% 处的颜色
                          offset: 1,
                          color: "#d9ff81"
                        }
                      ],
                      false
                    )
                  }
                }
              }
            ]
          },
          // 边框的设置
          {
            radius: ["23.5%", "33.3%"],
            center: ["276", "50%"],
            type: "pie",
            cursor:'auto',

            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            animation: false,
            tooltip: {
              show: false
            },
            data: [
              {
                value: 1,
                itemStyle: {
                  color: "rgba(250,250,250,0.3)"
                }
              }
            ]
          }
        ]
      });

      // 基于准备好的dom，初始化echarts实例
      let Chart_student = echarts.init(
        document.getElementById("all-student-content")
      );
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
              color: "#42cfff"
            },
            {
              // 100% 处的颜色
              offset: 1,
              color: "#7c7cfc"
            }
          ],
          false
        ),
        title: {},
        xAxis: {
          type: "category",
          data: this.XData(userData.GradeNames),
          //   data: ['一年级','二年级','一年级','二年级','一年级','二年级'],
          name: "年级",
          nameTextStyle: {
            color: "#999",
            fontSize: "12"
          },
          // boundaryGap: ["0%", "5%"], //X轴上两侧留白

          axisLabel: {
            // interval: 0,
            rotate: this.Xrotate(userData.GradeNames),
            textStyle: {
              color: "#999",
              fontSize: "12"
            }
          },
          axisTick: {
            inside: true
          }
        },
        yAxis: {
          axisLine: {
            show: false //隐藏y轴
          },
          axisTick: {
            show: false //隐藏y轴刻度
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
            padding: [0, 0, 0, 0]
          },
          splitLine: {
            //分隔线样式
            lineStyle: {
              type: "dotted",
              // 使用深浅的间隔色
              color: ["#ccc"]
            }
          },
          axisLabel: {
            // interval: 0,

            textStyle: {
              color: "#999",
              fontSize: "12"
            }
          }
        },
        grid: {
          width: "90%",
          left:'5%'
        },
        series: [
          {
            data: userData.GradeStudent,
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: { color: "#333", fontSize: "12" },
                // backgroundColor:'rgba(250,250,250,0.3)',
                // borderRadius:'4'
              }
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
            formatter: function(params) {
              // console.log(params)
            }
          }
        ],
        barMinHeight: 0, // 最小高度改为0
        // barMaxWidth: '',
        // barWidth: null,        // 默认自适应
        barGap: "30%", // 柱间距离，默认为柱形宽度的30%，可设固定值
        barCategoryGap: this.BarWidth(userData.GradeStudent), // 类目间柱形距离，默认为类目间距的20%，可设固定值
        itemStyle: {
          barBorderRadius: [5, 5, 0, 0] // 柱条边线圆角，单位px，默认为0
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

      Chart_student.on("click", function(params) {
        // console.log(nextProps, DataState.AllUserPreview)
        let grade = DataState.AllUserPreview.NewGrades[params.name];
        history.push("/UserArchives/Student/" + grade.GradeID);
        dispatch(
          actions.UpDataState.getGradeStudentPreview(
            "/GetStudentToPage?SchoolID=" +
              userMsg.SchoolID +
              "&GradeID=" +
              grade.GradeID +
              "&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC",
            { value: grade.GradeID, title: grade.GradeName }
          )
        );
      });

      // 基于准备好的dom，初始化echarts实例
      let Chart_teacher = echarts.init(
        document.getElementById("all-teacher-content")
      );
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
              color: "#fb3737"
            },
            {
              // 100% 处的颜色
              offset: 1,
              color: "#ffa800"
            }
          ],
          false
        ),
        title: {},
        xAxis: {
          type: "category",
          data: this.XData(userData.SubjectNames),
          name: "学科",
          nameTextStyle: {
            color: "#999",
            fontSize: "12"
          },
          axisTick: {
            inside: true
          },
          axisLabel: {
            // interval: 0,
            rotate: this.Xrotate(userData.SubjectNames),
            width:30,
            rich:{},
            textStyle: {
              color: "#999",
              // bold:false
              fontSize: "12"
            }
          }
        },
        grid: {
          width: "90%",//图像宽度
          left:'5%'//图像容器左偏移
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          boundaryGap: ["0", "10%"],
          type: "value",
          name: "教师人数",
          nameTextStyle: {
            color: "#999",
            fontSize: "12",
            padding: [0, 0, 0, 0]//控制name位置
          },
          axisLabel: {
            // interval: 0,

            textStyle: {
              color: "#999",
              fontSize: "12"
            }
          },
          color: "#999",
          fontSize: "12",
          splitLine: {
            lineStyle: {
              type: "dotted",
              // 使用深浅的间隔色
              color: ["#ccc"]
            }
          }
          //   axisTick:{
          //     lineStyle:{type:'dotted'}
          //   } ,
        },
        series: [
          {
            data: userData.SubjectTeacher,

            type: "bar",
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: { color: "#333", fontSize: "12" }
              }
            }
          }
        ],
        barMinHeight: 0, // 最小高度改为0
        // barWidth: null,        // 默认自适应
        barGap: "30%", // 柱间距离，默认为柱形宽度的30%，可设固定值
        barCategoryGap: this.BarWidth(userData.SubjectTeacher), // 类目间柱形距离，默认为类目间距的20%，可设固定值
        itemStyle: {
          barBorderRadius: [5, 5, 0, 0] // 柱条边线圆角，单位px，默认为0

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
        }
      });

      Chart_teacher.on("click", function(params) {
        let subject = DataState.AllUserPreview.NewSubjects[params.name];
        history.push("/UserArchives/Teacher/" + subject.SubjectID);
        // dispatch(
        //   actions.UpDataState.getSubjectTeacherPreview(
        //     "/GetTeacherToPage?SchoolID=" +
        //       userMsg.SchoolID +
        //       "&SubjectIDs=" +
        //       subject.SubjectID +
        //       "&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC",
        //     { value: subject.SubjectID, title: subject.SubjectName }
        //   )
        // );
        dispatch({ type: actions.UpDataState.SET_SUBJECTID, SubjectID:  { value: subject.SubjectID, title: subject.SubjectName } });
      });
    }
  }
  // x坐标倾斜
  Xrotate = data => {
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
    if(!(data instanceof Array)){
      return data
    }
    return data.map(child=>{
      let dots = ''
      if(child.length>=9){
        dots = '...'
      }
      let value = child.split('').splice(0,8).join('')+dots;
      let textStyle = {
      }
      return {value,textStyle}
    })
  }
  // 柱状图 柱宽
  BarWidth = data => {
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
    const { UIState, DataState } = this.props;
    // console.log(DataState)
    return (
      <div className="All">
        <div className="All-box All-user">
          <p className="All-tips">
            <span className="tips menu10 ">用户档案总览</span>
          </p>
          <div className="All-hr" ></div>
          <div className="All-content user-content">
            <div id="all-user-content"></div>
            <div className="echarts-tips">
              <p className="tips-1">
                {"总人数：" + DataState.AllUserPreview.Total}
              </p>
              <p className="tips-2">
                <span className="tips-icon-1"></span>
                {"学生人数：" + DataState.AllUserPreview.Student}
              </p>
              <p className="tips-2">
                <span className="tips-icon-2"></span>
                {"教师人数：" + DataState.AllUserPreview.Teacher}
              </p>
              <p className="tips-2">
                <span className="tips-icon-3"></span>
                {"领导人数：" + DataState.AllUserPreview.SchoolLeader}
              </p>
            </div>
          </div>
        </div>
        <div className="All-box All-student">
          <p className="All-tips">
            <span className="tips menu10 ">各年级学生人数统计</span>
          </p>
          <div className="All-hr" ></div>
          <div
            id="all-student-content"
            className="All-content student-content"
          ></div>
        </div>
        <div className="All-box All-teacher">
          <p className="All-tips">
            <span className="tips menu10 ">各学科教师人数统计</span>
          </p>
        <div className="All-hr" ></div>
          <div
            id="all-teacher-content"
            className="All-content teacher-content"
          ></div>
        </div>
      </div>
    );
  }
}

All.propTypes = {
  res: PropTypes.object
};

const mapStateToProps = state => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState
  };
};
export default connect(mapStateToProps)(All);
