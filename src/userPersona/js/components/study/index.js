import React, {useEffect, useState, useCallback, useMemo, memo, useRef} from "react";

import { useDispatch, useSelector } from "react-redux";

import ContentItem from '../contentItem';

import {GetStuActivities,GetStuWaring,GetStuDormitory} from "../../actions/apiActions";

import ModuleLoading from "../moduleLoading";

import "./index.scss";


function SchoolLife(props) {

    //loading
    const [loading,setLoading] = useState(true);


    //学生宿舍
    const [dormitory,setDormitory] = useState('');

    //学生活动
    const [stuActivities,setStuActivities] = useState({

        attence:{

            value:'',

            classAvg:'',

            count:0

        },

        homework:{

            value:'',

            classAvg:''

        },

        stayInSchool:{

            value:'',

            classAvg:''

        },

        online:{

            value:'',

            classAvg:''

        }

    });

    //学生异常
    const [stuLateWarning,setStuLateWarning] = useState(0);

    const userArchives = useSelector(state=>state.userArchives);

    const userStatus = useSelector(state=>state.userStatus);

    const { UserID,UserType } = useSelector(state=>state.targetUser);

    const dispatch = useDispatch();


    //代理
    const proxy = useMemo(()=>{

        return 'http://192.168.2.202:7300/mock/5f40ff6044c5b010dca04032/userPersona';

    },[]);


    useEffect(()=>{

        const {SchoolID} = JSON.parse(sessionStorage.getItem("UserInfo"));

        const getActivities = GetStuActivities({StudentId:UserID,ClassId:userArchives.ClassID,GradeId:userArchives.GradeID,proxy,dispatch});

        const getWaring = GetStuWaring({StudentId:UserID,ClassId:userArchives.ClassID,GradeId:userArchives.GradeID,proxy,dispatch});

        const getDormitory = GetStuDormitory({schoolId:SchoolID,userId:UserID,userType:UserType,proxy,dispatch});

        Promise.all([getActivities,getWaring,getDormitory]).then(res=>{

            if (res[0]){

                const data = res[0][0].ActiveList;

                const attence = {

                        value:data.find(i=>i.Type===1).Value,

                        classAvg:data.find(i=>i.Type===1).AvgClass,

                        count:data.find(i=>i.Type===2).Value

                };

                const homework ={

                    value:data.find(i=>i.Type===4).Value,

                    classAvg:data.find(i=>i.Type===4).AvgClass

                };

                const stayInSchool = {

                    value:data.find(i=>i.Type===6).Value,

                    classAvg:data.find(i=>i.Type===6).AvgClass

                };

                const online = {

                    value:data.find(i=>i.Type===5).Value,

                    classAvg:data.find(i=>i.Type===5).AvgClass

                };

                setStuActivities(d=>{

                   return {...d,attence,homework,stayInSchool,online};

                });

            }

            if (res[1]){

                setStuLateWarning(res[1].Count&&res[1].Count>0?res[1].Count:0);

            }

            if (res[2]){

              const data = res[2];

              setDormitory(`${data.buildingName}>${data.floorName}>${data.roomName}>${data.bedName}`)

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

              </div>

              <ul className={"study-content clearfix"}>

                  <li className={"study-item clearfix"}>

                      <i className={"icon"}></i>

                      <div className={"detail-content"}>

                          <div className={"title"}>考勤</div>

                          <div className={"rate"}>

                              请假<span className={"rate-red"}>{stuActivities.attence.count}</span>次,

                              出勤率<span className={"rate-green"}>{stuActivities.attence.value}</span>

                          </div>

                          <div className={"agv-rate"}>

                              班级平均值:{stuActivities.attence.classAvg}

                          </div>

                      </div>

                  </li>

              </ul>

              <ModuleLoading loading={loading}></ModuleLoading>

            </div>

        </ContentItem>

    )

}

export default memo(SchoolLife);