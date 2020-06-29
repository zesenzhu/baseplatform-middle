import React,{useState,memo} from 'react';

import config from '../api/config';

import {CSSTransition} from 'react-transition-group';


function Header(props) {

    const [introduceModal,setIntroduceModal] = useState({

        show:false,

        loading:true

    });


    const introduceToggle = () => {

        setIntroduceModal(data=>!data);

    };

    return(

        <>

            <div className="header_wrapper clearfix">

            <div className={`left_icon_wrapper clearfix ${props.skin}`}>

                {

                    props.topTitle[props.skin]?

                        <>

                            <i className={"product-icon"}></i>

                            <div className={"product-describe"}>

                                <i className={"product-title"}></i>

                                <div className={"product-explain"}>{props.topTitle[props.skin]}</div>

                            </div>

                        </>

                        :

                        <i className={"product-icon"}></i>

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

                    props.skin==='ai_school'?

                        <div className={"ai_school_top_right"}>

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

                        :''

                }


                {

                    props.skin==='ai_exam'?

                        <div className={"ai_exam_top_right"}>

                            <div className={"app_down_load"}>

                                <a className="down_load_icon" target={"_blank"} href={`${props.WebSvrAddr}/download.html`}>下载PC客户端</a>

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

                    <iframe src={`${props.WebSvrAddr}/Pages/UserHelp/teacherhelp.html`} frameBorder={0}></iframe>

                </div>

            </CSSTransition>

        </>

    );

}

export default memo(Header);