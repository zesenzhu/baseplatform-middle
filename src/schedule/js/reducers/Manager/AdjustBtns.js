import AdjustBtnsActions from '../../actions/Manager/AdjustBtnsActions';

const AdjustBtns = (state={adjustBtnsShow:false},actions) => {

    switch (actions.type) {

        case AdjustBtnsActions.ADJUST_BTNS_TOGGLE:

            return {...state,adjustBtnsShow:!state.adjustBtnsShow};

        case AdjustBtnsActions.ADJUST_BTNS_HIDE:

            return {...state,adjustBtnsShow:false};

        default:

            return state;

    }

};

export default AdjustBtns