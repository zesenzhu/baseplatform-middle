import React,{useEffect,useState,useRef,useMemo,memo,useCallback} from 'react';

import './index.scss';


function GuideTitle(props) {

    const {step,title,tips} = props;

    return(

        <div className={"guide-setting-title"}>

            <span className={"step"}>

                <i className={"out-circle"}></i>

                <i className={"inner-circle"}></i>

                <span className={"step-no"}>{step}</span>

            </span>

            <span className={"title"}>{title}</span>

            <span className={"tips"}>{tips}</span>

        </div>

    )

}

GuideTitle.defaultProps = {

  step:1,

  title:'',

  tips:''

};

export default memo(GuideTitle);