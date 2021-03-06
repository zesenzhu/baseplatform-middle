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



//???????????????
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

                let questionsList = [{value:"self",title:"?????????????????????"}];

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

               let questionsList = [{value:"self",title:"?????????????????????"}];

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

//????????????
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

                let questionsList = [{value:"self",title:"?????????????????????"}];

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

                let questionsList = [{value:"self",title:"?????????????????????"}];

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


//??????????????????
const commitPwd = () => {

  return (dispatch,getState) => {

      let { originPwd,newPwd,reNewPwd } = getState().SafeSetting.pwdValue;

      let originResult,newResult,reNewResult;

      let oldRes = false;

      let newRes = false;

      let reNewRes = false;

      let ONSame = false;

      let NRSame = false;

       //???????????????
      if (originPwd===''){

          dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'origin',tips:"??????????????????"}});

      }else{

          // originResult = UserComm_ValidatePwd(originPwd);
          //
          // if (!originResult.isOK){
          //
          //     dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'origin',tips:"????????????8-20?????????????????????????????????`~!@#$%^&*()_+-={}|[]:\";'<>?,./\\??????????????????????????????"}});
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
      //???????????????
      if (newPwd === ''){

          dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'new',tips:"??????????????????"}});

      }else{

          newResult = UserComm_ValidatePwd(newPwd);
          
          if (!newResult.isOK){

              dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'new',tips:"????????????8-20?????????????????????????????????`~!@#$%^&*()_+-={}|[]:\";'<>?,./\\??????????????????????????????"}});

          }else{

              dispatch({type:SAFE_SETTING_PWD_TIPS_HIDE,data:{type:'new'}});

              newRes = true;

          }

      }
    //??????????????????????????????
      if (reNewPwd === ''){

          dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'reNew',tips:"?????????????????????"}});

      }else{

          reNewResult = UserComm_ValidatePwd(reNewPwd);

          if (!reNewResult.isOK){

              dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'reNew',tips:"????????????8-20?????????????????????????????????`~!@#$%^&*()_+-={}|[]:\";'<>?,./\\??????????????????????????????"}});

          }else{

              dispatch({type:SAFE_SETTING_PWD_TIPS_HIDE,data:{type:'reNew'}});

              reNewRes = true;

          }

      }


    //??????????????????????????????
      if (oldRes&&newRes){

          if ((originPwd === newPwd)){

              dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'new',tips:"?????????????????????????????????!"}});

          }else {

              dispatch({type:SAFE_SETTING_PWD_TIPS_HIDE,data:{type:'new'}});

              ONSame = true;

          }

      }

      //?????????????????????????????????
      if (newRes&&reNewRes){

          if (newPwd !== reNewPwd){

              dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'reNew',tips:"??????????????????????????????!"}});

          }else{

              dispatch({type:SAFE_SETTING_PWD_TIPS_HIDE,data:{type:'reNew'}});

              NRSame = true;

          }

      }


      //????????????????????????
        if (oldRes&&newRes&&reNewRes&&NRSame&&ONSame){

           let { UserType,UserID } = getState().LoginUser;

           let OldPwd = md5(originPwd);

           let NewPwd = md5(newPwd);

            UpdatePwd({UserID:UserID,UserType:UserType,OldPwd:OldPwd,NewPwd:NewPwd,dispatch}).then(data => {

               if (data === 'success'){

                    dispatch(AppAlertActions.alertSuccess({title:"???????????????????????????????????????",hide:()=>{

                            return ()=>LogOut();

                        }}));



               }

            });

        }

  }

};




