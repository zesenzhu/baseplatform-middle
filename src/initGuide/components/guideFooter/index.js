import React,{useEffect,useCallback,useMemo,useRef,useState,memo} from 'react';

import {Button} from "antd";

import './index.scss';

function GuideFooter(props) {

    const {back,next,complete} = props;

    const {backStepClick,nextStepClick,completeClick} = props;

    return(

        <div className="guide-footer">

            {

                back?

                    <Button className={"step-btn back-step"} onClick={backStepClick}>上一步</Button>

                    :null

            }

            {

                next?

                    <Button className={"step-btn next-step"} onClick={nextStepClick}>下一步</Button>

                    :null

            }

            {

                complete?

                    <Button className={"step-btn complete-step"} onClick={completeClick}>完成</Button>

                    :null

            }

        </div>

    )


}

GuideFooter.defaultProps = {

  back:false,

  next:true,

  complete:false,

  backStepClick:()=>{},

  nextStepClick:()=>{},

  completeClick:()=>{}

};

export default memo(GuideFooter);