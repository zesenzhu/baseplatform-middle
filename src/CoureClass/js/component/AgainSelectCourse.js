import React,{useState,useEffect,useRef,useImperativeHandle,forwardRef,useContext,memo,useMemo} from 'react';

import {connect} from 'react-redux';

import {Modal,Loading,Search,DropDown,Empty} from "../../../common";

import {GetCombinationForStu,GetCourseClassInfoBySubject} from '../actions/apiActions';

import {useSetState,useStateValue} from "../actions/hooks";

import appAlertActions from '../actions/appAlertActions';

import {Button} from "antd";

import {Scrollbars} from 'react-custom-scrollbars';

const ButtonGroup = Button.Group;


function AgainSelectCourse(props) {


    //初次加载
    const [firstLoad,setFirstLoad] = useState(true);

    //loading
    const [loading,setLoading] = useState(true);

    //活动状态的教学班
    const [activeCourseClass,setActiveCourseClass] = useState([]);

    //教学班列表
    const [courseClassList,setCourseClassList] = useState([]);

    //搜索相关的
    const [search,setSearch] = useSetState({

        CancelBtnShow:'n',

        value:'',

        loading:false

    });


    //drop选择

    const [selectdCourse,setSelectdCourse] = useSetState({

       dropSelectd:{value:'',title:''},

       dropList:[]

    });

    //学科list

    const [subList,setSubList] = useSetState({

       list:[],

       activeID:'',

       allList:[]

    });




    //props

    const { show,dispatch,LoginUser } = props;

    const { SchoolID,UserID,UserType } = LoginUser;

    //function
    const { modalOk,modalCancel } = props;


    //ref

    const subListRef = useStateValue(subList);

    const activeListRef = useStateValue(activeCourseClass);

    const activeDropRef = useStateValue(selectdCourse);




    useEffect(()=>{

        if (show&&firstLoad){

            GetCombinationForStu({UserID,UserType,dispatch}).then(data=>{

                if (data){

                    const { CombinationItem,SubjectItem } = data;

                    const list = CombinationItem&&CombinationItem.length>0?CombinationItem.map(i=>({value:i.CombinationSubjects,title:i.CombinationName})):[]

                    const allList = SubjectItem&&SubjectItem.length>0?SubjectItem:[];

                    const dropSelectd = list[0];

                    const subList = dropSelectd.value.split(',').map(i=>{

                        const it = SubjectItem.find(item=>item.SubjectID===i);

                        return it;

                    });

                    const activeID = subList[0].SubjectID;

                    GetCourseClassInfoBySubject({SchoolID,UserID,SubjectID:activeID,Key:'',dispatch}).then(data=>{

                        const arr = data&&data.length>0?data:[];

                        const activeCourseList = subList.map(i=>({SubjectID:i.SubjectID,CourseClassID:''}));

                        setSelectdCourse({dropSelectd,dropList:list});

                        setSubList({list:subList,activeID,allList});

                        setCourseClassList(arr);

                        setActiveCourseClass(activeCourseList);

                        setLoading(false);

                    })

                }

            });

            setFirstLoad(false);

        }

    },[show]);


    //选择某一个教学班
    const courseSelect = ({SubjectID,CourseClassID}) => {

        const arr = Array.from(activeListRef.current);

        const findIndex = arr.findIndex(i=>i.SubjectID===SubjectID);

        console.log(CourseClassID,arr);

        arr[findIndex].CourseClassID=CourseClassID;

        setActiveCourseClass(arr);

    };


    //搜索进行

    const searchClick = (e) =>{

        const key = e.value.trim();

        const result = /^[A-Za-z0-9]{1,30}$|^[a-zA-Z0-9_.·\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_.·\u4e00-\u9fa5]$/.test(key);

        if (result){

            const { activeID } =  subListRef.current;

            updataTableData(activeID,key);

            setSearch({CancelBtnShow:'y'});

        }else{

            appAlertActions.alertWarn({title:'输入的教师姓名或班级名称格式不正确'});

        }


    };


    //取消搜索

    const searchCancel = () => {

        const { activeID } = subListRef.current;

        setSearch({CancelBtnShow:'n',value:''});

        updataTableData(activeID,'');

    };


    //切换subject

    const subChange = (SubjectID) =>{

        setSubList({activeID:SubjectID});

        setSearch({ CancelBtnShow:'n', value:'', loading:false});

        updataTableData(SubjectID,'');

    };


    //选取的走班方式改变

    const dropChange = (e) =>{

        const {allList} = subListRef.current;

        const list = e.value.split(',').map(i=>{

            const it = allList.find(item=>item.SubjectID===i);

            return it;

        });

        const activeList = list.map(i=>({SubjectID:i.SubjectID,CourseClassID:''}));

        setSubList({list,activeID:list[0].SubjectID});

        setSelectdCourse({dropSelectd:e});

        setActiveCourseClass(activeList);

        setSearch({CancelBtnShow:'n',value:'',loading:false});

        updataTableData(list[0].SubjectID,'');

    };



    //点击确定

    const courseClassOk = () =>{

        let hasSelectAll =  true;
        
        activeListRef.current.map(i=>{

           if (!i.CourseClassID){

               hasSelectAll = false;

           }

        });

        if (hasSelectAll){

            const { dropSelectd } = activeDropRef.current;

            const CourseClassIDs = activeListRef.current.map(i=>i.CourseClassID).join(',');

            let obj = { SubjectIDs:dropSelectd.value,CourseClassIDs};

            setLoading(true);

            modalOk(obj,hideLoading,modalInit);

        }else{

            dispatch(appAlertActions.alertWarn({title:'还有学科对应的教学班并未选择，请先选择学科对应的教学班'}));

        }


    };


    const hideLoading = () =>{

        setLoading(false);

    };

    const courseClassCancel = () =>{

        modalCancel();

        modalInit();

    };

    //弹窗初始化
    const modalInit = () =>{

        //初次加载
        setFirstLoad(true);

        //loading
        setLoading(true);

        //活动状态的教学班
        setActiveCourseClass([]);

        //教学班列表
        setCourseClassList([]);

        //搜索相关的
        setSearch({

            CancelBtnShow:'n',

            value:'',

            loading:false

        });


        //drop选择

        setSelectdCourse({

            dropSelectd:{value:'',title:''},

            dropList:[]

        });

        //学科list

        setSubList({

            list:[],

            activeID:'',

            allList:[]

        });

    };


    //更新教学班列表
    const updataTableData = (SubjectID,searchKey)=>{

        const Key = searchKey;

        setSearch({loading:true});



        GetCourseClassInfoBySubject({SchoolID,UserID,Key,SubjectID,dispatch}).then(data=>{

            const  arr = data&&data.length>0?data:[];

            setCourseClassList(arr);

            setSearch({loading:false});

        });

    };


    return(

        <Modal
            className="again-select-course-modal"

            bodyStyle={{padding:20}}

            width={640}

            type="1"

            destroyOnClose={true}

            title={'重新选课'}

            visible={show}

            onOk={courseClassOk}

            onCancel={courseClassCancel}

        >

            <Loading spinning={loading} opacity={false}>

                <div className={"modal-content"}>

                    <div className={"box-top clearfix"}>

                        <div className={"props"}>选择走班组合方式:</div>

                        <DropDown

                            width={200}

                            dropSelectd={selectdCourse.dropSelectd}

                            dropList={selectdCourse.dropList}

                            height={300}

                            style={{zIndex:10}}

                            onChange={dropChange}

                        >


                        </DropDown>

                    </div>

                    <div className={"box-content clearfix"}>

                        <div className={"props"}>选择教学班:</div>

                        <div className={"course-select-wrapper"}>

                            <div className={"btns-wrapper"}>

                                <ButtonGroup>

                                    {

                                        subList.list.map((i,k)=>{

                                            return(

                                                <Button key={k} type={subList.activeID===i.SubjectID?'primary':''} onClick={e=>subChange(i.SubjectID)}>{i.SubjectName}</Button>

                                            )

                                        })

                                    }

                                </ButtonGroup>

                            </div>

                            <div className={"course-class-wrapper"}>

                                <div className={"top-search clearfix"}>

                                    <Search

                                        width={320}

                                        placeHolder={"请输入教学班名称或教师姓名进行搜索"}

                                        Value={search.value}

                                        CancelBtnShow={search.CancelBtnShow}

                                        onChange={e=>setSearch({value:e.target.value})}

                                        onClickSearch={searchClick}

                                        onCancelSearch={searchCancel}

                                    >

                                    </Search>

                                </div>

                                <Loading spinning={search.loading}>

                                    <ul className={"course-class-list-wrapper"}>

                                        <Scrollbars style={{height:260}}>

                                            {

                                                courseClassList.length>0?

                                                    courseClassList.map((i,k)=>{

                                                        const activeClassID = activeCourseClass.find(item=>item.SubjectID===subList.activeID)?activeCourseClass.find(item=>item.SubjectID===subList.activeID).CourseClassID:'';

                                                        return <li key={k} className={"clearfix"}>

                                                            <div className={"class-name"} title={i.CourseClassName}>{i.CourseClassName}</div>

                                                            <div className={"teacher-name"} title={i.TeacherName}>{i.TeacherName}</div>

                                                            <div className={"count"} title={`${i.StudentCount}人`}>{i.StudentCount}人</div>

                                                            <div className={"opreate"}>

                                                                <Button type={"primary"} onClick={i.CourseClassID!==activeClassID?e=>courseSelect({SubjectID:i.SubjectID,CourseClassID:i.CourseClassID}):()=>{}} className={i.CourseClassID===activeClassID?'active':''} size={"small"}>{i.CourseClassID===activeClassID?'已选择':'选择'}</Button>

                                                            </div>


                                                        </li>

                                                    })

                                                    :

                                                    <Empty type={"3"} title={`暂无教学班数据`}></Empty>

                                            }

                                        </Scrollbars>

                                    </ul>


                                </Loading>


                            </div>

                        </div>

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


export default connect(mapStateToProps)(memo(AgainSelectCourse));