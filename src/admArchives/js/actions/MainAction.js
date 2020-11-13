import { postData, getData } from "../../../common/js/fetch";
import CommonAction from "./CommonAction";
import CONFIG from "../../../common/js/config";
import "whatwg-fetch";
import actions from "./index";
import Public from "../../../common/js/public";
import PublicAction from "./PublicAction";

const { BasicProxy, UserInfoProxy, ClassProxy } = CONFIG;
//获取子系统的服务器地址信息
let MAIN_GET_SUB_SYSTEMS_MAIN_SERVER = "MAIN_GET_SUB_SYSTEMS_MAIN_SERVER";
const GetSubSystemsMainServerBySubjectID = ({ fn = () => {} }) => {
  return (dispatch, getState) => {
    let url =
      "/BaseApi/Global/GetSubSystemsMainServerBySubjectID?appid=000&access_token=4d39af1bff534514e24948568b750f6c&sysIDs=E27&subjectID=";
    getData(BasicProxy + url, 2)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          dispatch({ type: MAIN_GET_SUB_SYSTEMS_MAIN_SERVER, data: json.Data });
        }
        fn(getState());
      });
  };
};
// 获取总览信息
const MAIN_GET_SUMMARY_DATA = "MAIN_GET_SUMMARY_DATA";
// 获取学校总览--大学
const GetSchoolSummary = ({ fn = () => {}, schoolID }) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.ContentLoadingOpen());

    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = State;
    if (schoolID === undefined) {
      schoolID = SchoolID;
    }

    getSchoolSummary({
      schoolID,
    }).then((res) => {
      if (res) {
        let Data = {};
        let {
          Total,
          Student,
          Teacher,
          SchoolLeader: Leader,
          Grades,
          Subjects,
          GradeStudent: StudentAcount,
          SubjectTeacher: TeacherAcount,
          GradeStudent,
          SubjectTeacher,
        } = res.Data;
        let StudentList = [];
        let TeacherList = [];
        Grades instanceof Array &&
          Grades.forEach((child, index) => {
            StudentList.push({
              value: child.GradeID,
              title: child.GradeName,
              acount: GradeStudent[index],
            });
          });
        Subjects instanceof Array &&
          Subjects.forEach((child, index) => {
            TeacherList.push({
              value: child.SubjectID,
              title: child.SubjectName,
              acount: SubjectTeacher[index],
            });
          });
        dispatch({
          type: MAIN_GET_SUMMARY_DATA,
          data: {
            ...res.Data,
            Leader,
            StudentList,
            TeacherList,
            StudentAcount,
            TeacherAcount,
          },
        });
        fn(getState());
        dispatch(PublicAction.ContentLoadingClose());
      }
    });
  };
};
const getSchoolSummary = async ({ schoolID = "" }) => {
  let url = UserInfoProxy + "/GetSummary?schoolID=" + schoolID;
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 获取学院总览--大学
const GetCollegeSummary = ({ fn = () => {}, collegeID }) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.ContentLoadingOpen());
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID, CollegeID },
      },
    } = State;
    if (collegeID === undefined) {
      collegeID = CollegeID;
    }

    getCollegeSummary({
      collegeID,
    }).then((res) => {
      if (res) {
        let Data = {};
        let {
          Total,
          Student,
          Teacher,
          CollegeLeader: Leader,
          Majors,
          Groups,
          MajorStudent: StudentAcount,
          GroupTeacher: TeacherAcount,
          MajorStudent,
          GroupTeacher,
        } = res.Data;
        let StudentList = [];
        let TeacherList = [];
        Majors instanceof Array &&
          Majors.forEach((child, index) => {
            StudentList.push({
              value: child.MajorID,
              title: child.MajorName,
              acount: MajorStudent[index],
            });
          });
        Groups instanceof Array &&
          Groups.forEach((child, index) => {
            TeacherList.push({
              value: child.GroupID,
              title: child.GroupName,
              acount: GroupTeacher[index],
            });
          });
        dispatch({
          type: MAIN_GET_SUMMARY_DATA,
          data: {
            ...res.Data,
            Leader,
            StudentList,
            TeacherList,
            StudentAcount,
            TeacherAcount,
          },
        });
        fn(getState());
        dispatch(PublicAction.ContentLoadingClose());
      }
    });
  };
};
const getCollegeSummary = async ({ collegeID = "" }) => {
  let url = UserInfoProxy + "/GetCollegeSummary?collegeID=" + collegeID;
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 获取学院、专业、年级、班级信息（用于构建下拉列表）
const MAIN_GET_TREE_DATA = "MAIN_GET_TREE_DATA";

const GetTree = ({ fn = () => {}, isLoading = true, collegeID, schoolID }) => {
  return (dispatch, getState) => {
    if (isLoading) {
      dispatch(PublicAction.ContentLoadingOpen());
    }
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID, CollegeID },
      },
      DataState: {
        CommonData: {
          RolePower: { IsCollege, IsLeader },
        },
      },
    } = State;
    if (IsCollege) {
      if (collegeID === undefined) {
        collegeID = CollegeID;
      }
    } else {
      collegeID = "";
    }
    if (schoolID === undefined) {
      schoolID = SchoolID;
    }

    getTree({
      collegeID,
      schoolID,
    }).then((res) => {
      if (res) {
        let CollegeList = [];
        let MajorList = [];
        let GradeList = [];
        let ClassList = [];
        res.Data &&
          res.Data.Grades instanceof Array &&
          res.Data.Grades.forEach((grade) => {
            let { GradeID, GradeName, Classes } = grade;
            GradeList.push({ value: GradeID, title: GradeName });
            Classes instanceof Array &&
              Classes.forEach((Class) => {
                let { ClassID, ClassName } = Class;
                ClassList.push({
                  value: ClassID,
                  title: ClassName,
                  GradeID,
                  GradeName,
                });
              });
          });

        dispatch({
          type: MAIN_GET_TREE_DATA,
          data: {
            GradeList,
            ClassList,
          },
        });
        fn(getState());
        dispatch(PublicAction.ContentLoadingClose());
      }
    });
  };
};
const getTree = async ({ collegeID = "", schoolID = "" }) => {
  let url = UserInfoProxy + "/GetGradeClassTree?schoolID=" + schoolID;
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 分页获取学生
const MAIN_GET_STUDENT_TO_PAGE = "MAIN_GET_STUDENT_TO_PAGE";

const GetStudentToPage = ({
  fn = () => {},
  collegeID,
  schoolID,
  majorID,
  gradeID,
  classID,
  keyword,
  pageIndex,
  pageSize,
  sortFiled,
  sortType,
}) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.TableLoadingOpen());
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID, CollegeID },
      },
      DataState: {
        CommonData: { StudentParams },
      },
    } = State;

    if (schoolID === undefined) {
      schoolID = SchoolID;
    }
    if (collegeID === undefined) {
      collegeID = StudentParams.collegeID;
    }
    if (majorID === undefined) {
      majorID = StudentParams.majorID;
    }
    if (gradeID === undefined) {
      gradeID = StudentParams.gradeID;
    }
    if (classID === undefined) {
      classID = StudentParams.classID;
    }
    if (keyword === undefined) {
      keyword = StudentParams.keyword;
    }
    if (pageIndex === undefined) {
      pageIndex = StudentParams.pageIndex;
    }
    if (pageSize === undefined) {
      pageSize = StudentParams.pageSize;
    }
    if (sortFiled === undefined) {
      sortFiled = StudentParams.sortFiled;
    }
    if (sortType === undefined) {
      sortType = StudentParams.sortType;
    }

    getStudentToPage({
      collegeID,
      schoolID,
      majorID,
      gradeID,
      classID,
      keyword,
      pageIndex,
      pageSize,
      sortFiled,
      sortType,
    }).then((res) => {
      if (res) {
        let List = [];
        res.Data &&
          res.Data.List instanceof Array &&
          res.Data.List.forEach((child, index) => {
            List.push({
              key: index,
              OrderNo:
                pageSize * res.Data.PageIndex + index + 1 >= 10
                  ? pageSize * res.Data.PageIndex + index + 1
                  : "0" + (pageSize * res.Data.PageIndex + index + 1),
              ...child,
            });
          });
        dispatch({
          type: MAIN_GET_STUDENT_TO_PAGE,
          data: { ...res.Data, List },
        });
        fn(getState());
        dispatch(PublicAction.TableLoadingClose());
      }
    });
  };
};
const getStudentToPage = async ({
  collegeID = "",
  schoolID = "",
  majorID = "",
  gradeID = "",
  classID = "",
  keyword = "",
  pageIndex = "",
  pageSize = "",
  sortFiled = "",
  sortType = "",
}) => {
  let url =
    UserInfoProxy +
    "/GetStudentToPage?schoolID=" +
    schoolID +
    (collegeID !== "" ? "&collegeID=" + collegeID : "") +
    (gradeID !== "" ? "&gradeID=" + gradeID : "") +
    (classID !== "" ? "&classID=" + classID : "") +
    (keyword !== "" ? "&keyword=" + keyword : "") +
    "&pageIndex=" +
    pageIndex +
    "&pageSize=" +
    pageSize +
    (sortFiled !== "" ? "&sortFiled=" + sortFiled : "") +
    (sortType !== "" ? "&sortType=" + sortType : "") +
    (majorID !== "" ? "&majorID=" + majorID : "");
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 分页获取教师
const MAIN_GET_TEACHER_TO_PAGE = "MAIN_GET_TEACHER_TO_PAGE";

const GetTeacherToPage = ({
  fn = () => {},
  collegeID,
  schoolID,
  groupID,
  subjectID,
  keyword,
  pageIndex,
  pageSize,
  sortFiled,
  sortType,
}) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.TableLoadingOpen());
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID, CollegeID },
      },
      DataState: {
        CommonData: { TeacherParams },
      },
    } = State;

    if (schoolID === undefined) {
      schoolID = SchoolID;
    }
    if (collegeID === undefined) {
      collegeID = TeacherParams.collegeID;
    }
    if (groupID === undefined) {
      groupID = TeacherParams.groupID;
    }

    if (keyword === undefined) {
      keyword = TeacherParams.keyword;
    }
    if (pageIndex === undefined) {
      pageIndex = TeacherParams.pageIndex;
    }
    if (pageSize === undefined) {
      pageSize = TeacherParams.pageSize;
    }
    if (sortFiled === undefined) {
      sortFiled = TeacherParams.sortFiled;
    }
    if (sortType === undefined) {
      sortType = TeacherParams.sortType;
    }
    if (subjectID === undefined) {
      subjectID = TeacherParams.subjectID;
    }
    getTeacherToPage({
      collegeID,
      schoolID,
      groupID,
      subjectID,
      keyword,
      pageIndex,
      pageSize,
      sortFiled,
      sortType,
    }).then((res) => {
      if (res) {
        let List = [];
        res.Data &&
          res.Data.List instanceof Array &&
          res.Data.List.forEach((child, index) => {
            List.push({
              key: index,
              OrderNo:
                pageSize * res.Data.PageIndex + index + 1 >= 10
                  ? pageSize * res.Data.PageIndex + index + 1
                  : "0" + (pageSize * res.Data.PageIndex + index + 1),
              ...child,
            });
          });
        dispatch({
          type: MAIN_GET_TEACHER_TO_PAGE,
          data: { ...res.Data, List },
        });
        fn(getState());
        dispatch(PublicAction.TableLoadingClose());
      }
    });
  };
};
const getTeacherToPage = async ({
  collegeID = "",
  schoolID = "",
  groupID = "",
  subjectID = "",
  keyword = "",
  pageIndex = "",
  pageSize = "",
  sortFiled = "",
  sortType = "",
}) => {
  let url =
    UserInfoProxy +
    "/GetTeacherToPage?schoolID=" +
    schoolID +
    // (collegeID !== "" ? "&collegeID=" + collegeID : "") +
    (keyword !== "" ? "&keyword=" + keyword : "") +
    "&pageIndex=" +
    pageIndex +
    "&pageSize=" +
    pageSize +
    (sortFiled !== "" ? "&sortFiled=" + sortFiled : "") +
    (sortType !== "" ? "&sortType=" + sortType : "") +
    (subjectID !== "" ? "&subjectID=" + subjectID : "");
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 分页获取领导
const MAIN_GET_LEADER_TO_PAGE = "MAIN_GET_LEADER_TO_PAGE";

const GetLeaderToPage = ({
  fn = () => {},
  collegeID,
  schoolID,
  userType,
  keyword,
  pageIndex,
  pageSize,
  sortFiled,
  sortType,
}) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.TableLoadingOpen());
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID, CollegeID },
      },
      DataState: {
        CommonData: { LeaderParams },
      },
    } = State;

    if (schoolID === undefined) {
      schoolID = SchoolID;
    }
    if (collegeID === undefined) {
      collegeID = LeaderParams.collegeID;
    }
    if (userType === undefined) {
      userType = LeaderParams.userType; //usertype==7为学校领导
      //usertype==10为学院领导
    }

    if (keyword === undefined) {
      keyword = LeaderParams.keyword;
    }
    if (pageIndex === undefined) {
      pageIndex = LeaderParams.pageIndex;
    }
    if (pageSize === undefined) {
      pageSize = LeaderParams.pageSize;
    }
    if (sortFiled === undefined) {
      sortFiled = LeaderParams.sortFiled;
    }
    if (sortType === undefined) {
      sortType = LeaderParams.sortType;
    }

    getLeaderToPage({
      collegeID,
      schoolID,
      userType,

      keyword,
      pageIndex,
      pageSize,
      sortFiled,
      sortType,
    }).then((res) => {
      if (res) {
        let List = [];
        res.Data &&
          res.Data.List instanceof Array &&
          res.Data.List.forEach((child, index) => {
            List.push({
              DetailsData: {
                userName: child.UserName,
                userImg: child.PhotoPath_NoCache || child.PhotoPath,
                Gende: child.Gender,
                userText: child.Sign,
                userID: child.UserID,
                userIDCard: child.IDCardNo,
                userPhone: child.Telephone,
                userMail: child.Email,
                userCollege: child.CollegeName,
                userAddress: child.HomeAddress,
                //   CollegeName: child.HomeAddress,
                Position: child.Position,
              },
              key: index,
              OrderNo: index + 1 >= 10 ? index + 1 : "0" + (index + 1),
              ...child,
            });
          });
        dispatch({
          type: MAIN_GET_LEADER_TO_PAGE,
          data: { ...res.Data, List },
        });
        fn(getState());
        dispatch(PublicAction.TableLoadingClose());
      }
    });
  };
};
const getLeaderToPage = async ({
  collegeID = "",
  schoolID = "",
  userType = "",

  keyword = "",
  pageIndex = "",
  pageSize = "",
  sortFiled = "",
  sortType = "",
}) => {
  let url =
    UserInfoProxy +
    "/GetSchoolLeader?schoolID=" +
    schoolID +
    (collegeID !== "" ? "&collegeID=" + collegeID : "") +
    (keyword !== "" ? "&keyword=" + keyword : "") +
    // "&pageIndex=" +
    // pageIndex +
    // "&pageSize=" +
    // pageSize +
    (sortFiled !== "" ? "&sortFiled=" + sortFiled : "") +
    (sortType !== "" ? "&sortType=" + sortType : "") +
    (userType !== "" ? "&userType=" + userType : 7);
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 分页获取毕业生
const MAIN_GET_GRADUATE_TO_PAGE = "MAIN_GET_GRADUATE_TO_PAGE";

const GetGraduateToPage = ({
  fn = () => {},
  collegeID,
  schoolID,
  majorID,
  gradeID,
  classID,
  keyword,
  pageIndex,
  pageSize,
  sortFiled,
  sortType,
}) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.TableLoadingOpen());
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID, CollegeID },
      },
      DataState: {
        CommonData: { GraduateParams },
      },
    } = State;

    if (schoolID === undefined) {
      schoolID = SchoolID;
    }
    if (collegeID === undefined) {
      collegeID = GraduateParams.collegeID;
    }
    if (majorID === undefined) {
      majorID = GraduateParams.majorID;
    }
    if (gradeID === undefined) {
      gradeID = GraduateParams.gradeID;
    }
    if (classID === undefined) {
      classID = GraduateParams.classID;
    }
    if (keyword === undefined) {
      keyword = GraduateParams.keyword;
    }
    if (pageIndex === undefined) {
      pageIndex = GraduateParams.pageIndex;
    }
    if (pageSize === undefined) {
      pageSize = GraduateParams.pageSize;
    }
    if (sortFiled === undefined) {
      sortFiled = GraduateParams.sortFiled;
    }
    if (sortType === undefined) {
      sortType = GraduateParams.sortType;
    }

    getGraduateToPage({
      collegeID,
      schoolID,
      majorID,
      gradeID,
      classID,
      keyword,
      pageIndex,
      pageSize,
      sortFiled,
      sortType,
    }).then((res) => {
      if (res) {
        let List = [];
        res.Data &&
          res.Data.List instanceof Array &&
          res.Data.List.forEach((child, index) => {
            List.push({
              DetailsData: {
                userName: child.UserName,
                userImg: child.PhotoPath_NoCache || child.PhotoPath,
                Gende: child.Gender,
                userID: child.UserID,
                jobType: child.JobType,
                hasTrack: child.HasTrack,
                discription: child.Discription,
                year: child.Year,
                userClass: child.ClassName,
                userIDCard: child.IDCardNo,
                userPhone: child.Telephone,
                userMail: child.Email,
                className: child.ClassName,
                userAddress: child.HomeAddress,
              },
              key: index,
              OrderNo:
                pageSize * res.Data.PageIndex + index + 1 >= 10
                  ? pageSize * res.Data.PageIndex + index + 1
                  : "0" + (pageSize * res.Data.PageIndex + index + 1),
              ...child,
            });
          });
        dispatch({
          type: MAIN_GET_GRADUATE_TO_PAGE,
          data: { ...res.Data, List },
        });
        fn(getState());
        dispatch(PublicAction.TableLoadingClose());
      }
    });
  };
};
const getGraduateToPage = async ({
  collegeID = "",
  schoolID = "",
  majorID = "",
  gradeID = "",
  classID = "",
  keyword = "",
  pageIndex = "",
  pageSize = "",
  sortFiled = "",
  sortType = "",
}) => {
  let url =
    UserInfoProxy +
    "/GetGraduate?schoolID=" +
    schoolID +
    (collegeID !== "" ? "&collegeID=" + collegeID : "") +
    (gradeID !== "" ? "&gradeID=" + gradeID : "") +
    (classID !== "" ? "&classID=" + classID : "") +
    (keyword !== "" ? "&keyword=" + keyword : "") +
    "&pageIndex=" +
    pageIndex +
    "&pageSize=" +
    pageSize +
    (sortFiled !== "" ? "&sortFiled=" + sortFiled : "") +
    (sortType !== "" ? "&sortType=" + sortType : "") +
    (majorID !== "" ? "&majorID=" + majorID : "");
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 获取教师档案-获取学院、教研室信息
const MAIN_GET_TEACHER_TREE_DATA = "MAIN_GET_TEACHER_TREE_DATA";

const GetTeacherTree = ({
  fn = () => {},
  isLoading = true,
  collegeID,
  schoolID,
}) => {
  return (dispatch, getState) => {
    if (isLoading) {
      dispatch(PublicAction.ContentLoadingOpen());
    }
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID, CollegeID },
      },
      DataState: {
        CommonData: {
          RolePower: { IsCollege, IsLeader },
        },
      },
    } = State;
    if (IsCollege) {
      if (collegeID === undefined) {
        collegeID = CollegeID;
      }
    } else {
      collegeID = "";
    }
    if (schoolID === undefined) {
      schoolID = SchoolID;
    }

    getTeacherTree({
      collegeID,
      schoolID,
    }).then((res) => {
      if (res) {
        let CollegeList = [];
        let GroupList = [];

        res.Data instanceof Array &&
          res.Data.forEach((college) => {
            let { CollegeID, CollegeName } = college;
            CollegeList.push({ value: CollegeID, title: CollegeName });
            college.GroupList instanceof Array &&
              college.GroupList.forEach((group) => {
                let { GroupID, GroupName, IsUngroup } = group;
                GroupList.push({
                  value: GroupID,
                  title: GroupName,
                  CollegeID,
                  CollegeName,
                  IsUngroup: IsUngroup,
                });
              });
          });

        dispatch({
          type: MAIN_GET_TEACHER_TREE_DATA,
          data: {
            CollegeList,
            GroupList,
          },
        });
        fn(getState());
        dispatch(PublicAction.ContentLoadingClose());
      }
    });
  };
};

