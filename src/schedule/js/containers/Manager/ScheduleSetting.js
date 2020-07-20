import React,{Component} from 'react';

import {Input} from "antd";

import {Modal,Radio,RadioGroup} from "../../../../common";

import SSActions from '../../actions/Manager/ScheduleSettingActions';

import AppAlertActions from '../../actions/AppAlertActions';

import PeriodClassHourSetting from '../../component/Manager/PeriodClassHourSetting';

import $ from 'jquery';

import { connect } from 'react-redux';


import ApiActions from "../../actions/ApiActions";


class ScheduleSetting extends Component{

    constructor(props){

        super(props);

        this.state={

            FirstUpload:true

        }

    }

    UNSAFE_componentWillReceiveProps(nextProps){

        const { dispatch,LoginUser } = nextProps;

        if (Object.keys(LoginUser).length>0&&this.state.FirstUpload){

            const { SchoolID } = LoginUser;

            dispatch(SSActions.PageInit({SchoolID}));

            this.setState({FirstUpload:false});

        }

    }

    componentDidMount(){

        //改变样式
        $('.frame-content-rightside').css({

            'border-radius':'12px',

            'margin-top':"0",

            "border-top":"0"

        });

    }


    //切换课表设置的方式
    SettingTypeChange(opts){

        const { dispatch } = this.props;

        const method = opts.type===1?'分学段':'统一';

        dispatch(AppAlertActions.alertQuery({title:`您确定要切换成按${method}设置吗？`,ok:()=>this.SettingTypeSitch.bind(this,opts)}));

    }

    //切换调课方式
    SettingTypeSitch(opts){

        const { dispatch } = this.props;

        dispatch(SSActions.SettingTypeSitch(opts));

    }


    //批量调整课时

    AdjustClassHour(opts){

        const  { dispatch } = this.props;

        const { Event } = opts;

        //阻止事件冒泡
        Event.stopPropagation();

        dispatch(SSActions.AdjustClassHour(opts));

    }

    //批量调整课时关闭

