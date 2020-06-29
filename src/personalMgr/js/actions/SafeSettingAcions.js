import AppAlertActions from './AppAlertActions';

import {LogOut} from '../../../common/js/disconnect';

import Method from './Method';

import md5 from 'md5';

import CONFIG from "../../../common/js/config";


const SAFE_SETTING_INIT_DATA_UPDATE = 'SAFE_SETTING_INIT_DATA_UPDATE';

const SAFE_SETTING_CONTENT_SLIDE_UP = 'SAFE_SETTING_CONTENT_SLIDE_UP';

const SAFE_SETTING_CONTENT_SLIDE_DOWN = 'SAFE_SETTING_CONTENT_SLIDE_DOWN';

const SAFE_SETTING_PWD_VALUE_CHANGE = 'SAFE_SETTING_PWD_VALUE_CHANGE';

const SAFE_SETTING_PWD_TIPS_SHOW = 'SAFE_SETTING_PWD_TIPS_SHOW';

const SAFE_SETTING_PWD_TIPS_HIDE = 'SAFE_SETTING_PWD_TIPS_HIDE';

const SAFE_SETTING_QUESTIONS_WRAPPER_SHOW = 'SAFE_SETTING_QUESTIONS_WRAPPER_SHOW';

const SAFE_SETTING_QUESTIONS_WRAPPER_HIDE = 'SAFE_SETTING_QUESTIONS_WRAPPER_HIDE';

const SAFE_SETTING_QUESTIONS_LIST_UPDATE = 'SAFE_SETTING_QUESTIONS_LIST_UPDATE';

const SAFE_SETTING_QUESTIONS_PICK_CHANGE = 'SAFE_SETTING_QUESTIONS_PICK_CHANGE';

const SAFE_SETTING_QUESTIONS_INPUT_CHANGE = 'SAFE_SETTING_QUESTIONS_INPUT_CHANGE';

const SAFE_SETTING_QUESTIONS_TIPS_SHOW = 'SAFE_SETTING_QUESTIONS_TIPS_SHOW';

const SAFE_SETTING_QUESTIONS_TIPS_HIDE = 'SAFE_SETTING_QUESTIONS_TIPS_HIDE';

const SAFE_SETTING_DEL_QUESTIONS_MODAL_SHOW = 'SAFE_SETTING_DEL_QUESTIONS_MODAL_SHOW';

const SAFE_SETTING_DEL_QUESTIONS_MODAL_HIDE = 'SAFE_SETTING_DEL_QUESTIONS_MODAL_HIDE';

const SAFE_SETTING_DEL_QUESTIONS_INPUT_CHANGE = 'SAFE_SETTING_DEL_QUESTIONS_INPUT_CHANGE';

const SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_SHOW = 'SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_SHOW';

const SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_HIDE = 'SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_HIDE';




const SAFE_SETTING_EDIT_QUESTIONS_MODAL_SHOW = 'SAFE_SETTING_EDIT_QUESTIONS_MODAL_SHOW';

const SAFE_SETTING_EDIT_QUESTIONS_MODAL_HIDE = 'SAFE_SETTING_EDIT_QUESTIONS_MODAL_HIDE';

const SAFE_SETTING_EDIT_QUESTIONS_PICK = 'SAFE_SETTING_EDIT_QUESTIONS_PICK';

const SAFE_SETTING_EDIT_QUESTIONS_INPUT_CHANGE = 'SAFE_SETTING_EDIT_QUESTIONS_INPUT_CHANGE';

const SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW = 'SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW';

const SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE = 'SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE';



const SAFE_SETTING_EMAIL_INPUT_CHANGE = 'SAFE_SETTING_EMAIL_INPUT_CHANGE';

const SAFE_SETTING_EMAIL_TIPS_SHOW = 'SAFE_SETTING_EMAIL_TIPS_SHOW';

const SAFE_SETTING_EMAIL_TIPS_HIDE = 'SAFE_SETTING_EMAIL_TIPS_HIDE';



const SAFE_SETTING_LOGIN_HISTORY_SHOW = 'SAFE_SETTING_LOGIN_HISTORY_SHOW';

const SAFE_SETTING_LOGIN_HISTORY_HIDE = 'SAFE_SETTING_LOGIN_HISTORY_HIDE';


const SAFE_SETTING_LOADING_SHOW = 'SAFE_SETTING_LOADING_SHOW';

