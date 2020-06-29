import LoadingAction from '../action/LoadingAction'

const UILoading = (state = {
    rankLoading: true,
    favoriteLoading: true
}, action) => {
    switch (action.type) {
        case LoadingAction.RANK_LOADING_SHOW:
            return {
                ...state,
                rankLoading: action.data
            }
        case LoadingAction.FAV_LOADING_SHOW:
            return {
                ...state,
                favoriteLoading: action.data
            }


        default:
            return state;
    }
};
export default UILoading