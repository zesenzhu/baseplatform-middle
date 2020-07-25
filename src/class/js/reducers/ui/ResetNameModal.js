import UpUIState from '../../actions/UpUIState';

const ResetNameModal = (state={

    show:false,

    InputText:"",

    ClassID:"",

    ClassName:"",

    ErrorTipsShow:false,

    ErrorTips:""

},actions) => {

    switch (actions.type) {

        case UpUIState.RESET_CLASS_NAME_SHOW:

            return {

                ...state,

               InputText:actions.data.ClassName,

               ClassID:actions.data.ClassID,

               ClassName:actions.data.ClassName,

               show:true,

                ErrorTipsShow:false,

                ErrorTips:""

            };

        case UpUIState.RESET_CLASS_NAME_HIDE:

            return {

                ...state,

                show:false

            };

        case UpUIState.RESET_CLASS_NAME_INPUT_CHANG:

            return {

                ...state,

                InputText:actions.data

            };

        case UpUIState.RESET_CLASS_NAME_TIPS_SHOW:

            return {

                ...state,

                ErrorTips:actions.data.title,

                ErrorTipsShow: true

            };


        case UpUIState.RESET_CLASS_NAME_TIPS_HIDE:

            return {

                ...state,

                ErrorTipsShow: false

            };


        default:

            return state;

    }

};

export default ResetNameModal;