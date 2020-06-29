import React,{Component} from "react";

import { Empty,PagiNation } from "../../../common";

class PartData extends Component{

    render() {

        const { className,PartDataList,type,GradeClick,ClassClick,ResetClassName,delClass,SearchResultShow } = this.props;


        let DataItem ='';

        if (type==='grade'){

            DataItem = (PartDataList&&PartDataList.length>0)?

                    PartDataList.map((item,key)=>{

                        return  <div key={key} className="partdata-tab-item grade">

                                    <a onClick={(e) => GradeClick({id:item.GradeID,name:item.GradeName})}>

                                        <div className="partdata-tab-content">

                                            <div className="partdata-tab-title" title={item.GradeName}>{item.GradeName}</div>

                                            <table className="partdata-tab-table">

                                                <tbody>

                                                    <tr>

                                                        <td className="col1">班级数量:</td>

                                                        <td className="col2">{item.Class}</td>

                                                    </tr>

                                                    <tr>

                                                        <td className="col1">班主任:</td>

                                                        <td className="col2">{item.Ganger}</td>

                                                    </tr>

                                                    <tr>

                                                        <td className="col1">任课教师:</td>

                                                        <td className="col2">{item.CourseTecher}</td>

                                                    </tr>

                                                    <tr>

                                                        <td className="col1">学生人数:</td>

                                                        <td className="col2">{item.Student}</td>

                                                    </tr>

                                                </tbody>

                                            </table>

                                        </div>

                                        <div className="partdata-tab-shadow"></div>

                                    </a>

                                </div>

                    })

                :


                <Empty type="4" title="暂无年级信息"></Empty>;

        }else if (type==='class'){

            DataItem = (PartDataList&&PartDataList.length>0)?

                PartDataList.map((item,key)=>{
                    return <div key={key} className="partdata-tab-item class">

                                <a onClick={(e)=>ClassClick({id:item.ClassID,name:item.ClassName})}>

                                    <div className="partdata-tab-content">
                                        <div className="partdata-tab-title" title={item.ClassName}>{item.ClassName}</div>
                                        <table className="partdata-tab-table">
                                            <tbody>
                                            <tr>
                                                <td className="col1">班主任:</td>
                                                <td className="col2">

                                                    {

                                                        item.GangerName?

                                                            item.GangerName

                                                            :<span className="unset">未设置</span>

                                                    }

                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="col1">任课教师:</td>
                                                <td className="col2">{item.CourseTecher}人</td>
                                            </tr>
                                            <tr>
                                                <td className="col1">学生:</td>
                                                <td className="col2">{item.Student}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div className="cooperate">
                                            <div className="reset" onClick={(e)=>{ResetClassName({ClassID:item.ClassID,ClassName:item.ClassName,Event:e})}}>重命名</div>
                                            <div className="line"></div>
                                            <div className="delete" onClick={(e)=>{delClass({ClassID:item.ClassID,Event:e})}}>删除</div>
                                        </div>
                                    </div>
                                    <div className="partdata-tab-shadow"></div>
                                </a>
                            </div>
                })

                :

                SearchResultShow?

                    <Empty type="5" title="暂无符合条件的班级数据"></Empty>

                    :

                    <Empty type="4" title="暂无班级信息"></Empty>;

        }

        return (
            <div className={`partdata-tab-wrapper ${className} clearfix`}>

                {DataItem}


            </div>
        );
    }
}

export default PartData;