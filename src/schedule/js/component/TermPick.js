import React,{useEffect,useState,memo,useMemo} from 'react';

import {DropDown} from "../../../common";


function TermPick(props){

    const [prevDisabled,setPrevDisabled] = useState('');

    const [nextDisabled,setNextDisabled] = useState('');

    const {ItemTermName,WeekNO,ItemWeek,NowWeekNo,weekPickEvent,weekNextEvent,weekPrevEvent} = props;



    useEffect(()=>{

        if (ItemWeek.length>0){

            let pDisablde = '',nDisabled='';

            switch (NowWeekNo) {

                case ItemWeek[0].value:

                    pDisablde = 'disabled';

                    nDisabled = '';

                    break;

                case ItemWeek[ItemWeek.length-1].value:

                    pDisablde = '';

                    nDisabled = 'disabled';

                    break;

                default:

                    pDisablde = '';

                    nDisabled = '';

            }

            setNextDisabled(nDisabled);

            setPrevDisabled(pDisablde);

        }

    },[NowWeekNo]);


    const WeekList = useMemo(()=>{

        return ItemWeek.map(item=>{

            if(item.value===WeekNO){

                return { value:item.value,title:<span>{item.title}<span style={{color:'#999'}}> (本周)</span></span>}

            }else{

                return item;

            }

        });

    },[ItemWeek]);


    return (

        <div className="term-pick-wrapper work-plant-form clearfix">

            <button className={`prev ${prevDisabled}`}  onClick={prevDisabled?()=>{}:()=>{weekPrevEvent()}}>&lt;&nbsp;上一周</button>

            <div className="term-title">

                {ItemTermName?ItemTermName:''}

                第<DropDown dropSelectd={{title:NowWeekNo,value:NowWeekNo}}

                onChange={(e)=>{weekPickEvent(e)}}

                dropList={WeekList} width={80} height={188}

                TitleShow={false}

                style={{zIndex:10}}

                dropSimpleSearch={false}

            >

                </DropDown>周

            </div>

            <button className={`next ${nextDisabled}`} onClick={nextDisabled?()=>{}:()=>{weekNextEvent()}}>下一周&nbsp;&gt;</button>

        </div>

    );

}

export default memo(TermPick);