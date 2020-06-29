import HeaderActions from '../../actions/Student/HeaderActions';

const HeaderSetting = (state={

    MenuShow:false,

    SubjectMenuShow:false,

    SubjectsInfo:[],

    SubjectSelect:{id:"none",name:"学科"}

},actions) => {

    switch (actions.type) {

        case HeaderActions.STUDENT_HEADER_MENU_TOGGLE:

            return {

                ...state,

                MenuShow:!state.MenuShow

            };

        case HeaderActions.STUDENT_HEADER_MENU_SHOW:

            return {

                ...state,

                MenuShow:true

            };

        case HeaderActions.STUDENT_HEADER_MENU_HIDE:

            return {

                ...state,

                MenuShow:false

            };

        case HeaderActions.STUDENT_SUBJECT_MENU_TOGGLE:

            return {

                ...state,

                SubjectMenuShow:!state.SubjectMenuShow

            };

        case HeaderActions.STUDENT_SUBJECT_MENU_SHOW:

            return {

                ...state,

                SubjectMenuShow:true

            };

        case HeaderActions.STUDENT_SUBJECT_MENU_HIDE:

            return {

                ...state,

                SubjectMenuShow:false

            };

        case HeaderActions.STUDENT_HEADER_SUBJECTS_UPDATE:

            return {

                ...state,

                SubjectsInfo:actions.data

            };

        case HeaderActions.STUDENT_HEADER_SUBJECTS_PICK_CHANGE:

            return {

                ...state,

                SubjectSelect:actions.data

            };

        default:

            return state;

    }

};

export default HeaderSetting;