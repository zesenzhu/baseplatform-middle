import UpDataState from '../../actions/UpDataState';
const StudentsPlainOptions = (state={

    list:[]

},actions) => {

    switch (actions.type) {

        case UpDataState.INIT_STUDEUNT_PLAIN_OPTIONS:

            return { ...state,list:actions.data};

        default:

            return state;

    }

};

export default StudentsPlainOptions;