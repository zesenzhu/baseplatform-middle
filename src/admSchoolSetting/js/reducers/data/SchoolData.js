import UpDataState from "../../actions/UpDataState";
// import DataState from "./../DataState";
import Public from "../../../../common/js/public";
const SchoolData = (
  state = {
    CurrentPage: 0,
    Total: 0,
    pageSize: 10,
    ClosedCount: 0,
    initData: [],
    SchoolList: [],
    keyList: [],
    TotalSchoolCount: 0,
  },
  actions
) => {
  let Data = {};
  switch (actions.type) {
    case UpDataState.SET_WEBSITE_DATA:
      return Object.assign({}, state, { ...actions.data });
    case UpDataState.QUERY_SCHOOL_INFO:
      Data = handleInitData(actions.data, actions.pageSize);
      return Object.assign({}, state, { ...Data });
    default:
      return state;
  }
};

function handleInitData(initData, pageSize) {
  console.log(initData);
  let SchoolSessionTypeList = [
    { value: "0/0/0", title: "--", more: "" },
    { value: "5/0/0", title: "小学", more: "小学(五年制小学)" },
    { value: "6/0/0", title: "小学", more: "小学(六年制小学)" },
    {
      value: "5/4/0",
      title: "九年一贯制",
      more: "九年一贯制(五年制小学,四年制初中)",
    },
    {
      value: "6/3/0",
      title: "九年一贯",
      more: "九年一贯制(六年制小学,三年制初中)",
    },
    {
      value: "0/4/3",
      title: "完全中学",
      more: "完全中学(四年制初中,三年制高中)",
    },
    {
      value: "0/3/3",
      title: "完全中学",
      more: "完全中学(三年制初中,三年制高中)",
    },
    { value: "6/0/0", title: "--", more: "" },
  ];
  let { List, ...other } = initData;
  let SchoolList = [];
  let keyList = [];
  let SchoolOpen = 0;
  let SchoolClose = 0;
  if (List instanceof Array) {
    List.map((child, index) => {
      let No =
        pageSize * (other.CurrentPage - 1) + index + 1 > 10
          ? pageSize * (other.CurrentPage - 1) + index + 1
          : "0" + (pageSize * (other.CurrentPage - 1) + index + 1);
      // if (child.SchoolState === 1) {
      //   SchoolOpen++;
      // } else if (child.SchoolState === 2) {
      //   SchoolClose++;
      // }

      SchoolList.push({
        key:index,
        orderNo: {
          No,
          key: index,
        },
        SchoolName: child.SchoolName,
        SchoolCode: child.SchoolCode,
        SchoolLevel:
          child.SchoolLevel === 1
            ? { title: "大学", value: 1 }
            : { title: "中小学", value: 2 },
        // SchoolSessionType:
        //   child.SchoolSessionType === "3"
        //     ? { title: "三年制", value: 3 }
        //     : child.SchoolSessionType === "4"
        //     ? { title: "四年制", value: 4 }
        //     : child.SchoolSessionType === "5"
        //     ? { title: "五年制", value: 5 }
        //     : { title: "三年制", value: 3 },
        SchoolSessionType: handleSchoolSessionType(child.SchoolSessionType),
        StudentCount: child.StudentCount,
        TeacherAndWorkerCount: child.TeacherAndWorkerCount,
        SchoolTotlaCount: child.StudentCount + child.TeacherAndWorkerCount,
        AdminAccount: "admin_" + child.SchoolCode,
        SchoolState:
          child.SchoolState === 1
            ? { title: "正常运行", value: 1 }
            : { title: "已关闭", value: 2 },
        Runtime: child.Runtime,
        SchoolLink: {
          SchoolLinkman: child.SchoolLinkman,
          SchoolTel: child.SchoolTel,
        },
        SchoolID: child.SchoolID,
        SchoolImgUrl: child.SchoolImgUrl,
        CityID: child.CityID,
        CityName: child.CityName,
        CountyName: child.CountyName,
        ProvinceName: child.ProvinceName,
        CountyID: child.CountyID,
        ProvinceID: child.ProvinceID,
        SchoolImgUrl_Long: child.SchoolImgUrl_Long,
      });
      keyList.push(index);
    });
  }
  return { initData, SchoolList, keyList, SchoolClose, ...other };
}

function handleSchoolSessionType(SchoolSessionType) {
  let TypeTitle = { value: "0/0/0", title: "--", more: "" };
  let TypeC = {
    0: "",
    3: "三年制",
    4: "四年制",
    5: "五年制",
    6: "六年制",
  };
  let SchoolC = ["小学", "初中", "高中"];
  if (typeof SchoolSessionType === "string") {
    let All = 0;

    let TypeList = SchoolSessionType.split("/").map((child) => {
      All += parseInt(child);
      return parseInt(child);
    });
    TypeTitle = checkYear(TypeList);
  }
  return TypeTitle;
}
function checkYear(YearList) {
  let SchoolC = ["小学", "初中", "高中"];
  let TypeC = {
    0: "",
    3: "三年制",
    4: "四年制",
    5: "五年制",
    6: "六年制",
  };
  let List = [];
  let Name = "";
  YearList.forEach((child, index) => {
    if (child !== 0) {
      List.push(SchoolC[index] + TypeC[child]);
    }
  });

  if (YearList[0] && YearList[1] && YearList[2]) {
    Name = "十二年一贯制";
  } else if (YearList[1] && YearList[2]) {
    Name = "完全高中";
  } else if (YearList[1] && YearList[0]) {
    Name = "九年一贯制";
  } else if (YearList[1]) {
    Name = "初中";
  } else if (YearList[2]) {
    Name = "高中";
  } else if (YearList[0]) {
    Name = "小学";
  }
  return {
    value: YearList.join("/"),
    title: Name,
    more: Name + "(" + List.join(",") + ")",
  };
}
export default SchoolData;
