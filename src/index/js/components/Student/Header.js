import React,{Component} from 'react';

import TitleIcon from '../../../images/title.png';

class Header extends Component{


    // 桌面定制
    onAdoptClick = () => {

    }


    render() {

        const { HeaderSetting,LoginUser,HeaderMenuToggle,SubjectMenuToggle,SubjectClick,LogOut,CustomClick } = this.props;

        return (

            <div className="desk-header-wrapper clearfix">

                <div className="logo-wrapper">

                    <img className="title-logo" src={TitleIcon}></img>

                </div>


                <div className="frame-home-header-menus">

                    <div className="frame-home-header-menu clearfix">

                        <div className="down-menu clearfix" id="header-down-menu" onClick={e=>{HeaderMenuToggle(e)}}>

                            <span className={`arrow ${HeaderSetting.MenuShow?'up':''}`}></span>

                            <span className="frame-home-username" title={LoginUser.UserName}>{LoginUser.UserName}</span>

                        </div>

                        <div className="menu-wrapper" id="header-menu-wrapper" style={{display:`${HeaderSetting.MenuShow?'block':'none'}`}}>

                            <a href="/html/personalMgr" target="_blank" className="perMgrLink menu">账号管理</a>

                            {/*<a className="help menu">帮助</a>*/}

                            <a className="logout menu" onClick={()=>LogOut()}>退出登录</a>

                        </div>

                        <a href="/html/personalMgr" target="_blank" className="frame-home-userpic" style={{backgroundImage:`url(${LoginUser.PhotoPath})`}}></a>

                    </div>

                </div>

                <div className="adopt" onClick={() => CustomClick()}>桌面定制</div>

            </div>

        );

    }

}

export default Header;