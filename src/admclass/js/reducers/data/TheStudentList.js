import UpDataState from '../../actions/UpDataState';

import SearchActions from "../../actions/SearchActions";


const TheStudentList = (state={

    SearchKey:'',

    WrapperLoading:false,

    SearchBtnShow:'n',

    SearchResultTipsShow:false,

    TotalShow:true,

    SearchKeyResult:''

},actions) => {

    switch (actions.type) {

        case UpDataState.GET_THE_CLASS_STUDENTS:

            return {...state,...actions.data};

        case SearchActions.MANAGER_STUDENT_SEARCH_INIT:

            return {

                ...state,

                SearchKey:'',

                WrapperLoading:false,

                SearchBtnShow:'n',

                SearchResultTipsShow:false,

                TotalShow:true,

                SearchKeyResult:''

            };

        case UpDataState.STUDENT_SEARCHKEY_CHANGE:

            return { ...state,SearchKey:actions.data };

        case UpDataState.STUDENT_WRAPPER_LOADING_SHOW:

            return { ...state,WrapperLoading:true };

        case UpDataState.STUDENT_WRAPPER_LOADING_HIDE:

            return { ...state,WrapperLoading:false };

        case SearchActions.MANAGER_STUDENT_CLOSE_SEARCH_BTN_HIDE:

            return {...state,SearchBtnShow:'n'};

        case SearchActions.MANAGER_STUDENT_CLOSE_SEARCH_BTN_SHOW:

            return {...state,SearchBtnShow:'y'};

        case SearchActions.MANAGER_STUDENT_TOTAL_SHOW:

            return {...state,TotalShow:true};

        case SearchActions.MANAGER_STUDENT_TOTAL_HIDE:

            return {...state,TotalShow:false};

        case SearchActions.MANAGER_STUDENT_SEARCH_RESULT_TIPS_SHOW:

            return { ...state,SearchResultTipsShow:true };

        case SearchActions.MANAGER_STUDENT_SEARCH_RESULT_TIPS_HIDE:

            return { ...state,SearchResultTipsShow:false };

        case SearchActions.MANAGER_STUDENT_SEARCH_RESULT_KEY_CHANGE:

            return { ...state,SearchKeyResult:state.SearchKey };

        default:

            return state;

    }

};
export default TheStudentList;