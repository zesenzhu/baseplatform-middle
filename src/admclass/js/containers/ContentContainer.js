import React,{Component} from 'react';

import GradeContent from "./GradeContent";

import ClassContent from "./ClassContent";

import StudentContent from "./StudentContent";

import {connect} from 'react-redux';

import TeacherClassCharge from './Teacher/TeacherClassCharge';




class ContentContainer extends Component{

    render() {

        const {ComponentChange} = this.props.UIState;

        const {UserType,UserClass} = this.props.LoginUser;

        return (


                <div>

                    {

                        (parseInt(UserType)===0||(parseInt(UserType)===7&&UserClass==='2'))?

                            <React.Fragment>

                                {
                                    ComponentChange.stu?

                                        <GradeContent info = {ComponentChange.stuInfo}></GradeContent>

                                        :''

                                }
                                {
                                    ComponentChange.grade?

                                        <ClassContent info ={ ComponentChange.gradeInfo } key={ ComponentChange.gradeInfo.id }></ClassContent>

                                        :''

                                }
                                {
                                    ComponentChange.class?

                                        <StudentContent info ={ ComponentChange.classInfo } key={ComponentChange.classInfo.id}></StudentContent>

                                        :''

                                }

                            </React.Fragment>

                            :''

                    }

                    {

                        parseInt(UserType)===1?

                            <TeacherClassCharge></TeacherClassCharge>

                            :''

                    }


                    {/*</Switch>*/}

                </div>

        );
    }
}

const  mapStateToProps = (state) => {

    let {UIState,DataState} = state;

    const { LoginUser } = DataState;

    return {
        UIState,

        LoginUser
    }

};

export default connect(mapStateToProps)(ContentContainer);