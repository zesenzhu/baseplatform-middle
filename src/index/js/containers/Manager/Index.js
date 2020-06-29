import React,{Component} from 'react';

import AppAlertActions from '../../actions/AppAlertActions';

import ManagerPageActions from '../../actions/Manager/ManagerPageActions';

import HeaderActions from '../../actions/Manager/HeaderActions';

import Header from '../../components/Manager/Header';

import ModulesContent from '../../components/Manager/ModulesContent';

import { LogOut,getQueryVariable } from "../../../../common/js/disconnect";

import { connect } from 'react-redux';

class Index extends Component{

    constructor(props) {

        super(props);

        const { dispatch } = props;

        dispatch(ManagerPageActions.PageInit());

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


    //点击模块的时候调用
    ModuleClick({AccessType,AccessParam,ModuleStatus,SysID}){

        const { dispatch } = this.props;

        if (AccessType === 'href'){

            if (ModuleStatus===1){

                if (SysID!==''){

                    let lg_tk = getQueryVariable('lg_tk')||sessionStorage.getItem('token');

                    window.open(`${AccessParam}?lg_tk=${lg_tk}`);

                }else{

                    window.open(AccessParam);

                }

            }else{
                
                switch (ModuleStatus) {


                    case 2:

                        dispatch(AppAlertActions.alertTips({title:"该功能尚未购买（未检测到加密锁信息），请联系管理员购买后再使用"}));

                        break;

                    case 3:

                        dispatch(AppAlertActions.alertTips({title:"该功能尚未完成部署，请稍候再试"}));

                        break;

                    case 4:

                        dispatch(AppAlertActions.alertTips({title:"该功能正在维护中，请稍候再试"}));

                        break;

                    case 5:

                        dispatch(AppAlertActions.alertTips({title:"该功能已过试用期，请联系管理员购买后再使用"}));

                        break;

                    default:

                        return;

                }

            }

        }else{

            //后期做处理

        }

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

        const { HeaderSetting,Modules } = Manager;

        return (

            <div className="manager-desk-top">

                <Header MessageShow={ProductInfo.MessageShow} ProductName={ProductInfo.ProductName} LoginUser={LoginUser} LogOut={this.LogOut.bind(this)}   HeaderSetting={HeaderSetting} HeaderMenuToggle={this.HeaderMenuToggle.bind(this)}></Header>

                <ModulesContent Modules={Modules} ModuleClick={this.ModuleClick.bind(this)}></ModulesContent>

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

export default connect(mapStateToProps)(Index);