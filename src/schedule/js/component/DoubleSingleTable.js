import React,{Component,memo,useEffect,useState} from 'react';

import { Table } from "../../../common";

import $ from 'jquery';

function DoubleSingleTable(props){

    //元数据
    const [dataSource,setDataSource] = useState([]);

    //列
    const [columns,setColumns] = useState([]);


    const {

        ItemClassHourCount,ItemClassHour,leftColWidth,

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

        if (dataSource.length>=6){

            $('#tb').find('.ant-table-body').css('overflow','scroll');

            $('#tb').find('.ant-table-scroll>.ant-table-header').css('overflow','scroll');


        }else {

            $('#tb').find('.ant-table-body').css('overflow','auto');

            $('#tb').find('.ant-table-scroll>.ant-table-header').css('overflow','auto');

        }

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

                })

                if (HasSchedule){

                    dataList[key][`ClassHourNO${i.ClassHourNO}`] = ScheduleItem;

                }else{

                    dataList[key][`ClassHourNO${i.ClassHourNO}`] = 'none';

                }


            });

       });

       setDataSource(dataList);

    },[schedule,schedule.length]);


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


        //旧代码

        /*//设置头部的td

        let weekColSpan = 0;

        if (ItemClassHourCount){

            for (let value of ItemClassHourCount.values()){

                weekColSpan = weekColSpan + value.CountType;

            }

        }


        let tdWeek =[];

        let tdCourse = [];

        let key = 1;

        //ant table
        let dataSource = [];

        let WeekCol = [];

        //将schedule转换为ant 类型的table
        schedule.map((item,key)=>{

            dataSource.push({id:item.id,name:item.name,active:item.active,key:key});

        });


        for (let i = 0; i <= 6; i++){

            let weekTitle = '星期一';

            switch (i) {

                case 0:
                    weekTitle = '星期一';
                    break;

                case 1:
                    weekTitle = '星期二';
                    break;

                case 2:
                    weekTitle = '星期三';
                    break;

                case 3:
                    weekTitle = '星期四';
                    break;

                case 4:
                    weekTitle = '星期五';
                    break;

                case 5:
                    weekTitle = '星期六';
                    break;

                case 6:
                    weekTitle = '星期日';
                    break;

                default:
                     weekTitle = '星期一';
            }

            tdWeek.push(<td key={i} colSpan={weekColSpan} className={`week week${i}`} style={{height:rowOneHeight}}>{weekTitle}</td>);

            let ClassHourCol=[];


            for (let j = 1 ;j <= weekColSpan; j++){

                tdCourse.push(<td key={key}  className={`course-time week${i} time${j} col${key}`} style={{height:rowTowHeight}}>

                                  <div className={`course-time-div colDiv${key}`} style={{width:commonColWidth,height:"100%"}}>

                                          {
                                                ItemClassHour.map((item,key) => {

                                                    if(item.ClassHourNO===j){

                                                        return <React.Fragment key={key}>

                                                                    <div className="class-hour">{item.ClassHourName}</div>

                                                                    <div className="class-hour-time">{item.StartTime}-{item.EndTime}</div>

                                                                </React.Fragment>

                                                    }

                                                })
                                          }

                                  </div>

                               </td>);

                key+=1;

                //ant table


                if(dataSource.length>0){

                    dataSource.map((item,key)=>{

                        let HasClass = false;

                        let ClassObj = "";

                        schedule.map((itm,k)=>{

                            if (k===key){

                                itm.list.map((it,ky)=>{

                                    if (it.WeekDay===i&&it.ClassHourNO===j){

                                        HasClass = true;

                                        ClassObj = it;

                                    }

                                })

                            }

                        });

                        if (HasClass){


                            dataSource[key][`${i}${j}`] = ClassObj

                        }else{


                            dataSource[key][`${i}${j}`] = 'none';

                        }

                    });

                }

                let Title = <div className="course-time-th" >

                    <div className="course">第{ItemClassHour[j-1].ClassHourNO}节</div>

                    <div className="time">{ItemClassHour[j-1].StartTime}-{ItemClassHour[j-1].EndTime}</div>

                </div>;


                ClassHourCol.push({title:Title,key:`${i}${j}`,height:64,dataIndex:`${i}${j}`,render:(item,record)=>{


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

            }


            //ant col
            WeekCol.push({key:`week${i}`,title:()=>{return <div className="week-wrapper" >{weekTitle}</div>},children:[...ClassHourCol]});

        }

        //ant columns

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
            ...WeekCol

        ];*/




        return (

            <Table id="tb"  columns={columns} bordered dataSource={dataSource} pagination={false} scroll={{x:1120,y:window.innerHeight-200}} onRow={record=>{return { onClick:onClickRow(record) } }}>



            </Table>

        );


}
export default memo(DoubleSingleTable);