const SAFE_SETTING_LOADING_HIDE = 'SAFE_SETTING_LOADING_HIDE';

const SAFE_SETTING_ERROR_TIPS_INIT = 'SAFE_SETTING_ERROR_TIPS_INIT';



//初始化界面
const Init = () => {

    return ( dispatch,getState ) => {

        dispatch({type:SAFE_SETTING_LOADING_SHOW});

        dispatch({type:SAFE_SETTING_CONTENT_SLIDE_UP});

        dispatch({type:SAFE_SETTING_QUESTIONS_WRAPPER_HIDE});

        dispatch({type:SAFE_SETTING_ERROR_TIPS_INIT});

        dispatch({type:SAFE_SETTING_EMAIL_INPUT_CHANGE,data:{}});

        let { UserID } = getState().LoginUser;

        let SecurityInfo =  GetSecurityInfo({UserID,dispatch});

        let SystemSecQA = GetSystemSecQA({UserID,dispatch});

        /*GetSystemSecQA({UserID,dispatch}).then(data => {

            if (data){

                let questionsList = [{value:"self",title:"自定义密保问题"}];

                let arr = data.map((item,key)=>{

                    return {

                        value:key,

                        title:item

                    }

                });

                questionsList.push(...arr);

                dispatch({type:SAFE_SETTING_QUESTIONS_LIST_UPDATE,data:questionsList});

            }

        })


        GetSecurityInfo({UserID,dispatch}).then(data => {

            if (data){

                dispatch({type:SAFE_SETTING_INIT_DATA_UPDATE,data:data});

                dispatch({type:SAFE_SETTING_LOADING_HIDE});

            }

        });*/

        Promise.all([SecurityInfo,SystemSecQA]).then(res=>{

           if (res[1]){

               let questionsList = [{value:"self",title:"自定义密保问题"}];

               let arr = res[1].map((item,key)=>{

                   return {

                       value:key,

                       title:item

                   }

               });

               questionsList.push(...arr);

               dispatch({type:SAFE_SETTING_QUESTIONS_LIST_UPDATE,data:questionsList});

           }

            if (res[0]){

                dispatch({type:SAFE_SETTING_INIT_DATA_UPDATE,data:res[0]});

                dispatch({type:SAFE_SETTING_LOADING_HIDE});

            }

        });

    }

};

//界面更新
const PageUpdate = () => {

    return ( dispatch,getState ) => {

        dispatch({type:SAFE_SETTING_LOADING_SHOW});

        dispatch({type:SAFE_SETTING_QUESTIONS_WRAPPER_HIDE});

        dispatch({type:SAFE_SETTING_ERROR_TIPS_INIT});

        dispatch({type:SAFE_SETTING_EMAIL_INPUT_CHANGE,data:{}});

        let { UserID } = getState().LoginUser;

        let SecurityInfo =  GetSecurityInfo({UserID,dispatch});

        let SystemSecQA = GetSystemSecQA({UserID,dispatch});

        /*GetSystemSecQA({UserID,dispatch}).then(data => {

            if (data){

                let questionsList = [{value:"self",title:"自定义密保问题"}];

                let arr = data.map((item,key)=>{

                    return {

                        value:key,

                        title:item

                    }

                });

                questionsList.push(...arr);

                dispatch({type:SAFE_SETTING_QUESTIONS_LIST_UPDATE,data:questionsList});

            }

        })


        GetSecurityInfo({UserID,dispatch}).then(data => {

            if (data){

                dispatch({type:SAFE_SETTING_INIT_DATA_UPDATE,data:data});

                dispatch({type:SAFE_SETTING_LOADING_HIDE});

            }

        });*/

        Promise.all([SecurityInfo,SystemSecQA]).then(res=>{

            if (res[1]){

                let questionsList = [{value:"self",title:"自定义密保问题"}];

                let arr = res[1].map((item,key)=>{

                    return {

                        value:key,

                        title:item

                    }

                });

                questionsList.push(...arr);

                dispatch({type:SAFE_SETTING_QUESTIONS_LIST_UPDATE,data:questionsList});

            }

            if (res[0]){

                dispatch({type:SAFE_SETTING_INIT_DATA_UPDATE,data:res[0]});

                dispatch({type:SAFE_SETTING_LOADING_HIDE});

            }

        });

    }

};


