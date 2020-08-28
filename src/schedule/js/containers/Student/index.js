import React,{Component} from 'react';

import {HashRouter as Router,Route,Switch,Redirect} from  'react-router-dom';

import HeaderRouter from '../../component/HeaderRouter';

import { connect } from 'react-redux';

import StudentPersonalSchedule from "./StudentPersonalSchedule";

import ClassSchedule from "./ClassSchedule";

import apiActions from '../../actions/ApiActions';

import stuIndexActions from '../../actions/Student/StudentIndexActions';


class Index extends Component{

    constructor(props){

        super(props);

        this.state = {

            firstLoad:true

        }

    }

    componentWillReceiveProps(nextProps){

        const { LoginUser,dispatch } = nextProps;

        const { UserID,StudyLevel,SchoolID,UserType } = LoginUser;

        if (UserID&&this.state.firstLoad){

            this.setState({firstLoad:false},()=>{

                apiActions.GetAllOptionByPeriodID({SchoolID,PeriodID:'',UserID,UserType,CollegeID:''}).then(data=>{

                    if (data){

                        dispatch({type:stuIndexActions.STUDENT_CLASSHOURS_INFO_INIT,data:data});

                    }

                })


            })

        }

    }


    render() {

        let HeaderLinkList = [];

        const { LoginUser,dispatch } = this.props;

        const { UserType,UserClass,UserID } = LoginUser;

        if (Object.keys(LoginUser).length>0){

            if (UserType==='2'){

                HeaderLinkList = [

                    {link:"/student/mine",name:"我的课表",logo:"mine"},

                    {link:"/student/class",name:"班级课表",logo:"class"}

                ];

            }else {

                 window.location.href='/Error.aspx?errcode=E011';

            }

        }


        return (

            <React.Fragment>

                {/*头部的路由选项卡*/}

                <HeaderRouter HeaderLinkList={HeaderLinkList}></HeaderRouter>
                {/* 泡泡型标签链接按钮*/}

                <Router>

                    <Switch>

                        <Route key={"class"} path="/student/class" component={ClassSchedule}></Route>

                        <Route key={"mine"} path="/student/mine" component={StudentPersonalSchedule}></Route>

                        <Redirect path="/student*" to={{pathname:"/student/mine"}}></Redirect>

                    </Switch>

                </Router>

            </React.Fragment>

        );

    }

}

const mapStateToProps = (state) => {

    const { LoginUser } = state;

    return { LoginUser };

};

export default connect(mapStateToProps)(Index);