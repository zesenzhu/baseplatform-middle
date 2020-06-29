import UpDataState from  '../../actions/UpDataState';
import Public from '../../../../common/js/public'
const GetMenuData = (state = {
    PeriodList:[{ value: 0, title: "全部" }],
    SubjectList:[{ value: 0, title: "全部" }],
    TypeList:[{ value: 0, title: "全部" }]}, actions)=>{
    let Data = {}
    switch (actions.type) {
        case UpDataState.GET_PERIOD_DATA:
            Data = handlePeriod(actions.data)
            return Object.assign({},state,{PeriodList:Data});
            case UpDataState.GET_TYPE_DATA:
            Data = handleType(actions.data)
            return Object.assign({},state,{TypeList:Data});
            case UpDataState.GET_SUBJECT_DATA:
            Data = handleSubject(actions.data)
            return Object.assign({},state,{SubjectList:Data});
        default:
            return state;
    }
};

function handlePeriod (data) {
    let PeriodList=[]
    // console.log(data)
    data instanceof Array && data.map((child,index) => {
        let PeriodID = 0;
        if(child.PeriodId==='P1'){
            PeriodID = 1;
        }else if(child.PeriodId==='P2'){
            PeriodID = 2;
        }else if(child.PeriodId==='P3'){
            PeriodID = 4;
        }
        PeriodList.push({
            value:PeriodID,
            title:child.PeriodName
        })
    })
    return PeriodList
}
function handleType (data) {
    let TypeList=[]
    data instanceof Array && data.map((child,index) => {
        TypeList.push({
            value:child.SubTypeID,
            title:child.SubTypeName
        })
    })

    return TypeList
}
function handleSubject (data) {
    let SubjectList=[{ value: 0, title: "全部" }]
    data instanceof Array && data.map((child,index) => {
        SubjectList.push({
            value:child.SubjectID,
            title:child.SubjectName
        })
    })
    return SubjectList
}

export default GetMenuData;