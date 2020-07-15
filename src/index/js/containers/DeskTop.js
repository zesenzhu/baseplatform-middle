import React,{Component} from 'react';

import AppAlertActions from '../actions/AppAlertActions';

import PageActions from '../actions/PageActions';

import HeaderActions from '../actions/HeaderActions';

import Header from '../components/Header';

import ModulesContent from '../components/ModulesContent';

import { LogOut,getQueryVariable } from "../../../common/js/disconnect/index";

import { connect } from 'react-redux';

class DeskTop extends Component{

    constructor(props) {

        super(props);

        const { dispatch } = props;

        dispatch(PageActions.PageInit());

    }

    //头部点击menu

    HeaderMenuToggle(e){

        e.stopPropagation();

        const { dispatch } = this.props;

        dispatch({type:HeaderActions.HEADER_MENU_TOGGLE});

    }

    //点击echarts



    OutMenuEvent(e){

        const { dispatch } = this.props;

        let HDM =  document.getElementById('header-down-menu');

        let HMW = document.getElementById('header-menu-wrapper');

        if (!HDM.contains(e.target)){

            dispatch({type:HeaderActions.HEADER_MENU_HIDE});

        }

    }


    //点击menu之外
    componentDidMount(){

        addEventListener('click',this.OutMenuEvent.bind(this));

    }


    //退出登录
    LogOut(){

        const { dispatch } = this.props;

        dispatch(AppAlertActions.alertQuery({title:"确定要退出登录吗?",ok:()=>{ return this.GoOut}}));

    }


    GoOut(){

        LogOut();

    }


    render() {

        const { LoginUser,Manager,ProductInfo } = this.props;

        const { HeaderSetting } = Manager;

        return (

            <div className="manager-desk-top">

                <Header MessageShow={ProductInfo.MessageShow} ProductName={ProductInfo.ProductName} LoginUser={LoginUser} LogOut={this.LogOut.bind(this)}   HeaderSetting={HeaderSetting} HeaderMenuToggle={this.HeaderMenuToggle.bind(this)}></Header>

                <ModulesContent></ModulesContent>

                <div className="footer">{ProductInfo.ProVersion}</div>

            </div>

        );

    }

}

const mapStateToProps = (state) => {

    const { LoginUser,Manager,ProductInfo } = state;

    return {

        LoginUser,

        Manager,

        ProductInfo

    }

};

export default connect(mapStateToProps)(DeskTop);