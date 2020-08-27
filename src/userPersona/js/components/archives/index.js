import React,{useEffect,useState,useCallback,useMemo,memo,useRef} from 'react';

import ContentItem from '../contentItem';

import LinkBtn from '../linkBtn';

import {Button} from 'antd';

import {getDetailStuStatus,getTeacherDetailIntroduction,getScientificCaseDetail} from '../../actions/apiActions';

import {useSelector,useDispatch} from 'react-redux';

import {userStatusUpdate} from '../../actions/userStatusActions';

import {removeSlashUrl} from "../../actions/utils";

import ModuleLoading from '../moduleLoading';

import './index.scss';

function Archives(props) {


    //loading
    const [loading,setLoading] = useState(true);

    //tabname
    const [tabName,setTabName] = useState('');


    //科研以及获奖
    const [awards,setAwards] = useState('');


    const {Urls} = useSelector(state=>state.systemUrl);

    const {UsedType} = useSelector(state=>state.pageUsedType);

    const userStatus = useSelector(state=>state.userStatus);

    const { UserID,UserType } = useSelector(state=>state.targetUser);

    const userArchives = useSelector(state=>state.userArchives);

    const dispatch = useDispatch();


    useEffect(()=>{


        if (userStatus){

            if (UserType===2){

                setLoading(false);

                setTabName('学籍档案信息');

            }else{


                getScientificCaseDetail({proxy:Urls['E34'].WebUrl,userId:UserID,scientificType:0,dispatch}).then(data=>{

                    if (data&&data.length>0){

                        setAwards(data);

                    }

                    setLoading(false);

                });

                setTabName('档案信息');

            }

        }

    },[userStatus]);

    //判断是否有值，没有的话返回--
    const isHasValue = useCallback((value)=>{

        return value?value:'--';

    },[]);

    //按钮点击
    const btnClick = useCallback((tName)=>{

            const token = sessionStorage.getItem("token");

            const url = Urls['E34'].WebUrl;

            if (UserType===2){

                window.open(`${removeSlashUrl(url)}/index_user.html?lg_tk=${token}&stuId=${UserID}#3|1|0`)

            }else{

                window.open(`${removeSlashUrl(url)}/index_user.html?lg_tk=${token}&tName=${tName}&tId=${UserID}`)

            }


    },[]);


    //查看班主任

    const seeGanger = (userID)=>{

      const token = sessionStorage.getItem("token");

      window.open(`/html/userPersona?lg_tk=${token}&userID=${userID}&userType=1`);

    };


    return(

        <ContentItem type={"archives"} tabName={tabName}>

            <div className={"archives-wrapper"}>

                <div className={"btn-wrapper clearfix"}>

                    {

                        ['AdmToStu','LeaderToStu','HeaderTeacherToStu','AdmToTeacher','TeacherToTeacher','LeaderToTeacher'].includes(UsedType)?

                            <LinkBtn onClick={e=>btnClick(UserType===1?userStatus.userName:'')} type={"archives"}>档案信息管理</LinkBtn>

                            :null

                    }

                </div>

                {

                    userStatus?

                        UserType===2?

                        <div className={"archives-table stu"}>

                            <table className={"tb1"} border="1">

                                <tbody>

                                <tr>

                                    <td className={"col1 props"}>姓名</td>

                                    <td className={"col2"}>

                                        <div className={"user-name"} title={userStatus.studentStatus[0].userName}>

                                            {isHasValue(userStatus.studentStatus[0].userName)}

                                        </div>

                                    </td>

                                    <td className={"col3 props"}>曾用名</td>

                                    <td className={"col4"}>

                                        <div className={"former-name"} title={userStatus.studentStatus[0].formerName}>

                                            {isHasValue(userStatus.studentStatus[0].formerName)}

                                        </div>

                                    </td>

                                    <td className={"col5 props"}>身份证号</td>

                                    <td className={"col6"}>

                                        <div title={userStatus.studentStatus[0].identityNum}>

                                            {isHasValue(userStatus.studentStatus[0].identityNum)}

                                        </div>

                                    </td>

                                    <td className={"col7"} rowSpan={6}>

                                        <div className={"user-photo"} style={{backgroundImage:`url(${userStatus.studentStatus[0].photoPath})`}}></div>

                                    </td>

                                </tr>

                                <tr>

                                    <td className={"col1 props"}>出生年月</td>

                                    <td className={"col2"}>{isHasValue(userStatus.studentStatus[0].birthDay)}</td>

                                    <td className={"col3 props"}>性别</td>

                                    <td className={"col4"}>{isHasValue(userStatus.studentStatus[0].sex)}</td>

                                    <td className={"col5 props"}>民族</td>

                                    <td className={"col6"}>{isHasValue(userStatus.studentStatus[0].nation)}</td>

                                </tr>

                                <tr>

                                    <td className={"col1 props"}>学号</td>

                                    <td className={"col2"} colSpan={2}>

                                        <div className={"stu-no"} title={userStatus.studentStatus[0].stuStatusNum}>

                                            {isHasValue(userStatus.studentStatus[0].stuStatusNum)}

                                        </div>

                                    </td>

                                    <td className={"col4 props"}>当前所在年级</td>

                                    <td className={"col6"} colSpan={2}>{isHasValue(userArchives?userArchives.GradeName:'')}</td>

                                </tr>

                                <tr>

                                    <td className={"col1 props"}>当前所在班级</td>

                                    <td className={"col2"} colSpan={2}>

                                        <div className={"class-name"} title={userStatus.studentStatus[0].className}>

                                            {isHasValue(userStatus.studentStatus[0].className)}

                                        </div>

                                    </td>

                                    <td className={"col4 props"}>班主任</td>

                                    <td className={"col6"} colSpan={2}>

                                        <div className={"genger"}>

                                            {

                                                userArchives&&userArchives.Ganger?

                                                    <Button onClick={e=>seeGanger(userArchives.GangerID)} type={"link"} className={"genger-btn"} title={userArchives.GangerName}>{userArchives.GangerName}</Button>

                                                    :

                                                    '--'

                                            }

                                        </div>

                                    </td>

                                </tr>

                                <tr>

                                    <td className={"col1 props"}>国籍</td>

                                    <td className={"col2"}>

                                        <div className={"country"} title={userStatus.studentStatus[0].country}>

                                            {isHasValue(userStatus.studentStatus[0].country)}

                                        </div>

                                    </td>

                                    <td className={"col3 props"}>籍贯</td>

                                    <td className={"col4"}>

                                        <div className={"native-space"} title={userStatus.studentStatus[0].nativeSpace}>

                                            {isHasValue(userStatus.studentStatus[0].nativeSpace)}

                                        </div>

                                    </td>

                                    <td className={"col5 props"}>港澳台侨胞</td>

                                    <td className={"col6"}>{isHasValue(userStatus.studentStatus[0].overseaPeople)}</td>

                                </tr>

                                <tr>

                                    <td className={"col1 props"}>是否独生子女</td>

                                    <td className={"col2"}>{isHasValue(userStatus.studentStatus[0].singleChild)}</td>

                                    <td className={"col3 props"}>是否受过学前教育</td>
                                    <td className={"col4"}>{isHasValue(userStatus.studentStatus[0].preschoolEdu)}</td>
                                    <td className={"col5 props"}>是否留守儿童</td>
                                    <td className={"col6"}>{isHasValue(userStatus.studentStatus[0].leftoverChild)}</td>

                                </tr>
                                <tr>
                                    <td className={"col1 props"}>户籍所在地</td>
                                    <td className={"col2"}>

                                        <div className={"census-place"} title={userStatus.studentStatus[0].censusPlace}>

                                            {isHasValue(userStatus.studentStatus[0].censusPlace)}

                                        </div>

                                    </td>
                                    <td className={"col3 props"}>家庭住址</td>
                                    <td className={"col4"} colSpan={4}>

                                        <div className={"home-address"} title={userStatus.studentStatus[0].homeAddress}>

                                            {isHasValue(userStatus.studentStatus[0].homeAddress)}

                                        </div>

                                    </td>

                                </tr>

                                </tbody>

                            </table>


                            {

                                userStatus.resume.length>0?

                                    <table className={"tb2"} border="1">

                                        <tbody>

                                            <tr>

                                                <td className={"col1 props"} rowSpan={userStatus.resume.length+1}>学习经历</td>

                                                <td className={"col2 props"}>学习起始时间</td>

                                                <td className={"col3 props"}>学习结束时间</td>

                                                <td className={"col4 props"}>学习单位</td>

                                                <td className={"col5 props"}>学习内容</td>

                                                <td className={"col6 props"}>担任职务</td>

                                                <td className={"col7 props"}>学习证明人</td>

                                            </tr>


                                            {

                                                userStatus.resume.map((i,k)=>{

                                                    return <tr key={i.id}>

                                                        <td className={"col2"}>{isHasValue(i.semesterStartTime)}</td>
                                                        <td className={"col3"}>{isHasValue(i.semesterEndTime)}</td>
                                                        <td className={"col4"}>

                                                            <div className={"school-name"} title={i.school}>{isHasValue(i.school)}</div>

                                                        </td>
                                                        <td className={"col5"}>

                                                            <div className={"learn-content"} title={i.learningContent}>{isHasValue(i.learningContent)}</div>

                                                        </td>
                                                        <td className={"col6"}>

                                                            <div className={"duty"} title={i.duty}>{isHasValue(i.duty)}</div>

                                                        </td>
                                                        <td className={"col7"}>

                                                            <div className={"certifier"} title={i.certifier}>{isHasValue(i.certifier)}</div>

                                                        </td>

                                                    </tr>

                                                })

                                            }

                                        </tbody>

                                    </table>

                                    :null

                            }

                            {

                                userStatus.guardian.length>0?

                                    <table className={"tb3"} border="1">

                                        <tbody>

                                        <tr>

                                            <td className={"col1 props"} rowSpan={userStatus.guardian.length+1}>监护人信息</td>

                                            <td className={"col2 props"}>姓名</td>

                                            <td className={"col3 props"}>关系</td>

                                            <td className={"col4 props"}>工作单位</td>

                                            <td className={"col5 props"}>联系方式</td>

                                        </tr>


                                        {

                                            userStatus.guardian.map((i,k)=>{

                                                return <tr key={i.id}>

                                                    <td className={"col2"}>

                                                        <div className={"name"} title={i.name}>{isHasValue(i.name)}</div>

                                                    </td>
                                                    <td className={"col3"}>{isHasValue(i.relationship)}</td>
                                                    <td className={"col4"}>

                                                        <div className={"serviceUnit"} title={i.serviceUnit}>{isHasValue(i.serviceUnit)}</div>

                                                       </td>
                                                    <td className={"col5"}>

                                                        <div className={"tel"} title={i.tel}>

                                                            {isHasValue(i.tel)}

                                                        </div>

                                                    </td>

                                                </tr>

                                            })

                                        }

                                        </tbody>

                                    </table>

                                    :null

                            }

                        </div>

                        :

                        <div className={"archives-table teacher"}>

                            <table className={"tb1"} border="1">

                                <tbody>

                                <tr>

                                    <td className={"col1 props"}>姓名</td>

                                    <td className={"col2"}>

                                        <div className={"user-name"} title={userStatus.userName}>

                                            {isHasValue(userStatus.userName)}

                                        </div>

                                    </td>

                                    <td className={"col3 props"}>工号</td>

                                    <td className={"col4"}>

                                        <div className={"user-id"} title={userStatus.userId}>

                                            {isHasValue(userStatus.userId)}

                                        </div>

                                    </td>

                                    <td className={"col5 props"}>性别</td>

                                    <td className={"col6"}>{isHasValue(userArchives.Gender)}</td>

                                    <td className={"col7"} rowSpan={6}>

                                        <div className={"user-photo"} style={{backgroundImage:`url(${userStatus.photoPath})`}}></div>

                                    </td>

                                </tr>

                                <tr>

                                    <td className={"col1 props"}>民族</td>

                                    <td className={"col2"}>{isHasValue('汉族')}</td>

                                    <td className={"col3 props"}>职称</td>

                                    <td className={"col4"}>{isHasValue(userStatus.professionalTitle)}</td>

                                    <td className={"col5 props"}>所教学科</td>

                                    <td className={"col6"}>

                                        <div className={"subject"}>{isHasValue(userArchives.SubjectNames)}</div>

                                    </td>

                                </tr>

                                <tr>

                                    <td className={"col1 props"}>出生年月</td>

                                    <td className={"col2"}>

                                        {isHasValue("2017-04")}

                                    </td>

                                    <td className={"col3 props"}>身份证号</td>

                                    <td className={"col4"} colSpan={3}>

                                        {isHasValue(userArchives.IDCardNo)}

                                    </td>

                                </tr>

                                <tr>

                                    <td className={"col1 props"}>家庭地址</td>

                                    <td className={"col2"} colSpan={5}>

                                        <div className={"home-address"} title={userStatus.homeAddress}>

                                            {isHasValue(userStatus.homeAddress)}

                                        </div>

                                    </td>

                                </tr>

                                <tr>

                                    <td className={"col1 props"}>籍贯</td>

                                    <td className={"col2"} colSpan={2}>

                                        <div className={"native-space"} title={userStatus.nativeSpace}>

                                            {isHasValue(userStatus.nativeSpace)}

                                        </div>

                                    </td>

                                    <td className={"col3 props"}>政治面貌</td>

                                    <td className={"col4"} colSpan={2}>

                                        <div className={"politic-status"} title={userStatus.politicStatus}>

                                            {isHasValue(userStatus.politicStatus)}

                                        </div>

                                    </td>

                                </tr>

                                <tr>

                                    <td className={"col1 props"}>最高学历</td>

                                    <td className={"col2"} colSpan={2}>

                                        {isHasValue(userStatus.degree)}

                                    </td>

                                    <td className={"col3 props"}>最高学位</td>

                                    <td className={"col4"} colSpan={2}>{isHasValue(userStatus.educationBackground)}</td>

                                </tr>

                                <tr>

                                    <td className={"col1 props"}>教育背景</td>

                                    <td className={"col2"} colSpan={6} dangerouslySetInnerHTML={{__html:userStatus.educationBackgroundDetail?userStatus.educationBackgroundDetail:'--'}}>



                                    </td>

                                </tr>

                                <tr>

                                    <td className={"col1 props"}>工作经历</td>

                                    <td className={"col2"} colSpan={6}  dangerouslySetInnerHTML={{__html:userStatus.workExperience?userStatus.workExperience:'--'}}></td>

                                </tr>

                                <tr>

                                    <td className={"col1 props"}>科研及获奖</td>

                                    <td className={"col2"} colSpan={6}>

                                        <div className={"award"}>

                                            {isHasValue(awards)}

                                        </div>

                                    </td>

                                </tr>

                                </tbody>

                            </table>

                        </div>

                        :null

                }

                <ModuleLoading loading={loading}></ModuleLoading>

            </div>

        </ContentItem>

    )

}

Archives.defaultProps = {



};

export default memo(Archives);