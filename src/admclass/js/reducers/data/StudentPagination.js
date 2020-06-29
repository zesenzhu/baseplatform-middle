import PaginationActions from '../../actions/PaginationActions';

const StudentPagination = (state={

    CurrentPage:1,

    Total:0

},actions) => {

    switch (actions.type) {


        case PaginationActions.STUDENT_PAGINATION_TOTAL_UPDATE:

            return { ...state,Total:actions.data };

        case PaginationActions.STUDENT_PAGINATION_CURRENT_UPDATE:

            return { ...state,CurrentPage:actions.data };

        default:

            return state;

    }

};

export default StudentPagination