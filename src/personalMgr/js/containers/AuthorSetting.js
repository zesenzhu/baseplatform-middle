import React,{Component} from 'react';

import { Loading,Modal } from "../../../common";

import { connect } from 'react-redux';

import ASActions from '../actions/AuthorSettingActions';

import AppAlertActions from "../actions/AppAlertActions";

class AuthorSetting extends Component{

    constructor(props){

        super(props);

        const { dispatch } = props;

        dispatch(ASActions.PageInit());

        window.SuccessBind = this.SuccessBind.bind(this);

        window.FailBind = this.FailBind.bind(this);

        window.CloseBind = this.CloseBind.bind(this);

    }


    //绑定账号

    BindAccount({Url,Name}){

        const { dispatch } = this.props;

        dispatch({type:ASActions.AUTHOR_SETTING_IFRAME_LOADING_SHOW});

        dispatch({type:ASActions.AUTHOR_SETTING_BIND_MODAL_SHOW,data:{Url,Name}});

    }

    //关闭弹窗

    BindCancel(){

        const { dispatch } = this.props;

        dispatch({type:ASActions.AUTHOR_SETTING_BIND_MODAL_HIDE});

        dispatch(ASActions.PageInit());

    }

    //直接关闭弹窗

    CloseBind(){

        const { dispatch } = this.props;

        dispatch({type:ASActions.AUTHOR_SETTING_BIND_MODAL_HIDE});

        dispatch(ASActions.PageInit());

    }

    //取消绑定
    UnBindAccount(params){

        const { Name } = params;

        const { dispatch } = this.props;

        dispatch(AppAlertActions.alertQuery({title:`确定要解除该${Name}的绑定吗？`,ok:()=>{ return ()=>{this.CancelBind(params,dispatch)}  }}));

    }


    //取消绑定
    CancelBind(params,dispatch){

        dispatch(ASActions.CancelBind(params));

    }

    //成功绑定的方法
    SuccessBind(){

        const { dispatch } = this.props;

        dispatch({type:ASActions.AUTHOR_SETTING_BIND_MODAL_HIDE});

        dispatch(AppAlertActions.alertSuccess({title:"绑定成功！"}));

        dispatch(ASActions.PageInit());

    }

    //绑定失败的方法

    FailBind(){

        const { dispatch } = this.props;

        dispatch(AppAlertActions.alertWarn({title:"绑定失败，请重新绑定！"}));

    }

    //
    IframeLoad(){

        const { dispatch }= this.props;

        dispatch({type:ASActions.AUTHOR_SETTING_IFRAME_LOADING_HIDE});

    }








    render() {

        const { AuthorSetting } = this.props;

        const { LoadingShow,AuthorList,BindModal } = AuthorSetting;

        const { Name,Url,Show,IframeLoading } = BindModal;

        const QQAccount = AuthorList.find(item=>item.OpenType===1);

        const WeiboAccount = AuthorList.find(item=>item.OpenType===2);

        const WeChatAccount = AuthorList.find(item=>item.OpenType===4);

        return (

        <div className="author-setting-wrapper">

            <Loading spinning={LoadingShow}>

                <div className="title-bar">

                    <div className="title-bar-name">第三方登录账号</div>

                </div>

                <div className="author-content-wrapper">

                    {

                        QQAccount?

                            <div className="author-item clearfix">

                                <div className={`title-icon-wrapper qq`}>QQ</div>

                                <div className="author-account">

                                    {

                                        QQAccount.HasSet?

                                            <div className="account-wrapper">

                                                <i className="account-icon" style={{backgroundImage:`url(${QQAccount.AvatarPath})`}}></i>

                                                <span className="account-nickname">{QQAccount.NickName}</span>

                                                <button className="unbind-btn" onClick={this.UnBindAccount.bind(this,{UserID:QQAccount.UserID,OpenID:QQAccount.OpenID,OpenType:QQAccount.OpenType,Name:'QQ'})}>解除绑定</button>

                                            </div>

                                            :

                                            <div className="unbind-title">未绑定</div>

                                    }

                                </div>

                                {

                                    QQAccount.HasSet?

                                        ''

                                        :

                                        <button className="add-bind" onClick={this.BindAccount.bind(this,{Url:QQAccount.OpenLoginUrl,Name:'QQ'})}>绑定账号</button>

                                }


                            </div>

                            :''

                    }

                    {

                        WeiboAccount?

                            <div className="author-item clearfix">

                                <div className={`title-icon-wrapper sina`}>新浪微博</div>

                                <div className="author-account">

                                    {

                                        WeiboAccount.HasSet?

                                            <div className="account-wrapper">

                                                <i className="account-icon" style={{backgroundImage:`url(${WeiboAccount.AvatarPath})`}}></i>

                                                <span className="account-nickname">{WeiboAccount.NickName}</span>

                                                <button className="unbind-btn" onClick={this.UnBindAccount.bind(this,{UserID:WeiboAccount.UserID,OpenID:WeiboAccount.OpenID,OpenType:WeiboAccount.OpenType,Name:'新浪微博'})}>解除绑定</button>

                                            </div>

                                            :

                                            <div className="unbind-title">未绑定</div>

                                    }

                                </div>

                                {

                                    WeiboAccount.HasSet?

                                        ''

                                        :

                                        <button className="add-bind" onClick={this.BindAccount.bind(this,{Url:WeiboAccount.OpenLoginUrl,Name:'新浪微博'})}>绑定账号</button>

                                }

                            </div>

                            :''

                    }

                    {

                        WeChatAccount ?

                            <div className="author-item clearfix">

                                <div className={`title-icon-wrapper wechat`}>微信</div>

                                <div className="author-account">

                                    {

                                        WeChatAccount.HasSet ?

                                            <div className="account-wrapper">

                                                <i className="account-icon"
                                                   style={{backgroundImage: `url(${WeChatAccount.AvatarPath})`}}></i>

                                                <span className="account-nickname">{WeChatAccount.NickName}</span>

                                            </div>

                                            :

                                            <div className="unbind-title">未绑定</div>

                                    }

                                </div>

                                <div className="unbind-tips">请在移动设备上进行{WeChatAccount.HasSet ? '解绑' : '绑定'}</div>

                            </div>

                            :''

                    }

                </div>

            </Loading>

            <Modal

                type={1}

                className="author-bind-modal"

                title={`绑定${Name}账号`}

                mask={true}

                visible={Show}

                width={800}

                bodyStyle={{height:452}}

                footer={null}

                onCancel={this.BindCancel.bind(this)}

                >

                <Loading spinning={IframeLoading} opacity={false} tip="加载中,请稍候...">

                {

                    Show?

                        <iframe src={Url} onLoad={this.IframeLoad.bind(this)} title="author" frameBorder="0" id="bind-iframe"></iframe>

                    :''

                }

                </Loading>

            </Modal>

        </div>

        );

    }

}

const mapStateToProps = (state) => {

    const { AuthorSetting } = state;

    return {

        AuthorSetting

    }

};

export default connect(mapStateToProps)(AuthorSetting);