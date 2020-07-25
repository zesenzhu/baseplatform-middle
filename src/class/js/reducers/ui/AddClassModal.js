import UpUIState from '../../actions/UpUIState';
const  AddClassModal = (state={

    show:false,

    inputDisabled:true,

    inputValue:'',

    inputTipsShow:false,

    inputTips:'',

    selectTips:'请选择对应的年级！',

    selectTipsShow:false,

    selectValue:{value:0,title:"请选择年级"}

    }
    ,actions) => {
    switch (actions.type) {
        case UpUIState.ADD_CLASS_MODAL_SHOW:
            return {...state,show:true,inputDisabled:true,
                inputValue:'',inputTipsShow:false,inputTips:'',selectTips:'请选择对应的年级！',selectTipsShow:false,
                selectValue:{value:0,title:"请选择年级"}
            };
        case UpUIState.ADD_CLASS_MODAL_HIDE:
            return {...state,show:false};
        case UpUIState.ADD_CLASS_INPUT_DISABLED:
            return {...state,inputDisabled:true};
        case UpUIState.ADD_CLASS_INPUT_ABLED:
            return {...state,inputDisabled:false};
        case UpUIState.ADD_CLASS_INPUT_CHANGE:
            return {...state,inputValue:actions.value};
        case UpUIState.ADD_CLASS_SELECT_CHANGE:
            return {...state,selectValue:{...actions.selectValue}};
        case UpUIState.ADD_CLASS_SELECT_TIPS_SHOW:
            return {...state,selectTipsShow:true};
        case UpUIState.ADD_CLASS_SELECT_TIPS_HIDE:
            return {...state,selectTipsShow:false};
        case UpUIState.ADD_CLASS_SELECT_TIPS:
            return {...state,selectTips:actions.tips};
        case UpUIState.ADD_CLASS_INPUT_TIPS_SHOW:
            return {...state,inputTipsShow:true};
        case UpUIState.ADD_CLASS_INPUT_TIPS_HIDE:
            return {...state,inputTipsShow:false};
        case UpUIState.ADD_CLASS_INPUT_TIPS:
            return {...state,inputTips:actions.tips};
        default:
            return state;
    }
};
export default AddClassModal;