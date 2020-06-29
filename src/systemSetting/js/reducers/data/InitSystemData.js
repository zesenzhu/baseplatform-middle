import UpDataState from '../../action/data/UpDataState';
 
const InitSystemData = (state = {InitSystemData:{
    Status:0,
    SchoolInfo:{},
    TermInfo:{}
}}, actions) => {
    let InitSystemData = {}
    switch (actions.type) {
        case UpDataState.GET_SYSSETTING_INIT_DATA:
            
            return Object.assign({}, state, {...actions.data} );
            case UpDataState.INSERT_NEW_CLASSL_MSG:
            
            let NewData = InsertData(allClass,actions.Class)
            return Object.assign({}, state, {allClass:NewData} );
        default:
            return state;
    }
};

export default InitSystemData;