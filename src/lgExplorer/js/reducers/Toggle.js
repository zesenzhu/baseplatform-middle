
import ToggleOptions from "../action/HeadChange"
const toggle = (state = {

    tabActive: 'website',
}, action = {}) => {
    switch (action.type) {

        case ToggleOptions.Toggle_Website:
            return {
                ...state,
                tabActive: "website"
            };

        case ToggleOptions.Toggle_ResourceBase:

            return {
                ...state,
                tabActive: "resourceBase"
            };

        case ToggleOptions.Toggle_MyResourceBase:
            return {
                ...state,
                tabActive: "myResourceBase"
            }


        default:
            return state;
    }



};
export default toggle;