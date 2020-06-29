import React,{Component} from 'react';

import { Loading,DropDown,Modal,Table } from "../../../common";



import { Input,Tooltip } from "antd";

import SafeSettingActions from  '../actions/SafeSettingAcions';

import $ from 'jquery';

import { connect } from 'react-redux';


class SafeSetting extends Component{

    constructor(props) {

        super(props);

        this.state = {

            OriginPwdIcon:false,

            NewPwdIcon:false,

            ReNewPwdIcon:false,

            PwdStrongShow:false,

            PwdStrongType:'weak'

        };

        const { dispatch } = props;

        dispatch(SafeSettingActions.Init());

    }

    //点击下拉需要设置的地方
    setSlide(type){

        const { dispatch,SafeSetting } = this.props;

        const { pwdSetShow,emailSetShow,qaSetShow } = SafeSetting;

        switch (type) {

            case 'pwd':

                console.log(pwdSetShow);

                if (pwdSetShow){

                    $(this.refs['pwd-content']).stop().slideUp();

                    dispatch({ type:SafeSettingActions.SAFE_SETTING_CONTENT_SLIDE_UP,data:type});

                    dispatch(SafeSettingActions.clearPwd());

                    this.setState({ OriginPwdIcon:false,

                        NewPwdIcon:false,

                        ReNewPwdIcon:false,

                        PwdStrongShow:false});

                }else{

                    $(this.refs['pwd-content']).stop().slideDown();

                    dispatch({ type:SafeSettingActions.SAFE_SETTING_CONTENT_SLIDE_DOWN,data:type});

                    dispatch(SafeSettingActions.clearPwd());

                }

                break;

            case 'email':

                console.log(emailSetShow);

                if (emailSetShow){

                    $(this.refs['email-content']).stop().slideUp();

                    dispatch({ type:SafeSettingActions.SAFE_SETTING_CONTENT_SLIDE_UP,data:type});

                    dispatch(SafeSettingActions.clearEmail());

                }else{

                    $(this.refs['email-content']).stop().slideDown();

                    dispatch({ type:SafeSettingActions.SAFE_SETTING_CONTENT_SLIDE_DOWN,data:type});

                }

                break;

            case 'qa':

                console.log(qaSetShow);

                if (qaSetShow){

                    $(this.refs['qa-content']).stop().slideUp();

                    dispatch({ type:SafeSettingActions.SAFE_SETTING_CONTENT_SLIDE_UP,data:type});

                    dispatch(SafeSettingActions.clearQuestions());

                }else{

                    $(this.refs['qa-content']).stop().slideDown();

                    dispatch({ type:SafeSettingActions.SAFE_SETTING_CONTENT_SLIDE_DOWN,data:type});

                }

                break;

            default:

                return;

        }

    }

    //密码更改
    PwdChange(e,type){

        const { dispatch } = this.props;

        dispatch({type:SafeSettingActions.SAFE_SETTING_PWD_VALUE_CHANGE,data:{type:type,value:e.target.value}});

        dispatch({type:SafeSettingActions.SAFE_SETTING_PWD_TIPS_HIDE,data:{type:type}});

        switch(type){

            case 'new':

                this.setState({NewPwdIcon:false});

                break;

            case 'reNew':
                
                this.setState({ReNewPwdIcon:false});

                break;

        }

    }


    //判断密码是否符合正则表达式

    PwdCheck(e,type){

        const { dispatch } = this.props;

       const result = SafeSettingActions.UserComm_ValidatePwd(e.target.value);//检测是否符合正则

       if (e.target.value){//如果值不为空的时候

           if (type!=='origin'){//如果是密码的话

               if (!result.isOK) {

                   dispatch({type:SafeSettingActions.SAFE_SETTING_PWD_TIPS_SHOW,data:{type:type,tips:"密码应由8-20位字母、数字及特殊字符`~!@#$%^&*()_+-={}|[]:\";'<>?,./\\的任意两种及以上组成"}});

               }else{

                   switch (type) {

                       case 'origin':

                           this.setState({OriginPwdIcon:true});

                           break;

                       case 'new':

                           this.setState({NewPwdIcon:true});

                           break;

                       case 'reNew':

                           this.setState({ReNewPwdIcon:true});

                           break;

                       default:

                           this.setState({OriginPwdIcon:true});

                   }

               }

           }

           if (type==='new'){

               const StrongCheck = this.UserComm_PwdStrong(e.target.value);

               switch (StrongCheck) {

                   case 0:

                       this.setState({PwdStrongShow:false});

                       break;

                   case 1:

                       this.setState({PwdStrongShow:true,PwdStrongType:'weak'});

                       break;

                   case 2:

                       this.setState({PwdStrongShow:true,PwdStrongType:'middle'});

                       break;

                   case 3:

                       this.setState({PwdStrongShow:true,PwdStrongType:'strong'});

                       break;

                   default:

                       this.setState({PwdStrongShow:false});

               }

           }

       }else{

           switch (type) {

               case 'origin':

                   this.setState({OriginPwdIcon:false});

                   break;

               case 'new':

                   this.setState({NewPwdIcon:false});

                   break;

               case 'reNew':

                   this.setState({ReNewPwdIcon:false});

                   break;

               default:

                   this.setState({OriginPwdIcon:false});

           }

           if (type==='new'){

               this.setState({PwdStrongShow:false});

           }

       }

    }

