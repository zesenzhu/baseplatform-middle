import React,{Component} from 'react';

import {CheckBoxGroup} from "../../../common";

import headerImg from '../../images/default-teacher.png'


class TeacherTabWrapper extends Component{


    setGanger(e) {

        const {Teachers, addTeacherModalShow} = this.props;

        let type = 3;

        if (Teachers.Ganger && (Teachers.Ganger.UserID!=='未设置')) {

            type = 4;

            addTeacherModalShow({type: type,originTeacherInfo:{id:Teachers.Ganger.UserID,name:Teachers.Ganger.UserName,photo:Teachers.Ganger.PhotoPath}});

        } else {

            type = 3;

            addTeacherModalShow({type: type});

        }

    }







    render() {

        const { Teachers,addTeacherModalShow,delGanger,delSubjectTeacher,TeacherDetailShow } = this.props;



        return (

            <CheckBoxGroup>

                <div className="admclass-teacher-wrapper clearfix">

                    <div className="admclass-teacher-ganger clearfix">

                        <div className="admclass-teacher-photo"  onClick={Teachers.Ganger&&Teachers.Ganger.UserID!=='未设置'?e=>TeacherDetailShow({UserID:Teachers.Ganger.UserID,UserType:1}):()=>{}} style={{backgroundImage:`url(${Teachers.Ganger&&Teachers.Ganger.UserID!=='未设置'?Teachers.Ganger.PhotoPath:headerImg})`,cursor:`${Teachers.Ganger&&Teachers.Ganger.UserID!=='未设置'?'pointer':'default'}`}}></div>

                        <div className="admclass-teacher-info">

                            <div className="admclass-teacher-tab">

                                <div className="admclass-teacher-name" style={{cursor:`${Teachers.Ganger&&Teachers.Ganger.UserID!=='未设置'?'pointer':'default'}`}} onClick={(Teachers.Ganger&&Teachers.Ganger.UserName!=='未设置'&&Teachers.Ganger.UserName!=='')?e=> TeacherDetailShow({UserID:Teachers.Ganger.UserID,UserType:1}):()=>{}} title={Teachers.Ganger&&Teachers.Ganger.UserName?Teachers.Ganger.UserName:'未设置'}>{Teachers.Ganger&&Teachers.Ganger.UserName?Teachers.Ganger.UserName:'未设置'}</div>

                            </div>

                            {

                                Teachers.Ganger&&Teachers.Ganger.UserID?

                                <div className="admclass-teacher-id" title={Teachers.Ganger.UserID}>{Teachers.Ganger.UserID}</div>

                                :''

                            }

                        </div>

                        <div className="cooperate ganger">

                            <div className={`reset ${Teachers.Ganger&&Teachers.Ganger.UserID!=='未设置'?'':'no-set'}`} onClick={this.setGanger.bind(this)}>{Teachers.Ganger&&Teachers.Ganger.UserID!=='未设置'?'更改':'设置'}</div>

                            {

                                Teachers.Ganger&&Teachers.Ganger.UserID!=='未设置'?

                                <React.Fragment>

                                        <div className="line"></div>

                                        <div className="delete" onClick={()=>delGanger()}>撤销</div>

                                </React.Fragment>:''


                            }



                        </div>

                        <div className="ganger-tab">班主任</div>

                    </div>

                        {
                            Teachers.List&&Teachers.List.map((item,key) => {

                                let projects = '';
                                switch (item.SubjectName) {
                                    case '语文':
                                    case '物理':
                                        projects = 'physics';
                                        break;
                                    case '英语':
                                    case '生物':
                                        projects = 'english';
                                        break;
                                    case '数学':
                                    case '政治':
                                        projects = 'math';
                                        break;
                                    case '历史':
                                    case '地理':
                                        projects = 'history';
                                        break;
                                    default:
                                        projects = 'other';
                                }

                               return <div key={key} className="admclass-teacher-item clearfix">

                                           <div className="admclass-teacher-photo" onClick={e=>TeacherDetailShow({UserID:item.UserID,UserType:1})} style={{backgroundImage:`url(${item.PhotoPath})`}}></div>

                                           <div className="admclass-teacher-info">

                                               <div className="admclass-teacher-tab">

                                                   <div className="admclass-teacher-name" onClick={e=>TeacherDetailShow({UserID:item.UserID,UserType:1})} title={item.UserName}>{item.UserName}</div>

                                               </div>

                                               <div className="admclass-teacher-id" title={item.UserID}>{item.UserID}</div>

                                           </div>

                                           <div className={`admclass-teacher-project ${projects}`} title={item.SubjectName}>{item.SubjectName}</div>

                                           <div className="cooperate">

                                               <div className="reset" onClick={() => addTeacherModalShow({type:2,originTeacherInfo:{id:item.UserID,name:item.UserName,photo:item.PhotoPath,SubjectID:item.SubjectID,SubjectName:item.SubjectName}})}>更改</div>

                                               <div className="line"></div>

                                               <div className="delete" onClick={()=>delSubjectTeacher({SubjectID:item.SubjectID})}>删除</div>

                                           </div>

                                       </div>

                            })

                        }

                    </div>

            </CheckBoxGroup>
        );
    }
}
export default TeacherTabWrapper;