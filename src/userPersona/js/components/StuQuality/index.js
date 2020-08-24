import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import { Tabs, DatePicker, Tooltip } from "antd";
import Public from "../../../../common/js/public";
import "./scss/index.scss";
import { Loading } from "../../../../common";
import ContentItem from "../contentItem";

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
      userArchives: { ClassID, GradeID, SchoolID },
    } = nextProps;
    // let {}

    if (firstTime && Term && UserID && Urls["810"].WsUrl) {
      this.setState({
        firstTime: false,
      });
      dispatch(
        CommonActions.SetStuResultParams({
          Proxy: "http://192.168.129.8:10103/WS_CJZP",
          // Urls["810"].WsUrl,

          Term,

          XH: UserID,
          // SelectBar: "NearExam",
        })
      );
    }
  }

  render() {
    let {
      MoreData: {
        CommonData: { StuQualityParams },
      },
    } = this.props;
    let { firstTime } = this.state;
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
              <linkBtn type="comment" className="SRt-go">
                综合素养评价
              </linkBtn>
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
