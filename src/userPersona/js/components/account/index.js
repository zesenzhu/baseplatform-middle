import React, {useEffect, useState, useCallback, useMemo, memo, useRef} from "react";

import { useDispatch, useSelector } from "react-redux";

import ContentItem from '../contentItem';

import LinkBtn from '../linkBtn';

import {removeSlashUrl} from "../../actions/utils";

import {Modal, Table} from "../../../../common";

import "./index.scss";

function Account(props) {

    //标签名称
    const [tabName,setTabName] = useState('');

    //标签名称
    const [logModalShow,setLogModalShow] = useState(false);

    const {UsedType} = useSelector(state=>state.pageUsedType);

    const userArchives = useSelector(state=>state.userArchives);

    const { UserID,UserType } = useSelector(state=>state.targetUser);

    const dispatch = useDispatch();

    useEffect(()=>{

        if (UsedType==='OtherToStu'){

            setTabName("个人基本信息");

        }else{

            setTabName("账号信息");

        }

        if (UserType===2){



        }

    },[]);



    //判断是否有值，没有的话返回--
    const isHasValue = useCallback((value)=>{

        return value?value:'--';

    },[]);

    //点击按钮

    const btnClick = useCallback(()=>{



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
                        <td className={"col2"}>{isHasValue(userArchives.Telephone2)}</td>
                        <td className={"col3 props"}>累计在线:</td>
                        <td className={"col4"}>{isHasValue(userArchives.LoginTimeSpan_Txt)}</td>
                    </tr>

                    </tbody>

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