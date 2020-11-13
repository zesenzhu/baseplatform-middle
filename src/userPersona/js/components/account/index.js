import React, {useEffect, useState, useCallback, useMemo, memo, useRef} from "react";

import { useDispatch, useSelector } from "react-redux";

import ContentItem from '../contentItem';

import LinkBtn from '../linkBtn';

import {btnQueryAlertShow,successAlertShow} from "../../actions/appAlertActions";

import {ResetPwd,GetUserIdentify} from "../../actions/apiActions";

import {Modal, Table,Tips} from "../../../../common";

import {Input} from "antd";

import {getQueryVariable} from "../../../../common/js/disconnect";

import {UserComm_PwdStrong,UserComm_ValidatePwd} from '../../actions/utils';

import md5 from 'md5';

import "./index.scss";

function Account(props) {

    //标签名称
    const [tabName,setTabName] = useState('');

    const [identify,setIdentify] = useState('');

    //标签名称
    const [logModalShow,setLogModalShow] = useState(false);

    //设置新的密码
    const [pwd,setPwd] = useState({

        value:'pwd888888',

        tip:false,

        title:'请输入密码',

        strongType:'',

        strongTypeTxt:''

    });

    const {UsedType} = useSelector(state=>state.pageUsedType);

    const userArchives = useSelector(state=>state.userArchives);

    const userStatus = useSelector(state=>state.userStatus);

    const { UserID,UserType,SchoolID } = useSelector(state=>state.targetUser);

    const dispatch = useDispatch();


    const pwdRef = useRef(pwd);

    useEffect(()=>{

        if (UsedType==='OtherToStu'){

            setTabName("个人基本信息");

        }else{

            setTabName("账号信息");

        }

        GetUserIdentify({UserID}).then(data=>{

            if (data&&data.length>0){

                let identifyStr = '';

                data.map((i,k)=>{

                    identifyStr = k>0? identifyStr+`、${i.IdentityName}`:i.IdentityName;

                });

                setIdentify(identifyStr);

            }

        });


    },[]);



    //判断是否有值，没有的话返回--
    const isHasValue = useCallback((value)=>{

        return value?value:'--';

    },[]);

    //点击按钮

    const btnClick = useCallback(()=>{

        const lg_ic = getQueryVariable('lg_ic');

        if (['AdmToStu','LeaderToStu','AdmToTeacher','LeaderToTeacher'].includes(UsedType)){

            dispatch(btnQueryAlertShow({

                title:<div className={"account-title"}>确定重置<span className="user-name red">{userArchives.UserName}</span><span className={"gray user-id"}>({UserID})</span>的密码?</div>,

                abstract:<div className={"new-pwd gray"}>

                    <div className={"pwd-wrapper"}>新密码:<Tips visible={pwd.tip} title={pwd.title}><Input className={"new-pwd-input"} value={pwd.value} onBlur={pwdBlur} onChange={pwdChange}></Input></Tips></div>

                    <div className={"strong-wrapper"} style={{display:`${pwd.strongType?'block':'none'}`}}>密码强度:<i className={`strong-type ${pwd.strongType}`}></i>{pwd.strongTypeTxt}</div>

                </div>,

                ok:updatePwdOk

            }));

        }else{

            const token = sessionStorage.getItem("token");

            window.open(`/html/personalMgr?lg_tk=${token}&lg_ic=${lg_ic}`);

        }

    },[]);




    //密码修改

    const pwdChange  = useCallback((e)=>{

        e.persist();

        const strong = UserComm_PwdStrong(e.target.value);

        let strongType = '',strongTypeTxt = '';

        switch (strong) {

            case 1:

                strongType = 'weak';

                strongTypeTxt = '弱';

                break;

            case 2:

                strongType = 'middle';

                strongTypeTxt = '中';

                break;

            case 3:

                strongType = 'strong';

                strongTypeTxt = '强';

                break;

            default:

                strongType = '';

                strongTypeTxt = '';

        }

        setPwd(d=>{

           pwdRef.current = {...d,value:e.target.value,strongType,strongTypeTxt};

           dispatch(btnQueryAlertShow({

                title:<div className={"account-title"}>确定重置<span className="user-name red">{userArchives.UserName}</span><span className={"gray user-id"}>({UserID})</span>的密码?</div>,

                abstract:<div className={"new-pwd gray"}>

                    <div className={"pwd-wrapper"}>新密码:<Tips visible={pwd.tip} title={pwd.title}><Input className={"new-pwd-input"} value={e.target.value} onBlur={pwdBlur} onChange={pwdChange}></Input></Tips></div>

                    <div className={"strong-wrapper"} style={{display:`${strongType?'block':'none'}`}}>密码强度:<i className={`strong-type ${strongType}`}></i>{strongTypeTxt}</div>

                </div>,

               ok:updatePwdOk

            }));

           return {...d,value:e.target.value,strongType,strongTypeTxt};

       });

    },[]);


    //密码弹窗blur事件

    const pwdBlur = useCallback(()=>{

        const {value,strongTypeTxt,strongType} = pwdRef.current;

        let tip = false,title='';

        if(value){

            const res = UserComm_ValidatePwd(value);

            if (res.isOK){

                tip = false;

                setPwd(d=>{

                    pwdRef.current = {...d,tip};

                    return {...d,tip};

                });

            }else{

                tip = true;

                title = '密码应由8-20位字母、数字及特殊字符`~!@#$%^&*()_+-={}|[]:\\";\'<>?,./\\\\的任意两种及以上组成';

                setPwd(d=>{

                    pwdRef.current = {...d,tip,title};

                    return {...d,tip,title};

                })

            }

        }else{

            title = '请输入密码';

            tip = true;

            setPwd(d=>{

                pwdRef.current={...d,tip,title};

                return {...d,tip,title};

            });

        }

        dispatch(btnQueryAlertShow({

            title:<div className={"account-title"}>确定重置<span className="user-name red">{userArchives.UserName}</span><span className={"gray user-id"}>({UserID})</span>的密码?</div>,

            abstract:<div className={"new-pwd gray"}>

                <div className={"pwd-wrapper"}>新密码:<Tips visible={tip} title={title}><Input className={"new-pwd-input"} value={value} onBlur={pwdBlur} onChange={pwdChange}></Input></Tips></div>

                <div className={"strong-wrapper"} style={{display:`${strongType?'block':'none'}`}}>密码强度:<i className={`strong-type ${strongType}`}></i>{strongTypeTxt}</div>

            </div>,

            ok:updatePwdOk

        }));

    },[]);


    //提交修改密码
    const updatePwdOk = useCallback(()=>{

            const {tip,value} = pwdRef.current;

            const newPwd = md5(value);

            if (!tip){

                ResetPwd({userID:UserID,userType:UserType,newPwd,dispatch}).then(data=>{

                    if (data===0){

                        dispatch(successAlertShow({title:'重置密码成功'}));

                    }

                })

            }

    },[]);

    //登录记录的列表

    const columns = useMemo(()=>{

        return [

            {

                title:"登录时间",

                dataIndex:"LoginTime",

                key:"LoginTime",

                align:"center",

                render:(i,k)=>{

                    if (i === ''){

                        return <span className="login">--</span>;

                    }else{

                        return <span className="login">{i}</span>;

                    }

                },

                width:200

            },
            {

                title:"登出时间",

                dataIndex:"LogoutTime",

                key:"LogoutTime",

                align:"center",

                render:(i,k)=>{

                    if (i === ''){

                        return <span className="logout">--</span>;

                    }else{

                        return <span className="logout">{i}</span>;

                    }

                },

                width:200

            },
            {

                title:"IP",

                dataIndex:"IPAddress",

                key:"IPAddress",

                align:"center",

                render:(i,k)=>{

                    if (i === ''){

                        return <span className="ip">--</span>;

                    }else{

                        return <span className="ip">{i}</span>;

                    }

                },

                width:180

            },
            {

                title:"登录方式",

                dataIndex:"LoginTypeTxt",

                key:"LoginTypeTxt",

                align:"center",

                render:(i,k)=>{

                    if (i === ''){

                        return <span className="method">--</span>;

                    }else{

                        return <span className="method">{i}</span>;

                    }

                },

                width:180

            },
            {

                title:"登录设备",

                dataIndex:"MachineTypeTxt",

                key:"MachineTypeTxt",

                align:"center",

                render:(i,k)=>{

                    if (i === ''){

                        return <span className="device">--</span>;

                    }else{

                        return <span className="device">{i}</span>;

                    }

                },

            }

        ];

    },[]);

    //登录记录的数据

    const logDataSource = useMemo(()=>{

        if (userArchives.LoginLogList&&userArchives.LoginLogList.length>0){

            return userArchives.LoginLogList.filter((i,k)=>k<=9).map(i=>({...i,key:i.LogID}));

        }else{

            return [];

        }

    },[userArchives]);

    //更多记录弹窗出现

    const moreLogShow = useCallback(()=>{

        setLogModalShow(true);

    },[]);

    //更多记录弹窗消失

    const closeMoreLogModal = useCallback(()=>{

        setLogModalShow(false);

    },[]);


    //查看班主任信息

    const seeGanger = (userID)=>{

      const token = sessionStorage.getItem('token');

      window.open(`/html/userPersona?userID=${userID}&userType=1&lg_tk=${token}`);

    };


    return(

        <ContentItem type={"account"} tabName={tabName}>

            <div className={"account-wrapper"}>

                <div className={"btn-wrapper clearfix"}>

                    {

                        ['AdmToStu','LeaderToStu','StuToStu','AdmToTeacher','TeacherToTeacher','LeaderToTeacher'].includes(UsedType)?

                            <LinkBtn onClick={btnClick} type={`${['AdmToStu','LeaderToStu','AdmToTeacher','LeaderToTeacher'].includes(UsedType)?'reset':'edit'}`}>{

                                ['AdmToStu','LeaderToStu','AdmToTeacher','LeaderToTeacher'].includes(UsedType)?'重置密码':'编辑'

                            }</LinkBtn>

                            :null

                    }

                </div>

                <table className={"account-table"}>

                    {

                        ['AdmToStu','LeaderToStu','ParentsToStu','HeaderTeacherToStu','StuToStu','AdmToTeacher','LeaderToTeacher','TeacherToTeacher'].includes(UsedType)?

                            <tbody>

                            <tr>
                                <td className={"col1 props"}>用户名:</td>
                                <td className={"col2"}>

                                    <div className={"short-name"}>{isHasValue(userArchives.ShortName)}</div>

                                </td>
                                <td className={"col3 props"}>最后登录:</td>
                                <td className={"col4"}>

                                    <div className={"last-log"}>

                                        <span className={"time"}>{isHasValue(userArchives.LastTimeLogin)}</span>

                                        {

                                            userArchives.LoginLogList.length>0?

                                                <button onClick={moreLogShow} className={"more"}>更多</button>

                                                :null

                                        }

                                    </div>

                                </td>

                            </tr>

                            <tr>
                                <td className={"col1 props"}>QQ:</td>
                                <td className={"col2"}>{isHasValue(userArchives.QQ)}</td>
                                <td className={"col3 props"}>微博:</td>
                                <td className={"col4"}>{isHasValue(userArchives.Weibo)}</td>
                            </tr>

                            <tr>
                                <td className={"col1 props"}>微信:</td>
                                <td className={"col2"}>{isHasValue(userArchives.Weixin)}</td>
                                <td className={"col3 props"}>联系电话:</td>
                                <td className={"col4"}>{isHasValue(userArchives.Telephone2)}</td>
                            </tr>

                            <tr>
                                <td className={"col1 props"}>注册时间:</td>
                                <td className={"col2"}>{isHasValue(userArchives.SignUpTime)}</td>
                                <td className={"col3 props"}>累计在线:</td>
                                <td className={"col4"}>{isHasValue(userArchives.LoginTimeSpan_Txt)}</td>
                            </tr>

                            <tr>

                                <td className={"col1 props"}>身份:</td>

                                <td className={"col2"}>{isHasValue(identify)}</td>

                            </tr>

                            </tbody>

                            :

                            UsedType==='OtherToStu'?

                            <tbody>

                                <tr>

                                    <td className={"col1 props"}>姓名:</td>

                                    <td className={"col2"}>

                                        <div className={"short-name"}>{isHasValue(userArchives.ShortName)}</div>

                                    </td>

                                    <td className={"col3 props"}>性别:</td>

                                    <td className={"col4"}>{isHasValue(userArchives.Gender)}</td>

                                </tr>

                                <tr>

                                    <td className={"col1 props"}>学号:</td>

                                    <td className={"col2"}>

                                        <div className={"user-id"}>{isHasValue(UserID)}</div>

                                    </td>

                                    <td className={"col3 props"}>所在年级:</td>

                                    <td className={"col4"}>{isHasValue(userArchives.GradeName)}</td>

                                </tr>

                                <tr>

                                    <td className={"col1 props"}>所在班级:</td>

                                    <td className={"col2"}>

                                        <div className={"class-name"}>

                                            {isHasValue(userArchives.ClassName)}

                                        </div>

                                    </td>

                                    <td className={"col3 props"}>班主任:</td>

                                    <td className={"col4"}>

                                        {

                                            userArchives.GangerName?

                                                <button onClick={e=>seeGanger(userArchives.GangerID)} className={"ganger"}>{isHasValue(userArchives.GangerName)}</button>

                                                :'--'

                                        }

                                    </td>

                                </tr>

                                <tr>

                                    <td className={"col1 props"}>QQ:</td>

                                    <td className={"col2"}>{isHasValue(userArchives.QQ)}</td>

                                    <td className={"col3 props"}>微博:</td>

                                    <td className={"col4"}>{isHasValue(userArchives.Weibo)}</td>

                                </tr>

                                <tr>

                                    <td className={"col1 props"}>微信:</td>

                                    <td className={"col2"}>{isHasValue(userArchives.Weixin)}</td>

                                    <td className={"col3 props"}>联系电话:</td>

                                    <td className={"col4"}>{isHasValue(userArchives.Telephone2)}</td>

                                </tr>

                                <tr>

                                    <td className={"col1 props"}>身份:</td>

                                    <td className={"col2"}>{isHasValue(identify)}</td>

                                </tr>

                            </tbody>

                            :

                            <tbody>

                                <tr>

                                    <td className={"col1 props"}>姓名:</td>

                                    <td className={"col2"}>

                                        <div className={"short-name"}>{isHasValue(userArchives.ShortName)}</div>

                                    </td>

                                    <td className={"col3 props"}>工号:</td>

                                    <td className={"col4"}>

                                        <div className={"user-id"}>{isHasValue(UserID)}</div>

                                    </td>

                                </tr>

                                <tr>

                                    <td className={"col1 props"}>性别:</td>

                                    <td className={"col2"}>{isHasValue(userArchives.Gender)}</td>

                                    <td className={"col3 props"}>民族:</td>

                                    <td className={"col4"}>{userStatus?isHasValue(userStatus.nation):'--'}</td>

                                </tr>

                                <tr>

                                    <td className={"col1 props"}>职称:</td>

                                    <td className={"col2"}>{userStatus?isHasValue(userStatus.professionalTitle):'--'}</td>

                                    <td className={"col3 props"}>所教学科:</td>

                                    <td className={"col4"}>

                                       <div className={"subject"}>

                                           {isHasValue(userArchives.SubjectNames)}

                                       </div>

                                    </td>

                                </tr>

                                <tr>

                                    <td className={"col1 props"}>QQ:</td>

                                    <td className={"col2"}>{isHasValue(userArchives.QQ)}</td>

                                    <td className={"col3 props"}>微博:</td>

                                    <td className={"col4"}>{isHasValue(userArchives.Weibo)}</td>

                                </tr>

                                <tr>

                                    <td className={"col1 props"}>微信:</td>

                                    <td className={"col2"}>{isHasValue(userArchives.Weixin)}</td>

                                    <td className={"col3 props"}>联系电话:</td>

                                    <td className={"col4"}>{isHasValue(userArchives.Telephone2)}</td>

                                </tr>

                                <tr>

                                    <td className={"col1 props"}>身份:</td>

                                    <td className={"col2"}>{isHasValue(identify)}</td>

                                </tr>

                            </tbody>

                    }

                </table>

            </div>


            <Modal
                className="login-history-modal"
                title="登录历史详情（最近10次）"
                type={1}
                visible={logModalShow}
                width={936}
                bodyStyle={{height:466}}
                mask={true}
                footer={null}
                onCancel={closeMoreLogModal}
            >


                <Table dataSource={logDataSource} pagination={false} columns={columns}></Table>


            </Modal>

        </ContentItem>

    )

}

export default memo(Account);