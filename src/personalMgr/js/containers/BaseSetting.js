import React,{Component} from 'react';

import BaseActions from '../actions/BaseActions';

import { Loading } from "../../../common";

import { Input,Tooltip } from "antd";

import { connect } from 'react-redux';

import ScrollBars from 'react-custom-scrollbars';

let Enter = false;

class BaseSetting extends Component{

    constructor(props) {

        super(props);

        const { dispatch } = props;

        this.state={

          zIndex:3,

          UserNameTips:'用户名应由3-20位的字母、数字组成'

        };

        dispatch(BaseActions.Init());

    }


    editorStatusChange(){

        const { dispatch,BaseSetting } = this.props;
        //输入状态，如果是关闭状态就开启，如果是开启状态就关闭
        if (BaseSetting.editorStatus){

            dispatch({type:BaseActions.BASE_SETTING_EDITOR_CLOSE});

        }else{

            dispatch({type:BaseActions.BASE_SETTING_EDITOR_OPEN});

        }

    }



    //用户名变更
    ShortNameChange(e){

        const { dispatch } = this.props;

        dispatch({type:BaseActions.BASE_SETTING_SHORT_NAME_CHANGE,data:e.target.value});

    }


    //用户名验证
    CheckShortName(){

        const { dispatch,BaseSetting } = this.props;

        const { ShortNameValue } = BaseSetting;

        let CheckShortName = ShortNameValue.trim();

        if(CheckShortName === ''){

            dispatch({type:BaseActions.BASE_SETTING_SHORT_NAME_TIPS_HIDE});

        }else{

            let result = this.UserComm_CheckShortName(CheckShortName);

            if (result!==0){

                if (result===2){

                    this.setState({UserNameTips:'用户名已被占用'})

                }else{

                    this.setState({UserNameTips:'用户名应由3-20位的字母、数字组成'})

                }

                dispatch({type:BaseActions.BASE_SETTING_SHORT_NAME_TIPS_SHOW});

            }else{

                dispatch({type:BaseActions.BASE_SETTING_SHORT_NAME_TIPS_HIDE});

            }

        }

    }



    //QQ输入改变
    QQChange(e){

        const { dispatch } = this.props;

        dispatch({type:BaseActions.BASE_SETTING_QQ_CHANGE,data:e.target.value});

    }


    //验证QQ
    CheckQQ(){

        const { dispatch,BaseSetting } = this.props;

        const { QQValue } = BaseSetting;

        let CheckQQValue = QQValue.trim();

        if(CheckQQValue === ''){

            dispatch({type:BaseActions.BASE_SETTING_QQ_TIPS_HIDE});

        }else{

            let result = this.UserComm_CheckQQ(CheckQQValue);

            if (result){

                dispatch({type:BaseActions.BASE_SETTING_QQ_TIPS_HIDE});

            }else{

                dispatch({type:BaseActions.BASE_SETTING_QQ_TIPS_SHOW});

            }

        }

    }

    //微信输入改变
    WeiChatChange(e){

        const { dispatch } = this.props;

        dispatch({type:BaseActions.BASE_SETTING_WEIXIN_CHANGE,data:e.target.value});

    }


    //微信验证
    CheckWeiChat(){

        const { dispatch,BaseSetting } = this.props;

        const { WeixinValue } = BaseSetting;

        let CheckWeixinValue = WeixinValue.trim();

        if(CheckWeixinValue === ''){

            dispatch({type:BaseActions.BASE_SETTING_WEIXIN_TIPS_HIDE});

        }else{

            let result = this.UserComm_CheckWeixin(CheckWeixinValue);

            if (result){

                dispatch({type:BaseActions.BASE_SETTING_WEIXIN_TIPS_HIDE});

            }else{

                dispatch({type:BaseActions.BASE_SETTING_WEIXIN_TIPS_SHOW});

            }

        }

    }


    //微博输入改变
    WeiBoChange(e){

        const { dispatch } = this.props;

        dispatch({type:BaseActions.BASE_SETTING_WEIBO_CHANGE,data:e.target.value});


    }

