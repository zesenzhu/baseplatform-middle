import DMActions from '../actions/DetailModalActions';

const DetailModal = (state={

    Show:false,

    student:{



    },

    teacher:{



    },

    ActiveInfo:'student'

},actions) => {

    switch (actions.type) {

        case DMActions.COMPONENT_DETAIL_MODAL_SHOW:

            return {...state,Show:true};

        case DMActions.COMPONENT_DETAIL_MODAL_HIDE:

            return {...state,Show:false};

        case DMActions.COMPONENT_DETAIL_MODAL_USER_CHANGE:

            return {...state,ActiveInfo:actions.data};

        case DMActions.COMPONENT_DETAIL_MODAL_TEACHER_INFO_UPDATE:

            return { ...state,teacher:actions.data };

        case DMActions.COMPONENT_DETAIL_MODAL_STUDENT_INFO_UPDATE:

            return { ...state,student:actions.data };

        default:

            return state;

    }

};

export default DetailModal;