    //检测密码的强度

    UserComm_PwdStrong(pwd){

        const containNumber = /[0-9]+/.test(pwd);

        const containLetters = /[a-zA-Z]+/.test(pwd);

        const containSymbol = /[`~\!@#$%\^&*\(\)_\+={}|\[\]:\";\'<>\?,.\/\\-]+/.test(pwd);

        //判断是否是强

        if (containLetters&&containNumber&&containSymbol){

            return 3

        }else if (

            (containLetters&&(!containSymbol)&&(!containNumber))||

            (containSymbol&&(!containLetters)&&(!containNumber))||

            (containNumber&&(!containLetters)&&(!containSymbol))

        ){//判断是否是弱类型

            return 1

        }else if (!containLetters&&!containNumber&&!containSymbol) {
            //是否是这样的类型
            return 0;

        }else{//是否是中等类型

            return 2;

        }

    }




    //提交密码
    commitPwd(e){

        const { dispatch } = this.props;

        dispatch(SafeSettingActions.commitPwd())

    }
    //设置密保问题
    addQuestion() {

        const {dispatch} = this.props;

        let {addQaShow} = this.props.SafeSetting;

        if (addQaShow){

            dispatch({type:SafeSettingActions.SAFE_SETTING_QUESTIONS_WRAPPER_HIDE});

            $(this.refs['add-qa-wrapper']).stop().slideUp();

            dispatch(SafeSettingActions.clearQuestions());

        }else{

            dispatch({type:SafeSettingActions.SAFE_SETTING_QUESTIONS_WRAPPER_SHOW});

            $(this.refs['add-qa-wrapper']).stop().slideDown();

            dispatch(SafeSettingActions.clearQuestions());

        }

    }

    //密保问题选项改变
    questionPickChange(e){

       const { dispatch } = this.props;

       dispatch({type:SafeSettingActions.SAFE_SETTING_QUESTIONS_PICK_CHANGE,data:e});

    }

    //密保输入改变
    questionInputChange(e,type){

        const { dispatch } = this.props;

        dispatch({type:SafeSettingActions.SAFE_SETTING_QUESTIONS_INPUT_CHANGE,data:{type:type,value:e.target.value}});

        dispatch({type:SafeSettingActions.SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:type}});

    }

    //密保密码blur事件

    QuestionPwdBlur(pwd){

        const { dispatch } = this.props;

        // const result = SafeSettingActions.UserComm_ValidatePwd(pwd);
        //
        // if (pwd){
        //
        //     if (result.isOK){
        //
        //         dispatch({type:SafeSettingActions.SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'pwd'}});
        //
        //     }else{
        //
        //         dispatch({type:SafeSettingActions.SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"密码应由8-20位字母、数字及特殊字符`~!@#$%^&*()_+-={}|[]:\";'<>?,./\\的任意两种及以上组成"}});
        //
        //     }
        //
        // }else{
        //
        //     dispatch({type:SafeSettingActions.SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'pwd'}});
        //
        // }

        if(!pwd){

            dispatch({type:SafeSettingActions.SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'pwd'}});

        }

    }

    //提交问题
    commitQuestion(){

        const { dispatch } = this.props;

        dispatch(SafeSettingActions.commitQuestion());

    }
    //删除密保问题弹窗
    delQuestionsModal(opts){

        const { type,value,id } = opts;

        const { dispatch } = this.props;

        if (type==='close'){

            dispatch({type:SafeSettingActions.SAFE_SETTING_DEL_QUESTIONS_MODAL_HIDE});

        }else{

            dispatch({type:SafeSettingActions.SAFE_SETTING_DEL_QUESTIONS_MODAL_SHOW,data:{value:value,id:id}});

        }

    }
    //删除弹窗输入改变
    delQaInputChange(e){

        const { dispatch } = this.props;

        dispatch({type:SafeSettingActions.SAFE_SETTING_DEL_QUESTIONS_INPUT_CHANGE,data:e.target.value});

        dispatch({type:SafeSettingActions.SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_HIDE});

    }

