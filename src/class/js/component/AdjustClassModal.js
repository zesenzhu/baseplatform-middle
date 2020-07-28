import React,{Component} from 'react';

import { DropDown,Tips } from "../../../common";

class AdjustClassModal extends Component{
    render() {

        const {
            checkList,
            schoolClassList,
            gradeSelecd,
            classSelectd,
            classDisabled,
            gradeSelectChange,
            classSelectChange,
            classList,
            errTips,
            errTipsShow
        } = this.props;

        let stuList = checkList.map(item=>{return JSON.parse(item)});

        let gradeList = schoolClassList.map((item) => {

            return {value:item.GradeID,title:item.GradeName}

        });

        let classDropList = classList.map(item =>{return {value:item.ClassID,title:item.ClassName}});

        return (
            <div className="adjust-class-wrapper">

                <div className="before-tips">

                    提示：为保证系统的正常运行，请勿在教学活动进行时或学期期末时对学生调班。

                </div>

                <div className="adjust-class-obj">

                    <span className="props">调班对象:</span>

                    <span className="objs">
                        {
                            stuList.map((item,key) => {

                                if (key===stuList.length-1){

                                    return `${item.name}`;

                                }else{

                                    return `${item.name}、`;

                                }

                            })
                        }
                        <span className="total">(共<span className="red">{stuList.length}</span>人)</span>

                    </span>

                </div>

                <div className="adjust-class-select">

                    <span className="props">目标班级:</span>

                    <DropDown dropSelectd={gradeSelecd?gradeSelecd:''}
                              dropList={gradeList}
                              onChange={(e)=>gradeSelectChange(e)}
                              style={{zIndex:5}}
                              height={240}>

                    </DropDown>

                    <Tips visible={errTipsShow} title={errTips}>

                        <DropDown dropSelectd ={classSelectd?classSelectd:''}
                                  onChange={e=>classSelectChange(e)}
                                  disabled={classDisabled}
                                  dropList={classDropList}
                                  height={240}>

                        </DropDown>

                    </Tips>


                </div>

                {/*<div className="error-tips" style={{display:`${errTipsShow?'block':'none'}`}}>{errTips}</div>*/}

            </div>
        );
    }
}
export default AdjustClassModal;