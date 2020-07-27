import React,{useEffect,useCallback,useState,useRef,useMemo,memo} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import {Loading,Empty} from "../../../../../../common";

import TitleBar from '../../../../component/plugins/title-bar';

import {logCountUpdate} from "../../../../reducers/commonSetting";

import CardTab from '../../../../component/plugins/card-tab';

import {NavLink} from 'react-router-dom';

import {manageBreadCrumbChange} from "../../../../reducers/breadCrumb";

// import {GetCollegeGradeCouseclassSumarry_University} from '../../../../actions/apiActions';

import Charts from '../../../../component/plugins/charts';

import './index.scss';

function TheCollege(props) {

    //loading
    const [loading,setLoading] = useState(true);

    
    //一句话的统计
    const [statics,setStatics] = useState({

       course:0,

       courseClass:0,

       teacher:0,

       student:0

    });

    //图标数据
    const [charts,setCharts] = useState({

        xAxis:{

            name:'年级',

            value:[]

        },

        yAxis:{

            name:'教学班数量'

        },

        data:[],

        itemColor:{

            start:'#50c013',

            center:'#7acd25',

            end:'#a5db38'

        }

    });

    //卡片
    const [cardList,setCardList] = useState([]);

    const {SchoolID,UserType,UserID} = useSelector(state=>state.LoginUser);

    const {college} = useSelector(state=>state.breadCrumb);

    const {collegeID,collegeName} = college;

    const dispatch = useDispatch();

    const {history} = props;


    useEffect(()=>{

        /*if (!collegeName){

            history.push('/statics/college/total');

        }else if (SchoolID){

            GetCollegeGradeCouseclassSumarry_University({schoolID:SchoolID,userID:UserID,userType:UserType,collegeID,dispatch}).then(data=>{

                if (data){

                    const course = data.CourseCount? data.CourseCount:0;

                    const courseClass = data.CourseClassCount?data.CourseClassCount:0;

                    const teacher = data.TeacherCount?data.TeacherCount:0;

                    const student = data.StudentCount?data.StudentCount:0;

                    const LogCount = data.LastLogCount?data.LastLogCount:0;

                    dispatch(logCountUpdate(LogCount));

                    const list = [],chartData = [],chartAxis = [];

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

                            chartAxis.push(i.ObjectName);

                            chartData.push({

                                value:i.CourseClassCount,

                                id:i.ObjectID

                            });

                        })

                    }

                    setCharts(d=>({...d,xAxis:{...d.xAxis,value:chartAxis},data:chartData}));

                    setStatics(d=>({courseClass,course,teacher,student}));

                    setCardList(list);

                }

                setLoading(false);

            })

        }*/

    },[SchoolID]);


    //点击图表

    const chartClick = (gradeID,gradeName) =>{

        dispatch(manageBreadCrumbChange({gradeID,collegeID,collegeName,gradeName}));

        history.push('/manage');

    };

    //点击卡片
    const tabClick = useCallback(({CardID,CardName})=>{

        dispatch(manageBreadCrumbChange({gradeID:CardID,gradeName:CardName,collegeID,collegeName}));

        history.push('/manage');

    },[]);

    return(

        <Loading spinning={loading} tip={"加载中,请稍候..."}>

            <div className={"the-college-wrapper"}>

                <TitleBar type={"college"} title={<><NavLink to={"/statics/college/total"}>院系教学班统计</NavLink> > {collegeName}</>}></TitleBar>

                <div className={"statics-title"}>{collegeName}，共开设<span className={"red"}>{statics.course}</span>门课程，有<span className={"red"}>{statics.courseClass}</span>个教学班，<span className={"red"}>{statics.teacher}</span>位老师，<span className={"red"}>{statics.student}</span>名学生</div>


                {

                    charts.data.length>0?

                        <>

                            <Charts xAxis={charts.xAxis} chartClick={chartClick} yAxis={charts.yAxis} data={charts.data} itemColor={charts.itemColor}></Charts>

                            <CardTab type={2} list={cardList} tabClick={tabClick}></CardTab>

                        </>

                        :<Empty type={"3"} title={"暂无年级相关教学班信息"}></Empty>

                }



            </div>

        </Loading>

    )

}

export default memo(TheCollege);