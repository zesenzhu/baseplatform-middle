import React,{useCallback,memo,useEffect,useState} from 'react';

import './index.scss';

import $ from 'jquery';

import {Scrollbars} from 'react-custom-scrollbars';



function SelfDoubleSingleTable(props){



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


    console.log(schedule,ItemClassHour);


    //左右滚动条滚动

    const tableScroll = useCallback((e)=>{

        const {scrollTop,scrollLeft} = e;

       $('#double-single-table1').css({left:`${scrollLeft}px`,top:`${scrollTop}px`});

       $('#double-single-table2').css({top:`${scrollTop}px`});

       $('#double-single-table3').css({left:`${scrollLeft}px`});

    },[]);

    return (

        <div className={"self-double-single-table-wrapper"}>

            <Scrollbars style={{height:500}} onScrollFrame={tableScroll}>

                <div className={"table-scroll-wrapper"}>

                    <table id={"double-single-table1"} border="0" style={{width:100/(ItemClassHour.length+1)+'%'}}>

                        <thead>

                        <th className={"col1 row1"}>

                            <div className="blank"></div>

                        </th>

                        </thead>

                    </table>

                    <table id={"double-single-table2"} border="0">

                        <thead>

                        <th className={"col1 row1"}></th>

                        {

                            ItemClassHour.map((i,k)=>{

                                return <th className={`col${k+2} row1`}>

                                    <div className={"class-hour-wrapper"}>

                                        <div className={"class-hour-name"}>{i.ClassHourName}</div>

                                        <div className={"time"}>{i.StartTime}-{i.EndTime}</div>

                                    </div>

                                </th>

                            })

                        }

                        </thead>

                    </table>

                    <table id={"double-single-table3"} border="0" style={{width:100/(ItemClassHour.length+1)+'%'}}>

                        <tbody>

                        <tr>

                            <td className={"row1 col1"}></td>

                        </tr>

                        {

                            schedule.map((i,k)=>{

                                return(

                                    <tr>

                                        <td className={`row${k+2} col1`}>

                                            <div className={"row-name"} title={i.name}>{i.name}</div>

                                        </td>

                                    </tr>

                                )

                            })

                        }

                        </tbody>

                    </table>

                    <table id={"double-single-table4"}>

                        <thead>


                        <tr>

                            <th className={"col1 row1"}></th>


                            {

                                ItemClassHour.map((i,k)=>{

                                    return <th className={`col${k+2} row1`}></th>

                                })

                            }

                        </tr>


                        </thead>

                        <tbody>

                        {

                            schedule.map((i,k)=>{

                                return(

                                    <tr>

                                        <td className={`row${k+2} col1`}></td>

                                        {

                                            ItemClassHour.map((item,key)=>{

                                                const findItem = i.list.find(i=>i.ClassHourNO===item.ClassHourNO);

                                                return(

                                                    <td className={`row${k+2} col${key+2}`}>

                                                        <div className={"schedule-wrapper"}>

                                                            {



                                                            }

                                                        </div>

                                                    </td>

                                                )

                                            })

                                        }

                                    </tr>

                                )

                            })

                        }

                        </tbody>

                    </table>

                </div>

            </Scrollbars>

        </div>

    );


}

SelfDoubleSingleTable.defaultProps = {

    ItemClassHour:[],

    schedule:[]

};

export default memo(SelfDoubleSingleTable);