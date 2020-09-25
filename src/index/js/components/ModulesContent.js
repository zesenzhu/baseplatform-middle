import React,{memo,useEffect,useRef,useMemo} from 'react';

import {useSelector,useDispatch} from 'react-redux';


function ModulesContent(props){

        const {UserType,UserClass} = useSelector(state=>state.LoginUser);

        const Modules = useMemo(()=>{

            if (parseInt(UserType)===0&&([1,2].includes(parseInt(UserClass)))){

                return [

                    {Url:'/html/admArchives',Name:'用户档案管理',ClassName:'userManager'},

                    {Url:'/html/admclass',Name:'年级班级管理',ClassName:'admClass'},

                    {Url:'/html/admAccount',Name:'用户账号管理',ClassName:'admAccount'},

                    {Url:'/html/admPower',Name:'用户权限管理',ClassName:'admPower'},

                    {Url:'/html/admSubject',Name:'学科管理',ClassName:'admSubject'},

                    {Url:'/html/CoureClass',Name:'教学班管理',ClassName:'courseClass'},

                    {Url:'/html/schedule',Name:'课程安排管理',ClassName:'schedule'},

                    {Url:'/SysMgr/NetworkInfo/OnlineUserInfo.aspx',Name:'在线用户管理',ClassName:'onlineUser'},

                    {Url:'/SysMgr/NetworkInfo/LoginLogsInfo.aspx',Name:'网络访问统计',ClassName:'visitTotal'},

                    {Url:'/html/systemSetting',Name:'系统设置',ClassName:'sysSetting'},

                ]

            }else if (parseInt(UserType)===0&&([3,4].includes(parseInt(UserClass)))){

                return [

                    {Url:'/html/admArchives',Name:'用户档案管理',ClassName:'userManager'},

                    {Url:'/html/admclass',Name:'年级班级管理',ClassName:'admClass'},

                    {Url:'/html/admSubject',Name:'学科管理',ClassName:'admSubject'},

                    {Url:'/html/CoureClass',Name:'教学班管理',ClassName:'courseClass'},

                    {Url:'/html/schedule',Name:'课程安排管理',ClassName:'schedule'},

                ]

            }else if (parseInt(UserType)===1) {

                return parseInt(UserClass[2])===1?[

                    {Url:'/html/class',Name:'我的行政班管理',ClassName:'admClass'},

                    {Url:'/html/CoureClass',Name:'我的教学班管理',ClassName:'courseClass'},

                    {Url:'/html/schedule#/teacher/mine',Name:'我的课程安排管理',ClassName:'schedule'},

                ]

                    :

                    [

                        {Url:'/html/CoureClass',Name:'我的教学班管理',ClassName:'courseClass'},

                        {Url:'/html/schedule#/teacher/mine',Name:'我的课程安排管理',ClassName:'schedule'},

                    ]

            }else if (parseInt(UserType)===2||parseInt(UserType)===3){

                return [

                    {Url:'/html/CoureClass',Name:'更换选课',ClassName:'courseClass'},

                    {Url:'/html/schedule#/student/mine',Name:'我的课程安排',ClassName:'schedule'},

                ]

            }else if (parseInt(UserType)===7||parseInt(UserType)===10){

                return [

                    {Url:'/html/admArchives',Name:'用户档案管理',ClassName:'userManager'},

                    {Url:'/html/admclass',Name:'年级班级管理',ClassName:'admClass'},

                    {Url:'/html/admSubject',Name:'学科管理',ClassName:'admSubject'},

                    {Url:'/html/CoureClass',Name:'教学班管理',ClassName:'courseClass'},

                    {Url:'/html/schedule',Name:'课程安排管理',ClassName:'schedule'},

                ]

            }


        },[UserType]);


        const ModuleClick = ({Url}) =>{

            const token = sessionStorage.getItem("token");

            window.open(Url+'?lg_tk='+token);

        };

        return (

            <div className="content-wrapper">

                {

                    Modules.map((i,k)=>{

                        return  <div  key={k} className={"module-item"} onClick={()=>{ModuleClick({Url:i.Url})}}>

                            <div className="module-bg">

                                <div className={`module-icon ${i.ClassName}`}></div>

                            </div>

                            <div className="title">{i.Name}</div>

                        </div>

                    })

                }

            </div>

        )

}

export default (memo(ModulesContent));