import React,{useEffect,useState,useCallback,useMemo,memo,useRef} from 'react';

import './index.scss';

function ContentItem(props) {

    const {className,tabName,type} = props;


    //type:archives(用户档案)

    return(

        <li className={`content-item ${className?className:''}`}>

            <div className={`item-tab`}>

                <div className={"tab-content"}>

                    <div className={`tab-logo ${type?type:'archives'}`}>{tabName}</div>

                </div>

                <i className={"tab-shadow"}></i>

            </div>


        </li>

    )

}

export default memo(ContentItem);