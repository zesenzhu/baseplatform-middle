import React,{useEffect,useState,useCallback,useMemo,memo,useRef} from 'react';

import ContentItem from '../contentItem';

import LinkBtn from '../linkBtn';

import {getDetailStuStatus,GetUserDetailForHX} from '../../actions/apiActions';

import {useSelector,useDispatch} from 'react-redux';

import {userArchivesUpdate} from '../../actions/userArchivesActions';

import './index.scss';

function Archives(props) {


    //loading
    const [loading,setLoading] = useState(true);

    //用户状态
    const [userStatus,setUserStatus] = useState(null);

    const {className,tabName,type,children} = props;

    const {Urls} = useSelector(state=>state.systemUrl);

    const { UserID,UserType } = useSelector(state=>state.targetUser);

    const userArchives = useSelector(state=>state.userArchives);

    const dispatch = useDispatch();

    const proxy = useMemo(()=>{

        return 'http://192.168.2.202:7300/mock/5f40ff6044c5b010dca04032/userPersona';

    },[]);

    useState(()=>{

        const getUserInfo = GetUserDetailForHX({UserID,UserType,proxy,dispatch});

        const getDetail =  getDetailStuStatus({userId:UserID,proxy:Urls['E34'].WebUrl,dispatch});

       Promise.all([getUserInfo,getDetail]).then(res=>{

           if (res[0]){

               dispatch(userArchivesUpdate(res[0]));

           }

           if (res[1]){

               setUserStatus(res[1]);

           }

           setLoading(false);

       })

    },[]);

    //判断是否有值，没有的话返回--
    const isHasValue = useCallback((value)=>{

        return value?value:'--';

    },[]);

    return(

        <ContentItem type={"archives"} tabName={"学籍档案信息"}>

            <div className={"archives-wrapper"}>

                <div className={"btn-wrapper clearfix"}>

                    <LinkBtn type={"archives"}>档案信息管理</LinkBtn>

                </div>

                {

                    userStatus?

                        <div className={"archives-table"}>

                            <table className={"tb1"} border="1">

                                <tbody>

                                <tr>
                                    <td className={"col1 props"}>姓名</td>
                                    <td className={"col2"}>

                                        <div title={userStatus.studentStatus[0].userName}>

                                            {isHasValue(userStatus.studentStatus[0].userName)}

                                        </div>

                                    </td>
                                    <td className={"col3 props"}>曾用名</td>
                                    <td className={"col4"}>

                                        <div title={userStatus.studentStatus[0].formerName}>

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

                                        <div title={userStatus.studentStatus[0].stuStatusNum}>

                                            {isHasValue(userStatus.studentStatus[0].stuStatusNum)}

                                        </div>

                                    </td>

                                    <td className={"col4 props"}>当前所在年级</td>
                                    <td className={"col6"} colSpan={2}>{isHasValue(userArchives?userArchives.GradeName:'')}</td>

                                </tr>
                                <tr>
                                    <td className={"col1 props"}>当前所在班级</td>
                                    <td className={"col2"} colSpan={2}>

                                        <div title={userStatus.studentStatus[0].className}>

                                            {isHasValue(userStatus.studentStatus[0].className)}

                                        </div>

                                    </td>
                                    <td className={"col4 props"}>班主任</td>
                                    <td className={"col6"} colSpan={2}>

                                        <div title={userArchives?userArchives.GangerName:''}>

                                            {isHasValue(userArchives?userArchives.GangerName:'')}

                                        </div>

                                    </td>

                                </tr>
                                <tr>
                                    <td className={"col1 props"}>国籍</td>
                                    <td className={"col2"}>{isHasValue(userStatus.studentStatus[0].country)}</td>
                                    <td className={"col3 props"}>籍贯</td>
                                    <td className={"col4"}>

                                        <div title={userStatus.studentStatus[0].nativeSpace}>

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

                                        <div title={userStatus.studentStatus[0].censusPlace}>

                                            {isHasValue(userStatus.studentStatus[0].censusPlace)}

                                        </div>

                                    </td>
                                    <td className={"col3 props"}>家庭住址</td>
                                    <td className={"col4"} colSpan={4}>

                                        <div title={userStatus.studentStatus[0].homeAddress}>

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

                                                            <div title={i.school}>{isHasValue(i.school)}</div>

                                                        </td>
                                                        <td className={"col5"}>

                                                            <div title={i.learningContent}>{isHasValue(i.learningContent)}</div>

                                                        </td>
                                                        <td className={"col6"}>{isHasValue(i.duty)}</td>
                                                        <td className={"col7"}>

                                                            <div title={i.certifier}>{isHasValue(i.certifier)}</div>

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

                                                        <div title={i.name}>{isHasValue(i.name)}</div>

                                                    </td>
                                                    <td className={"col3"}>{isHasValue(i.relationship)}</td>
                                                    <td className={"col4"}>

                                                        <div title={i.serviceUnit}>{isHasValue(i.serviceUnit)}</div>

                                                    </td>
                                                    <td className={"col5"}>{isHasValue(i.tel)}</td>

                                                </tr>

                                            })

                                        }

                                        </tbody>

                                    </table>

                                    :null

                            }

                        </div>

                        :null

                }

                <div style={{display:loading?'block':'none'}} className={"loading"}><div className={"loading-title"}>加载中,请稍候...</div></div>

            </div>

        </ContentItem>

    )

}

Archives.defaultProps = {



};

export default memo(Archives);