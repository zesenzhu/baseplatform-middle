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
import WorkCaledar from "../WorkCaledar";
import { LgModal, Loading } from "../../../../../../common";
import "./index.scss";
import moment from "moment";
import { autoAlert } from "../../../../../../common/js/public.js";
import { SetWorkday } from "../../api";
function WorkdayModal(props, ref) {
  const {
    visible,
    type,
    onModalCancel,
    onModalOk,
    onModalDelete,
    ...other
  } = props;
  const [Visible, setVisible] = useState(false);
  const { workData } = other;
  const { OnOk, WorkRightDate,WorkLeftDate } = workData || {};
  const DateRef = useRef({});
  const [ModalLoading, setModalLoading] = useState(false);
  useEffect(() => {
    // console.log(visible);
    setVisible(visible);
  }, [visible]);
  const { TypeName, width, height } = useMemo(() => {
    //   默认添加
    return {
      TypeName: type === "edit" ? "选择“"+moment(WorkLeftDate).format('YYYY-MM-DD')+"”所要补班日期" : "选择补班",
      width: type === "edit" ? "420px" : "900px",
      height: type === "edit" ? 460 : 480,
    };
  }, [type,WorkLeftDate]);
  //   关闭
  const OnModalCancel = useCallback(() => {
    typeof onModalCancel === "function" && onModalCancel();
    setVisible(false);
  }, [onModalCancel]);
  //   删除
  const OnModalDelete = useCallback(() => {
    let [date] = DateRef.current.getDate(true);
    onModalDelete({ date: date });
  }, [onModalDelete]);
  //   提交
  const OnModalOk = useCallback(() => {
    let [date, exchangeDate] = DateRef.current.getDate();
    console.log(date, exchangeDate);
    if ((type !== "edit" && !date) || !exchangeDate) {
      autoAlert({
        type: "error",
        autoHide: () => {},
        title:
          "请选择" +
          (!date ? "补班日期" : "") +
          (!exchangeDate && !date ? "和" : "") +
          (!exchangeDate ? "被补班日期" : ""),
      });
      return;
    }
    setModalLoading(true);
    // SetWorkday({ date, exchangeDate }).then((res) => {
    //   if (res.StatusCode === 200) {

    typeof OnOk === "function" &&
      OnOk({ date, exchangeDate }, () => {
        setModalLoading(false);
        onModalOk();
      },()=>{
        setModalLoading(false);
      });

    //   }
    // });
  }, [onModalOk, OnOk, type]);
  return (
    <LgModal
      type="1"
      onCancel={OnModalCancel}
      title={TypeName}
      width={width}
      height={height}
      //   onOk={OnModalOk}
      footer={
        <div className="my-footer">
          {WorkRightDate && (
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
      className={"WorkdayModal"}
      destroyOnClose={true}
      // maskStyle={{zIndex:'2001!important'}}
      visible={visible !== undefined ? visible : Visible}
    >
      {" "}
      <Loading spinning={ModalLoading} tip={"请稍候..."} opacity={0.5}>
        <WorkdaySet ref={DateRef} type={type} {...other}></WorkdaySet>
      </Loading>
    </LgModal>
  );
}
const WorkdaySet = memo(
  forwardRef(function (props, ref) {
    const {
      workData,
      termRange,
      workdayDate,
      holiday,
      workday,
      rangeDate,
      type,
    } = props;
    const {
      WorkLeftDate,
      WorkRightDate,
      WorkRightRangeDate,
      WorkLeftRangeDate,
      CurrentLeftMonth,
      CurrentRightMonth,
      OnOk,
    } = workData || {};

    // 补课和被补
    const [LeftDate, setLeftDate] = useState(WorkLeftDate || "");
    const [RightDate, setRightDate] = useState(WorkRightDate || "");
    // 左边点击
    const onLeftClick = useCallback(
      ({ date, day, callback }) => {
        // 对两者进行判断是否冲突
        if (day === RightDate) {
          autoAlert({
            type: "error",
            autoHide: () => {},
            title: "补班日期和被补班日期不允许同一天",
          });
          return;
        }
        setLeftDate(day);
        callback();
      },
      [RightDate]
    );
    const onRightClick = useCallback(
      ({ date, day, callback }) => {
        // 对两者进行判断是否冲突
        console.log(day, LeftDate);
        if (day === LeftDate) {
          autoAlert({
            type: "error",
            autoHide: () => {},
            title: "补班日期和被补班日期不允许同一天",
          });
          return;
        }
        setRightDate(day);
        callback();
      },
      [LeftDate]
    );

    useImperativeHandle(ref, () => ({
      getDate: () => {
        return [moment(LeftDate).format('YYYY-MM-DD'), moment(RightDate).format('YYYY-MM-DD')];
      },
    }));
    console.log(CurrentLeftMonth)
    return (
      <div className={`WorkdaySet ${type === "edit" ? "WorkdaySet-edit" : ""}`}>
        {type !== "edit" && (
          <>
            <div className="select-box select-date">
              <p className="WorkdaySet-tips">选择补班日期:</p>
              <WorkCaledar
              currentMonth={CurrentLeftMonth}
                className="WorkdaySet-WorkCaledar"
                rangeDate={WorkLeftRangeDate || [moment(), rangeDate[1]]}
                holiday={holiday}
                workday={workday}
                defaultDate={LeftDate}
                onSelectClick={onLeftClick}
                type={"left"}
              ></WorkCaledar>
            </div>
            <div className="select-date-icon"></div>
          </>
        )}
        <div className="select-box select-exchange-date">
          {type !== "edit" && (
            <p className="WorkdaySet-tips">选择所要补班对应日期:</p>
          )}

          <WorkCaledar
          currentMonth={CurrentRightMonth}
            className="WorkdaySet-WorkCaledar"
            rangeDate={WorkRightRangeDate || rangeDate}
            holiday={WorkRightRangeDate?{}:holiday}
            workday={WorkRightRangeDate?{}:workday}
            onSelectClick={onRightClick}
            defaultDate={RightDate}
            type={"right"}
          ></WorkCaledar>
        </div>
      </div>
    );
  })
);

export default memo(forwardRef(WorkdayModal));
