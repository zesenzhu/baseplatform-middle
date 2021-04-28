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
  useImperativeHandle,
} from "react";
import { Calendar, Tooltip } from "antd";
import { DropDown } from "../../../../../../common";
import moment from "moment";
import { autoAlert } from "../../../../../../common/js/public.js";
import "./index.scss";
function WorkCaledar(props, ref) {
  const {
    width,
    type,
    defaultDate,
    className,
    holidayForDay,
    holiday,
    workday,
    rangeDate,
    onSelectClick,
    onLeftClick,
    onRightClick,
    onWeekendClick,
    currentMonth, //指定显示的月份
  } = props;

  const { SelectWeekend } = useMemo(() => {
    // 默认选择要被补课的日期,left为补课的日期，right为被补的日期
    return {
      SelectWeekend: type === "left" ? true : false,
    };
  }, [type]);
  const [SelectDate, setSelectDate] = useState(defaultDate);
  const [CurrentMonth, setCurrentMonth] = useState(() => {
    return currentMonth ? moment(currentMonth).month : moment().month();
  });

  const {
    FullMonth,
    Month,
    MonthStartDay,
    MonthEndDay,
    FullDay,
    MomentDay,
  } = useMemo(() => {
    // console.log(moment(new Date()).format("YYYY-MM"));
    let date = moment(defaultDate || new Date());
    let current = moment(new Date());
    setCurrentMonth(date.month());
    return {
      FullMonth: date.format("YYYY-MM"),
      FullDay: date.format("YYYY-MM-DD"),
      MomentDay: date,
      Month: date.month(),
      CurrentMonth: current.format("MM"),
      MonthEndDay: moment(date).endOf("month"),
      MonthStartDay: moment(date).startOf("month"),
    };
  }, [defaultDate]);
  //计算是否可选
  const canSelect = useCallback(
    (date) => {
      let day = date.format("YYYY-MM-DD");
      // 获取星期几:0-6。
      let Day = date.day();
      let isWeekend = Day === 6 || Day === 0;

      // 是否是自定义节假日
      let customHoliday = holiday[day];
      // let customHolidayForDay = holidayForDay[day];
      // 是否是补班
      let workDay = workday[day];
      return (
        (SelectWeekend &&customHoliday) ||
        workDay ||
        (!SelectWeekend && isWeekend) ||
        (SelectWeekend && !isWeekend)
      );
    },
    [holiday, workday, SelectWeekend]
  );
  useEffect(() => {
    setCurrentMonth(moment(currentMonth).month());
  }, [currentMonth]);
  const dateFullCellRender = useCallback(
    (date) => {
      let Dday = date.format("DD");
      let Mmonth = date.month();
      let dday = date.format("D");
      let mmonth = date.format("M");
      let day = date.format("YYYY-MM-DD");
      // 获取星期几:0-6。
      let Day = date.day();
      let isWeekend = Day === 6 || Day === 0;

      // 是否是自定义节假日
      let customHoliday = holiday[day];
      // let customHolidayForDay = holidayForDay[day];
      // 是否是补班
      let workDay = workday[day];
      // 禁止选择
      let canSelectDay = canSelect(date);

      // console.log(dday - 0, mmonth - 1, solarHoliday);
      let CellDom = (
        <div
          className={`dateCell    ${canSelectDay ? "disabled-select" : ""} ${
            SelectDate === day ? "SelectDate" : ""
          }  `}
          onClick={() => {
            if (canSelectDay) {
              return;
            }
            // 如果是节假日
            let func = onSelectClick;

            // if (customHoliday) {
            //   func = onHolidayClick;
            // } else if (workDay) {
            //   func = onWorkdayClick;
            // } else
            // if (SelectWeekend) {
            //   func = onLeftClick;
            // } else {
            //   func = onRightClick;
            // }

            if (typeof func === "function") {
              console.log(day);
              func({
                date,
                customHoliday,
                day,
                // customHolidayForDay,
                callback: () => {
                  setSelectDate(day);
                },
              });
            } else {
              setSelectDate(day);
            }
            // 如果是周末
          }}
        >
          <span className={`day`}>{Dday}</span>
        </div>
      );

      return CurrentMonth === Mmonth ? CellDom : <></>;
    },
    [
      // Month,
      CurrentMonth,

      holiday,
      canSelect,
      onSelectClick,
      // holidayForDay,
      // onHolidayClick,
      // onLeftClick,
      // onRightClick,
      workday,
      SelectDate,
    ]
  );
  const YearList = useMemo(() => {}, []);
  // 禁止选择
  const DisabledDate = useCallback(
    (current) => {
      if (rangeDate instanceof Array) {
        let start = rangeDate[0] ? moment(rangeDate[0]) : moment();
        let end = rangeDate[1] ? moment(rangeDate[1]) : moment();
        return start > current || current > end;
      }else{
        return false
      }
    },
    [rangeDate]
  );
  let getOnChange = () => {};
  
  console.log(rangeDate, currentMonth, CurrentMonth, holiday, workday);
  return (
    <div
      className={`WorkCaledar ${className || ""}`}
      style={{ width: width || 354 }}
    >
      <Calendar
        // validRange={[MonthStartDay, MonthEndDay]}
        fullscreen={false}
        // value
        defaultValue={currentMonth ? moment(currentMonth) : MomentDay}
        // value={currentMonth ? moment(currentMonth) : MomentDay}
        // defaultValue={moment(FullMonth)}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          // let year
          getOnChange = onChange;
          const month = value.month();

          const year = value.year();
          const start = 0;
          const end = 12;
          const monthOptions = [];

          const current = value.clone();
          const localeData = value.localeData();
          const months = [];
          for (let i = 0; i < 12; i++) {
            current.month(i);
            months.push(localeData.monthsShort(current));
          }
          for (let index = start; index < end; index++) {
            monthOptions.push({ value: index, title: index + 1 + "月" });
          }

          let yearList = [];
          for (let i = year - 5; i < year + 5; i += 1) {
            yearList.push({ value: i, title: i + "年" });
          }
          return (
            <div className="WorkCaledar-header">
              <span
                className="control-btn control-pre pre-year"
                onClick={() => {
                  let v = value.clone();
                  const now = v.year(v.subtract(1, "years").year());
                  onChange(now);
                }}
              ></span>
              <span
                className="control-btn control-pre pre-month"
                onClick={() => {
                  let v = value.clone();
                  const now = v.month(v.subtract(1, "months").month());
                  setCurrentMonth(now.month());
                  onChange(now);
                }}
              ></span>
              <div className="control-date-box">
                <DropDown
                  width={98}
                  // title={"用户对象:"}
                  dropSelectd={{ value: year, title: year + "年" }}
                  dropList={yearList}
                  height={120}
                  style={{ zIndex: 400 }}
                  onChange={(e) => {
                    const now = value.clone().year(e.value);
                    onChange(now);
                  }}
                ></DropDown>
                <DropDown
                  width={98}
                  // title={"用户对象:"}
                  dropSelectd={{ value: month, title: month + 1 + "月" }}
                  dropList={monthOptions}
                  height={120}
                  style={{ zIndex: 400 }}
                  onChange={(e) => {
                    const newValue = value.clone();
                    newValue.month(parseInt(e.value, 10));
                    setCurrentMonth(newValue.month());

                    onChange(newValue);
                  }}
                ></DropDown>
              </div>
              <span
                className="control-btn control-next next-month"
                onClick={() => {
                  let v = value.clone();
                  const now = v.month(v.add(1, "months").month());
                  setCurrentMonth(now.month());

                  onChange(now);
                }}
              ></span>
              <span
                className="control-btn control-next next-year"
                onClick={() => {
                  let v = value.clone();
                  const now = v.year(v.add(1, "years").year());
                  onChange(now);
                }}
              ></span>
            </div>
          );
        }}
        dateFullCellRender={dateFullCellRender}
        disabledDate={DisabledDate}
      ></Calendar>
      <div
        className="control-now"
        onClick={() => {
          let date = moment();
          let can = canSelect(date)||DisabledDate(date);
          console.log(can);
          if (can) {
            autoAlert({
              type: "error",
              autoHide: () => {},
              title:
                "今天不可以选择为" + (type === "left" ? "补班日" : "被补班日"),
            });
          } else {
            getOnChange(date);
            setCurrentMonth(date.month());
            let day = date.format("YYYY-MM-DD");
            // 是否是自定义节假日
            let customHoliday = holiday[day];
            // setSelectDate(date.format("YYYY-MM-DD"));
            onSelectClick({
              date,
              customHoliday,
              day,
              // customHolidayForDay,
              callback: () => {
                setSelectDate(day);
              },
            });
          }
        }}
      >
        今天
      </div>
    </div>
  );
}

export default memo(forwardRef(WorkCaledar));