//提交密码修改
const commitPwd = () => {

  return (dispatch,getState) => {

      let { originPwd,newPwd,reNewPwd } = getState().SafeSetting.pwdValue;

      let originResult,newResult,reNewResult;

      let oldRes = false;

      let newRes = false;

      let reNewRes = false;

      let ONSame = false;

      let NRSame = false;

       //判断旧密码
      if (originPwd===''){

          dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'origin',tips:"请输入原密码"}});

      }else{

          // originResult = UserComm_ValidatePwd(originPwd);
          //
          // if (!originResult.isOK){
          //
          //     dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'origin',tips:"密码应由8-20位字母、数字及特殊字符`~!@#$%^&*()_+-={}|[]:\";'<>?,./\\的任意两种及以上组成"}});
          //
          // }else{
          //
          //     dispatch({type:SAFE_SETTING_PWD_TIPS_HIDE,data:{type:'origin'}});
          //
          //     oldRes = true;
          //
          // }

          dispatch({type:SAFE_SETTING_PWD_TIPS_HIDE,data:{type:'origin'}});

          oldRes = true;

      }
      //判断新密码
      if (newPwd === ''){

          dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'new',tips:"请输入新密码"}});

      }else{

          newResult = UserComm_ValidatePwd(newPwd);
          
          if (!newResult.isOK){

              dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'new',tips:"密码应由8-20位字母、数字及特殊字符`~!@#$%^&*()_+-={}|[]:\";'<>?,./\\的任意两种及以上组成"}});

          }else{

              dispatch({type:SAFE_SETTING_PWD_TIPS_HIDE,data:{type:'new'}});

              newRes = true;

          }

      }
    //判断重写输入的新密码
      if (reNewPwd === ''){

          dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'reNew',tips:"请输入确认密码"}});

      }else{

          reNewResult = UserComm_ValidatePwd(reNewPwd);

          if (!reNewResult.isOK){

              dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'reNew',tips:"密码应由8-20位字母、数字及特殊字符`~!@#$%^&*()_+-={}|[]:\";'<>?,./\\的任意两种及以上组成"}});

          }else{

              dispatch({type:SAFE_SETTING_PWD_TIPS_HIDE,data:{type:'reNew'}});

              reNewRes = true;

          }

      }


    //判断新旧密码一致与否
      if (oldRes&&newRes){

          if ((originPwd === newPwd)){

              dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'new',tips:"原密码和新密码不能一样!"}});

          }else {

              dispatch({type:SAFE_SETTING_PWD_TIPS_HIDE,data:{type:'new'}});

              ONSame = true;

          }

      }

      //判断两次新密码是否一致
      if (newRes&&reNewRes){

          if (newPwd !== reNewPwd){

              dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'reNew',tips:"两次输入的密码不一致!"}});

          }else{

              dispatch({type:SAFE_SETTING_PWD_TIPS_HIDE,data:{type:'reNew'}});

              NRSame = true;

          }

      }


      //最终判断完成标志
        if (oldRes&&newRes&&reNewRes&&NRSame&&ONSame){

           let { UserType,UserID } = getState().LoginUser;

           let OldPwd = md5(originPwd);

           let NewPwd = md5(newPwd);

            UpdatePwd({UserID:UserID,UserType:UserType,OldPwd:OldPwd,NewPwd:NewPwd,dispatch}).then(data => {

               if (data === 'success'){

                    dispatch(AppAlertActions.alertSuccess({title:"修改密码成功，即将重新登录",hide:()=>{

                            return ()=>LogOut();

                        }}));



               }

            });

        }

  }

};




