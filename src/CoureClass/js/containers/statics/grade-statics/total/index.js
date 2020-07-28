import React,{useEffect,useCallback,useState,useRef,useMemo,memo} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import {appLoadingHide} from "../../../../reducers/AppLoading";

import {Loading,PagiNation} from "../../../../../../common";

import TitleBar from '../../../../component/plugins/title-bar';

import StaticsCircle from '../../../../component/plugins/statics-circle';

import { GetGradeCouseclassSumarry_Middle } from '../../../../actions/apiActions';

import {logCountUpdate} from "../../../../reducers/commonSetting";

import { breadCrumbInit, gradeBreadCrumbChange} from "../../../../reducers/breadCrumb";

import CardTab from '../../../../component/plugins/card-tab';

import './index.scss';


function GradeTotal(props) {

    //loading
    const [loading,setLoading] = useState(true);


    //卡片
    const [cardList,setCardList] = useState([]);

    //统计的列表
    const [staticsList,setStaticsList] = useState([

        {id:'grade',value:0,title:'年级数量'},

        {id:'courseClass',value:0,title:'教学班数量'},

        {id:'teacher',value:0,title:'教师数量'},

        {id:'student',value:0,title:'学生人数'}

    ]);


    const {SchoolID,UserType,UserID} = useSelector(state=>state.LoginUser);

    const dispatch = useDispatch();


    const {history} = props;


    useEffect(()=>{

        if (SchoolID) {


            dispatch(breadCrumbInit());

           GetGradeCouseclassSumarry_Middle({schoolID:SchoolID,userType:UserType,userID:UserID,dispatch}).then(data=>{

               if (data){

                   const GradeCount = data.GradeCount?data.GradeCount:0;

                   const CourseClassCount = data.CourseClassCount?data.CourseClassCount:0;

                   const TeacherCount = data.TeacherCount?data.TeacherCount:0;

                   const StudentCount = data.StudentCount?data.StudentCount:0;

                   const LogCount = data.LastLogCount?data.LastLogCount:0;

                   const list = [

                       {id:'grade',value:GradeCount,title:'年级数量'},

                       {id:'courseClass',value:CourseClassCount,title:'教学班数量'},

                       {id:'teacher',value:TeacherCount,title:'教师数量'},

                       {id:'student',value:StudentCount,title:'学生数量'}

                   ];

                   const cardList = data.Item&&data.Item.length>0?data.Item.map(i=>{

                       const CardItemList = [

                           {CardProps:'学科数量:',CardValue:<span>{i.SubjectCount}个</span>},

                           {CardProps:'教学班数量:',CardValue:<span>{i.CourseClassCount}个<span style={{color:'#999999'}}>(走班数量{i.TeachingClassCount}个)</span></span>},

                           {CardProps:'任课教师数量:',CardValue:`${i.TeacherCount}人`},

                           {CardProps:'学生数量:',CardValue:`${i.StudentCount}人`},

                       ];

                       return {

                           CardID:i.ObjectID,

                           CardName:i.ObjectName,

                           CardItemList

                       }

                   }):[];

                   setCardList(cardList);

                   setStaticsList(list);

                   dispatch(logCountUpdate(LogCount));

               }

               setLoading(false);

               dispatch(appLoadingHide());

           });

        }

    },[SchoolID]);







    //点击某一个教研室

    const tabClick = ({CardID,CardName}) =>{

        dispatch(gradeBreadCrumbChange({gradeID:CardID,gradeName:CardName}));

        history.push(`/statics/grade/${CardID}`);

    };


    return(

        <Loading spinning={loading} tip={"加载中,请稍候..."}>

            <div className={"teacher-total-wrapper"}>

                <TitleBar type={"college"} title={"年级学科教学班统计"}></TitleBar>

                <StaticsCircle list={staticsList}></StaticsCircle>

                <CardTab tabClick={tabClick} type={2} list={cardList}></CardTab>

            </div>

        </Loading>

    )

}

export default memo(GradeTotal);
