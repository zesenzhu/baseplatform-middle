import UpDataState from '../../actions/UpDataState';



const GetPicUrl = (state = {
    picUrl: '',
    picObj: ''
}, actions) => {
    switch (actions.type) {
        case UpDataState.GET_PIC_URL:
            return Object.assign({}, state, { picUrl: actions.data });

        case UpDataState.GET_PIC_OBJECT:
            return Object.assign({}, state, { picObj: actions.data })
        default:
            return state;
    }
};

export default GetPicUrl;