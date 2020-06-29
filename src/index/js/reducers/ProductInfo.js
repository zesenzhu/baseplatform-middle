const PRODUCT_INFO_UPDATE = 'PRODUCT_INFO_UPDATE';

export const productInfoChange = (data) => {

    return {type:PRODUCT_INFO_UPDATE,data};

};

const defaultState = {

    ProductName:'',

    ProVersion:''

};

const ProductInfo = (state = defaultState,actions) =>{

    switch (actions.type) {

        case PRODUCT_INFO_UPDATE:

            return { ...state,...actions.data };

        default:

            return state;

    }

};

export default ProductInfo;