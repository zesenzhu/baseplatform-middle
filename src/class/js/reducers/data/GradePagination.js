import PaginationActions from '../../actions/PaginationActions';

const GradePagination = (state={

    CurrentPage:1,

    Total:0

},actions) => {

    switch (actions.type) {


        case PaginationActions.GRADE_PAGINATION_TOTAL_UPDATE:

            return { ...state,Total:actions.data };

        case PaginationActions.GRADE_PAGINATION_CURRENT_UPDATE:

            return { ...state,CurrentPage:actions.data };

        default:

            return state;

    }

};

export default GradePagination