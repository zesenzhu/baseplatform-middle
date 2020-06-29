import React,{useState,useEffect,useRef,useImperativeHandle,forwardRef,useContext,memo} from 'react';

import {connect} from 'react-redux';

import UpUIState from '../actions/UpUIState';

import {GetAllCourseClassInfoForStu,SureChangeClass,SureChangeSubjectAndClass} from '../actions/apiActions';

import {useStateValue,useSetState} from "../actions/hooks";

import {Loading,Empty} from "../../../common";

import {Button} from "antd";

import '../../scss/student.scss';

import ChangeCourseClass from '../component/ChangeCourseClass';

import AgainSelectCourse from '../component/AgainSelectCourse';

import appAlertActions from "../actions/appAlertActions";

import actions from "../actions";

function Student(props) {

    //loading
    const [loading,setLoading] = useState(false);

    //教学班列表
    const [courseClassList,setCourseClassList] = useState([]);

    //重新选课
    const [againSelectCourse,setAgainSelectCourse] = useState(false);

    //换班modal
    const [changeCourseClassModal,setChangeCourseClassModal] = useSetState({

        show:false,

        subjectID:'',

        subjectName:'',

        courseClassID:''

    });


    const { LoginUser,dispatch } = props;

    const { SchoolID,UserType,UserID,UserName } = LoginUser;



    //ref

    const changeCourseClassModalRef = useStateValue(changeCourseClassModal);

    useEffect(()=>{

        GetAllCourseClassInfoForStu({UserID,UserType,dispatch}).then(data=>{

            const list = data.CourseClassItem&&data.CourseClassItem.length>0?data.CourseClassItem:[];

            setCourseClassList(list);

            dispatch({type:UpUIState.APP_LOADING_CLOSE});

        });


    },[]);



    //换班

    const changeClass = (i) =>{

        setChangeCourseClassModal({show:true,subjectName:i.SubjectName,courseClassID:i.CourseClassID,subjectID:i.SubjectID});

    };


    //换班OK

    const changeCourseModalOk = (activeID,hideLoading,modalInit) =>{

        const { courseClassID,subjectID } = changeCourseClassModalRef.current;

        SureChangeClass({UserID,UserType,UserName,SubjectID:subjectID,CourseClassID1:courseClassID,CourseClassID2:activeID,dispatch}).then(data=>{

            if (data===0){

                dispatch(appAlertActions.alertSuccess({title:'换班成功'}));

                setChangeCourseClassModal({show:false,

                    subjectID:'',

                    subjectName:'',

                    courseClassID:''});

                updateCourseClass();

                modalInit();

            }else{

                hideLoading();

            }

        })

    };

    //取消重新选课
    const lookClassDetail = (courseClassID) =>{

        dispatch(actions.UpUIState.CourseClassDetailsModalOpen());

        dispatch(actions.UpDataState.getCourseClassDetailsMsg(`/GetCourseClassDetail?courseClassID=${courseClassID}`));

    };


    //重新选课ok

    const againSelectOk = (obj,hideLoading,modalInit) =>{

        const { SubjectIDs,CourseClassIDs }= obj;

        SureChangeSubjectAndClass({UserID,UserType,UserName,SubjectIDs,CourseClassIDs,dispatch}).then(data=>{

            if (data===0){

                dispatch(appAlertActions.alertSuccess({title:'重新选课成功'}));

                modalInit();

                setAgainSelectCourse(false);

                updateCourseClass();


            }else{

                hideLoading();

            }

        })

    };

    const againSelectCancel = () =>{

        setAgainSelectCourse(false);

    };


    const updateCourseClass = () => {

        setLoading(true);

        GetAllCourseClassInfoForStu({UserID,UserType,dispatch}).then(data=>{

            const list = data.CourseClassItem&&data.CourseClassItem.length>0?data.CourseClassItem:[];

            setCourseClassList(list);

            setLoading(false);

        });

    };


    return(

        <div className={"stu-course-class-wrapper"}>

            {

                courseClassList.length===0?

                    <Empty type={"4"} title={"暂无教学班信息"}></Empty>

                    :

                    <>

                        <div className="title-bar icon1">

                            <span className="title-word">已选课程</span>

                            <Button type={"link"} icon={"plus-circle"} onClick={e=>setAgainSelectCourse(true)}>重新选课</Button>

                        </div>

                        <div className={"stu-content-wrapper"}>

                            <Loading spinning={loading} title={"加载中，请稍候..."}>

                                <ul className={"list-wrapper"}>

                                    {

                                        courseClassList.map((i,k)=>{

                                            return(

                                                <div key={k} className="card-box-student">

                                                    <div className="box-3"></div>

                                                    <div className="box-2"></div>

                                                    <div className="box-main">

                                                        <div className="main-content">

                                                            <p className="content-tips" title={i.SubjectName}>{i.SubjectName}</p>

                                                            <div className="content-hr"></div>

                                                            <div className="content-details">

                                                                <div className="details-row clearfix">

                                                                    <span className="left">教师：</span>

                                                                    <span className="right teacher-name" title={i.TeacherName}>{i.TeacherName}</span>

                                                                </div>

                                                                <div className="details-row clearfix">

                                                                    <span className="left">班级名称：</span>

                                                                    <span className="right clearfix">

                                                                    <span className={"class-name"} title={i.CourseClassName}>{i.CourseClassName}</span>

                                                                    <Button type={"link"} onClick={e=>changeClass(i)}>换班</Button>

                                                                </span>

                                                                </div>

                                                                <div className="details-row clearfix">

                                                                    <span className="left">上课人数：</span>

                                                                    <span className="right clearfix">

                                                                    <span className={"stu-count"} title={i.StudentCount}>{i.StudentCount}</span>

                                                                    <Button type={"link"} onClick={e=>lookClassDetail(i.CourseClassID)}>查看详情</Button>

                                                                </span>

                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                            )

                                        })

                                    }

                                </ul>

                            </Loading>

                        </div>

                    </>

            }

            <ChangeCourseClass

                show={changeCourseClassModal.show}

                subjectID={changeCourseClassModal.subjectID}

                subjectName={changeCourseClassModal.subjectName}

                courseClassID={changeCourseClassModal.courseClassID}

                modalOk={changeCourseModalOk}

                modalCancel={e=>setChangeCourseClassModal({ show:false,subjectID:'', subjectName:'', courseClassID:''})}

            >

            </ChangeCourseClass>

            <AgainSelectCourse

                show={againSelectCourse}

                modalOk={againSelectOk}

                modalCancel={againSelectCancel}

            >



            </AgainSelectCourse>

        </div>

    )

}

const mapStateToProps = (state) =>{

    const { DataState } = state;

    const { LoginUser } = DataState;

    return { LoginUser };

};

export default connect(mapStateToProps)(memo(Student));