import React,{Component,memo,useEffect,useState} from 'react';

import './index.scss';

import $ from 'jquery';

import {Scrollbars} from 'react-custom-scrollbars';



function SelfDoubleSingleTable(props){

    //元数据
    const [dataSource,setDataSource] = useState([]);

    //列
    const [columns,setColumns] = useState([]);





    const {

        ItemClassHourCount,ItemClassHour=[],leftColWidth,

        commonColWidth,rowOneHeight,rowTowHeight,commonRowHeight,

        schedule

    } = props;

    const {onClickRow,scrollToBottom,ScheduleDetailShow} = props;


    const openScheduleDetail = ({Event,Params}) =>{

        Event.stopPropagation();

        const { ClassHourNO } = Params;

        const { StartTime,EndTime } = ItemClassHour.find(item=>item.ClassHourNO===ClassHourNO);

        Params['StartTime'] = StartTime;

        Params['EndTime'] = EndTime;

        if (ScheduleDetailShow){

            ScheduleDetailShow(Params);

        }

    };

    useEffect(()=>{

        let ScrollTop = 0;

        $('#tb').find('div.ant-table-body').scroll(() => {

            let scrollTop = $('#tb').find('div.ant-table-body').scrollTop();

            if(scrollTop!==ScrollTop){

                ScrollTop = scrollTop;

                let wrapperHeight = $('#tb .ant-table-scroll>.ant-table-body .ant-table-tbody').height();

                let scrollHeight = $('#tb .ant-table-scroll>.ant-table-body').height();

                if ((wrapperHeight - scrollTop + 17)<= scrollHeight){

                    scrollToBottom();

                }

            }

        });

    },[]);


    useEffect(()=>{

        //类型为single-single,double-single,single-double三种

        /*if (dataSource.length>=6){

            $('#tb').find('.ant-table-body').css('overflow','scroll');

            $('#tb').find('.ant-table-scroll>.ant-table-header').css('overflow','scroll');


        }else {

            $('#tb').find('.ant-table-body').css('overflow','auto');

            $('#tb').find('.ant-table-scroll>.ant-table-header').css('overflow','auto');

        }*/

    },[dataSource]);

    useEffect(()=>{

        //将schedule转换为ant 类型的table

        const dataList = [];

        schedule.map((item,key)=>{

            dataList.push({id:item.id,name:item.name,active:item.active,key:key});

        });

        let ClassHourCol=[];

        ItemClassHour.map((i,k)=>{

            schedule.map((item,key)=>{

                let HasSchedule = false;

                let ScheduleItem = '';



                item.list.map((it,kt)=>{

                    if (it.ClassHourNO===i.ClassHourNO){

                        HasSchedule = true;

                        ScheduleItem = it;

                    }

                });

                if (HasSchedule){

                    dataList[key][`ClassHourNO${i.ClassHourNO}`] = ScheduleItem;

                }else{

                    dataList[key][`ClassHourNO${i.ClassHourNO}`] = 'none';

                }


            });

        });

        setDataSource(dataList);

    },[schedule,schedule.length,ItemClassHour]);


    useEffect(()=>{

        //设置头部的td

        const tdCourse = [];

        let ClassHourCol=[];

        ItemClassHour.map((i,k)=>{

            tdCourse.push(<td  className={`course-time time${i.ClassHourNO}`} style={{height:rowTowHeight}}>

                <div className={`course-time-div`} style={{width:commonColWidth,height:"100%"}}>

                    <div className="class-hour">{i.ClassHourName}</div>

                    <div className="class-hour-time">{i.StartTime}-{i.EndTime}</div>

                </div>

            </td>);

            let Title = <div className="course-time-th" >

                <div className="course">第{i.ClassHourNO}节</div>

                <div className="time">{i.StartTime}-{i.EndTime}</div>

            </div>;



            ClassHourCol.push({title:Title,height:64,dataIndex:`ClassHourNO${i.ClassHourNO}`,render:(item,record)=>{

                    console.log(item);

                    if (item === 'none'){

                        return <div className={`schedule-wrapper empty ${record.active?'active':''}`} style={{height:commonRowHeight}}>

                            --

                        </div>

                    }else{

                        return <div  className={`schedule-wrapper ${record.active?'active':''}`} style={{height:commonRowHeight}}>

                            <div className={`title ${item.type!==1?'unend':''} ${item.ScheduleType!==1&&(parseInt(item.IsOver)===1||item.ScheduleType===2)?'has-flag':''}`} onClick={e=>openScheduleDetail({Event:e,Params:item})} data-id={item.titleID}>{item.title}</div>

                            <div className="second-title" data-id={item.secondTitleID}>{item.secondTitle}</div>

                            <div className="second-title" data-id={item.thirdTitleID}>{item.thirdTitle}</div>

                            {

                                item.ScheduleType!==1?

                                    item.IsOver&&(parseInt(item.IsOver)===1)?

                                        <div className="stoped-flag">已停课</div>

                                        :

                                        (item.ScheduleType===2?

                                            <div className="ongoing-flag"><span>进行中</span></div>

                                            :'')

                                    :''

                            }

                        </div>

                    }


                }});

        });

        let Columns = [

            {

                fixed:"left",

                key:"name",

                dataIndex:"name",

                title:()=>{

                    return <div className="blank-tab"></div>

                },

                render:(item,record)=>{

                    return <div className={`double-single-left-col ${record.active?'active':''}`} style={{height:commonRowHeight}}>

                        <div className="content" title={item}>

                            {item}

                        </div>

                    </div>

                }

            },
            ...ClassHourCol

        ];

        setColumns(Columns);

    },[ItemClassHour]);


    console.log(schedule,ItemClassHour);

    useEffect(()=>{

        if ($('.ant-table-fixed-header .ant-table-scroll .ant-table-hide-scrollbar').css("overflow")==='auto'){

            $('.ant-table-fixed-header .ant-table-scroll .ant-table-hide-scrollbar').css("margin-bottom",'0');

        }else{

            $('.ant-table-fixed-header .ant-table-scroll .ant-table-hide-scrollbar').css("margin-bottom","-17px")

        }

        if ($('.full-screen-doing').length>0){

            const width = 140 + ItemClassHour.length*125;

            $('.full-screen-doing .ant-table-wrapper').css({

                "max-width":width+"px",

                "margin":"0 auto"

            });

        }

    });


    return (

        <div className={"self-double-single-table-wrapper"}>

            <Scrollbars style={{height:500}}>

                <table id={"double-single-table1"}>

                    <thead>

                        <th className={"col0"}>

                            <div className="blank"></div>

                        </th>

                    </thead>

                </table>


                <table id={"double-single-table2"}>

                    <thead>

                        {

                            ItemClassHour.map((i,k)=>{

                                return <th className={`col${k+1}`}></th>

                            })

                        }

                    </thead>

                </table>

                <table>


                </table>

                <table>



                </table>

            </Scrollbars>

        </div>

    );


}
export default memo(SelfDoubleSingleTable);