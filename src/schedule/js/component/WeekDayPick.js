import React,{useState,useEffect,useMemo,memo} from 'react';

import {DropDown} from "../../../common";

import moment from 'moment';

function WeekDayPick(props) {


    //不能向前一天
    const [prevDisabled,setPrevDisabled] = useState(false);


    //不能向后一天
    const [nextDisabled,setNextDisabled] = useState(false);


    const { WeekList,NowWeekNO,NowWeekDay,NowClassDate,OriginWeekList } = props;

    const {weekDateChange} = props;

    useEffect(()=>{

        const preDis = NowWeekNO===1&&NowWeekDay===1;

        const nextDis = NowWeekNO===(OriginWeekList?OriginWeekList.length:0)&&NowWeekDay===7;

        setPrevDisabled(preDis);

        setNextDisabled(nextDis);

    },[NowWeekNO,NowWeekDay]);



    const dateList = useMemo(()=>{

        return [

            {value:1,title:'一'},

            {value:2,title:'二'},

            {value:3,title:'三'},

            {value:4,title:'四'},

            {value:5,title:'五'},

            {value:6,title:'六'},

            {value:7,title:'日'},

        ]

    },[]);

    const weekDayTitle = useMemo(()=>{

        let title = '';

        switch (NowWeekDay) {

            case 1:

                title = '一';

                break;

            case 2:

                title = '二';

                break;

            case 3:

                title = '三';

                break;

            case 4:

                title = '四';

                break;

            case 5:

                title = '五';

                break;

            case 6:

                title = '六';

                break;

            case 7:

                title = '日';

                break;


        }

        return title;

    },[NowWeekDay]);


    //日期变化，在原本的基础上变化
    const dateChange = ({forward,reback,days,week}) =>{//四个参数只能同时存在1个

        let newClassDate  = NowClassDate;

        let nowMoment = moment(NowClassDate);

        let nowWeekDay = NowWeekDay;

        let nowWeekNO = NowWeekNO;

        if (forward){

            newClassDate = nowMoment.add(1,'d');

            //判断是否超过周次
            if (NowWeekDay===7){

                nowWeekDay = 1;

                nowWeekNO = NowWeekNO+1;

            }else{

                nowWeekDay = NowWeekDay+1;

            }

        }else if (reback) {

            newClassDate = nowMoment.subtract(1,'d');

            //判断是否超过周次
            if (NowWeekDay===1){

                nowWeekDay = 7;

                nowWeekNO = NowWeekNO-1;

            }else{

                nowWeekDay = NowWeekDay-1;

            }

        }else if (days){

            const day = days - NowWeekDay;

            newClassDate = nowMoment.add(day,'d');

            nowWeekDay = days;

        }else{

            const weekD = week - NowWeekNO;

            newClassDate = nowMoment.add(weekD, 'week');

            nowWeekNO = week;

        }

        weekDateChange(newClassDate.format("YYYY-MM-DD"),nowWeekNO,nowWeekDay);

    };


    return(

        <div className="term-pick-wrapper work-plant-form week-day-pick clearfix">

            <button className={`prev ${prevDisabled?'disabled':''}`}  onClick={prevDisabled?()=>{}:()=>{dateChange({reback:true})}}>&lt;&nbsp;前一天</button>

            <div className="term-title">

                第<DropDown dropSelectd={{title:NowWeekNO,value:NowWeekNO}}

                           onChange={(e)=>{dateChange({week:e.value})}}

                           dropList={WeekList} width={72}

                           TitleShow={false}

                           style={{zIndex:10}}>

            </DropDown>周

             星期

                <DropDown dropSelectd={{title:weekDayTitle,value:NowWeekDay}}

                          onChange={(e)=>{dateChange({days:e.value})}}

                          dropList={dateList} width={72}

                          TitleShow={false}

                          style={{zIndex:10}}>

                </DropDown>

                ({NowClassDate})

            </div>

            <button className={`next ${nextDisabled?'disabled':''}`} onClick={nextDisabled?()=>{}:()=>{dateChange({forward:true})}}>后一天&nbsp;&gt;</button>

        </div>

    )

}

WeekDayPick.defaultProps={

    NowWeekNO:1,

    NowWeekDay:1,

    NowClassDate:'',

    WeekList:[],

    OriginWeekList:[],

    weekDateChange:()=>{}

};

export default memo(WeekDayPick);