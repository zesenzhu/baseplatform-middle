import { postData, getData } from "../../../../../common/js/fetch";
import CONFIG from "../../../../../common/js/config";
import Public from "../../../../../common/js/public";
import moment from "moment";
function get() {
  return new Promise((resolve, reject) => {
    // arguments
    let data = [...arguments];
    data[1] || data.push(2);

    try {
      getData(...data)
        .then((res) => res.json())
        .then((json) => {
          resolve(json);
        });
    } catch (e) {
      console.error(e);
      reject({
        StatusCode: 501,
        Data: false,
        Msg: "请求出现错误",
      });
    }
  });
}
function post() {
  return new Promise((resolve, reject) => {
    // arguments

    let data = [...arguments];

    data[2] || data.push(2);
    data[3] || data.push("json");
    console.log(data);
    try {
      postData(...data)
        .then((res) => res.json())
        .then((json) => {
          resolve(json);
        });
    } catch (e) {
      console.error(e);
      reject({
        StatusCode: 501,
        Data: false,
        Msg: "请求出现错误",
      });
    }
  });
}
const { HolidayProxy, ModuleProxy } = CONFIG;
//操作常量
/**
 * @description: 获取所有应用模块列表  http://192.168.129.1:8033/showdoc/web/#/11?page_id=2274
 * @param {*} payload
 * @return {*}
 */
export function GetHolidayOfTerm(payload = {}) {
  let { groupID, userType, sysType, key, pageIndex, pageSize } = payload;
  let url = HolidayProxy + `/GetHolidayOfTerm`;

  return get(url, 2)
    .then((json) => {
      if (json.StatusCode === 200 && json.Data) {
        let HolidayData = {};
        let HolidayDataForDay = {}; //以第一天日期为键
        let HolidayDataForEveryDay = {}; //以假期的日期为键
        let WorkDayData = {};
        let WorkDayDataForExchange = {}; //以补班对应休假日为键
        const {
          HolidayList,
          WorkDayList,
          TermStartDate,
          TermEndDate,
        } = json.Data;
        // 用来记录上一个节日，来控制连续,moment
        let preDay = null;
        // 存前一个的指针
        let prePointer = null;
        //  HolidayList.reverse()
        HolidayList instanceof Array &&
          HolidayList.forEach((child, index) => {
            if (HolidayData[child.HolidayName]) {
              HolidayData[child.HolidayName].push({ ...child });
            } else {
              HolidayData[child.HolidayName] = [{ ...child }];
            }
            HolidayDataForEveryDay[child.Date] = { ...child };
            // 通过判断上一个节日是否是前一天来决定是否连续和第一天
            let currentDay = moment(child.Date);
            let continueDay = currentDay.diff(preDay, "day") !== 1;
            HolidayDataForEveryDay[child.Date].firstDay = preDay
              ? continueDay
              : true;
            HolidayDataForEveryDay[child.Date].lastDay = true;
            //修改上一个的last
            if (
              prePointer &&
              HolidayDataForEveryDay[prePointer] &&
              !continueDay
            ) {
              HolidayDataForEveryDay[prePointer].lastDay = false;
            }
            preDay = currentDay;
            prePointer = child.Date;
          });
        for (let k in HolidayData) {
          HolidayDataForDay[HolidayData[k][0].Date] = HolidayData[k];
          // 组合数据
          HolidayData[k].forEach((c, i) => {
            if (
              HolidayDataForEveryDay[c.Date].HolidayName === k &&
              !HolidayDataForEveryDay[c.Date].HolidayList
            ) {
              HolidayDataForEveryDay[c.Date].HolidayList = HolidayData[k];
              HolidayDataForEveryDay[c.Date].StartDate = HolidayData[k][0].Date;
              HolidayDataForEveryDay[c.Date].EndDate =
                HolidayData[k][HolidayData[k].length - 1].Date;
            }
          });
        }
        WorkDayList instanceof Array &&
          WorkDayList.forEach((child, index) => {
            WorkDayData[child.Date] = child.ExchangeDate;
            if (child.ExchangeDate) {
              // 休假日可以被多个补课选择，所以是以对多
              if (WorkDayDataForExchange[child.ExchangeDate]) {
                WorkDayDataForExchange[child.ExchangeDate].push(child.Date);
              } else WorkDayDataForExchange[child.ExchangeDate] = [child.Date];
            }
          });
        // 有多少个月
        window.moment = moment;

        let MonthDiff =moment(moment(TermEndDate).format('YYYY-MM')).diff(moment(TermStartDate).format('YYYY-MM'), "months") + 1
          // moment(TermEndDate).month() - moment(TermStartDate).month() + 1;
        let MonthList = [];
        for (let i = 0; i < MonthDiff; i++) {
          MonthList.push(
            moment(TermStartDate).add(i, "months").format("YYYY-MM")
          );
        }
        return {
          StatusCode: json.StatusCode,
          Data: {
            ...json.Data,
            HolidayData,
            HolidayDataForDay,
            WorkDayData,
            WorkDayDataForExchange,
            MonthDiff,
            MonthList,
            HolidayDataForEveryDay,
          },
        };
      } else {
        return {
          StatusCode: json.StatusCode,
          Data: { MonthList: null },
        };
      }
    })
    .catch((res) => {
      return res;
    });
}

