import React,{memo} from 'react';

import './index.scss';

function ModuleLoading(props) {

    const {loading} = props;

    return(

        <div style={{display:loading?'block':'none'}} className={"module-loading"}><div className={"loading-title"}>加载中,请稍候...</div></div>

    )

}

ModuleLoading.defaultProps = {

    loading:false

};

export default memo(ModuleLoading);