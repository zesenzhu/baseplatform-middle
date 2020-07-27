import React,{useEffect,useCallback,useState,useRef,useMemo,memo} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import {appLoadingHide} from "../../../../reducers/AppLoading";

import {Loading,DropDown} from "../../../../../../common";

import TitleBar from '../../../../component/plugins/title-bar';

/*
import {GetCouseclassSumarryOfCourse_University,GetAllTeachInfo_university} from '../../../../actions/apiActions';
*/

import {logCountUpdate} from "../../../../reducers/commonSetting";

import {breadCrumbInit, courseBreadCrumbChange} from "../../../../reducers/breadCrumb";

import CardTab from '../../../../component/plugins/card-tab';

import Charts from '../../../../component/plugins/charts';

import './index.scss';


function CourseTotal(props) {

    //loading
    const [loading,setLoading] = useState(true);

    //课程的loading
    const [courseLoading,setCourseLoading] = useState(false);

    //学科下拉

    const [subject,setSubject] = useState({

        dropSelectd:{value:'',title:'全部学科'},

        dropList:[]

    });


    //卡片
    const [cardList,setCardList] = useState([]);

    //统计的信息
    const [statics,setStatics] = useState({

        course:0,

        courseClass:0,

        teacher:0,

        student:0

    });

    //图表
    const [charts,setCharts] = useState({

        xAxis:{

            name:'课程类型',

            value:['专业必修','专业选修','公共必修','公共选修','其他']

        },

        yAxis:{

            name:'教学班数量',

        },

        data:[{value:0,id:''},{value:0,id:''},{value:0,id:''},{value:0,id:''},{value:0,id:''}],

        itemColor:{

            start:'#4ce4ff',

            center:'#4cd1ff',

            end:'#49b9ff'

        }

    });


    const {SchoolID,UserType,UserID} = useSelector(state=>state.LoginUser);

    const dispatch = useDispatch();

    const {history} = props;

    //ref
    const subjectRef = useRef(subject);


    useEffect(()=>{

        /*if (SchoolID) {

            const GetAllTeachInfo = GetAllTeachInfo_university({schoolID:SchoolID,dispatch});

            const GetCourseClass = GetCouseclassSumarryOfCourse_University({schoolID:SchoolID,userType:UserType,userID:UserID,subjectID:'',dispatch});

            dispatch(breadCrumbInit());

            Promise.all([GetAllTeachInfo,GetCourseClass]).then(res=>{

                if (res[0]){

                    const data = res[0];

                    const list = data.SubjectItem&&data.SubjectItem.length>0?data.SubjectItem.map(i=>({value:i.SubjectID,title:i.SubjectName})):[];

                    list.unshift({value:'',title:'全部学科'});

                    setSubject(d=>{

                        subjectRef.current = {...d,dropList:list};

                        return {...d,dropList:list}

                    });

                }

                if (res[1]){

                    const data = res[1];

                    const CourseCount = data.CourseCount?data.CourseCount:0;

                    const CourseClassCount = data.CourseClassCount?data.CourseClassCount:0;

                    const TeacherCount = data.TeacherCount?data.TeacherCount:0;

                    const StudentCount = data.StudentCount?data.StudentCount:0;

                    const LogCount = data.LastLogCount?data.LastLogCount:0;

                    let list = [],chartData = [],chartXAis = [];

                    if(data.Item&&data.Item.length>0){

                        data.Item.map(i=>{

                            const CardItemList = [

                                {CardProps:'课程数量:',CardValue:`${i.CourseCount}个`},

                                {CardProps:'教学班数量:',CardValue:`${i.CourseClassCount}个`},

                                {CardProps:'任课教师数量:',CardValue:`${i.TeacherCount}人`},

                                {CardProps:'学生数量:',CardValue:`${i.StudentCount}人`},

                            ];

                            list.push({

                                CardID:i.ObjectID,

                                CardName:i.ObjectName,

                                CardItemList

                            });

                            chartData.push({value:i.CourseClassCount,id:i.ObjectID});

                            chartXAis.push(i.ObjectName);

                        })

                    }

                    setStatics(d=>({...d,course:CourseCount,courseClass:CourseClassCount,teacher:TeacherCount,student:StudentCount}));

                    setCharts(d=>({...d,xAxis:{...d.xAxis,value:chartXAis},data:chartData}));

                    setCardList(list);

                    dispatch(logCountUpdate(LogCount));

                }

                setLoading(false);

                dispatch(appLoadingHide());

            })

        }*/

    },[SchoolID]);



    //学科下拉变化

    const subjectChange = useCallback((data)=>{

        subjectRef.current = {...subjectRef.current,dropSelectd:data};

        setSubject(d=>({...d,dropSelectd:data}));

        updatePage();

    },[]);


    //更新整个界面

    const updatePage = useCallback(()=>{

        const subjectID = subjectRef.current.dropSelectd.value;

        setCourseLoading(true);

        /*GetCouseclassSumarryOfCourse_University({schoolID:SchoolID,userType:UserType,userID:UserID,subjectID,dispatch}).then(data=>{

            if (data){

                const CourseCount = data.CourseCount?data.CourseCount:0;

                const CourseClassCount = data.CourseClassCount?data.CourseClassCount:0;

                const TeacherCount = data.TeacherCount?data.TeacherCount:0;

                const StudentCount = data.StudentCount?data.StudentCount:0;

                const LogCount = data.LastLogCount?data.LastLogCount:0;

                let list = [],chartData = [],chartXAis = [];

                if(data.Item&&data.Item.length>0){

                    data.Item.map(i=>{

                        const CardItemList = [

                            {CardProps:'课程数量:',CardValue:`${i.CourseCount}个`},

                            {CardProps:'教学班数量:',CardValue:`${i.CourseClassCount}个`},

                            {CardProps:'任课教师数量:',CardValue:`${i.TeacherCount}人`},

                            {CardProps:'学生数量:',CardValue:`${i.StudentCount}人`},

                        ];

                        list.push({

                            CardID:i.ObjectID,

                            CardName:i.ObjectName,

                            CardItemList

                        });

                        chartData.push({value:i.CourseClassCount,id:i.ObjectID});

                        chartXAis.push(i.ObjectName);

                    })

                }

                setStatics(d=>({...d,course:CourseCount,courseClass:CourseClassCount,teacher:TeacherCount,student:StudentCount}));

                setCharts(d=>({...d,xAxis:{...d.xAxis,value:chartXAis},data:chartData}));

                setCardList(list);

                dispatch(logCountUpdate(LogCount));

            }

            setCourseLoading(false);

        });
*/
    },[]);


    //点击某一个课程

    const tabClick = useCallback(({CardID,CardName}) =>{

        const {value,title} = subjectRef.current.dropSelectd;

        dispatch(courseBreadCrumbChange({courseType:CardID,courseTypeName:CardName,subjectID:value,subjectName:title}));

        history.push(`/statics/course/${CardID}`);

    },[]);


    //点击图标
    const chartClick = useCallback((courseType)=>{

        const {value,title} = subjectRef.current.dropSelectd;

        let courseTypeName =  '其他';

        switch (parseInt(courseType)) {

            case 1:

                courseTypeName = '专业必修';

                break;

            case 2:

                courseTypeName = '公共必修';

                break;

            case 3:

                courseTypeName = '专业选修';

                break;

            case 4:

                courseTypeName = '公共选修';

                break;

            case 5:

                courseTypeName = '其他';

                break;

        }

        dispatch(courseBreadCrumbChange({courseType:courseType,courseTypeName,subjectID:value,subjectName:title}));

        history.push(`/statics/course/${courseType}`);

    },[]);


    return(

        <Loading spinning={loading} tip={"加载中,请稍候..."}>

            <div className={"course-total-wrapper"}>

                <TitleBar type={"course"} title={"课程教学班统计"}></TitleBar>

                <div className={"drop-statics-title clearfix"}>

                    <div className={"drop-info"}>

                        <DropDown title={"学科:"} onChange={subjectChange} dropSelectd={subject.dropSelectd} dropList={subject.dropList}>


                        </DropDown>

                    </div>

                    <div className={"statics-info"}>

                        {subject.dropSelectd.title}共开设<span className={"red"}>{statics.course}</span>门课程，有<span className={"red"}>{statics.courseClass}</span>个教学班，<span className={"red"}>{statics.teacher}</span>位任课教师，<span className={"red"}>{statics.student}</span>名学生

                    </div>

                </div>

                <Loading spinning={courseLoading} tip={"加载中,请稍候..."}>

                    <Charts chartClick={chartClick} xAxis={charts.xAxis} yAxis={charts.yAxis} itemColor={charts.itemColor} data={charts.data}></Charts>

                    <CardTab tabClick={tabClick} type={3} list={cardList}></CardTab>

                </Loading>

            </div>

        </Loading>

    )

}

export default memo(CourseTotal);
