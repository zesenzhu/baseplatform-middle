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
import { connect } from "react-redux";
import {
  LgModal,
  Loading,
  DropDown,
  Search,
  Empty,
  PagiNation,
  Alert,
  CheckBox,
} from "../../../../common";
import { autoAlert } from "../../../../common/js/public.js";
import { Context, reducer, initState } from "./context";
import {
  GetHolidayOfTerm,
  SetWorkday,
  AddHoliday,
  SetHoliday,
  DeleteWorkday,
  DeleteHoliday,
  SyncHoliday,
} from "./api";
import { ConfigProvider } from 'antd';
// import Calendar from './component/Calendar';
import Calendar from "./component/Calendar";
import HolidayModal from "./component/HolidayModal";
import WorkdayModal from "./component/WorkdayModal";
import "./scss/index.scss";
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';


moment.locale('zh-cn');

function Holiday(props, ref) {
  const { dispatch } = props;
  const [state, Dispatch] = useReducer(reducer, initState);
  const { HolidayData, ContentLoading } = state;
  const {
    MonthList,
    WorkDayData,
    HolidayDataForDay,
    HolidayDataForEveryDay,
    Holidays,
    Workdays,
    WorkDayDataForExchange,
    TermStartDate,
    TermEndDate,
    AllDays,
  } = HolidayData;
  const [HolidayModalVisible, setHolidayModalVisible] = useState(false);
  const [HolidayModalType, setHolidayModalType] = useState("add");
  // 控制新增编辑节假日数据
  const [SelectHolidayData, setSelectHolidayData] = useState(null);
  // 补课
  const [WorkdayModalVisible, setWorkdayModalVisible] = useState(false);
  const [WorkdayModalType, setWorkdayModalType] = useState("add");

  const [SelectWorkdayData, setSelectWorkdayData] = useState(null);
  // 因为补课的日期中休假日和补课日是会变的，所以要动态存
  const [HolidayForWorkdayModal, setHolidayForWorkdayModal] = useState({});
  const [WorkdayForWorkdayModal, setWorkdayForWorkdayModal] = useState({});
  // 挂载后请求
  useEffect(() => {
    const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
    Dispatch({ type: "loginMsg", data: UserInfo });
    ReloadDate();
    // setTimeout(()=>{reloadList({})},5000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 控制刷新

  const ReloadDate = useCallback(() => {
    Dispatch({ type: "contentLoading", data: true });
    // console.log(window.parent)
    // try {
    //   window.parent.location.reload();
    // } catch (e) {}
    GetHolidayOfTerm().then((res) => {
      // if (res.StatusCode === 200) {
      console.log(res);

      Dispatch({ type: "holidayData", data: res.Data });
      Dispatch({ type: "contentLoading", data: false });
      // }else{

      // }
    });
  }, []);
  // 节假日编辑点击
  const onHolidayClick = useCallback(
    ({ date, customHoliday, customHolidayForDay }) => {
      console.log(date, customHoliday, customHolidayForDay);
      setHolidayModalType("edit");
      setSelectHolidayData({
        HolidayID: customHoliday.HolidayID,
        HolidayName: customHoliday.HolidayName,
        HolidayStartDate: customHoliday.StartDate,
        HolidayEndDate: customHoliday.EndDate,
      });
      setHolidayModalVisible(true);
    },
    []
  );
  const onHolidayModalCancel = useCallback(() => {
    // setHolidayModalType("add");
    setSelectHolidayData({});
    setHolidayModalVisible(false);
  }, []);

  const onWorkdayModalCancel = useCallback(() => {
    // setWorkdayModalType("add");
    setSelectWorkdayData({});
    setWorkdayModalVisible(false);
  }, []);
  const onWorkdayModalOk = useCallback(
    ({ date, exchangeDate }, callback, error) => {
      SetWorkday({
        date: moment(date).format("YYYY-MM-DD"),
        exchangeDate: moment(exchangeDate).format("YYYY-MM-DD"),
      }).then((res) => {
        if (res.StatusCode === 200) {
          autoAlert({
            type: "success",
            autoHide: () => {},
            title: "操作成功",
          });
          ReloadDate();
          typeof callback === "function" && callback();
          onWorkdayModalCancel();
        } else {
          typeof error === "function" && error();
        }
      });
    },
    [onWorkdayModalCancel, ReloadDate]
  );
  const onHolidayModalOk = useCallback(
    (date, callback, error) => {
      let func = AddHoliday;
      if (date.holidayID) {
        func = SetHoliday;
      }
      func(date).then((res) => {
        if (res.StatusCode === 200) {
          autoAlert({
            type: "success",
            autoHide: () => {},
            title: "操作成功",
          });
          ReloadDate();
          typeof callback === "function" && callback();
          onHolidayModalCancel();
        } else {
          typeof error === "function" && error();
        }
      });
    },
    [onHolidayModalCancel, ReloadDate]
  );
  const onSyncHolidayClick = useCallback(
    (syncType = 1) => {
      let func = SyncHoliday;
      Dispatch({ type: "contentLoading", data: true });

      func({
        syncType,
        TermStartDate: TermStartDate,
        TermEndDate: TermEndDate,
      }).then((res) => {
        if (res.StatusCode === 200) {
          autoAlert({
            type: "success",
            autoHide: () => {},
            title: "操作成功",
          });
          typeof callback === "function" && callback();
        }
        ReloadDate();
      });
    },
    [TermStartDate, ReloadDate, TermEndDate]
  );
  const onHolidayModalDelete = useCallback(
    (date, callback, error) => {
      let func = DeleteHoliday;

      func(date).then((res) => {
        if (res.StatusCode === 200) {
          autoAlert({
            type: "success",
            autoHide: () => {},
            title: "操作成功",
          });
          ReloadDate();
          typeof callback === "function" && callback();
          onHolidayModalCancel();
        } else {
          typeof error === "function" && error();
        }
      });
    },
    [ReloadDate, onHolidayModalCancel]
  );
  const onWorkdayModalDelete = useCallback(
    (date, callback, error) => {
      let func = DeleteWorkday;

      func(date).then((res) => {
        if (res.StatusCode === 200) {
          autoAlert({
            type: "success",
            autoHide: () => {},
            title: "操作成功",
          });
          ReloadDate();
          typeof callback === "function" && callback();
          onWorkdayModalCancel();
        } else {
          typeof error === "function" && error();
        }
      });
    },
    [ReloadDate, onWorkdayModalCancel]
  );
  const onWeekendClick = useCallback(
    ({ date, workDay }) => {
      setWorkdayModalType("edit");
      setHolidayForWorkdayModal(HolidayDataForEveryDay);
      setWorkdayForWorkdayModal(WorkDayData);
      setSelectWorkdayData({
        OnOk: onWorkdayModalOk,
        WorkLeftDate: date,
        WorkRightDate: workDay || "",
        CurrentLeftMonth: moment(date),
        CurrentRightMonth: moment(workDay),
      });
      setWorkdayModalVisible(true);
    },
    [HolidayDataForEveryDay, WorkDayData, onWorkdayModalOk]
  );
  const onSelectWorkDayClick = useCallback(
    ({ RangeDate, WorkdayDate, Workday, Callback, DayList }) => {
      setWorkdayModalType("add");
      setHolidayForWorkdayModal({ ...DayList, ...HolidayDataForEveryDay });
      setWorkdayForWorkdayModal(Workday);
      setSelectWorkdayData({
        WorkRightRangeDate: RangeDate,
        // CurrentLeftMonth:moment(date) ,
        CurrentRightMonth: moment(RangeDate[0]),
        // WorkLeftRangeDate: RangeDate,
        OnOk: ({ date, exchangeDate }, callback) => {
          // WorkdayDate
          let d = { ...WorkdayDate };
          if (d[exchangeDate]) {
            d[exchangeDate].push(date);
          } else {
            d[exchangeDate] = [date];
          }
          Callback(d);
          callback();
        },
      });
      setWorkdayModalVisible(true);
    },
    [HolidayDataForEveryDay]
  );
  // 同步
  const [SyncDateVisible, setSyncDateVisible] = useState(false);
  const [SyncDateType, setSyncDateType] = useState(2);
  const onSyncDateClose = useCallback(() => {
    setSyncDateVisible(false);
  }, []);
  const onSyncDateOk = useCallback(() => {
    onSyncHolidayClick(SyncDateType);
    onSyncDateClose();
    setSyncDateType(2);
  }, [onSyncHolidayClick, onSyncDateClose, SyncDateType]);

  // const onSyncDateCancel = useCallback(
  //   () => {

  //   },
  //   [],
  // )
  return (
    <ConfigProvider locale={locale}>
    <Context.Provider value={{ state, Dispatch }}>
      <Loading
        spinning={!HolidayData || ContentLoading}
        tip={"请稍候..."}
        opacity={false}
      >
        <div className="Holiday-content">
          <p className="Holiday-content-top">
            <span className="term-day-msg">
              本学期共<span>{AllDays || 0}</span>天，从
              <span>{TermStartDate}</span>开始，至<span>{TermEndDate}</span>
              结束， 已选择<span>{Holidays || 0}</span>天为节假日，
              <span>{Workdays || 0}</span>天为补班日
            </span>

            <span
              className="btn-add btn-add-holiday"
              onClick={() => {
                setHolidayModalType("add");
                setHolidayModalVisible(true);
              }}
            >
              新增节假日
            </span>
            <span
              className="btn-add btn-add-remedial"
              onClick={() => {
                setWorkdayModalType("add");
                setHolidayForWorkdayModal(HolidayDataForEveryDay);
                setWorkdayForWorkdayModal(WorkDayData);
                setSelectWorkdayData({
                  OnOk: onWorkdayModalOk,
                  CurrentLeftMonth: moment(),
                  // CurrentRightMonth: moment(workDay),
                });
                setWorkdayModalVisible(true);
              }}
            >
              新增补班日
            </span>
            <span
              className="btn-link btn-link-sync"
              onClick={() => {
                setSyncDateVisible(true);
                // autoAlert({
                //   type: "btn-query",
                //   // autoHide: () => {},
                //   title: "请选择同步方式",
                //   onOk:()=>{},
                //   onCancel:()=>{},
                // });
                // onSyncHolidayClick();
              }}
            >
              同步法定假日
            </span>
          </p>
          <div className="Holiday-content-center">
            <div className="day-msg-box">
              <span className="day-tip day-tip-holiday">节假日</span>
              <span className="day-tip day-tip-workday">补班日</span>
            </div>
            <div className="Holiday-calendar-box">
              {MonthList instanceof Array ? (
                MonthList.map((c, i) => {
                  return (
                    <Calendar
                      key={c}
                      className="Holiday-calendar-box-calendar"
                      month={c}
                      rangeDay={[TermStartDate,TermEndDate]}
                      holidayForDay={HolidayDataForDay}
                      holiday={HolidayDataForEveryDay}
                      workday={WorkDayData}
                      onWeekendClick={onWeekendClick}
                      onHolidayClick={onHolidayClick}
                    ></Calendar>
                  );
                })
              ) : MonthList !== null ? (
                <></>
              ) : (
                <Empty
                  title={"暂无节假日"}
                  type="4"
                  style={{ marginTop: "100px" }}
                ></Empty>
              )}
            </div>
          </div>
        </div>
      </Loading>
      <HolidayModal
        type={HolidayModalType}
        visible={HolidayModalVisible}
        onModalCancel={onHolidayModalCancel}
        workdayDate={WorkDayDataForExchange}
        termRange={[TermStartDate, TermEndDate]}
        holiday={HolidayDataForEveryDay}
        onModalOk={onHolidayModalOk}
        onSelectWorkDayClick={onSelectWorkDayClick}
        // workday={WorkDayData}
        onModalDelete={onHolidayModalDelete}
        holidayData={SelectHolidayData}
      ></HolidayModal>
      <WorkdayModal
        type={WorkdayModalType}
        visible={WorkdayModalVisible}
        onModalCancel={onWorkdayModalCancel}
        onModalOk={onWorkdayModalCancel}
        holiday={HolidayForWorkdayModal}
        workday={WorkdayForWorkdayModal}
        rangeDate={[TermStartDate, TermEndDate]}
        workData={SelectWorkdayData}
        onModalDelete={onWorkdayModalDelete}
      ></WorkdayModal>
      <Alert
        show={SyncDateVisible}
        title={"是否确定同步法定节假日？"}
        abstract={
          <CheckBox
            checked={SyncDateType === 1}
            onChange={() => {
              setSyncDateType(SyncDateType === 2 ? 1 : 2);
            }}
          >
            清空自定义节假日
          </CheckBox>
        }
        type={"btn-query"}
        onOk={onSyncDateOk}
        onCancel={onSyncDateClose}
        onClose={onSyncDateClose}
        cancelTitle={"再想想"}
        okTitle={"确定同步"}
      ></Alert>
    </Context.Provider>
    </ConfigProvider>
  );
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(memo(forwardRef(Holiday)));
