import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { DatePicker, Input } from "antd";
import {
  Modal,
  DropDown,
  Loading,
  Tips,
  CheckBoxGroup,
  CheckBox,
} from "../../../../common";
import moment from "moment";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

import history from "../../containers/history";
import actions from "../../actions";
import $ from "jquery";
import "../../../../common/js/PicUpload/photoUpload.scss";
import "../../../../common/js/PicUpload/Cropper/cropper.css";

import "../../../../common/js/PicUpload/Cropper/cropper";
window.jQuery = $;
window.$ = $;

require("../../../../common/js/PicUpload/juqery.cp.picUploader");
let { MainAction, CommonAction, PublicAction, util } = actions;

class UserArchivesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picUpload: "",
    };
    this.picUpload = createRef();
  }
  componentDidMount() {
    return;
    const {
      dispatch,
      DataState: {
        CommonData: {
          EditUserArchivesData: { UserID, ImgPath, Gender },
          UserArchivesParams: { UserArchivesModalRole },
        },
      },
    } = this.props;
    let picUpload = $(this.picUpload.current);
    let token = sessionStorage.getItem("token");
    let { ResHttpRootUrl } = sessionStorage.getItem("LgBasePlatformInfo")
      ? JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"))
      : {};
    let gender = "-1"; //-1:保密，0:男，1:女；
    switch (Gender) {
      case "男":
        gender = "0";
        break;
      case "女":
        gender = "1";
        break;
      default:
        gender = "-1";
        break;
    }
    // 图片上传
    let option = {
      token: token,
      resWebUrl: ResHttpRootUrl, //资源站点地址
      userType: UserArchivesModalRole, //用户类型，可选值Admin、Student、Teacher、SchoolLeader
      userID: UserID, //新增时传空字符串、编辑时传相应UserID
      curImgPath: ImgPath, //用户当前头像，新增时可不传
      gender: gender,
    };
    picUpload.picUploader(option); //初始化

    this.setState({
      picUpload,
    });
  }

  componentWillReceiveProps(nextProps) {
    // return;
    const {
      dispatch,
      DataState: {
        CommonData: {
          EditUserArchivesData: { UserID, ImgPath, Gender },
          UserArchivesParams: { UserArchivesModalRole },
          ModalVisible: { UserArchivesModalVisible },
          UserArchivesParams: { ModalShowAccount },
        },
      },
    } = nextProps;
    const {
      DataState: {
        CommonData: { ModalVisible },
      },
    } = this.props;
    let picUpload = $("#picUpload");
    let token = sessionStorage.getItem("token");
    let { ResHttpRootUrl } = sessionStorage.getItem("LgBasePlatformInfo")
      ? JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"))
      : {};
    let gender = "-1"; //-1:保密，0:男，1:女；
    switch (Gender) {
      case "男":
        gender = "0";
        break;
      case "女":
        gender = "1";
        break;
      default:
        gender = "-1";
        break;
    }
    // 图片上传

    let option = {
      token: token,
      resWebUrl: ResHttpRootUrl, //资源站点地址
      userType:
        UserArchivesModalRole !== "Leader"
          ? UserArchivesModalRole
          : "SchoolLeader", //用户类型，可选值Admin、Student、Teacher、SchoolLeader
      userID: UserID, //新增时传空字符串、编辑时传相应UserID
      // curImgPath: ImgPath, //用户当前头像，新增时可不传
      gender: gender,
    };
    if (
      // UserArchivesModalVisible !==
      // ModalVisible.UserArchivesModalVisible
      UserArchivesModalVisible === true &&
      ModalVisible.UserArchivesModalVisible === false
    ) {
      // return
      // // 因为弹窗组件会提前加载，
      // 所以导致上传图片无法进行节点获取和数据更新，
      // 需要props更新一次进行挂载
      // option.curImgPath = ImgPath;
      // picUpload.picUploader(option);
      // console.log(ModalShowAccount)
      dispatch(
        CommonAction.SetUserArchivesParams({
          ModalShowAccount: ModalShowAccount + 1,
        })
      );
    }
    // let picUpload = this.state.picUpload this.picUpload.current
    if (ModalShowAccount % 2 === 0) {
      dispatch(
        CommonAction.SetUserArchivesParams({
          ModalShowAccount: ModalShowAccount + 1,
        })
      );
      option.curImgPath = ImgPath;
      picUpload.picUploader(option);
    }

    this.setState({
      picUpload,
    });
    // console.log(picUpload, picUpload);
  }
  componentDidCatch;
  ModalOk = () => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          ModalVisible: { UserArchivesModalVisible },
          UserArchivesParams: { UserArchivesModalType, UserArchivesModalRole },
          EditUserArchivesData,
          InitEditUserArchivesData,
        },
      },
      PublicState: {
        Loading: { ModalLoading },
      },
    } = this.props;
    if (ModalLoading) {
      return;
    }

    let TypeName = "";
    let picUpload = this.state.picUpload;

    // let picUpload = $(this.picUpload.current);
    if (picUpload.picUploader.uploadSubmit()) {
      let PicChange = picUpload.picUploader.isChanged();
      let PhotoEdit = 0; //是否修改了头像，1：修改了头像,0：未修改
      let ImgPath = picUpload.picUploader.getCurImgPath();
      if (PicChange) {
        PhotoEdit = 1;
      }
      // console.log(ImgPath);
      dispatch(
        CommonAction.SetEditUserArchivesData({
          PhotoEdit,
          ImgPath: ImgPath,
        })
      );
      dispatch(
        CommonAction.SetModalVisible({
          ModalLoading: true,
        })
      );
      dispatch(
        util.checkUserArchive({
          success: () => {
            // console.log("成功");
            // return;
            this.SetData({
              fn: (TypeName) => {
                dispatch(
                  CommonAction.SetModalVisible({
                    ModalLoading: false,
                  })
                );
                this.ModalCancel();
                dispatch(
                  PublicAction.showErrorAlert({
                    type: "success",
                    title: TypeName + "成功",
                  })
                );
              },
            });
          },
          repeatError: () => {
            dispatch(
              PublicAction.showErrorAlert({
                type: "warn",
                title:  "信息没有发生改变",
              })
            );
            console.log("重复");
          },
        })
      );
    }
  };
  //提交
  SetData = ({ fn = () => {} }) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          ModalVisible: { UserArchivesModalVisible },
          UserArchivesParams: { UserArchivesModalType, UserArchivesModalRole },
          EditUserArchivesData,
          InitEditUserArchivesData,
        },
      },
      PublicState: {
        Loading: { ModalLoading },
      },
    } = this.props;
    let TypeName = "";

    switch (UserArchivesModalType) {
      case "add":
        TypeName = "添加";
        if (UserArchivesModalRole === "Student") {
          dispatch(
            MainAction.AddStudent({
              fn: () => {
                fn(TypeName);
                dispatch(MainAction.GetStudentToPage({}));
              },
            })
          );
        } else if (UserArchivesModalRole === "Teacher") {
          dispatch(
            MainAction.AddTeacher({
              fn: () => {
                fn(TypeName);
                dispatch(MainAction.GetTeacherToPage({}));
              },
            })
          );
        } else if (UserArchivesModalRole === "Leader") {
          dispatch(
            MainAction.AddSchoolLeader({
              fn: () => {
                fn(TypeName);
                dispatch(MainAction.GetLeaderToPage({}));
              },
            })
          );
        }
        break;
      case "edit":
        TypeName = "编辑";
        if (UserArchivesModalRole === "Student") {
          dispatch(
            MainAction.EditStudent({
              fn: () => {
                fn(TypeName);
                dispatch(MainAction.GetStudentToPage({}));
              },
            })
          );
        } else if (UserArchivesModalRole === "Teacher") {
          dispatch(
            MainAction.EditTeacher({
              fn: () => {
                fn(TypeName);
                dispatch(MainAction.GetTeacherToPage({}));
              },
            })
          );
        } else if (UserArchivesModalRole === "Leader") {
          dispatch(
            MainAction.EditSchoolLeader({
              fn: () => {
                fn(TypeName);
                dispatch(MainAction.GetLeaderToPage({}));
              },
            })
          );
        }
        break;
      default:
        break;
    }
  };
  ModalCancel = () => {
    let { dispatch } = this.props;
    // if (modalLoading) {
    //   return;
    // }
    dispatch(
      CommonAction.SetTipsVisibleParams({
        TelephoneTipsVisible: false,
        EmailTipsVisible: false,
        HomeAddressTipsVisible: false,

        PositionTipsVisible: false,
        CollegeTipsVisible: false,
        IDCardNoTipsVisible: false,
        TitleTipsVisible: false,
        GradeTipsVisible: false,
        UserNameTipsVisible: false,
        UserIDTipsVisible: false,
        GenderTipsVisible: false,
        ClassTipsVisible: false,
        MajorTipsVisible: false,
        GroupTipsVisible: false,
      })
    );
    dispatch(
      CommonAction.SetModalVisible({
        UserArchivesModalVisible: false,
      })
    );
  };
  onEditIDChange = (e) => {
    const { dispatch } = this.props;
    dispatch(
      CommonAction.SetEditUserArchivesData({
        UserID: e.target.value.trim(),
      })
    );
    // this.setState({
    //   Telephone: e.target.value.trim()
    // });
  };
  onEditIDBlur = (e) => {
    const { dispatch } = this.props;
    let value = e.target.value;
    dispatch(
      util.checkUserID({
        value,
        success: (State) => {
          dispatch(CommonAction.SetEditUserArchivesData({ UserID: value }));
        },
      })
    );
  };
  onEditNameChange = (e) => {
    const { dispatch } = this.props;
    dispatch(
      CommonAction.SetEditUserArchivesData({
        UserName: e.target.value.trim(),
      })
    );
    // this.setState({
    //   Telephone: e.target.value.trim()
    // });
  };
  onEditNameBlur = (e) => {
    const { dispatch } = this.props;
    let value = e.target.value;
    dispatch(
      util.checkUserName({
        value,
        success: (State) => {
          dispatch(CommonAction.SetEditUserArchivesData({ UserName: value }));
        },
      })
    );
  };
  //性别
  onEditGendeChange = (e) => {
    const { dispatch } = this.props;

    // $(this.picUpload.current).picUploader.setGender(e.title);
    dispatch(
      util.checkGender({
        value: e.title,
        success: () => {
          dispatch(CommonAction.SetEditUserArchivesData({ Gender: e.title }));
        },
      })
    );
    // dispatch(CommonAction.SetTipsVisibleParams({ GenderTipsVisible: false }));
  };
  //学院
  onEditCollegeChange = (e) => {
    const { dispatch, DataState } = this.props;
    dispatch(
      util.checkCollege({
        value: e.value,
        success: () => {
          dispatch(
            CommonAction.SetEditUserArchivesData({
              CollegeID: e.value,
              CollegeName: e.title,
              MajorID: "",
              MajorName: "",
              GroupID: "",
              GroupName: "",
              ClassID: "",
              ClassName: "",
            })
          );
        },
      })
    );
  };
  // 教研室
  onEditGroupChange = (e) => {
    const { dispatch, DataState } = this.props;
    dispatch(
      util.checkGroup({
        value: e.value,
        success: () => {
          dispatch(
            CommonAction.SetEditUserArchivesData({
              GroupID: e.value,
              GroupName: e.title,
            })
          );
        },
      })
    );
  };
  // 专业
  onEditMajorChange = (e) => {
    const { dispatch, DataState } = this.props;
    dispatch(
      util.checkMajor({
        value: e.value,
        success: () => {
          dispatch(
            CommonAction.SetEditUserArchivesData({
              MajorID: e.value,
              MajorName: e.title,

              ClassID: "",
              ClassName: "",
            })
          );
        },
      })
    );
  };
  // 年级
  onEditGradeChange = (e) => {
    const { dispatch, DataState } = this.props;
    dispatch(
      util.checkGrade({
        value: e.value,
        success: () => {
          dispatch(
            CommonAction.SetEditUserArchivesData({
              GradeID: e.value,
              GradeName: e.title,

              ClassID: "",
              ClassName: "",
            })
          );
        },
      })
    );
  };
  // 班级
  onEditClassChange = (e) => {
    const { dispatch, DataState } = this.props;
    dispatch(
      util.checkClass({
        value: e.value,
        success: () => {
          dispatch(
            CommonAction.SetEditUserArchivesData({
              ClassID: e.value,
              ClassName: e.title,
            })
          );
        },
      })
    );
  };
  // 职称
  onEditTitleChange = (e) => {
    const { dispatch, DataState } = this.props;
    dispatch(
      util.checkTitle({
        value: e.value,
        success: () => {
          dispatch(
            CommonAction.SetEditUserArchivesData({
              TitleID: e.value,
              TitleName: e.title,
            })
          );
        },
      })
    );
  };
  // 职务
  onEditPositionChange = (e) => {
    const { dispatch, DataState } = this.props;
    dispatch(
      util.checkPosition({
        value: e.value,
        success: () => {
          dispatch(
            CommonAction.SetEditUserArchivesData({
              Position: e.value,
            })
          );
        },
      })
    );
  };
  // 身份证
  onEditIDCardChange = (e) => {
    const { dispatch } = this.props;
    dispatch(
      CommonAction.SetEditUserArchivesData({
        IDCardNo: e.target.value.trim(),
      })
    );
  };
  onEditIDCardBlur = (e) => {
    const { dispatch } = this.props;
    let value = e.target.value;
    dispatch(
      util.checkIDCardNo({
        value,
        success: (State) => {
          dispatch(CommonAction.SetEditUserArchivesData({ IDCardNo: value }));
        },
      })
    );
  };
  // 预留电话
  onEditPhoneChange = (e) => {
    const { dispatch } = this.props;
    dispatch(
      CommonAction.SetEditUserArchivesData({
        Telephone: e.target.value.trim(),
      })
    );
  };
  onEditPhoneBlur = (e) => {
    const { dispatch } = this.props;
    let value = e.target.value;
    dispatch(
      util.checkTelephone({
        value,
        success: (State) => {
          dispatch(CommonAction.SetEditUserArchivesData({ Telephone: value }));
        },
      })
    );
  };
  // 电子邮箱
  onEditMailChange = (e) => {
    const { dispatch } = this.props;
    dispatch(
      CommonAction.SetEditUserArchivesData({
        Email: e.target.value.trim(),
      })
    );
  };
  onEditMailBlur = (e) => {
    const { dispatch } = this.props;
    let value = e.target.value;
    dispatch(
      util.checkEmail({
        value,
        success: (State) => {
          dispatch(CommonAction.SetEditUserArchivesData({ Email: value }));
        },
      })
    );
  };
  // 家庭住址
  onEditAddressChange = (e) => {
    const { dispatch } = this.props;
    dispatch(
      CommonAction.SetEditUserArchivesData({
        HomeAddress: e.target.value.trim(),
      })
    );
  };
  onEditAddressBlur = (e) => {
    const { dispatch } = this.props;
    let value = e.target.value;
    dispatch(
      util.checkHomeAddress({
        value,
        success: (State) => {
          dispatch(
            CommonAction.SetEditUserArchivesData({ HomeAddress: value })
          );
        },
      })
    );
  };
  // 学科
  changeCheckBox = (e) => {
    const { dispatch } = this.props;
    if (e.length === 0) {
      return;
    }

    dispatch(
      util.checkSubjectID({
        value: e,
        success: (State) => {
          dispatch(CommonAction.SetEditUserArchivesData({ SubjectIDs: e }));
        },
      })
    );
  };
  // 添加专业
  onAddMajorClick = () => {
    let {
      dispatch,
      UIState,
      DataState: {
        CommonData: {
          EditUserArchivesData: { CollegeID, CollegeName },
        },
      },
    } = this.props;

    dispatch(
      CommonAction.SetMajorEditParams({
        HandleMajorType: "add", //add,edit,delete
        MajorID: "",
        MajorName: "",
        HandleMajorCollegeID: CollegeID,
        HandleMajorCollegeName: CollegeName,
      })
    );
    dispatch(
      CommonAction.SetModalVisible({
        HandleMajorModalVisible: true,
      })
    );
  };
  // 添加班级
  onAddClass = () => {
    let {
      dispatch,
      UIState,
      DataState: {
        CommonData: {
          EditUserArchivesData: { CollegeID, CollegeName },
        },
      },
    } = this.props;

    // dispatch(
    //   CommonAction.SetMajorEditParams({
    //     HandleMajorType: "add", //add,edit,delete
    //     MajorID: "",
    //     MajorName: "",
    //     HandleMajorCollegeID: CollegeID,
    //     HandleMajorCollegeName: CollegeName,
    //   })
    // );
    dispatch(
      CommonAction.SetModalVisible({
        AddClassModalVisible: true,
      })
    );
  };
  // 添加教研室
  onAddGroupClick = () => {
    let {
      dispatch,
      UIState,
      DataState: {
        CommonData: {
          EditUserArchivesData: { CollegeID, CollegeName },
        },
      },
    } = this.props;

    dispatch(
      CommonAction.SetGroupEditParams({
        HandleGroupType: "add", //add,edit,delete
        GroupID: "",
        GroupName: "",
        HandleGroupCollegeID: CollegeID,
        HandleGroupCollegeName: CollegeName,
      })
    );
    dispatch(
      CommonAction.SetModalVisible({
        HandleGroupModalVisible: true,
      })
    );
  };
  //遍历显示学科选择
  MapPlainOptions = (plainOptions) => {
    const {
      DataState: {
        MainData: { SubjectList },
      },
    } = this.props;
    // let SubjectListChange =
    //   DataState.SubjectTeacherMsg.returnData.SubjectListChange;
    // let TeacherChangeMsg = {};
    // let Options = [];
    // SubjectList instanceof Array &&
    // SubjectList.map((child, index) => {
    //     TeacherChangeMsg[child.value] = child.title;
    //     Options.push(child.value);
    //   });
    // let a = [];
    let map =
      SubjectList.length > 0 ? (
        SubjectList.map((opt, index) => {
          return (
            <CheckBox
              // type="gray"
              className={"checkedBoxMap"}
              key={index}
              value={opt.value}
            >
              <span className="checkedBoxMap-title" title={opt.title}>
                {opt.title}
              </span>
            </CheckBox>
          );
        })
      ) : (
        <p
          style={{
            height: "29px",
            lineHeight: "29px",
            margin: 0,
          }}
        >
          暂无学科
        </p>
      );

    return map;
  };
  render() {
    let {
      DataState: {
        MainData: { StudentTree, TeacherTree, TitleList },
        CommonData: {
          ModalVisible: { UserArchivesModalVisible },
          UserArchivesParams: { UserArchivesModalType, UserArchivesModalRole },
          RolePower: { IsCollege,ProductType_6 },

          TipsVisible: {
            UserIDTipsVisible,
            IDCardNoTipsVisible,
            TitleTipsVisible,
            GradeTipsVisible,
            UserNameTipsVisible,
            GenderTipsVisible,
            ClassTipsVisible,
            MajorTipsVisible,
            PositionTipsVisible,
            GroupTipsVisible,
            CollegeTipsVisible,
            TelephoneTipsVisible,
            EmailTipsVisible,
            HomeAddressTipsVisible,
            SubjectTipsVisible,
          },
          TipsTitle: {
            UserIDTipsTitle,
            UserNameTipsTitle, //（首尾不允许空格）
            GradeTipsTitle,
            TitleTipsTitle,
            PositionTipsTitle,
            ClassTipsTitle,
            CollegeTipsTitle,
            GroupTipsTitle,
            MajorTipsTitle,
            IDCardNoTipsTitle,
            HomeAddressTipsTitle,
            GenderTipsTitle,
            EmailTipsTitle,
            TelephoneTipsTitle,
            SubjectTipsTitle,
          },
          EditUserArchivesData: {
            UserID,
            UserName,
            ImgPath,
            Gender,
            CollegeID,
            CollegeName,
            Position,
            TitleID,
            TitleName,
            IDCardNo,
            SubjectIDs,
            Telephone,
            Email,
            HomeAddress,
            GroupID,
            GroupName,
            MajorID,
            MajorName,
            GradeID,
            GradeName,
            ClassID,
            ClassName,
          },
          StudentParams,
          // : {
          //   collegeID,
          //   collegeName,
          //   schoolID,
          //   majorID,
          //   majorName,
          //   gradeID,
          //   gradeName,
          //   classID,
          //   className,
          // }
          TeacherParams,

          LeaderParams,
        },
      },
      PublicState: {
        Loading: { ModalLoading },
      },
    } = this.props;
    let TypeName = "";
    switch (UserArchivesModalType) {
      case "add":
        TypeName = "添加";
        break;
      case "edit":
        TypeName = "编辑";
        break;
      default:
        break;
    }
    let RoleName = "";
    let UserIDC = "学号";
    let CollegeList = [];
    let MajorList = [];
    let GradeList = [];
    let ClassList = [];
    let GroupList = [];
    let PositionList = [
      { value: "校长", title: "校长" },
      { value: "副校长", title: "副校长" },
      { value: "教务主任", title: "教务主任" },
    ];

    let GenderList = [
      {
        value: "男",
        title: "男",
      },
      {
        value: "女",
        title: "女",
      },
      {
        value: "保密",
        title: "保密",
      },
    ];
    let bodyHeight = "456px";
    switch (UserArchivesModalRole) {
      case "Student":
        RoleName = "学生";
        UserIDC = "学号";
        CollegeList = StudentTree.CollegeList;
        // MajorList = StudentTree.MajorList;
        GradeList = StudentTree.GradeList;
        // ClassList = StudentTree.ClassList;
        // CollegeID &&
        //   StudentTree.MajorList instanceof Array &&
        //   StudentTree.MajorList.forEach((child) => {
        //     if (child.CollegeID === CollegeID) {
        //       MajorList.push(child);
        //     }
        //   });
        // CollegeID &&
        //   MajorID &&
          GradeID &&
          StudentTree.ClassList instanceof Array &&
          StudentTree.ClassList.forEach((child) => {
            if (
              // child.CollegeID === CollegeID &&
              // child.MajorID === MajorID &&
              child.GradeID === GradeID
            ) {
              ClassList.push(child);
            }
          });
        bodyHeight = "510px";
        break;
      case "Teacher":
        RoleName = "教师";
        UserIDC = "工号";
        CollegeList = TeacherTree.CollegeList;
        // GroupList = TeacherTree.GroupList;
        // CollegeID &&
        //   TeacherTree.GroupList instanceof Array &&
        //   TeacherTree.GroupList.forEach((child) => {
        //     if (child.CollegeID === CollegeID) {
        //       GroupList.push(child);
        //     }
        //   });
        bodyHeight = "550px";
        break;
      case "Leader":
        RoleName = "领导";
        UserIDC = "工号";
        bodyHeight = "380px";

        break;
      default:
        break;
    }
    return (
      <Modal
        ref="UserArchivesModal"
        bodyStyle={{ height: bodyHeight }}
        type="1"
        title={TypeName + RoleName}
        width={810}
        visible={UserArchivesModalVisible}
        className="UserArchivesModal"
        onOk={this.ModalOk}
        destroyOnClose={false}
        onCancel={this.ModalCancel}
      >
        <Loading
          opacity={0.5}
          tip="处理中..."
          size="small"
          spinning={ModalLoading}
        >
          <div className="Modal-box" style={{ height: bodyHeight }}>
            <div className="Left" id="picUpload" ref={this.picUpload}></div>
            <div className="Right">
              <div
                className="row clearfix"
                style={{
                  marginTop:
                    UserArchivesModalRole === "Student" ||
                    !UserArchivesModalRole
                      ? 18 + "px"
                      : 5 + "px",
                }}
              >
                <span className="culonm-1">
                  <span
                    className="must-icon"
                    style={{
                      display:
                        UserArchivesModalType === "add"
                          ? "inline-block"
                          : "none",
                    }}
                  >
                    *
                  </span>
                  {UserIDC + "："}
                </span>
                <div className="culonm-2">
                  <Tips
                    overlayClassName="tips"
                    visible={UserIDTipsVisible}
                    autoAdjustOverflow={false}
                    getPopupContainer={(e) => e.parentNode}
                    title={UserIDTipsTitle}
                  >
                    {UserArchivesModalType === "add" ? (
                      <Input
                        maxLength={24}
                        id="123"
                        placeholder={"请输入" + UserIDC + "..."}
                        className="UserName-input"
                        type="text"
                        name="EditID"
                        value={UserID}
                        onChange={this.onEditIDChange}
                        onBlur={this.onEditIDBlur}
                      />
                    ) : (
                      <span className="UserID-text" title={UserID}>
                        {UserID ? UserID : "--"}
                      </span>
                    )}
                  </Tips>
                </div>
              </div>
              <div className="row clearfix">
                <span className="culonm-1">
                  <span className="must-icon">*</span>姓名：
                </span>
                <div className="culonm-2">
                  <Tips
                    overlayClassName="tips"
                    placement={"right"}
                    getPopupContainer={(e) => e.parentNode}
                    autoAdjustOverflow={false}
                    visible={UserNameTipsVisible}
                    title={UserNameTipsTitle}
                  >
                    <Input
                      className="UserName-input"
                      maxLength={20}
                      placeholder={"请输入姓名..."}
                      type="text"
                      name="EditName"
                      value={UserName}
                      onChange={this.onEditNameChange}
                      onBlur={this.onEditNameBlur}
                    />
                  </Tips>
                </div>
              </div>
              <div className="row clearfix">
                <span className="culonm-1">
                  <span className="must-icon">*</span>性别：
                </span>
                <div className="culonm-2">
                  <Tips
                    overlayClassName="tips"
                    visible={GenderTipsVisible}
                    getPopupContainer={(e) => e.parentNode}
                    title={GenderTipsTitle}
                  >
                    <DropDown
                      style={{ zIndex: 10 }}
                      dropSelectd={{
                        value: Gender,
                        title: Gender ? Gender : "请选择性别",
                      }}
                      dropList={GenderList}
                      width={120}
                      height={96}
                      onChange={this.onEditGendeChange}
                    ></DropDown>
                  </Tips>
                </div>
              </div>
              {/* {UserArchivesModalRole === "Student" ||
              UserArchivesModalRole === "Teacher" ? (
                <div className="row clearfix">
                  <span className="culonm-1">
                    <span className="must-icon">*</span>学院：
                  </span>
                  <div className="culonm-2">
                    <Tips
                      overlayClassName="tips"
                      visible={CollegeTipsVisible}
                      getPopupContainer={(e) => e.parentNode}
                      title={CollegeTipsTitle}
                    >
                      {IsCollege ? (
                        <span
                          style={{ lineHeight: "40px" }}
                          title={CollegeName}
                        >
                          {CollegeName ? CollegeName : "--"}
                        </span>
                      ) : (
                        <DropDown
                          style={{ zIndex: 4 }}
                          dropSelectd={
                            CollegeList.length > 0
                              ? {
                                  value: CollegeID,
                                  title: CollegeID ? CollegeName : "请选择学院",
                                }
                              : { value: -1, title: "暂无创建学院" }
                          }
                          dropList={CollegeList}
                          width={200}
                          height={96}
                          onChange={this.onEditCollegeChange}
                        ></DropDown>
                      )}
                    </Tips>
                  </div>
                </div>
              ) : (
                ""
              )} */}
              {/* {UserArchivesModalRole === "Teacher" ? (
                <div className="row clearfix ">
                  <span className="culonm-1 ">
                    <span className="must-icon">*</span>教研室：
                  </span>
                  <div className="culonm-2">
                    <Tips
                      overlayClassName="tips"
                      visible={
                        CollegeID && GroupList.length !== 0
                          ? GroupTipsVisible
                          : false
                      }
                      getPopupContainer={(e) => e.parentNode}
                      title={GroupTipsTitle}
                    >
                      <DropDown
                        style={{ zIndex: 2 }}
                        disabled={
                          GroupList.length === 0 || !CollegeID ? true : false
                        }
                        // disabled={this.state.ClassChange.value===-1?false:true}
                        dropSelectd={
                          !CollegeID || GroupList.length > 0
                            ? {
                                value: GroupID,
                                title: GroupID ? GroupName : "请选择教研室",
                              }
                            : { value: -1, title: "暂无创建教研室" }
                        }
                        dropList={GroupList}
                        width={200}
                        height={96}
                        onChange={this.onEditGroupChange}
                      ></DropDown>
                    </Tips>
                    {CollegeID && GroupList.length === 0 ? (
                      <span className="AddOther" onClick={this.onAddGroupClick}>
                        添加教研室
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )} */}
              {/* {UserArchivesModalRole === "Student" ? (
                <div className="row clearfix ">
                  <span className="culonm-1 ">
                    <span className="must-icon">*</span>专业：
                  </span>
                  <div className="culonm-2">
                    <Tips
                      overlayClassName="tips"
                      visible={
                        CollegeID && MajorList.length !== 0
                          ? MajorTipsVisible
                          : false
                      }
                      getPopupContainer={(e) => e.parentNode}
                      title={MajorTipsTitle}
                    >
                      <DropDown
                        style={{ zIndex: 3 }}
                        disabled={
                          MajorList.length === 0 || !CollegeID ? true : false
                        }
                        // disabled={this.state.ClassChange.value===-1?false:true}
                        dropSelectd={
                          !CollegeID || MajorList.length > 0
                            ? {
                                value: MajorID,
                                title: MajorID ? MajorName : "请选择专业",
                              }
                            : { value: -1, title: "暂无创建专业" }
                        }
                        dropList={MajorList}
                        width={200}
                        height={96}
                        onChange={this.onEditMajorChange}
                      ></DropDown>
                    </Tips>
                    {CollegeID && MajorList.length === 0 ? (
                      <span className="AddOther" onClick={this.onAddMajorClick}>
                        添加专业
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )} */}
              {UserArchivesModalRole === "Student" ? (
                <div className="row clearfix ">
                  <span className="culonm-1 ">
                    <span className="must-icon">*</span>年级：
                  </span>
                  <div className="culonm-2">
                    <Tips
                      overlayClassName="tips"
                      visible={GradeTipsVisible}
                      getPopupContainer={(e) => e.parentNode}
                      title={GradeTipsTitle}
                    >
                      <DropDown
                        style={{ zIndex: 2 }}
                        // disabled={
                        //   MajorList.length === 0 || !CollegeID ? true : false
                        // }
                        dropSelectd={
                          GradeList.length > 0
                            ? {
                                value: GradeID,
                                title: GradeID ? GradeName : "请选择年级",
                              }
                            : { value: -1, title: "暂无创建年级" }
                        }
                        dropList={GradeList}
                        width={200}
                        height={96}
                        onChange={this.onEditGradeChange}
                      ></DropDown>
                    </Tips>
                  </div>
                </div>
              ) : (
                ""
              )}
              {UserArchivesModalRole === "Student" ? (
                <div className="row clearfix ">
                  <span className="culonm-1 ">
                    <span className="must-icon">*</span>班级：
                  </span>
                  <div className="culonm-2">
                    <Tips
                      overlayClassName="tips"
                      visible={
                        // CollegeID &&
                        // MajorID &&
                        GradeID &&
                        ClassList.length !== 0
                          ? ClassTipsVisible
                          : false
                      }
                      getPopupContainer={(e) => e.parentNode}
                      title={ClassTipsTitle}
                    >
                      <DropDown
                        style={{ zIndex: 1 }}
                        disabled={
                          ClassList.length === 0 ||
                          // !MajorID ||
                          !GradeID 
                          // ||
                          // !CollegeID
                            ? true
                            : false
                        }
                        // disabled={this.state.ClassChange.value===-1?false:true}
                        dropSelectd={
                          // !CollegeID ||
                          // !MajorID ||
                          !GradeID ||
                          ClassList.length > 0
                            ? {
                                value: ClassID,
                                title: ClassID ? ClassName : "请选择班级",
                              }
                            : { value: -1, title: "暂无创建班级" }
                        }
                        dropList={ClassList}
                        width={200}
                        height={96}
                        onChange={this.onEditClassChange}
                      ></DropDown>
                    </Tips>
                    {CollegeID &&
                    GradeID &&
                    MajorID &&
                    ClassList.length === 0 ? (
                      <span className="AddOther" onClick={this.onAddClass}>
                        添加班级
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
              {UserArchivesModalRole === "Teacher" ? (
                <div className="row clearfix">
                  <span className="culonm-1">
                    <span className="must-icon">*</span>职称：
                  </span>
                  <div className="culonm-2">
                    <Tips
                      overlayClassName="tips"
                      visible={TitleTipsVisible}
                      getPopupContainer={(e) => e.parentNode}
                      title={TitleTipsTitle}
                    >
                      <DropDown
                        style={{ zIndex: 1 }}
                        dropSelectd={{
                          value: TitleID,
                          title: TitleID ? TitleName : "请选择职称",
                        }}
                        dropList={TitleList}
                        width={200}
                        height={96}
                        onChange={this.onEditTitleChange}
                      ></DropDown>
                    </Tips>
                  </div>
                </div>
              ) : (
                ""
              )}
              {!ProductType_6&&UserArchivesModalRole === "Teacher" ? (
                <div className="row clearfix row-subject">
                  <span className="culonm-1 Subject">
                    <span className="must-icon">*</span>所教学科：
                  </span>
                  <div className="culonm-2">
                    {
                      <Tips
                        overlayClassName="tips"
                        visible={SubjectTipsVisible}
                        getPopupContainer={(e) => e.parentNode}
                        title={SubjectTipsTitle}
                      >
                        {this.MapPlainOptions().length <= 16 ? (
                          <CheckBoxGroup
                            onChange={this.changeCheckBox}
                            className={"checkedBoxGroupMap"}
                            value={SubjectIDs}
                          >
                            {this.MapPlainOptions()}
                          </CheckBoxGroup>
                        ) : (
                          <Scrollbars
                            autoHeightMin={28}
                            autoHeightMax={112}
                            autoHeight={true}
                            autoHide={
                              this.MapPlainOptions().length <= 16 ? true : false
                            }
                            autoHideTimeout={0}
                            autoHideDuration={0}
                            className="Scrollbars"
                            // renderTrackVertical={props=>{return this.MapPlainOptions().length <= 16 ? <div></div> : <div {...props}/>}}
                            style={{
                              display: "inline-block",
                              width: "unset",
                              // height: "unset",
                              // maxWidth: "400px",
                              minWidth: "100px",
                            }}
                          >
                            <CheckBoxGroup
                              onChange={this.changeCheckBox}
                              className={"checkedBoxGroupMap"}
                              value={SubjectIDs}
                            >
                              {this.MapPlainOptions()}
                            </CheckBoxGroup>
                          </Scrollbars>
                        )}
                      </Tips>
                    }
                  </div>
                </div>
              ) : (
                ""
              )}
              {UserArchivesModalRole === "Leader" ? (
                <div className="row clearfix row-position">
                  <span className="culonm-1">
                    <span className="must-icon">*</span>行政职务：
                  </span>
                  <div className="culonm-2">
                    <Tips
                      overlayClassName="tips"
                      visible={PositionTipsVisible}
                      getPopupContainer={(e) => e.parentNode}
                      title={PositionTipsTitle}
                    >
                      <DropDown
                        style={{ zIndex: 1 }}
                        dropSelectd={{
                          value: Position,
                          title: Position ? Position : "请选择职务",
                        }}
                        dropList={PositionList}
                        width={200}
                        height={96}
                        onChange={this.onEditPositionChange}
                      ></DropDown>
                    </Tips>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="row clearfix">
                <span className="culonm-1">身份证号码：</span>
                <div className="culonm-2">
                  <Tips
                    overlayClassName="tips"
                    visible={IDCardNoTipsVisible}
                    getPopupContainer={(e) => e.parentNode}
                    title={IDCardNoTipsTitle}
                  >
                    <Input
                      className="input"
                      value={IDCardNo}
                      type="text"
                      maxLength={18}
                      name="EditIDCard"
                      onChange={this.onEditIDCardChange}
                      onBlur={this.onEditIDCardBlur}
                    ></Input>
                  </Tips>
                </div>
              </div>
              <div className="row clearfix">
                <span className="culonm-1">预留电话：</span>
                <div className="culonm-2">
                  <Tips
                    overlayClassName="tips"
                    visible={TelephoneTipsVisible}
                    getPopupContainer={(e) => e.parentNode}
                    title={TelephoneTipsTitle}
                  >
                    <Input
                      className="input"
                      maxLength={40}
                      value={Telephone}
                      type="text"
                      name="EditPhone"
                      onChange={this.onEditPhoneChange}
                      onBlur={this.onEditPhoneBlur}
                    ></Input>
                  </Tips>
                </div>
              </div>
              <div className="row clearfix">
                <span className="culonm-1">电子邮箱：</span>
                <div className="culonm-2">
                  <Tips
                    overlayClassName="tips"
                    visible={EmailTipsVisible}
                    getPopupContainer={(e) => e.parentNode}
                    title={EmailTipsTitle}
                  >
                    <Input
                      className="input"
                      type="text"
                      name="EditMail"
                      value={Email}
                      onChange={this.onEditMailChange}
                      onBlur={this.onEditMailBlur}
                    ></Input>
                  </Tips>
                </div>
              </div>
              <div className="row clearfix">
                <span className="culonm-1">家庭住址：</span>
                <div className="culonm-2">
                  <Tips
                    overlayClassName="tips"
                    visible={HomeAddressTipsVisible}
                    getPopupContainer={(e) => e.parentNode}
                    autoAdjustOverflow={false}
                    title={HomeAddressTipsTitle}
                  >
                    <Input.TextArea
                      className="inputarea"
                      rows="2"
                      cols="30"
                      height="56"
                      name="EditAddress"
                      value={HomeAddress}
                      onChange={this.onEditAddressChange}
                      onBlur={this.onEditAddressBlur}
                    ></Input.TextArea>
                  </Tips>
                </div>
              </div>
            </div>
          </div>
        </Loading>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
export default connect(mapStateToProps)(UserArchivesModal);
