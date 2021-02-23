import CommonAction from "./CommonAction";
import Public from "../../../common/js/public";
let { comparisonObject } = Public;
const checkTelephone = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    let Test = /^([0-9\/-]){1,40}$/.test(value);
    if (Test || !value) {
      dispatch(
        CommonAction.SetTipsVisibleParams({ TelephoneTipsVisible: false })
      );
      success(getState());
    } else {
      dispatch(
        CommonAction.SetTipsVisibleParams({ TelephoneTipsVisible: true })
      );
      error(getState());
    }
    fn(getState());
  };
};
const checkEmail = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    let Test = false;
    if (!/^(\S)+@(\S)+\.[a-zA-Z]{2,3}$/.test(value)) {
      Test = false;
    } else {
      Test = /^([a-zA-Z0-9]+[_|\-|\.]*)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]*)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/gi.test(
        value
      );
    }
    if (Test || !value) {
      dispatch(CommonAction.SetTipsVisibleParams({ EmailTipsVisible: false }));
      success(getState());
    } else {
      dispatch(CommonAction.SetTipsVisibleParams({ EmailTipsVisible: true }));
      error(getState());
    }
    fn(getState());
  };
};
const checkIDCardNo = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    let Test = false;

    Test = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
      value
    );

    if (Test || !value) {
      dispatch(
        CommonAction.SetTipsVisibleParams({ IDCardNoTipsVisible: false })
      );
      success(getState());
    } else {
      dispatch(
        CommonAction.SetTipsVisibleParams({ IDCardNoTipsVisible: true })
      );
      error(getState());
    }
    fn(getState());
  };
};
const checkHomeAddress = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    let Test = /^[A-Za-z0-9_()\u4e00-\u9fa5-]{0,100}$/.test(value);
    if (Test || !value) {
      dispatch(
        CommonAction.SetTipsVisibleParams({ HomeAddressTipsVisible: false })
      );
      success(getState());
    } else {
      dispatch(
        CommonAction.SetTipsVisibleParams({ HomeAddressTipsVisible: true })
      );
      error(getState());
    }
    fn(getState());
  };
};
const checkGraduateContact = ({
  //   Telephone,
  //   Email,
  //   HomeAddress,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    let {
      DataState: {
        CommonData: {
          GraduateEditParams: { Telephone, Email, HomeAddress },
        },
      },
    } = getState();
    let TelephoneError = false;
    let EmailError = false;
    let HomeAddressError = false;
    dispatch(
      checkTelephone({
        value: Telephone,
        error: () => {
          TelephoneError = true;
        },
      })
    );
    dispatch(
      checkEmail({
        value: Email,
        error: () => {
          EmailError = true;
        },
      })
    );
    dispatch(
      checkHomeAddress({
        value: HomeAddress,
        error: () => {
          HomeAddressError = true;
        },
      })
    );

    if (TelephoneError || EmailError || HomeAddressError) {
      error();
    } else {
      success();
    }
    fn();
  };
};
const checkDiscription = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    let Test = /^[?？+-=\.\\/\*()（）A-Za-z0-9\u4e00-\u9fa5]{1,30}$/.test(
      value
    );
    if (Test || !value) {
      dispatch(
        CommonAction.SetTipsVisibleParams({ DiscriptionTipsVisible: false })
      );
      success(getState());
    } else {
      dispatch(
        CommonAction.SetTipsVisibleParams({ DiscriptionTipsVisible: true })
      );
      error(getState());
    }
    fn(getState());
  };
};
const checkUserID = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    let Test = /^([a-zA-Z0-9]{1,24})$/.test(value);
    if (Test) {
      dispatch(CommonAction.SetTipsVisibleParams({ UserIDTipsVisible: false }));
      success(getState());
    } else {
      dispatch(CommonAction.SetTipsVisibleParams({ UserIDTipsVisible: true }));
      error(getState());
    }
    fn(getState());
  };
};
const checkUserName = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    let Test = /^[a-zA-Z0-9_\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_\u4e00-\u9fa5]$|^[a-zA-Z0-9_\u4e00-\u9fa5]{1,50}$/.test(
      value
    );
    if (Test) {
      dispatch(
        CommonAction.SetTipsVisibleParams({ UserNameTipsVisible: false })
      );
      success(getState());
    } else {
      dispatch(
        CommonAction.SetTipsVisibleParams({ UserNameTipsVisible: true })
      );
      error(getState());
    }
    fn(getState());
  };
};
const checkGender = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    if (value) {
      dispatch(CommonAction.SetTipsVisibleParams({ GenderTipsVisible: false }));
      success(getState());
    } else {
      dispatch(CommonAction.SetTipsVisibleParams({ GenderTipsVisible: true }));
      error(getState());
    }
    fn(getState());
  };
};
const checkCollege = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    if (value) {
      dispatch(
        CommonAction.SetTipsVisibleParams({ CollegeTipsVisible: false })
      );
      success(getState());
    } else {
      dispatch(CommonAction.SetTipsVisibleParams({ CollegeTipsVisible: true }));
      error(getState());
    }
    fn(getState());
  };
};
const checkGroup = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    if (value) {
      dispatch(CommonAction.SetTipsVisibleParams({ GroupTipsVisible: false }));
      success(getState());
    } else {
      dispatch(CommonAction.SetTipsVisibleParams({ GroupTipsVisible: true }));
      error(getState());
    }
    fn(getState());
  };
};
const checkGroupName = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    let Test = /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,20}$/.test(
      value
    );
    if (Test && value) {
      dispatch(
        CommonAction.SetTipsVisibleParams({ GroupNameTipsVisible: false })
      );
      success(getState());
    } else {
      dispatch(
        CommonAction.SetTipsVisibleParams({ GroupNameTipsVisible: true })
      );
      error(getState());
    }
    fn(getState());
  };
};
const checkMajor = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    if (value) {
      dispatch(CommonAction.SetTipsVisibleParams({ MajorTipsVisible: false }));
      success(getState());
    } else {
      dispatch(CommonAction.SetTipsVisibleParams({ MajorTipsVisible: true }));
      error(getState());
    }
    fn(getState());
  };
};
const checkMajorName = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    let Test = /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,20}$/.test(
      value
    );
    if (Test && value) {
      dispatch(
        CommonAction.SetTipsVisibleParams({ MajorNameTipsVisible: false })
      );
      success(getState());
    } else {
      dispatch(
        CommonAction.SetTipsVisibleParams({ MajorNameTipsVisible: true })
      );
      error(getState());
    }
    fn(getState());
  };
};
const checkGrade = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    if (value) {
      dispatch(CommonAction.SetTipsVisibleParams({ GradeTipsVisible: false }));
      success(getState());
    } else {
      dispatch(CommonAction.SetTipsVisibleParams({ GradeTipsVisible: true }));
      error(getState());
    }
    fn(getState());
  };
};
const checkClass = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    if (value) {
      dispatch(CommonAction.SetTipsVisibleParams({ ClassTipsVisible: false }));
      success(getState());
    } else {
      dispatch(CommonAction.SetTipsVisibleParams({ ClassTipsVisible: true }));
      error(getState());
    }
    fn(getState());
  };
};
const checkClassName = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    let Test = /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,20}$/.test(
      value
    );
    if (Test && value) {
      dispatch(
        CommonAction.SetTipsVisibleParams({ ClassNameTipsVisible: false })
      );
      success(getState());
    } else {
      dispatch(
        CommonAction.SetTipsVisibleParams({ ClassNameTipsVisible: true })
      );
      error(getState());
    }
    fn(getState());
  };
};
const checkTitle = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    if (value) {
      dispatch(CommonAction.SetTipsVisibleParams({ TitleTipsVisible: false }));
      success(getState());
    } else {
      dispatch(CommonAction.SetTipsVisibleParams({ TitleTipsVisible: true }));
      error(getState());
    }
    fn(getState());
  };
};
const checkPosition = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    if (value) {
      dispatch(
        CommonAction.SetTipsVisibleParams({ PositionTipsVisible: false })
      );
      success(getState());
    } else {
      dispatch(
        CommonAction.SetTipsVisibleParams({ PositionTipsVisible: true })
      );
      error(getState());
    }
    fn(getState());
  };
};
const checkSubjectID = ({
  value,
  fn = () => {},
  error = () => {},
  success = () => {},
}) => {
  return (dispatch, getState) => {
    // console.log(value);
    if (value instanceof Array 
      // && value.length > 0
      ) {
      dispatch(
        CommonAction.SetTipsVisibleParams({ SubjectTipsVisible: false })
      );
      success(getState());
    } else {
      dispatch(CommonAction.SetTipsVisibleParams({ SubjectTipsVisible: true }));
      error(getState());
    }
    fn(getState());
  };
};
const checkUserArchive = ({
  //   Telephone,
  //   Email,
  //   HomeAddress,
  fn = () => {},
  error = () => {},
  success = () => {},
  repeatError = () => {},
}) => {
  return (dispatch, getState) => {
    let {
      DataState: {
        CommonData: {
          EditUserArchivesData,
          InitEditUserArchivesData,
          UserArchivesParams: { UserArchivesModalRole },
          RolePower: { ProductType_6 },
        },
      },
    } = getState();
    let {
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
      Telephone,
      Email,
      SubjectIDs,
      HomeAddress,
      GroupID,
      GroupName,
      MajorID,
      MajorName,
      GradeID,
      GradeName,
      ClassID,
      ClassName,
    } = EditUserArchivesData;
    EditUserArchivesData = { ...EditUserArchivesData };
    InitEditUserArchivesData = { ...InitEditUserArchivesData };
    let TelephoneError = false;
    let EmailError = false;
    let HomeAddressError = false;
    let UserIDError = false;
    let UserNameError = false;
    let GenderError = false;
    let CollegeIDError = false;
    let PositionError = false;
    let TitleIDError = false;
    let IDCardNoError = false;
    let GroupIDError = false;
    let MajorIDError = false;
    let GradeIDError = false;
    let ClassIDError = false;
    let SubjectTipsVisible = false;

    dispatch(
      checkTelephone({
        value: Telephone,
        error: () => {
          TelephoneError = true;
        },
      })
    );
    dispatch(
      checkEmail({
        value: Email,
        error: () => {
          EmailError = true;
        },
      })
    );
    dispatch(
      checkHomeAddress({
        value: HomeAddress,
        error: () => {
          HomeAddressError = true;
        },
      })
    );

    dispatch(
      checkUserID({
        value: UserID,
        error: () => {
          UserIDError = true;
        },
      })
    );
    dispatch(
      checkUserName({
        value: UserName,
        error: () => {
          UserNameError = true;
        },
      })
    );
    dispatch(
      checkGender({
        value: Gender,
        error: () => {
          GenderError = true;
        },
      })
    );

    dispatch(
      checkIDCardNo({
        value: IDCardNo,
        error: () => {
          IDCardNoError = true;
        },
      })
    );

    // if (UserArchivesModalRole !== "Leader") {
    //   dispatch(
    //     checkCollege({
    //       value: CollegeID,
    //       error: () => {
    //         CollegeIDError = true;
    //       },
    //     })
    //   );
    // }
    EditUserArchivesData.ImgPath = "";
    InitEditUserArchivesData.ImgPath = ""; //不做Img的对比
    let isRepeat = comparisonObject(
      EditUserArchivesData,
      InitEditUserArchivesData
    );
    // console.log(isRepeat, EditUserArchivesData, InitEditUserArchivesData);

    if (UserArchivesModalRole === "Student") {
      // dispatch(
      //   checkMajor({
      //     value: MajorID,
      //     error: () => {
      //       MajorIDError = true;
      //     },
      //   })
      // );
      dispatch(
        checkGrade({
          value: GradeID,
          error: () => {
            GradeIDError = true;
          },
        })
      );
      dispatch(
        checkClass({
          value: ClassID,
          error: () => {
            ClassIDError = true;
          },
        })
      );

      if (
        TelephoneError ||
        UserNameError ||
        UserIDError ||
        GenderError ||
        // CollegeIDError ||
        IDCardNoError ||
        EmailError ||
        // MajorIDError ||
        GradeIDError ||
        ClassIDError ||
        HomeAddressError
      ) {
        error();
      } else if (isRepeat) {
        repeatError();
      } else {
        success();
      }
    }
    if (UserArchivesModalRole === "Teacher") {
      // dispatch(
      //   checkGroup({
      //     value: GroupID,
      //     error: () => {
      //       GroupIDError = true;
      //     },
      //   })
      // );
      dispatch(
        checkTitle({
          value: TitleID,
          error: () => {
            TitleIDError = true;
          },
        })
      );
      if (!ProductType_6) {
        dispatch(
          checkSubjectID({
            value: SubjectIDs,
            error: () => {
              SubjectTipsVisible = true;
            },
          })
        );
      }

      if (
        TelephoneError ||
        UserNameError ||
        GenderError ||
        // CollegeIDError ||
        TitleIDError ||
        IDCardNoError ||
        // GroupIDError ||
        EmailError ||
        SubjectTipsVisible ||
        HomeAddressError
      ) {
        error();
      } else if (isRepeat) {
        repeatError();
      } else {
        success();
      }
    }
    if (UserArchivesModalRole === "Leader") {
      dispatch(
        checkPosition({
          value: Position,
          error: () => {
            PositionError = true;
          },
        })
      );

      if (
        TelephoneError ||
        UserNameError ||
        GenderError ||
        CollegeIDError ||
        PositionError ||
        EmailError ||
        IDCardNoError ||
        HomeAddressError
      ) {
        error();
      } else if (isRepeat) {
        repeatError();
      } else {
        success();
      }
    }

    fn();
  };
};
export default {
  checkGroupName,
  checkClassName,
  checkMajorName,
  checkSubjectID,
  checkUserArchive,
  checkPosition,
  checkTitle,
  checkClass,
  checkGrade,
  checkMajor,
  checkGroup,
  checkCollege,
  checkGender,
  checkUserName,
  checkUserID,
  checkDiscription,
  checkTelephone,
  checkIDCardNo,
  checkEmail,
  checkHomeAddress,
  checkGraduateContact,
};
