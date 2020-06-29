import React,{Component} from 'react'

import { connect } from 'react-redux';

import { Input } from 'antd'

import $ from 'jquery';

import {DropDown, Tips } from '../../../../common'

import SIMActions from '../../actions/Teacher/StudentInfoModalActions';

import '../../../../common/js/PicUpload/Cropper/cropper.css';

import '../../../../common/js/PicUpload/photoUpload.scss';

import '../../../../common/js/PicUpload/Cropper/cropper';

window.$ = $;

window.jQuery = $;

require('../../../../common/js/PicUpload/juqery.cp.picUploader');


class StudentInfoModal extends Component {

    constructor(props) {

        super(props);

        const { dispatch } = props;

        dispatch(SIMActions.ModalInit());

    }

    componentDidMount() {

        const {dispatch,StudentInfoModal} = this.props;

        const { SexDrop,PhotoPath,EditorStudentID } = StudentInfoModal;

        // 图片上传

        //$(document).on('click', '#up_btn_del',this.DelPhoto.bind(this));


    }


    /*DelPhoto(e){

        const {dispatch,StudentInfoModal} = this.props;

        const { SexDrop,EditorStudentID,PhotoPath } = StudentInfoModal;

        if (EditorStudentID){

            //$("#picUpload").picUploader.setGender();

        }else{

            $("#picUpload").picUploader.setGender(SexDrop.title);

        }

    }*/

   /* componentWillReceiveProps(nextProps) {
        const { DataState } = nextProps
        if (DataState.GetPicUrl.picUrl && DataState.GetPicUrl.picUrl !== this.state.option.resWebUrl) {
            let option = this.state.option;
            option.resWebUrl = DataState.GetPicUrl.picUrl;
            this.setState({
                option: option
            })
            $("#picUpload").picUploader(option);//初始化
            dispatch(actions.UpDataState.getPicObject($("#picUpload")))

        }
    }*/
    //id修改

