import React,{Component} from 'react';

import $ from 'jquery';

class PeriodClassHourSetting extends Component{

    TabToggle(e){

        let TabContainer = $(e.target).closest('.class-hour-setting-wrapper').children('.period-tab');

        let AdjustBtn = $(e.target).closest('.class-hour-setting-wrapper').find('.adjust-class-hour');

        let SettingContent = $(e.target).closest('.class-hour-setting-wrapper').children('.setting-content');

        if (TabContainer.hasClass('up')){

            TabContainer.removeClass('up');

            TabContainer.addClass('down');

            AdjustBtn.hide();

        }else{

            TabContainer.removeClass('down');

            TabContainer.addClass('up');

            AdjustBtn.show();

        }

        SettingContent.slideToggle();

    }

    render() {

        const {

            IsUnify, PeriodID, PeriodName, ClassHourList,

            AdjustClassHour, AddClassHour, EditClassHour,

            DelClassHour

        } = this.props;

        return (

            <div className="class-hour-setting-wrapper">


                <div className={`period-tab ${IsUnify?'':'down'}`} onClick={IsUnify?()=>{}:this.TabToggle.bind(this)}>

                    {

                        IsUnify?

                            ''

                            :<div className="title" text={PeriodName}>{PeriodName}</div>

                    }

                    <a className="adjust-class-hour" style={IsUnify?{display:"block"}:{}} onClick={(e)=>AdjustClassHour({IsUnify,PeriodID,ClassHourList,Event:e})}>批量调整上课时间</a>

                </div>

                <div className='setting-content' style={IsUnify?{display:'block'}:{}}>

                    <div className="morning-wrapper">

                        <div className="morning-class-hour-wrapper clearfix">

                            {

                                ClassHourList.Morning.map((item,key)=>{

                                    return <div key={key} className="class-hour-item-wrapper">

                                            <div className="class-hour-item">

                                                <div className="class-hour-name">{item.ClassHourName}</div>

                                                <div className="class-hour-time">{item.StartTime}-{item.EndTime}</div>

                                                <button className="class-hour-edit" onClick={()=>EditClassHour({Type:item.ClassHourType,IsUnify,PeriodID,StartTime:item.StartTime,EndTime:item.EndTime,ClassHourNO:item.ClassHourNO,ClassHourName:item.ClassHourName})}></button>

                                                <button className="class-hour-del" onClick={()=>DelClassHour({PeriodID,ClassHourNO:item.ClassHourNO})}></button>

                                            </div>

                                        </div>

                                })

                            }

                            <div className="class-hour-item-wrapper add" onClick={()=>AddClassHour({IsUnify,PeriodID,type:'morning'})}>

                                <div className="class-hour-item">

                                    <div className="row"></div>

                                    <div className="col"></div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="afternoon-wrapper">

                        <div className="afternoon-class-hour-wrapper clearfix">

                            {

                                ClassHourList.Afternoon.map((item,key)=>{

                                    return <div key={key} className="class-hour-item-wrapper">

                                            <div className="class-hour-item">

                                                <div className="class-hour-name">{item.ClassHourName}</div>

                                                <div className="class-hour-time">{item.StartTime}-{item.EndTime}</div>

                                                <button className="class-hour-edit" onClick={()=>EditClassHour({Type:item.ClassHourType,IsUnify,PeriodID,StartTime:item.StartTime,EndTime:item.EndTime,ClassHourNO:item.ClassHourNO,ClassHourName:item.ClassHourName})}></button>

                                                <button className="class-hour-del" onClick={()=>DelClassHour({PeriodID,ClassHourNO:item.ClassHourNO})}></button>

                                            </div>

                                        </div>

                                })

                            }

                            <div className="class-hour-item-wrapper add" onClick={()=>AddClassHour({IsUnify,PeriodID,type:'afternoon'})}>

                                <div className="class-hour-item">

                                    <div className="row"></div>

                                    <div className="col"></div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        );

    }

}

export default PeriodClassHourSetting;