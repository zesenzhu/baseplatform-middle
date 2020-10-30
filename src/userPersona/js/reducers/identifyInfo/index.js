import {IDENTIFY_INFO_CHANGE} from "../../actions/identifyInfoActions";

const identifyInfo = (state=[],actions)=>{

    switch (actions.type) {

        case IDENTIFY_INFO_CHANGE:

            return actions.data;

        default:

            return state;

    }

};


export default identifyInfo;