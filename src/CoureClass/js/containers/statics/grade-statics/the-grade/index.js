import React,{useEffect,useCallback,useState,useRef,useMemo,memo} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import {Loading,PagiNation,Empty} from "../../../../../../common";

import TitleBar from '../../../../component/plugins/title-bar';

import {logCountUpdate} from "../../../../reducers/commonSetting";

import CardTab from '../../../../component/plugins/card-tab';

import {NavLink} from 'react-router-dom';

import {GetGradeSubjectCouseclassSumarry_Middle} from '../../../../actions/apiActions';

import StaticsCircle from '../../../../component/plugins/statics-circle';

import './index.scss';
import {manageBreadCrumbChange} from "../../../../reducers/breadCrumb";

function TheCollege(props) {

    //loading
    const [loading,setLoading] = useState(true);


    //统计
    const [statics,setStatics] = useState([

        {title:'学科数量',value:0,id:'subject'},

        {title:'教学班数量',value:0,id:'courseClass'},

        {title:'任课教师数量',value:0,id:'teacher'},

        {title:'学生人数',value:0,id:'student'}

    ]);

    //卡片
    const [cardList,setCardList] = useState([]);



    const {SchoolID,UserType,UserID} = useSelector(state=>state.LoginUser);

    const {grade} = useSelector(state=>state.breadCrumb);

    const {gradeID,gradeName} = grade;

    const dispatch = useDispatch();

    const {history} = props;



    useEffect(()=>{

        let isUnmount = false;

        if (!gradeID){

            history.push('/statics/grade/total');

        }else if (SchoolID){

            GetGradeSubjectCouseclassSumarry_Middle({schoolID:SchoolID,userID:UserID,userType:UserType,gradeID,dispatch}).then(data=>{

                if (!isUnmount){

                    if (data){

                        const subjectCount = data.SubjectCount?data.SubjectCount:0;

                        const courseClass = data.CourseClassCount?data.CourseClassCount:0;

                        const teacher = data.TeacherCount?data.TeacherCount:0;

                        const student = data.StudentCount?data.StudentCount:0;

                        const LogCount = data.LastLogCount?data.LastLogCount:0;

                        const list = data.Item&&data.Item.length>0?data.Item.map(i=>{

                            const CardItemList = [

                                {CardProps:'教学班数量:',CardValue:<span>{i.CourseClassCount}个<span style={{color:'#999999'}}>(走班数量{i.TeachingClassCount}个)</span></span>},

                                {CardProps:'任课教师数量:',CardValue:`${i.TeacherCount}人`},

                                {CardProps:'学生数量:',CardValue:`${i.StudentCount}人`},

                            ];

                            return{

                                CardID:i.ObjectID,

                                CardName:i.ObjectName,

                                CardItemList

                            };

                        }):[];

                        setCardList(list);

                        setStatics([

                            {title:'学科数量',value:subjectCount,id:'subject'},

                            {title:'教学班数量',value:courseClass,id:'courseClass'},

                            {title:'任课教师数量',value:teacher,id:'teacher'},

                            {title:'学生人数',value:student,id:'student'},

                        ]);

                        dispatch(logCountUpdate(LogCount));

                    }

                    setLoading(false);

                }

            });

        }

        return ()=>{

            isUnmount = true;

        }

    },[SchoolID]);




    //点击卡片
    const tabClick = useCallback(({CardID,CardName})=>{

        dispatch(manageBreadCrumbChange({gradeID,gradeName,subjectID:CardID,subjectName:CardName}));

        history.push('/manage');

    },[]);

    return(

        <Loading spinning={loading} tip={"加载中,请稍候..."}>

            <div className={"the-course-wrapper"}>

                <TitleBar type={"course"} title={<><NavLink to={"/statics/grade/total"}>年级学科教学班统计</NavLink> > {gradeName}</>}></TitleBar>

                <StaticsCircle list={statics}></StaticsCircle>


                {

                    cardList.length > 0 ?

                        <CardTab type={6} list={cardList} tabClick={tabClick}></CardTab>

                        :

                        <Empty type={"3"} title={"暂无教师相关教学班数据"}></Empty>

                }

            </div>

        </Loading>

    )

}

export default memo(TheCollege);