//??????????????????
const commitQuestion = () => {

  return ( dispatch,getState ) => {

      let { qaValue,qaSelectd,initData } = getState().SafeSetting;

      let { selfQa,answer,pwd } = qaValue;

      let selfOk,answerOk,pwdOk = false;
      //???????????????????????????????????????
      if (qaSelectd.value === 'self'){
            //?????????????????????????????????
            if (!selfQa){

                dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'self',tips:"????????????????????????"}});

            }else{

                /*let sefQaChecked = UserComm_CheckQA(selfQa);

                if (!sefQaChecked){//?????????????????????????????????

                    dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'self',tips:"???????????????????????????"}});

                }else{
                    ????????????????????????????????????????????????*/

                    let repeat = false;

                    initData.Questions.map(item=>{

                        if (item.Question === selfQa){

                            repeat = true;

                        }

                    });

                   if (repeat){

                       dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'self',tips:"????????????????????????"}});

                   }else{

                       dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'self'}});

                       selfOk = true;

                   }

                // }

            }

            //????????????
          if (answer){

            // let answerChecked = UserComm_CheckQA(answer);
            //
            // if (answerChecked){

                dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'answer'}});

                answerOk = true;

            // }else{
            //
            //     dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'answer',tips:"?????????????????????"}});
            //
            // }

          }else {

              dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'answer',tips:"???????????????"}});

          }

          //????????????
          if (!pwd){

              /*let pwdChecked = UserComm_ValidatePwd(pwd);

              if (pwdChecked.isOK){

                  dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'pwd'}});

                  pwdOk = true;

              }else{

                  dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"????????????8-20?????????????????????????????????`~!@#$%^&*()_+-={}|[]:\";'<>?,./\\??????????????????????????????"}});

              }

          }else {*/

              dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"???????????????"}});

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

                    dispatch(AppAlertActions.alertSuccess({title:"????????????"}));

                     dispatch(clearQuestions());

                    dispatch(PageUpdate());

                 }

              });

          }

      }else{

          //????????????
          if (answer){

              // let answerChecked = UserComm_CheckQA(answer);
              //
              // if (answerChecked){

                  dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'answer'}});

                  answerOk = true;

              // }else{
              //
              //     dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'answer',tips:"??????????????????"}});
              //
              // }

          }else {

              dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'answer',tips:"???????????????"}});

          }

          //????????????
          if (!pwd){

              /*let pwdChecked = UserComm_ValidatePwd(pwd);

              if (pwdChecked.isOK){

                  dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'pwd'}});

                  pwdOk = true;

              }else{

                  dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"????????????8-20?????????????????????????????????`~!@#$%^&*()_+-={}|[]:\";'<>?,./\\??????????????????????????????"}});

              }

          }else {*/

              dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"???????????????"}});

          }else{

              dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'pwd'}});

              pwdOk = true;

          }

          if (answerOk&&pwdOk){

              let { UserID } = getState().LoginUser;

              pwd = md5(pwd);

              AddSecQA({UserID:UserID, Question:qaSelectd.title,Answer:answer,Pwd:pwd,dispatch}).then(data => {

                  if (data === 0){

                      dispatch(AppAlertActions.alertSuccess({title:'????????????????????????'}));

                      dispatch(clearQuestions());

                      dispatch(PageUpdate());

                  }

              });

          }

      }

  }

};


//??????????????????
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

                    dispatch(AppAlertActions.alertSuccess({title:"????????????"}));

                     dispatch({type:SAFE_SETTING_DEL_QUESTIONS_MODAL_HIDE});

                    dispatch(PageUpdate());

                 }

              });

          // }else{
          //
          //     dispatch({type:SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_SHOW,data:"????????????8-20?????????????????????????????????`~!@#$%^&*()_+-={}|[]:\";'<>?,./\\??????????????????????????????"})
          //
          // }

      }else{

          dispatch({type:SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_SHOW,data:"??????????????????"})

      }

  }

};