//提交密保问题
const commitQuestion = () => {

  return ( dispatch,getState ) => {

      let { qaValue,qaSelectd,initData } = getState().SafeSetting;

      let { selfQa,answer,pwd } = qaValue;

      let selfOk,answerOk,pwdOk = false;
      //判断是否选中自定义密保问题
      if (qaSelectd.value === 'self'){
            //自定义密保问题是否输入
            if (!selfQa){

                dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'self',tips:"请输入密保问题！"}});

            }else{

                /*let sefQaChecked = UserComm_CheckQA(selfQa);

                if (!sefQaChecked){//自定义密保是否通过检测

                    dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'self',tips:"密保问题格式错误！"}});

                }else{
                    自定义密保是否会和已存在的重复。*/

                    let repeat = false;

                    initData.Questions.map(item=>{

                        if (item.Question === selfQa){

                            repeat = true;

                        }

                    });

                   if (repeat){

                       dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'self',tips:"该密保问题已存在"}});

                   }else{

                       dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'self'}});

                       selfOk = true;

                   }

                // }

            }

            //判断答案
          if (answer){

            // let answerChecked = UserComm_CheckQA(answer);
            //
            // if (answerChecked){

                dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'answer'}});

                answerOk = true;

            // }else{
            //
            //     dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'answer',tips:"答案格式错误！"}});
            //
            // }

          }else {

              dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'answer',tips:"请输入答案"}});

          }

          //判断密码
          if (!pwd){

              /*let pwdChecked = UserComm_ValidatePwd(pwd);

              if (pwdChecked.isOK){

                  dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'pwd'}});

                  pwdOk = true;

              }else{

                  dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"密码应由8-20位字母、数字及特殊字符`~!@#$%^&*()_+-={}|[]:\";'<>?,./\\的任意两种及以上组成"}});

              }

          }else {*/

              dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"请输入密码"}});

          }else{

              dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'pwd'}});

              pwdOk = true;

          }

          if (selfOk&&pwdOk&&answerOk){

              let { UserID } = getState().LoginUser;

              pwd = md5(pwd);

              AddSecQA({ UserID:UserID, Question:selfQa,Answer:answer,Pwd:pwd,dispatch}).then(data => {

                  console.log(data);

                 if (data===0){

                     console.log(data);

                    dispatch(AppAlertActions.alertSuccess({title:"添加成功"}));

                     dispatch(clearQuestions());

                    dispatch(PageUpdate());

                 }

              });

          }

      }else{

          //判断答案
          if (answer){

              // let answerChecked = UserComm_CheckQA(answer);
              //
              // if (answerChecked){

                  dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'answer'}});

                  answerOk = true;

              // }else{
              //
              //     dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'answer',tips:"答案格式错误"}});
              //
              // }

          }else {

              dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'answer',tips:"请输入答案"}});

          }

          //判断密码
          if (!pwd){

              /*let pwdChecked = UserComm_ValidatePwd(pwd);

              if (pwdChecked.isOK){

                  dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'pwd'}});

                  pwdOk = true;

              }else{

                  dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"密码应由8-20位字母、数字及特殊字符`~!@#$%^&*()_+-={}|[]:\";'<>?,./\\的任意两种及以上组成"}});

              }

          }else {*/

              dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"请输入密码"}});

          }else{

              dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'pwd'}});

              pwdOk = true;

          }

          if (answerOk&&pwdOk){

              let { UserID } = getState().LoginUser;

              pwd = md5(pwd);

              AddSecQA({UserID:UserID, Question:qaSelectd.title,Answer:answer,Pwd:pwd,dispatch}).then(data => {

                  if (data === 0){

                      dispatch(AppAlertActions.alertSuccess({title:'密保问题添加成功'}));

                      dispatch(clearQuestions());

                      dispatch(PageUpdate());

                  }

              });

          }

      }

  }

};


//提交删除命令
const commitDelQuestion = () => {

  return ( dispatch,getState ) => {

      let { delQuestionsModal } = getState().SafeSetting;

      if (delQuestionsModal.pwd){

          // let pwdChecked = UserComm_ValidatePwd(delQuestionsModal.pwd);
          //
          // if (pwdChecked.isOK){

              dispatch({type:SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_HIDE});

              let { UserID } = getState().LoginUser;

              let { question,pwd } = delQuestionsModal;

              pwd = md5(pwd);

              DeleteSecQA({ UserID:UserID,ID:question.id,Pwd:pwd,dispatch}).then(data => {

                 if (data==='success'){

                    dispatch(AppAlertActions.alertSuccess({title:"删除成功"}));

                     dispatch({type:SAFE_SETTING_DEL_QUESTIONS_MODAL_HIDE});

                    dispatch(PageUpdate());

                 }

              });

          // }else{
          //
          //     dispatch({type:SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_SHOW,data:"密码应由8-20位字母、数字及特殊字符`~!@#$%^&*()_+-={}|[]:\";'<>?,./\\的任意两种及以上组成"})
          //
          // }

      }else{

          dispatch({type:SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_SHOW,data:"密码不能为空"})

      }

  }

};

