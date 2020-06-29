import UpDataState from  '../../actions/UpDataState';
const PeriodMsg = (state = '', actions)=>{
    switch (actions.type) {
        case UpDataState.GET_PERIOD_MSG:
            let newData = handleData(actions.data)
            return {value:newData};
        default:
            return state;
    }
};

function handleData (data = []){
    let initData = [{ value: 0, title: '全部学段'}];
    
    let newData = data.map((child,index) => {
        return {
            value:child.PeriodID,
            title:child.PeriodName,
            Grades:child.Grades
        }
    })
    let returnData = initData.concat(newData);
    
    return returnData;
}
export default PeriodMsg;