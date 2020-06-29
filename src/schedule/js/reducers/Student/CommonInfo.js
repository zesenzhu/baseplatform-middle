//学生角色reducer
import SIActions from '../../actions/Student/StudentIndexActions';

const defaultState = {

    NowClassHourNO:'',

    ItemClassHourCount:[],

    ItemClassHour:[],

    ClassSchedule:[]

};



const StuCommonInfo =  (state=defaultState,actions) =>{

    switch (actions.type) {

        case SIActions.STUDENT_CLASSHOURS_INFO_INIT:

            return { ...state,...actions.data };

        default:

            return state;

    }

};

export default StuCommonInfo;