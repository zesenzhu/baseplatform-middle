import React,{Component} from 'react';

import { Loading,DropDown,Radio } from "../../../../common";

import { DatePicker,ConfigProvider,Tooltip } from 'antd';

import { connect } from 'react-redux';

import ABTActions from '../../actions/Teacher/AdjustByTeacherActions';

import zhCN from 'antd/es/locale/zh_CN';

import moment from 'moment';

import 'moment/locale/zh-cn';
import utils from "../../actions/utils";

moment.locale('zh-cn');

class ChangeSchedule extends Component{


    //日期选择
    originDateChecked(date,dateString){

        const { dispatch } = this.props;

        dispatch(ABTActions.originDateChecked(dateString));

        dispatch({type:ABTActions.CHANGE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:'originDate'}})

    }
    //原始节次选择
    originScheduleDropChange(info){

        const { dispatch } = this.props;

        dispatch(ABTActions.originScheduleDropChange(info));

        dispatch({type:ABTActions.CHANGE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:'originSchedule'}});

    }



    //点击选择待选的教师
    targetTeacherDropChange(info){

        const { dispatch } = this.props;

        dispatch(ABTActions.targetTeacherDropChange(info));

        dispatch({type:ABTActions.CHANGE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:'targetTeacher'}});

    }
    //搜索待选教师
    targetTeacherClickSearch(e){

        const key = e.value;

        const { dispatch } = this.props;

        dispatch(ABTActions.targetTeacherClickSearch(key));

    }
    //取消待选搜索
    targetTeacherSearchClose(){

        const  { dispatch } = this.props;

        dispatch(ABTActions.targetTeacherSearchClose())

    }

    dateDisabled(current){

        const { dispatch } = this.props;

        return  dispatch(utils.DateDisabled(current));

    }

    //待选日期选择
    targetDateChecked(date,dateString){

        const { dispatch } = this.props;

        dispatch(ABTActions.targetDateChecked(dateString));

        dispatch({type:ABTActions.CHANGE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:'targetDate'}});

    }
    //待选节次选择
    targetScheduleDropChange(info){

        const { dispatch } = this.props;

        dispatch(ABTActions.targetScheduleDropChange(info));

        dispatch({type:ABTActions.CHANGE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:'targetSchedule'}});


    }




    render() {

        const { changeSchedule,teacherList } = this.props;

        const {

            originDate,

            originSchedulePickDisabled,

            originScheduleList,

            originScheduleDropSelectd,

            targetDropSelectd,

            targetSearchList,

            targetSearchOpen,

            targetSearchLoadingShow,

            targetDate,

            targetSchedulePickDisabled,

            targetScheduleList,

            targetScheduleDropSelectd,

            originTeacherTips,

            originDateTips,

            originScheduleTips,

            targetTeacherTips,

            targetDateTips,

            targetScheduleTips

        } = changeSchedule;

        return (

            <div className="change-schedule-wrapper clearfix">

                <div className="origin-change-wrapper change-wrapper">

                    <div className="title">需要换课的课程</div>

                    <div className="change-info-wrapper clearfix">

                        <div className="props">日期:</div>

                        <ConfigProvider locale={zhCN}>

                            <Tooltip placement="right" getPopupContainer={triggerNode => triggerNode.parentNode} visible={originDateTips} title="请选择日期">

                                <DatePicker disabledDate={this.dateDisabled.bind(this)} style={{width:150,marginLeft:8,height:28}}  value={originDate?moment(originDate,'YYYY-MM-DD'):null} onChange={this.originDateChecked.bind(this)}></DatePicker>

                            </Tooltip>

                        </ConfigProvider>

                        {/*<span className="error-tips" style={{top:4,display:`${originDateTips?'block':'none'}`}}>请选择日期</span>*/}

                    </div>

                    <div className="change-info-wrapper clearfix">

                        <div className="props">节次:</div>

                        <Tooltip placement="right" getPopupContainer={triggerNode => triggerNode.parentNode} visible={originScheduleTips} title="请选择节次">

                            <DropDown
                            dropSelectd={originScheduleDropSelectd}
                            dropList={originScheduleList}
                            width={150}
                            height={108}
                            disabled={originSchedulePickDisabled}
                            onChange={this.originScheduleDropChange.bind(this)}>

                        </DropDown>

                        </Tooltip>

                        {/*<span className="error-tips" style={{display:`${originScheduleTips?'block':'none'}`}}>请选择节次</span>*/}


                    </div>

                </div>

                <div className="target-change-wrapper change-wrapper">

                    <div className="title">进行换课的老师及课程</div>

                    <div className="change-info-wrapper clearfix" style={{zIndex:5}}>

                        <div className="props">老师:</div>

                        <Tooltip placement="right" getPopupContainer={triggerNode => triggerNode.parentNode} visible={targetTeacherTips} title="请选择教师">

                            <DropDown  width={150}
                                   dropSelectd={targetDropSelectd}
                                   type="multiple"
                                   style={{zIndex:5,left:48,top:0}}
                                   mutipleOptions={{
                                       range:2,
                                       dropMultipleList:teacherList,
                                       dropMultipleChange:this.targetTeacherDropChange.bind(this),
                                       dropClickSearch:this.targetTeacherClickSearch.bind(this),
                                       dropCancelSearch:this.targetTeacherSearchClose.bind(this),
                                       searchList:targetSearchList,
                                       searchPlaceholder:"请输入教师姓名或工号搜索...",
                                       searchOpen:targetSearchOpen,
                                       searchLoadingShow:targetSearchLoadingShow
                                   }}>

                        </DropDown>

                        </Tooltip>

                        {/*<span className="error-tips" style={{display:`${targetTeacherTips?'block':'none'}`}}>请选择教师</span>*/}


                    </div>

                    <div className="change-info-wrapper clearfix" style={{zIndex:4}}>

                        <div className="props">日期:</div>

                        <ConfigProvider locale={zhCN}>

                            <Tooltip placement="right" getPopupContainer={triggerNode => triggerNode.parentNode} visible={targetDateTips} title="请选择日期">

                                <DatePicker disabledDate={this.dateDisabled.bind(this)} style={{width:150,marginLeft:8,height:28}}  value={targetDate?moment(targetDate,'YYYY-MM-DD'):null} onChange={this.targetDateChecked.bind(this)}></DatePicker>

                            </Tooltip>

                        </ConfigProvider>

                        {/*<span className="error-tips" style={{display:`${targetDateTips?'block':'none'}`}}>请选择日期</span>*/}

                    </div>

                    <div className="change-info-wrapper clearfix" style={{zIndex:3}}>

                        <div className="props">节次:</div>

                        <Tooltip placement="right" getPopupContainer={triggerNode => triggerNode.parentNode} visible={targetScheduleTips} title="请选择节次">

                            <DropDown
                            dropSelectd={targetScheduleDropSelectd}
                            dropList={targetScheduleList}
                            width={150}
                            height={108}
                            disabled={targetSchedulePickDisabled}
                            onChange={this.targetScheduleDropChange.bind(this)}
                            style={{zIndex:2}}>

                        </DropDown>

                        </Tooltip>

                        {/*<span className="error-tips" style={{display:`${targetScheduleTips?'block':'none'}`}}>请选择节次</span>*/}

                    </div>

                </div>
                
                <div className="arr-wrapper"></div>

            </div>

        );

    }

}

const mapStateToProps = (state) => {

    const { changeSchedule,teacherList } = state.Teacher.AdjustByTeacherModal;

    return{

        changeSchedule,

        teacherList

    }

};

export default connect(mapStateToProps)(ChangeSchedule);