    //微博验证
    CheckWeiBo(){

        const { dispatch,BaseSetting } = this.props;

        const { WeiboValue } = BaseSetting;

        let CheckWeiboValue = WeiboValue.trim();

        if(CheckWeiboValue === ''){

            dispatch({type:BaseActions.BASE_SETTING_WEIBO_TIPS_HIDE});

        }else{

            let result = this.UserComm_CheckSinaWeibo(CheckWeiboValue);

            if (result){

                dispatch({type:BaseActions.BASE_SETTING_WEIBO_TIPS_HIDE});

            }else{

                dispatch({type:BaseActions.BASE_SETTING_WEIBO_TIPS_SHOW});

            }
        }

    }


    //电话号码输入改变
    TelChange(e){

        const { dispatch } = this.props;

        dispatch({type:BaseActions.BASE_SETTING_TEL_CHANGE,data:e.target.value});

    }

    //电话号码验证
    CheckTel(){

        const { dispatch,BaseSetting } = this.props;

        const { TelephoneValue } = BaseSetting;

        let CheckTelephoneValue = TelephoneValue.trim();

        if(CheckTelephoneValue === ''){

            dispatch({type:BaseActions.BASE_SETTING_TEL_TIPS_HIDE});

        }else{

            let result = this.UserComm_CheckTelephone(CheckTelephoneValue);

            if (result){

                dispatch({type:BaseActions.BASE_SETTING_TEL_TIPS_HIDE});

            }else{

                dispatch({type:BaseActions.BASE_SETTING_TEL_TIPS_SHOW});

            }
        }

    }


    //sign个性签名变化
    SignChange(e){

        const { dispatch } = this.props;

        if (!Enter){

            dispatch({type:BaseActions.BASE_SETTING_SIGN_CHANGE,data:e.target.value});

        }

    }
    //点击保存
    Ok(e){

        const { dispatch } = this.props;

        dispatch(BaseActions.Commit(this.PicUpload));

    }


    //取消保存
    Cancel(e){

        const { dispatch } = this.props;

        dispatch({type:BaseActions.BASE_SETTING_EDITOR_CLOSE});

    }
    //点击弹出模块权限详情
    roleLook(e){

        const { dispatch,BaseSetting } = this.props;

        const { ManagerModuleShow } = BaseSetting;

        if(ManagerModuleShow){

            dispatch({type:BaseActions.BASE_SETTING_MANAGER_MODULES_HIDE});

            this.setState({zIndex:3});

        }else{

            dispatch({type:BaseActions.BASE_SETTING_MANAGER_MODULES_SHOW});

            this.setState({zIndex:1082});

        }



    }
    //将模块权限详情关闭
    roleDetailClose(e){

        e.stopPropagation();

        const { dispatch } = this.props;

        dispatch({type:BaseActions.BASE_SETTING_MANAGER_MODULES_HIDE});

        this.setState({zIndex:3});

    }
    //教师点击身份详情
    teacherRoleLook(key){

        const { dispatch } = this.props;

        dispatch({type:BaseActions.BASE_SETTING_TEACHER_ROAL_DETAILS_STATUS_SHOW,data:key});


    }
    //教师角色面板关闭
    TeacherRoalDetailsClose(e,key){

        e.stopPropagation();

        const { dispatch } = this.props;

        dispatch({type:BaseActions.BASE_SETTING_TEACHER_ROAL_DETAILS_STATUS_HIDE,data:key});

    }


    //点击其他地方隐藏detail弹窗
    hideDetail(e) {

        const {dispatch} = this.props;

        if (this.refs['module-detail']) {

            if (!this.refs['module-detail'].contains(e.target)) {

                dispatch({type: BaseActions.BASE_SETTING_MANAGER_MODULES_HIDE});

                this.setState({zIndex:3});

            }

        }

        for (let i = 0; i <= 2; i++ ){

            if (this.refs[`teacher-roal-detail${i}`]){

                if (!this.refs[`teacher-roal-detail${i}`].contains(e.target)){

                    dispatch({type: BaseActions.BASE_SETTING_TEACHER_ROAL_DETAILS_STATUS_HIDE,data:i});



                }

            }

        }

    }

    componentDidMount(){

        addEventListener('click',this.hideDetail.bind(this));

    }










