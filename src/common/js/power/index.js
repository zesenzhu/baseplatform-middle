import { getData, postData } from "../fetch";
import config from "../config";
const Student_SginUp = "Student_SginUp"; //学生_自主注册权限
const Teacher_CourseClass_CURD = "Teacher_CourseClass_CURD"; //教师_教学班的管理权限
const Teacher_Schedule_C = "Teacher_Schedule_C"; //教师_课程表录入权限
const Teacher_Schedule_U = "Teacher_Schedule_U"; //教师_课程表调课权限
const Ganger_Student_CURD = "Ganger_Student_CURD"; //班主任_班级学生档案的管理权限
const Ganger_CourseClassTeacher_CURD = "Ganger_CourseClassTeacher_CURD"; //班主任_班级任课教师的管理权限
const Dean_UserInfo_CURD = "Dean_UserInfo_CURD"; //教务主任_学生/教师档案的管理的权限
const Dean_Class_CURD = "Dean_Class_CURD"; //教务主任_行政班的管理权限
const Dean_CourseClass_CURD = "Dean_CourseClass_CURD"; //教务主任_教学班的管理权限
const Dean_Schedule_CURD = "Dean_Schedule_CURD"; //教务主任_课程安排的管理权限

// 模块ID
const SUBJECT_MODULEID = "000-2-0-18"; //学科管理
const COURECLASS_MODULEID = "000-2-0-17"; //教学班管理
const COURSEARRANGEMENT_MODULEID = "000-2-0-07"; //课程安排管理
const POWER_MODULEID = "000-2-0-09"; //权限管理
const ACCOUNT_MODULEID = "000-2-0-10"; //用户账号管理
const ADMINISTRATOR_MODULEID = "000-2-0-06"; //行政班管理
const PROFILE_MODULEID = "000-2-0-05"; //用户档案管理
const SYSTEM_MODULEID = "000-2-0-13"; //系统设置管理
const WEBSITE_MODULEID = "000-2-0-14"; //网站资源管理

// 查询权限:只适合查询管理员端是否有权限且该模块有id
async function QueryPower({ UserInfo, ModuleID }) {
  if (
    (UserInfo instanceof Object &&
      !UserInfo.UserType &&
      !UserInfo.UserClass &&
      !UserInfo.SchoolID) ||
    ModuleID === null
  ) {
    console.log("UserInfo或ModuleID有误");
    return;
  }
  let UserType = UserInfo.UserType; //用户类型
  let UserClass = UserInfo.UserClass; //用户类型-下一级判断类型
  let SchoolID = UserInfo.SchoolID; //用户学校ID

  if (UserType === "0") {
    //管理员
    if (
      SUBJECT_MODULEID !== ModuleID &&
      COURECLASS_MODULEID !== ModuleID &&
      COURSEARRANGEMENT_MODULEID !== ModuleID &&
      POWER_MODULEID !== ModuleID &&
      ACCOUNT_MODULEID !== ModuleID &&
      ADMINISTRATOR_MODULEID !== ModuleID &&
      PROFILE_MODULEID !== ModuleID &&
      SYSTEM_MODULEID !== ModuleID &&
      WEBSITE_MODULEID !== ModuleID
    )
      window.location.href = config.ErrorProxy + "/Error.aspx?errcode=E011";

    if (UserClass === "2") {
      //超级管理员
      return true;
    } else if (UserClass === "1") {
      //普通管理员
      let result = await QueryAdminPower({ ModuleID: ModuleID });
      return result;
    }
  } else if (UserType === "7" && UserClass === "2") {
    //教务主任
    let data = await QueryOtherPower({ SchoolID, ModuleID, UserType: "7" });
    if (data) {
      return true;
    } else {
      window.location.href = config.ErrorProxy + "/Error.aspx?errcode=E011";

      return false;
    }
  } else if (UserType === "1") {
    //教师
    let data = await QueryOtherPower({ SchoolID, ModuleID, UserType: "1" });
    console.log(data);
    if (data) {
      return true;
    } else {
      window.location.href = config.ErrorProxy + "/Error.aspx?errcode=E011";

      return false;
    }
  } else if (UserType === "2") {
    return true;
  } else {
    window.location.href = config.ErrorProxy + "/Error.aspx?errcode=E011";
    return false;
  }
}

// 查询普通管理员权限
async function QueryAdminPower({ ModuleID, isSkip = true }) {
  let url = config.PowerProxy + "/Validate?moduleID=" + ModuleID;
  let HavePower = false;
  let result = await getData(url, 2);
  let res = await result.json();

  if (res.StatusCode === 200) {
    if (res.Data === true) {
      HavePower = true;
    } else {
      if (isSkip) {
        window.location.href = config.ErrorProxy + "/Error.aspx?errcode=E011";
        // alert('我没权限')
        HavePower = false;
      } else {
        HavePower = false;
      }
    }
  }
  return HavePower;
}
// 查询管理员外的角色权限
async function QueryOtherPower({
  SchoolID,
  ModuleID = "",
  Power = "",
  UserType = "",
}) {
  let Data = {};
  let HavePower = false;
  let PowerName = Power;
  if (ModuleID === ADMINISTRATOR_MODULEID) {
    //行政班管理
    PowerName = Dean_Class_CURD;
  } else if (ModuleID === PROFILE_MODULEID) {
    //用户档案管理
    if (UserType === "7") {
      PowerName = Dean_UserInfo_CURD;
    } else if (UserType === "1") {
      PowerName = Ganger_Student_CURD;
    }
  } else if (ModuleID === COURECLASS_MODULEID) {
    //教学班管理
    if (UserType === "7") {
      PowerName = Dean_CourseClass_CURD;
    } else if (UserType === "1") {
      PowerName = Teacher_CourseClass_CURD;
    }
  } else if (ModuleID === COURSEARRANGEMENT_MODULEID) {
    //课程安排管理

    PowerName = Dean_Schedule_CURD;
  }
  let url = config.PowerProxy + "/GetGlobalUserPowerV2?SchoolID=" + SchoolID;

  const result = await getData(url, 2);

  let res = await result.json();
  if (res.StatusCode === 200) {
    Data = res.Data;
  }

  for (let key in Data) {
    if (key === PowerName) {
      HavePower = Data[PowerName];
    }
  }
  // console.log(HavePower);
  return HavePower;
}
export { QueryPower, QueryOtherPower, QueryAdminPower };
