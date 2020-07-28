import UpUIState from '../../actions/UpUIState';
const GradeLoading = (state={show:true},actions) => {
    switch (actions.type) {
        case UpUIState.GRADE_LOADING_HIDE:
            return {...state,show:false};
        case UpUIState.GRADE_LOADING_SHOW:
            return {...state,show:true};
        default:
            return state;
    }
};
export default GradeLoading;