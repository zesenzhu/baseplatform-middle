import React,{useEffect,useState,useMemo,memo,useCallback,useRef } from 'react';

import BannerTab from '../plugins/banner-tab/index';

import {useSelector,useDispatch} from 'react-redux';

import './index.scss';

import '../../../scss/TimeBanner.scss';

import {Button} from 'antd';

import actions from "../../actions";

import {checkUrlAndPostMsg} from "../../../../common/js/public";

import config from '../../../../common/js/config';

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

        dispatch(actions.UpDataState.setCourseClassName([]));

        dispatch(actions.UpDataState.setCourseClassStudentMsg([]));

        dispatch(actions.UpDataState.setSubjectTeacherMsg([]));

        dispatch(actions.UpDataState.setClassStudentTransferMsg([]));

        dispatch(actions.UpDataState.setSubjectTeacherTransferMsg([]));

        dispatch(actions.UpUIState.AddCourseClassModalOpen());

    },[]);


    //查看详情

    const lookDetail = useCallback(()=>{

        const url = config.HashPrevProxy+location.pathname+location.search+'#/Log/Dynamic';

        checkUrlAndPostMsg({btnName:'查看详情',url});

    },[]);


    //导入

    const importCourseClass = useCallback(()=>{

        const url = config.HashPrevProxy+location.pathname+location.search+'#/ImportFile';

        checkUrlAndPostMsg({btnName:'导入教学班',url});

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

                    <a onClick={lookDetail} className="tips_handle">查看详情</a>

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

                        <a onClick={importCourseClass}>

                            <Button
                                className="content content-button"
                                height="24"
                                type="primary"
                                color="blue"
                                value="导入教学班"
                                shape="round"
                            >导入教学班</Button>

                        </a>
                    </div>

                    :null

            }

        </div>

    )

}

export default memo(Index);