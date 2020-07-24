import React,{useState,memo,useCallback} from 'react';

import config from '../api/config';

import {CSSTransition} from 'react-transition-group';

import {downLoadFile} from '../api/utils';


function Header(props) {


    //介绍界面
    const [introduceModal,setIntroduceModal] = useState({

        show:false,

        loading:true

    });


    const [PCDownLoad,setPCDownLoad] = useState(false);


    const {aiSchoolLink} = props;

    const introduceToggle = () => {

        setIntroduceModal(data=>!data);

    };


    const reSetLocation = () =>{

        window.location.href='/login.html';

    };


    //下载

    const downLoad = (url) =>{

        downLoadFile(url);

    };


    //一体化教学平台弹窗消失与否
    const aiModalToggle = useCallback(()=>{

        setPCDownLoad(d=>!d);

    },[]);

    //下载考试管理

    console.log(props);

    const downLoadTestManage = useCallback(()=>{

        window.BstoCs.startByFlag("7$", "751|M10", "AiTestManage|LGCampusMonitorTest",props.WebRootUrl,"../AiTest/Manage/AiTest-Manage.exe", "");

    },[props.WebRootUrl]);

    //下载学生考试

    const downLoadTestStu = useCallback(()=>{

        const url = removeSlashUrl(props.PCDownLoadWebSvrAddr)+'/Lgsoft/AiTest-Client.exe';

        downLoad(url);

    },[props.PCDownLoadWebSvrAddr]);






    return(

        <>

            <div className="header_wrapper clearfix">

            <div className={`left_icon_wrapper clearfix ${props.skin}`}>

                {

                    props.topTitle[props.skin]?

                        <>

                            <i className={"product-icon"} onClick={reSetLocation}></i>

                            <div className={"product-describe"} onClick={reSetLocation}>

                                <i className={"product-title"}></i>

                                <div className={"product-explain"}>{props.topTitle[props.skin]}</div>

                            </div>

                        </>

                        :

                        <i className={"product-icon"} onClick={reSetLocation}></i>

                }



            </div>

            <div className="right_download_wrapper">

                {

                    props.skin==='dark_blue'?

                        <div className={"dark_blue_top_right"}>

                            <a className="down_load_icon">下载移动APP</a>

                            <div className={"code-wrapper"}>

                                <div className={"code-inner"}>

                                    <i className={"code ios"}></i>

                                    <div className={"code-title"}>IOS</div>

                                </div>

                                <div className={"code-inner"}>

                                    <i className={"code android"}></i>

                                    <div className={"code-title"}>安卓</div>

                                </div>

                            </div>

                        </div>

                        :''

                }

                {

                    props.skin==='dark_tech'?

                        <div className={"dark_tech_top_right"}>

                            <div className={"options_introduce"}>

                                <a className="down_load_icon" onClick={e=>setIntroduceModal(d=>({...d,show:true}))}>"1分钟"操作指南</a>

                            </div>

                            <div className={"pc_client"}>

                                <a className={"down_load_icon"} onClick={aiModalToggle}>下载客户端</a>

                            </div>

                            <div className={"app_down_load"}>

                                <a className="down_load_icon">下载移动APP</a>

                                <div className={"code-wrapper"}>

                                    <div className={"code-inner"}>

                                        <i className={"code ios"}></i>

                                        <div className={"code-title"}>扫描下载</div>

                                    </div>


                                </div>

                            </div>


                        </div>

                        :''

                }


                {

                    props.skin==='ai_school'&&(parseInt(props.ProductType)!==0)?

                        <div className={"ai_school_top_right"}>

                            {

                                aiSchoolLink.schoolWeb||aiSchoolLink.education?

                                    <div className={"official_wrapper"}>

                                        {

                                            aiSchoolLink.schoolWeb?

                                                <a className={"school_web"} target="_blank" href={aiSchoolLink.schoolWeb}>学校官网</a>

                                                :null

                                        }

                                        {

                                            aiSchoolLink.education?

                                                <a className={"academic"} target="_blank"  href={aiSchoolLink.education}>教务通知</a>

                                                :null

                                        }

                                    </div>

                                    :null

                            }

                            {

                                aiSchoolLink.downLoad?

                                    <div className={"pc_download"}>

                                        <a href={`${aiSchoolLink.downLoad}/html/download?type=1`} target={'_blank'}>软件下载</a>

                                    </div>

                                    :null

                            }

                            <div className={"app_down_load"}>

                                <a className="down_load_icon">校园微助手小程序</a>

                                <div className={"code-wrapper"}>

                                    <div className={"code-inner"}>

                                        <i className={"code ios"}></i>

                                        <div className={"code-title"}>校园微助手小程序</div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        :null

                }


                {

                    props.skin==='ai_exam'?

                        <div className={"ai_exam_top_right"}>

                            <div className={"app_down_load"}>

                                <a className="down_load_icon"   href={`${props.WebSvrAddr}/download.html`} target={"_blank"}>下载PC客户端</a>

                            </div>

                        </div>

                        :''

                }

            </div>

        </div>

            <CSSTransition

                in={introduceModal.show}

                timeout={500}

                classNames={"introduce-modal"}

            >



                <div className={`introduce-modal ${props.skin}`}>

                    <i className={"close-icon"} onClick={e=>setIntroduceModal(d=>({...d,show:false}))}></i>

                    <iframe src={`${props.IntroWebSvrAddr}/Pages/UserHelp/teacherhelp.html`} frameBorder={0}></iframe>

                </div>

            </CSSTransition>


            <CSSTransition

                in={PCDownLoad}

                timeout={500}

                classNames={"ai-download"}

            >

                <div className={"ai-download-mask"}>

                    <div className={`ai-pc-down-modal ${props.skin}`}>

                        <i className={"close-icon"} onClick={aiModalToggle}></i>

                        <div className={"download-icon"}>下载客户端</div>

                        <div className={"content"}>

                            <div className={"manage test"}>

                                <i className={"icon"}></i>

                                <div className={"title"}>考试管理客户端</div>

                                <button onClick={props.PCDownLoadWebSvrAddr?downLoadTestManage:()=>{}} className={`down-btn ${!props.PCDownLoadWebSvrAddr?'disabled':''}`}></button>

                            </div>

                            <div className={"stu test"}>

                                <i className={"icon"}></i>

                                <div className={"title"}>学生考试客户端</div>

                                <button onClick={props.PCDownLoadWebSvrAddr?downLoadTestStu:()=>{}} className={`down-btn ${!props.PCDownLoadWebSvrAddr?'disabled':''}`}></button>

                            </div>

                        </div>

                    </div>

                </div>

            </CSSTransition>

        </>

    );

}

export default memo(Header);