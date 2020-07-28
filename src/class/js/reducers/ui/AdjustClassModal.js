import UpUIState from '../../actions/UpUIState';
const AdjustClassModal = (state={show:false,
    gradeDropSelectd:{value:"none",title:"请选择年级"},
    classDropSelectd:{value:"none",title:"请选择班级"},
    classDisabled:true,
    gradeChecked:{value:"none",title:"请选择年级"},
    classChecked:{value:"none",title:"请选择班级"},
    classList:[],
    errTips:"请选择目标班级",
    errTipsShow:false
},actions) => {
    switch (actions.type) {
        case UpUIState.ADJUST_CLASS_MODAL_SHOW:
            return {...state,show:true,
                gradeDropSelectd:{value:"none",title:"请选择年级"},
                classDropSelectd:{value:"none",title:"请选择班级"},
                classDisabled:true,
                gradeChecked:{value:"none",title:"请选择年级"},
                classChecked:{value:"none",title:"请选择班级"},
                classList:[],
                errTips:"请选择目标班级",
                errTipsShow:false
            };
        case UpUIState.ADJUST_CLASS_MODAL_HIDE:
            return {...state,show:false};
        case UpUIState.ADJUST_CLASS_GRADE_CHANGE:
            return {...state,gradeChecked:actions.checked,gradeDropSelectd:actions.checked};
        case UpUIState.ADJUST_CLASS_CLASS_CHANGE:
            return {...state,classChecked:actions.checked,classDropSelectd:actions.checked};
        case UpUIState.ADJUST_CLASS_CLASS_LIST_UPDATE:
            return {...state,classList:actions.list};
        case UpUIState.ADJUST_CLASS_CLASSLIST_ABLED:
            return {...state,classDisabled:false};
        case UpUIState.ADJUST_CLASS_CLASSLIST_DISABLED:
            return {...state,classDisabled:true};
        case UpUIState.ADJUST_CLASS_ERROR_SHOW:
            return {...state,errTipsShow:true,tips:actions.tips};
        case UpUIState.ADJUST_CLASS_ERROR_HIDE:
            return {...state,errTipsShow:false};
        default:
            return state;
    }
}
export default AdjustClassModal;