import React,{ useMemo,useContext,useState,useEffect,memo } from 'react';

import {Modal, Loading, Search, Radio, RadioGroup, Empty} from "../../common";

import ScrollBars from 'react-custom-scrollbars';

import {StateContext} from "./ReduxConatiner";

import {useSetState,useStateValue} from "../api/hooks";

import {GetClassRoomByClassTypeAndKey,ChangeClassRoomAndGetTea} from '../api/index';

import {showWarnAlert,showSuccessAlert} from "../store/appAlert";

function AdjustClassRoomModal(){


    //loading
    const [loading,setLoading] = useSetState(true,true);

    //搜索
    const [search,setSearch] = useSetState({

        value:'',

        CancelBtnShow:'n',

        searchWrapperShow:false,

        searchLoading:false,

        list:[]

    });

    //已选择
    const [checked,setChecked] = useSetState('',true);

    //教室类型
    const [roomTypeList,setRoomTypeList] = useSetState([],true);


    //教室类型
    const [roomLoading,setRoomLoading] = useSetState(false,true);

    //教室类型
    const [activeRoomType,setActiveRoomType] = useSetState('',true);

    //教室
    const [roomList,setRoomList] = useSetState([],true);




    const {state,dispatch} = useContext(StateContext);

    const { ScheduleInfo,UserInfo } = state;

    const { SchoolID,UserID,UserType } = UserInfo;

    const { ItemClassRoomType=[],ItemSchedule=[] } = ScheduleInfo?ScheduleInfo:{};

    const { ClassRoomName='',ClassRoomID='' } = ItemSchedule.length>0?ItemSchedule[0]:{};



    //ref

    const checkedRef = useStateValue(checked);

    const scheduleRef = useStateValue(ItemSchedule[0]);

    const loginUserRef = useStateValue(UserInfo);

    useEffect(()=>{

        if (ScheduleInfo&&loading){

            const activeType = ItemClassRoomType[0].ClassRoomTypeID;

            GetClassRoomByClassTypeAndKey({SchoolID,ClassRoomTypeID:activeType,dispatch}).then(data=>{

                const list = data&&data.length>0?data.filter(i=>i.ClassRoomID!==ClassRoomID):[];

                setRoomList(list);

                setRoomTypeList(ItemClassRoomType);

                setActiveRoomType(activeType);

                setLoading(false);

            });

        }

    },[ScheduleInfo]);



    //搜索点击
    const searchClick = () => {

        const pattern =  /^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/;

        const key = search.value;
        
        if (pattern.test(key)){

            setSearch({CancelBtnShow:'y',searchWrapperShow:true,searchLoading:true});

            GetClassRoomByClassTypeAndKey({SchoolID,Key:key,dispatch}).then(data=>{

                const list = data&&data.length>0?data.filter(i=>i.ClassRoomID!==ClassRoomID):[];

                setSearch({list,searchLoading:false});

            });

        }else{

            showWarnAlert({title:'输入的教室名称格式不正确',dispatch});

        }

    };

    //取消搜索

    const searchCancel = () => {

        setSearch({value:'',CancelBtnShow:'n',searchWrapperShow:false});

    };


    //左侧点击不同的教室类型

    const changeRoomType = (ClassRoomTypeID) =>{

        setRoomLoading(true);

        setActiveRoomType(ClassRoomTypeID);

        GetClassRoomByClassTypeAndKey({SchoolID,ClassRoomTypeID,dispatch}).then(data=>{

            const list = data&&data.length>0?data.filter(i=>i.ClassRoomID!==ClassRoomID):[];

            setRoomList(list);

            setRoomLoading(false);

        });

    };

    //点击选中

    const changeActiveRoom = (e)=>{

      setChecked(e.target.value);

    };


    const changeRoomCommit = () =>{

      const { ScheduleID,TeacherID,ClassHourNO,ClassDate } = scheduleRef.current;

      const { SchoolID,UserID } = loginUserRef.current;

      if (checkedRef.current){

          setLoading(true);

          ChangeClassRoomAndGetTea({SchoolID,ScheduleID,UserID,TeacherID,ClassHourNO,ClassDate,ScheduleClassRoomID:checkedRef.current,dispatch}).then(data=>{

              if (data===0){

                  showSuccessAlert({title:'调整教室成功',dispatch});

                  if (window.parent){

                      window.parent.postMessage('updateCourse','*');

                  }else{

                      window.postMessage('updateCourse','*');

                  }

              }

              setLoading(false);

          })

      }else{

          showWarnAlert({title:'请选择教室',dispatch});

      }

    };

    //关闭弹窗

    const closeModal = () =>{

        if (window.parent){

            window.parent.postMessage('closeIframe','*');

        }else{

            window.postMessage('closeIframe','*');

        }

    };


        return (

            <Modal type={1}

                   title='调整教室'

                   visible={true}

                   width={680}

                   mask={true}

                   bodyStyle={{height:480,padding:0}}

                   className="component-adjust-classroom-wrapper"

                   onCancel={closeModal}

                   onOk={e=>changeRoomCommit()}

            >

                <Loading spinning={loading} opacity={false}>

                    <div className="content-wrapper">

                        <div className="header-search clearfix">

                            <Search

                                width={220}

                                Value={search.value}

                                CancelBtnShow={search.CancelBtnShow}

                                placeHolder='输入教室名称进行搜索'

                                onChange={e=>setSearch({value:e.target.value})}

                                onClickSearch={e=>searchClick()}

                                onCancelSearch={e=>searchCancel()}
                            >

                            </Search>

                        </div>

                        {

                            search.searchWrapperShow?

                                <div className="class-room-search-wrapper">

                                    <Loading spinning={search.searchLoading}>

                                        <ScrollBars style={{width:680,height:390}}>

                                            {

                                                search.list.length>0?

                                                    <RadioGroup value={checked} onChange={e=>changeActiveRoom(e)}>

                                                        {

                                                            search.list.map((i,k)=>{

                                                                return <div key={k} className="class-room-item">

                                                                    <Radio type="green" value={i.ClassRoomID}>

                                                                        <span>{i.ClassRoomName}</span>

                                                                        {

                                                                            roomTypeList.find(item=>item.ClassRoomTypeID===i.ClassRoomTypeID)?

                                                                                <span className="room-type">[{roomTypeList.find(item=>item.ClassRoomTypeID===i.ClassRoomTypeID).ClassRoomTypeName}]</span>

                                                                                :''

                                                                        }

                                                                    </Radio>

                                                                </div>

                                                            })

                                                        }

                                                    </RadioGroup>

                                                    :<Empty type="5" title="没有搜索到内容,请换个搜索词试试"></Empty>

                                            }



                                    </ScrollBars>

                                    </Loading>

                                </div>

                                :

                                <React.Fragment>

                                    <div className="left-classroom-type">

                                        <ScrollBars style={{width:178,height:390}}>

                                            {

                                                roomTypeList.map((i,k)=>{

                                                    return <div key={k} className={`class-room-type-item ${i.ClassRoomTypeID===activeRoomType?'active':''}`} onClick={e=>changeRoomType(i.ClassRoomTypeID)}>

                                                        {i.ClassRoomTypeName}

                                                    </div>

                                                })

                                            }

                                        </ScrollBars>

                                    </div>

                                    <div className="right-classroom-content">

                                        <Loading spinning={roomLoading}>

                                            <ScrollBars style={{width:502,height:390}}>

                                                {

                                                    roomList.length>0?

                                                        <RadioGroup value={checked} onChange={(e)=>{changeActiveRoom(e)}}>

                                                            {

                                                                roomList.map((item,key)=>{

                                                                    return <div key={key} className="class-room-item">

                                                                        <Radio type="green" value={item.ClassRoomID}>{item.ClassRoomName}</Radio>

                                                                    </div>

                                                                })

                                                            }

                                                        </RadioGroup>

                                                        :<Empty type="3" title="没有相关的教室信息"></Empty>

                                                }

                                            </ScrollBars>

                                        </Loading>

                                    </div>

                                </React.Fragment>

                        }

                        <div className="footer-origin">

                            <span className="origin-title">原教室:</span>

                            <span className="origin-class-room">{ClassRoomName}</span>

                        </div>

                    </div>

                </Loading>

            </Modal>

        );

}

export default AdjustClassRoomModal;