const defaultState = true;

const TEACHER_MANAGE_POWER = 'TEACHER_MANAGE_POWER';

export const teacherPowerChange = (payload)=>{

    return {type:TEACHER_MANAGE_POWER,data:payload};

};

const teacherManagePower = (state=defaultState,actions) =>{

    switch (actions.type) {

        case TEACHER_MANAGE_POWER:

            return actions.data;

        default:

            return state;

    }

};

export default teacherManagePower;


