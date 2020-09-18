import PostAction from "./PostAction";
import GetAction from "./GetAction";
let DataAction = {...PostAction, ...GetAction}
export default DataAction;