//???????????????????????????
const commitEditQuestion = () => {

    return ( dispatch,getState ) => {

        let { initData } = getState().SafeSetting;

        let { selfQa,newAnswer,newQuestionDropSelectd,pwd,originQuestion } = getState().SafeSetting.editQuestionsModal;

       /* let selfOk,answerOk,pwdOk = false;

        //???????????????????????????????????????
        if (newQuestionDropSelectd.value === 'self'){
            //?????????????????????????????????
            if (!selfQa){

                dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'self',tips:"?????????????????????"}});

            }else{

                    let repeat = false;

                    initData.Questions.map(item=>{

                        if (item.Question === selfQa){

                            repeat = true;

                        }

                    });

                    if (repeat){

                        dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'self',tips:"?????????????????????"}});

                    }else{

                        dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE,data:{type:'self'}});

                        selfOk = true;

                    }


            }

            //????????????
            if (newAnswer){

                    dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE,data:{type:'answer'}});

                    answerOk = true;

            }else {

                dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'answer',tips:"???????????????"}});

            }

            //????????????
            if (pwd){

                    dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE,data:{type:'pwd'}});

                    pwdOk = true;

            }else {

                dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"???????????????"}});

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

                        dispatch(AppAlertActions.alertSuccess({title:"????????????????????????"}));

                        dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_MODAL_HIDE});

                        dispatch(PageUpdate());

                    }

                });

            }

        }else{

            //????????????
            if (newAnswer){

                dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE,data:{type:'answer'}});

                answerOk = true;

            }else {

                dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'answer',tips:"???????????????"}});

            }

            //????????????
            if (pwd){

                    dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE,data:{type:'pwd'}});

                    pwdOk = true;

            }else {

                dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"???????????????"}});

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

                        dispatch(AppAlertActions.alertSuccess({title:"????????????????????????"}));

                        dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_MODAL_HIDE});

                        dispatch(PageUpdate());

                    }

                });

            }

        }*/

       let answerOk = false,pwdOk =false;

       console.log(originQuestion);


        //????????????
        if (newAnswer){

            dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE,data:{type:'answer'}});

            answerOk = true;

        }else {

            dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'answer',tips:"???????????????"}});

        }

        //????????????
        if (pwd){

            dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE,data:{type:'pwd'}});

            pwdOk = true;

        }else {

            dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"???????????????"}});

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

                    dispatch(AppAlertActions.alertSuccess({title:"????????????????????????"}));

                    dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_MODAL_HIDE});

                    dispatch(PageUpdate());

                }

            });

        }


    }

};


//??????????????????
const emailCommit = () => {

  return ( dispatch,getState ) => {

      let { UserID } = getState().LoginUser;

      let { pwd,newEmail } = getState().SafeSetting.emailValue;

      let pwdOk,newEmailOk = false;


      //????????????????????????
      if (pwd){

        // let pwdChecked = UserComm_ValidatePwd(pwd);
        //
        // if (pwdChecked.isOK){

            dispatch({type:SAFE_SETTING_EMAIL_TIPS_HIDE,data:{type:'pwd'}});

            pwdOk = true;

        // }else{
        //
        //     dispatch({type:SAFE_SETTING_EMAIL_TIPS_SHOW,data:{type:'pwd',value:"????????????8-20?????????????????????????????????`~!@#$%^&*()_+-={}|[]:\";'<>?,./\\??????????????????????????????"}});
        //
        // }


      }else{

          dispatch({type:SAFE_SETTING_EMAIL_TIPS_SHOW,data:{type:'pwd',value:"???????????????"}});

      }


      if (newEmail){

          let emailChecked = UserComm_CheckEmail(newEmail);

          if (emailChecked){

              dispatch({type:SAFE_SETTING_EMAIL_TIPS_HIDE,data:{type:'new'}});

              newEmailOk = true;

          }else{

              dispatch({type:SAFE_SETTING_EMAIL_TIPS_SHOW,data:{type:'new',value:"??????????????????"}});

          }


      }else{

          dispatch({type:SAFE_SETTING_EMAIL_TIPS_SHOW,data:{type:'new',value:"???????????????"}});

      }


      //????????????????????????
      if (pwdOk&&newEmailOk){

          pwd = md5(pwd);


          SetSecEmail({UserID:UserID,Pwd:pwd,Email:newEmail,dispatch}).then(data => {

              if (data==='success'){

                  dispatch(AppAlertActions.alertSuccess({title:"??????????????????"}));

                  dispatch(clearEmail());

                  dispatch(PageUpdate());

              }

          });


      }


  }


};