    //删除密保问题弹窗密码blur

    DelQaPwdBlur(pwd){

        const { dispatch } = this.props;

        const result = SafeSettingActions.UserComm_ValidatePwd(pwd);

        if (pwd){

            if (result.isOK){

                dispatch({type:SafeSettingActions.SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_HIDE});

            }else{

                dispatch({type:SafeSettingActions.SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_SHOW,data:"密码应由8-20位字母、数字及特殊字符`~!@#$%^&*()_+-={}|[]:\";'<>?,./\\的任意两种及以上组成"});

            }

        }else{

            dispatch({type:SafeSettingActions.SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_HIDE});

        }

    }

    //弹出弹窗提交
    commitDelQuestion(){

        const  { dispatch } = this.props;

        dispatch(SafeSettingActions.commitDelQuestion());

    }

    //编辑密保问题的弹窗
    editQuestionsModal(opts){

        const { type,value,id } = opts;

        const { dispatch } = this.props;

        if (type==='close'){

            dispatch({type:SafeSettingActions.SAFE_SETTING_EDIT_QUESTIONS_MODAL_HIDE});

        }else{

            dispatch({type:SafeSettingActions.SAFE_SETTING_EDIT_QUESTIONS_MODAL_SHOW,data:{value:value,id:id}});

        }

    }

    //编辑问题弹窗选项发生改变
    editQuestionsPicked(e){

        const { dispatch } = this.props;

        dispatch({type:SafeSettingActions.SAFE_SETTING_EDIT_QUESTIONS_PICK,data:e});

    }

    //提交密保弹窗

    commitEditQuestion(){

        const  { dispatch } = this.props;

        dispatch(SafeSettingActions.commitEditQuestion());

    }

    //编辑问题弹窗inpu变化
    editQaInputChange(e,type){

       const { dispatch } = this.props;

       dispatch({type:SafeSettingActions.SAFE_SETTING_EDIT_QUESTIONS_INPUT_CHANGE,data:{type:type,value:e.target.value}});

       dispatch({type:SafeSettingActions.SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE,data:{type:type}});

    }


    //编辑密保问题弹窗密码输入框blur