const getTeacherTree = async ({ collegeID = "", schoolID = "" }) => {
  let url =
    UserInfoProxy +
    "/GetCollegeGroup?collegeID=" +
    collegeID +
    "&schoolID=" +
    schoolID;
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 获取对象的修改历史
const MAIN_GET_USER_LOG_DATA = "MAIN_GET_USER_LOG_DATA";
// 获取对象的修改历史
const GetUserLog = ({ fn = () => {}, innerID }) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.ModalLoadingOpen());

    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = State;
    // if (innerID === undefined) {
    //   innerID = SchoolID;
    // }

    getUserLog({
      innerID,
    }).then((res) => {
      if (res) {
        dispatch({
          type: MAIN_GET_USER_LOG_DATA,
          data: res.Data,
        });
        fn(getState());
        dispatch(PublicAction.ModalLoadingClose());
      }
    });
  };
};
const getUserLog = async ({ innerID = "" }) => {
  let url = UserInfoProxy + "/GetUserLog?innerID=" + innerID;
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 删除学生
const DeleteStudent = ({ fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/DeleteStudent";
    let {
      DataState: {
        CommonData: {
          StudentParams: { checkedList },
        },
        MainData: {
          StudentData: { List },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();
    let UserIDs = [];
    List.forEach((child, index) => {
      if (checkedList.includes(child.key)) {
        UserIDs.push(child.UserID);
      }
    });
    postData(
      UserInfoProxy + url,
      {
        SchoolID,
        UserIDs: UserIDs.join(","),
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn();
        }
        dispatch(GetUnreadLogCount({}));
      });
  };
};
// 删除教师
const DeleteTeacher = ({ fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/DeleteTeacher";
    let {
      DataState: {
        CommonData: {
          TeacherParams: { checkedList },
        },
        MainData: {
          TeacherData: { List },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();
    let UserIDs = [];
    List.forEach((child, index) => {
      if (checkedList.includes(child.key)) {
        UserIDs.push(child.UserID);
      }
    });
    postData(
      UserInfoProxy + url,
      {
        SchoolID,
        UserIDs: UserIDs.join(","),
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn();
        }
        dispatch(GetUnreadLogCount({}));
      });
  };
};
// 删除领导
const DeleteLeader = ({ fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/DeleteSchoolLeader";
    let {
      DataState: {
        CommonData: {
          LeaderParams: { checkedList },
        },
        MainData: {
          LeaderData: { List },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();
    let UserIDs = [];
    List.forEach((child, index) => {
      if (checkedList.includes(child.key)) {
        UserIDs.push(child.UserID);
      }
    });
    postData(
      UserInfoProxy + url,
      {
        SchoolID,
        UserIDs: UserIDs.join(","),
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn();
        }
        dispatch(GetUnreadLogCount({}));
      });
  };
};
// 获取学院、专业、年级、班级信息（用于构建下拉列表）
const MAIN_GET_GRADUATE_TREE_DATA = "MAIN_GET_GRADUATE_TREE_DATA";

const GetGraduateTree = ({ fn = () => {}, collegeID, schoolID }) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.ContentLoadingOpen());
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID, CollegeID },
      },
      DataState: {
        CommonData: {
          RolePower: { IsCollege, IsLeader },
        },
      },
    } = State;
    if (IsCollege) {
      if (collegeID === undefined) {
        collegeID = CollegeID;
      }
    } else {
      collegeID = "";
    }
    if (schoolID === undefined) {
      schoolID = SchoolID;
    }

    getGraduateTree({
      collegeID,
      schoolID,
    }).then((res) => {
      if (res) {
        let CollegeList = [];
        let MajorList = [];
        let GradeList = [];
        let ClassList = [];
        res.Data &&
          res.Data.Grades instanceof Array &&
          res.Data.Grades.forEach((grade) => {
            let { GradeID, GradeName, Classes } = grade;
            GradeList.push({ value: GradeID, title: GradeName });
            Classes instanceof Array &&
              Classes.forEach((Class) => {
                let { ClassID, ClassName } = Class;
                ClassList.push({
                  value: ClassID,
                  title: ClassName,
                  GradeID,
                  GradeName,
                });
              });
          });

        dispatch({
          type: MAIN_GET_GRADUATE_TREE_DATA,
          data: {
            CollegeList,
            MajorList,
            GradeList,
            ClassList,
          },
        });
        fn(getState());
        dispatch(PublicAction.ContentLoadingClose());
      }
    });
  };
};
const getGraduateTree = async ({ collegeID = "", schoolID = "" }) => {
  let url = UserInfoProxy + "/GetGradeClassOfGraduate?schoolID=" + schoolID;
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};

// 编辑毕业生联系信息

const EditGraduateContact = ({ fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/EditGraduateContact";
    let {
      DataState: {
        CommonData: {
          GraduateEditParams: { Telephone, Email, HomeAddress, UserID },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();

    postData(
      UserInfoProxy + url,
      {
        Telephone: Telephone.trim(),
        Email: Email.trim(),
        HomeAddress: HomeAddress.trim(),
        UserID,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn();
        }
        dispatch(GetUnreadLogCount({}));
      });
  };
};

// 编辑毕业生去向信息

const EditGraduateTrack = ({ fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/EditGraduateTrack";
    let {
      DataState: {
        CommonData: {
          GraduateEditParams: { JobType, Discription, HomeAddress, UserID },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();

    postData(
      UserInfoProxy + url,
      {
        JobType: JobType.trim(),
        Discription: Discription.trim(),
        UserID,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn();
        }
        dispatch(GetUnreadLogCount({}));
      });
  };
};
// 获取教师职称
const MAIN_GET_TITLE_TREE_DATA = "MAIN_GET_TITLE_TREE_DATA";

const GetTitle = ({ fn = () => {}, isLoading = true, collegeID, schoolID }) => {
  return (dispatch, getState) => {
    // if (isLoading) {
    //   dispatch(PublicAction.ContentLoadingOpen());
    // }
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID, CollegeID },
      },
      DataState: {
        CommonData: {
          RolePower: { IsCollege, IsLeader },
        },
      },
    } = State;

    if (schoolID === undefined) {
      schoolID = SchoolID;
    }

    getTitle({
      schoolID,
    }).then((res) => {
      if (res) {
        let TitleList = [];

        res.Data instanceof Array &&
          res.Data.forEach((title) => {
            let { TitleID, TitleName } = title;
            TitleList.push({ value: TitleID, title: TitleName });
          });

        dispatch({
          type: MAIN_GET_TITLE_TREE_DATA,
          data: TitleList,
        });
        fn(getState());
        // dispatch(PublicAction.ContentLoadingClose());
      }
    });
  };
};
const getTitle = async ({ collegeID = "", schoolID = "" }) => {
  let url = UserInfoProxy + "/GetTitle?schoolID=" + schoolID;
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};

// 添加学生

const AddStudent = ({ fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/AddStudent";
    let {
      DataState: {
        CommonData: {
          EditUserArchivesData: {
            UserID,
            UserName,
            ImgPath,
            Gender,
            ClassID,
            IDCardNo,
            Telephone,
            Email,
            HomeAddress,
          },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();

    postData(
      UserInfoProxy + url,
      {
        UserID: UserID.trim(),
        UserName: UserName.trim(),
        PhotoPath: ImgPath,
        Gender,
        classID: ClassID,
        IDCardNo: IDCardNo.trim(),
        Telephone: Telephone.trim(),
        Email: Email.trim(),
        HomeAddress: HomeAddress.trim(),
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn();
        }
        dispatch(GetUnreadLogCount({}));
      });
  };
};
// 编辑学生

const EditStudent = ({ fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/EditStudent";
    let {
      DataState: {
        CommonData: {
          EditUserArchivesData: {
            UserID,
            UserName,
            ImgPath,
            Gender,
            ClassID,
            IDCardNo,
            Telephone,
            Email,
            HomeAddress,
            PhotoEdit,
          },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();

    postData(
      UserInfoProxy + url,
      {
        UserID,
        UserName: UserName.trim(),
        PhotoPath: ImgPath,
        Gender,
        classID: ClassID,
        IDCardNo: IDCardNo.trim(),
        Telephone: Telephone.trim(),
        Email: Email.trim(),
        HomeAddress: HomeAddress.trim(),
        PhotoEdit,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn();
        }
        dispatch(GetUnreadLogCount({}));
      });
  };
};
// 添加教师

const AddTeacher = ({ fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/AddTeacher";
    let {
      DataState: {
        CommonData: {
          EditUserArchivesData: {
            UserID,
            UserName,
            ImgPath,
            Gender,
            CollegeID,
            GroupID,
            IDCardNo,
            TitleID,
            Telephone,
            Email,
            SubjectIDs,
            HomeAddress,
          },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();

    postData(
      UserInfoProxy + url,
      {
        UserID: UserID.trim(),
        UserName: UserName.trim(),
        CollegeID,
        PhotoPath: ImgPath,
        Gender,
        GroupID,
        TitleID,
        SubjectIDs: SubjectIDs.join(","),

        IDCardNo: IDCardNo.trim(),
        Telephone: Telephone.trim(),
        Email: Email.trim(),
        HomeAddress: HomeAddress.trim(),
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn();
        }
        dispatch(GetUnreadLogCount({}));
      });
  };
};
// 编辑教师

const EditTeacher = ({ fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/EditTeacher";
    let {
      DataState: {
        CommonData: {
          EditUserArchivesData: {
            UserID,
            UserName,
            ImgPath,
            Gender,
            CollegeID,
            GroupID,
            IDCardNo,
            Telephone,
            TitleID,
            Email,
            SubjectIDs,
            HomeAddress,
            PhotoEdit,
          },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();

    postData(
      UserInfoProxy + url,
      {
        UserID,
        UserName: UserName.trim(),
        CollegeID,
        PhotoPath: ImgPath,
        Gender,
        GroupID,
        TitleID,
        SubjectIDs: SubjectIDs.join(","),

        IDCardNo: IDCardNo.trim(),
        Telephone: Telephone.trim(),
        Email: Email.trim(),
        HomeAddress: HomeAddress.trim(),
        PhotoEdit,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn();
        }
        dispatch(GetUnreadLogCount({}));
      });
  };
};
// 添加领导

const AddSchoolLeader = ({ fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/AddSchoolLeader";
    let {
      DataState: {
        CommonData: {
          EditUserArchivesData: {
            UserID,
            UserName,
            ImgPath,
            Gender,
            Position,
            UserType,
            CollegeID,
            IDCardNo,
            Telephone,
            Email,
            HomeAddress,
          },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();

    postData(
      UserInfoProxy + url,
      {
        UserID: UserID.trim(),
        Position,
        UserType,
        UserName: UserName.trim(),
        CollegeID,
        PhotoPath: ImgPath,
        Gender,
        IDCardNo: IDCardNo.trim(),
        Telephone: Telephone.trim(),
        Email: Email.trim(),
        HomeAddress: HomeAddress.trim(),
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn();
        }
        dispatch(GetUnreadLogCount({}));
      });
  };
};
// 编辑领导

const EditSchoolLeader = ({ fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    let url = "/EditSchoolLeader";
    let {
      DataState: {
        CommonData: {
          EditUserArchivesData: {
            UserID,
            UserName,
            ImgPath,
            Gender,
            Position,
            UserType,
            CollegeID,
            IDCardNo,
            Telephone,
            Email,
            HomeAddress,
            PhotoEdit,
          },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();

    postData(
      UserInfoProxy + url,
      {
        UserID,
        Position,
        UserType,
        UserName: UserName.trim(),
        CollegeID,
        PhotoPath: ImgPath,
        Gender,
        IDCardNo: IDCardNo.trim(),
        Telephone: Telephone.trim(),
        Email: Email.trim(),
        HomeAddress: HomeAddress.trim(),
        PhotoEdit,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn();
        }
        dispatch(GetUnreadLogCount({}));
      });
  };
};

// 获取学科
const MAIN_GET_SUBJECT_DATA = "MAIN_GET_SUBJECT_DATA";

const GetSubject = ({
  fn = () => {},
  isLoading = true,
  collegeID,
  schoolID,
}) => {
  return (dispatch, getState) => {
    // if (isLoading) {
    //   dispatch(PublicAction.ContentLoadingOpen());
    // }
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID, CollegeID },
      },
      DataState: {
        CommonData: {
          RolePower: { IsCollege, IsLeader },
        },
      },
    } = State;

    if (schoolID === undefined) {
      schoolID = SchoolID;
    }

    getSubject({
      schoolID,
    }).then((res) => {
      if (res) {
        let SubjectList = [];

        res.Data instanceof Array &&
          res.Data.forEach((subject) => {
            let { SubjectID, SubjectName } = subject;
            if (SubjectID === "all") {
              return; //排除全部
            }
            SubjectList.push({ value: SubjectID, title: SubjectName });
          });

        dispatch({
          type: MAIN_GET_SUBJECT_DATA,
          data: SubjectList,
        });
        fn(getState());
        // dispatch(PublicAction.ContentLoadingClose());
      }
    });
  };
};
const getSubject = async ({ collegeID = "", schoolID = "" }) => {
  let url = UserInfoProxy + "/GetSubject?schoolID=" + schoolID;
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 删除专业

const DeleteMajor = ({ data, fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    dispatch(PublicAction.ModalLoadingOpen());

    let url = "/DeleteMajor";
    let {
      DataState: {
        CommonData: {
          MajorEditParams: { MajorID },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();
    if (data === undefined) {
      data = MajorID;
    }
    postData(
      ClassProxy + url,
      {
        MajorID: data,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn();
        }
        dispatch(PublicAction.ModalLoadingClose());
      });
  };
};

// 添加专业

const AddMajor = ({ CollegeID, majorName, fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    dispatch(PublicAction.ModalLoadingOpen());

    let url = "/AddMajor";
    let {
      DataState: {
        CommonData: {
          MajorEditParams: { MajorID, MajorName, HandleMajorCollegeID },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();
    if (CollegeID === undefined) {
      CollegeID = HandleMajorCollegeID;
    }
    if (majorName === undefined) {
      majorName = MajorName;
    }
    postData(
      ClassProxy + url,
      {
        CollegeID: CollegeID,
        MajorName: majorName,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn();
        }
        dispatch(PublicAction.ModalLoadingClose());
      });
  };
};
// 编辑专业

const EditMajor = ({ CollegeID, majorName, majorID, fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    dispatch(PublicAction.ModalLoadingOpen());

    let url = "/EditMajor";
    let {
      DataState: {
        CommonData: {
          MajorEditParams: { MajorID, MajorName, HandleMajorCollegeID },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();
    if (CollegeID === undefined) {
      CollegeID = HandleMajorCollegeID;
    }
    if (majorName === undefined) {
      majorName = MajorName;
    }
    if (majorID === undefined) {
      majorID = MajorID;
    }
    postData(
      ClassProxy + url,
      {
        CollegeID: CollegeID,
        MajorName: majorName,
        MajorID: majorID,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn();
        }
        dispatch(PublicAction.ModalLoadingClose());
      });
  };
};
// 添加班级

const AddClass = ({ MajorID, GradeID, ClassName, fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    dispatch(PublicAction.ModalLoadingOpen());

    let url = "/AddClass";
    let {
      DataState: {
        CommonData: {
          EditUserArchivesData,
          // : { MajorID, GradeID }
          UserArchivesParams: { AddClassName },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();
    if (MajorID === undefined) {
      MajorID = EditUserArchivesData.MajorID;
    }
    if (GradeID === undefined) {
      GradeID = EditUserArchivesData.GradeID;
    }
    if (ClassName === undefined) {
      ClassName = AddClassName;
    }
    postData(
      ClassProxy + url,
      {
        MajorID: MajorID,
        ClassName: ClassName,
        GradeID: GradeID,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn();
        }
        dispatch(PublicAction.ModalLoadingClose());
      });
  };
};

// 删除教研室

const DeleteGroup = ({ GroupID, CollegeID, fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    dispatch(PublicAction.ModalLoadingOpen());

    let url = "/DeleteGroup";
    let {
      DataState: {
        CommonData: { GroupEditParams },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();
    if (GroupID === undefined) {
      GroupID = GroupEditParams.GroupID;
    }
    if (CollegeID === undefined) {
      CollegeID = GroupEditParams.CollegeID;
    }
    postData(
      UserInfoProxy + url,
      {
        GroupID,
        CollegeID,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn();
        }
        dispatch(PublicAction.ModalLoadingClose());
      });
  };
};

// 添加教研室

const AddGroup = ({ CollegeID, majorName, fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    dispatch(PublicAction.ModalLoadingOpen());

    let url = "/AddGroup";
    let {
      DataState: {
        CommonData: {
          GroupEditParams: { GroupID, GroupName, HandleGroupCollegeID },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();
    if (CollegeID === undefined) {
      CollegeID = HandleGroupCollegeID;
    }
    if (majorName === undefined) {
      majorName = GroupName;
    }
    postData(
      UserInfoProxy + url,
      {
        CollegeID: CollegeID,
        GroupName: majorName,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn();
        }
        dispatch(PublicAction.ModalLoadingClose());
      });
  };
};
// 编辑教研室

const EditGroup = ({ CollegeID, majorName, majorID, fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    dispatch(PublicAction.ModalLoadingOpen());

    let url = "/EditGroup";
    let {
      DataState: {
        CommonData: {
          GroupEditParams: { GroupID, GroupName, HandleGroupCollegeID },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();
    if (CollegeID === undefined) {
      CollegeID = HandleGroupCollegeID;
    }
    if (majorName === undefined) {
      majorName = GroupName;
    }
    if (majorID === undefined) {
      majorID = GroupID;
    }
    postData(
      UserInfoProxy + url,
      {
        CollegeID: CollegeID,
        GroupName: majorName,
        GroupID: majorID,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn();
        }
        dispatch(PublicAction.ModalLoadingClose());
      });
  };
};

// 分页获取注册记录
const MAIN_GET_SIGN_UP_LOG_TO_PAGE = "MAIN_GET_SIGN_UP_LOG_TO_PAGE";

const GetSignUpLogToPage = ({
  fn = () => {},
  status,
  collegeID,
  schoolID,
  majorID,
  gradeID,
  classID,
  keyword,
  pageIndex,
  pageSize,
  sortFiled,
  sortType,
  isLoading = true,
}) => {
  return (dispatch, getState) => {
    if (isLoading) {
      dispatch(PublicAction.TableLoadingOpen());
    }
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID, CollegeID },
      },
      DataState: {
        CommonData: { RegisterExamineParams },
      },
    } = State;

    if (schoolID === undefined) {
      schoolID = SchoolID;
    }
    if (collegeID === undefined) {
      collegeID = RegisterExamineParams.collegeID;
    }
    if (majorID === undefined) {
      majorID = RegisterExamineParams.majorID;
    }
    if (gradeID === undefined) {
      gradeID = RegisterExamineParams.gradeID;
    }
    if (classID === undefined) {
      classID = RegisterExamineParams.classID;
    }
    if (keyword === undefined) {
      keyword = RegisterExamineParams.keyword;
    }
    if (pageIndex === undefined) {
      pageIndex = RegisterExamineParams.pageIndex;
    }
    if (pageSize === undefined) {
      pageSize = RegisterExamineParams.pageSize;
    }
    if (sortFiled === undefined) {
      sortFiled = RegisterExamineParams.sortFiled;
    }
    if (sortType === undefined) {
      sortType = RegisterExamineParams.sortType;
    }
    if (status === undefined) {
      status = RegisterExamineParams.status;
    }
    getSignUpLogToPage({
      collegeID,
      schoolID,
      majorID,
      gradeID,
      classID,
      keyword,
      pageIndex,
      pageSize,
      sortFiled,
      sortType,
      status,
    }).then((res) => {
      if (res) {
        let List = [];
        res.Data &&
          res.Data.List instanceof Array &&
          res.Data.List.forEach((child, index) => {
            List.push({
              key: index,
              OrderNo:
                pageSize * res.Data.PageIndex + index + 1 >= 10
                  ? pageSize * res.Data.PageIndex + index + 1
                  : "0" + (pageSize * res.Data.PageIndex + index + 1),
              UserMsg: {
                logID: child.LogID,
                userName: child.UserName,
                userImg: child.PhotoPath_NoCache || child.PhotoPath,
                Gende: child.Gender,
                userID: child.UserID,
                userGrade: child.GradeName,
                userClass: child.ClassName,
                userIDCard: child.IDCardNo,
                userPhone: child.Telephone,
                userMail: child.Email,
                userAddress: child.HomeAddress,
                userRegisterTime: child.SignUpTime,
                userRegisterIP: child.SignUpIP,
                userText: child.Sign,
                userCollege: child.CollegeName,
                userMajor: child.MajorName,
              },
              ...child,
            });
          });
        dispatch({
          type: MAIN_GET_SIGN_UP_LOG_TO_PAGE,
          data: { ...res.Data, List },
        });
        fn(getState());
        if (isLoading) {
          dispatch(PublicAction.TableLoadingClose());
        }
      }
    });
  };
};
const getSignUpLogToPage = async ({
  collegeID = "",
  schoolID = "",
  majorID = "",
  gradeID = "",
  classID = "",
  keyword = "",
  pageIndex = "",
  pageSize = "",
  sortFiled = "",
  sortType = "",
  status = "",
}) => {
  let url =
    UserInfoProxy +
    "/GetSignUpLogToPage?schoolID=" +
    schoolID +
    (collegeID !== "" ? "&collegeID=" + collegeID : "") +
    (gradeID !== "" ? "&gradeID=" + gradeID : "") +
    (classID !== "" ? "&classID=" + classID : "") +
    (keyword !== "" ? "&keyword=" + keyword : "") +
    "&status=" +
    status +
    "&pageIndex=" +
    pageIndex +
    "&pageSize=" +
    pageSize +
    (sortFiled !== "" ? "&sortFiled=" + sortFiled : "") +
    (sortType !== "" ? "&sortType=" + sortType : "") +
    (majorID !== "" ? "&majorID=" + majorID : "");
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};

// 分页获取注册记录
const MAIN_GET_TEACHER_SIGN_UP_LOG_TO_PAGE =
  "MAIN_GET_TEACHER_SIGN_UP_LOG_TO_PAGE";

const GetTeacherSignUpLogToPage = ({
  fn = () => {},
  status,
  collegeID,
  schoolID,
  groupID,
  keyword,
  pageIndex,
  pageSize,
  sortFiled,
  sortType,
  isLoading = true,
}) => {
  return (dispatch, getState) => {
    if (isLoading) {
      dispatch(PublicAction.TableLoadingOpen());
    }
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID, CollegeID },
      },
      DataState: {
        CommonData: { RegisterExamineParams },
      },
    } = State;

    if (schoolID === undefined) {
      schoolID = SchoolID;
    }
    if (collegeID === undefined) {
      collegeID = RegisterExamineParams.collegeID;
    }
    if (groupID === undefined) {
      groupID = RegisterExamineParams.groupID;
    }

    if (keyword === undefined) {
      keyword = RegisterExamineParams.keyword;
    }
    if (pageIndex === undefined) {
      pageIndex = RegisterExamineParams.pageIndex;
    }
    if (pageSize === undefined) {
      pageSize = RegisterExamineParams.pageSize;
    }
    if (sortFiled === undefined) {
      sortFiled = RegisterExamineParams.sortFiled;
    }
    if (sortType === undefined) {
      sortType = RegisterExamineParams.sortType;
    }
    if (status === undefined) {
      status = RegisterExamineParams.status;
    }
    getTeacherSignUpLogToPage({
      collegeID,
      schoolID,
      groupID,

      keyword,
      pageIndex,
      pageSize,
      sortFiled,
      sortType,
      status,
    }).then((res) => {
      if (res) {
        let List = [];
        res.Data &&
          res.Data.List instanceof Array &&
          res.Data.List.forEach((child, index) => {
            List.push({
              key: index,
              OrderNo:
                pageSize * res.Data.PageIndex + index + 1 >= 10
                  ? pageSize * res.Data.PageIndex + index + 1
                  : "0" + (pageSize * res.Data.PageIndex + index + 1),
              UserMsg: {
                logID: child.LogID,
                userName: child.UserName,
                userImg: child.PhotoPath_NoCache || child.PhotoPath,
                Gende: child.Gender,
                userID: child.UserID,
                subjectName: child.SubjectNames,
                userGrade: child.GradeName,
                userClass: child.ClassName,
                userIDCard: child.IDCardNo,
                userCollege: child.CollegeName,
                userGroup: child.GroupName,
                userPhone: child.Telephone,
                userMail: child.Email,
                userAddress: child.HomeAddress,
                userRegisterTime: child.SignUpTime,
                userRegisterIP: child.SignUpIP,
                userText: child.Sign,
                college: child.CollegeName,
                group: child.GroupName,
              },
              ...child,
            });
          });
        dispatch({
          type: MAIN_GET_TEACHER_SIGN_UP_LOG_TO_PAGE,
          data: { ...res.Data, List },
        });
        fn(getState());
        if (isLoading) {
          dispatch(PublicAction.TableLoadingClose());
        }
      }
    });
  };
};
const getTeacherSignUpLogToPage = async ({
  collegeID = "",
  schoolID = "",
  groupID = "",

  keyword = "",
  pageIndex = "",
  pageSize = "",
  sortFiled = "",
  sortType = "",
  status = "",
}) => {
  let url =
    UserInfoProxy +
    "/GetTeacherSignUpLogToPage?schoolID=" +
    schoolID +
    (collegeID !== "" ? "&collegeID=" + collegeID : "") +
    (groupID !== "" ? "&groupID=" + groupID : "") +
    (keyword !== "" ? "&keyword=" + keyword : "") +
    "&status=" +
    status +
    "&pageIndex=" +
    pageIndex +
    "&pageSize=" +
    pageSize +
    (sortFiled !== "" ? "&sortFiled=" + sortFiled : "") +
    (sortType !== "" ? "&sortType=" + sortType : "");

  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 注册记录审核

const SignUpLogAudit = ({ LogID, Status, fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    dispatch(PublicAction.TableLoadingOpen());

    let url = "/SignUpLogAudit";
    let {
      DataState: {
        CommonData: {
          GroupEditParams: { GroupID, GroupName, HandleGroupCollegeID },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();

    postData(
      UserInfoProxy + url,
      {
        LogID,
        Status,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn(); //要重新请求数据，loading在数据回来后关闭
        } else {
          dispatch(PublicAction.TableLoadingClose());
        }
      });
  };
};
// 注册记录审核

const TeacherSignUpLogAudit = ({ LogID, Status, fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    dispatch(PublicAction.TableLoadingOpen());

    let url = "/TeacherSignUpLogAudit";
    let {
      DataState: {
        CommonData: {
          GroupEditParams: { GroupID, GroupName, HandleGroupCollegeID },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();

    postData(
      UserInfoProxy + url,
      {
        LogID,
        Status,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn(); //要重新请求数据，loading在数据回来后关闭
        } else {
          dispatch(PublicAction.TableLoadingClose());
        }
      });
  };
};
// 注册记录审核批量

const SignUpLogAuditMulti = ({ LogID, Status, fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    dispatch(PublicAction.TableLoadingOpen());

    let url = "/SignUpLogAuditMulti";
    let {
      DataState: {
        CommonData: {
          RegisterExamineParams: { checkedList },
        },
        MainData: {
          StudentRegisterData: { List },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();
    let Logs = [];
    List.forEach((child, index) => {
      if (checkedList.includes(child.key)) {
        Logs.push(child.LogID);
      }
    });
    postData(
      UserInfoProxy + url,
      {
        LogID: Logs.join(","),
        Status,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn(); //要重新请求数据，loading在数据回来后关闭
        } else {
          dispatch(PublicAction.TableLoadingClose());
        }
      });
  };
};
// 注册记录审核批量

const TeacherSignUpLogAuditMulti = ({ LogID, Status, fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    dispatch(PublicAction.TableLoadingOpen());

    let url = "/TeacherSignUpLogAuditMulti";
    let {
      DataState: {
        CommonData: {
          RegisterExamineParams: { checkedList },
        },
        MainData: {
          TeacherRegisterData: { List },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();
    let Logs = [];
    List.forEach((child, index) => {
      if (checkedList.includes(child.key)) {
        Logs.push(child.LogID);
      }
    });
    postData(
      UserInfoProxy + url,
      {
        LogID: Logs.join(","),
        Status,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn(); //要重新请求数据，loading在数据回来后关闭
        } else {
          dispatch(PublicAction.TableLoadingClose());
        }
      });
  };
};

// 获取班主任所带行政班及班主任权限
const MAIN_GET_CLASS_AND_POWER_DATA = "MAIN_GET_CLASS_AND_POWER_DATA";

const GetClassAndPower = ({ fn = () => {}, isLoading = true, UserID }) => {
  return (dispatch, getState) => {
    if (isLoading) {
      dispatch(PublicAction.ContentLoadingOpen());
    }
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { UserID: userID, CollegeID },
      },
      DataState: {
        CommonData: {
          RolePower: { IsCollege, IsLeader },
        },
      },
    } = State;

    if (UserID === undefined) {
      UserID = userID;
    }

    getClassAndPower({
      UserID,
    }).then((res) => {
      if (res) {
        let { Class, Power } = res.Data;
        let ClassList = [];
        Class instanceof Array &&
          Class.forEach((child, index) => {
            let power = Power[index] instanceof Object ? Power[index] : {};
            ClassList.push({
              value: child.ClassID,
              title: child.ClassName,
              ...power,
            });
          });
        if (ClassList.length === 0) {
          window.location.href = CONFIG.ErrorProxy + "/Error.aspx?errcode=E011";
        }
        dispatch({
          type: MAIN_GET_CLASS_AND_POWER_DATA,
          data: ClassList,
        });
        fn(getState());
        dispatch(PublicAction.ContentLoadingClose());
      }
    });
  };
};
const getClassAndPower = async ({ UserID = "" }) => {
  let url = ClassProxy + "/GetClassAndPower?UserID=" + UserID;
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};
// 获取班主任所带行政班及班主任权限
const MAIN_GET_UNREAD_LOG_COUNT_DATA = "MAIN_GET_UNREAD_LOG_COUNT_DATA";

const GetUnreadLogCount = ({
  fn = () => {},
  isLoading = true,
  OnlineUserID,
}) => {
  return (dispatch, getState) => {
    // if (isLoading) {
    //   dispatch(PublicAction.ContentLoadingOpen());
    // }
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { UserID: userID, CollegeID },
      },
      DataState: {
        CommonData: {
          RolePower: { IsCollege, IsLeader },
        },
      },
    } = State;
    if (IsLeader) {
      return; //领导没有这个
    }
    if (OnlineUserID === undefined) {
      OnlineUserID = userID;
    }

    getUnreadLogCount({
      OnlineUserID,
    }).then((res) => {
      if (res) {
        dispatch({
          type: MAIN_GET_UNREAD_LOG_COUNT_DATA,
          data: res.Data,
        });
        fn(getState());
        // dispatch(PublicAction.ContentLoadingClose());
      }
    });
  };
};
const getUnreadLogCount = async ({ OnlineUserID = "" }) => {
  let url = UserInfoProxy + "/GetUnreadLogCount?OnlineUserID=" + OnlineUserID;
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};

// 分页获取注册记录
const MAIN_GET_UNREAD_LOG_TO_PAGE = "MAIN_GET_UNREAD_LOG_TO_PAGE";

const GetUnreadLogToPage = ({
  fn = () => {},
  OnlineUserID,
  collegeID,
  UserType,
  OperationType,
  pageIndex,
  pageSize,
  sortType,
  isLoading = true,
}) => {
  return (dispatch, getState) => {
    if (isLoading) {
      dispatch(PublicAction.TableLoadingOpen());
    }
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID, CollegeID, UserID },
      },
      DataState: {
        CommonData: { LogParams },
      },
    } = State;

    if (OnlineUserID === undefined) {
      OnlineUserID = UserID;
    }
    if (collegeID === undefined) {
      collegeID = LogParams.CollegeID;
    }
    if (UserType === undefined) {
      UserType = LogParams.UserType;
    }

    if (OperationType === undefined) {
      OperationType = LogParams.OperationType;
    }
    if (pageIndex === undefined) {
      pageIndex = LogParams.PageIndex;
    }
    if (pageSize === undefined) {
      pageSize = LogParams.PageSize;
    }

    if (sortType === undefined) {
      sortType = LogParams.SortType;
    }

    getUnreadLogToPage({
      collegeID,
      OnlineUserID,
      UserType,

      OperationType,
      pageIndex,
      pageSize,
      sortType,
    }).then((res) => {
      if (res) {
        let List = [];
        res.Data &&
          res.Data.List instanceof Array &&
          res.Data.List.forEach((child, index) => {
            let LogIDs = [];
            child.Logs instanceof Array &&
              child.Logs.forEach((log, index) => {
                LogIDs.push(log.LogID);
              });
            List.push({
              key: index,
              OrderNo:
                pageSize * res.Data.PageIndex + index + 1 >= 10
                  ? pageSize * res.Data.PageIndex + index + 1
                  : "0" + (pageSize * res.Data.PageIndex + index + 1),
              LogIDs: LogIDs.join(","),
              ...child,
            });
          });
        dispatch({
          type: MAIN_GET_UNREAD_LOG_TO_PAGE,
          data: { ...res.Data, List },
        });
        fn(getState());
        if (isLoading) {
          dispatch(PublicAction.TableLoadingClose());
        }
      }
    });
  };
};
const getUnreadLogToPage = async ({
  collegeID = "",
  OnlineUserID = "",
  UserType = "",

  OperationType = "",
  pageIndex = "",
  pageSize = "",
  sortType = "",
}) => {
  let url =
    UserInfoProxy +
    "/GetUnreadLogToPage?OnlineUserID=" +
    OnlineUserID +
    (collegeID !== "" ? "&collegeID=" + collegeID : "") +
    (UserType !== "" ? "&UserType=" + UserType : "") +
    (OperationType !== "" ? "&OperationType=" + OperationType : "") +
    "&pageIndex=" +
    pageIndex +
    "&pageSize=" +
    pageSize +
    (sortType !== "" ? "&sortType=" + sortType : "");

  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};

// 获取用户详情
const MAIN_GET_USER_DETAIL_DATA = "MAIN_GET_USER_DETAIL_DATA";

const GetUserDetail = ({ fn = () => {}, isLoading = true, UserID }) => {
  return (dispatch, getState) => {
    // if (isLoading) {
    //   dispatch(PublicAction.ContentLoadingOpen());
    // }
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { CollegeID },
      },
      DataState: {
        CommonData: {
          RolePower: { IsCollege, IsLeader },
        },
      },
    } = State;

    getUserDetail({
      UserID,
    }).then((res) => {
      if (res) {
        // dispatch({
        //   type: MAIN_GET_USER_DETAIL_DATA,
        //   data: res.Data,
        // });
        let data = res.Data;
        dispatch(
          CommonAction.SetUserArchivesParams({
            DetailsData: {
              userName: data.UserName,
              userImg: data.PhotoPath_NoCache || data.PhotoPath,
              Gende: data.Gender,
              userText: data.Sign,
              userID: data.UserID,
              userGrade: data.GradeName,
              userClass: data.ClassName,
              userIDCard: data.IDCardNo,
              userPhone: data.Telephone,
              userMail: data.Email,
              userAddress: data.HomeAddress,
              titleName: data.TitleName,
              subjectName: data.SubjectNames,
              source: data.Source,
              Position: data.Position,
              sign: data.Sign,
              userType: data.UserType,
              isNull: false,
              userMajor: data.MajorName,
              userGroup: data.GroupName,
              userCollege: data.CollegeName,
            },
          })
        );
        fn(getState(), res.Data);
        // dispatch(PublicAction.ContentLoadingClose());
      }
    });
  };
};
const getUserDetail = async ({ UserID = "" }) => {
  let url = UserInfoProxy + "/GetUserDetail?UserID=" + UserID;
  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};

// 档案动态标记已读

const LogSignReaded = ({ LogIDs, Status, fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    dispatch(PublicAction.TableLoadingOpen());

    let url = "/LogSignReaded";
    let {
      DataState: {
        CommonData: {
          LogParams: { checkedList },
        },
        MainData: {
          LogDynamicData: { List },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();

    if (LogIDs === undefined) {
      //未定义就是多选，否则单个的都是传值
      let Logs = [];
      List.forEach((child, index) => {
        if (checkedList.includes(child.key)) {
          Logs.push(child.LogIDs);
        }
      });
      LogIDs = Logs.join(",");
      // console.log(Logs);
    }
    postData(
      UserInfoProxy + url,
      {
        LogIDs,
      },
      2
    )
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn(); //要重新请求数据，loading在数据回来后关闭
        } else {
          dispatch(PublicAction.TableLoadingClose());
        }
      });
  };
};

//档案动态全部标记已读

const LogSignAllReaded = ({ LogIDs, fn = () => {} }) => {
  return (dispatch, getState) => {
    // console.log(url)
    dispatch(PublicAction.TableLoadingOpen());

    let url = "/LogSignAllReaded";
    let {
      DataState: {
        CommonData: {
          LogParams: { checkedList },
        },
      },
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = getState();

    postData(UserInfoProxy + url, {}, 2)
      .then((data) => data.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          // dispatch(SetMainEditInitData());
          fn(); //要重新请求数据，loading在数据回来后关闭
        } else {
          dispatch(PublicAction.TableLoadingClose());
        }
      });
  };
};

// 分页获取所有档案变更记录
const MAIN_GET_ALL_LOG_TO_PAGE = "MAIN_GET_ALL_LOG_TO_PAGE";

const GetAllLogToPage = ({
  fn = () => {},
  schoolID,
  endTime,
  collegeID,
  UserType,
  beginTime,
  OperationType,
  pageIndex,
  pageSize,
  sortType,
  sortFiled,
  isLoading = true,
}) => {
  return (dispatch, getState) => {
    if (isLoading) {
      dispatch(PublicAction.TableLoadingOpen());
    }
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID, CollegeID, UserID },
      },
      DataState: {
        CommonData: { LogParams },
      },
    } = State;
    if (schoolID === undefined) {
      schoolID = SchoolID;
    }
    if (beginTime === undefined) {
      beginTime = LogParams.BeginTime;
    }
    if (collegeID === undefined) {
      collegeID = LogParams.CollegeID;
    }
    if (UserType === undefined) {
      UserType = LogParams.UserType;
    }

    if (OperationType === undefined) {
      OperationType = LogParams.OperationType;
    }
    if (pageIndex === undefined) {
      pageIndex = LogParams.PageIndex;
    }
    if (pageSize === undefined) {
      pageSize = LogParams.PageSize;
    }

    if (sortType === undefined) {
      sortType = LogParams.SortType;
    }
    if (endTime === undefined) {
      endTime = LogParams.EndTime;
    }
    if (sortFiled === undefined) {
      sortFiled = LogParams.SortFiled;
    }
    getAllLogToPage({
      collegeID,
      beginTime,
      endTime,
      UserType,
      schoolID,
      OperationType,
      pageIndex,
      pageSize,
      sortType,
      sortFiled,
    }).then((res) => {
      if (res) {
        let List = [];
        res.Data &&
          res.Data.List instanceof Array &&
          res.Data.List.forEach((child, index) => {
            let LogIDs = [];
            child.Logs instanceof Array &&
              child.Logs.forEach((log, index) => {
                LogIDs.push(log.LogID);
              });
            List.push({
              key: index,
              OrderNo:
                pageSize * res.Data.PageIndex + index + 1 >= 10
                  ? pageSize * res.Data.PageIndex + index + 1
                  : "0" + (pageSize * res.Data.PageIndex + index + 1),
              LogIDs: LogIDs.join(","),
              ...child,
            });
          });
        dispatch({
          type: MAIN_GET_ALL_LOG_TO_PAGE,
          data: { ...res.Data, List },
        });
        fn(getState());
        if (isLoading) {
          dispatch(PublicAction.TableLoadingClose());
        }
      }
    });
  };
};
const getAllLogToPage = async ({
  collegeID = "",
  beginTime = "",
  UserType = "",
  endTime = "",
  schoolID = "",
  OperationType = "",
  pageIndex = "",
  pageSize = "",
  sortType = "",
  sortFiled = "",
}) => {
  let url =
    UserInfoProxy +
    "/GetAllLogToPage?SchoolID=" +
    schoolID +
    (beginTime !== "" ? "&beginTime=" + beginTime : "") +
    (endTime !== "" ? "&endTime=" + endTime : "") +
    (collegeID !== "" ? "&collegeID=" + collegeID : "") +
    (UserType !== "" ? "&UserType=" + UserType : "") +
    (OperationType !== "" ? "&OperationType=" + OperationType : "") +
    (sortFiled !== "" ? "&sortFiled=" + sortFiled : "") +
    "&pageIndex=" +
    pageIndex +
    "&pageSize=" +
    pageSize +
    (sortType !== "" ? "&sortType=" + sortType : "");

  let data = "";
  let res = await getData(url, 2);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return data;
};

export default {
  GetAllLogToPage,
  MAIN_GET_ALL_LOG_TO_PAGE,

  LogSignReaded,
  LogSignAllReaded,

  GetUserDetail,
  MAIN_GET_USER_DETAIL_DATA,

  GetUnreadLogToPage,
  MAIN_GET_UNREAD_LOG_TO_PAGE,

  GetUnreadLogCount,
  MAIN_GET_UNREAD_LOG_COUNT_DATA,

  GetTeacherSignUpLogToPage,
  MAIN_GET_TEACHER_SIGN_UP_LOG_TO_PAGE,

  GetClassAndPower,
  MAIN_GET_CLASS_AND_POWER_DATA,

  TeacherSignUpLogAuditMulti,
  SignUpLogAuditMulti,
  SignUpLogAudit,
  TeacherSignUpLogAudit,

  GetSignUpLogToPage,
  MAIN_GET_SIGN_UP_LOG_TO_PAGE,

  DeleteMajor,
  EditMajor,
  AddMajor,
  DeleteGroup,
  EditGroup,
  AddGroup,
  AddClass,

  MAIN_GET_SUBJECT_DATA,
  GetSubject,

  AddStudent,
  EditStudent,
  EditTeacher,
  AddTeacher,
  AddSchoolLeader,
  EditSchoolLeader,

  MAIN_GET_TITLE_TREE_DATA,
  GetTitle,

  EditGraduateContact,
  EditGraduateTrack,

  MAIN_GET_GRADUATE_TO_PAGE,
  GetGraduateToPage,

  MAIN_GET_GRADUATE_TREE_DATA,
  GetGraduateTree,

  MAIN_GET_LEADER_TO_PAGE,
  GetLeaderToPage,

  DeleteLeader,
  DeleteTeacher,

  GetTeacherToPage,
  MAIN_GET_TEACHER_TO_PAGE,

  GetTeacherTree,
  MAIN_GET_TEACHER_TREE_DATA,

  DeleteStudent,

  MAIN_GET_USER_LOG_DATA,
  GetUserLog,

  GetStudentToPage,
  MAIN_GET_STUDENT_TO_PAGE,

  GetTree,
  MAIN_GET_TREE_DATA,

  GetCollegeSummary,
  MAIN_GET_SUMMARY_DATA,
  GetSchoolSummary,

  GetSubSystemsMainServerBySubjectID,
  MAIN_GET_SUB_SYSTEMS_MAIN_SERVER,
};
