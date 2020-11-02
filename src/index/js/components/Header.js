import React,{Component} from 'react';

import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/pie';

import {removeSlashUrl} from '../actions/ApiActions';

import defaultLogo from '../../images/logo.png';

//import ReactEcharts from 'echarts-for-react';



// import 'echarts/lib/echarts';

class Header extends Component{

    constructor(props) {

        super(props);

        this.state = {

            Options:false

        }
    }




    //容量大小换算

    diskSize(num){

        if (num === 0) return { num:0,unit:"B" };

        var k = 1024; //设定基础容量大小

        var sizeStr = ['B','K','M','G','T','P','E','Z','Y']; //容量单位

        var i = 0; //单位下标和次幂

        for(var l=0;l<8;l++){   //因为只有8个单位所以循环八次

            if(num / Math.pow(k, l) < 1){ //判断传入数值 除以 基础大小的次幂 是否小于1，这里小于1 就代表已经当前下标的单位已经不合适了所以跳出循环

                break; //小于1跳出循环

            }

            i = l; //不小于1的话这个单位就合适或者还要大于这个单位 接着循环

        }
        // 例： 900 / Math.pow(1024, 0)  1024的0 次幂 是1 所以只要输入的不小于1 这个最小单位就成立了；
        //     900 / Math.pow(1024, 1)  1024的1次幂 是1024  900/1024 < 1 所以跳出循环 下边的 i = l；就不会执行  所以 i = 0； sizeStr[0] = 'B';
        //     以此类推 直到循环结束 或 条件成立
        return {num:this.toDecimal1NoZero(num/Math.pow(k,i)),unit:sizeStr[i]}  //循环结束 或 条件成立 返回字符

    }

    //保留1位小数
    toDecimal1NoZero(x) {

        let f = Math.round(x * 10)/10;

        let str = f.toString();

        return str;

    }

    componentWillReceiveProps(nextProps){

        const { HeaderSetting,LoginUser } = nextProps;

        if (Object.keys(HeaderSetting.Options).length>0&&(!this.state.Options)){

            const myChart = echarts.init(document.getElementById('echarts'));

            myChart.setOption(nextProps.HeaderSetting.Options);

            if (parseInt(LoginUser.UserType)===0){

                myChart.on('click',(params)=>{

                    const token = sessionStorage.getItem('token');

                    switch (params.seriesName){

                        case "1":

                            window.open(`/SysMgr/NetworkInfo/OnlineUserInfo.aspx?lg_tk=${token}`);

                            break;

                        case "2":

                            window.open(`/SysMgr/NetworkInfo/LoginLogsInfo.aspx?lg_tk=${token}`);

                            break;

                        case "3":

                            window.open(`/SysMgr/NetworkInfo/LoginLogsInfo.aspx?lg_tk=${token}`);

                            break;

                        case "4":

                            window.open(`/SysMgr/NetworkInfo/LoginExceptInfo.aspx?lg_tk=${token}`);

                            break;

                        case "5":

                            window.open(`/html/systemSetting?lg_tk=${token}`);

                            break;

                    }

                });

            }

            this.setState({Options:true});

        }

    }


    render() {

        const { identifyInfo,HeaderSetting,LoginUser,HeaderMenuToggle,LogOut,ProductName,MessageShow } = this.props;

        const { WebRootUrl='',ProductLogoUrl='' } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

        const token = sessionStorage.getItem("token");

        return (

            <div className="header-wrapper">

                <div className="header-user-info">

                    <div className="header-info-wrapper clearfix">

                        <div className="logo-wrapper" style={{backgroundImage:`url(${ProductLogoUrl?ProductLogoUrl:defaultLogo})`}}>{ProductName}</div>

                        <div className="frame-home-header-menus">

                            <div className="frame-home-header-menu clearfix">



                                <div className="down-menu clearfix" id="header-down-menu" onClick={e=>{HeaderMenuToggle(e)}}>

                                    <span className={`arrow ${HeaderSetting.MenuShow?'up':''}`}></span>

                                    {

                                        identifyInfo.length>0?

                                            <i className={"identify-icon"} style={{backgroundImage:`url(${identifyInfo[0].IconUrl})`}}>{!identifyInfo[0].IsPreset?identifyInfo[0].IdentityName:''}</i>

                                            :null

                                    }

                                    <span className="frame-home-username" title={LoginUser.UserName}>{LoginUser.UserName}</span>

                                </div>

                                <div className="menu-wrapper" id="header-menu-wrapper" style={{display:`${HeaderSetting.MenuShow?'block':'none'}`}}>

                                    <a href={`${removeSlashUrl(WebRootUrl)}/html/personalMgr?lg_tk=${token}`} target="_blank" className="perMgrLink menu">账号管理</a>

                                    <a className="logout menu" onClick={()=>LogOut()}>退出登录</a>

                                </div>

                                <a href={`${removeSlashUrl(WebRootUrl)}/html/personalMgr?lg_tk=${token}`} target="_blank" className="frame-home-userpic" style={{backgroundImage:`url(${LoginUser.PhotoPath})`}}></a>

                            </div>



                            {

                                MessageShow?

                                    <div className="frame-home-header-menu">

                                        <span id="Assistant_infoCenter" className="frame-home-msg-menu" title="我的消息"></span>

                                    </div>

                                    :''

                            }





                        </div>

                    </div>

                </div>

                <div className="echarts-for-react" id="echarts"></div>

                <div className={`shadow-wrapper ${parseInt(LoginUser.UserType)!==0?'hasOne':''}`}>

                    {

                        parseInt(LoginUser.UserType)===0?

                            <>

                                <div className={"blue"}></div>

                                <div className={"green"}></div>

                                <div className={"orange"}></div>

                                <div className={"blue"}></div>

                                <div className={"green"}></div>

                            </>

                            :

                            <div className={"orange"}></div>

                    }



                </div>

                <div className={"header-animation-wrapper"}>

                    <i className={"circle circle1"}></i>

                    <i className={"circle circle2"}></i>

                    <i className={"circle circle3"}></i>

                </div>

            </div>

        );

    }

}

export default Header;