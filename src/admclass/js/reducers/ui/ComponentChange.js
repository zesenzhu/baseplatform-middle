import UpUIState from '../../actions/UpUIState';

const ComponentChange = (state={

    stu:false,

    class:false,

    grade:false,

    stuInfo:{id:'',name:''},

    gradeInfo:{id:'',name:''},

    classInfo:{id:'',name:'',preName:'',preId:''}

    },actions) =>{

    switch (actions.type) {

        case UpUIState.CHANGE_STU_ACTIVE:

            return {...state,stu:true,class:false,grade:false,stuInfo:actions.info};

        case UpUIState.CHANGE_CLASS_ACTIVE:

            return {...state,stu:false,class:true,grade:false,classInfo:actions.info};

        case UpUIState.CHANGE_GRADE_ACTIVE:

            return {...state,stu:false,class:false,grade:true,gradeInfo:actions.info};

        default:
            return state;
    }
};

export default ComponentChange;