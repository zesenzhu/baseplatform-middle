import React,{useEffect,useState,useRef,useMemo,memo,useCallback} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import './index.scss';

function Guider(props) {


    //guide的list


    const [guideList,setGuideList] = useState([]);

    const dispatch = useDispatch();

    const { UserID } = useSelector(state=>state.LoginUser);

    const schoolType = useSelector(state=>state.schoolType);

    const step = useSelector(state=>state.guideStep);

    useEffect(()=>{

        if (UserID){

            const {ProductUseRange,ProductType,LockerVersion} = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

            if (schoolType==='university'){

                let list = [

                    {

                        value:1,

                        title:'设置学校'

                    },

                    {

                        value:2,

                        title:'设置院系'

                    },

                    {

                        value:3,

                        title:'设置学年学期'

                    },

                    {

                        value:4,

                        title:'设置上课时间'

                    },

                    {

                        value:5,

                        title:'设置学科'

                    },

                    {

                        value:6,

                        title:'设置用户权限'

                    },

                    {

                        value:7,

                        title:'快速导入基础数据'

                    }

                ];

                if (parseInt(ProductType)===6){

                    if (parseInt(LockerVersion)===1){

                        list = [

                            {

                                value:1,

                                title:'设置学校'

                            },

                            {

                                value:2,

                                title:'设置院系'

                            },

                            {

                                value:3,

                                title:'设置学年学期'

                            },

                            {

                                value:4,

                                title:'设置上课时间'

                            },

                            {

                                value:5,

                                title:'快速导入基础数据'

                            }

                        ];

                    }else{

                        list = [

                            {

                                value:1,

                                title:'设置学校'

                            },

                            {

                                value:2,

                                title:'设置院系'

                            },

                            {

                                value:3,

                                title:'设置学年学期'

                            },

                            {

                                value:4,

                                title:'设置上课时间'

                            },

                            {

                                value:5,

                                title:'设置用户权限'

                            },

                            {

                                value:6,

                                title:'快速导入基础数据'

                            }

                        ];

                    }

                }else{

                    if (parseInt(LockerVersion)===1){

                        list = [

                            {

                                value:1,

                                title:'设置学校'

                            },

                            {

                                value:2,

                                title:'设置院系'

                            },

                            {

                                value:3,

                                title:'设置学年学期'

                            },

                            {

                                value:4,

                                title:'设置上课时间'

                            },

                            {

                                value:5,

                                title:'设置学科'

                            },
                            {

                                value:6,

                                title:'快速导入基础数据'

                            }

                        ];

                    }

                }

                setGuideList(list);

            }else if (schoolType==='middle'){

                let list = [

                    {

                        value:1,

                        title:'设置学校'

                    },

                    {

                        value:2,

                        title:'设置学年学期'

                    },

                    {

                        value:3,

                        title:'设置上课时间'

                    },

                    {

                        value:4,

                        title:'设置学科'

                    },

                    {

                        value:5,

                        title:'设置用户权限'

                    },

                    {

                        value:6,

                        title:'快速导入基础数据'

                    }

                ];

                if (parseInt(LockerVersion)===1){

                    list = [

                        {

                            value:1,

                            title:'设置学校'

                        },

                        {

                            value:2,

                            title:'设置学年学期'

                        },

                        {

                            value:3,

                            title:'设置上课时间'

                        },

                        {

                            value:4,

                            title:'设置学科'

                        },

                        {

                            value:5,

                            title:'快速导入基础数据'

                        }

                    ];

                }

                setGuideList(list);

            }

        }

    },[UserID]);

    return(

        <div className={"init-guider"}>

            <div className={"guider-wrapper"}>

                <div className="guide-title">

                    欢迎使用本平台，可以通过以下向导对平台快速进行初始化<span className={"guide-tips"}>（后续也可以通过其他功能模块进行高级参数设置）:</span>

                </div>

                <div className={"guide-content-wrapper"}>

                    <ul className={"guide-list"}>

                        {

                            guideList.map((i,k)=>{

                                return <li key={i.value} className={`guide-item ${i.value<step?'end':i.value===step?'going':''}`} style={{left:(860/(guideList.length-1))*k}}>{i.title}</li>

                            })

                        }

                    </ul>

                </div>

            </div>

        </div>

    )

}

export default memo(Guider);