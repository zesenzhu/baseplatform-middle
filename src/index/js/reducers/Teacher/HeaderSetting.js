import HeaderActions from '../../actions/Teacher/HeaderActions';

const HeaderSetting = (state={

    MenuShow:false,

    SubjectMenuShow:false,

    SubjectsInfo:[],

    SubjectSelect:{id:"none",name:"学科"}

},actions) => {

    switch (actions.type) {

        case HeaderActions.TEACHER_HEADER_MENU_TOGGLE:

            return {

                ...state,

                MenuShow:!state.MenuShow

            };

        case HeaderActions.TEACHER_HEADER_MENU_SHOW:

            return {

                ...state,

                MenuShow:true

            };

        case HeaderActions.TEACHER_HEADER_MENU_HIDE:

            return {

                ...state,

                MenuShow:false

            };

        case HeaderActions.TEACHER_SUBJECT_MENU_TOGGLE:

            return {

                ...state,

                SubjectMenuShow:!state.SubjectMenuShow

            };

        case HeaderActions.TEACHER_SUBJECT_MENU_SHOW:

            return {

                ...state,

                SubjectMenuShow:true

            };

        case HeaderActions.TEACHER_SUBJECT_MENU_HIDE:

            return {

                ...state,

                SubjectMenuShow:false

            };

        case HeaderActions.TEACHER_HEADER_SUBJECTS_UPDATE:

            return {

                ...state,

                SubjectsInfo:actions.data

            };

        case HeaderActions.TEACHER_HEADER_SUBJECTS_PICK_CHANGE:

            return {

                ...state,

                SubjectSelect:actions.data

            };

        default:

            return state;

    }

};

export default HeaderSetting;