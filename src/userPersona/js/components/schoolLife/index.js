import React, {useEffect, useState, useCallback, useMemo, memo, useRef} from "react";

import { useDispatch, useSelector } from "react-redux";

import ContentItem from '../contentItem';

import {GetStuActivities,GetStuWaring,GetStuDormitory,transferInterface} from "../../actions/apiActions";

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

            value:'--',

            classAvg:'--',

            count:'--'

        },

        homework:{

            value:'--',

            classAvg:'--'

        },

        stayInSchool:{

            value:'--',

            classAvg:'--'

        },

        online:{

            value:'--',

            classAvg:'--'

        }

    });

    //学生异常
    const [stuLateWarning,setStuLateWarning] = useState(0);

    const userArchives = useSelector(state=>state.userArchives);

    const userStatus = useSelector(state=>state.userStatus);

    const {Urls} = useSelector(state=>state.systemUrl);

    const { UserID,UserType } = useSelector(state=>state.targetUser);

    const dispatch = useDispatch();


    //代理
    const proxy = useMemo(()=>{

        return 'http://192.168.2.202:7300/mock/5f40ff6044c5b010dca04032/userPersona';

    },[]);


    useEffect(()=>{

        const {SchoolID} = JSON.parse(sessionStorage.getItem("UserInfo"));

        const getActivities = GetStuActivities({StudentId:UserID,ClassId:userArchives.ClassID,GradeId:userArchives.GradeID,proxy:Urls['860'].WebUrl,dispatch});

        const getWaring = GetStuWaring({StudentId:UserID,ClassId:userArchives.ClassID,GradeId:userArchives.GradeID,proxy:Urls['860'].WebUrl,dispatch});


        if (Urls['E48'].WebUrl){

            const getDormitory = GetStuDormitory({schoolId:SchoolID,userId:UserID,userType:UserType,proxy:Urls['E48'].WebUrl,dispatch});

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

        }else{

            Promise.all([getActivities,getWaring]).then(res=>{

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

                setLoading(false);

            });

        }


    },[]);


    //判断是否有值，没有的话返回--
    const isHasValue = useCallback((value)=>{

        return value?value:'--';

    },[]);


    return(

        <ContentItem type={"life"} tabName={'在校生活信息'}>

            <div className={"school-life-wrapper"}>

              <div className={"life-header clearfix"}>

                  <div className={"study-type"}>

                      <span className={"props"}>就读方式:</span>

                      <span className={"value study"}>{userStatus&&userStatus.studentStatus&&userStatus.studentStatus.length>0?isHasValue(userStatus.studentStatus[0].studyingWay):'--'}</span>

                  </div>


                  {

                      userStatus&&userStatus.studentStatus&&userStatus.studentStatus.length>0&&userStatus.studentStatus[0].studyingWay==='寄宿'?

                          <>

                              <div className={"dormitory"}>

                                  <span className={"props"}>所在寝室:</span>

                                  <span className={"value dormitory"}>{isHasValue(dormitory)}</span>

                                  {

                                      dormitory?

                                          <i className={"icon position"}></i>

                                          :null

                                  }

                              </div>

                              <div className={"late-warning"}>

                                  <span className={"props"}>晚归异常:</span>

                                  <span className={"value late"}>{stuLateWarning}次</span>

                                  <i className={"icon warning"}></i>

                              </div>

                          </>

                          :null

                  }




              </div>

              <ul className={"life-content clearfix"}>

                  <li className={"lift-item attence clearfix"}>

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

                  <li className={"lift-item homework clearfix"}>

                      <i className={"icon"}></i>

                      <div className={"detail-content"}>

                          <div className={"title"}>作业完成率</div>

                          <div className={"rate"}>

                              <span className={"rate-green"}>{stuActivities.homework.value}</span>

                          </div>

                          <div className={"agv-rate"}>

                              班级平均值:{stuActivities.homework.classAvg}

                          </div>

                      </div>

                  </li>

                  <li className={"lift-item stayInSchool clearfix"}>

                      <i className={"icon"}></i>

                      <div className={"detail-content"}>

                          <div className={"title"}>在校时长</div>

                          <div className={"rate"}>

                              <span className={"rate-green"}>{stuActivities.stayInSchool.value}</span>小时/天

                          </div>

                          <div className={"agv-rate"}>

                              班级平均值:{stuActivities.stayInSchool.classAvg}小时/天

                          </div>

                      </div>

                  </li>

                  <li className={"lift-item online clearfix"}>

                      <i className={"icon"}></i>

                      <div className={"detail-content"}>

                          <div className={"title"}>网上时长</div>

                          <div className={"rate"}>

                              <span className={"rate-green"}>{stuActivities.online.value!=='--'?new Number((stuActivities.online.value)/60).toFixed(2):'--'}</span>小时/天

                          </div>

                          <div className={"agv-rate"}>

                              班级平均值:{stuActivities.online.classAvg!=='--'?new Number((stuActivities.online.classAvg)/60).toFixed(2):'--'}小时/天

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