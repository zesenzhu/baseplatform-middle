import UpDataState from '../../actions/UpDataState';

const SchoolGradeClasses = (state={


},actions) =>{

    switch (actions.type) {

        case UpDataState.GET_SHCOOL_GRADE_CLASSES:

             return {...state,...actions.data};

        default:

            return state;

    }

};

export default SchoolGradeClasses;