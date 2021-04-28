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
import { Input, DatePicker } from "antd";
import { LgModal, Tips } from "../../../../../../common";
import "./index.scss";
import moment from "moment";
import "moment/locale/zh-cn";
import { autoAlert } from "../../../../../../common/js/public.js";
import { Scrollbars } from "react-custom-scrollbars";
import locale from "antd/es/date-picker/locale/zh_CN";
import { AddHoliday } from "../../api";
const { RangePicker } = DatePicker;
function HolidayModal(props, ref) {
  const {
    visible,
    type,
    onModalCancel,
    onModalOk,
    onModalDelete,
    ...other
  } = props;
  const { holidayData } = other;
  const { HolidayID } = holidayData || {};
  const [Visible, setVisible] = useState(false);
  let DateRef = useRef({});
  useEffect(() => {
    console.log(visible);
    setVisible(visible);
  }, [visible]);
  const { TypeName } = useMemo(() => {
    //   默认添加
    return {
      TypeName: type === "edit" ? "编辑" : "新增",
    };
  }, [type]);
  //   关闭
  const OnModalCancel = useCallback(() => {
    typeof onModalCancel === "function" && onModalCancel();
    setVisible(false);
  }, [onModalCancel]);
  //   删除
  const OnModalDelete = useCallback(() => {
    let date = DateRef.current.getDate(true);
    onModalDelete({ holidayID: HolidayID, workDays: date.workDays });
  }, [onModalDelete, HolidayID]);
  //   提交
  const OnModalOk = useCallback(() => {
    let date = DateRef.current.getDate();
    console.log(date);
    if (date) {
      //   AddHoliday(date).then((res) => {
      //     if (res.StatusCode === 200) {
      onModalOk(date, () => {});
      //     }
      //   });
    }

    // OnModalCancel();
  }, [onModalOk]);
  console.log(type);
  return (
    <LgModal
      type="1"
      onCancel={OnModalCancel}
      title={TypeName + "节假日"}
      width={"641px"}
      height={320}
      footer={
        <div className="my-footer">
          {type === "edit" && (
            <span className={"btn btn-modal-delete"} onClick={OnModalDelete}>
              删除
            </span>
          )}
          <span className={"btn btn-modal-ok"} onClick={OnModalOk}>
            确定
          </span>
          <span className={"btn btn-modal-cancel"} onClick={OnModalCancel}>
            取消
          </span>
        </div>
      }
      getContainer={false}
      style={{ zIndex: 2003 }}
      className={"HolidayModal"}
      destroyOnClose={true}
      // maskStyle={{zIndex:'2001!important'}}
      visible={visible !== undefined ? visible : Visible}
    >
      <HolidaySet ref={DateRef} {...other}></HolidaySet>
    </LgModal>
  );
}
const HolidaySet = memo(
  forwardRef(function (props, ref) {
    const {
      holidayData,
      termRange,
      workdayDate,
      holiday,
      workday,
      onSelectWorkDayClick,
    } = props;
    const { HolidayName, HolidayStartDate, HolidayEndDate, HolidayID } =
      holidayData || {};
    // 补班日会修改
    const [WorkdayDate, setWorkdayDate] = useState(workdayDate || {});
    // 以被补课日期为键
    const Workday = useMemo(() => {
      let date = {};
      if (WorkdayDate) {
        for (let k in WorkdayDate) {
          if (WorkdayDate[k] instanceof Array) {
            WorkdayDate[k].forEach((c) => {
              date[c] = k;
            });
          } else {
            date[WorkdayDate[k]] = k;
          }
        }
      }
      return date;
    }, [WorkdayDate]);
    // 获取在编辑的时候已选择的节假日
    const oldHoliday = useMemo(() => {
      let date = {};
      if (HolidayStartDate && HolidayEndDate) {
        let OldHolidayDiff =
          moment(HolidayEndDate).diff(moment(HolidayStartDate), "day") + 1;
        for (let i = 0; i < OldHolidayDiff; i++) {
          let Date = moment(HolidayStartDate)
            .add(i, "days")
            .format("YYYY-MM-DD");
          date[Date] = true;
        }
      }
      return date;
    }, [HolidayStartDate, HolidayEndDate]);
    // 名称
    const [Name, setName] = useState(HolidayName || "");
    const [NameTipsVivible, setNameTipsVivible] = useState(false);
    const [NameTips, setNameTips] = useState("节假日名称不能为空");
    const onNameChange = useCallback((e) => {
      setName(e.target.value);
    }, []);
    const onNameBlur = useCallback((e) => {
      let value = e.target.value;
      if (!value) {
        setNameTips("节假日名称不能为空");
        setNameTipsVivible(true);
        return false;
      }
      let test = /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,10}$/.test(
        value
      );
      if (!test) {
        setNameTips("输入的节假日名称格式有误");
        setNameTipsVivible(true);
      } else {
        setNameTipsVivible(false);
      }
      return test;
    }, []);
    // 起止时间
    const [StartDate, setStartDate] = useState(HolidayStartDate || "");
    const [EndDate, setEndDate] = useState(HolidayEndDate || "");
    const [DateTipsVivible, setDateTipsVivible] = useState(false);
    const [DateTips, setDateTips] = useState("请选择假期起止时间");
    const onDateChange = useCallback(
      (dates, dateString) => {
        //   setName(e.target.value);
        //   console.log(dates, dateString);
        let start = dates[0];
        let end = dates[1];

        //   可能中间有已经选择了的日期
        //   获取在休假期间的补班日
        let DayDiff = end.diff(start, "day") + 1;

        let isOver = false;

        // if(HolidayStartDate && HolidayEndDate&&start>=moment(HolidayStartDate)&&end<=moment(HolidayEndDate)){
        //     isOver = false
        // }
        for (let i = 0; i < DayDiff; i++) {
          let Date = moment(start).add(i, "days").format("YYYY-MM-DD");
          //   把节假日和补班的排除
          if ((Workday[Date] || holiday[Date]) && !oldHoliday[Date]) {
            isOver = true;
            break;
            // 对编辑的不做限制
          }
        }
        if (isOver) {
          autoAlert({
            type: "error",
            autoHide: () => {},
            title: "选择的日期中包含了节假日或补班日",
          });
          //   setDateTips("所选择的日期中包含了节假日或补班日，请重新选择");
          //   setDateTipsVivible(true);
        } else if (dateString[0] && dateString[1]) {
          setWorkdayDate(workdayDate);
          setStartDate(dateString[0]);
          setEndDate(dateString[1]);
          setDateTipsVivible(false);
        }
      },
      [holiday, Workday, oldHoliday]
    );
    //  禁止选择的时间
    const disabledDate = useCallback(
      (date) => {
        let format = "YYYY-MM-DD";
        let day = date.format(format);
        let allow = false;
        //学期内
        if (termRange instanceof Array && termRange.length > 0) {
          termRange.forEach((c, i) => {
            if (i === 0) {
              allow = allow || date < moment(c);
            } else if (i === 1) {
              allow = allow || date > moment(c);
            }
          });
        }
        //已经是节假日或补班
        if (
          ((holiday[day] || Workday[day]) && !oldHoliday[day]) ||
          moment() > date
        ) {
          allow = true;
        }
        return allow;
      },
      [termRange, holiday, Workday, oldHoliday]
    );
    const WorkdayList = useMemo(() => {
      if (!WorkdayDate) {
        return [];
      }
      //   获取在休假期间的补班日
      let DayDiff = moment(EndDate).diff(moment(StartDate), "day") + 1;
      let DayList = [];
      console.log(WorkdayDate);
      for (let i = 0; i < DayDiff; i++) {
        let Date = moment(StartDate).add(i, "days").format("YYYY-MM-DD");
        if (WorkdayDate[Date])
          WorkdayDate[Date] instanceof Array &&
            WorkdayDate[Date].forEach((c) => {
              DayList.push({ Date: c, ExchangeDate: Date });
            });
      }
      //   console.log(DayList, DayDiff, workdayDate);

      return DayList;
    }, [WorkdayDate, StartDate, EndDate]);
    // 删除补班
    const DeleteWorkday = useCallback(
      (dates) => {
        console.log(dates, WorkdayDate);
        let date = {};
        if (WorkdayDate) {
          for (let k in WorkdayDate) {
            let d = [];
            WorkdayDate[k].forEach((c) => {
              if (c !== dates["Date"]) {
                d.push(c);
              }
            });
            date[k] = d;
            // if (WorkdayDate[k] !== dates["Date"]) {
            //   date[k] = WorkdayDate[k];
            // }
          }
        }
        setWorkdayDate(date);
      },
      [WorkdayDate]
    );

    useImperativeHandle(ref, () => ({
      getDate: (noCheck) => {
        if (onNameBlur({ target: { value: Name } }) && StartDate && EndDate) {
          let newDate= {}
          let OldHolidayDiff =
          moment(StartDate).diff(moment(EndDate), "day") + 1;
        for (let i = 0; i < OldHolidayDiff; i++) {
          let Date = moment(StartDate)
            .add(i, "days")
            .format("YYYY-MM-DD");
            newDate[Date] = true;
        }
          let workdays = [];
          let holidays = [];
          for (let k in Workday) {
            // 排除是旧的节假日然后在新的中又不存在
            if (!(oldHoliday[Workday[k]]&&!newDate[Workday[k]])) {
              workdays.push(k);
              holidays.push(Workday[k]);
            }
          }
          // console.log(oldHoliday,newDate,Workday,workdays,holidays)

          return Object.assign(
            {},
            {
              holidayName: Name,
              startDate: StartDate,
              endDate: EndDate,
              workdays: workdays.join(","),
              holidays: holidays.join(","),
            },
            HolidayID ? { holidayID: HolidayID } : {}
          );
        } else {
          if (!StartDate || !EndDate) {
            setDateTipsVivible(true);
          }
          return false;
        }
      },
    }));
    return (
      <div className="HolidaySet">
        <table>
          <thead>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>节假日名称:</td>
              <td>
                <Tips
                  visible={NameTipsVivible}
                  title={NameTips}
                  getPopupContainer={(e) => e.parentNode}
                  autoAdjustOverflow={false}
                >
                  <Input
                    className="holidayName"
                    maxLength={10}
                    onChange={onNameChange}
                    value={Name}
                    onBlur={onNameBlur}
                  ></Input>
                </Tips>
              </td>
            </tr>
            <tr>
              <td>假期起止时间:</td>
              <td>
                <Tips
                  visible={DateTipsVivible}
                  title={DateTips}
                  getPopupContainer={(e) => e.parentNode}
                  autoAdjustOverflow={false}
                >
                  <RangePicker
                    allowClear={false}
                    className={"holidayDate"}
                    locale={locale}
                    onChange={onDateChange}
                    value={[
                      StartDate ? moment(StartDate) : null,
                      EndDate ? moment(EndDate) : null,
                    ]}
                    disabledDate={disabledDate}
                  ></RangePicker>
                </Tips>
              </td>
            </tr>
            <tr>
              <td className="top">补班日期选择:</td>
              <td>
                <div className="select-workday-box">
                  <Scrollbars>
                    <p className={"workday-content"}>
                      {WorkdayList instanceof Array && WorkdayList.length > 0
                        ? WorkdayList.map((c, i) => {
                            let { Date, ExchangeDate } = c;
                            let title = Date + "(补" + ExchangeDate + ")";
                            return (
                              <span className="workday-bar" key={Date}>
                                <span title={title}>{title}</span>
                                <i
                                  className="delete"
                                  onClick={DeleteWorkday.bind(this, c)}
                                ></i>
                              </span>
                            );
                          })
                        : "请选择..."}
                    </p>
                  </Scrollbars>
                  <div className="workday-handle-box">
                    <span
                      className="btn btn-edit-workday"
                      onClick={() => {
                        if (!StartDate || !EndDate) {
                          setDateTipsVivible(true);
                          return;
                        }
                        let DayDiff =
                          moment(EndDate).diff(moment(StartDate), "day") + 1;
                        let DayList = {};
                        for (let i = 0; i < DayDiff; i++) {
                          let Date = moment(StartDate)
                            .add(i, "days")
                            .format("YYYY-MM-DD");
                          DayList[Date] = Date;
                        }
                        onSelectWorkDayClick({
                          RangeDate: [StartDate, EndDate],
                          WorkdayDate,
                          Workday,
                          DayList,
                          Callback: (dates) => {
                            console.log(Workday, WorkdayDate, dates);
                            setWorkdayDate(dates);
                          },
                        });
                      }}
                    >
                      编辑
                    </span>
                    <span
                      className="btn btn-clear-workday"
                      onClick={() => {
                        let date = {};
                        if (WorkdayDate) {
                          date = { ...WorkdayDate };
                          WorkdayList instanceof Array &&
                            WorkdayList.forEach((c, i) => {
                              if (date[c.ExchangeDate]) {
                                delete date[c.ExchangeDate];
                              }
                            });
                        }
                        setWorkdayDate(date);
                      }}
                    >
                      清空
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>{" "}
      </div>
    );
  })
);
export default memo(forwardRef(HolidayModal));
