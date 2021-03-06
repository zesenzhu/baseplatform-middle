import logo from "../images/frame/logo.png";

let config = {};

const host = window.location.host;

const pathName = window.location.pathname;

const protocol = window.location.protocol;

let pathFolder = "";

if (pathName.includes("/html/")) {
  pathFolder = pathName.split("/html/")[0];
} else if (pathName.includes(".html")) {
  let strArr = window.location.pathname.split(".html")[0].split("/");

  strArr.pop();

  pathFolder = strArr.join("/");
} else {
  pathFolder = pathName;
}

const RootUrl = protocol + "//" + host + pathFolder;

if (process.env.NODE_ENV === "development") {
  config = {
    name: "中小学一体化学科教育云",
    logo: logo,
    footer: "蓝鸽科技 版权所有",
    TokenProxy: "http://192.168.129.2:30103/",
    // TokenProxy:'http://47.115.20.102:10102',
    SubjectProxy: "http://192.168.129.2:30103//Subject/api",
    CourseClassProxy: "http://192.168.129.2:30103//CourseClass/api",
    CourseClassStuProxy: "http://192.168.129.2:30103//CourseClassStu/api",
    CourseClassMoniProxy:
      "http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev",
    MyCourseClassProxy: "http://192.168.129.2:30103/",
    UserAccountProxy: "http://192.168.129.2:30103//UserMgr/UserAccount",
    TeachingSolutionProxy:
      "http://192.168.129.2:30103//SubjectResMgr/TeachingSolutionMgr/Teacher",
    AdmClassProxy: "http://192.168.129.2:30103/",
    DeskTopProxy: "http://192.168.129.2:30103/",
    // CustomProxy:"http://192.168.2.114:8090",
    PicProxy: "http://192.168.129.2:30103/",

    CustomProxy: "http://192.168.129.2:30103/",
    // WebsiteProxy:"http://192.168.2.114:8090",
    WebsiteProxy: "http://192.168.129.2:30103/",
    ScheduleProxy: "http://192.168.129.2:30103/",
    // ScheduleProxy:"http://47.115.20.102:10102",
    Xproxy: "http://192.168.129.2:30103//UserMgr/UserInfoMgr",
    PowerProxy: "http://192.168.129.2:30103//UserMgr/PowerMgr",
    // PowerProxy:'http://47.115.20.102:10102/UserMgr/PowerMgr',
    UserInfoProxy: "http://192.168.129.2:30103//UserMgr/UserInfoMgr",
    proxy:
      "http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev",
    BasicProxy: "http://192.168.129.2:30103/",
    LoginProxy: "http://192.168.129.2:10102",
    MockLoginProxy:
      "http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev",
    PersonalProxy: "http://192.168.129.2:30103/",
    ErrorProxy: "http://192.168.129.2:30103/",
    XTestProxy: "http://192.168.129.2:30103//UserMgr/UserInfoMgr",
    Import: "http://192.168.129.2:30103/",
    SysSettingProxy: "http://192.168.129.2:30103/",
    ImgUrlProxy: "http://192.168.129.2:30103/",
    // SysSettingProxy:'http://192.168.2.114:8090',
    tempSubsystemProxy:
      "http://192.168.2.202:7300/mock/5db974a3a1aded10689632eb/example",
    DataCollectorProxy: "http://192.168.129.2:30103/",
    RegisterProxy: "http://192.168.129.2:30103//UserMgr/UserInfoMgr",
    // DataCollectorProxy:"http://192.168.2.114:8090",
    RegisterNoTokenProxy: "http://192.168.129.2:30103//UserMgr/Mobile",
    InitSeytemProxy: "http://192.168.129.2:30103//SysMgr/Setting/Init",
    TextBookProxy: "http://192.168.129.2:30103//SubjectResMgr/TextBookMgr",
    TextBookProxy_2:
      "http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev",
    ClassProxy: "http://192.168.129.2:30103//UserMgr/ClassMgr",

    HashPrevProxy: RootUrl,

    GlobalProxy: "http://192.168.129.2:30103//Global",

    UserPersonaProxy: "http://192.168.129.2:30103/",

    UserScheduleProxy: "http://192.168.129.2:30103//Schedule/api/",

    SchoolSettingProxy: "http://192.168.129.2:30103//SysMgr/Setting",

    UserAccessProxy: "http://192.168.129.2:30103//UserMgr/PowerMgr/",

    SelectObjectProxy: "http://192.168.129.2:30103//UserMgr/SelectObject/",

    SubSystemProxy: "http://192.168.129.2:30103//SysMgr/Setting/SubSystem/",
    ModuleProxy: "http://192.168.129.2:30103//SysMgr/Setting/Module/",
    HolidayProxy: "http://192.168.129.2:30103/SysMgr/Setting/Holiday/",

  };
}

if (process.env.NODE_ENV === "production") {
  console.log = ()=>{}
  config = {
    name: "中小学一体化学科教育云",
    logo: logo,
    footer: "蓝鸽科技 版权所有",
    TokenProxy: "",
    SubjectProxy: "/Subject/api",
    CourseClassProxy: "/CourseClass/api",
    CourseClassStuProxy: "/CourseClassStu/api",
    UserAccountProxy: "/UserMgr/UserAccount",
    TeachingSolutionProxy: "/SubjectResMgr/TeachingSolutionMgr/Teacher",
    AdmClassProxy: "",
    DeskTopProxy: "",
    ScheduleProxy: "",
    Xproxy: "/UserMgr/UserInfoMgr",
    PowerProxy: "/UserMgr/PowerMgr",
    UserInfoProxy: "/UserMgr/UserInfoMgr",
    BasicProxy: "",
    LoginProxy: "",
    MockLoginProxy: "",
    ImgUrlProxy: "",
    PersonalProxy: "",
    CustomProxy: "",
    PicProxy: "",
    WebsiteProxy: "",
    ErrorProxy: "",
    MyCourseClassProxy: "",
    XTestProxy: "/UserMgr/UserInfoMgr",
    Import: "",
    SysSettingProxy: "",
    tempSubsystemProxy: "",
    DataCollectorProxy: "",
    RegisterProxy: "/UserMgr/UserInfoMgr",
    // DataCollectorProxy:"http://192.168.2.114:8090",
    RegisterNoTokenProxy: "/UserMgr/Mobile",
    InitSeytemProxy: "/SysMgr/Setting/Init",
    TextBookProxy: "/SubjectResMgr/TextBookMgr",
    TextBookProxy_2: "/TextBook",
    ClassProxy: "/UserMgr/ClassMgr",

    HashPrevProxy: RootUrl,
    GlobalProxy: "/Global",

    UserPersonaProxy: RootUrl,

    UserScheduleProxy: RootUrl + "/Schedule/api/",

    SchoolSettingProxy: "/SysMgr/Setting",

    UserAccessProxy: "/UserMgr/PowerMgr/",

    SelectObjectProxy: "/UserMgr/SelectObject/",

    SubSystemProxy: "/SysMgr/Setting/SubSystem/",
    ModuleProxy: "/SysMgr/Setting/Module/",
    HolidayProxy: "/SysMgr/Setting/Holiday/",

  };
}

export default config;
