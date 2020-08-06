import React,{useEffect,useState,useCallback,useMemo,useRef,memo} from 'react';

import {Input,Button} from "antd";

import {Modal,Radio,RadioGroup} from "../../../../common";

import SSActions from '../../actions/Manager/ScheduleSettingActions';

import AppAlertActions from '../../actions/AppAlertActions';

import {GetTermInfoAndHolidayCount} from '../../actions/ApiActions';

import PeriodClassHourSetting from '../../component/Manager/PeriodClassHourSetting';

import $ from 'jquery';

import { useSelector,useDispatch } from 'react-redux';

import ApiActions from "../../actions/ApiActions";

import HolidayModal from '../../component/holiday-modal';

import moment from 'moment';


function ScheduleSetting(props){

    //假期
    const [holiday,setHoliday] = useState({

        start:moment().format('YYYY-MM-DD'),

        end:moment().format('YYYY-MM-DD'),

        allDays:0,

        holidays:0,

        list:[],

        show:false

    });


    const ScheduleSetting = useSelector(state=>state.Manager.ScheduleSetting);

    const LoginUser = useSelector(state=>state.LoginUser);

    const {SchoolID,UserID,UserType,UserClass} = LoginUser;

    const dispatch = useDispatch();


    const SchoolIDRef = useRef(SchoolID);

    const {

        SettingType, MultiplePeriod, SettingByPeriod, SettingByUnify, IsEnable, Times,

        LinkageEditStatus, AdjustClassHourModal,AddClassHourModal,EditTimes,

        EditClassHourModal

    } = ScheduleSetting;

    const {

        MorningRadioChecked,MorningInputDisabled,MorningTime,

        AfternoonRadioChecked,AfternoonInputDisabled,AfternoonTime

    } = AdjustClassHourModal;



    useEffect(()=>{

        //改变样式
        $('.frame-content-rightside').css({

            'border-radius':'12px',

            'margin-top':"0",

            "border-top":"0"

        });

    },[]);

    useEffect(()=>{

        if (UserID){

            SchoolIDRef.current = SchoolID;

            dispatch(SSActions.PageInit({SchoolID}));

            GetTermInfoAndHolidayCount({SchoolID,dispatch}).then(data=>{

                if (data){

                    const start = data.StartDate?moment(data.StartDate).format("YYYY-MM-DD"):moment().format('YYYY-MM-DD');

                    const end = data.EndDate?moment(data.EndDate).format("YYYY-MM-DD"):moment().format('YYYY-MM-DD');

                    const allDays = data.AllDays?data.AllDays:0;

                    const holidays = data.Holidays?data.Holidays:0;

                    const list = data.HolidayItem&&data.HolidayItem.length>0?data.HolidayItem:[];

                    setHoliday(d=>({...d,start,end,allDays,holidays,list}));

                }

            });

        }

    },[UserID]);



    //切换课表设置的方式
    const SettingTypeChange = (opts) => {

        const method = opts.type===1?'分学段':'统一';

        dispatch(AppAlertActions.alertQuery({title:`您确定要切换成按${method}设置吗？`,ok:()=>{ return e=>SettingTypeSitch(opts)}}));

    };

    //切换调课方式
    const SettingTypeSitch = (opts) => {

        dispatch(SSActions.SettingTypeSitch(opts));

    };


    //批量调整课时

    const AdjustClassHour = useCallback((opts) => {

        const { Event } = opts;

        //阻止事件冒泡
        Event.stopPropagation();

        dispatch(SSActions.AdjustClassHour(opts));

    },[]);

    //批量调整课时关闭

    const AdjustClassHourHide  = useCallback(() => {

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_ADJUST_MODAL_HIDE});

    },[]);

    //确定点击弹窗按钮

    const AdjustClassHourOk = useCallback(() => {

        dispatch(SSActions.AdjustClassHourOk());

    },[]);

    //调整课时上午单选变化
    const MorningRadioChange = useCallback((e) => {

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_MORNING_RADIO_CHANGE,data:e.target.value});

    },[]);

    //调整课时下午单选变化
    const AfternoonRadioChange = useCallback((e) =>{

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_AFTERNOON_RADIO_CHANGE,data:e.target.value});

    },[]);

    //受控组件input变化

    const AdjustMorningInputChange = useCallback((e) => {

        let number =  e.target.value.replace(/[^\d]/g,'');

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_ADJUST_MORNING_INPUT_CHANGE,data:number});

    },[]);

    //受控组件input变化

    const AdjustAfternoonInputChange = useCallback((e) => {

        let number =  e.target.value.replace(/[^\d]/g,'');

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_ADJUST_AFTERNOON_INPUT_CHANGE,data:number});

    },[]);



    //添加课时弹窗

    const AddClassHour = useCallback((opts) => {

        dispatch(SSActions.AddClassHour(opts));

    },[]);


    const AddClassHourOk = useCallback(() =>{

        dispatch(SSActions.AddClassHourOk());

    },[]);


    //隐藏添加课时弹窗

    const AddClassHourHide = useCallback(() => {

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_HIDE});

    },[]);


    //开始-小时变化
    const AddStartHourChange = useCallback((e)=>{

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_START_HOUR_CHANGE,data:e.target.value});

    },[]);


    //开始-分钟变化
    const AddStartMinChange= useCallback((e) =>{

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_START_MIN_CHANGE,data:e.target.value});

    },[]);


    //结束-小时变化
    const AddEndHourChange = useCallback((e) => {

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_END_HOUR_CHANGE,data:e.target.value});

    },[]);


    //结束-分钟变化
    const AddEndMinChange = useCallback((e) => {

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_END_MIN_CHANGE,data:e.target.value});

    },[]);


    //编辑OK

    const EditClassHour = useCallback((opts) => {

        const { Type,IsUnify,PeriodID,ClassHourName,StartTime,EndTime,ClassHourNO } = opts;

        let StartHour = StartTime.split(':')[0];

        let StartMin = StartTime.split(':')[1];

        let EndHour = EndTime.split(':')[0];

        let EndMin = EndTime.split(':')[1];

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_MODAL_SHOW,data:{ClassHourNO,Type,OldStartTime:StartTime,OldEndTime:EndTime,IsUnify,PeriodID,ClassHourName,StartHour,EndHour,StartMin,EndMin}})

    },[]);

    const EditClassHourOk = useCallback(() =>{

        dispatch(SSActions.EditClassHourOk());

    },[]);


    const EditClassHourHide = useCallback(() => {

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_MODAL_HIDE})

    },[]);


    //开始-小时变化
    const EditStartHourChange = (e) => {

        let number =  e.target.value.replace(/[^\d]/g,'');

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_START_HOUR_CHANGE,data:number});

    };


    //开始-分钟变化
    const EditStartMinChange = (e) =>{

        let number =  e.target.value.replace(/[^\d]/g,'');

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_START_MIN_CHANGE,data:number});

    };


    //结束-小时变化
    const EditEndHourChange = (e) => {

        let number =  e.target.value.replace(/[^\d]/g,'');

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_END_HOUR_CHANGE,data:number});

    };


    //结束-分钟变化
    const EditEndMinChange = (e) => {

        let number =  e.target.value.replace(/[^\d]/g,'');

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_END_MIN_CHANGE,data:number});

    };

    //删除课时

    const DelClassHour = useCallback((opts)=> {

        const { PeriodID,ClassHourNO } = opts;

        dispatch(AppAlertActions.alertQuery({title:"您确定要删除该课时么？",ok:()=>DelClassHourOk({ PeriodID,ClassHourNO,SchoolID })}))

    },[]);

    const DelClassHourOk = ({ PeriodID,ClassHourNO,SchoolID }) => {

        ApiActions.DeleteClassHourInfo({SchoolID,ClassHourNO,PeriodID,dispatch}).then(data=>{

            if (data===0){

                dispatch({type:AppAlertActions.APP_ALERT_HIDE});

                dispatch(AppAlertActions.alertSuccess({title:"删除成功！"}));

                dispatch(SSActions.PageUpdate());

            }

        })

    };


    //假期弹窗出现

    const showHolidayModal = useCallback(()=>{

        setHoliday(d=>({...d,show:true}));

    },[]);


    //节假日弹窗点击OK

    const holidayOk = useCallback(()=>{

        setHoliday(d=>({...d,show:false}));

        updateHoliday();

    },[]);

    //节假日关闭
    const holidayCancel = useCallback(()=>{

        setHoliday(d=>({...d,show:false}));

    },[]);

    //更新节假日信息
    const updateHoliday = useCallback(()=>{

        GetTermInfoAndHolidayCount({SchoolID:SchoolIDRef.current,dispatch}).then(data=>{

            if (data){

                const start = data.StartDate?moment(data.StartDate).format("YYYY-MM-DD"):moment().format('YYYY-MM-DD');

                const end = data.EndDate?moment(data.EndDate).format("YYYY-MM-DD"):moment().format('YYYY-MM-DD');

                const allDays = data.AllDays?data.AllDays:0;

                const holidays = data.Holidays?data.Holidays:0;

                const list = data.HolidayItem&&data.HolidayItem.length>0?data.HolidayItem:[];

                setHoliday(d=>({...d,start,end,allDays,holidays,list}));

            }

        });

    },[]);

    return(

    <React.Fragment>

        <div className="schedule-setting-wrapper">

            <div className="title-bar">

                <div className="title-bar-name">节假日设置</div>

            </div>

            <div className={"holiday-time-wrapper clearfix"}>

                <div className={"left-content"}>

                    本学期自 <span className={"start-date date"}>{holiday.start}</span> 起至 <span className={"start-date date"}>{holiday.end}</span> 止，共{holiday.allDays}天，其中节假日{holiday.holidays}天(含周末)。

                </div>

                <Button className={"set-holiday-btn"} type={"primary"} onClick={showHolidayModal}>设置节假日</Button>

            </div>

            <div className="title-bar">

                <div className="title-bar-name">节次及上课时间设置</div>

            </div>

            <div className="setting-content-wrapper">

                <div className="setting-type-wrapper">

                    <span className="setting-type-title">选择设置方式:</span>

                    <div className="setting-type-switch clearfix">

                        <div className={`setting-type-tab left ${SettingType===1?'active':''}`} onClick={e=>SettingTypeChange({type:1})}>分学段设置</div>

                        <div className={`setting-type-tab right ${SettingType===0?'active':''}`} onClick={e=>SettingTypeChange({type:0})}>统一设置</div>

                    </div>

                </div>

                {

                    SettingType===0?

                        <PeriodClassHourSetting

                            IsUnify={true}

                            ClassHourList={SettingByUnify.ClassHourList}

                            AdjustClassHour={AdjustClassHour}

                            AddClassHour={AddClassHour}

                            EditClassHour={EditClassHour}

                            DelClassHour={DelClassHour}

                        >

                        </PeriodClassHourSetting>

                        :''

                }

                {

                    SettingType===1?

                        SettingByPeriod.PeriodSettingList.map((item,key)=>{



                            return <PeriodClassHourSetting key={key}

                                                           IsUnify={false}

                                                           PeriodID={item.PeriodID}

                                                           PeriodName={item.PeriodName}

                                                           ClassHourList={item.ClassHourList}

                                                           AdjustClassHour={AdjustClassHour}

                                                           AddClassHour={AddClassHour}

                                                           EditClassHour={EditClassHour}

                                                           DelClassHour={DelClassHour}>




                            </PeriodClassHourSetting>

                        })

                        :''

                }


            </div>


        </div>

        <Modal type={1} className="adjust-class-hour-modal"

               title="批量调整上课时间"

               visible={AdjustClassHourModal.Show}

               width={540}

               bodyStyle={{height:176}}

               mask={true}

               maskClosable={false}

               destroyOnClose={true}

               onOk={AdjustClassHourOk}

               onCancel={AdjustClassHourHide}>

            <div className="monring-setting setting-line clearfix">

                <span className="title">上午:</span>

                <RadioGroup value={MorningRadioChecked} onChange={MorningRadioChange}>

                    <Radio type="gray" value="before">提前</Radio>

                    <Radio type="gray" value="after">延后</Radio>

                </RadioGroup>

                <Input maxLength={2} min={0} disabled={MorningInputDisabled} value={MorningInputDisabled?'':MorningTime} onChange={AdjustMorningInputChange}/>

            </div>

            <div className="afternoon-setting setting-line clearfix">

                <span className="title">下午:</span>

                <RadioGroup value={AfternoonRadioChecked} onChange={AfternoonRadioChange} >

                    <Radio type="gray" value="before">提前</Radio>

                    <Radio type="gray" value="after">延后</Radio>

                </RadioGroup>

                <Input maxLength={2} min={0} disabled={AfternoonInputDisabled} value={AfternoonInputDisabled?'':AfternoonTime} onChange={AdjustAfternoonInputChange}/>

            </div>

        </Modal>

        <Modal type={1} className="add-class-hour-modal"

               title="新增上课节次"

               visible={AddClassHourModal.Show}

               width={540}

               bodyStyle={{height:176}}

               mask={true}

               maskClosable={false}

               destroyOnClose={true}

               onOk={AddClassHourOk}

               onCancel={AddClassHourHide}
        >

            <div className="start-time-wrapper">

                <span className="title">开始时间:</span>

                <Input onChange={AddStartHourChange} className="start-hour"  maxLength={2} min={0} max={23} value={AddClassHourModal.StartHour}/>

                <span className="unit">时</span>

                <Input onChange={AddStartMinChange} className="start-min"  maxLength={2} min={0} max={59} value={AddClassHourModal.StartMin}/>

                <span className="unit">分</span>

            </div>

            <div className="end-time-wrapper">

                <span className="title">结束时间:</span>

                <Input onChange={AddEndHourChange} className="end-hour"  maxLength={2} min={0} max={23} value={AddClassHourModal.EndHour}/>

                <span className="unit">时</span>

                <Input onChange={AddEndMinChange} className="end-min"  maxLength={2} min={0} max={59} value={AddClassHourModal.EndMin}/>

                <span className="unit">分</span>

            </div>

            <div className="tap">注:两节课之间的最小起始间隔为1分钟</div>

        </Modal>

        <Modal type={1} className="edit-class-hour-modal"

               title="修改上课时间"

               visible={EditClassHourModal.Show}

               width={540}

               bodyStyle={{height:216}}

               mask={true}

               maskClosable={false}

               destroyOnClose={true}

               onOk={EditClassHourOk}

               onCancel={EditClassHourHide}
        >

            <div className="class-time-wrapper">

                <span className="title">节次:</span>

                <span className="class-hour-no">

                <span className="time">{EditClassHourModal.Type===1?'上午':'下午'}{EditClassHourModal.ClassHourName}</span>

                <span className="time-area">({EditClassHourModal.OldStartTime}-{EditClassHourModal.OldEndTime})</span>

            </span>

            </div>

            <div className="start-time-wrapper">

                <span className="title">开始时间:</span>

                <Input onChange={EditStartHourChange} className="start-hour"  maxLength={2} min={0} max={23} value={EditClassHourModal.StartHour}/>

                <span className="unit">时</span>

                <Input onChange={EditStartMinChange} className="start-min"  maxLength={2} min={0} max={59} value={EditClassHourModal.StartMin}/>

                <span className="unit">分</span>

            </div>

            <div className="end-time-wrapper">

                <span className="title">结束时间:</span>

                <Input onChange={EditEndHourChange} className="end-hour"  maxLength={2} min={0} max={23} value={EditClassHourModal.EndHour}/>

                <span className="unit">时</span>

                <Input onChange={EditEndMinChange} className="end-min"  maxLength={2} min={0} max={59} value={EditClassHourModal.EndMin}/>

                <span className="unit">分</span>

            </div>

            <div className="tap">注:两节课之间的最小起始间隔为1分钟</div>

        </Modal>

        <HolidayModal

            show={holiday.show}

            start={holiday.start}

            end={holiday.end}

            holidayNum={holiday.holidays}

            holidayList={holiday.list}

            holidayOk={holidayOk}

            holidayCancel={holidayCancel}

        >

        </HolidayModal>

    </React.Fragment>

    )

}


export default memo(ScheduleSetting);