//???????????????????????????????????????
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



//?????????????????????????????????
const clearQuestions = () => {

    return dispatch => {

        dispatch({type:SAFE_SETTING_QUESTIONS_PICK_CHANGE,data:{value:'self',title:"?????????????????????"}})

        dispatch({type:SAFE_SETTING_QUESTIONS_INPUT_CHANGE,data:{type:'self',value:""}});

        dispatch({type:SAFE_SETTING_QUESTIONS_INPUT_CHANGE,data:{type:'answer',value:""}});

        dispatch({type:SAFE_SETTING_QUESTIONS_INPUT_CHANGE,data:{type:'pwd',value:""}});

        dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'self'}});

        dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'answer'}});

        dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'pwd'}});


    }

};

//?????????????????????????????????

const clearEmail = () => {

    return dispatch => {

        dispatch({type:SAFE_SETTING_EMAIL_INPUT_CHANGE,data:{type:'new',value:""}});

        dispatch({type:SAFE_SETTING_EMAIL_INPUT_CHANGE,data:{type:'pwd',value:""}});

        dispatch({type:SAFE_SETTING_EMAIL_TIPS_HIDE,data:{type:'pwd'}});

        dispatch({type:SAFE_SETTING_EMAIL_TIPS_HIDE,data:{type:'new'}});

    }

};





//????????????
function UserComm_CheckEmail(strInput) {
    //\S??????????????????
    if (!/^(\S)+@(\S)+\.[a-zA-Z]{2,3}$/.test(strInput)) {
        return false;
    }
    else {
        return /^([a-zA-Z0-9]+[_|\-|\.]*)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]*)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/gi.test(strInput);
    }
}