    AdjustClassHourHide(){

        const  { dispatch } = this.props;

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_ADJUST_MODAL_HIDE});

    }

    //确定点击弹窗按钮

    AdjustClassHourOk(){

        const { dispatch } = this.props;

        dispatch(SSActions.AdjustClassHourOk());

    }

    //调整课时上午单选变化
    MorningRadioChange(e){

        const { dispatch } = this.props;

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_MORNING_RADIO_CHANGE,data:e.target.value});

    }
    //调整课时下午单选变化
    AfternoonRadioChange(e){

        const { dispatch } = this.props;

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_AFTERNOON_RADIO_CHANGE,data:e.target.value});

    }

    //受控组件input变化

    AdjustMorningInputChange(e){

        const { dispatch } = this.props;

        let number =  e.target.value.replace(/[^\d]/g,'');

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_ADJUST_MORNING_INPUT_CHANGE,data:number});

    }

    //受控组件input变化

    AdjustAfternoonInputChange(e){

        const { dispatch } = this.props;

        let number =  e.target.value.replace(/[^\d]/g,'');

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_ADJUST_AFTERNOON_INPUT_CHANGE,data:number});

    }



    //添加课时弹窗

    AddClassHour(opts){

        const  { dispatch } = this.props;

        dispatch(SSActions.AddClassHour(opts));

    }


    AddClassHourOk(){

        const { dispatch } = this.props;

        dispatch(SSActions.AddClassHourOk());

    }


    //隐藏添加课时弹窗

    AddClassHourHide(){

        const  { dispatch } = this.props;

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_HIDE});

    }


    //开始-小时变化
    AddStartHourChange(e) {

        const { dispatch } = this.props;

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_START_HOUR_CHANGE,data:e.target.value});

    }


    //开始-分钟变化
    AddStartMinChange(e){

        const { dispatch } = this.props;

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_START_MIN_CHANGE,data:e.target.value});

    }


    //结束-小时变化
    AddEndHourChange(e){

        const { dispatch } = this.props;

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_END_HOUR_CHANGE,data:e.target.value});

    }


    //结束-分钟变化
    AddEndMinChange(e){

        const { dispatch } = this.props;

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_END_MIN_CHANGE,data:e.target.value});

    }


    //编辑OK

    EditClassHour(opts){

        const { dispatch } = this.props;

        const { Type,IsUnify,PeriodID,ClassHourName,StartTime,EndTime,ClassHourNO } = opts;

        let StartHour = StartTime.split(':')[0];

        let StartMin = StartTime.split(':')[1];

        let EndHour = EndTime.split(':')[0];

        let EndMin = EndTime.split(':')[1];

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_MODAL_SHOW,data:{ClassHourNO,Type,OldStartTime:StartTime,OldEndTime:EndTime,IsUnify,PeriodID,ClassHourName,StartHour,EndHour,StartMin,EndMin}})

    }

    EditClassHourOk(){

        const { dispatch } = this.props;

        dispatch(SSActions.EditClassHourOk());

    }

    EditClassHourHide(){

        const { dispatch } = this.props;

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_MODAL_HIDE})

    }


    //开始-小时变化
    EditStartHourChange(e) {

        const { dispatch } = this.props;

        let number =  e.target.value.replace(/[^\d]/g,'');

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_START_HOUR_CHANGE,data:number});

    }


    //开始-分钟变化
    EditStartMinChange(e){

        const { dispatch } = this.props;

        let number =  e.target.value.replace(/[^\d]/g,'');

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_START_MIN_CHANGE,data:number});

    }


    //结束-小时变化
    EditEndHourChange(e){

        const { dispatch } = this.props;

        let number =  e.target.value.replace(/[^\d]/g,'');

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_END_HOUR_CHANGE,data:number});

    }


    //结束-分钟变化
    EditEndMinChange(e){

        const { dispatch } = this.props;

        let number =  e.target.value.replace(/[^\d]/g,'');

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_END_MIN_CHANGE,data:number});

    }

    //删除课时

    DelClassHour(opts){

        const { LoginUser,dispatch } = this.props;


        const { SchoolID } = LoginUser;

        const { PeriodID,ClassHourNO } = opts;

        dispatch(AppAlertActions.alertQuery({title:"您确定要删除该课时么？",ok:()=>this.DelClassHourOk.bind(this,{ PeriodID,ClassHourNO,SchoolID,dispatch })}))

    }

    DelClassHourOk({ PeriodID,ClassHourNO,SchoolID,dispatch }){

        ApiActions.DeleteClassHourInfo({SchoolID,ClassHourNO,PeriodID,dispatch}).then(data=>{

            if (data===0){

                dispatch({type:AppAlertActions.APP_ALERT_HIDE});

                dispatch(AppAlertActions.alertSuccess({title:"删除成功！"}));

                dispatch(SSActions.PageUpdate());

            }

        })

    }

    //点击关闭和开启
    LinkageChange(){

        const { dispatch } = this.props;

        dispatch(SSActions.LinkageChange());
    }

    //点击切换状态

    SwitchTimeEditShow(){

        const { dispatch } = this.props;

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_LINKAGE_TIME_EDIT_OPEN});

    }

    SwitchTimeEditClose(){

        const { dispatch } = this.props;

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_LINKAGE_TIME_EDIT_CANCEL});

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_LINKAGE_TIME_EDIT_CLOSE});


    }


    //课表联动输入变化

    LinkageInputChange(e){

        const { dispatch } = this.props;

        let number =  e.target.value.replace(/[^\d]/g,'');

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_LINKAGE_INPUT_CHANGE,data:number});


    }

    //课表联动输入确定

    SwitchTimeEditOk(){

        const { dispatch } = this.props;

        dispatch(SSActions.SwitchTimeEditOk());

    }



    render(){

        const { ScheduleSetting } = this.props;

        const {

            SettingType, MultiplePeriod, SettingByPeriod, SettingByUnify, IsEnable, Times,

            LinkageEditStatus, AdjustClassHourModal,AddClassHourModal,EditTimes,

            EditClassHourModal

        } = ScheduleSetting;

        const {

            MorningRadioChecked,MorningInputDisabled,MorningTime,

            AfternoonRadioChecked,AfternoonInputDisabled,AfternoonTime

        } = AdjustClassHourModal;

        return <React.Fragment>

            <div className="schedule-setting-wrapper">

            <div className="title-bar">

                <div className="title-bar-name">节次及上课时间设置</div>

            </div>

            <div className="setting-content-wrapper">

                <div className="setting-type-wrapper">

                    <span className="setting-type-title">选择设置方式:</span>

                    <div className="setting-type-switch clearfix">

                        <div className={`setting-type-tab left ${SettingType===1?'active':''}`} onClick={this.SettingTypeChange.bind(this,{type:1})}>分学段设置</div>

                        <div className={`setting-type-tab right ${SettingType===0?'active':''}`} onClick={this.SettingTypeChange.bind(this,{type:0})}>统一设置</div>

                    </div>

                </div>

                {

                    SettingType===0?

                        <PeriodClassHourSetting

                            IsUnify={true}

                            ClassHourList={SettingByUnify.ClassHourList}

                            AdjustClassHour={this.AdjustClassHour.bind(this)}

                            AddClassHour={this.AddClassHour.bind(this)}

                            EditClassHour={this.EditClassHour.bind(this)}

                            DelClassHour={this.DelClassHour.bind(this)}

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

                                                           AdjustClassHour={this.AdjustClassHour.bind(this)}

                                                           AddClassHour={this.AddClassHour.bind(this)}

                                                           EditClassHour={this.EditClassHour.bind(this)}

                                                           DelClassHour={this.DelClassHour.bind(this)}>




                            </PeriodClassHourSetting>

                        })

                        :''

                }


            </div>

            <div className="title-bar">

                <div className="title-bar-name">物联网自动联动设置</div>

            </div>

            <div className="linkage-setting-wrapper clearfix">

                <span className="title">当前状态:</span>

                <button className={`linkage-switch ${IsEnable===1?'on':''}`} onClick={this.LinkageChange.bind(this)}>{IsEnable===1?'已开启':'已关闭'}</button>

                <span className="title">自动提前开机时间:</span>

                {

                        LinkageEditStatus?

                            <Input value={EditTimes}  onChange={this.LinkageInputChange.bind(this)}/>

                            :

                            <span className="min-text">{Times}</span>

                }


                <span className="title">分钟</span>

                {

                    IsEnable?

                            LinkageEditStatus?

                                <React.Fragment>

                                    <button className="save" onClick={this.SwitchTimeEditOk.bind(this)}>确定</button>


                                    <button className="cancel" onClick={this.SwitchTimeEditClose.bind(this)}>取消</button>


                                </React.Fragment>

                                :

                                <button className="edit" onClick={this.SwitchTimeEditShow.bind(this)}>编辑</button>

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

                   onOk={this.AdjustClassHourOk.bind(this)}

                   onCancel={this.AdjustClassHourHide.bind(this)}>

                    <div className="monring-setting setting-line clearfix">

                        <span className="title">上午:</span>

                        <RadioGroup value={MorningRadioChecked} onChange={this.MorningRadioChange.bind(this)}>

                            <Radio type="gray" value="before">提前</Radio>

                            <Radio type="gray" value="after">延后</Radio>

                        </RadioGroup>

                        <Input maxLength={2} min={0} disabled={MorningInputDisabled} value={MorningInputDisabled?'':MorningTime} onChange={this.AdjustMorningInputChange.bind(this)}/>

                    </div>

                    <div className="afternoon-setting setting-line clearfix">

                        <span className="title">下午:</span>

                        <RadioGroup value={AfternoonRadioChecked} onChange={this.AfternoonRadioChange.bind(this)} >

                            <Radio type="gray" value="before">提前</Radio>

                            <Radio type="gray" value="after">延后</Radio>

                        </RadioGroup>

                        <Input maxLength={2} min={0} disabled={AfternoonInputDisabled} value={AfternoonInputDisabled?'':AfternoonTime} onChange={this.AdjustAfternoonInputChange.bind(this)}/>

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

                   onOk={this.AddClassHourOk.bind(this)}

                   onCancel={this.AddClassHourHide.bind(this)}
                >

                <div className="start-time-wrapper">

                    <span className="title">开始时间:</span>

                    <Input onChange={this.AddStartHourChange.bind(this)} className="start-hour"  maxLength={2} min={0} max={23} value={AddClassHourModal.StartHour}/>

                    <span className="unit">时</span>

                    <Input onChange={this.AddStartMinChange.bind(this)} className="start-min"  maxLength={2} min={0} max={59} value={AddClassHourModal.StartMin}/>

                    <span className="unit">分</span>

                </div>

                <div className="end-time-wrapper">

                    <span className="title">结束时间:</span>

                    <Input onChange={this.AddEndHourChange.bind(this)} className="end-hour"  maxLength={2} min={0} max={23} value={AddClassHourModal.EndHour}/>

                    <span className="unit">时</span>

                    <Input onChange={this.AddEndMinChange.bind(this)} className="end-min"  maxLength={2} min={0} max={59} value={AddClassHourModal.EndMin}/>

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

                   onOk={this.EditClassHourOk.bind(this)}

                   onCancel={this.EditClassHourHide.bind(this)}
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

                    <Input onChange={this.EditStartHourChange.bind(this)} className="start-hour"  maxLength={2} min={0} max={23} value={EditClassHourModal.StartHour}/>

                    <span className="unit">时</span>

                    <Input onChange={this.EditStartMinChange.bind(this)} className="start-min"  maxLength={2} min={0} max={59} value={EditClassHourModal.StartMin}/>

                    <span className="unit">分</span>

                </div>

                <div className="end-time-wrapper">

                    <span className="title">结束时间:</span>

                    <Input onChange={this.EditEndHourChange.bind(this)} className="end-hour"  maxLength={2} min={0} max={23} value={EditClassHourModal.EndHour}/>

                    <span className="unit">时</span>

                    <Input onChange={this.EditEndMinChange.bind(this)} className="end-min"  maxLength={2} min={0} max={59} value={EditClassHourModal.EndMin}/>

                    <span className="unit">分</span>

                </div>

                <div className="tap">注:两节课之间的最小起始间隔为1分钟</div>

            </Modal>

        </React.Fragment>

    }

}

const  mapStateToProps = (state) => {

    let { Manager,LoginUser } = state;

    let { ScheduleSetting } = Manager;

    return {

        ScheduleSetting,LoginUser

    }

};

export default connect(mapStateToProps)(ScheduleSetting);