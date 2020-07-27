import React,{useEffect,useState,useMemo,memo,useCallback,useRef } from 'react';

import BannerTab from '../plugins/banner-tab/index';

import {useSelector,useDispatch} from 'react-redux';

import { NavLink,withRouter } from 'react-router-dom';

import './index.scss';

import '../../../scss/TimeBanner.scss';

import {Button} from 'antd';


import {subNameReg} from "../../actions/utils";

// import {InsertOrEditCourseClass_University} from '../../actions/apiActions';

function Index(props) {



    const LoginUser = useSelector(state=>state.LoginUser);

    const {LogCount} = useSelector(state=>state.commonSetting);

    const { tab,log,btn} = useSelector(state=>state.bannerState);

    const {UserType,UserClass} = useSelector(state=>state.LoginUser);

    const dispatch = useDispatch();

    const { history } = props;


    const AddEditClassRef = useRef();


    //tab
    const tabList = useMemo(()=>{

        return [{TabID:'statics',TabName:'教学班统计',TabPath:'/statics'},{TabID:'manage',TabName:'教学班管理',TabPath:'/manage'}]

    },[]);


    const onAddCourseClassClick = useCallback(() => {

        let CourseNO='',CourseName = '',MajorIDs='';

        setAddEditCourse(data=>({...data,show:true,CourseInfo:{CourseNO,CourseName,MajorIDs}}));

    },[]);


    console.log(props);


    //添加教学班OK

    const addEditOk = useCallback(() =>{

        const { CourseClassID,CourseClassName,showCourseClassTip,GradeID,showGradeTip,CourseNO, showCourseTip, TeacherID, showTeacherTip, ClassIDs, StudentIDs, showModalLoading,hideModalLoading } = AddEditClassRef.current;

        const { SchoolID,UserID,UserType } = JSON.parse(sessionStorage.getItem('UserInfo'));

        let courseClassOk = false,courseOk = false,teacherOk = false,gradeOk=false;

        if (!CourseClassName){

            showCourseClassTip('请输入教学班名称');

        }else{

            let result = subNameReg(CourseClassName);

            if (!result){

                showCourseClassTip('教学班名称格式不正确');

            }else{

                courseClassOk = true;

            }

        }

        if (CourseNO){

            courseOk = true;

        }else{

            showCourseTip();

        }

        if (TeacherID){

            teacherOk = true;

        }else{

            showTeacherTip();

        }

        if (GradeID){

            gradeOk = true;

        }else{

            showGradeTip();

        }


        if (courseClassOk&&courseOk&&teacherOk&&gradeOk){

            showModalLoading();

            /*InsertOrEditCourseClass_University({SchoolID,UserID,GradeID,UserType,CourseClassID,CourseClassName,CourseNO,TeacherID,ClassIDs,StudentIDs,dispatch}).then(data=>{

                if (data===0){

                    setAddEditCourse(e=>({...e,show:false,CourseInfo:{CourseNO:'',CourseName:''}}));

                    dispatch(showSuccessAlert({title:'添加教学班成功！'}));

                    window.updateTeacherCourseClass();

                }

                hideModalLoading();

            })
*/
        }


    },[]);





    return(

        <div className={"banner-wrapper"}>

            {

                tab?

                    <BannerTab tabList={tabList}></BannerTab>

                    :null

            }

            {

                log?

                    <div className={"log-count-wrapper"}>

                <span className="tips">当前共有<span className={"red"}>{LogCount}</span>条更新记录

                    <NavLink target={"_blank"} to={"/Log/Dynamic"} className="tips_handle">查看详情</NavLink>

                </span>

                    </div>

                    :null


            }

            {

                btn?

                    <div className="handle-content">

                        <Button
                            onClick={onAddCourseClassClick}
                            className="content content-button"
                            height="24"
                            type="primary"
                            color="blue"
                            value="添加教学班"
                            shape="round">添加教学班</Button>

                        <NavLink to={"/ImportFile"} target="_blank">

                            <Button
                                className="content content-button"
                                height="24"
                                type="primary"
                                color="blue"
                                value="导入教学班"
                                shape="round"
                            >导入教学班</Button>

                        </NavLink>
                    </div>

                    :null

            }

        </div>

    )

}

export default memo(Index);