//????????????
const UserComm_CheckUserPwd = (strInput) => {

    return /^([0-9a-zA-Z`~\!@#$%\^&*\(\)_\+-={}|\[\]:\";\'<>\?,.\/\\]){6,20}$/.test(strInput);

};

//???????????????(??????)

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
        txt += "??????????????????8??????";
    }
    if (!lengthLess20) {
        txt += "????????????????????????20??????";
    }

    if ((containNumber && containLetters)
        || (containNumber && containSymbol)
        || (containLetters && containSymbol)
        || (containNumber && containLetters && containSymbol)) {
        //????????????
    } else {
        txt += "?????????????????????????????????????????????????????????";
    }

    if (lengthOver8 && lengthLess20 && !isOK) {
        txt += "???????????????????????????";
    }

    if (txt === "") {
        txt = "????????????";
        return { isOK: true, txt: txt };
    } else {
        txt = txt.substr(0, txt.length - 1);
        return { isOK: false, txt: txt };
    }
}




//????????????
const UserComm_CheckQA = (strInput) => {

    return /^[????+-=\.\\/\*()??????A-Za-z0-9\u4e00-\u9fa5]{1,30}$/.test(strInput);

};





//??????

//??????????????????

let GetSecurityInfo =  async ({UserID,dispatch}) => {

    let res = await Method.getGetData(`/UserMgr/PersonalMgr/GetSecurityInfo?UserID=${UserID}`,2,CONFIG.PersonalProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:'???????????????????????????'}));

    }

};


//????????????
let UpdatePwd =  async ({UserID,UserType,OldPwd,NewPwd,dispatch}) => {

    let res = await Method.getPostData(`/UserMgr/PersonalMgr/UpdatePwd`, {

        UserID, UserType, OldPwd, NewPwd

    }, 2, CONFIG.PersonalProxy);

    if (res.StatusCode === 200) {

        return res.Msg;

    } else {

        if (res.ErrCode === -2) {

            dispatch({type: SAFE_SETTING_PWD_TIPS_SHOW, data: {type: 'new', tips: "?????????????????????"}});


        }else if (res.ErrCode === -3){

            dispatch({type: SAFE_SETTING_PWD_TIPS_SHOW, data: {type: 'origin', tips: "??????????????????"}});

        }else {

            dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:'????????????'}));

        }

    }

};


//?????????????????????????????????

let GetSystemSecQA =  async ({UserID,dispatch}) => {

    let res = await Method.getGetData(`/UserMgr/PersonalMgr/GetSystemSecQA?UserID=${UserID}`, 2, CONFIG.PersonalProxy);

    if (res.StatusCode === 200) {

        return res.Data;

    } else {

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:'????????????'}));

    }

};



//??????????????????

let AddSecQA =  async ({UserID,Question,Answer,Pwd,dispatch}) => {

    let res = await Method.getPostData(`/UserMgr/PersonalMgr/AddSecQA`, {

        UserID,Question,Answer,Pwd

    }, 2, CONFIG.PersonalProxy);

    if (res.StatusCode === 200) {

        return res.ErrCode;

    } else {


        if (res.ErrCode === -2){

            dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"??????????????????"}});


        }else if (res.ErrCode === -3){

            dispatch(AppAlertActions.alertError({title:"????????????????????????"}));

        }else {

            dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:'????????????'}));

        }

    }

};



//??????????????????
let EditSecQA =  async ({UserID,ID,Question,Answer,Pwd,dispatch}) => {

    let res = await Method.getPostData(`/UserMgr/PersonalMgr/EditSecQA`, {

        UserID,ID,Question,Answer,Pwd

    }, 2, CONFIG.PersonalProxy);

    if (res.StatusCode === 200) {

        return res.Msg;

    } else {

        if (res.ErrCode === -2){

            dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"??????????????????"}});

        }else if (res.ErrCode === -3){

            dispatch(AppAlertActions.alertError({title:"????????????????????????"}));

        }else {

            dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:'????????????'}));

        }

    }

};


//??????????????????

let DeleteSecQA =  async ({UserID,ID,Pwd,dispatch}) => {

    let res = await Method.getPostData(`/UserMgr/PersonalMgr/DeleteSecQA`, {

        UserID,ID,Pwd

    }, 2, CONFIG.PersonalProxy);

    if (res.StatusCode === 200) {

        return res.Msg;

    } else {

        if (res.ErrCode === -2){

            dispatch({type:SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_SHOW,data:"???????????????"});

        }else if (res.ErrCode === -3){

           dispatch(AppAlertActions.alertError({title:"????????????????????????"}));

        }else {

            dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:'????????????'}));

        }

    }

};



//??????????????????


let SetSecEmail =  async ({UserID,Email,Pwd,dispatch}) => {

    let res = await Method.getPostData(`/UserMgr/PersonalMgr/SetSecEmail`, {

        UserID,Email,Pwd

    }, 2, CONFIG.PersonalProxy);

    if (res.StatusCode === 200) {

        return res.Msg;

    } else {

        if (res.ErrCode === -2){

            dispatch({type:SAFE_SETTING_EMAIL_TIPS_SHOW,data:{type:'pwd',value:"???????????????"}});

        }else if (res.ErrCode === -3){

            dispatch({type:SAFE_SETTING_EMAIL_TIPS_SHOW,data:{type:"new",value:"?????????????????????????????????"}});

        }else if (res.ErrCode === -4){

            // dispatch(AppAlertActions.alertError({title:"?????????????????????"}));

            dispatch({type:SAFE_SETTING_EMAIL_TIPS_SHOW,data:{type:'new',value:"?????????????????????"}});

        }else {

            dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:'????????????'}));

        }

    }

};



//???????????????
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