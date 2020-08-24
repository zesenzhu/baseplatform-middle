import React,{useEffect,useState,useCallback,useMemo,memo,useRef} from 'react';

import {Button} from 'antd';

import './index.scss';

function LinkBtn(props) {

    const {type,children,className} = props;

    const {onClick} = props;

    return <Button  onClick={onClick} className={`link-btn ${type?type:''} ${className?className:''}`} type={"link"}>{children}</Button>

}

LinkBtn.defaultProps = {

    type:'archives', //类型说明：archives:学生学籍档案管理 reset:重置密码,data:学生活动大数据中心,

    //score:学生成绩,comment:综合素养评价，all:查看全部,edit:编辑

    className:'',

    onClick:()=>{



    }

};

export default memo(LinkBtn);
