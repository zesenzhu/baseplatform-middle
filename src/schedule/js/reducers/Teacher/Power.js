import TPActions from '../../actions/Teacher/TeacherPowerActions';

const Power = (state={

    Adjust:true,

    AddImport:false

},actions) => {

    switch (actions.type) {

        case TPActions.TEACHER_POWER_CHANGE:

            return { ...state,...actions.data };

        default:

            return state;

    }

};

export default Power;