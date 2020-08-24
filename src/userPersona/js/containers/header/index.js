import React,{useEffect,useState,useCallback,useMemo,memo,useRef} from 'react';

import {useDispatch,useSelector} from 'react-redux';

import {LogOut} from '../../../../common/js/disconnect';

import {btnQueryAlertShow} from "../../actions/appAlertActions";

import './index.scss';

function Header(props) {

    //产品名称
    const [title,setTitle] = useState('');

    //主页地址
    const [indexUrl,setIndexUrl] = useState('');

    const UserInfo = useSelector(state=>state.userArchives);

    const loginUser = useSelector(state=>state.loginUser);

    const pageUsedType = useSelector(state=>state.pageUsedType);

    const userInfoLogs = useSelector(state=>state.userInfoLogs);

    const {UsedType} = pageUsedType;

    const dispatch = useDispatch();

    const { UserName,AvatarPath,Sign } = UserInfo;

    const { PhotoPath } = loginUser;

    const {tabTitle,bellShow} = props;

    useEffect(()=>{

        if (UserInfo){

            const { ProductName,WebIndexUrl } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

            const token = sessionStorage.getItem("token");

            setTitle(ProductName);

            setIndexUrl(`${WebIndexUrl}?lg_tk=${token}`);

        }

    },[UserInfo]);


    //退出登录

    const logout = useCallback(()=>{

        dispatch(btnQueryAlertShow({title:'确定要退出登录吗？',cancelShow:'y',ok:logoutOk}))

    },[]);


    //退出登录
    const logoutOk = useCallback(()=>{

        LogOut()

    },[]);


    //修改图片
    const updatePhoto = useCallback(()=>{

        const token = sessionStorage.getItem("token");

        window.open(`/html/personalMgr?lg_tk=${token}`)

    },[]);

    return(

        <div className={"app-header-wrapper"}>

            <div className={"app-header-bg"}>

                <div className={"app-header-stripe"}></div>

            </div>

            <div className={"header-home-wrapper"}>

                <div className={"header-home-content"}>

                    <div className={"header-left-content clearfix"}>

                        <a href={indexUrl} className={"product-title"}>{title}</a>

                        {

                            tabTitle?

                                <span className={"product-tab"}>{tabTitle}</span>

                                :null

                        }

                    </div>

                    <div className={"header-user-info clearfix"}>

                        {

                            bellShow?

                                <div className={"header-menu-item bell"}>

                                    <span id={"Assistant_infoCenter"}></span>

                                </div>

                                :null

                        }

                        <div className={"header-menu-item user"}>

                            <i className={"header-icon"} style={{backgroundImage:`url(${PhotoPath})`}}></i>

                            <div className={"user-name"}>{UserName}</div>

                            <i className={"log-out"} onClick={logout}></i>

                        </div>


                    </div>

                </div>

            </div>

            <div className={"header-block-wrapper"}>

                <div className={"personal-info"}>

                    <div className={"header-img"} style={{backgroundImage:`url(${AvatarPath})`}}>

                        {

                            UsedType==='StuToStu'||UsedType==='TeacherToTeacher'?

                                <button className={"update-photo"} onClick={updatePhoto}>修改照片</button>

                                :null


                        }


                    </div>

                    <span className={"user-name"}>{UserName}</span>

                    {

                        Sign?

                            <span className={"sign"}>{Sign}</span>

                            :null

                    }


                </div>

                {

                    ['AdmToStu','LeaderToStu','HeaderTeacherToStu'].includes(UsedType)?

                        <a className={"log"}>{userInfoLogs?userInfoLogs[0].Content:''}</a>

                        :null

                }



            </div>

        </div>

    )

}

export default memo(Header);