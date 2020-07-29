import React,{useMemo,memo,useState,useCallback,useEffect} from 'react';

import { Button } from "../../../../common";

import {getQueryVariable} from "../../../../common/js/disconnect";

function TopButtons(props){

    const [isFrame,setIsFrame] = useState(false);


    const { Power } = props;

    const {AdjustScheduleShow,AddTempScheduleShow,Import} = props;


    useEffect(()=>{

        if (getQueryVariable('iFrame')){

            setIsFrame(true);

        }

    },[]);



        return (

            <div className="teacher-top-btns clearfix">

                {

                    Power.Adjust?

                        <Button color="blue" className="teacher-btn adjust-schedule" onClick={()=>AdjustScheduleShow()}>调整课表</Button>

                        :''

                }

                {

                    Power.AddImport?

                        <React.Fragment>

                            {

                                !isFrame?

                                    <Button color="blue" className="teacher-btn import-schedule" onClick={()=>Import()}>导入课程安排</Button>

                                    :null

                            }

                            <Button color="blue" className="teacher-btn adjust-schedule" onClick={()=>AddTempScheduleShow()}>添加临时课程</Button>

                        </React.Fragment>

                        :''


                }


            </div>

        );

}

export default memo(TopButtons);