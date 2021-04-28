import {PAGE_USED_TYPE_CHANGE} from "../../actions/pageUsedTypeActions";

const defaultState = {

    "User":'',

    "TargetUser":'',

    "UsedType":''

};


//界面使用类型UsedType：AdmToStu(管理员查看学生) LeaderToStu (领导查看学生（界面和管理员一样）)

//StuToStu (学生查看自己) ParentsToStu (家长查看子女) HeaderTeacherToStu (班主任查看学生)

//OtherToStu (其他人查看学生) AdmToTeacher (管理员查看教师) LeaderToTeacher (领导查看教师（界面和管理员一样）)

//TeacherToTeacher (教师查看教师自己) OtherToTeacher (其他人查看教师)

// OtherToOther:所有人查看家长，领导，管理员,SuperToOther:超级管理员查看其它，可以修改密码

//登录的用户和查看用的关系 User ：Adm(管理员),Leader（领导）,HeaderTeacher（班主任）,Student（学生）,Other（其他人）,Teacher（教师）,Parents（家长）

//被查看的用户TargetUser: Stu,Teacher



const pageUsedType = (state=defaultState,actions)=>{

    switch (actions.type) {

        case PAGE_USED_TYPE_CHANGE:

            return {

                ...state,

                User:actions.data.user,

                TargetUser:actions.data.targetUser,

                UsedType:actions.data.usedType

            };

        default:

            return state;

    }

};

export default pageUsedType;