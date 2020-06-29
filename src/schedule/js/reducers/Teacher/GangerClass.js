import GCActions from '../../actions/Teacher/GangerClassActions';

const GangerClass = (state={

    Classes:[]

},actions) => {

    switch (actions.type) {

        case GCActions.TEACHER_GANGER_CLASSES_UPDATE:

            return { ...state,Classes:actions.data };

        default:

            return state;

    }

};

export default GangerClass;