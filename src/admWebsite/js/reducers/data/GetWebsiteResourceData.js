import UpDataState from  '../../actions/UpDataState';
import Public from '../../../../common/js/public'
const GetWebsiteResourceData = (state = {Total:0,List:[],CurrentIndex:1}, actions)=>{
    let Data = {}
    switch (actions.type) {
        case UpDataState.GET_WEBSITE_RESOURCE_DATA:
            Data = handleData(actions.data)
            return Object.assign({},state,{...Data});
        default:
            return state;
    }
};

function handleData (data) {
    const {CurrentIndex,Total,List} = data;
    let NewList
    let TypeColor = {}
    if(!(List instanceof Array)){
        NewList = []
    }else{
        NewList = List.map((child,index)=> {
            let list = child;
            list.ImgUrl =  Public.UrlGetIcon(child.Url) + "/favicon.ico";
            if(TypeColor[child.SubTypeNamefield]===undefined){
                TypeColor[child.SubTypeNamefield] = index
            }
            list.TypeColor = TypeColor[child.SubTypeNamefield]
            return list
        })
    }
    return {List:NewList,Total:Total,CurrentIndex:CurrentIndex}
}

export default GetWebsiteResourceData;