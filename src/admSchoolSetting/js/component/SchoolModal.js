/*
 * @Author: zhuzesen
 * @Date: 2020-09-15 22:07:05
 * @LastEditTime: 2020-10-26 10:08:52
 * @LastEditors: zhuzesen
 * @Description: 学校信息编辑
 * @FilePath: \baseplatform-middle\src\admSchoolSetting\js\component\SchoolModal.js
 */
import React, { createRef } from "react";
import { connect } from "react-redux";
import {
  CheckBox,
  CheckBoxGroup,
  Tips,
  DropDown,
  Button,
} from "../../../common";
import { Input } from "antd";
import actions from "../actions";
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";
import ClassCropperModal from "../../../common/js/CropperModal";
import AreaCheck from "../../../initGuide/components/areaCheck";
import SchoolType from "./SchoolType";
import "../../scss/SchoolModal.scss";
import DefaultImg from "../../images/boom_school_logo.png";
const { UpDataState, UpUIState } = actions;

// require("../../../common/js/PicUpload/juqery.cp.picUploader");
class SchoolModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SchoolNameTipsTitle: "网站名称不能为空",
      WebAddress: "",
      WebAddressTipsTitle: "网站地址不能为空",
      Subject: {},
      WebType: {},
      Period: [],
      WebTypeList: [],
      PeriodID: [],
      SubjectList: {},
      checkAll: false,

      picVisible: false,
      classResultImgUrl: DefaultImg,
    };
    this.AreaCheck = createRef();
    this.SchoolType = createRef();
  }

  componentWillMount() {
    const { dispatch, DataState, UIState } = this.props;
    let token = sessionStorage.getItem("token");
    let {
      SchoolName, //学校名字
      SchoolCode, //学校代码
      SchoolID, //学校id
      SchoolImgUrl, //学校图片
      SchoolLevel, //学校类型，大学，小学，中学
      SchoolSessionType, //学校学制
      SchoolTel, //学校联系电话
      SchoolLinkman, //学校联系人
    } =  DataState.CommonData.SchoolModalData;
    if (this.props.type === "add") {
      dispatch(
        UpDataState.SetSchoolModalData({
          SchoolImgUrl: "SysSetting/Attach/default.png",
        })
      );
      SchoolImgUrl = "SysSetting/Attach/default.png"
    }
    
    this.setState({
      classResultImgUrl:DataState.CommonData.ImgUrlProxy + SchoolImgUrl,
    });
  }
  componentDidMount() {
    const { dispatch, DataState, UIState } = this.props;
  }
  //   网站名称修改
  onWebNameChange = (e) => {
    this.setState({
      WebName: e.target.value.trim(),
    });
  };
  // 网站名称修改失去焦点
  onWebNameBlur = (e) => {
    const { dispatch } = this.props;
    let Test = /\S/;

    // console.log(e.target.value);
    let value = e.target.value;
    if (!Test.test(value)) {
      dispatch(actions.UpUIState.AppTipsVisible({ WebNameTipsVisible: true }));
    } else {
      dispatch(
        actions.UpDataState.setWebsiteData({
          WebName: value,
        })
      );
      dispatch(actions.UpUIState.AppTipsVisible({ WebNameTipsVisible: false }));
    }
  };

  //   网站地址修改
  onWebAddressChange = (e) => {
    this.setState({
      WebAddress: e.target.value.trim(),
    });
  };
  // 网站地址修改失去焦点
  onWebAddressBlur = (e) => {
    const { dispatch } = this.props;
    let Test = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
    // console.log(e.target.value);
    let value = e.target.value;
    let isTrue = Test.test(value);

    if (value === "") {
      this.setState({
        WebAddressTipsTitle: "网站地址不能为空",
      });
      dispatch(
        actions.UpUIState.AppTipsVisible({
          WebAddressTipsVisible: true,
        })
      );
    } else if (!isTrue) {
      this.setState({
        WebAddressTipsTitle: "网站地址格式错误",
      });
      dispatch(
        actions.UpUIState.AppTipsVisible({
          WebAddressTipsVisible: true,
        })
      );
    } else {
      this.setState({
        WebAddressTipsTitle: "网站地址不能为空",
      });
      dispatch(
        actions.UpDataState.setWebsiteData({
          WebAddress: value,
        })
      );
      dispatch(
        actions.UpUIState.AppTipsVisible({
          WebAddressTipsVisible: false,
        })
      );
    }
  };

  // 类型选择
  onDropMenuChange = (e) => {
    const { dispatch } = this.props;
    console.log(e);
    this.setState({
      WebType: e,
    });
    dispatch(
      actions.UpDataState.setWebsiteData({
        WebType: e,
      })
    );
  };
  // 学科选择
  onDropMenuSubjectChange = (e) => {
    const { dispatch } = this.props;
    console.log(e);
    this.setState({
      Subject: e,
    });
    dispatch(
      actions.UpDataState.setWebsiteData({
        Subject: e,
      })
    );
  };
  // 选择学段
  changeCheckBox = (Period) => {
    const { dispatch } = this.props;
    // console.log(Period)
    let checkAll = false;
    if (Period.length === 0) {
      return;
    }

    if (Period.length !== this.state.PeriodList.length) {
      checkAll = false;
    } else {
      checkAll = true;
    }
    // console.log(Period.length,this.state.PeriodList.length,checkAll)

    this.setState({
      PeriodID: Period,
      checkAll: checkAll,
    });
    dispatch(
      actions.UpDataState.setWebsiteData({
        PeriodID: Period,
      })
    );
  };

  // 选择全部
  onChangeAll = (e) => {
    const { dispatch } = this.props;
    // console.log(e);
    let Period = [];
    this.state.PeriodList.map((child) => {
      Period.push(child.value);
    });
    if (e.target.checked) {
      this.setState({
        PeriodID: Period,
        checkAll: true,
      });
    } else {
      Period = [Period[0]];
      this.setState({
        PeriodID: Period,
        checkAll: false,
      });
    }
    dispatch(
      actions.UpDataState.setWebsiteData({
        PeriodID: Period,
      })
    );
  };
  // 图片编辑
  handleGetResultImgUrl = (key) => (blob, filePath) => {
    const { dispatch, DataState } = this.props;

    const str = URL.createObjectURL(blob);
    this.setState({
      [key]: str,
      //[key]: this.state.baseUrl+'/http_subjectResMgr/'+filePath
    });
    dispatch(
      UpDataState.SetSchoolModalData({
        SchoolImgUrl: filePath,
      })
    );
    // dispatch(
    //   TeacherCustomActions.setHandleToolData({
    //     ToolImgUrl: filePath
    //   })
    // );
  };
  CropperModalClose = () => {
    this.setState({
      picVisible: false,
    });
  };
  CropperModalOpen = () => {
    this.setState({
      picVisible: true,
    });
  };
  //监听使用默认图片按钮
  useDefault = (key) => {
    let { dispatch, DataState } = this.props;
    let { ImgUrlProxy } = DataState.CommonData;
    this.setState({
      [key]: `${ImgUrlProxy}SysSetting/Attach/default.png `,
      // onlineImg: `/SysSetting/Attach/default.png`,
    });

    dispatch(
      UpDataState.SetSchoolModalData({
        SchoolImgUrl: "SysSetting/Attach/default.png",
      })
    );
    // d
  };
  // 学校名称
  onSchoolNameChange = (e) => {
    const { dispatch, DataState } = this.props;
    dispatch(
      UpDataState.SetSchoolModalData({
        SchoolName: e.target.value.trim(),
      })
    );
  };
  onSchoolNameBlur = (e) => {
    const { dispatch, DataState } = this.props;
    dispatch(
      UpDataState.checkSchoolName(() => {
        console.log("sussess");
      })
    );
    // dispatch(
    //   UpDataState.SetSchoolModalData({
    //     SchoolName: e.target.value.trim(),
    //   })
    // );
  };
  // 学校代码
  onSchoolCodeChange = (e) => {
    const { dispatch, DataState, type } = this.props;
    if (type === "edit") {
      return;
    }
    dispatch(
      UpDataState.SetSchoolModalData({
        SchoolCode: e.target.value.trim(),
      })
    );
  };
  onSchoolCodeBlur = (e) => {
    const { dispatch, DataState, type } = this.props;
    if (type === "edit") {
      return;
    }
    dispatch(
      UpDataState.checkSchoolCode(() => {
        console.log("sussess");
      })
    );
    // dispatch(
    //   UpDataState.SetSchoolModalData({
    //     SchoolCode: e.target.value.trim(),
    //   })
    // );
  };
  // 学校类型
  onSchoolLevelDropMenuChange = (e) => {
    const { dispatch, DataState, type } = this.props;
    if (type === "edit") {
      return;
    }
    dispatch(
      UpDataState.SetSchoolModalData({
        SchoolLevel: e,
      })
    );
  };
  // 学校学制
  onSchoolSessionTypeDropMenuChange = (e) => {
    const { dispatch, DataState } = this.props;
    dispatch(
      UpDataState.SetSchoolModalData({
        SchoolSessionType: e,
      })
    );
  };
  // 学校联系电话
  onSchoolTelChange = (e) => {
    const { dispatch, DataState } = this.props;
    dispatch(
      UpDataState.SetSchoolModalData({
        SchoolTel: e.target.value.trim(),
      })
    );
  };
  onSchoolTelBlur = (e) => {
    const { dispatch, DataState } = this.props;
    dispatch(
      UpDataState.checkSchoolTel(() => {
        console.log("sussess");
      })
    );
    // dispatch(
    //   UpDataState.SetSchoolModalData({
    //     SchoolCode: e.target.value.trim(),
    //   })
    // );
  };
  // 学校联系人
  onSchoolLinkmanChange = (e) => {
    const { dispatch, DataState } = this.props;
    dispatch(
      UpDataState.SetSchoolModalData({
        SchoolLinkman: e.target.value.trim(),
      })
    );
  };
  onSchoolLinkmanBlur = (e) => {
    const { dispatch, DataState } = this.props;
    dispatch(
      UpDataState.checkSchoolLinkman(() => {
        console.log("sussess");
      })
    );
    // dispatch(
    //   UpDataState.SetSchoolModalData({
    //     SchoolCode: e.target.value.trim(),
    //   })
    // );
  };
  render() {
    const { DataState, UIState, getAreaCheck } = this.props;
    const { CommonData, SchoolData, LoginUser } = DataState;
    const { ImgUrlProxy } = CommonData;
    const {
      SchoolNameTips,
      SchoolCodeTips,
      SchoolLevelTips,
      SchoolSessionTypeTips,
      SchoolTelTips,
      SchoolLinkmanTips,
    } = UIState.AppTips;
    const {
      SchoolNameTipsVisible,
      SchoolCodeTipsVisible,
      SchoolLevelTipsVisible,
      SchoolSessionTypeTipsVisible,
      SchoolTelTipsVisible,
      SchoolLinkmanTipsVisible,
    } = UIState.AppTipsVisible;
    let {
      SchoolName, //学校名字
      SchoolCode, //学校代码
      SchoolID, //学校id
      SchoolImgUrl, //学校图片
      SchoolLevel, //学校类型，大学，小学，中学
      SchoolSessionType, //学校学制
      SchoolTel, //学校联系电话
      SchoolLinkman, //学校联系人
      CityID,
      CityName,
      CountyID,
      CountyName,
      ProvinceID,
      ProvinceName,
    } = CommonData.SchoolModalData;
    // getAreaCheck(this.AreaCheck.current);
    // console.log(this.AreaCheck.current)
    return (
      <div className="SchoolModal" id="SchoolModal">
        <div className="Left" id="picUpload">
          <div
            className="ToolImgBox"
            style={{
              backgroundImage:
                "url(" +
                (this.state.classResultImgUrl
                  ? this.state.classResultImgUrl
                  :ImgUrlProxy+ DefaultImg) +
                ")" 
                // +
                // "," +
                // "url(" +
                // DefaultImg +
                // ")"
                ,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
              // background:
              //   "url(" +
              //   (this.state.classResultImgUrl
              //     ? this.state.classResultImgUrl
              //     : DefaultImg) +
              //   ") no-repeat center / contain",
              // backgroundSize: "contain"
            }}
          ></div>
          <Button
            className="imgBtn"
            color="blue"
            onClick={this.CropperModalOpen}
          >
            上传校徽
          </Button>
          <Button
            color="green"
            className="imgBtn"
            onClick={this.useDefault.bind(this, "classResultImgUrl")}
          >
            使用默认
          </Button>
          <p className="imgTips">
            上传要求：请上传png/jpg格式的图片，图片大小不能超过2MB
          </p>
          {/* <p className="imgTips">
            请选择类型为png/jpg、大小在128*128以内的图片。
          </p> */}
          <ClassCropperModal
            // uploadedImageFile={classModalFile}
            UpDataUrl={
              ImgUrlProxy +
              "SubjectRes_UploadHandler.ashx?method=doUpload_WholeFile&userid=" +
              LoginUser.UserID
            }
            Visiable={this.state.picVisible}
            InitPic={this.state.classResultImgUrl}
            onClose={this.CropperModalClose}
            diskName="SysSetting"
            onSubmit={this.handleGetResultImgUrl("classResultImgUrl")}
          ></ClassCropperModal>
        </div>
        <div className="Right">
          <div className="row clearfix">
            <span className="culonm-1 left">学校名称:</span>
            <span className="culonm-2 right SchoolName">
              <Tips
                overlayClassName="tips"
                visible={SchoolNameTipsVisible}
                title={SchoolNameTips}
              >
                <Input
                  className="culonm-input"
                  placeholder="请输入学校名称..."
                  maxLength={20}
                  onChange={this.onSchoolNameChange.bind(this)}
                  onBlur={this.onSchoolNameBlur.bind(this)}
                  value={SchoolName}
                ></Input>
              </Tips>
            </span>
          </div>
          <div className="row clearfix">
            <span className="culonm-1 left">学校代码:</span>
            <span className="culonm-2 right SchoolCode">
              <Tips
                overlayClassName="tips"
                visible={SchoolCodeTipsVisible}
                title={SchoolCodeTips}
              >
                <Input
                  className="culonm-input"
                  placeholder="请输入学校代码..."
                  maxLength={10}
                  disabled={this.props.type === "edit" ? true : false}
                  onChange={this.onSchoolCodeChange.bind(this)}
                  onBlur={this.onSchoolCodeBlur.bind(this)}
                  value={SchoolCode}
                ></Input>
              </Tips>
            </span>
          </div>
          {/* <div className="row clearfix">
            <span className="culonm-1 left">学校类型:</span>
            <span className="culonm-2 right SchoolLevel">
              <Tips
                overlayClassName="tips"
                visible={SchoolLevelTipsVisible}
                title={SchoolLevelTips}
              >
                <DropDown
                  ref="SchoolLevel-DropMenu"
                  className=" "
                  style={{ zIndex: 3 }}
                  disabled={this.props.type==='edit'?true:false}

                  onChange={this.onSchoolLevelDropMenuChange.bind(this)}
                  width={108}
                  height={240}
                  dropSelectd={SchoolLevel}
                  dropList={[{ value: 1, title: "大学" }]}
                ></DropDown>
              </Tips>
            </span>
          </div> */}
          <div className="row clearfix">
            <span className="culonm-1 left">学校学制:</span>
            <span className="culonm-2 right SchoolSessionType">
              <SchoolType
                SchoolSessionType={SchoolSessionType.value}
                ref={this.props.SchoolType}
              ></SchoolType>
            </span>
          </div>
          <div className="row clearfix">
            <span className="culonm-1 left">联系人:</span>
            <span className="culonm-2 right SchoolLinkman">
              <Tips
                overlayClassName="tips"
                visible={SchoolLinkmanTipsVisible}
                title={SchoolLinkmanTips}
              >
                <Input
                  className="culonm-input"
                  placeholder="请输入联系人姓名..."
                  maxLength={50}
                  onChange={this.onSchoolLinkmanChange.bind(this)}
                  onBlur={this.onSchoolLinkmanBlur.bind(this)}
                  value={SchoolLinkman}
                ></Input>
              </Tips>
            </span>
          </div>
          <div className="row clearfix">
            <span className="culonm-1 left">联系电话:</span>
            <span className="culonm-2 right SchoolTel">
              <Tips
                overlayClassName="tips"
                visible={SchoolTelTipsVisible}
                title={SchoolTelTips}
              >
                <Input
                  className="culonm-input"
                  placeholder="请输入联系电话..."
                  maxLength={40}
                  onChange={this.onSchoolTelChange.bind(this)}
                  onBlur={this.onSchoolTelBlur.bind(this)}
                  value={SchoolTel}
                ></Input>
              </Tips>
            </span>
          </div>
          <div className="row clearfix">
            <span className="culonm-1 left">所在区域:</span>
            <span className="culonm-2 right ">
              <AreaCheck
                ProvinceID={ProvinceID}
                CityID={CityID}
                CountyID={CountyID}
                ref={this.props.AreaCheck}
              ></AreaCheck>
            </span>
          </div>
          <div className="edit-tips">
            <span></span>
            学校代码一旦确认，就不可以再更改，请认真核对。
            <br />
            &nbsp;&nbsp;
            {/* {this.props.type==='edit'?'该':'所添加'} */}
            学校管理员账号为
            {/* ：admin_{this.props.type==='edit'?SchoolCode:SchoolCode?SchoolCode:'学校代码'} */}
            "admin_"+学校代码，如admin_123456
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState,
  };
};
export default connect(mapStateToProps)(SchoolModal);
