import React,{useEffect,useCallback,useState,useRef,useMemo,memo} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import {appLoadingHide} from "../../../../reducers/AppLoading";

import {Loading,PagiNation} from "../../../../../../common";

import TitleBar from '../../../../component/plugins/title-bar';

import StaticsCircle from '../../../../component/plugins/statics-circle';

/*
import {GetCollegeCouseclassSumarry_University,GetCollegeCouseclassSumarryForPage_University} from '../../../../actions/apiActions';
*/

import {logCountUpdate} from "../../../../reducers/commonSetting";

import {collegeBreadCrumbChange,breadCrumbInit} from "../../../../reducers/breadCrumb";

import CardTab from '../../../../component/plugins/card-tab';

import './index.scss';


function CollegeTotal(props) {

    //loading
    const [loading,setLoading] = useState(true);

    //学院的loading
    const [collegeLoading,setCollegeLoading] = useState(false);


    //分页
    const [pagination,setPagination] = useState({

       current:1,

       pageSize:9,

       total:0,

       pageSizeList:['9','18','27','36']

    });


    //卡片
    const [cardList,setCardList] = useState([]);

    //统计的列表
    const [staticsList,setStaticsList] = useState([

        {id:'college',value:0,title:'院系数量'},

        {id:'courseClass',value:0,title:'教学班数量'},

        {id:'teacher',value:0,title:'教师数量'},

        {id:'student',value:0,title:'学生数量'}

    ]);



    const {SchoolID,UserType,UserID} = useSelector(state=>state.LoginUser);

    const dispatch = useDispatch();


    const {history} = props;

    //ref
    const paginationRef = useRef(pagination);


    useEffect(()=>{

        /*if (SchoolID) {

            const GetSumarry = GetCollegeCouseclassSumarry_University({schoolID:SchoolID,userType:UserType,userID:UserID,dispatch});

            const GetCourseClass = GetCollegeCouseclassSumarryForPage_University({schoolID:SchoolID,userType:UserType,userID:UserID,pageIndex:1,pageSize:9,dispatch});

            dispatch(breadCrumbInit());

            Promise.all([GetSumarry,GetCourseClass]).then(res=>{

                if (res[0]){

                    const data = res[0];

                    const CollegeCount = data.CollegeCount?data.CollegeCount:0;

                    const CourseClassCount = data.CourseClassCount?data.CourseClassCount:0;

                    const TeacherCount = data.TeacherCount?data.TeacherCount:0;

                    const StudentCount = data.StudentCount?data.StudentCount:0;

                    const LogCount = data.LastLogCount?data.LastLogCount:0;

                    const list = [

                        {id:'college',value:CollegeCount,title:'院系数量'},

                        {id:'courseClass',value:CourseClassCount,title:'教学班数量'},

                        {id:'teacher',value:TeacherCount,title:'教师数量'},

                        {id:'student',value:StudentCount,title:'学生数量'}

                    ];

                    setStaticsList(list);

                    dispatch(logCountUpdate(LogCount));

                }

                if (res[1]){

                    const data = res[1];

                    const total = data.CollegeCount?data.CollegeCount:0;

                   setPagination(d=>{

                       paginationRef.current = {...d,total};

                       return {...d,total};

                   });

                   const list = data.Item&&data.Item.length>0?data.Item.map(i=>{

                       const CardItemList = [

                           {CardProps:'课程数量:',CardValue:`${i.CourseCount}个`},

                           {CardProps:'教学班数量:',CardValue:`${i.CourseClassCount}个`},

                           {CardProps:'任课教师数量:',CardValue:`${i.TeacherCount}人`},

                           {CardProps:'学生数量:',CardValue:`${i.StudentCount}人`},

                       ];

                       return {

                           CardID:i.ObjectID,

                           CardName:i.ObjectName,

                           CardItemList

                       }

                   }):[];

                   setCardList(list);

                }

                setLoading(false);

                dispatch(appLoadingHide());

            })

        }*/

    },[SchoolID]);

    //分页变页码化
    const pageChange = useCallback((current)=>{

        paginationRef.current = {...paginationRef.current,current};

        setPagination(d=>({...d,current}));

        updateCard();

    },[]);

    //分页页容变化

    const pagiSizeChange = useCallback((current,pageSize) =>{

        paginationRef.current = {...paginationRef.current,pageSize,current:1};

        setPagination(d=>({...d,pageSize,current:1}));

        updateCard();

    },[]);

    //更新card列表
    const updateCard = useCallback(()=>{

        const {current,pageSize} = paginationRef.current;

        setCollegeLoading(true);

        /*GetCollegeCouseclassSumarryForPage_University({schoolID:SchoolID,userType:UserType,userID:UserID,pageIndex:current,pageSize,dispatch}).then(data=>{

            if (data){

                const total = data.CollegeCount?data.CollegeCount:0;

                setPagination(d=>{

                    paginationRef.current = {...d,total};

                    return {...d,total};

                });

                const list = data.Item&&data.Item.length>0?data.Item.map(i=>{

                    const CardItemList = [

                        {CardProps:'课程数量:',CardValue:`${i.CourseCount}个`},

                        {CardProps:'教学班数量:',CardValue:`${i.CourseClassCount}个`},

                        {CardProps:'任课教师数量:',CardValue:`${i.TeacherCount}人`},

                        {CardProps:'学生数量:',CardValue:`${i.StudentCount}人`},

                    ];

                    return {

                        CardID:i.ObjectID,

                        CardName:i.ObjectName,

                        CardItemList

                    }

                }):[];

                setCardList(list);

            }

            setCollegeLoading(false);

        });
*/
    },[]);


    //点击某一个学院

    const tabClick = ({CardID,CardName}) =>{

        dispatch(collegeBreadCrumbChange({collegeID:CardID,collegeName:CardName}));

        history.push(`/statics/college/${CardID}`);

    };


    return(

        <Loading spinning={loading} tip={"加载中,请稍候..."}>

            <div className={"college-total-wrapper"}>

                <TitleBar type={"college"} title={"院系教学班统计"}></TitleBar>

                <StaticsCircle list={staticsList}></StaticsCircle>

                <Loading spinning={collegeLoading} tip={"加载中,请稍候..."}>

                    <CardTab tabClick={tabClick} type={1} list={cardList}></CardTab>

                </Loading>


                <PagiNation pageSize={pagination.pageSize} hideOnSinglePage={pagination.pageSize===parseInt(pagination.pageSizeList[0])} showSizeChanger pageSizeOptions={pagination.pageSizeList} onShowSizeChange={pagiSizeChange} total={pagination.total}  current={pagination.current} onChange={pageChange}></PagiNation>

            </div>

        </Loading>

    )

}

export default memo(CollegeTotal);
