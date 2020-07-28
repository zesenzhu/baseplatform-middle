import React,{useEffect,useState,memo,useCallback,useMemo} from 'react';

import $ from 'jquery';

import './index.scss';



function Index(props) {

    const [ths,setThs] = useState([]);


    const {

        ItemClassHourCount,ItemClassHour,schedule

    } = props;

    useEffect(()=>{

        console.log(ItemClassHour);

        const thsCopy = ItemClassHour.map(i=>{

            return <div className={"top-th-head"}>

                <div className={"class-hour-no"}>{i.ClassHourName}</div>

                <div className={"class-hour-time"}>{i.StartTime}-{i.EndTime}</div>

            </div>

        });

        thsCopy.unshift(<div className={"top-th-head"}></div>);

        setThs(thsCopy);


    },[ItemClassHour]);


    return(

        <div className={"new-schedule-table-wrapper"}>

            {/*<div className={"schedule-tb"} id={"schedule-tb1"}>

                <div className={"thead"}>

                    {ths}

                </div>

            </div>

            <div className={"schedule-tb"} id={"schedule-tb2"}></div>*/}

            <div className="container-fluid">
                <div id="left_div">
                    <div id="left_div1">
                        <table id="left_table1" className="table table-bordered">
                            <tr>
                                <th>我不会动</th>
                            </tr>
                        </table>
                    </div>
                    <div id="left_div2">
                        <table id="left_table2" className="table table-bordered">
                        </table>
                    </div>
                </div>
                <div id="right_div">
                    <div id="right_div1">
                        <div id="right_divx">
                            <table id="right_table1" className="table table-bordered">
                                <tr>
                                    <th>我是表头</th>
                                    <th>我是表头</th>
                                    <th>我是表头</th>
                                    <th>我是表头</th>
                                    <th>我是表头</th>
                                    <th>我是表头</th>
                                    <th>我是表头</th>
                                    <th>我是表头</th>
                                    <th>我是表头</th>
                                    <th>我是表头</th>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div id="right_div2">
                        <table id="right_table2" className="table table-bordered">
                        </table>
                    </div>
                </div>
            </div>

        </div>

    )

}

export default memo(Index);