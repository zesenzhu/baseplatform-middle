import React,{useState,useEffect,useRef,useMemo,useContext,memo} from 'react';

import {Modal, Loading, Search,Empty} from "../../common";

import {Scrollbars} from 'react-custom-scrollbars';

import {StateContext} from "./ReduxConatiner";

import {useSetState,useStateValue} from "../api/hooks";

import {GetSubstituteTeacherInfo,ChangeTeacher} from '../api/index';

import {showSuccessAlert, showWarnAlert} from "../store/appAlert";

function ChangeTeacherModal(props){

    const [loading,setLoading] = useSetState(true,true);

    const {state,dispatch} = useContext(StateContext);

    //搜索
    const [search,setSearch] = useSetState({

        value:'',

        CancelBtnShow:'n',

        searchWrapperShow:false,

        searchLoading:false,

        list:[]

    });

    const [teacherList,setTeacherList] = useSetState([],true);

    const [activeTeacherID,setActiveTeacherID] = useSetState('',true);

    const { ScheduleInfo,UserInfo } = state;

    const { SchoolID,UserID,UserType } = UserInfo;

    const { ItemClassRoomType=[],ItemSchedule=[] } = ScheduleInfo?ScheduleInfo:{};

    const { TeacherID='',TeacherName='',SubjectID='',ClassDate,ClassHourNO } = ItemSchedule.length>0?ItemSchedule[0]:{};


    //ref

    const activeTeacherIDRef = useStateValue(activeTeacherID);

    const scheduleRef = useStateValue(ItemSchedule[0]);

    const userInfoRef = useStateValue(UserInfo);

    useEffect(()=>{

        if (ScheduleInfo&&loading){

            GetSubstituteTeacherInfo({SchoolID,SubjectID,ClassDate,ClassHourNO,dispatch}).then(data=>{

               const list = data&&data.length>0?data.filter(i=>i.TeacherID!==TeacherID):[];

               setTeacherList(list);

               setLoading(false);

            });

        }

    },[ScheduleInfo]);



    //搜索点击
    const searchClick = () => {

        const pattern =  /^[A-Za-z0-9]{1,30}$|^[a-zA-Z0-9_.·\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_.·\u4e00-\u9fa5]$/;

        const key = search.value;

        if (pattern.test(key)){

            setSearch({CancelBtnShow:'y',searchWrapperShow:true,searchLoading:true});

            GetSubstituteTeacherInfo({SchoolID,SubjectID,ClassDate,ClassHourNO,Key:key,dispatch}).then(data=>{

                const list = data&&data.length>0?data.filter(i=>i.TeacherID!==TeacherID):[];

                setSearch({list,searchLoading:false});

            });

        }else{

            showWarnAlert({title:'输入的教师姓名格式不正确',dispatch});

        }

    };

    //取消搜索

    const searchCancel = () => {

        setSearch({value:'',CancelBtnShow:'n',searchWrapperShow:false});

    };

    //提交
    const scheduleCommit = () =>{

        const { ClassHourNO,ClassDate,TeacherID,ScheduleID } = scheduleRef.current;

        const { SchoolID,UserID } = userInfoRef.current;

      if (activeTeacherIDRef.current){

          setLoading(true);

          ChangeTeacher({SchoolID,UserID,ClassHourNO,ClassDate,TeacherID,ScheduleID,ScheduleTeacherID:activeTeacherIDRef.current,dispatch}).then(data=>{

              if (data===0){

                  showSuccessAlert({title:'找人代课成功',dispatch});

                  if (window.parent){

                      window.parent.postMessage('updateCourse','*');

                  }else{

                      window.postMessage('updateCourse','*');

                  }

              }

              setLoading(false);

          });

      }else{

          showWarnAlert({title:'请选择任课教师',dispatch});

      }

    };

    const closeModal = () =>{

        if (window.parent){

            window.parent.postMessage('closeIframe','*')

        }else{

            window.postMessage('closeIframe','*');

        }

    };


        return (

            <Modal type={1}

                   title='选择代课教师'

                   visible={true}

                   width={680}

                   bodyStyle={{height:324,padding:0}}

                   mask={true}

                   cancelText="取消"

                   className="component-replace-schedule-wrapper"

                   onCancel={closeModal}

                   onOk={e=>scheduleCommit()}

            >

                <Loading spinning={loading} opacity={false}>

                    <div className="content-wrapper">

                        <div className="header-search clearfix">

                            <Search

                                width={220}

                                Value={search.value}

                                CancelBtnShow={search.CancelBtnShow}

                                onChange={e=>setSearch({value:e.target.value})}

                                placeHolder='输入教师名称进行搜索'

                                onClickSearch={e=>searchClick()}

                                onCancelSearch={e=>searchCancel()}
                            >

                            </Search>

                        </div>

                        <div className="teacher-list-wrapper">

                            <Loading spinning={search.searchLoading}>

                                <Scrollbars style={{width:680,height:276}}>

                                    <div className="list-wrapper clearfix">

                                {

                                    search.searchWrapperShow?

                                        search.list.length>0?search.list.map((i,k)=> {

                                            if (i.TeacherID !== TeacherID) {

                                                return <div key={k}
                                                            className={`teacher-item ${activeTeacherID === i.TeacherID ? 'active' : ''}`}
                                                            title={`${i.TeacherName}[${i.TeacherID}]`}
                                                            onClick={e => setActiveTeacherID(i.TeacherID)}>{i.TeacherName}</div>

                                            }

                                        }):<Empty type="5" title="没有搜索到内容,请换个搜索词试试"></Empty>

                                        :

                                        teacherList.length>0?teacherList.map((i,k)=>{

                                            if (i.TeacherID !== TeacherID) {

                                                return <div key={k} className={`teacher-item ${activeTeacherID===i.TeacherID?'active':''}`} title={`${i.TeacherName}[${i.TeacherID}]`} onClick={e=>setActiveTeacherID(i.TeacherID)}>{i.TeacherName}</div>

                                            }

                                        })

                                        :<Empty type="3" title="没有相关教师数据"></Empty>

                                }

                                </div>

                                </Scrollbars>

                            </Loading>

                        </div>

                    </div>

                </Loading>

                {

                    TeacherName?

                        <div className={"origin-teacher"}>

                            <span className={"title"}>原教师:</span>

                            <span>{TeacherName}<span style={{color:'#999999'}}>({TeacherID})</span></span>

                        </div>

                        :''

                }

            </Modal>

        );

}

export default memo(ChangeTeacherModal);