//提交编辑问题的弹窗
const commitEditQuestion = () => {

    return ( dispatch,getState ) => {

        let { initData } = getState().SafeSetting;

        let { selfQa,newAnswer,newQuestionDropSelectd,pwd,originQuestion } = getState().SafeSetting.editQuestionsModal;

       /* let selfOk,answerOk,pwdOk = false;

        //判断是否选中自定义密保问题
        if (newQuestionDropSelectd.value === 'self'){
            //自定义密保问题是否输入
            if (!selfQa){

                dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'self',tips:"请输入密保问题"}});

            }else{

                    let repeat = false;

                    initData.Questions.map(item=>{

                        if (item.Question === selfQa){

                            repeat = true;

                        }

                    });

                    if (repeat){

                        dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'self',tips:"密保问题已存在"}});

                    }else{

                        dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE,data:{type:'self'}});

                        selfOk = true;

                    }


            }

            //判断答案
            if (newAnswer){

                    dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE,data:{type:'answer'}});

                    answerOk = true;

            }else {

                dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'answer',tips:"请输入答案"}});

            }

            //判断密码
            if (pwd){

                    dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE,data:{type:'pwd'}});

                    pwdOk = true;

            }else {

                dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"请输入密码"}});

            }

            if (selfOk&&pwdOk&&answerOk){

                let { UserID } = getState().LoginUser;

                pwd = md5(pwd);

                EditSecQA({
                    ID:originQuestion.id,
                    UserID:UserID,
                    Question:selfQa,
                    Answer:newAnswer,
                    Pwd:pwd,
                    dispatch
                }).then(data => {

                    if (data==='success'){

                        dispatch(AppAlertActions.alertSuccess({title:"密保问题修改成功"}));

                        dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_MODAL_HIDE});

                        dispatch(PageUpdate());

                    }

                });

            }

        }else{

            //判断答案
            if (newAnswer){

                dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE,data:{type:'answer'}});

                answerOk = true;

            }else {

                dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'answer',tips:"请输入答案"}});

            }

            //判断密码
            if (pwd){

                    dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE,data:{type:'pwd'}});

                    pwdOk = true;

            }else {

                dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"请输入密码"}});

            }

            if (answerOk&&pwdOk){

                let { UserID } = getState().LoginUser;

                pwd = md5(pwd);

                EditSecQA({
                    ID:originQuestion.id,
                    UserID:UserID,
                    Question:newQuestionDropSelectd.title,
                    Answer:newAnswer,
                    Pwd:pwd,
                    dispatch
                }).then(data => {

                    if (data){

                        dispatch(AppAlertActions.alertSuccess({title:"密保问题修改成功"}));

                        dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_MODAL_HIDE});

                        dispatch(PageUpdate());

                    }

                });

            }

        }*/

       let answerOk = false,pwdOk =false;

       console.log(originQuestion);


        //判断答案
        if (newAnswer){

            dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE,data:{type:'answer'}});

            answerOk = true;

        }else {

            dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'answer',tips:"请输入答案"}});

        }

        //判断密码
        if (pwd){

            dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE,data:{type:'pwd'}});

            pwdOk = true;

        }else {

            dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"请输入密码"}});

        }

        if (answerOk&&pwdOk){

            let { UserID } = getState().LoginUser;

            pwd = md5(pwd);

            EditSecQA({
                ID:originQuestion.id,
                UserID:UserID,
                Question:originQuestion.value,
                Answer:newAnswer,
                Pwd:pwd,
                dispatch
            }).then(data => {

                if (data){

                    dispatch(AppAlertActions.alertSuccess({title:"密保问题修改成功"}));

                    dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_MODAL_HIDE});

                    dispatch(PageUpdate());

                }

            });

        }


    }

};


