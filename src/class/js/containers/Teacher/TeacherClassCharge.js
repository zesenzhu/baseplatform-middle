import React,{Component} from 'react';

import {connect} from 'react-redux';

import CCActions from '../../actions/Teacher/ClassChargeActions';

import ClassTab from '../../component/Teacher/ClassTab';

import TeacherWrapper from './TeacherWrapper';
import SIMActions from "../../actions/Teacher/StudentInfoModalActions";

import StudentWrapper from './StudentWrapper';

import {Loading} from "../../../../common";

import UpUIState from "../../actions/UpUIState";

import UpDataState from "../../actions/UpDataState";
import ApiActions from "../../actions/ApiActions";
import AppAlertActions from "../../actions/AppAlertActions";



class TeacherClassCharge extends Component{

    constructor(props) {

        super(props);

        const { dispatch } = props;

        //初始化界面
        dispatch(CCActions.PageInit());

    }

    //班级变化
    ClassChange(ClassID,item){

        const { dispatch } = this.props;

        dispatch(CCActions.ClassChange(ClassID));
        dispatch({
            type: SIMActions.TEACHER_STUDENT_INFO_MODAL_CLASS_CHANGE,
            data: {value:item.ClassID,title:item.ClassName},
          });
    }

    //删除教师

    delSubjectTeacher({SubjectID}){

        const { dispatch,info } = this.props;

        dispatch({type:UpUIState.SHOW_ERROR_ALERT,data:{

                type:"btn-query",

                title:"您确定要删除该学科任课教师么？",

                ok:()=>{  return dispatch(UpDataState.delSubjectTeacher({ClassID:info.id,SubjectID}));},

                cancel:()=>dispatch({type:UpUIState.CLOSE_ERROR_ALERT}),

                close:()=>dispatch({type:UpUIState.CLOSE_ERROR_ALERT})

            }});

    }

//弹出添加教师的弹窗
    addTeacherModalShow(opt){

        const {dispatch,ClassCharge} = this.props;

        switch (opt.type) {

            case 1:

                ApiActions.GetSubject({ClassID:info.id,dispatch}).then(data=>{

                    if (data){

                        const { Total,List } = data;

                        if (Total>0){

                            if (List.length===0){

                                dispatch(AppAlertActions.alertWarn({title:`本班${Total}门学科均已设置任课教师,无需添加`}));

                            }else{

                                dispatch({type:UpUIState.ADD_TEACHER_MODAL_SHOW});

                                dispatch(UpDataState.getAddTeacherData({ClassID:ClassCharge.ActiveClassID,...opt}));

                            }

                        }else{

                            dispatch(AppAlertActions.alertWarn({title:'本班未开设学科，无法添加任课教师。'}));

                        }

                    }

                });

                break;

            case 2:

                dispatch({type:UpUIState.ADD_TEACHER_MODAL_SHOW,options:{

                        originTeacherShow:true,

                        originTeacherInfo:opt.originTeacherInfo,

                        originTeacherTitle:"原任课教师",

                        newTeacherTitle:"新任课教师",

                        modalTitle:"更改任课教师",

                        type:2,

                        SubjectID:opt.originTeacherInfo.SubjectID

                    }});

                dispatch(UpDataState.getAddTeacherData({ClassID:ClassCharge.ActiveClassID,...opt}));


                break;

            default:

                dispatch({type:UpUIState.ADD_TEACHER_MODAL_SHOW});

        }
        //初始化所有的教师和学科的数据

    }



    render(){

        const { ClassCharge } = this.props;

        const { ClassLoadingShow } = ClassCharge;

        return <div className="teacher-class-charge-wrapper">

            <ClassTab ClassChange={this.ClassChange.bind(this)} ClassList={ClassCharge.Class} ActiveID={ClassCharge.ActiveClassID}></ClassTab>

            <Loading spinning={ClassLoadingShow}>

                <TeacherWrapper delSubjectTeacher={this.delSubjectTeacher.bind(this) } addTeacherModalShow={this.addTeacherModalShow.bind(this)}></TeacherWrapper>

                <StudentWrapper></StudentWrapper>

            </Loading>

        </div>

    }

}

const mapStateToProps = (state)=>{

    const{ Teacher } = state;

    const { ClassCharge } = Teacher;

    return {

        ClassCharge

    }

};

export default connect(mapStateToProps)(TeacherClassCharge);