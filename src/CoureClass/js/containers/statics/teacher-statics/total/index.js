import React,{useEffect,useCallback,useState,useRef,useMemo,memo} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import {appLoadingHide} from "../../../../reducers/AppLoading";

import {Loading,PagiNation} from "../../../../../../common";

import TitleBar from '../../../../component/plugins/title-bar';

import StaticsCircle from '../../../../component/plugins/statics-circle';

// import {GetTeacherCouseclassSumarry_University,GetTeachingRoomForPage_University } from '../../../../actions/apiActions';

import {logCountUpdate} from "../../../../reducers/commonSetting";

import {teacherBreadCrumbChange,breadCrumbInit} from "../../../../reducers/breadCrumb";

import CardTab from '../../../../component/plugins/card-tab';

import './index.scss';


function TeacherTotal(props) {

    //loading
    const [loading,setLoading] = useState(true);

    //教研室loading
    const [cardLoading,setCardLoading] = useState(false);


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

        {id:'teachingRoom',value:0,title:'教研室数量'},

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

            const GetSumarry = GetTeacherCouseclassSumarry_University({schoolID:SchoolID,userType:UserType,userID:UserID,dispatch});

            const GetTeachingRoom = GetTeachingRoomForPage_University({schoolID:SchoolID,userType:UserType,userID:UserID,pageIndex:1,pageSize:9,dispatch});

            dispatch(breadCrumbInit());

            Promise.all([GetSumarry,GetTeachingRoom]).then(res=>{

                if (res[0]){

                    const data = res[0];

                    const TeachingRoomCount = data.TeachingRoomCount?data.TeachingRoomCount:0;

                    const CourseClassCount = data.CourseClassCount?data.CourseClassCount:0;

                    const TeacherCount = data.TeacherCount?data.TeacherCount:0;

                    const StudentCount = data.StudentCount?data.StudentCount:0;

                    const LogCount = data.LastLogCount?data.LastLogCount:0;

                    const list = [

                        {id:'teachingRoom',value:TeachingRoomCount,title:'教研室数量'},

                        {id:'courseClass',value:CourseClassCount,title:'教学班数量'},

                        {id:'teacher',value:TeacherCount,title:'教师数量'},

                        {id:'student',value:StudentCount,title:'学生数量'}

                    ];

                    setStaticsList(list);

                    dispatch(logCountUpdate(LogCount));

                }

                if (res[1]){

                    const data = res[1];

                    const total = data.TeachingRoomCount?data.TeachingRoomCount:0;

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

        setCardLoading(true);

        /*GetTeachingRoomForPage_University({schoolID:SchoolID,userType:UserType,userID:UserID,pageIndex:current,pageSize,dispatch}).then(data=>{

            if (data){

                const total = data.TeachingRoomCount?data.TeachingRoomCount:0;

                setPagination(d=>{

                    paginationRef.current = {...d,current:data.PageIndex,total};

                    return {...d,total,current:data.PageIndex};

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

            setCardLoading(false);

        });
*/
    },[]);


    //点击某一个教研室

    const tabClick = ({CardID,CardName}) =>{

        dispatch(teacherBreadCrumbChange({teachingRoomID:CardID,teachingRoomName:CardName}));

        history.push(`/statics/teacher/${CardID}`);

    };


    return(

        <Loading spinning={loading} tip={"加载中,请稍候..."}>

            <div className={"teacher-total-wrapper"}>

                <TitleBar type={"person"} title={"教师教学班统计"}></TitleBar>

                <StaticsCircle list={staticsList}></StaticsCircle>

                <Loading spinning={cardLoading} tip={"加载中,请稍候..."}>

                    <CardTab tabClick={tabClick} type={5} list={cardList}></CardTab>

                </Loading>

                <PagiNation pageSize={pagination.pageSize} hideOnSinglePage={pagination.pageSize===parseInt(pagination.pageSizeList[0])} showSizeChanger pageSizeOptions={pagination.pageSizeList} onShowSizeChange={pagiSizeChange} total={pagination.total}  current={pagination.current} onChange={pageChange}></PagiNation>

            </div>

        </Loading>

    )

}

export default memo(TeacherTotal);
