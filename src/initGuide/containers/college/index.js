import React,{useEffect,useCallback,useMemo,useRef,useState,memo} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import GuideTitle from '../../components/guideTitle';

import {Tips,Table,Loading,PagiNation,Empty} from "../../../common";

import {Button} from "antd";

import { schoolCodeReg,schoolNameReg } from '../../actions/utils';

import {removeSlashUrl} from "../../actions/utils";

import {btnQueryAlertShow,hideSuccessAlert,successAlertShow} from "../../store/appAlert";

import GuideFooter from '../../components/guideFooter';

import {GetCollegeList,DeleteCollege} from '../../actions/apiActions';

import {guiderStepChange} from "../../store/guideStep";

import {appLoadingHide} from "../../store/appLoading";

import AddEditCollege from '../../components/addEditCollege';

import './index.scss';



function College(props) {


    //loading
    const [loading,setLoading] = useState(true);

    //table的loading
    const [tableLoading,setTableLoading] = useState(false);

    //分页
    const [pagination,setPagination] = useState({

       total:0,

       current:1,

       pageSize:10

    });

    //数据源
    const [dataSource,setDataSource] = useState([]);

    //添加或编辑学院弹窗
    const [addEditCollege,setAddEditCollege] = useState({

        show:false,

        isEdit:false,

        CollegeCode:'',

        CollegeName:'',

        CollegeID:''

    });


    const {UserType,UserID,UserClass,SchoolID} = useSelector(state=>state.LoginUser);

    const appLoading = useSelector(state=>state.appLoading);

    const dispatch  = useDispatch();

    const {history} = props;

    const paginationRef = useRef(pagination);

    const schoolIDRef = useRef(SchoolID);

    const AddEditCollegeRef = useRef();




    useEffect(()=>{

        schoolIDRef.current = SchoolID;

    },[SchoolID]);


    useEffect(()=>{

        if (UserID){

            dispatch(guiderStepChange(2));

            if (SchoolID){

                GetCollegeList({SchoolID,dispatch}).then(data=>{

                    if (data){

                        const list = data.List&&data.List.length>0?data.List.map((i,k)=>{

                            const OrderNO = createNO(k);

                            const key = OrderNO;

                            return {...i,OrderNO,key};

                        }):[];

                        const current = data.currentIndex?data.currentIndex:1;

                        const total = data.totalCount?data.totalCount:0;

                        setDataSource(list);

                        setPagination(d=>{

                            paginationRef.current = {...d,current,total};

                            return {...d,current,total};

                        });

                    }

                    setLoading(false);

                    dispatch(appLoadingHide());

                });

            }else{

                history.push('/schoolSetting');

            }

        }

    },[UserID]);


    const columns = useMemo(()=>{

        return [

            {

                title:'',

                align:'center',

                dataIndex:'OrderNO',

                width:90,

                render:(i)=>{

                    return <div className={"order-no"}>{i}</div>

                }

            },

            {

                title:'院系名称',

                dataIndex:'CollegeName',

                align:'left',

                width:300,

                className:'college-name-th',

                render:(i,data)=>{

                    return(

                        <div className={"college-name"} title={i}>{i}</div>

                    )

                }

            },

            {

                title:'编号',

                dataIndex:'CollegeCode',

                align:'center',

                width:200,

                render:(i,data)=>{

                    return(

                        <div className={"college-code"} title={i}>{i}</div>

                    )

                }

            },

            {

                align:'center',

                width:260,

                render:()=>{

                    return(

                        <div className={"college-blank"}></div>

                    )

                }

            },

            {

                title:'操作',

                align:'center',

                render:(data)=>{

                    return(

                        <div className={"coopreate"}>

                            <Button type={"link"} className={"edit"} onClick={e=>editCollege({CollegeID:data.CollegeID,CollegeCode:data.CollegeCode,CollegeName:data.CollegeName})}>编辑</Button>

                            <Button type={"link"} className={"del"} onClick={e=>delCollege(data.CollegeID)}>删除</Button>

                        </div>

                    )

                }

            }

        ]

    },[]);


    //生成序号函数
    const createNO = useCallback((key)=>{

        const {current,pageSize} = paginationRef.current;

        const num = (current - 1)*pageSize + (key+1);

        const NO = num<10?`0${num}`:num;

        return NO;

    },[]);


    //分页内容变化

    const pageSizeChange = useCallback((current,size)=>{

        setPagination(d=>{

            paginationRef.current = {...d,pageSize:size};

            updateTable();

            return {...d,pageSize:size};

        });

    },[]);

    //分页页码变化
    const pageChange = useCallback((current)=>{

        setPagination(d=>{

            paginationRef.current = {...d,current};

            updateTable();

            return {...d,current};

        });

    },[]);


    //更新学院信息
    const updateTable = ()=>{

        const {current,pageSize} = paginationRef.current;

        setTableLoading(true);

        GetCollegeList({SchoolID:schoolIDRef.current,dispatch,index:current,pageSize}).then(data=>{

            if (data){

                const list = data.List&&data.List.length>0?data.List.map((i,k)=>{

                    const OrderNO = createNO(k);

                    const key = OrderNO;

                    return {...i,OrderNO,key};

                }):[];

                const current = data.currentIndex?data.currentIndex:1;

                const total = data.totalCount?data.totalCount:0;

                setDataSource(list);

                setPagination(d=>{

                    paginationRef.current = {...d,current,total};

                    return {...d,current,total};

                });

            }

            setTableLoading(false);

        });

    };

    //添加学院
    const addCollege = useCallback(()=>{

        setAddEditCollege(d=>{

           return { ...d,show:true,isEdit:false };

        });

    },[]);

    //关闭弹窗
    const closeModal = useCallback(()=>{

        const {modalInit} = AddEditCollegeRef.current;

        setAddEditCollege(d=>{

           modalInit();

           return {...d,show:false,CollegeCode:'',CollegeName:'',CollegeID:''};

        });

    },[]);


    //弹窗点击OK成功
    const okModal = useCallback(()=>{

        const {modalInit} = AddEditCollegeRef.current;

        setAddEditCollege(d=>{

            modalInit();

            updateTable();

            return {...d,show:false,CollegeCode:'',CollegeName:'',CollegeID:''};

        });

    },[]);


    //删除学院

    const delCollege = (CollegeIDs)=>{

        dispatch(btnQueryAlertShow({title:'确定要删除该学院吗?',cancelShow:'y',ok:e=>delCollegeOk(CollegeIDs)}))

    };

    //删除学院确定
    const delCollegeOk = (CollegeIDs)=>{

        DeleteCollege({SchoolID:schoolIDRef.current,CollegeIDs,dispatch}).then(data=>{

            if (data===0){

                hideSuccessAlert(dispatch);

                dispatch(successAlertShow({title:'删除成功'}));

                updateTable();

            }

        })

    };

    //编辑学院

    const editCollege = ({CollegeID,CollegeCode,CollegeName}) =>{

        setAddEditCollege(d=>{

           return {...d,CollegeName,CollegeCode,CollegeID,show:true,isEdit:true};

        });

    };


    //上一步
    const backStepClick = useCallback(()=>{

        history.push('/schoolSetting');

    },[]);

    //下一步
    const nextStepClick = useCallback(()=>{

        history.push('/yearAndTerm');

    },[]);


    return(

        <>

            <Loading spinning={loading} tip={"加载中,请稍候..."}>

                <GuideTitle title={"设置院系基础信息"} step={1} tips={"(可跳过，但需要先添加院系才能正常录入用户，后续可通过“系统设置”模块进行管理)"}></GuideTitle>

                <div className={"college-setting"}>

                    <div className={"college-title clearfix"}>

                        <div className={"tips"}>当前共有<span className={"red"}>{pagination.total}</span>个院系</div>

                        <div className={"add-wrapper"}>

                            <Button className={"add-college"} onClick={addCollege}>单个添加学院</Button>

                            <Button className={"import-college"}>批量导入学院</Button>

                        </div>

                    </div>

                    <Loading spinning={tableLoading} tip={"加载中,请稍候..."}>

                        {

                            dataSource.length>0?

                                <>

                                    <Table columns={columns} pagination={false} dataSource={dataSource}></Table>

                                    <PagiNation  onShowSizeChange={pageSizeChange} onChange={pageChange} hideOnSinglePage={pagination.pageSize===10} showSizeChanger current={pagination.current} total={pagination.total} pageSize={pagination.pageSize}></PagiNation>

                                </>

                            :

                            <Empty type={"3"} title={"暂无院系信息"}></Empty>

                        }


                    </Loading>

                    <GuideFooter backStepClick={backStepClick} nextStepClick={nextStepClick} next={true} back={true}></GuideFooter>

                </div>

            </Loading>

            <AddEditCollege ref={AddEditCollegeRef} CollegeID={addEditCollege.CollegeID} CollegeCode={addEditCollege.CollegeCode} CollegeName={addEditCollege.CollegeName} okModal={okModal} closeModal={closeModal} show={addEditCollege.show} isEdit={addEditCollege.isEdit}>


            </AddEditCollege>

        </>

    )

}

export default memo(College)