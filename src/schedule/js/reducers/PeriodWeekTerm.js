import PeriodWeekTermActions from '../actions/PeriodWeekTermActions';
//学期周期学段reducer

const PeriodWeekTerm = (state={defaultPeriodIndex:0},actions) => {

    switch (actions.type) {

        case PeriodWeekTermActions.UPDATE_PERIOD_TERM_WEEK:

            return {...state,...actions.data};

        case PeriodWeekTermActions.PERIOD_VALUE_CHANGE:

            return {...state,defaultPeriodIndex:actions.key};

        default:

            return state;

    }

};

export default PeriodWeekTerm;