import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
  memo,
} from "react";

import { useSelector, useDispatch } from "react-redux";

import { Modal, Loading } from "../../../../common";

import { Calendar, Button } from "antd";

import { Scrollbars } from "react-custom-scrollbars";

import { getFestival } from "../../actions/utils";

import { SetGetHolidayInfo } from "../../actions/ApiActions";

import moment from "moment";

import "./index.scss";

import AppAlertActions from "../../actions/AppAlertActions";

import { getQueryVariable } from "../../../../common/js/disconnect";

function Holiday(props) {
  const [isInitGuide, setIsInitGuide] = useState(false);

  //月份列表
  const [monthList, setMonthList] = useState([]);

  //月份列表
  const [hasInFrame, setHasInFrame] = useState(false);

  //loading
  const [loading, setLoading] = useState(false);

  //已选择的日期

  const [selectdDate, setSelectdDate] = useState([]);

  const { SchoolID, UserID } = useSelector((state) => state.LoginUser);

  const dispatch = useDispatch();

  const SchoolIDRef = useRef(SchoolID);

  const { show, start, end, holidayList, holidayNum } = props;

  const { holidayOk, holidayCancel } = props;

  const selectdDateRef = useRef(selectdDate);

  useEffect(() => {
    if (show) {
      let startMonthMoment = moment(moment(start).format("YYYY-MM"));

      let endMonthMoment = moment(moment(end).format("YYYY-MM"));

      let startDateMoment = moment(start);

      let endDateMoment = moment(end);

      const list = [];

      let holidaylist = [];

      while (startMonthMoment.isSameOrBefore(endMonthMoment)) {
        list.push(startMonthMoment.format("YYYY-MM"));

        startMonthMoment = startMonthMoment.add(1, "M");
      }

      if (holidayList.length === 0 && holidayNum > 0) {
        while (startDateMoment.isSameOrBefore(endDateMoment)) {
          if (startDateMoment.day() === 6 || startDateMoment.day() === 0) {
            holidaylist.push(startDateMoment.format("YYYY-MM-DD"));
          }

          startDateMoment = startDateMoment.add(1, "d");
        }
      } else {
        holidaylist = holidayList;
      }

      if (getQueryVariable("iFrame")) {
        setHasInFrame(true);
      }

      selectdDateRef.current = holidaylist;

      setSelectdDate(holidaylist);

      setMonthList(list);
    }
  }, [show]);

  useEffect(() => {
    SchoolIDRef.current = SchoolID;
  }, [SchoolID]);

  useEffect(() => {
    if (getQueryVariable("isInitGuide")) {
      setIsInitGuide(true);
    }
  }, []);

  //渲染头部
  const headerRender = useCallback((i) => {
    return <div className={"canlender-title"}>{i}</div>;
  }, []);

  //渲染每一个格子

  const dateFullCellRender = (date, i) => {
    //判断是否可选
    const disabled =
      date.format("YYYY-MM") !== i ||
      date.isBefore(moment(start)) ||
      date.isAfter(moment(end));

    let contentTitle = "";

    let type = "";

    if (date.format("YYYY-MM-DD") === start && !disabled) {
      contentTitle = "开学";
    } else if (date.format("YYYY-MM-DD") === end && !disabled) {
      contentTitle = "学期结束";
    } else if (!disabled) {
      contentTitle = getFestival(date);
    }

    if (selectdDate.includes(date.format("YYYY-MM-DD")) && !disabled) {
      type = "selectd";
    }

    return (
      <div className={`ant-fullcalendar-date ${disabled ? "disabled" : ""}`}>
        <div
          onClick={
            disabled
              ? empFuc
              : (e) => dateSelect({ date, isSelectd: type === "selectd" })
          }
          className={`ant-fullcalendar-value ${type}`}
        >
          {date.format("DD")}
        </div>

        <div className="ant-fullcalendar-content">{contentTitle}</div>
      </div>
    );
  };

  const dateSelect = ({ date, isSelectd }) => {
    const dateStr = date.format("YYYY-MM-DD");

    if (isSelectd) {
      const list = Array.from(selectdDateRef.current);

      const newDateList = list.filter((i) => i !== dateStr);

      setSelectdDate(newDateList);

      selectdDateRef.current = newDateList;
    } else {
      setSelectdDate((d) => {
        const list = Array.from(d);

        list.push(dateStr);

        selectdDateRef.current = list;

        return list;
      });
    }
  };

  //空函数

  const empFuc = useCallback(() => {}, []);

  //确定

  const ok = () => {
    setLoading(true);

    const HolidayItem = selectdDateRef.current.join(",");

    SetGetHolidayInfo({
      SchoolID: SchoolIDRef.current,
      HolidayItem,
      dispatch,
    }).then((data) => {
      if (data === 0) {
        dispatch(AppAlertActions.alertSuccess({ title: "设置成功！" }));

        modalInit();

        holidayOk();
      } else {
        setLoading(false);
      }
    });
  };

  //确定

  const cancel = useCallback(() => {
    modalInit();
    holidayOk();
    // holidayCancel();
  }, []);

  //弹窗状态初始化
  const modalInit = useCallback(() => {
    setMonthList([]);

    setLoading(false);

    setSelectdDate([]);
  }, []);
  let height = hasInFrame ? 500 : 600;
  let width = 1100;
  let bigWidth = 1220;
  let rate = width / bigWidth;
  return (
    <Modal
      type={1}
      title={"设置节假日"}
      width={width}
      bodyStyle={{ height: height*rate, padding: 0 }}
      visible={show}
      mask={!isInitGuide}
      className={"set-holiday-modal"}
      // onOk={ok}

      onCancel={cancel}
      footer={null
        // <>
        //   <span className={"tips"} style={{ float: "left" }}>
        //     已选择<span style={{ color: "#ff6600" }}>{selectdDate.length}</span>
        //     天
        //   </span>

        //   <Button className={"ant-btn Button btn-small btn-green"} onClick={ok}>
        //     确定
        //   </Button>

        //   <Button
        //     className={"ant-btn Button btn-small btn-blue"}
        //     onClick={cancel}
        //   >
        //     取消
        //   </Button>
        // </>
      }
    >
      <Loading spinning={loading} tip={"加载中,请稍候..."}>
        {/* 
                <div className={"top-tips"}>请勾选非周末日期设为校内节假日(周末默认为节假日)，节假日默认情况下不会安排课程。</div>

                <Scrollbars style={{height:hasInFrame?452:552}}>

                    <ul className={"canlender-wrapper"}>

                        {

                            monthList.map(i=>{

                                return(

                                    <li key={i} className={"canlender-item"}>

                                        <Calendar  dateFullCellRender={date=>dateFullCellRender(date,i)} value={moment(i)} fullscreen={false} headerRender={e=>headerRender(i)}></Calendar>

                                    </li>

                                )

                            })

                        }

                    </ul>

                </Scrollbars> */}
        <div style={{ position: "relative", transform: `scale(${rate})` }}>
          <iframe
            title={"设置节假日"}
            width={bigWidth + "px"}
            height={height  + "px"}
            style={{
              border: "none",
              position: "absolute",
              top: 0,
              left: (-(1 - rate) / 2) * bigWidth,
            }}
            src={
              location.origin +
              "/html/systemSetting?lg_tk=" +
              getQueryVariable("lg_tk") +
              "&showBarner=0&showTop=0&showBottom=0#/MainContent/Holiday"
            }
          ></iframe>
        </div>
      </Loading>
    </Modal>
  );
}

export default memo(Holiday);
