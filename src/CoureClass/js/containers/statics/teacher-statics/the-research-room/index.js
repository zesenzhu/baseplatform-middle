import React,{useEffect,useCallback,useState,useRef,useMemo,memo} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import {Loading,PagiNation,Empty} from "../../../../../../common";

import TitleBar from '../../../../component/plugins/title-bar';

import {logCountUpdate} from "../../../../reducers/commonSetting";

import CardTab from '../../../../component/plugins/card-tab';

import {NavLink} from 'react-router-dom';

// import {GetTeachingRoomCouseclassSumarry_University,GetTeachingRoomCouseclassSumarryForPage_University} from '../../../../actions/apiActions';

import StaticsCircle from '../../../../component/plugins/statics-circle';

import './index.scss';
import {manageBreadCrumbChange} from "../../../../reducers/breadCrumb";

function TheCollege(props) {

    //loading
    const [loading,setLoading] = useState(true);

    //cardLoading

    const [cardLoading,setCardLoading] = useState(false);

    
    //统计
    const [statics,setStatics] = useState([

        {title:'教学班数量',value:0,id:'courseClass'},

        {title:'任课教师数量',value:0,id:'teacher'},

        {title:'学生人数',value:0,id:'student'}

    ]);

    //卡片
    const [cardList,setCardList] = useState([]);


    //分页
    const [pagination,setPagination] = useState({

        current:1,

        pageSize:9,

        pageSizeList:['9','18','27','36'],

        total:0

    });


    const {SchoolID,UserType,UserID} = useSelector(state=>state.LoginUser);

    const {teacher} = useSelector(state=>state.breadCrumb);

    const {teachingRoomID,teachingRoomName} = teacher;

    const dispatch = useDispatch();

    const {history} = props;


    //ref
    const paginationRef = useRef(pagination);


    useEffect(()=>{

        /*if (!teachingRoomID){

            history.push('/statics/teacher/total');

        }else if (SchoolID){

            const GetSumarry = GetTeachingRoomCouseclassSumarry_University({schoolID:SchoolID,userID:UserID,userType:UserType,teachingRoomID,dispatch});

            const GetCourseType = GetTeachingRoomCouseclassSumarryForPage_University({schoolID:SchoolID,userID:UserID,userType:UserType,teachingRoomID,pageSize:9,pageIndex:1,dispatch});

            Promise.all([GetSumarry,GetCourseType]).then(res=>{

                if (res[0]){

                    const data = res[0];

                    const courseClass = data.CourseClassCount?data.CourseClassCount:0;

                    const teacher = data.TeacherCount?data.TeacherCount:0;

                    const student = data.StudentCount?data.StudentCount:0;

                    const LogCount = data.LastLogCount?data.LastLogCount:0;

                    setStatics([

                        {title:'教学班数量',value:courseClass,id:'courseClass'},

                        {title:'任课教师数量',value:teacher,id:'teacher'},

                        {title:'学生人数',value:student,id:'student'},

                    ]);

                    dispatch(logCountUpdate(LogCount));

                }

                if (res[1]){

                    const data = res[1];

                    const total = data.TeacherCount? data.TeacherCount:0;

                    const list = data.Item&&data.Item.length>0?data.Item.map(i=>{

                        const CardItemList = [

                            {CardProps:'教学班数量:',CardValue:`${i.CourseClassCount}个`},

                            {CardProps:'所教年级:',CardValue:`${i.GradeCount}个`},

                            {CardProps:'学生数量:',CardValue:`${i.StudentCount}人`},

                        ];

                        return{

                            CardID:i.ObjectID,

                            CardName:i.ObjectName,

                            CardItemList

                        };

                    }):[];

                    setCardList(list);

                    setPagination(d=>{

                        paginationRef.current = {...d,total};

                        return {...d,total};

                    });

                }

                setLoading(false);

            });

        }*/

    },[SchoolID]);


    //页码变化

    const pageChange = useCallback((current)=>{

        paginationRef.current = {...paginationRef.current,current};

        setPagination(d=>({...d,current}));

        updateCard();

    },[]);

    //页容变化
    const pageSizeChange = useCallback((pageIndex,pageSize)=>{

        paginationRef.current = {...paginationRef.current,current:1,pageSize};

        setPagination(d=>({...d,pageSize,current:1}));

        updateCard();

    },[]);



    const updateCard = useCallback(()=>{

        const pageIndex = paginationRef.current.current;

        const pageSize = paginationRef.current.pageSize;

        setCardLoading(true);

        /*GetTeachingRoomCouseclassSumarryForPage_University({schoolID:SchoolID,userID:UserID,userType:UserType,teachingRoomID,pageSize,pageIndex,dispatch}).then(data=>{

            if (data){

                const total = data.TeacherCount? data.TeacherCount:0;

                const list = data.Item&&data.Item.length>0?data.Item.map(i=>{

                    const CardItemList = [

                        {CardProps:'教学班数量:',CardValue:`${i.CourseClassCount}个`},

                        {CardProps:'所教年级:',CardValue:`${i.GradeCount}人`},

                        {CardProps:'学生数量:',CardValue:`${i.StudentCount}人`},

                    ];

                    return{

                        CardID:i.ObjectID,

                        CardName:i.ObjectName,

                        CardItemList

                    };

                }):[];

                setCardList(list);

                setPagination(d=>{

                    paginationRef.current = {...d,total,current:data.PageIndex};

                    return {...d,total,current:data.PageIndex};

                });

            }

            setCardLoading(false);

        })
*/
    },[]);


    //点击卡片
    const tabClick = useCallback(({CardID,CardName})=>{

        dispatch(manageBreadCrumbChange({teachingRoomID,teachingRoomName,teacherID:CardID,teacherName:CardName}));

        history.push('/manage');

    },[]);

    return(

        <Loading spinning={loading} tip={"加载中,请稍候..."}>

            <div className={"the-course-wrapper"}>

                <TitleBar type={"course"} title={<><NavLink to={"/statics/teacher/total"}>教师教学班统计</NavLink> > {teachingRoomName}</>}></TitleBar>

                <StaticsCircle list={statics}></StaticsCircle>


                {

                    cardList.length > 0 ?

                        <>

                            <Loading spinning={cardLoading} tip={"加载中,请稍候..."}>

                                <CardTab type={6} list={cardList} tabClick={tabClick}></CardTab>

                            </Loading>

                            <PagiNation total={pagination.total} onChange={pageChange} onShowSizeChange={pageSizeChange}
                                        showSizeChanger
                                        hideOnSinglePage={pagination.pageSize === parseInt(pagination.pageSizeList[0])}
                                        current={pagination.current} pageSizeOptions={pagination.pageSizeList}
                                        pageSize={pagination.pageSize}></PagiNation>

                        </>

                        :

                        <Empty type={"3"} title={"暂无教师相关教学班数据"}></Empty>

                }

            </div>

        </Loading>

    )

}

export default memo(TheCollege);