import React,{Component} from 'react';

import ChangeTab from "../../component/ChangeTab";

import {HashRouter as Router, Route, Switch} from "react-router-dom";

import ClassTotal from './ClassTotal';

import GCActions from '../../actions/Teacher/GangerClassActions';

import ClassStudent from './ClassStudent';

import { connect } from 'react-redux';

import {getQueryVariable} from "../../../../common/js/disconnect";


class ClassTotalStudent extends Component{

    constructor(props) {

        super(props);

        const { dispatch } = props;

        const UserInfo = sessionStorage.getItem('UserInfo');

        if (UserInfo){

            dispatch(GCActions.GetGangerClasses());

        }else{

            let WaitUserInfo = setInterval(()=>{

                const UserInfo = sessionStorage.getItem('UserInfo');

                if (UserInfo){

                    dispatch(GCActions.GetGangerClasses());

                    clearInterval(WaitUserInfo);

                }

            },20)

        }

        this.state={

            isWorkPlantform:false

        }

    }


    componentDidMount(){

        if (getQueryVariable('isWorkPlantform')){

            this.setState({isWorkPlantform:true});

        }

    }

    render(){

        const { Classes } = this.props;

        let TabLinkList = [];

        let RouterWrapper = '';

        if (Classes.length>0){

            TabLinkList = [

                {link:"/teacher/class/total",name:"班级总课表"},

                {link:"/teacher/class/student",name:"学生课表"}

            ];

            RouterWrapper = <React.Fragment>

                <Route path="/teacher/class/total"  component={ClassTotal}></Route>

                <Route path="/teacher/class/student"  component={ClassStudent}></Route>

            </React.Fragment>

        }


        return <div className={`class-total-student-wrapper ${this.state.isWorkPlantform?'in-work-plant-form':''}`}>

            <ChangeTab TabLinkList = {TabLinkList}></ChangeTab>

            <Router>

                <Switch>

                    {RouterWrapper}

                </Switch>

            </Router>

        </div>

    }

}

const mapStateToProps = (state)=>{

    const { Classes } = state.Teacher.GangerClass;

    return { Classes };

};

export default connect(mapStateToProps)(ClassTotalStudent);