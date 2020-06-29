import UpDataState from  '../../actions/UpDataState';
const ChangeInputValue = (state = '', actions)=>{
    switch (actions.type) {
        case UpDataState.CHANGE_INPUT_VALUE:
            console.log('a；'+actions.value)
            return {value:actions.value};
        default:
            return state;
    }
};

export default ChangeInputValue;