    //检测用户名
    UserComm_CheckShortName(strInput) {

        if (!/^([a-zA-Z0-9]){3,15}$/.test(strInput)) {

            return 1;   //格式错误

        }

        else {

            if (/^(admin)$/.test(strInput) === true) {

                return 2;  //与管理员ID具有相同格式

            }

            else {

                return 0;

            }

        }

    }

    //检测QQ
    UserComm_CheckQQ(strInput) {

        return /^[1-9]*[1-9][0-9]{4,18}$/.test(strInput); //QQ号

    }

    //检测微信
    UserComm_CheckWeixin(strInput) {

        var result = false;

        result = result || this.UserComm_CheckPhoneNumber(strInput); //手机号码

        result = result || /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,20}$/.test(strInput); //微信ID（微信账号仅支持6-20个字母、数字、下划线或减号，以字母开头。）

        result = result || this.UserComm_CheckQQ(strInput); //QQ号

        result = result || this.UserComm_CheckEmail(strInput); //邮箱

        return result;

    }

    //检测微博
    UserComm_CheckSinaWeibo(strInput) {

        var result = false;

        result = result || this.UserComm_CheckPhoneNumber(strInput); //手机号码

        result = result || this.UserComm_CheckEmail(strInput); //邮箱

        return result;

    }

    //检测手机
    UserComm_CheckPhoneNumber(strInput) {

        return /^[0-9]{11}$/.test(strInput);

    }
    //检测电话
    UserComm_CheckTelephone(strInput) {

        return /^([0-9\/-]){1,40}$/.test(strInput);

    }

    //检测邮箱
    UserComm_CheckEmail(strInput) {
        //\S表示非空字符
        if (!/^(\S)+@(\S)+\.[a-zA-Z]{2,3}$/.test(strInput)) {
            return false;
        }
        else {
            return /^([a-zA-Z0-9]+[_|\-|\.]*)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]*)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/gi.test(strInput);
        }
    }




    SignKeyUp(e){

        if (e.keyCode===13){

            Enter = true;

        }else{

            Enter = false;

        }

    }



    render() {

        const { BaseSetting,LoginUser } = this.props;

        const {

            loadingShow,

            editorStatus,

            UserID,

            UserType,

            UserClass,

            UserName,

            ShortName,

            Gender,

            SubjectName,

            Modules,

            RoleNames,

            RoleDetail,

            QQ,

            Weixin,

            Weibo,

            Telephone,

            Sign,

            ShortNameValue,

            QQValue,

            WeixinValue,

            WeiboValue,

            TelephoneValue,

            SignValue,

            ShortNameTipsShow,

            QQTipsShow,

            WeixinTipsShow,

            WeiboTipsShow,

            TelephoneTipsShow,

            ManagerModuleShow,

            TeacherRoalDetails,

            Position

        } = BaseSetting;



        return (

            <Loading spinning={loadingShow}>

                <div className="base-setting-wrapper">

                {

                    editorStatus?

                       ''

                        : <div className="title-bar">

                            <input className="edit-btn" type="button" value="编辑资料" onClick={this.editorStatusChange.bind(this)}/>

                        </div>

                }

                <div className="base-info-wrapper base-item-setting" style={editorStatus?{paddingTop:"36px"}:{}}>

                    <div className="title base">基本信息</div>

                    <div className="content-wrapper">

                        <div className="user-photo-wrapper clearfix" style={{display:`${editorStatus?'block':'none'}`}}>

                            <span className="props">头像:</span>

                            <div id="PicUpload"></div>

                        </div>

                        <div className="user-id-wrapper clearfix">

                            <span className="props">

                                {

                                    UserType === 2?

                                        '学号:':'工号:'

                                }

                            </span>

                            <span className="val">{UserID}</span>

                        </div>

                        <div className="account-name-wrapper clearfix">

                            <span className="props">

                                {

                                    UserType === 0?

                                        '账号名称:':'姓名:'

                                }

                            </span>

                            <span className="val">{UserName}</span>

                        </div>

                        <div className="user-name-wrapper clearfix">

                            <span className="props">用户名:</span>

                            {

                                editorStatus?

                                    <React.Fragment>

                                        <Tooltip getPopupContainer={triggerNode =>triggerNode.parentNode} visible={ShortNameTipsShow} placement="right" title={this.state.UserNameTips}>

                                            <Input value={ShortNameValue}   maxLength={15} onChange={this.ShortNameChange.bind(this)} onBlur={this.CheckShortName.bind(this)}/>

                                        </Tooltip>

                                        <span className="set-tips">(由3-15位英文/数字组成，可用于登录)</span>

                                    </React.Fragment>

                                    :

                                    <span className={`val ${ShortName?'':'unset'}`}>{ShortName?ShortName:'未设置'}</span>

                            }

                        </div>


                        {

                            UserType === 1?

                                <div className="subject-wrapper clearfix">

                                    <span className="props">所教学科:</span>


                                    <span className="val" title={SubjectName}>{SubjectName}</span>


                                </div>

                                :''

                        }

                        <div className="role-wrapper clearfix" style={{zIndex:this.state.zIndex}}>

                            <div className="detial-wrapper"  style={{display:`${ManagerModuleShow?'block':'none'}`}}>



                                    {

                                        Modules&&Modules.length>0?

                                            Modules.map((item,key) => {

                                                let content =  item.ModuleList.map(i =>i.ModuleName);

                                                return <div key={key} className="detail-item-wrapper">

                                                    <div className="detail-item-title">{item.ModuleGroupName}</div>



                                                    <div className="detail-content-wrapper">


                                                        {

                                                            content.join(',')

                                                        }

                                                    </div>

                                                </div>

                                            })

                                            :

                                            <div className="no-permission">您还没有任何权限！</div>

                                    }



                                <span className="close-btn" onClick={this.roleDetailClose.bind(this)}>×</span>

                            </div>

                            <span style={{display:UserType === 0||UserType === 1||UserType ===7 ?'inline-block':'none'}} className="props">身份:</span>

                            {

                                UserType === 0?

                                <React.Fragment>

                                    <span className={`val ${Modules?'link':''}`} ref="module-detail" onClick={Modules?this.roleLook.bind(this):()=>{}}>

                                        {

                                            UserClass === 1?'普通管理员':'超级管理员'

                                        }

                                     </span>

                                    {

                                        Modules?

                                            <span className="set-tips">(点击可查看子系统访问权限)</span>

                                            :''

                                    }

                                </React.Fragment>

                                    :''

                            }

                            {

                                UserType===1?

                                    <React.Fragment>

                                        {

                                            RoleNames&&RoleNames.map((item,key) => {

                                                let title = '';

                                                let emptyContent = '';

                                                switch (key) {

                                                    case 0:

                                                        title = '任课班级';

                                                        emptyContent = '暂无任课班级！';

                                                        break;

                                                    case 1:

                                                        title = '所管班级';

                                                        emptyContent = '暂无管理班级！';

                                                        break;

                                                    case 2:

                                                        title = '所管教研组';

                                                        emptyContent = '暂无管理教研组！';

                                                        break;

                                                    default:

                                                        title = '任课班级'
                                                }

                                                const RoleInnerHTML = RoleDetail[key]===''?emptyContent:RoleDetail[key];

                                                return  <React.Fragment key={key}>

                                                            {

                                                                (key ===0||item==='')?

                                                                    '':<span>/</span>

                                                            }

                                                            {

                                                                item !== ''?

                                                                    <span  className='val link' ref={`teacher-roal-detail${key}`}  onClick={this.teacherRoleLook.bind(this,key)}>

                                                                        {item}

                                                                        <div className="detial-wrapper teacher" style={{display:`${TeacherRoalDetails[key]['show']?'block':'none'}`}}>

                                                                            <div className="detail-item-title">{title}</div>

                                                                             <ScrollBars style={{width:RoleDetail[key]?(RoleDetail[key].split('、').length*80+230):230,maxWidth:420}} autoHeight autoHeightMax={172}>

                                                                                <div className="detail-content-wrapper" style={{width:RoleDetail[key]?(RoleDetail[key].split('、').length*80+172):172}} dangerouslySetInnerHTML={{__html:RoleInnerHTML}}></div>

                                                                             </ScrollBars>

                                                                            <span className="close-btn" onClick={e=>this.TeacherRoalDetailsClose(e,key)}>×</span>

                                                                        </div>

                                                                    </span>

                                                                    :''

                                                            }

                                                        </React.Fragment>

                                            })

                                        }

                                        <span className="set-tips">(点击可查看身份详情)</span>

                                    </React.Fragment>

                                    :''

                            }


                            {

                                UserType===7?

                                    <span className={`val`}>{Position}</span>

                                    :''

                            }

                        </div>

                    </div>

                </div>

                <div className="concact-info-wrapper base-item-setting">

                    <div className="title concact">联系方式</div>

                    <div className="content-wrapper">

                        <div className="qq-wrapper clearfix">

                            <span className="props">QQ:</span>

                            {


                                editorStatus?

                                    <Tooltip getPopupContainer={triggerNode =>triggerNode.parentNode} visible={QQTipsShow} placement="right" title="QQ应由5-18位的数字组成">

                                        <Input value={QQValue} onChange={this.QQChange.bind(this)} onBlur={this.CheckQQ.bind(this)}/>

                                    </Tooltip>

                                    :

                                    <span className={`val ${QQ?'':'unset'}`}>{QQ?QQ:'未设置'}</span>

                            }

                        </div>

                        <div className="weixin-wrapper clearfix">

                            <span className="props">微信:</span>

                            {


                                editorStatus?

                                    <Tooltip getPopupContainer={triggerNode =>triggerNode.parentNode} visible={WeixinTipsShow} placement="right" title="微信号应为手机号/QQ号/邮箱地址或微信ID">

                                        <Input value={WeixinValue} onChange={this.WeiChatChange.bind(this)} onBlur={this.CheckWeiChat.bind(this)}/>

                                    </Tooltip>

                                    :

                                    <span className={`val ${Weixin?'':'unset'}`}>{Weixin?Weixin:'未设置'}</span>

                            }

                        </div>

                        <div className="weibo-wrapper clearfix">

                            <span className="props">微博:</span>

                            {


                                editorStatus?

                                    <Tooltip getPopupContainer={triggerNode =>triggerNode.parentNode} visible={WeiboTipsShow} placement="right" title="微博应为手机号或邮箱地址">

                                    <Input value={WeiboValue} onChange={this.WeiBoChange.bind(this)} onBlur={this.CheckWeiBo.bind(this)}/>

                                    </Tooltip>

                                    :

                                    <span className={`val ${Weibo?'':'unset'}`}>{Weibo?Weibo:'未设置'}</span>

                            }

                        </div>

                        <div className="tel-wrapper clearfix">

                            <span className="props">联系电话:</span>

                            {


                                editorStatus?

                                    <Tooltip getPopupContainer={triggerNode =>triggerNode.parentNode} visible={TelephoneTipsShow} placement="right" title="电话应由数字、-、/组成">

                                        <Input value={TelephoneValue} onChange={this.TelChange.bind(this)} onBlur={this.CheckTel.bind(this)}/>

                                    </Tooltip>

                                    :

                                    <span className={`val ${Telephone?'':'unset'}`}>{Telephone?Telephone:'未设置'}</span>

                            }

                        </div>

                    </div>

                </div>

                <div className="sign-info-wrapper base-item-setting">

                    <div className="title sign">个性签名</div>

                    <div className="content-wrapper">


                        <div className="sign-wrapper clearfix">

                            {

                                editorStatus?

                                    <React.Fragment>

                                        <span className="props">个性签名:</span>

                                        <Input.TextArea value={SignValue} onChange={this.SignChange.bind(this)} onKeyDown={this.SignKeyUp.bind(this)}/>

                                    </React.Fragment>

                                    :

                                    <span className={`val ${Sign?'':'unset'}`}>{Sign?Sign:'未设置'}</span>

                            }

                        </div>


                    </div>

                </div>

                <div className="btn-wrapper clearfix">

                        {

                            editorStatus?

                                <React.Fragment>

                                    <input type="button" className="btn-save" value="保存" onClick={this.Ok.bind(this)}/>

                                    <input type="button" className="btn-cancel" value="取消" onClick={this.Cancel.bind(this)}/>

                                </React.Fragment>

                                :''

                        }

                    </div>

            </div>

            </Loading>

        );

    }

}

const mapStateToProps = (state) => {

    const { BaseSetting,LoginUser } = state;

    return {

        BaseSetting,

        LoginUser

    }

};

export default connect(mapStateToProps)(BaseSetting);