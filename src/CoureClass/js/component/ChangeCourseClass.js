import React,{useState,useEffect,useRef,useImperativeHandle,forwardRef,useContext,memo,useMemo} from 'react';

import {connect} from 'react-redux';

import {Modal,Loading,Search,Table} from "../../../common";

import {GetCourseClassInfoBySubject} from '../actions/apiActions';

import {useSetState,useStateValue} from "../actions/hooks";

import appAlertActions from '../actions/appAlertActions';

import {Button} from "antd";
import actions from "../actions";


function ChangeCourseClass(props) {


    //初次加载
    const [firstLoad,setFirstLoad] = useState(true);

    //loading
    const [loading,setLoading] = useState(true);

    //活动状态的教学班
    const [activeID,setActiveID] = useState('');

    //数据源
    const [tableData,setTableData] = useSetState({

        dataSource:[],

        current:1

    });

    //搜索相关的
    const [search,setSearch] = useSetState({

        CancelBtnShow:'n',

        value:'',

        loading:false

    });




    //props

    const { show,subjectID,subjectName,courseClassID,dispatch,LoginUser } = props;

    const { SchoolID,UserID,UserType } = LoginUser;

    //function
    const { modalOk,modalCancel } = props;


    //ref

    const activeRef = useStateValue(activeID);

    const courseClassRef = useStateValue(courseClassID);




    useEffect(()=>{

        if (show&&firstLoad){

            setFirstLoad(false);

            GetCourseClassInfoBySubject({SchoolID,UserID,Key:'',SubjectID:subjectID,dispatch}).then(data=>{

                const  arr = data&&data.length>0?data:[];

                const list = arr.map((i,k)=>({

                    ...i,

                    rowKey:k,

                    key:k

                }));

                setTableData({dataSource:list,current:1});

                setActiveID(courseClassID);

                setLoading(false);

            });

        }

    },[show]);


    //选择某一个教学班
    const courseSelect = (i) => {

      setActiveID(i.CourseClassID);

    };


    //搜索进行

    const searchClick = (e) =>{

        const key = e.value.trim();

        const result = /^[A-Za-z0-9]{1,30}$|^[a-zA-Z0-9_.·\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_.·\u4e00-\u9fa5]$/.test(key);

        if (result){

            updataTableData(key);

            setSearch({CancelBtnShow:'y'});

        }else{

            appAlertActions.alertWarn({title:'输入的教师姓名或班级名称格式不正确'});

        }


    };


    //取消搜索

    const searchCancel = () => {

        setSearch({CancelBtnShow:'n',value:''});

        updataTableData('');

    };


    //课表分页变化

    const tablePageChange = (page) => {

        const { current } = page;

        setTableData({current});

    };


    //点击确定

    const courseClassOk = () =>{

        if(activeRef.current===courseClassRef.current){

            dispatch(appAlertActions.alertWarn({title:'班级没有发生变化'}));

        }else{

            modalOk(activeRef.current,hideLoading,modalInit);

        }

    };

    const courseClassCancel = () =>{

        modalCancel();

        modalInit();

    };

    const hideLoading = () => {

      setLoading(false);

    };


    const lookClassDetial = (CourseClassID) => {

        console.log(CourseClassID);

        dispatch(actions.UpUIState.CourseClassDetailsModalOpen());

        dispatch(actions.UpDataState.getCourseClassDetailsMsg(`/GetCourseClassDetail?courseClassID=${CourseClassID}`));

    };


    //弹窗初始化
    const modalInit = () =>{

        //初次加载
        setFirstLoad(true);

        //loading
        setLoading(true);

        //活动状态的教学班
        setActiveID('');

        //数据源
        setTableData({dataSource:[],current:1});

        //搜索相关的
        setSearch({CancelBtnShow:'n',value:'',loading:false});

    };


    const updataTableData = (searchKey)=>{

        const Key = searchKey;

        setSearch({loading:true});

        GetCourseClassInfoBySubject({SchoolID,UserID,Key,SubjectID:subjectID,dispatch}).then(data=>{

            const  arr = data&&data.length>0?data:[];

            const list = arr.map((i,k)=>({

                ...i,

                rowKey:k,

                key:k

            }));

            setTableData({dataSource:list,current:1});

            setSearch({loading:false});

        });

    };




    //memo数据

    const columns = useMemo(()=>{

        return [

            {

                align:'left',

                dataIndex:'CourseClassName',

                title:"班级名称",

                width:260,

                render:(i,k)=>{

                    return <a className={"course-class-name"} onClick={e=>lookClassDetial(k.CourseClassID)}>{i}</a>

                }

            },

            {

                align:'center',

                dataIndex:'TeacherName',

                title:"教师姓名",

                width:160,

                render:(i,k)=>{

                    return <div className={"teacher-name"}>{i}</div>

                }

            },

            {

                align:'center',

                dataIndex:'StudentCount',

                title:"上课人数",

                width:120,

                render:(i,k)=>{

                    return <div className={"stu-count"}>{i}人</div>

                }

            },

            {

                align:'center',

                title:"操作",

                width:140,

                render:(i,k)=>{

                    return <a   onClick={i.CourseClassID!==activeID?e=>courseSelect(i):()=>{}} className={`select ${i.CourseClassID===activeID?'active':''}`} size={"small"}>{i.CourseClassID===activeID?'已选择':'选择'}</a>

                }

            },

        ]

    },[activeID]);

    return(

        <Modal
            className="change-course-class-modal"

            bodyStyle={{height:452,padding:0}}

            width={680}

            type="1"

            destroyOnClose={true}

            title={<span className={"big-title"}>换班 <span className={"little-title"}>-${subjectName}</span></span>}

            visible={show}

            onOk={courseClassOk}

            onCancel={courseClassCancel}

        >

            <Loading spinning={loading} opacity={false}>

                <div className={"modal-content"}>

                    <div className={"box-top clearfix"}>

                        <Search

                            placeHolder={"请输入教学班名称或教师姓名搜索"}

                            width={320}

                            CancelBtnShow={search.CancelBtnShow}

                            Value={search.value}

                            onChange={e=>setSearch({value:e.target.value})}

                            onClickSearch={searchClick}

                            onCancelSearch={searchCancel}

                        >

                        </Search>

                    </div>

                    <div className={"box-content"}>

                        <Loading spinning={search.loading} >

                            <Table columns={columns} pagination={{hideOnSinglePage:true,pageSize:7,current:tableData.current}} onChange={tablePageChange} dataSource={tableData.dataSource}></Table>

                        </Loading>

                    </div>

                </div>

            </Loading>

        </Modal>

    )

}


const mapStateToProps = (state) =>{

    const { DataState } = state;

    const { LoginUser } = DataState;

    return {

        LoginUser

    }

};


export default connect(mapStateToProps)(memo(ChangeCourseClass));