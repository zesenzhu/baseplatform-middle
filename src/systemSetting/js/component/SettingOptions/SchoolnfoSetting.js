import React, { Component, createRef } from "react";
import "../../../sass/SchoolInfoSet.scss";
import { connect } from "react-redux";
import { Modal, Loading } from "../../../../common";
import { Input, Tooltip, Button } from "antd";
import DataChange from "../../action/data/DataChange";
import ApiActions from "../../action/data/Api";
import AppAlertAction from "../../action/UI/AppAlertAction";
import CropperModal from "../../../../common/js/CropperModal";
import default_schoolPic from "../../../images/boom_school_logo.png"; //默认图标的网络地址
import SchoolBadge from "../SchoolBadge";
import AreaCheck from "../../../../initGuide/components/areaCheck";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 文件最大限制为2M

class SchoolnfoSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit_visible: false,
      active: 1,

      emptyNameTipsShow: false,
      emptyCodeTipsShow: false,
      tipsTitle: "",
      codeTipsTitle: "",
      selectedImageFile: null,
      coreModalVisible: false,
      coreResultImage: null,
      imageUploadModal: false,
      schoolLogo: "",
      onlineImg: "",
    };
    const { dispatch } = props;
    const { SchoolID } = JSON.parse(sessionStorage.getItem("UserInfo"));
    dispatch(DataChange.getCurrentSchoolInfo(SchoolID));

    this.AreaCheck = createRef();
    this.SchoolBadge = createRef();
  }

  //切换年级的选中状态
  changeActive = (ID) => {
    let { dispatch, periodInfo, schoolInfo } = this.props;
    let newPeriodInfo = periodInfo.map((item) => {
      if (item.ID === ID) {
        return {
          ...item,
          checked: !item.checked,
        };
      } else {
        return item;
      }
    });
    dispatch({
      type: DataChange.INIT_PERIOD_LIST,
      data: newPeriodInfo,
    });
  };

  //监听右上角编辑的状态
  openEdite = () => {
    this.setState({
      edit_visible: true,
    });
  };

  //确认保存编辑好的信息
  editComfirm = () => {
    let {
      primaryNum,
      middleNum,
      highNum,
      SchoolCode,
      SchoolName,
      SchoolLogoUrl,
      SchoolTel,
      SchoolLinkman,
    } = this.props.schoolInfo;
    const { dispatch, periodInfo,schoolInfo } = this.props;
    let SchoolType = ""; //学制的代码数字
    let SchoolSessionType = ""; //学制类型对应的参数（7=>3/6/3 或者5/4/3）
    // console.log(primaryNum, middleNum, SchoolCode, SchoolName, SchoolLogoUrl);
    let {
      provinceID,
      showProvinceTip,
      hideProvinceTip,
      cityID,
      hideCityTip,
      showCityTip,
      countyID,
      showCountyTip,
      hideCountyTip,
    } = this.AreaCheck.current;
    let ImgUrl = "";
    if (this.SchoolBadge.current) {
      ImgUrl = this.SchoolBadge.current.ImgUrl;
    } else {
      ImgUrl = schoolInfo.SchoolLogoUrl_Long;
    }
    highNum = highNum ? highNum : "3";
    if (
      periodInfo[0].checked === true &&
      periodInfo[1].checked === false &&
      periodInfo[2].checked === false
    ) {
      SchoolType = 1; //只有小学
      SchoolSessionType = `${primaryNum}/0/0`;
    } else if (
      periodInfo[1].checked === true &&
      periodInfo[0].checked === false &&
      periodInfo[2].checked === false
    ) {
      SchoolType = 2; //只有初中
      SchoolSessionType = `0/${middleNum}/0`;
    } else if (
      periodInfo[0].checked === true &&
      periodInfo[1].checked === true &&
      periodInfo[2].checked === false
    ) {
      SchoolType = 3; //小学加初中
      SchoolSessionType = `${primaryNum}/${middleNum}/0`;
    } else if (
      periodInfo[2].checked === true &&
      periodInfo[0].checked === false &&
      periodInfo[1].checked === false
    ) {
      SchoolType = 4; //只有高中
      SchoolSessionType = `0/0/${highNum}`;
    } else if (
      periodInfo[0].checked === true &&
      periodInfo[1].checked === true &&
      periodInfo[2].checked === true
    ) {
      SchoolType = 7; //小学+初中+高中
      SchoolSessionType = `${primaryNum}/${middleNum}/${highNum}`;
    } else if (
      periodInfo[0].checked === false &&
      periodInfo[1].checked === true &&
      periodInfo[2].checked === true
    ) {
      SchoolType = 6; //初中+高中
      SchoolSessionType = `0/${middleNum}/${highNum}`;
    } else {
      SchoolType = "error";
    }

    console.log(SchoolType);
    //如果学校名称或者学校代码为空则显示错误信息
    if (
      // SchoolCode === "" ||
      SchoolName === ""
    ) {
      // dispatch(AppAlertAction.alertError({ title: "学校代码或名称不能为空!" }));
      dispatch(AppAlertAction.alertError({ title: "学校名称不能为空!" }));
      console.log(SchoolName);
    } else {
      if (SchoolName.length >= 21) {
        dispatch(AppAlertAction.alertError({ title: "学校名称过长!" }));
        this.setState({
          emptyNameTipsShow: true,
        });
        return;
      }
      // if (!/^\d+$/.test(SchoolCode)) {
      //   dispatch(AppAlertAction.alertError({ title: "学校代码需为纯数字" }));
      //   this.setState({
      //     emptyCodeTipsShow: true
      //   });
      //   return;
      // }
      // if (SchoolCode.length >= 21) {
      //   dispatch(AppAlertAction.alertError({ title: "学校代码过长!" }));
      //   this.setState({
      //     emptyCodeTipsShow: true
      //   });
      //   return;
      // }

      //判断省市县
      if (provinceID) {
        // provinceOk = true;

        hideProvinceTip();
      } else {
        showProvinceTip();
        return;
      }

      if (cityID) {
        // cityOk = true;

        hideCityTip();
      } else {
        showCityTip();
        return;
      }

      if (countyID) {
        // countyOk = true;

        hideCountyTip();
      } else {
        showCountyTip();
        return;
      }
      //当SchoolType 不是ERROR的时候才执行post数据
      if (SchoolType !== "error") {
        //根据学制参照情况判断SchoolSessionType
        // if (SchoolType === 7 || SchoolType === 3 || SchoolType === 6) {
        //     SchoolSessionType = `${primaryNum}/${middleNum}`
        // }
        // else {
        //     SchoolSessionType = "6/3"
        // }
        this.setState(
          {
            edit_visible: false,
            emptyNameTipsShow: false,
            emptyCodeTipsShow: false,
          },
          () => {
            dispatch({
              type: DataChange.SEMESTER_LOADING_HIDE,
              data: true,
            });
            const { SchoolID, UserID } = JSON.parse(
              sessionStorage.getItem("UserInfo")
            );

            ApiActions.postMethod("/SysMgr/Setting/EditSchoolInfo", {
              UserID: UserID,
              SchoolID: SchoolID,
              SchoolName: SchoolName,
              SchoolCode: SchoolCode,
              SchoolTel: SchoolTel,
              SchoolLinkman: SchoolLinkman,
              SchoolType: SchoolType,
              SchoolSessionType: SchoolSessionType,
              SchoolImgUrl:
                this.state.onlineImg === ""
                  ? SchoolLogoUrl
                  : this.state.onlineImg,
              CountyID: countyID,
              SchoolImgUrl_Long: ImgUrl,
            }).then((data) => {
              console.log(data);
              if (data === 0) {
                console.log("success");
                dispatch(AppAlertAction.alertSuccess({ title: "修改成功" }));
                dispatch(DataChange.getCurrentSchoolInfo(SchoolID));
              } else {
                dispatch({
                  type: DataChange.SEMESTER_LOADING_HIDE,
                  data: false,
                });
                dispatch(
                  AppAlertAction.alertError({ title: data ? data : "未知异常" })
                );
              }
            });
          }
        );
      } else {
        this.setState(
          {
            // edit_visible: false,
            emptyNameTipsShow: false,
            emptyCodeTipsShow: false,
          },
          () => {
            dispatch(
              AppAlertAction.alertError({ title: "请正确选择学制关系!" })
            );
            // alert( "小学与初中学制搭配错误!")
          }
        );
      }
    }
  };

  //取消（关闭）编辑框
  editCancel = () => {
    this.setState({
      edit_visible: false,
      emptyNameTipsShow: false,
      emptyCodeTipsShow: false,
    });
    const { SchoolID } = JSON.parse(sessionStorage.getItem("UserInfo"));
    const { dispatch } = this.props;
    dispatch(DataChange.getCurrentSchoolInfo(SchoolID));
  };

  //监听学制（radio）的选择情况
  handelSchoolSystem = (e) => {
    let { schoolInfo, dispatch, periodInfo } = this.props;
    console.log("当前点击值" + e.target.value);
    console.log("一开始时的内容" + schoolInfo.primaryNum);

    if (Object.keys(schoolInfo).length !== 0) {
      //判断小学的学制选择情况
      // if(e.target.value==="6"||e.target.value==="5"){
      //     // 如果后台的也是六年制,视为取消当前选中的六年制
      //     if(schoolInfo.primaryNum===e.target.value){
      //             schoolInfo={
      //                 ...schoolInfo,
      //                 primaryNum:"0"
      //             }

      //     }else{
      //         schoolInfo={
      //             ...schoolInfo,
      //             primaryNum:e.target.value
      //         }
      //     }

      // }
      if (e.target.value === "5" || e.target.value === "4") {
        schoolInfo = {
          ...schoolInfo,
          primaryNum: "5",
          middleNum: "4",
        };
      }
      // else if(){

      // }
      else if (e.target.value === "6" || e.target.value === "3") {
        schoolInfo = {
          ...schoolInfo,
          primaryNum: "6",
          middleNum: "3",
        };
      }
    }

    dispatch({
      type: DataChange.REFRESH_SCHOOL_INFO,
      data: schoolInfo,
    });
  };

  //监听学校代码的获取事件
  getSchoolCode = (e) => {
    let valueableCode = e.target.value.replace(/\s*/g, "").substring(0, 20);
    let timerID = "";

    if (e.target.value !== "") {
      this.setState({
        emptyCodeTipsShow: false,
      });
    }
    let isNum = /^\d+$/.test(e.target.value);
    if (isNum === false) {
      this.setState({
        emptyCodeTipsShow: true,
        codeTipsTitle: "学校代码必须是数字",
      });
    }
    if (e.target.value.length > 20) {
      this.setState({
        codeTipsTitle: "学校代码不能超过20位数字",
        emptyCodeTipsShow: true,
      });

      timerID = setTimeout(() => {
        this.setState(
          {
            emptyCodeTipsShow: false,
          },
          () => {
            clearTimeout(timerID);
          }
        );
      }, 1000);
    }
    let { schoolInfo, dispatch } = this.props;
    schoolInfo = {
      ...schoolInfo,
      SchoolCode:
        e.target.value.length > 20
          ? valueableCode.trim()
          : e.target.value.trim(),
    };

    dispatch({
      type: DataChange.REFRESH_SCHOOL_INFO,
      data: schoolInfo,
    });
  };

  //学校代码输入框失去焦点后的回调事件
  visibleCode = (e) => {
    if (e.target.value === "") {
      this.setState({
        emptyCodeTipsShow: true,
        codeTipsTitle: "学校代码不能为空",
      });
    } else if (e.target.value.length > 20) {
      this.setState({
        emptyCodeTipsShow: true,
        codeTipsTitle: "学校代码不能超过20位数字",
      });
    } else {
      this.setState({
        emptyCodeTipsShow: false,
      });
    }
  };

  //监听学校名字改变的事件
  getSchoolName = (e) => {
    let { schoolInfo, dispatch } = this.props;
    let timerID = 0;

    //定义输入数据的有效长度
    let valueableLength = "";
    //当学校名称不为空，提示框信息不显示

    if (e.target.value !== "") {
      this.setState({
        emptyNameTipsShow: false,
      });

      //当输入数据长度超过20,提示学校名称长度不能超过20
      // 截取前20个作为输入
      if (e.target.value.length > 20) {
        valueableLength = e.target.value.substring(0, 20);
        this.setState({
          tipsTitle: "学校名称不能超过20个字符",
          emptyNameTipsShow: true,
        });
        timerID = setTimeout(() => {
          this.setState(
            {
              emptyNameTipsShow: false,
            },
            () => {
              clearInterval(timerID);
            }
          );
        }, 1000);
      }
    }
    schoolInfo = {
      ...schoolInfo,
      SchoolName:
        e.target.value.length > 20
          ? valueableLength.trim()
          : e.target.value.trim(),
    };

    dispatch({
      type: DataChange.REFRESH_SCHOOL_INFO,
      data: schoolInfo,
    });
  };

  //学校名称输入框失去焦点后的回调事件
  visibleName = (e) => {
    if (e.target.value === "") {
      this.setState({
        emptyNameTipsShow: true,
        tipsTitle: "学校名称不能为空",
      });
    } else if (e.target.value.length > 20) {
      this.setState({
        emptyNameTipsShow: true,
        tipsTitle: "学校名称不能超过20个字符",
      });
    } else {
      this.setState({
        emptyNameTipsShow: false,
      });
    }
  };

  //配合使用onClick 无用的onChange回调
  tempFunction = () => {};

  //上传图片的时候file输入框的监听事件
  // handleFileChange = (e) => {
  //     const { dispatch } = this.props
  //     const file = e.target.files[0];
  //     if (file) {
  //         if (file.size <= MAX_FILE_SIZE) {
  //             this.setState({
  //                 selectedImageFile: file //将文件占时存放到state中
  //             }, () => {
  //                 this.setState({
  //                     coreModalVisible: true//弹出裁剪框
  //                 })
  //                 console.log(file)
  //             })
  //         }
  //         else {
  //             dispatch(AppAlertAction.alertError({ title: "文件过大" }))
  //         }
  //     }
  // }

  // handleGetResultImgUrl = key => blob => {
  //     const str = URL.createObjectURL(blob)
  //     this.setState({
  //       [key]: str
  //     })
  //   }

  //图片上传弹层点击事件
  imageUpload = () => {
    this.setState({
      imageUploadModal: true,
      edit_visible: true,
    });
  };

  //图片上传弹层关闭和取消事件
  upLoadCancel = () => {
    this.setState({
      imageUploadModal: false,
      edit_visible: true,
    });
    // console.log("hhhh")
  };
  //图片上传弹层确认按钮点击事件
  handleGetResultImgUrl = (blob, filePath) => {
    let { dispatch, schoolInfo } = this.props;
    console.log(blob);
    const str = URL.createObjectURL(blob);

    this.setState({
      schoolLogo: str,
      onlineImg: filePath,
      //[key]: this.state.baseUrl+'/http_subjectResMgr/'+filePath
    });
    schoolInfo = {
      ...schoolInfo,
      SchoolLogoUrl: str,
    };
    console.log(str);
    dispatch({
      type: DataChange.REFRESH_SCHOOL_INFO,
      data: schoolInfo,
    });
  };

  //监听使用默认图片按钮
  useDefault = () => {
    let { dispatch, schoolInfo, serverAddress } = this.props;
    this.setState({
      schoolLogo: `${serverAddress}SysSetting/Attach/default.png `,
      onlineImg: `/SysSetting/Attach/default.png`,
    });

    schoolInfo = {
      ...schoolInfo,
      SchoolLogoUrl: `${serverAddress}SysSetting/Attach/default.png `,
    };
    dispatch({
      type: DataChange.REFRESH_SCHOOL_INFO,
      data: schoolInfo,
    });
  };
  //裁剪工具所返回的参数判断，overSize图片过大，fileNull未选择图片进行上传
  // paramDetect=(param)=>{
  //     const {dispatch}=this.props
  //     if(param==="overSize"){

  //         dispatch(AppAlertAction.alertError({title:"图片过大"}))
  //     }
  //     else if(param==="fileNull"){
  //         dispatch(AppAlertAction.alertTips({title:"你还没选择图片喔~",cancelTitle:"确定"}))
  //     }
  // }

  render() {
    const {
      schoolInfo,
      semesterloading,
      periodInfo,
      serverAddress,
    } = this.props;
    const { UserID } = JSON.parse(sessionStorage.getItem("UserInfo"));
    // console.log(periodInfo)
    let schoolSys = "";
    let schoolLength = "";
    let {
      CityID,
      CityName,
      CountyID,
      CountyName,
      ProvinceID,
      ProvinceName,
      SchoolCode,
    } = schoolInfo;
    //根据学校类型选择渲染内容
    switch (schoolInfo.SchoolType) {
      case 7:
        schoolSys = `${schoolInfo.primaryType}+${schoolInfo.middleType}+${schoolInfo.highType}`;
        schoolLength = "十二年一贯制";
        break;

      case 1:
        schoolSys = schoolInfo.primaryType;
        schoolLength =
          schoolInfo.primaryNum === "6" ? "六年一贯制" : "五年一贯制";

        break;

      case 2:
        schoolSys = schoolInfo.middleType;
        schoolLength =
          schoolInfo.middleNum === "3" ? "三年一贯制" : "四年一贯制";
        break;

      case 3:
        schoolSys = `${schoolInfo.primaryType}+${schoolInfo.middleType}`;
        schoolLength = "九年一贯制";
        break;

      case 4:
        schoolSys = "三年制初中";
        schoolLength = "三年一贯制";
        // selected = "4"
        break;

      case 6:
        schoolSys = `${schoolInfo.middleType}+三年制高中`;
        schoolLength =
          schoolInfo.middleNum === "3" ? "六年一贯制" : "七年一贯制";
        break;

      default:
        schoolSys = "学制获取失败";
    }
    // 多学校：当ProductType为3的时候不出现长条校徽
    const { ProductType, ResHttpRootUrl } = sessionStorage.getItem(
      "LgBasePlatformInfo"
    )
      ? JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"))
      : {};
    let isMoreSchool = true
    // parseInt(ProductType) === 3;
    return (
      <Loading spinning={semesterloading} opacity={false} tip="请稍候...">
        <div className="school-InfoSetting">
          <div
            className="edite-info"
            onClick={this.openEdite}
            title="点击编辑学校信息"
          >
            <span></span>编辑
          </div>
          <div className="school-logo">
            <img
              src={
                schoolInfo.SchoolLogoUrl === "" ||
                schoolInfo.SchoolLogoUrl === null
                  ? default_schoolPic
                  : schoolInfo.SchoolLogoUrl
              }
              alt="图片丢失"
            />
          </div>
          <div className="school-name" title={schoolInfo.SchoolName}>
            {schoolInfo.SchoolName}
          </div>
          <div className="school-info">
            {!isMoreSchool ? (
              <div className="school-badge">
                长条校徽:
                <i
                  className="SchoolLogoUrl_Long"
                  style={{
                    background: `url(${schoolInfo.SchoolLogoUrl_Long}) no-repeat center center/280px 40px`,
                  }}
                ></i>
              </div>
            ) : (
              ""
            )}
            <div className="school-code">
              学校代码:
              <span title={schoolInfo.SchoolCode}>{schoolInfo.SchoolCode}</span>
            </div>
            <div className="school-type">
              学校类型:
              <span>{schoolLength}</span>({schoolSys})
            </div>
            {CountyID ? (
              <div className="school-type">
                学校区域:
                <span>{ProvinceName + ">" + CityName + ">" + CountyName}</span>
              </div>
            ) : (
              ""
            )}
          </div>
          <Modal
            type="1"
            onClick={this.openEdite}
            title="编辑学校基础资料"
            onOk={this.editComfirm}
            onCancel={this.editCancel}
            width={"784px"}
            bodyStyle={{ height: isMoreSchool ? "330px" : "392px" }}
            visible={this.state.edit_visible}
            okText="保存"
            destroyOnClose={true}
          >
            <div className="editContent">
              <div className="content-left">
                <div className="school-logo">
                  <img
                    src={
                      schoolInfo.SchoolLogoUrl === "" ||
                      schoolInfo.SchoolLogoUrl === null
                        ? default_schoolPic
                        : schoolInfo.SchoolLogoUrl
                    }
                    alt=""
                  />
                </div>

                <Button className="btn choose-pic" onClick={this.imageUpload}>
                  上传图片
                </Button>

                <CropperModal
                  Visiable={this.state.imageUploadModal}
                  onClose={this.upLoadCancel}
                  onSubmit={(blob, filePath) =>
                    this.handleGetResultImgUrl(blob, filePath)
                  }
                  diskName="SysSetting"
                  UpDataUrl={`${serverAddress}SubjectRes_UploadHandler.ashx?method=doUpload_WholeFile&userid=${UserID}`}
                  // onCheck={(param)=>this.paramDetect(param)}
                ></CropperModal>

                <Button className="btn upload-pic" onClick={this.useDefault}>
                  使用默认
                </Button>
                <p className="upload-tips">
                  上传要求：请上传png/jpg格式的图片，图片大小不能超过2MB
                </p>
              </div>

              <div className="content-right">
                <div className="row clearfix win-shcool-name">
                  <span className="left">学校名称:</span>
                  <span className="right">
                    <Tooltip
                      visible={this.state.emptyNameTipsShow}
                      placement="right"
                      title={this.state.tipsTitle}
                    >
                      <input
                        type="text"
                        maxLength="20"
                        value={schoolInfo.SchoolName}
                        onChange={this.getSchoolName}
                        onBlur={this.visibleName}
                      />
                    </Tooltip>
                  </span>
                </div>
                {!isMoreSchool ? (
                  <div className={"row clearfix row-SchoolBadge"}>
                    <span className="left">长条校徽:</span>
                    <span className="right">
                      <SchoolBadge
                        schoolBadge={
                          typeof schoolInfo.SchoolLogoUrl_Long === "string"
                            ? schoolInfo.SchoolLogoUrl_Long.replace(
                                ResHttpRootUrl,
                                ""
                              )
                            : ""
                        }
                        ref={this.SchoolBadge}
                      ></SchoolBadge>
                    </span>
                  </div>
                ) : (
                  ""
                )}
                <div className="row clearfix win-school-code">
                  <span className="left">学校代码:</span>
                  <span className="right">
                    {/* <Tooltip
                    visible={this.state.emptyCodeTipsShow}
                    placement="right"
                    title={this.state.codeTipsTitle}
                  >
                    <input
                      type="text"
                      maxLength="20"
                      value={schoolInfo.SchoolCode}
                      onChange={this.getSchoolCode}
                      onBlur={this.visibleCode}
                    />
                  </Tooltip> */}
                    <span
                      style={{
                        lineHeight: "20px",
                        height: "20px",
                        // paddingLeft: "10px",
                        display: "inline-block",
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#ff6600",
                      }}
                    >
                      {schoolInfo.SchoolCode}
                    </span>
                    {/* <span title={schoolInfo.SchoolCode} className="School-Code">
                    {schoolInfo.SchoolCode}
                  </span> */}
                  </span>
                </div>

                <div
                  style={{ height: "120px" }}
                  className="row clearfix win-school-type"
                >
                  <span className="left">学校类型:</span>
                  <div className=" right">
                    <div className="primary-school">
                      <span /* className={`${this.state.active===1?"click":""}`}  */
                        className={`${
                          periodInfo[0].checked === true ? "click" : ""
                        }`}
                        onClick={() => this.changeActive("P1")}
                      >
                        小学
                      </span>
                      <i></i>
                      <input
                        type="radio"
                        value="5" /* checked={schoolInfo.primaryNum==="5"}  */
                        checked={
                          periodInfo[0].checked === true &&
                          schoolInfo.primaryNum === "5"
                        }
                        disabled={periodInfo[0].checked === false}
                        onChange={this.tempFunction}
                        onClick={this.handelSchoolSystem}
                      />
                      五年制
                      <input
                        type="radio"
                        value="6" /* checked={schoolInfo.primaryNum==="6"}  */
                        checked={
                          periodInfo[0].checked === true &&
                          schoolInfo.primaryNum === "6"
                        }
                        disabled={periodInfo[0].checked === false}
                        onChange={this.tempFunction}
                        onClick={this.handelSchoolSystem}
                      />
                      六年制
                    </div>
                    <div className="middle-school">
                      <span /* className={`${this.state.active===2?"click":""}`} */
                        className={`${
                          periodInfo[1].checked === true ? "click" : ""
                        }`}
                        onClick={() => this.changeActive("P2")}
                      >
                        初中
                      </span>
                      <i></i>
                      <input
                        type="radio"
                        value="3"
                        checked={
                          periodInfo[1].checked === true &&
                          schoolInfo.middleNum === "3"
                        }
                        disabled={periodInfo[1].checked === false}
                        onChange={this.tempFunction}
                        onClick={this.handelSchoolSystem}
                      />
                      三年制
                      <input
                        type="radio"
                        value="4"
                        checked={
                          periodInfo[1].checked === true &&
                          schoolInfo.middleNum === "4"
                        }
                        disabled={periodInfo[1].checked === false}
                        onChange={this.tempFunction}
                        onClick={this.handelSchoolSystem}
                      />
                      四年制
                    </div>
                    <div className="high-school">
                      <span /* className={`${this.state.active===3?"click":""}`} */
                        className={`${
                          periodInfo[2].checked === true ? "click" : ""
                        }`}
                        onClick={() => this.changeActive("P3")}
                      >
                        高中
                      </span>
                      <i></i>
                      <input
                        type="radio"
                        value="12" /* checked={schoolInfo.highNum==="12"}  */
                        checked={periodInfo[2].checked === true}
                        onChange={this.tempFunction}
                        onClick={this.handelSchoolSystem}
                      />
                      三年制
                    </div>
                  </div>
                </div>
                <div className={"row clearfix"}>
                  <span className="left">所在区域:</span>
                  <span className="right">
                    <AreaCheck
                      ProvinceID={ProvinceID}
                      CityID={CityID}
                      CountyID={CountyID}
                      ref={this.AreaCheck}
                    ></AreaCheck>
                  </span>
                  <div className="edit-tips">
                    <span></span>
                    修改学校类型会引起基础数据重新初始化，请谨慎操作
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </Loading>
    );
  }
}

const mapStateToProps = (state) => {
  const { DataUpdate } = state;

  const { schoolInfo, semesterloading, periodInfo, serverAddress } = DataUpdate;
  console.log(periodInfo);

  return {
    schoolInfo,
    semesterloading,
    periodInfo,
    serverAddress,
  };
};
export default connect(mapStateToProps)(SchoolnfoSetting);