    EditQaPwdBlur(pwd){

        const { dispatch } = this.props;

        const result = SafeSettingActions.UserComm_ValidatePwd(pwd);

        if (pwd){

            if (result.isOK){

                dispatch({type:SafeSettingActions.SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE,data:{type:"pwd"}});

            }else{

                dispatch({type:SafeSettingActions.SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:"pwd",tips:"密码应由8-20位字母、数字及特殊字符`~!@#$%^&*()_+-={}|[]:\";'<>?,./\\的任意两种及以上组成"}});

            }

        }else{

            dispatch({type:SafeSettingActions.SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE,data:{type:"pwd"}});

        }

    }

    //邮箱输入变化
    emailInputChange(e,type){

        const { dispatch } = this.props;

        dispatch({type:SafeSettingActions.SAFE_SETTING_EMAIL_INPUT_CHANGE,data:{type:type,value:e.target.value}});

        dispatch({type:SafeSettingActions.SAFE_SETTING_EMAIL_TIPS_HIDE,data:{type:type}});

    }

    //密保邮箱邮箱输入blur校验

    EmailInputBlur(str,type){

        const { dispatch } = this.props;

        if (str){

            if (type==='new'){//输入的是邮箱还是密码

                const EmailResult = SafeSettingActions.UserComm_CheckEmail(str);

                if (EmailResult){

                    dispatch({type:SafeSettingActions.SAFE_SETTING_EMAIL_TIPS_HIDE,data:{type:type}});

                }else{

                    dispatch({type:SafeSettingActions.SAFE_SETTING_EMAIL_TIPS_SHOW,data:{type:type,value:"邮箱格式错误"}});

                }

            }else{

                const PwdResult = SafeSettingActions.UserComm_ValidatePwd(str);

                if (PwdResult.isOK){

                    dispatch({type:SafeSettingActions.SAFE_SETTING_EMAIL_TIPS_HIDE,data:{type:type}});

                }else{

                    dispatch({type:SafeSettingActions.SAFE_SETTING_EMAIL_TIPS_SHOW,data:{type:type,value:"密码应由8-20位字母、数字及特殊字符`~!@#$%^&*()_+-={}|[]:\";'<>?,./\\的任意两种及以上组成"}});

                }

            }

        }else{//如果是空的则把提示去掉

            dispatch({type:SafeSettingActions.SAFE_SETTING_EMAIL_TIPS_HIDE,data:{type:type}});

        }

    }

    //提交邮箱
    emailCommit(e){

        const { dispatch } = this.props;

        dispatch(SafeSettingActions.emailCommit());

    }

    //history的弹窗
    historyModal(){


        const { dispatch,SafeSetting } = this.props;

        const { show } = SafeSetting.loginHistory;
        
        if (show){

            dispatch({type:SafeSettingActions.SAFE_SETTING_LOGIN_HISTORY_HIDE});

        }else{

            dispatch({type:SafeSettingActions.SAFE_SETTING_LOGIN_HISTORY_SHOW});

        }


    }














    render() {

        const { SafeSetting } = this.props;

        const {

            initData,qaSetShow,emailSetShow,pwdSetShow,pwdErrorTips,questionsList,

            qaErrorTips,emailErrorTips,addQaShow,pwdValue,qaValue,qaSelectd,delQuestionsModal,

            editQuestionsModal,emailValue,loginHistory,loadingShow

        } = SafeSetting;

        const { HasSetPwd,HasSetEmail,HasSetQA,Email,Questions,LastTimeEditPwd,LastTimeLogin,LastTimeIP,Logs } = initData;


        const Columns = [

            {

                title:"登录时间",

                dataIndex:"LoginTime",

                key:"LoginTime",

                align:"center",

                render:(i,k)=>{

                    if (i === ''){

                        return <span className="login">--</span>;

                    }else{

                        return <span className="login">{i}</span>;

                    }

                },

                width:200

            },
            {

                title:"登出时间",

                dataIndex:"LogoutTime",

                key:"LogoutTime",

                align:"center",

                render:(i,k)=>{

                    if (i === ''){

                        return <span className="logout">--</span>;

                    }else{

                        return <span className="logout">{i}</span>;

                    }

                },

                width:200

            },
            {

                title:"IP",

                dataIndex:"IPAddress",

                key:"IPAddress",

                align:"center",

                render:(i,k)=>{

                    if (i === ''){

                        return <span className="ip">--</span>;

                    }else{

                        return <span className="ip">{i}</span>;

                    }

                },

                width:180

            },
            {

                title:"登录方式",

                dataIndex:"LoginTypeTxt",

                key:"LoginTypeTxt",

                align:"center",

                render:(i,k)=>{

                    if (i === ''){

                        return <span className="method">--</span>;

                    }else{

                        return <span className="method">{i}</span>;

                    }

                },

                width:180

            },
            {

                title:"登录设备",

                dataIndex:"MachineTypeTxt",

                key:"MachineTypeTxt",

                align:"center",

                render:(i,k)=>{

                    if (i === ''){

                        return <span className="device">--</span>;

                    }else{

                        return <span className="device">{i}</span>;

                    }

                },

            }

        ];

        const data = Logs&&Logs.map(item=>{


            return {


                key:item.LogID,

                LoginTime:item.LoginTime,

                LogoutTime:item.LogoutTime,

                IPAddress:item.IPAddress,

                LoginTypeTxt:item.LoginTypeTxt,

                MachineTypeTxt:item.MachineTypeTxt

            }


        });



        return (

            <Loading spinning={loadingShow}>

                <div className="safe-setting-wrapper">

                <div className="title-bar">

                    <div className="title-bar-name">账号安全</div>

                </div>

                <div className="safe-history-bar">

                    <span className="props">上次登录时间:</span>

                    <span className="login-time">{LastTimeLogin?LastTimeLogin:'--'}</span>

                    <span className="props">IP:</span>

                    <span className="login-ip">{LastTimeIP?LastTimeIP:'--'}</span>

                    {

                        LastTimeLogin?

                            <input type="button" className="more-log" value="更多记录>>" onClick={this.historyModal.bind(this)}/>

                            :''

                    }


                </div>

                <div className="safe-setting-content">

                    <div className={`safe-pwd-wrapper safe-item-wrapper ${HasSetPwd?'set':''}`}>

                        <div className={`safe-item-title clearfix ${pwdSetShow?'no-border':''}`}>

                            <div className="safe-title-name">登录密码</div>

                            <div className="safe-title-explains">

                                {HasSetPwd?<span>建议您定期更换密码，且设置一个包含数据和字母，并长度超过8位以上的密码。<br/>{LastTimeEditPwd?`上次修改时间：${LastTimeEditPwd}`:''}</span>:<span>密码为初始密码，请尽快修改。</span>}

                            </div>

                            <span className={`set-drop-btn ${pwdSetShow?'up':''}`} onClick={this.setSlide.bind(this,'pwd')}>设置</span>

                        </div>

                        <div className="safe-pwd-setting safe-item-setting" ref="pwd-content">

                            <table className="safe-setting-table">

                                <tbody>

                                    <tr>

                                        <td className="col1">原密码:</td>


                                        <td className="col2">

                                            <Tooltip placement="right" getPopupContainer={triggerNode => triggerNode.parentNode} visible={pwdErrorTips.origin} title={pwdErrorTips.originTips}>

                                                <Input type="password" value={pwdValue.originPwd} maxLength={20} onChange={e=>this.PwdChange(e,'origin')}
                                                       // onBlur={e=>this.PwdCheck(e,'origin')}
                                                />

                                            </Tooltip>

                                        </td>

                                        <td className="col3">

                                            {/*<span className="error-tips" style={{display:`${pwdErrorTips.origin?'block':'none'}`}}>{pwdErrorTips.originTips}</span>*/}

                                            {/* <i className="pwd-wright" style={this.state.OriginPwdIcon?{display:'inline-block'}:{}}></i> */}

                                        </td>

                                    </tr>

                                    <tr>

                                        <td className="col1">新密码:</td>

                                        <td className="col2">

                                            <Tooltip placement="right" getPopupContainer={triggerNode => triggerNode.parentNode} visible={pwdErrorTips.new} title={pwdErrorTips.newTips}>

                                                <Input type="password" value={pwdValue.newPwd} maxLength={20} onChange={e=>this.PwdChange(e,'new')} onBlur={e=>this.PwdCheck(e,'new')}/>

                                            </Tooltip>

                                        </td>

                                        <td className="col3">

                                            {/*<span className="error-tips" style={{display:`${pwdErrorTips.new?'block':'none'}`}}>{pwdErrorTips.newTips}</span>*/}

                                            <i className="pwd-wright" style={this.state.NewPwdIcon?{display:'inline-block'}:{}}></i>

                                        </td>

                                    </tr>

                                    {

                                        this.state.PwdStrongShow?

                                            <tr>

                                                <td className={"col1 pwd-strong"}></td>

                                                <td className={"col2"}>

                                                    <div className="pwd-strong-wrapper">

                                                        <span className="text">密码强度:</span>

                                                        <i className={`strong-type ${this.state.PwdStrongType}`}></i>

                                                        <span className={`strong-name ${this.state.PwdStrongType}`}>{this.state.PwdStrongType==='weak'?'弱':(this.state.PwdStrongType==='middle'?'中':'强')}</span>

                                                    </div>

                                                </td>

                                            </tr>

                                            :''

                                    }

                                    <tr>

                                        <td className="col1">确认密码:</td>

                                        <td className="col2">

                                            <Tooltip placement="right" getPopupContainer={triggerNode => triggerNode.parentNode} visible={pwdErrorTips.reNew} title={pwdErrorTips.reNewTips}>

                                                <Input type="password" value={pwdValue.reNewPwd} maxLength={20} onChange={e=>this.PwdChange(e,'reNew')} onBlur={e=>this.PwdCheck(e,'reNew')}/>

                                            </Tooltip>

                                        </td>

                                        <td className="col3">

                                            {/*<span className="error-tips" style={{display:`${pwdErrorTips.reNew?'block':'none'}`}}>{pwdErrorTips.reNewTips}</span>*/}

                                            <i className="pwd-wright" style={this.state.ReNewPwdIcon?{display:'inline-block'}:{}}></i>

                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                            <div className="btn-wrapper">

                                <input className="commit" onClick={this.commitPwd.bind(this)} type="button" value="确定"/>

                            </div>



                        </div>

                    </div>

                    <div className={`safe-questions-wrapper safe-item-wrapper ${HasSetQA?'set':''}`}>

                        <div className={`safe-item-title clearfix ${qaSetShow?'no-border':''}`}>

                            <div className={`safe-title-name`}>密保问题</div>

                            <div className="safe-title-explains">

                                是您找回密码的方式之一。建议您设置一个容易记住但不容易被他人获取的问题及答案，更有效保障您的密码安全。

                            </div>

                            <span className={`set-drop-btn ${qaSetShow?'up':''}`} onClick={this.setSlide.bind(this,'qa')}>设置</span>

                        </div>

                        <div className="safe-pwd-setting safe-item-setting" ref="qa-content">

                            {

                                    Questions&&Questions.map((item,key) => {

                                        return <div key={key} className="seted-questions-wrapper">

                                                    <span className="qa-no">问题{key+1}:</span>

                                                    <span className="question">{item.Question}</span>

                                                    <span className="question-btn-wrapper">

                                                        <input type="button" className="edit-question" value="编辑" onClick={this.editQuestionsModal.bind(this,{type:'show',id:item.ID,value:item.Question})}/>

                                                        <input type="button" className="del-question" value="删除" onClick={this.delQuestionsModal.bind(this,{type:'show',id:item.ID,value:item.Question})}/>

                                                    </span>

                                                </div>

                                    })

                            }

                            <div className="add-question-wrapper">

                                {/*<input type="button" className="add-questions" value="+&nbsp;添加密保问题" onClick={this.addQuestion.bind(this)}/>*/}

                                <span className={`add-question-drop ${addQaShow?'up':''}`} onClick={this.addQuestion.bind(this)}>添加密保问题</span>


                                {

                                    Questions&&(3-Questions.length>0)?

                                        <span className="can-set-tips">(您还可以设置{Questions?3-Questions.length:3}个)</span>

                                        :

                                        <span className="can-set-tips">请删除一个问题再进行添加！</span>

                                }

                            </div>

                            {

                                Questions && (3 - Questions.length > 0) ?

                                    <div className="safe-qa-setting-content" ref="add-qa-wrapper">

                                        <table className="safe-setting-table safe-qa-table">

                                            <tbody>

                                            <tr>

                                                <td className="col1">新密保问题:</td>

                                                <td className="col2">

                                                    <DropDown width={240} height={999999}
                                                              dropSelectd={qaSelectd}
                                                              dropList={questionsList}
                                                              style={{zIndex: 8}}
                                                              onChange={this.questionPickChange.bind(this)}>

                                                    </DropDown>

                                                </td>

                                                <td className="col3"></td>

                                            </tr>

                                            {
                                                qaSelectd && qaSelectd.value === 'self' ?

                                                    <tr>

                                                        <td className="col1">自定义问题:</td>

                                                        <td className="col2">

                                                            <Tooltip placement="right" getPopupContainer={triggerNode => triggerNode.parentNode} visible={qaErrorTips.self} title={qaErrorTips.selfTips}>

                                                                <Input maxLength={30} value={qaValue.selfQa} onChange={e => {this.questionInputChange(e, 'self')}} />

                                                            </Tooltip>

                                                        </td>

                                                        {/*<td className="col3"><span className="error-tips"*/}
                                                                                   {/*style={{display: `${qaErrorTips.self ? 'block' : 'none'}`}}>{qaErrorTips.selfTips}</span>*/}
                                                        {/*</td>*/}

                                                    </tr>

                                                    : <React.Fragment></React.Fragment>
                                            }

                                            <tr>

                                                <td className="col1">密保答案:</td>

                                                <td className="col2">

                                                    <Tooltip placement="right" getPopupContainer={triggerNode => triggerNode.parentNode} visible={qaErrorTips.answer} title={qaErrorTips.answerTips}>

                                                        <Input value={qaValue.answer} onChange={e => this.questionInputChange(e, 'answer')} maxLength={30}/>

                                                    </Tooltip>

                                                </td>

                                                <td className="col3">

                                                    {/*<span className="error-tips"*/}
                                                                           {/*style={{display: `${qaErrorTips.answer ? 'block' : 'none'}`}}>{qaErrorTips.answerTips}</span>*/}

                                                </td>

                                            </tr>

                                            <tr>

                                                <td className="col1">登录密码:</td>

                                                <td className="col2">

                                                    <Tooltip placement="right" getPopupContainer={triggerNode => triggerNode.parentNode} visible={qaErrorTips.pwd} title={qaErrorTips.pwdTips}>

                                                        <Input type="password" value={qaValue.pwd} onChange={e => this.questionInputChange(e, 'pwd')} maxLength={20}
                                                               // onBlur={e=>this.QuestionPwdBlur(e.target.value)}
                                                        />

                                                    </Tooltip>

                                                </td>

                                                <td className="col3">

                                                    {/*<span className="error-tips"*/}
                                                                           {/*style={{display: `${qaErrorTips.pwd ? 'block' : 'none'}`}}>{qaErrorTips.pwdTips}</span>*/}

                                                </td>

                                            </tr>

                                            </tbody>

                                        </table>

                                        <div className="btn-wrapper">

                                            <input className="commit" type="button" value="确定"
                                                   onClick={this.commitQuestion.bind(this)}/>

                                            <input type="button" className="cancel" value="取消"
                                                   onClick={this.addQuestion.bind(this)}/>

                                        </div>

                                    </div>

                                    :''

                            }

                        </div>

                    </div>

                    <div className={`safe-email-wrapper safe-item-wrapper ${HasSetEmail?'set':''}`}>

                        <div className={`safe-item-title clearfix ${emailSetShow?'no-border':''}`}>

                            <div className={`safe-title-name`}>密保邮箱</div>

                            <div className="safe-title-explains">

                                是您找回密码的方式之一。建议您设置一个记住且不容易被他人获取的密保邮箱，更有效保障您的密码安全。

                            </div>

                            <span className={`set-drop-btn ${emailSetShow?'up':''}`} onClick={this.setSlide.bind(this,'email')}>设置</span>

                        </div>

                        <div className="safe-pwd-setting safe-item-setting" ref="email-content">

                            <table className="safe-setting-table">

                                <tbody>

                                {
                                    HasSetEmail&&HasSetEmail?

                                        <tr>

                                            <td className="col1">原邮箱:</td>

                                            <td className="col2"><span className="origin-email">{Email}</span></td>

                                            <td className="col3"></td>

                                        </tr>

                                        :

                                        <React.Fragment></React.Fragment>

                                }

                                <tr>

                                    <td className="col1">新邮箱:</td>

                                    <td className="col2">

                                        <Tooltip placement="right" getPopupContainer={triggerNode => triggerNode.parentNode} visible={emailErrorTips.newEmail} title={emailErrorTips.newEmailTips}>

                                            <Input value={emailValue.newEmail} onChange={e=>this.emailInputChange(e,'new')} maxLength={20} onBlur={e=>this.EmailInputBlur(e.target.value,"new")}/>

                                        </Tooltip>

                                    </td>

                                    {/*<td className="col3"><span className="error-tips" style={{display:`${emailErrorTips.newEmail?'block':'none'}`}}>{emailErrorTips.newEmailTips}</span></td>*/}

                                </tr>

                                <tr>

                                    <td className="col1">登录密码:</td>

                                    <td className="col2">

                                        <Tooltip placement="right" getPopupContainer={triggerNode => triggerNode.parentNode} visible={emailErrorTips.pwd} title={emailErrorTips.pwdTips}>

                                            <Input type="password" value={emailValue.pwd} onChange={e=>this.emailInputChange(e,'pwd')} maxLength={20}
                                                   // onBlur={e=>this.EmailInputBlur(e.target.value,"pwd")}
                                            />

                                        </Tooltip>

                                    </td>


                                </tr>


                                </tbody>

                            </table>

                            <div className="btn-wrapper">

                                <input className="commit" onClick={this.emailCommit.bind(this)} type="button" value="确定"/>

                            </div>

                        </div>

                    </div>

                </div>

                <Modal
                    className="del-question-modal"
                    title="删除密保问题"
                    type={1}
                    visible={delQuestionsModal.show}
                    width={560}
                    bodyStyle={{height:156}}
                    mask={true}
                    onCancel={this.delQuestionsModal.bind(this,{type:'close'})}
                    onOk={this.commitDelQuestion.bind(this)}>

                    <div className="ModalContent">

                        <div className="del-question-wrapper clearfix">

                            <span className="props">密保问题:</span>

                            <span className="question-content">{delQuestionsModal.question.value}</span>

                        </div>

                        <div className="del-answer-wrapper clearfix">

                            <span className="props">密码:</span>


                            <Tooltip placement="bottom" getPopupContainer={triggerNode => triggerNode.parentNode} visible={delQuestionsModal.pwdTipsShow} title={delQuestionsModal.pwdTips}>

                                <Input type="password" className="answer-content" maxLength={20} value={delQuestionsModal.pwd} onChange={this.delQaInputChange.bind(this)}
                                       // onBlur={e=>this.DelQaPwdBlur(e.target.value)}
                                />

                            </Tooltip>

                            {/*<div className="error-tips" style={{display:`${delQuestionsModal.pwdTipsShow?'block':'none'}`}}>*/}

                                {/*{delQuestionsModal.pwdTips}*/}

                            {/*</div>*/}

                        </div>

                    </div>

                </Modal>

                <Modal
                    className="edit-question-modal"
                    title="编辑密保问题"
                    type={1}
                    visible={editQuestionsModal.show}
                    width={560}
                    bodyStyle={{height:240}}
                    mask={true}
                    onCancel={this.editQuestionsModal.bind(this,{type:'close'})}
                    onOk={this.commitEditQuestion.bind(this)}>

                    <div className="ModalContent">

                        <div className="edit-origin-question-wrapper clearfix">

                            <span className="props">原密保问题:</span>

                            <span className="question-content">{editQuestionsModal.originQuestion.value}</span>

                        </div>

                        {/*<div className="new-question-pick clearfix">

                            <span className="props">新密保问题:</span>

                            <DropDown
                                dropSelectd={editQuestionsModal.newQuestionDropSelectd}
                                dropList={questionsList}
                                width={320}
                                style={{zIndex:8,marginLeft:-8}}
                                height={200}
                                onChange={this.editQuestionsPicked.bind(this)}>

                            </DropDown>

                        </div>

                        {

                            editQuestionsModal.newQuestionDropSelectd.value==='self'?

                                <div className="new-self-question clearfix">

                                    <span className="props">自定义问题:</span>

                                    <Tooltip placement="right" getPopupContainer={triggerNode => triggerNode.parentNode} visible={editQuestionsModal.selfQaTipsShow} title={editQuestionsModal.selfQaTips}>

                                        <Input  maxLength={30} value={editQuestionsModal.selfQa} onChange={(e)=>this.editQaInputChange(e,'self')}/>

                                    </Tooltip>


                                    <div className="error-tips" style={{display:`${editQuestionsModal.selfQaTipsShow?'block':'none'}`}}>

                                        {editQuestionsModal.selfQaTips}

                                    </div>

                                </div>:''

                        }*/}

                        <div className="edit-new-answer clearfix">

                            <span className="props">新密保答案:</span>

                            <Tooltip placement="right" getPopupContainer={triggerNode => triggerNode.parentNode} visible={editQuestionsModal.newAnswerTipsShow} title={editQuestionsModal.newAnswerTips}>

                                <Input  className="answer-content" maxLength={30} value={editQuestionsModal.newAnswer} onChange={(e)=>this.editQaInputChange(e,'answer')}/>

                            </Tooltip>

                            {/*<div className="error-tips" style={{display:`${editQuestionsModal.newAnswerTipsShow?'block':'none'}`}}>*/}

                                {/*{editQuestionsModal.newAnswerTips}*/}

                            {/*</div>*/}

                        </div>

                        <div className="edit-pwd clearfix">

                            <span className="props">密码:</span>

                            <Tooltip placement="right" getPopupContainer={triggerNode => triggerNode.parentNode} visible={editQuestionsModal.pwdTipsShow} title={editQuestionsModal.pwdTips} autoAdjustOverflow={false}>

                                <Input type="password"  maxLength={20} value={editQuestionsModal.pwd} onChange={(e)=>this.editQaInputChange(e,'pwd')}
                                       // onBlur={e=>this.EditQaPwdBlur(e.target.value)}
                                />

                            </Tooltip>

                            {/*<div className="error-tips" style={{display:`${editQuestionsModal.pwdTipsShow?'block':'none'}`}}>*/}

                                {/*{editQuestionsModal.pwdTips}*/}

                            {/*</div>*/}

                        </div>

                    </div>

                </Modal>

                <Modal
                    className="login-history-modal"
                    title="登录历史详情（最近10次）"
                    type={1}
                    visible={loginHistory.show}
                    width={936}
                    bodyStyle={{height:466}}
                    mask={true}
                    footer={null}
                    onCancel={this.historyModal.bind(this)}>

                    <div className="ModalContent">

                        <Table dataSource={data} pagination={false} rowKey={(r,i)=>r.key} columns={Columns}></Table>

                    </div>

                </Modal>

            </div>

            </Loading>

        );

    }

}

const mapStateToProps = (state) => {

    const { SafeSetting } = state;

    return {

        SafeSetting

    }

};

export default connect(mapStateToProps)(SafeSetting);