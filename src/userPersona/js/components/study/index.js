import React, {useEffect, useState, useCallback, useMemo, memo, useRef} from "react";

import { useDispatch, useSelector } from "react-redux";

import ContentItem from '../contentItem';

import {GetStudentStudyInfo} from "../../actions/apiActions";

import {Empty} from "../../../../common";

import ModuleLoading from "../moduleLoading";

import "./index.scss";


function SchoolLife(props) {

    //loading
    const [loading,setLoading] = useState(true);


    //学生学习数据
    const [studyData,setStudyData] = useState({

        CourseCount:0,

        ScheduleCount:0,

        Item:[]

    });


    const userArchives = useSelector(state=>state.userArchives);

    const userStatus = useSelector(state=>state.userStatus);

    const { UserID,UserType } = useSelector(state=>state.targetUser);

    const dispatch = useDispatch();




    useEffect(()=>{

        const {SchoolID} = JSON.parse(sessionStorage.getItem("UserInfo"));

        GetStudentStudyInfo({schoolID:SchoolID,userID:UserID,dispatch}).then(data=>{

            if (data){

                const ScheduleCount = data.ScheduleCount&&data.ScheduleCount>0?data.ScheduleCount:0;

                const CourseCount = data.CourseCount&&data.CourseCount>0?data.CourseCount:0;

                const Item = data.Item&&data.Item.length>0?data.Item:[];

                setStudyData(d=>({...d,

                    Item,CourseCount,ScheduleCount

                }));

            }

            setLoading(false);

        });

    },[]);


    //判断是否有值，没有的话返回--
    const isHasValue = useCallback((value)=>{

        return value?value:'--';

    },[]);


    return(

        <ContentItem type={"study"} tabName={'学习科目及课程安排'}>

            <div className={"study-wrapper"}>

              <div className={"study-header clearfix"}>

                  共<span className={"red course-count"}>{studyData.CourseCount}</span>门课程,共<span className={"red schedule-count"}>{studyData.ScheduleCount}</span>节课

              </div>

              <ul className={"study-content clearfix"}>


                  {

                      studyData.Item.map(i=>{

                         return(

                             <li key={i.SubjectID} className={"study-item"}>

                                <div className={"title clearfix"}>

                                    <span className={`subject-name ${!i.ClassID?'has-span':''}`}>{i.SubjectName}</span>

                                    {

                                        !i.ClassID?

                                            <span className={"isCourseClass"}>走班</span>

                                            :null

                                    }

                                </div>

                                <table className={"study-table"}>

                                    <tbody>

                                        <tr>

                                            <td className={"col1"}>任课教师:</td>

                                            <td className={"col2"}>

                                                <div className={"teacher-name"} title={i.TeacherName}>{i.TeacherName}</div>

                                            </td>

                                        </tr>

                                        <tr>

                                            <td className={"col1"}>班级名称:</td>

                                            <td className={"col2"}>

                                                <div className={"class-name"} title={i.ClassName?i.ClassName:i.CourseClassName}>{i.ClassName?i.ClassName:i.CourseClassName}</div>

                                            </td>

                                        </tr>

                                        <tr>

                                            <td className={"col1"}>课程安排:</td>

                                            <td className={"col2"}>{i.ScheduleCount}节课</td>

                                        </tr>

                                    </tbody>

                                </table>


                             </li>

                         )

                      })

                  }

              </ul>

              <ModuleLoading loading={loading}></ModuleLoading>

            </div>

        </ContentItem>

    )

}

export default memo(SchoolLife);