/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 * 
 * 
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *            佛祖保佑       永不宕机     永无BUG
 * 
 *        佛曰:  
 *                写字楼里写字间，写字间里程序员；  
 *                程序人员写程序，又拿程序换酒钱。  
 *                酒醒只在网上坐，酒醉还来网下眠；  
 *                酒醉酒醒日复日，网上网下年复年。  
 *                但愿老死电脑间，不愿鞠躬老板前；  
 *                奔驰宝马贵者趣，公交自行程序员。  
 *                别人笑我忒疯癫，我笑自己命太贱；  
 *                不见满街漂亮妹，哪个归得程序员？
 * 
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-12-23 14:15:42
 * @LastEditTime: 2020-12-23 14:16:19
 * @Description: headerForDevelop,做给师资发展平台的
 * @FilePath: \baseplatform-middle\src\userPersona\js\containers\headerForDevelop\index.js
 */

import React,{useEffect,useState,useCallback,useMemo,memo,useRef} from 'react';

import {useDispatch,useSelector} from 'react-redux';

import {LogOut} from '../../../../common/js/disconnect';

import {btnQueryAlertShow} from "../../actions/appAlertActions";

import ArchivesLogModal from '../../components/archivesLogModal';

import defaultLogo from '../../../../common/images/frame/logo.png';

import './index.scss';

function Header(props) {

    //产品名称
    const [title,setTitle] = useState('');

    //主页地址
    const [indexUrl,setIndexUrl] = useState('');

    //主页地址
    const [logo,setLogo] = useState('');


    //主页地址
    const [archivesModal,setArchivesModal] = useState(false);

    const UserInfo = useSelector(state=>state.userArchives);

    const loginUser = useSelector(state=>state.loginUser);

    const pageUsedType = useSelector(state=>state.pageUsedType);

    const userInfoLogs = useSelector(state=>state.userInfoLogs);

    const identifyInfo = useSelector(state=>state.identifyInfo);

    const {UsedType} = pageUsedType;

    const dispatch = useDispatch();

    const { UserName,AvatarPath,Sign } = UserInfo;

    const { PhotoPath } = loginUser;

    const {tabTitle,bellShow} = props;

    useEffect(()=>{

        if (UserInfo){

            const { ProductName,WebIndexUrl,ProductLogoUrl='' } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

            const token = sessionStorage.getItem("token");

            setTitle(ProductName);

            setIndexUrl(`${WebIndexUrl}?lg_tk=${token}`);

            setLogo(ProductLogoUrl);

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

    //用户档案记录弹出
    const showArchivesLog = useCallback(()=>{

        setArchivesModal(true);

    },[]);

    //用户档案记录关闭
    const closeArchivesLog = useCallback(()=>{

        setArchivesModal(false);

    },[]);


    //跳转到个人账号管理界面
    const seePersonalMgr = useCallback(()=>{

        const token = sessionStorage.getItem("token");

        window.open(`/html/personalMgr?lg_tk=${token}`);

    },[]);

    return(

        <div className={"app-header-wrapper-for-develop"}>

            <div className={"app-header-bg"}>

                <div className={"app-header-stripe"}></div>

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

                    ['AdmToStu','LeaderToStu','HeaderTeacherToStu','AdmToTeacher','LeaderToTeacher'].includes(UsedType)?

                        <a className={"log"} onClick={showArchivesLog}>{userInfoLogs[0]?userInfoLogs[0].LogTime:''}  {userInfoLogs[0]?userInfoLogs[0].Content:''}</a>

                        :null

                }

            </div>

            <ArchivesLogModal closeArchivesLog={closeArchivesLog} show={archivesModal}></ArchivesLogModal>

        </div>

    )

}

export default memo(Header);