    onEditIDChange(e){

        const { dispatch } = this.props;

        dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_USER_ID_CHANGE,data:e.target.value});

    }

    // idBlur
    onEditBlur(e){

        const { dispatch,StudentInfoModal } = this.props;

        const { UserIDValue } = StudentInfoModal;

        let Test = false;

        if (UserIDValue===''){

            Test = true;

        }else{

            Test = /^([a-zA-Z0-9]{1,24})$/.test(UserIDValue)

        }

        if (!Test) {

            dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_SHOW,data:{type:'ID'}});

        } else {

            dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_HIDE,data:{type:'ID'}});

        }
    }


    onEditNameChange(e){

        const { dispatch } = this.props;

        dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_USER_NAME_CHANGE,data:e.target.value});


    }

    onEditNameBlur(e){

        const { dispatch,StudentInfoModal } = this.props;

        const { UserNameValue } = StudentInfoModal;
        //用户姓名检测
        //用户姓名由1-20位的汉字、字母、数字、下划线组成。

        let Test = false;

        if (UserNameValue===''){

            Test = true;

        }else{

            Test = /^[a-zA-Z0-9_\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_\u4e00-\u9fa5]$|^[a-zA-Z0-9_\u4e00-\u9fa5]{1,50}$/.test(UserNameValue);

        }

        if (!Test) {

            dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_SHOW,data:{type:'Name'}});

        } else {

            dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_HIDE,data:{type:'Name'}});

        }

    }

    //性别
    onEditGendeChange = (e) => {

        const { dispatch,StudentInfoModal } = this.props;

        $("#picUpload").picUploader.setGender(e.title);

        dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_SEX_CHANGE,data:e});

    }
    //年级

    //班级
    onEditClassChange = (e) => {

        const { dispatch } = this.props;

        dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_CLASS_CHANGE,data:e});

    }


    //身份证
    onEditIDCardChange = (e) => {

        const { dispatch } = this.props;

        dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_ID_CARD_CHANGE,data:e.target.value});

    }
    // 身份证Blur
    onEditIDCardBlur = (e) => {

        const { dispatch,StudentInfoModal } = this.props;

        const { IDCardValue } = StudentInfoModal;

        let Test = false;

        if (IDCardValue===''){

            Test = true;

        }else{

            Test = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(IDCardValue);

        }

        if (!Test) {

            // dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_SHOW,data:{type:'IDCard'}});

            dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_SHOW,data:{type:'IDCard',title:"身份证格式错误"}});


        } else {

            dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_HIDE,data:{type:'IDCard'}});

        }
    }
    //电话号码
    onEditPhoneChange = (e) => {

        const { dispatch } = this.props;

        dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_PHONE_CHANGE,data:e.target.value});

    }

    //电话号码Blur
    onEditPhoneBlur = (e) => {

        const { dispatch,StudentInfoModal } = this.props;

        const { PhoneValue } = StudentInfoModal;

        let Test = false;

        if (PhoneValue===''){

            Test = true;

        }else{

            Test = /^[0-9]{11}$/.test(PhoneValue);

        }

        if (!Test) {

            // dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_SHOW,data:{type:'Phone'}});

            dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_SHOW,data:{type:'Phone',title:"电话应由数字及-/组成"}});


        } else {

            dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_HIDE,data:{type:'Phone'}});

        }


    }
    onEditMailChange = (e) => {

        const { dispatch } = this.props;

        dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_MAIL_CHANGE,data:e.target.value});


    }
    onEditMailBlur = (e) => {

      const { dispatch,StudentInfoModal } = this.props;

        const { MailValue } = StudentInfoModal;

        let Test = false;

        if (MailValue===''){

            Test = true;

        }else{

            if (!/^(\S)+@(\S)+\.[a-zA-Z]{2,3}$/.test(MailValue)) {

                Test = false;

            }
            else {
                Test = /^([a-zA-Z0-9]+[_|\-|\.]*)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]*)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/gi.test(MailValue);
            }

        }

        if (!Test) {

            // dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_SHOW,data:{type:'Mail'}});

            dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_SHOW,data:{type:'Mail',title:"邮箱格式错误"}});


        } else {

            dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_HIDE,data:{type:'Mail'}});

        }

    }
    onEditAddressChange = (e) => {

        const { dispatch } = this.props;

        dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_ADDRESS_CHANGE,data:e.target.value});


    }

    onEditAddressBlur = (e) => {
        const { dispatch,StudentInfoModal } = this.props;

        const { AddressValue } = StudentInfoModal;

        let Test = false;

        if (AddressValue===''){

            Test = true;

        }else{

            Test = /^[A-Za-z0-9_()\u4e00-\u9fa5]{0,100}$/.test(AddressValue);

        }

        if (!Test) {

            // dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_SHOW,data:{type:'Address'}});

            dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_SHOW,data:{type:'Address',title:"家庭住址格式错误"}});


        } else {

            dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_HIDE,data:{type:'Address'}});

        }


    }




    render() {

        const { StudentInfoModal } = this.props;

        const {

            EditorStudentID,UserIDTipsTitle,UserIDTipsVisible,UserIDValue,

            UserNameTipsVisible,UserNameTipsTitle,UserNameValue,TelephoneTipsVisible,

            TelephoneTipsTitle, EmailTipsVisible, EmailTipsTitle, IDCardNoTipsVisible,

            IDCardNoTipsTitle, HomeAdressTipsVisible, HomeAdressTipsTitle, GenderTipsVisible,

            GenderTipsTitle,ClassTipsVisible,ClassTipsTitle,IDCardValue,PhoneValue,

            MailValue,AddressValue,ClassDrop,Classes,ClassDropShow,SexDrop,

            ClassName

        } = StudentInfoModal;



        return (

            <div className='EditModal'>

                <div className='Left' id='picUpload'></div>

                <div className='Right'>

                    <div className="row clearfix" >

                        <span className='culonm-1'>

                            <span className='must-icon'>*</span>
                             学号：

                        </span>

                        <div className='culonm-2'>

                            {

                                EditorStudentID?

                                    <span className='UserID-text'>{EditorStudentID}</span>

                                    :

                                    <Tips autoAdjustOverflow={false} getPopupContainer={trigger =>trigger.parentNode} overlayClassName='tips' visible={UserIDTipsVisible} title={UserIDTipsTitle}>

                                        <Input maxLength={24}   className='UserName-input'
                                               type='text'
                                               name='EditID'
                                               value={UserIDValue}
                                               onChange={this.onEditIDChange.bind(this)}
                                               onBlur={this.onEditBlur.bind(this)} />
                                    </Tips>


                            }


                        </div>
                    </div>
                    <div className="row clearfix">

                        <span className='culonm-1'>

                            <span className='must-icon'>*</span>姓名：

                        </span>

                        <div className='culonm-2'>

                            <Tips  autoAdjustOverflow={false} getPopupContainer={trigger =>trigger.parentNode} overlayClassName='tips' visible={UserNameTipsVisible} title={UserNameTipsTitle} >

                                <Input className='UserName-input'
                                       maxLength={20}
                                       type='text'
                                       name='EditName'
                                       value={UserNameValue}
                                       onChange={this.onEditNameChange.bind(this)}
                                       onBlur={this.onEditNameBlur.bind(this)} />
                            </Tips>

                        </div>

                    </div>

                    <div className="row clearfix">

                        <span className='culonm-1'>

                            <span className='must-icon'>*</span>性别：

                        </span>

                        <div className='culonm-2'>

                            <Tips autoAdjustOverflow={false} getPopupContainer={trigger =>trigger.parentNode} overlayClassName='tips' visible={GenderTipsVisible} title={GenderTipsTitle} >

                                <DropDown
                                    style={{ zIndex: 3 }}
                                    dropSelectd={SexDrop}
                                    dropList={[
                                        {
                                            value: 1,
                                            title: '男'
                                        },
                                        {
                                            value: 2,
                                            title: '女'
                                        }, {
                                            value: 3,
                                            title: '保密'
                                        }
                                    ]}
                                    width={120}
                                    height={96}
                                    onChange={this.onEditGendeChange}
                                >

                                </DropDown>

                            </Tips>

                        </div>

                    </div>

                    <div className="row clearfix">

                        <span className='culonm-1'>

                            <span className='must-icon'>*</span>班级：

                        </span>

                        <div className='culonm-2'>

                            {

                                ClassDropShow?

                                    <Tips autoAdjustOverflow={false} getPopupContainer={trigger =>trigger.parentNode} overlayClassName='tips' visible={ClassTipsVisible} title={ClassTipsTitle} >

                                        <DropDown
                                            style={{ zIndex: 1 }}
                                            dropSelectd={ClassDrop}
                                            dropList={Classes}
                                            width={200}
                                            height={96}
                                            onChange={this.onEditClassChange}
                                        >
                                        </DropDown>
                                    </Tips>

                                    :<span className="class-name">{ClassName}</span>

                            }

                        </div>
                    </div>

                    <div className="row clearfix">
                        <span className='culonm-1'>
                            身份证号码：
                        </span>
                        <div className='culonm-2'>
                            <Tips autoAdjustOverflow={false} getPopupContainer={trigger =>trigger.parentNode} overlayClassName='tips' visible={IDCardNoTipsVisible} title={IDCardNoTipsTitle} >
                                <Input
                                    className='input'
                                    value={IDCardValue}
                                    type='text'
                                    maxLength={18}
                                    name='EditIDCard'
                                    onChange={this.onEditIDCardChange}
                                    onBlur={this.onEditIDCardBlur}
                                ></Input>
                            </Tips>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <span className='culonm-1'>
                            联系电话：
                        </span>
                        <div className='culonm-2'>
                            <Tips autoAdjustOverflow={false} getPopupContainer={trigger =>trigger.parentNode} overlayClassName='tips' visible={TelephoneTipsVisible} title={TelephoneTipsTitle} >
                                <Input
                                    className='input'
                                    maxLength={11}
                                    value={PhoneValue}
                                    type='text'
                                    name='EditPhone'
                                    onChange={this.onEditPhoneChange}
                                    onBlur={this.onEditPhoneBlur}
                                ></Input>
                            </Tips>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <span className='culonm-1'>
                            电子邮箱：
                        </span>
                        <div className='culonm-2'>
                            <Tips autoAdjustOverflow={false} getPopupContainer={trigger =>trigger.parentNode} overlayClassName='tips' visible={EmailTipsVisible} title={EmailTipsTitle} >
                                <Input
                                    className='input'
                                    type='text'
                                    name='EditMail'
                                    value={MailValue}
                                    onChange={this.onEditMailChange}
                                    onBlur={this.onEditMailBlur}
                                ></Input>
                            </Tips>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <span className='culonm-1'>
                            家庭住址：
                        </span>
                        <div className='culonm-2'>

                            <Tips autoAdjustOverflow={false} getPopupContainer={trigger =>trigger.parentNode} overlayClassName='tips' visible={HomeAdressTipsVisible} title={HomeAdressTipsTitle} >

                                <Input.TextArea
                                    className='inputarea'
                                    rows='2'
                                    cols='30'
                                    name='EditAddress'
                                    value={AddressValue}
                                    onChange={this.onEditAddressChange}
                                    onBlur={this.onEditAddressBlur}
                                >

                                </Input.TextArea>
                            </Tips>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}



const mapStateToProps = (state) => {

    let { Teacher } = state;

    const { StudentInfoModal } = Teacher;

    return {StudentInfoModal}

};


export default connect(mapStateToProps)(StudentInfoModal);