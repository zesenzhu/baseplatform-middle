import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  memo,
  useReducer,
  forwardRef,
  useCallback,
  useContext,
  createContext,
} from "react";
import { Calendar, Tooltip } from "antd";
import moment from "moment";
import "./index.scss";
function LgCalendar(props, ref) {
  const {
    width,
    type,
    month,
    className,
    holidayForDay,
    holiday,
    workday,
    onHolidayClick,
    onWorkdayClick,
    onWeekendClick,
    rangeDay, //可显示可选范围
  } = props;
  const { FullMonth, Month, MonthStartDay, MonthEndDay } = useMemo(() => {
    // console.log(moment(new Date()).format("YYYY-MM"));
    let date = moment(month || new Date());
    let current = moment(new Date());
    return {
      FullMonth: date.format("YYYY-MM"),
      Month: date.format("MM"),
      CurrentMonth: current.format("MM"),
      MonthEndDay: moment(date).endOf("month"),
      MonthStartDay: moment(date).startOf("month"),
    };
  }, [month]);
  const SolarHoliday = useCallback((month, date) => {
    if (month === 0 && date === 1) return "元旦";
    // if (month === 1 && date === 13) return "除夕";
    if (month === 1 && date === 14) return "情人节";
    // if (month === 2 && date === 1) return "国际海豹日";
    // if (month === 2 && date === 8) return "国际劳动妇女节/中国保护母亲河日";
    if (month === 2 && date === 12) return "植树节";

    if (month === 3 && date === 1) return "愚人节";
    if (month === 3 && date === 5) return "清明节";
    if (month === 4 && date === 1) return "劳动节";
    if (month === 4 && date === 4) return "青年节";
    if (month === 4 && date === 9) return "母亲节";

    if (month === 5 && date === 1) return "儿童节";
    // if (month === 5 && date === 26) return "国际禁毒日";
    if (month === 6 && date === 1) return "建党节";

    if (month === 7 && date === 1) return "建军节";
    // if (month === 7 && date === 15) return "日本无条件投降日/世纪婚纱日";
    // if (month === 7 && date === 16) return "七夕";
    if (month === 8 && date === 10) return "教师节";

    // if (month === 9 && date === 20) return "世界厨师日";
    // if (month === 9 && date === 22) return "世界传统医药日";
    // if (month === 9 && date === 24) return "联合国日/世界发展信息日";
    // if (month === 9 && date === 25)
    //   return "世界骨质疏松日/抗美援朝纪念日/环卫工人节";
    // if (month === 9 && date === 31) return "世界勤俭日/中国男性健康日";
    if (month === 9 && date === 1) return "国庆节";

    if (month === 11 && date === 24) return "平安夜";
    if (month === 11 && date === 25) return "圣诞节";
    return false;
  }, []);
  // 字数省略
  const moreChar = useCallback((data) => {
    if (!data) {
      return "";
    }
    if (data.length <= 3) {
      return data;
    } else {
      return data.substr(0, 2) + "...";
    }
  }, []);
  const dateFullCellRender = useCallback(
    (date) => {
      let Dday = date.format("DD");
      let Mmonth = date.format("MM");
      let dday = date.format("D");
      let mmonth = date.format("M");
      let day = date.format("YYYY-MM-DD");
      // 获取星期几:0-6。
      let Day = date.day();
      let isWeekend = Day === 6 || Day === 0;
      // 是否有默认的节日
      let solarHoliday = SolarHoliday(mmonth - 1, dday - 0);
      // 是否是自定义节假日
      let customHoliday = holiday[day];
      let customHolidayForDay = holidayForDay[day];
      // 是否是补班
      let workDay = workday[day];
      let { firstDay, lastDay } = customHoliday || {};
      let DayName =
        (workDay && "补班") ||
        (customHolidayForDay && customHolidayForDay[0].HolidayName);
      let TipDayName = DayName || (customHoliday && customHoliday.HolidayName);
      // console.log(dday - 0, mmonth - 1, solarHoliday);
      // 过去的不让操作了，学期前和后也不让
      let isBefore = moment() > moment(day);
      //学期前和后也不让操作，禁用
      let isOutTerm =
        rangeDay instanceof Array &&
        (moment(day) < moment(rangeDay[0]) || moment(day) > moment(rangeDay[1]));
        // console.log(rangeDay,moment(rangeDay[1]),moment() > moment(rangeDay[1]))
      let CellDom = (
        <div
          className={`dateCell  ${isWeekend ? "WeekendCell" : ""} ${
            customHoliday ? "customHolidayCell" : ""
          } ${workDay ? "workDayCell" : ""}`}
          style={Object.assign(
            {},
            {
              borderRadius: `${workDay || firstDay ? "3px" : "0"} ${
                workDay || lastDay ? "3px" : "0"
              } ${workDay || lastDay ? "3px" : "0"} ${
                workDay || firstDay ? "3px" : "0"
              } `,
            },
            isOutTerm?{ cursor: "no-drop" }: isBefore ? { cursor: "auto" } : {}
          )}
          onClick={() => {
            if (isBefore||isOutTerm) {
              return;
            }
            // 如果是节假日
            let func;
            if (customHoliday) {
              func = onHolidayClick;
            } else if (workDay) {
              func = onWeekendClick;
            } else if (isWeekend) {
              func = onWeekendClick;
            }

            typeof func === "function" &&
              func({
                date,
                customHoliday,
                customHolidayForDay,
                workDay,
              });
            // 如果是周末
          }}
        >
          <span className={`day ${isWeekend ? "Weekend" : ""}`}>{Dday}</span>
          {(workDay || solarHoliday || customHolidayForDay) && (
            <span
              className={`holiday ${
                customHolidayForDay || workDay
                  ? "customHoliday"
                  : "solarHoliday"
              }`}
              style={Object.assign(
                {},

                isBefore||isOutTerm ? { cursor: "auto", textDecoration: "none" } : {}
              )}
            >
              {moreChar(DayName || solarHoliday)}
            </span>
          )}
        </div>
      );
      let len =
        customHoliday && customHoliday.HolidayList instanceof Array
          ? customHoliday.HolidayList.length
          : 0;
      let hoveToolTip =
        customHoliday || workDay ? (
          <div className="Calendar-Tooltip-box">
            <p className="TipDayName">{TipDayName}</p>
            <p className="TipDayDetails">
              {customHoliday
                ? customHoliday.HolidayList[0].Date +
                  (len > 1 ? "~" + customHoliday.HolidayList[len - 1].Date : "")
                : workDay
                ? day + " 补 " + workDay
                : ""}
            </p>
          </div>
        ) : (
          false
        );
      return Mmonth === Month ? (
        hoveToolTip ? (
          <Tooltip
            overlayClassName={"Calendar-Tooltip"}
            placement={"top"}
            arrowPointAtCenter={true}
            color={"#fff"}
            trigger={["hover"]}
            title={hoveToolTip}
          >
            {CellDom}
          </Tooltip>
        ) : (
          CellDom
        )
      ) : (
        <></>
      );
    },
    [
      SolarHoliday,
      holiday,
      holidayForDay,
      workday,
      moreChar,
      Month,
      onHolidayClick,
      onWorkdayClick,
      onWeekendClick,
      rangeDay,
    ]
  );

  return (
    <div
      className={`LgCalendar ${className || ""}`}
      style={{ width: width || 354 }}
    >
      <Calendar
        validRange={[MonthStartDay, MonthEndDay]}
        fullscreen={false}
        defaultValue={moment(FullMonth)}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          return (
            <div title={FullMonth} className="LgCalendar-header">
              {FullMonth}
            </div>
          );
        }}
        dateFullCellRender={dateFullCellRender}
      ></Calendar>
    </div>
  );
}

export default memo(forwardRef(LgCalendar));
