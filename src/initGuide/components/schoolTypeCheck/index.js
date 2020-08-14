import React,{useEffect,useCallback,useMemo,useRef,useState,memo} from 'react';

import {RadioGroup,Radio} from "../../../common";

import './index.scss';

function SchoolTypeCheck(props) {

    const { period } = props;

    const { primary,middle,heigh } = period;


    const { periodClick,radioClick } = props;

    return(

        <ul className={"school-type-list"}>

            <li className={"school-type-item clearfix"}>

                <div onClick={e=>periodClick('primary')} className={`period ${!primary.disabled?'active':''}`}>小学</div>

                <i className={"triangle"}></i>

                <RadioGroup onChange={e=>radioClick({type:'primary',value:e.target.value})} value={primary.checked} disabled={primary.disabled}>

                    <Radio value={'5'}>五年制</Radio>

                    <Radio value={'6'}>六年制</Radio>

                </RadioGroup>

            </li>

            <li className={"school-type-item clearfix"}>

                <div onClick={e=>periodClick('middle')} className={`period ${!middle.disabled?'active':''}`}>初中</div>

                <i className={"triangle"}></i>

                <RadioGroup onChange={e=>radioClick({type:'middle',value:e.target.value})} value={middle.checked} disabled={middle.disabled}>

                    <Radio value={'3'}>三年制</Radio>

                    <Radio value={'4'}>四年制</Radio>

                </RadioGroup>

            </li>

            <li className={"school-type-item clearfix"}>

                <div onClick={e=>periodClick('heigh')} className={`period ${!heigh.disabled?'active':''}`}>高中</div>

                <i className={"triangle"}></i>

                <RadioGroup value={heigh.checked} disabled={heigh.disabled}>

                    <Radio value={'3'}>三年制</Radio>

                </RadioGroup>

            </li>

        </ul>

    )

}

SchoolTypeCheck.defaultProps = {

    periodClick:()=>{},

    radioClick:()=>{}

};

export default memo(SchoolTypeCheck);