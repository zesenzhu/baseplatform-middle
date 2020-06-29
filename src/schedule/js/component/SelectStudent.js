import React,{useState,useImperativeHandle,useEffect,useRef,forwardRef,memo} from "react";

import { connect } from "react-redux";

import "../../scss/common/select-student-modal.scss";

import { Scrollbars } from "react-custom-scrollbars";

import apiActions from '../actions/ApiActions';

import alertActions from '../actions/AppAlertActions';

import {
    Search,
    Loading,
    CheckBox,
    CheckBoxGroup,
    Empty,
    DropDown
} from "../../../common";

import {useStateValue} from '../actions/hooks';

function SelectStudent(props,ref){

    //state

    const [loading,setLoading] = useState(true);

    const [contentLoading,setContentLoading] = useState(false);

    const [searchLoading,setSearchLoading] = useState(false);

    //年级state
    const [grade,setGrade] = useState({

        dropSelectd:{value:'',title:'全部年级'},

        dropList:[]

    });

    //学生相关的state
    const [stuList,setStuList] = useState({

        list:[],

        checkedList:[],

        checkedAll:false

    });


    //班级相关的state
    const [classInfo,setClassInfo] = useState({

        activeID:'',

        list:[]

    });

    const [search,setSearch] = useState({

        value:'',

        CancelBtnShow:'n',

        searchShow:false,

        searchList:[]

    });

    //redux

    const { dispatch,LoginUser } = props;

    const { SchoolID } = LoginUser;

    //props

    const {gradeClass,stuCheckedList} = props;


    //refs

    const stuListRef = useStateValue(stuList);

    const classInfoRef = useStateValue(classInfo);

    //初始化

    useEffect(()=>{


        const grade = gradeClass.map(i=>({value:i.id,title:i.name}));

        grade.unshift({value:'',title:'全部年级'});

        const list = [];

        gradeClass.map(i=>i.list.map(item=>{

            list.push({ClassID:item.id,ClassName:item.name});

        }));

        setGrade(data=>({...data,dropList:grade}));

        setClassInfo(data=>({...data,list}));

        setStuList(data=>({...data,checkedList:stuCheckedList}));

        setLoading(false);


    },[]);



    //年级切换

    const gradeChange = (e) => {

        setGrade(data=>({...data,dropSelectd:e}));

        const { value } = e;

        let classList = [];

        if (e.value){

            classList = gradeClass.find(i=>i.id===value).list.map(i=>({ClassID:i.id,ClassName:i.name}));

        }else{

            gradeClass.map(i=>{

                i.list.map(item=>{

                    classList.push({ClassID:item.id,ClassName:item.name});

                })

            });

        }

        setStuList(data=>({...data,list:[],checkedAll:false}));

        setClassInfo(data=>({...data,activeID:'',list:classList}));

        if (search.searchShow){

            updateSearch('',e.value);

        }

    };

    //搜索
    const onClickSearch = value => {

        let result = /^[A-Za-z0-9]{1,30}$|^[a-zA-Z0-9_.·\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_.·\u4e00-\u9fa5]$/.test(value.value);

        if (result){

            setSearch(data=>{

               updateSearch(value.value);

               return {...data,CancelBtnShow:'y',searchShow:true};

            });


        }else{

            dispatch(alertActions.alertWarn({title:'输入的学生名称或学号不正确'}));

        }

    };

    //点击左侧
    const onClickTabClick = id => {

        setClassInfo(e=>{

           updateStuList(id);

           return {...e,activeID:id};

        });

    };
    //全选
    const onSelectAllClick = checked => {

        let copyCheckList = Array.from(stuList.checkedList);

        let checkedAll = false;

        if (checked){

            copyCheckList = stuList.checkedList.filter(i=>i.ClassID!==classInfo.activeID);

        }else{

            stuList.list.map(i=>{

               const index = copyCheckList.findIndex(item=>item.StudentID===i.StudentID);

               if(index===-1){

                   copyCheckList.push(i)

               }

            });

            checkedAll = true;

        }

        setStuList(data=>({...data,checkedAll,checkedList:copyCheckList}));

    };
    //点击checkBox组
    const onChangeCheckBox = item => {

        let copyCheckedList = Array.from(stuList.checkedList);

        /*const index = copyList.findIndex(i=>i.StudentID===item.StudentID);

        let finalCheckedList = copyCheckedList;

        let checkedAll = false;

        if (copyList[index].checked){

            finalCheckedList = copyCheckedList.filter(i=>i.StudentID!==item.StudentID);


        }else{

            finalCheckedList.push(item);

        }

        copyList[index].checked?copyList[index].checked=false:copyList[index].checked=true;

        checkedAll = (copyList.filter(i=>i.checked===false).length===0);

        setStuList(data=>({...data,list:copyList,checkedList:finalCheckedList,checkedAll}));
*/

        const index = copyCheckedList.findIndex(i=>i.StudentID===item.StudentID);

        if (index>=0){

            copyCheckedList = stuList.checkedList.filter(i=>i.StudentID!==item.StudentID);

        }else{

            copyCheckedList.push(item);

        }

        let checkedAll = copyCheckedList.filter(i=>i.ClassID===classInfo.activeID).length===stuList.list.length;

        setStuList(data=>({...data,checkedAll,checkedList:copyCheckedList}));

    };



    // 取消搜索
    const onCancelSearch = e => {

        setSearch(data=>({...data,CancelBtnShow:'n',value:'',searchShow:false}));

        const gradeID = grade.dropSelectd.value;



    };

    useImperativeHandle(ref,()=>({

        stuCheckedList:stuList.checkedList

    }));

    //更新學生列表
    const updateStuList = (ClassID) =>{

        setContentLoading(true);

        const { activeID } = classInfoRef.current;

        const { list,checkedList } = stuListRef.current;

        apiActions.GetSudentInfoByClassIDAndKey({dispatch,ClassID:ClassID?ClassID:activeID,Key:''}).then(data=>{

            if (data){

                const checkList = checkedList.filter(i=>i.ClassID===ClassID);

                const checkedAll = checkList.length===data.length;

                setStuList(e=>({...e,list:data,checkedAll}));

            }

            setContentLoading(false);

        });

    };


    //更新搜索列表
    const updateSearch = (key,gradeID) =>{

        setSearchLoading(true);

        apiActions.GetStudentForAddOrEditCourseClassByKey({dispatch,schoolID:SchoolID,gradeID:gradeID?gradeID:grade.dropSelectd.value,key:key?key:search.value}).then(data=>{

            if (data){

                setSearch(e=>({...e,searchList:data}));

            }

            setSearchLoading(false);

        });

    };


    return (

        <div  ref={ref} id="SelectStudent" className="selectStudent-box">

            <div className="box-top">

                <DropDown

                    dropSelectd={grade.dropSelectd}

                    dropList={grade.dropList}

                    onChange={gradeChange}

                    height={300}

                >

                </DropDown>

                <Search
                    className="top-search"
                    placeHolder="请输入学号或姓名进行搜索..."
                    width="280"
                    Value={search.value}
                    onChange={e=>{e.persist();setSearch(d=>({...d,value:e.target.value}))}}
                    onCancelSearch={onCancelSearch}
                    CancelBtnShow={search.CancelBtnShow}
                    onClickSearch={onClickSearch}
                >

                </Search>

            </div>

            <Loading spinning={loading}>

                <div className="box-content" style={{ height:437 }}>

                    {

                        search.searchShow?

                            <ul className="selectStudent" style={{width:680,height:437}}>

                                <Loading spinning={searchLoading}>

                                    <Scrollbars style={{height: 437}}>

                                        {

                                            search.searchList.length>0?search.searchList.map((i,k)=>{

                                                    const checked = stuList.checkedList.findIndex(item=>item.StudentID===i.StudentID)>=0;

                                                    return  <li key={k}>

                                                        <CheckBox className="selectAll" type="gray" onClick={e=>onChangeCheckBox(i)} checked={checked}>

                                                            <span title={i.StudentName} className="studentName">{i.StudentName}</span>

                                                            <span title={i.StudentID} className="studentID">{"[" + i.StudentID + "]"}</span>

                                                        </CheckBox>

                                                    </li>

                                                })

                                                :

                                                <Empty type="4" title="暂无符合条件的学生" style={{marginTop:238, transform: "translateY(-50%)"}}></Empty>

                                        }

                                    </Scrollbars>

                                </Loading>

                            </ul>

                            :

                            <div className={"content-wrapper"}>

                                <div className={"left-wrapper"}>

                                    {

                                        classInfo.list.length ?

                                            <Scrollbars style={{height: 437,float: "left",margin: 0}}>

                                                <ul className="selectClassBox" style={{ height:437, margin: 0 }}>

                                                    {
                                                        classInfo.list.map((i,k) => {
                                                            return (

                                                                <li title={i.ClassName} onClick={e=>onClickTabClick(i.ClassID)} className={`selectContent ${classInfo.activeID===i.ClassID?"active":""}`} key={k}>{i.ClassName}</li>

                                                            );
                                                        })}

                                                </ul>

                                            </Scrollbars>

                                            :

                                            <Empty type="4" title="暂无符合条件的学生" style={{ marginTop:238,transform:"translateY(-50%)" }}></Empty>

                                    }

                                </div>

                                <div className={"right-content"}>

                                    <Loading spinning={contentLoading} style={{ height:438 }}>

                                        <ul className="selectStudent" style={{width:502,height:438}}>

                                            {

                                                stuList.list.length?

                                                     <>

                                                        <li className="selectAllBox">

                                                            <CheckBox className="selectAll" type="gray" onClick={e=>onSelectAllClick(stuList.checkedAll)} checked={stuList.checkedAll}>全选</CheckBox>

                                                        </li>

                                                        <Scrollbars style={{height:390}}>

                                                                {

                                                                    stuList.list.map((i,k)=>{

                                                                        const checked = stuList.checkedList.findIndex(item=>item.StudentID===i.StudentID)>=0;

                                                                        return <li key={k}>

                                                                            <CheckBox type="gray" title={i.StudentName} checked={checked} onClick={e=>onChangeCheckBox(i)} >{i.StudentName}</CheckBox>

                                                                        </li>

                                                                    })

                                                                }

                                                        </Scrollbars>

                                                     </>

                                                    :

                                                    <Empty type="4" title={classInfo.activeID?'暂无符合条件的学生':'请选择班级'} style={{marginTop:238, transform: "translateY(-50%)"}}></Empty>

                                            }

                                        </ul>

                                    </Loading>

                                </div>

                            </div>

                    }

                </div>

            </Loading>

        </div>

    );

}


const mapStateToProps = (state) => {

  const { LoginUser } = state;

  return { LoginUser };

};

export default connect(mapStateToProps,null,null,{forwardRef:true})(memo(forwardRef(SelectStudent)));
