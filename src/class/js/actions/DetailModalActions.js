import ApiActions from './ApiActions';

//弹窗出现和消失
const COMPONENT_DETAIL_MODAL_SHOW = 'COMPONENT_DETAIL_MODAL_SHOW';

const COMPONENT_DETAIL_MODAL_HIDE = 'COMPONENT_DETAIL_MODAL_HIDE';

//弹窗内部变化
const COMPONENT_DETAIL_MODAL_USER_CHANGE = 'COMPONENT_DETAIL_MODAL_USER_CHANGE';

const COMPONENT_DETAIL_MODAL_TEACHER_INFO_UPDATE = 'COMPONENT_DETAIL_MODAL_TEACHER_INFO_UPDATE';

const COMPONENT_DETAIL_MODAL_STUDENT_INFO_UPDATE = 'COMPONENT_DETAIL_MODAL_STUDENT_INFO_UPDATE';

//弹窗初始化
const Init = ({UserID,UserType}) => {

    return dispatch=>{

        dispatch({type:COMPONENT_DETAIL_MODAL_SHOW});

        ApiActions.GetUserDetail({UserID,dispatch}).then(data=>{

            if (data){

                const UserInfo = {

                    userName: data.UserName,
                    userImg: data.PhotoPath,
                    Gende: data.Gender,
                    userText: data.Sign,
                    userID: data.UserID,
                    userGrade: data.GradeName,
                    userClass: data.ClassName,
                    userIDCard: data.IDCardNo,
                    userPhone: data.Telephone,
                    userMail: data.Email,
                    userAddress: data.HomeAddress,
                    titleName: data.TitleName,
                    subjectName: data.SubjectNames,
                    source: data.Source,
                    position: data.Position,
                    sign: data.Sign,
                    userType: data.UserType

                };

                if (UserType===1){

                    dispatch({type:COMPONENT_DETAIL_MODAL_USER_CHANGE,data:'teacher'});

                    dispatch({type:COMPONENT_DETAIL_MODAL_TEACHER_INFO_UPDATE,data:UserInfo});

                }else if (UserType===2){

                    dispatch({type:COMPONENT_DETAIL_MODAL_USER_CHANGE,data:'student'});

                    dispatch({type:COMPONENT_DETAIL_MODAL_STUDENT_INFO_UPDATE,data:UserInfo});

                }



            }

        });

    }

};

//弹窗消失

const Hide = () =>{

    return dispatch => {

        dispatch({type:COMPONENT_DETAIL_MODAL_HIDE});

    }

};


export default {

    COMPONENT_DETAIL_MODAL_SHOW,

    COMPONENT_DETAIL_MODAL_HIDE,

    COMPONENT_DETAIL_MODAL_USER_CHANGE,

    COMPONENT_DETAIL_MODAL_TEACHER_INFO_UPDATE,

    COMPONENT_DETAIL_MODAL_STUDENT_INFO_UPDATE,

    Init,

    Hide

}