// 新增/编辑补班日
export function SetWorkday(payload = {}) {
  // let {  sysIDs  } = payload;
  let url = HolidayProxy + `/SetWorkday`;

  return post(url, { ...payload }, 2)
    .then((json) => {
      if (json.StatusCode === 200) {
        return {
          StatusCode: json.StatusCode,
          Data: json.Data,
        };
      } else {
        return {
          StatusCode: json.StatusCode,
          Data: false,
        };
      }
    })
    .catch((res) => {
      return res;
    });
}
// 修新增节假日
export function AddHoliday(payload = {}) {
  // let {  sysIDs  } = payload;
  let url = HolidayProxy + `/AddHoliday`;

  return post(url, { ...payload }, 2)
    .then((json) => {
      if (json.StatusCode === 200) {
        return {
          StatusCode: json.StatusCode,
          Data: json.Data,
        };
      } else {
        return {
          StatusCode: json.StatusCode,
          Data: false,
        };
      }
    })
    .catch((res) => {
      return res;
    });
}
// 修新增节假日
export function SetHoliday(payload = {}) {
  // let {  sysIDs  } = payload;
  let url = HolidayProxy + `/SetHoliday`;

  return post(url, { ...payload }, 2)
    .then((json) => {
      if (json.StatusCode === 200) {
        return {
          StatusCode: json.StatusCode,
          Data: json.Data,
        };
      } else {
        return {
          StatusCode: json.StatusCode,
          Data: false,
        };
      }
    })
    .catch((res) => {
      return res;
    });
}

// 修新增节假日
export function DeleteHoliday(payload = {}) {
  // let {  sysIDs  } = payload;
  let url = HolidayProxy + `/DeleteHoliday`;

  return post(url, { ...payload }, 2)
    .then((json) => {
      if (json.StatusCode === 200) {
        return {
          StatusCode: json.StatusCode,
          Data: json.Data,
        };
      } else {
        return {
          StatusCode: json.StatusCode,
          Data: false,
        };
      }
    })
    .catch((res) => {
      return res;
    });
}

// 修新增节假日
export function DeleteWorkday(payload = {}) {
  // let {  sysIDs  } = payload;
  let url = HolidayProxy + `/DeleteWorkday`;

  return post(url, { ...payload }, 2)
    .then((json) => {
      if (json.StatusCode === 200) {
        return {
          StatusCode: json.StatusCode,
          Data: json.Data,
        };
      } else {
        return {
          StatusCode: json.StatusCode,
          Data: false,
        };
      }
    })
    .catch((res) => {
      return res;
    });
}

// 同步法定节假日
export function SyncHoliday(payload = {}) {
  // let {  sysIDs  } = payload;
  let url = HolidayProxy + `/SyncHoliday`;

  return post(url, { ...payload }, 2)
    .then((json) => {
      if (json.StatusCode === 200) {
        return {
          StatusCode: json.StatusCode,
          Data: json.Data,
        };
      } else {
        return {
          StatusCode: json.StatusCode,
          Data: false,
        };
      }
    })
    .catch((res) => {
      return res;
    });
}
