import React,{useCallback,memo,useEffect,useState,useImperativeHandle,useRef,forwardRef} from 'react';

import './index.scss';

import $ from 'jquery';

import {Scrollbars} from 'react-custom-scrollbars';



function SelfDoubleSingleTable(props,ref){

    //列宽

    const [colWidth,setColWidth] = useState(0);

    //列
    const [columns,setColumns] = useState([]);


    const {

        ItemClassHourCount,ItemClassHour=[],leftColWidth,

        commonColWidth,rowOneHeight,rowTowHeight,commonRowHeight,

        schedule=[]

    } = props;

    const {onClickRow,scrollToBottom,ScheduleDetailShow} = props;


    const ScrollRef = useRef();


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

        const width = $('.self-double-single-table-wrapper').width();

        let itemLen = ItemClassHour.length;

        if (itemLen>8){

            itemLen = 9;

        }

        const colWh = Math.floor(width/(itemLen+1))- 1;

        setColWidth(colWh);

    });


    //左右滚动条滚动

    const tableScroll = useCallback((e)=>{

        const {scrollTop,scrollLeft,top} = e;

       $('#double-single-table1').css({left:`${scrollLeft}px`,top:`${scrollTop}px`});

       $('#double-single-table2').css({top:`${scrollTop}px`});

       $('#double-single-table3').css({left:`${scrollLeft}px`});

      if (top===1){

          scrollToBottom();

      }



    },[]);

    useImperativeHandle(ref,()=>({

        scrollToTop:ScrollRef.current.scrollToTop

    }),[]);

    return (

        <div ref={ref} className={"self-double-single-table-wrapper"}>

            <Scrollbars ref={ScrollRef} style={{height:600}} onScrollFrame={tableScroll}>

                {/*<div className={"table-scroll-wrapper"}>

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

                                                let scheduleDom = '--';

                                                if (findItem){

                                                    scheduleDom = <>

                                                           <div className={`title ${findItem.type!==1?'unend':''}`} title={findItem.title}>{findItem.title}</div>

                                                            <div className={"second-title"} title={findItem.secondTitle}>{findItem.secondTitle}</div>

                                                            <div className={"third-title"} title={findItem.thirdTitle}>{findItem.thirdTitle}</div>

                                                    </>

                                                }

                                                return(

                                                    <td className={`row${k+2} col${key+2}`}>

                                                        <div className={`schedule-wrapper`}>{scheduleDom}</div>

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

                </div>*/}

                {/*<div className={"table-scroll-wrapper"}>

                    <div className={"table"} id={"double-single-table1"} style={{width:100/(ItemClassHour.length+1)+'%'}}>

                        <div className={'thead'}>

                            <div className={"th col1 row1"}>

                                <div className="blank"></div>

                            </div>

                        </div>

                    </div>

                    <div className={"table"} id={"double-single-table2"}>

                        <div className="thead">

                        <div className={"th col1 row1"}></div>

                        {

                            ItemClassHour.map((i,k)=>{

                                return <div className={`th col${k+2} row1`}>

                                    <div className={"class-hour-wrapper"}>

                                        <div className={"class-hour-name"}>{i.ClassHourName}</div>

                                        <div className={"time"}>{i.StartTime}-{i.EndTime}</div>

                                    </div>

                                </div>

                            })

                        }

                        </div>

                    </div>

                    <div className={"table"} id={"double-single-table3"} style={{width:100/(ItemClassHour.length+1)+'%'}}>

                        <div className="tbody">

                        <div className="tr">

                            <div className={"td row1 col1"}></div>

                        </div>

                        {

                            schedule.map((i,k)=>{

                                return(

                                    <div className="tr">

                                        <div className={`td row${k+2} col1`}>

                                            <div className={"row-name"} title={i.name}>{i.name}</div>

                                        </div>

                                    </div>

                                )

                            })

                        }

                        </div>

                    </div>

                    <div className={"table"} id={"double-single-table4"}>

                        <div className="thead">

                            <div className="tr">

                                <div className={"th col1 row1"}></div>


                                {

                                    ItemClassHour.map((i,k)=>{

                                        return <div className={`th col${k+2} row1`}></div>

                                    })

                                }

                            </div>

                        </div>

                        <div>

                        {

                            schedule.map((i,k)=>{

                                return(

                                    <div className="tr">

                                        <div className={`td row${k+2} col1`}></div>

                                        {

                                            ItemClassHour.map((item,key)=>{

                                                const findItem = i.list.find(i=>i.ClassHourNO===item.ClassHourNO);

                                                let scheduleDom = '--';

                                                if (findItem){

                                                    scheduleDom = <>

                                                        <div className={`title ${findItem.type!==1?'unend':''}`} title={findItem.title}>{findItem.title}</div>

                                                        <div className={"second-title"} title={findItem.secondTitle}>{findItem.secondTitle}</div>

                                                        <div className={"third-title"} title={findItem.thirdTitle}>{findItem.thirdTitle}</div>

                                                    </>

                                                }

                                                return(

                                                    <div className={`td row${k+2} col${key+2}`}>

                                                        <div className={`schedule-wrapper`}>{scheduleDom}</div>

                                                    </div>

                                                )

                                            })

                                        }

                                    </div>

                                )

                            })

                        }

                        </div>

                    </div>

                </div>*/}

                <table id={"double-single-table1"} border="0">

                    <thead>

                        <tr>

                            <th className={"col1 row1"}>

                                <div className="blank" style={{width:colWidth}}></div>

                            </th>

                        </tr>

                    </thead>

                </table>

                <table id={"double-single-table2"} border="0">

                    <thead>

                        <tr>

                            <th className={"col1 row1"}>

                                <div className={"blank"} style={{width:colWidth}}></div>

                            </th>

                            {

                                ItemClassHour.map((i,k)=>{

                                    return <th key={i.ClassHourNO} className={`col${k+2} row1`}>

                                        <div className={"class-hour-wrapper"} style={{width:colWidth}}>

                                            <div className={"class-hour-name"}>{i.ClassHourName}</div>

                                            <div className={"time"}>{i.StartTime}-{i.EndTime}</div>

                                        </div>

                                    </th>

                                })

                            }

                        </tr>

                    </thead>

                </table>

                <table id={"double-single-table3"} border="0">

                    <tbody>

                    <tr>

                        <td className={"row1 col1"}>

                            <div className={"blank"} style={{width:colWidth}}></div>

                        </td>

                    </tr>

                    {

                        schedule.map((i,k)=>{

                            return(

                                <tr key={i.id}>

                                    <td className={`row${k+2} col1`}>

                                        <div style={{width:colWidth}} className={"row-name"} title={i.name}>{i.name}</div>

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

                            <th className={"col1 row1"}>

                                <div className={"blank"} style={{width:colWidth}}></div>

                            </th>


                            {

                                ItemClassHour.map((i,k)=>{

                                    return <th key={i.ClassHourNO} className={`col${k+2} row1`}>

                                        <div className={"top-blank"} style={{width:colWidth}}></div>

                                    </th>

                                })

                            }

                        </tr>

                    </thead>

                    <tbody>

                    {

                        schedule.map((i,k)=>{

                            return(

                                <tr key={i.id}>

                                    <td className={`row${k+2} col1`}>

                                        <div className={"blank"} style={{width:colWidth}}></div>

                                    </td>

                                    {

                                        ItemClassHour.map((item,key)=>{

                                            const findItem = i.list.find(i=>i.ClassHourNO===item.ClassHourNO);

                                            let scheduleDom = '--';

                                            if (findItem){

                                                scheduleDom = <>

                                                    <div className={`title ${findItem.type!==1?'unend':''}`} onClick={e=>openScheduleDetail({Event:e,Params:findItem})} title={findItem.title}>{findItem.title}</div>

                                                    <div className={"second-title"} title={findItem.secondTitle}>{findItem.secondTitle}</div>

                                                    <div className={"third-title"} title={findItem.thirdTitle}>{findItem.thirdTitle}</div>

                                                    {

                                                        findItem.ScheduleType!==1?

                                                            findItem.IsOver&&(parseInt(findItem.IsOver)===1)?

                                                                <div className="stoped-flag">已停课</div>

                                                                :

                                                                null

                                                            :''

                                                    }

                                                </>

                                            }

                                            return(

                                                <td key={item.ClassHourNO} className={`row${k+2} col${key+2}`}>

                                                    <div className={`schedule-wrapper`} style={{width:colWidth}}>{scheduleDom}</div>

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

            </Scrollbars>

        </div>

    );


}



export default memo(forwardRef(SelfDoubleSingleTable));