//提交邮箱修改
const emailCommit = () => {

  return ( dispatch,getState ) => {

      let { UserID } = getState().LoginUser;

      let { pwd,newEmail } = getState().SafeSetting.emailValue;

      let pwdOk,newEmailOk = false;


      //判断密码是否正确
      if (pwd){

        // let pwdChecked = UserComm_ValidatePwd(pwd);
        //
        // if (pwdChecked.isOK){

            dispatch({type:SAFE_SETTING_EMAIL_TIPS_HIDE,data:{type:'pwd'}});

            pwdOk = true;

        // }else{
        //
        //     dispatch({type:SAFE_SETTING_EMAIL_TIPS_SHOW,data:{type:'pwd',value:"密码应由8-20位字母、数字及特殊字符`~!@#$%^&*()_+-={}|[]:\";'<>?,./\\的任意两种及以上组成"}});
        //
        // }


      }else{

          dispatch({type:SAFE_SETTING_EMAIL_TIPS_SHOW,data:{type:'pwd',value:"请输入密码"}});

      }


      if (newEmail){

          let emailChecked = UserComm_CheckEmail(newEmail);

          if (emailChecked){

              dispatch({type:SAFE_SETTING_EMAIL_TIPS_HIDE,data:{type:'new'}});

              newEmailOk = true;

          }else{

              dispatch({type:SAFE_SETTING_EMAIL_TIPS_SHOW,data:{type:'new',value:"邮箱格式错误"}});

          }


      }else{

          dispatch({type:SAFE_SETTING_EMAIL_TIPS_SHOW,data:{type:'new',value:"请输入邮箱"}});

      }


      //同时都正确的时候
      if (pwdOk&&newEmailOk){

          pwd = md5(pwd);


          SetSecEmail({UserID:UserID,Pwd:pwd,Email:newEmail,dispatch}).then(data => {

              if (data==='success'){

                  dispatch(AppAlertActions.alertSuccess({title:"邮箱添加成功"}));

                  dispatch(clearEmail());

                  dispatch(PageUpdate());

              }

          });


      }


  }


};













//清空密码部分，返回初始状态
const clearPwd = () => {

    return dispatch => {

        dispatch({type:SAFE_SETTING_PWD_VALUE_CHANGE,data:{type:'origin',value:''}});

        dispatch({type:SAFE_SETTING_PWD_VALUE_CHANGE,data:{type:'new',value:''}});

        dispatch({type:SAFE_SETTING_PWD_VALUE_CHANGE,data:{type:'reNew',value:''}});

        dispatch({type:SAFE_SETTING_PWD_TIPS_HIDE,data:{type:'origin'}});

        dispatch({type:SAFE_SETTING_PWD_TIPS_HIDE,data:{type:'new'}});

        dispatch({type:SAFE_SETTING_PWD_TIPS_HIDE,data:{type:'reNew'}});


    }

};



//清空问题，返回初始状态
const clearQuestions = () => {

    return dispatch => {

        dispatch({type:SAFE_SETTING_QUESTIONS_PICK_CHANGE,data:{value:'self',title:"自定义密保问题"}})

        dispatch({type:SAFE_SETTING_QUESTIONS_INPUT_CHANGE,data:{type:'self',value:""}});

        dispatch({type:SAFE_SETTING_QUESTIONS_INPUT_CHANGE,data:{type:'answer',value:""}});

        dispatch({type:SAFE_SETTING_QUESTIONS_INPUT_CHANGE,data:{type:'pwd',value:""}});

        dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'self'}});

        dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'answer'}});

        dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'pwd'}});


    }

};

//清空邮箱，返回初始状态

const clearEmail = () => {

    return dispatch => {

        dispatch({type:SAFE_SETTING_EMAIL_INPUT_CHANGE,data:{type:'new',value:""}});

        dispatch({type:SAFE_SETTING_EMAIL_INPUT_CHANGE,data:{type:'pwd',value:""}});

        dispatch({type:SAFE_SETTING_EMAIL_TIPS_HIDE,data:{type:'pwd'}});

        dispatch({type:SAFE_SETTING_EMAIL_TIPS_HIDE,data:{type:'new'}});

    }

};





//检测邮箱
function UserComm_CheckEmail(strInput) {
    //\S表示非空字符
    if (!/^(\S)+@(\S)+\.[a-zA-Z]{2,3}$/.test(strInput)) {
        return false;
    }
    else {
        return /^([a-zA-Z0-9]+[_|\-|\.]*)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]*)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/gi.test(strInput);
    }
}


