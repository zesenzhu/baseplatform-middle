import React,{useEffect,useState,useCallback,useMemo,memo,useRef} from 'react';

import './index.scss';

function ContentItem(props) {

    const {className,tabName,type,children} = props;


    //type:archives(用户档案) account(用户账号，个人资料) comment（评价） life（学校生活）

    //material (教学资料) pe（德育） score（成绩） study（学习科目以及课程）

    //work(教学工作量)

    return(

        <li className={`content-item ${className?className:''}`}>

            <div className={`item-tab`}>

                <div className={"tab-content"}>

                    <div className={`tab-logo ${type?type:'archives'}`}>{tabName}</div>

                </div>

                <i className={"tab-shadow"}></i>

            </div>

            <div className={"content-wrapper"}>

                {children}

            </div>


        </li>

    )

}

export default memo(ContentItem);