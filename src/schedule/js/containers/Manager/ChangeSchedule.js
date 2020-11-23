import React,{Component} from 'react';

import { Loading,DropDown,Radio } from "../../../../common";

import { DatePicker,ConfigProvider,Tooltip } from 'antd';

import { connect } from 'react-redux';

import ABTActions from '../../actions/Manager/AdjustByTeacherActions';

import zhCN from 'antd/es/locale/zh_CN';

import moment from 'moment';

import 'moment/locale/zh-cn';

import utils from "../../actions/utils";

moment.locale('zh-cn');

class ChangeSchedule extends Component{


    //点击选择原始的教师
    originTeacherDropChange(info){

        const { dispatch } = this.props;

        dispatch(ABTActions.originTeacherDropChange(info));

    }
    //搜索教师
    originTeacherClickSearch(e){

        const key = e.value;

        const { dispatch } = this.props;

        dispatch(ABTActions.originTeacherClickSearch(key));

    }
    //取消搜索
    originTeacherSearchClose(){

        const  { dispatch } = this.props;

        dispatch(ABTActions.originTeacherSearchClose())

    }
    //日期选择
    originDateChecked(date,dateString){

        const { dispatch } = this.props;

        dispatch(ABTActions.originDateChecked(dateString));

    }
    //原始节次选择
    originScheduleDropChange(info){

        const { dispatch } = this.props;

        dispatch(ABTActions.originScheduleDropChange(info));

    }



    //点击选择待选的教师
    targetTeacherDropChange(info){

        const { dispatch } = this.props;

        dispatch(ABTActions.targetTeacherDropChange(info));

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

        return dispatch(utils.DateDisabled(current));

    }

    //待选日期选择
    targetDateChecked(date,dateString){

        const { dispatch } = this.props;

        dispatch(ABTActions.targetDateChecked(dateString));

    }
    //待选节次选择
    targetScheduleDropChange(info){

        const { dispatch } = this.props;

        dispatch(ABTActions.targetScheduleDropChange(info));

    }




