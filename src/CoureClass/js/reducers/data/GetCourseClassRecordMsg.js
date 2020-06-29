import UpDataState from '../../actions/UpDataState';
import history from '../../containers/history'


const GetCourseClassRecordMsg = (state = {}, actions) => {
    switch (actions.type) {
        case UpDataState.GET_COURSE_CLASS_RECORD_MSG:
            const {Item,...Total} = actions.data;
            let data = handleData(Item,actions.subject,actions.Class)
            return Object.assign({}, state, {tableSource:data,...Total} );
        default:
            return state;
    }
};

function handleData(Item) {
    // console.log(data )
    
    let newData = Item instanceof Array &&Item.map((child,index) => {
        let {Flag,OperateParams,CourseClassIDs,...Data} = child
        // let params = OperateParams.split('-');
        let indexOf = OperateParams.indexOf('-');
        let lastIndexOf = OperateParams.lastIndexOf('-');
        let params = [OperateParams.slice(0,indexOf),OperateParams.slice(indexOf+1,lastIndexOf),OperateParams.slice(lastIndexOf+1)]
        let OperateContent = '';
        params instanceof Array && params.map((param,key) => {
            if(key%2){
                
                OperateContent += `<span className='key-params'>${param}</span>`
                
            }else{
                OperateContent += param
            }
        })
        return {...Data,OperateParams:{OperateParams:params,Flag:Flag,CourseClassIDs:CourseClassIDs},key:index}
    })
    return newData
}
export default GetCourseClassRecordMsg;