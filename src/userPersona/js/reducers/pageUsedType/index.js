import {PAGE_USED_TYPE_CHANGE} from "../../actions/pageUsedTypeActions";

const defaultState = '';


//界面使用类型：AdmToStu(管理员查看学生) LeaderToStu (领导查看学生（界面和管理员一样）)

//StuToStu (学生查看自己) ParentsToStu (家长查看子女) HeaderTeacherToStu (班主任查看学生)

//OtherToStu (其他人查看学生) AdmToTeacher (管理员查看教师) LeaderToTeacher (领导查看教师（界面和管理员一样）)

//TeacherToTeacher (教师查看教师自己) OtherToTeacher (其他人查看教师)

const pageUsedType = (state=defaultState,actions)=>{

    switch (actions.type) {

        case PAGE_USED_TYPE_CHANGE:

            return actions.data;

        default:

            return state;

    }

};

export default pageUsedType;