//检测密码
const UserComm_CheckUserPwd = (strInput) => {

    return /^([0-9a-zA-Z`~\!@#$%\^&*\(\)_\+-={}|\[\]:\";\'<>\?,.\/\\]){6,20}$/.test(strInput);

};

//密码的正则(最新)

const UserComm_ValidatePwd = (pwd) => {

    let lengthOver8 = true;
    let lengthLess20 = true;
    let containNumber = true;
    let containLetters = true;
    let containSymbol = true;
    let isOK = true;

    let txt = '';

    lengthOver8 = pwd.length >= 8;
    lengthLess20 = pwd.length <=20;
    containNumber = /[0-9]+/.test(pwd);
    containLetters = /[a-zA-Z]+/.test(pwd);
    containSymbol = /[`~\!@#$%\^&*\(\)_\+={}|\[\]:\";\'<>\?,.\/\\-]+/.test(pwd);
    isOK = /^([0-9a-zA-Z`~\!@#$%\^&*\(\)_\+={}|\[\]:\";\'<>\?,.\/\\-]){8,20}$/.test(pwd);

    if (!lengthOver8) {
        txt += "密码长度不足8位、";
    }
    if (!lengthLess20) {
        txt += "密码长度不能超过20位、";
    }

    if ((containNumber && containLetters)
        || (containNumber && containSymbol)
        || (containLetters && containSymbol)
        || (containNumber && containLetters && containSymbol)) {
        //密码合法
    } else {
        txt += "至少包含字母、数字及特殊符号中的两种、";
    }

    if (lengthOver8 && lengthLess20 && !isOK) {
        txt += "密码包含非法字符、";
    }

    if (txt === "") {
        txt = "密码合法";
        return { isOK: true, txt: txt };
    } else {
        txt = txt.substr(0, txt.length - 1);
        return { isOK: false, txt: txt };
    }
}




//检测密保
const UserComm_CheckQA = (strInput) => {

    return /^[?？+-=\.\\/\*()（）A-Za-z0-9\u4e00-\u9fa5]{1,30}$/.test(strInput);

};





//接口

//获取安全信息

let GetSecurityInfo =  async ({UserID,dispatch}) => {

    let res = await Method.getGetData(`/UserMgr/PersonalMgr/GetSecurityInfo?UserID=${UserID}`,2,CONFIG.PersonalProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:'未知异常请重新刷新'}));

    }

};


//提交密码
let UpdatePwd =  async ({UserID,UserType,OldPwd,NewPwd,dispatch}) => {

    let res = await Method.getPostData(`/UserMgr/PersonalMgr/UpdatePwd`, {

        UserID, UserType, OldPwd, NewPwd

    }, 2, CONFIG.PersonalProxy);

    if (res.StatusCode === 200) {

        return res.Msg;

    } else {

        if (res.ErrCode === -2) {

            dispatch({type: SAFE_SETTING_PWD_TIPS_SHOW, data: {type: 'new', tips: "新旧密码一致！"}});


        }else if (res.ErrCode === -3){

            dispatch({type: SAFE_SETTING_PWD_TIPS_SHOW, data: {type: 'origin', tips: "原密码不正确"}});

        }else {

            dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:'未知异常'}));

        }

    }

};


//获取系统预设的密保问题

let GetSystemSecQA =  async ({UserID,dispatch}) => {

    let res = await Method.getGetData(`/UserMgr/PersonalMgr/GetSystemSecQA?UserID=${UserID}`, 2, CONFIG.PersonalProxy);

    if (res.StatusCode === 200) {

        return res.Data;

    } else {

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:'未知异常'}));

    }

};



//添加密保问题

let AddSecQA =  async ({UserID,Question,Answer,Pwd,dispatch}) => {

    let res = await Method.getPostData(`/UserMgr/PersonalMgr/AddSecQA`, {

        UserID,Question,Answer,Pwd

    }, 2, CONFIG.PersonalProxy);

    if (res.StatusCode === 200) {

        return res.ErrCode;

    } else {


        if (res.ErrCode === -2){

            dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"密码不正确！"}});


        }else if (res.ErrCode === -3){

            dispatch(AppAlertActions.alertError({title:"已存在相同问题！"}));

        }else {

            dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:'未知异常'}));

        }

    }

};



//修改密保问题
let EditSecQA =  async ({UserID,ID,Question,Answer,Pwd,dispatch}) => {

    let res = await Method.getPostData(`/UserMgr/PersonalMgr/EditSecQA`, {

        UserID,ID,Question,Answer,Pwd

    }, 2, CONFIG.PersonalProxy);

    if (res.StatusCode === 200) {

        return res.Msg;

    } else {

        if (res.ErrCode === -2){

            dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"密码不正确！"}});

        }else if (res.ErrCode === -3){

            dispatch(AppAlertActions.alertError({title:"已存在相同问题！"}));

        }else {

            dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:'未知异常'}));

        }

    }

};


//删除密保问题

let DeleteSecQA =  async ({UserID,ID,Pwd,dispatch}) => {

    let res = await Method.getPostData(`/UserMgr/PersonalMgr/DeleteSecQA`, {

        UserID,ID,Pwd

    }, 2, CONFIG.PersonalProxy);

    if (res.StatusCode === 200) {

        return res.Msg;

    } else {

        if (res.ErrCode === -2){

            dispatch({type:SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_SHOW,data:"密码不正确"});

        }else if (res.ErrCode === -3){

           dispatch(AppAlertActions.alertError({title:"原问题已不存在！"}));

        }else {

            dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:'未知异常'}));

        }

    }

};



//设置密保问题


let SetSecEmail =  async ({UserID,Email,Pwd,dispatch}) => {

    let res = await Method.getPostData(`/UserMgr/PersonalMgr/SetSecEmail`, {

        UserID,Email,Pwd

    }, 2, CONFIG.PersonalProxy);

    if (res.StatusCode === 200) {

        return res.Msg;

    } else {

        if (res.ErrCode === -2){

            dispatch({type:SAFE_SETTING_EMAIL_TIPS_SHOW,data:{type:'pwd',value:"密码不正确"}});

        }else if (res.ErrCode === -3){

            dispatch({type:SAFE_SETTING_EMAIL_TIPS_SHOW,data:{type:"new",value:"新邮箱不能与原邮箱相同"}});

        }else if (res.ErrCode === -4){

            // dispatch(AppAlertActions.alertError({title:"该邮箱已被占用"}));

            dispatch({type:SAFE_SETTING_EMAIL_TIPS_SHOW,data:{type:'new',value:"该邮箱已被占用"}});

        }else {

            dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:'未知异常'}));

        }

    }

};



//隐藏警告框
const hideAlert = (dispatch) => {

  return () => dispatch({type:AppAlertActions.APP_ALERT_HIDE});

};




export default{

    SAFE_SETTING_INIT_DATA_UPDATE,

    SAFE_SETTING_CONTENT_SLIDE_UP,

    SAFE_SETTING_CONTENT_SLIDE_DOWN,

    SAFE_SETTING_PWD_VALUE_CHANGE,

    SAFE_SETTING_PWD_TIPS_SHOW,

    SAFE_SETTING_PWD_TIPS_HIDE,

    SAFE_SETTING_QUESTIONS_WRAPPER_SHOW,

    SAFE_SETTING_QUESTIONS_WRAPPER_HIDE,

    SAFE_SETTING_QUESTIONS_LIST_UPDATE,

    SAFE_SETTING_QUESTIONS_PICK_CHANGE,

    SAFE_SETTING_QUESTIONS_INPUT_CHANGE,

    SAFE_SETTING_QUESTIONS_TIPS_SHOW,

    SAFE_SETTING_QUESTIONS_TIPS_HIDE,

    SAFE_SETTING_DEL_QUESTIONS_MODAL_SHOW,

    SAFE_SETTING_DEL_QUESTIONS_MODAL_HIDE,

    SAFE_SETTING_DEL_QUESTIONS_INPUT_CHANGE,

    SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_SHOW,

    SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_HIDE,

    SAFE_SETTING_EDIT_QUESTIONS_MODAL_SHOW,

    SAFE_SETTING_EDIT_QUESTIONS_MODAL_HIDE,

    SAFE_SETTING_EDIT_QUESTIONS_PICK,

    SAFE_SETTING_EDIT_QUESTIONS_INPUT_CHANGE,

    SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,

    SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE,

    SAFE_SETTING_EMAIL_INPUT_CHANGE,

    SAFE_SETTING_EMAIL_TIPS_SHOW,

    SAFE_SETTING_EMAIL_TIPS_HIDE,

    SAFE_SETTING_LOGIN_HISTORY_SHOW,

    SAFE_SETTING_LOGIN_HISTORY_HIDE,

    SAFE_SETTING_LOADING_SHOW,

    SAFE_SETTING_LOADING_HIDE,

    SAFE_SETTING_ERROR_TIPS_INIT,

    Init,

    UserComm_ValidatePwd,

    UserComm_CheckEmail,

    commitPwd,

    commitQuestion,

    clearQuestions,

    clearPwd,

    clearEmail,

    commitDelQuestion,

    commitEditQuestion,

    emailCommit

}