    render() {

        const { changeSchedule,teacherList } = this.props;

        const {

            originDropSelectd,

            originSearchList,

            originSearchOpen,

            originSearchLoadingShow,

            originDate,

            originSchedulePickDisabled,

            originScheduleList,

            originScheduleDropSelectd,

            targetDropSelectd,

            targetDropDisabled,

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

                    <div className="title">需要换课的老师及课程</div>

                    <div className="change-info-wrapper clearfix" style={{position:'relative',zIndex:'5'}}>

                        <div className="props">老师:</div>

                        <Tooltip placement="right" visible={originTeacherTips} title="请选择教师" autoAdjustOverflow={false} getPopupContainer={triggerNode => triggerNode.parentNode}>

                            <DropDown  width={150}
                                       dropSelectd={originDropSelectd}
                                       type="multiple"
                                       style={{zIndex:5,left:47,top:0}}
                                       mutipleOptions={{
                                           range:2,
                                           width:640,
                                           dropMultipleList:teacherList,
                                           dropMultipleChange:this.originTeacherDropChange.bind(this),
                                           dropClickSearch:this.originTeacherClickSearch.bind(this),
                                           dropCancelSearch:this.originTeacherSearchClose.bind(this),
                                           searchList:originSearchList,
                                           searchPlaceholder:"请输入姓名或工号进行搜索...",
                                           searchOpen:originSearchOpen,
                                           searchLoadingShow:originSearchLoadingShow
                                       }}>

                            </DropDown>

                        </Tooltip>

                        {/*<span className="error-tips" style={{display:`${originTeacherTips?'block':'none'}`}}>请选择教师</span>*/}

                    </div>

                    <div className="change-info-wrapper clearfix" style={{position:'relative',zIndex:'4'}}>

                        <div className="props">日期:</div>

                        <ConfigProvider locale={zhCN}>

                            <Tooltip placement="right" visible={originDateTips} title="请选择日期" autoAdjustOverflow={false} getPopupContainer={triggerNode => triggerNode.parentNode}>

                                <DatePicker disabledDate={this.dateDisabled.bind(this)} style={{width:150,marginLeft:8,height:28}}  value={originDate?moment(originDate,'YYYY-MM-DD'):null} onChange={this.originDateChecked.bind(this)}></DatePicker>

                            </Tooltip>

                        </ConfigProvider>

                        {/*<span className="error-tips" style={{display:`${originDateTips?'block':'none'}`}}>请选择日期</span>*/}

                    </div>

                    <div className="change-info-wrapper clearfix" style={{position:'relative',zIndex:'3'}}>

                        <div className="props">节次:</div>

                        <Tooltip placement="right" visible={originScheduleTips} title="请选择节次" autoAdjustOverflow={false} getPopupContainer={triggerNode => triggerNode.parentNode}>

                            <DropDown
                            dropSelectd={originScheduleDropSelectd}
                            dropList={originScheduleList}
                            width={150}
                            height={200}
                            disabled={originSchedulePickDisabled}
                            onChange={this.originScheduleDropChange.bind(this)}>

                        </DropDown>

                        </Tooltip>

                        {/*<span className="error-tips" style={{display:`${originScheduleTips?'block':'none'}`}}>请选择节次</span>*/}


                    </div>

                </div>

                <div className="target-change-wrapper change-wrapper">

                    <div className="title">进行换课的老师及课程</div>

                    <div className="change-info-wrapper clearfix" style={{position:'relative',zIndex:'5'}}>

                        <div className="props">老师:</div>

                        <Tooltip placement="right" visible={targetTeacherTips} title="请选择教师" autoAdjustOverflow={false} getPopupContainer={triggerNode => triggerNode.parentNode}>

                            <DropDown  width={150}
                                   dropSelectd={targetDropSelectd}

                                   style={{zIndex:5,left:47,top:0}}
                                   type="multiple"
                                   mutipleOptions={{
                                       range:2,
                                       width:500,
                                       dropMultipleList:teacherList,
                                       dropMultipleChange:this.targetTeacherDropChange.bind(this),
                                       dropClickSearch:this.targetTeacherClickSearch.bind(this),
                                       dropCancelSearch:this.targetTeacherSearchClose.bind(this),
                                       searchList:targetSearchList,
                                       searchPlaceholder:"请输入姓名或工号进行搜索...",
                                       searchOpen:targetSearchOpen,
                                       searchLoadingShow:targetSearchLoadingShow
                                   }}

                            >

                        </DropDown>

                        </Tooltip>

                        {/*<span className="error-tips" style={{display:`${targetTeacherTips?'block':'none'}`}}>请选择教师</span>*/}

                    </div>

                    <div className="change-info-wrapper clearfix" style={{position:'relative',zIndex:'4'}}>

                        <div className="props">日期:</div>

                        <ConfigProvider locale={zhCN}>

                            <Tooltip placement="right" visible={targetDateTips} title="请选择日期" autoAdjustOverflow={false} getPopupContainer={triggerNode => triggerNode.parentNode}>

                                <DatePicker disabledDate={this.dateDisabled.bind(this)} style={{width:150,marginLeft:8,height:28}}  value={targetDate?moment(targetDate,'YYYY-MM-DD'):null} onChange={this.targetDateChecked.bind(this)}></DatePicker>

                            </Tooltip>

                        </ConfigProvider>

                        {/*<span className="error-tips" style={{display:`${targetDateTips?'block':'none'}`}}>请选择日期</span>*/}

                    </div>

                    <div className="change-info-wrapper clearfix" style={{position:'relative',zIndex:'3'}}>

                        <div className="props">节次:</div>

                        <Tooltip placement="right" visible={targetScheduleTips} title="请选择节次" autoAdjustOverflow={false} getPopupContainer={triggerNode => triggerNode.parentNode}>

                            <DropDown
                            dropSelectd={targetScheduleDropSelectd}
                            dropList={targetScheduleList}
                            width={150}
                            height={200}
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

    const { changeSchedule,teacherList } = state.Manager.AdjustByTeacherModal;

    return{

        changeSchedule,

        teacherList

    }

};

export default connect(mapStateToProps)(ChangeSchedule);