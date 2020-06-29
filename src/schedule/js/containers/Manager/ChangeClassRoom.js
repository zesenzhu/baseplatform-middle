import React,{memo,useEffect,useState,useRef,useImperativeHandle,forwardRef} from 'react';

import { Loading,DropDown,Tips } from "../../../../common";

import { connect } from 'react-redux';

import ABTActions from "../../actions/Manager/AdjustByTeacherActions";

import { DatePicker,ConfigProvider,Button } from 'antd';

import zhCN from 'antd/es/locale/zh_CN';

import moment from 'moment';

import 'moment/locale/zh-cn';

import utils from "../../actions/utils";

import SelectNotBusyRoom from '../../component/SelectNotBusyRoom';

import {showNotBusyRoomModal,hideNotBusyRoomModal} from '../../reducers/NotBusyRoomModal';

import apiActions from "../../actions/ApiActions";

import appAlert from "../../actions/AppAlertActions";

moment.locale('zh-cn');


function ChangeClassRoom(props,ref){

    //weekDay
    const [weekDay,setWeekDay] = useState({

        weekNO:'',

        weekDay:'',

        classHour:''

    });


    //初始教室
    const [originClassRoom,setOriginClassRoom] = useState({

       classRoomID:'',

       classRoomName:''

    });

    //新的教室
    const [newClassRoom,setNewClassRoom] = useState({

        disabled:true,

        tipShow:false,

        ClassRoomID:'',

        ClassRoomName:''

    });


    const { dispatch,teacherList,ChangeClassRoom,LoginUser,ClassRoomTypeList } = props;

    const { SchoolID,UserType,UserID } = LoginUser;

    const {loadingShow, teacherDrop, teacherSearchList, teacherSearchOpen, teacherSearchLoadingShow, date,

            teacherClassRoom, classHourDrop, classHourList, classHourDisabled, WeekNO, WeekDay,

            ClassHour,classRoomList,teacherClassRoomList,classRoomDrop,classRoomDisabled,teacherTips,dateTips, scheduleTips, targetClassRoomTips} = ChangeClassRoom;


    const notBusyRef = useRef();

    //教师选取
    const teacherDropChange = (info) => {

        dispatch(ABTActions.changeClassRoomTeacherPick(info));

        setWeekDay(d=>({...d,classHour:''}));

        setNewClassRoom(d=>({...d,ClassRoomID:'',ClassRoomName:'',disabled:true}));

        setOriginClassRoom(d=>({...d,classRoomID:'',classRoomName:''}));

    };

    const teacherClickSearch = (e) =>{

        const key = e.value;

        dispatch(ABTActions.changeClassRoomTeacherSearch(key));

    };

    const teacherSearchClose = () =>{

        dispatch(ABTActions.changeClassRoomTeacherSearchClose());

    };

    const dateDisabled = (current) => {

        return dispatch(utils.DateDisabled(current));

    };


    //日期选择
    const dateChange = (date,dateString) =>{

        dispatch(ABTActions.changeClassRoomDatePick(dateString));

        if (dateString){

            apiActions.GetWeekInfoByDate({SchoolID,ClassDate:dateString,dispatch}).then(data=>{

                if (data){

                    let WeekNO = data.WeekNO;

                    let weekDay = data.WeekDay;

                    let WeekDay = '';

                    switch (weekDay) {

                        case 0:

                            WeekDay = '星期一';

                            break;

                        case 1:

                            WeekDay = '星期二';

                            break;

                        case 2:

                            WeekDay = '星期三';

                            break;

                        case 3:

                            WeekDay = '星期四';

                            break;

                        case 4:

                            WeekDay = '星期五';

                            break;

                        case 5:

                            WeekDay = '星期六';

                            break;

                        case 6:

                            WeekDay = '星期日';

                            break;

                        default:

                            WeekDay = '星期一';

                    }

                    setWeekDay(d=>({...d,weekNO:WeekNO,weekDay:WeekDay,classHour:''}));

                }

            });

        }else{

            setWeekDay(d=>({...d,weekNO:'',weekDay:'',classHour:''}));

        }


        setOriginClassRoom(d=>({...d,classRoomID:'',classRoomName:''}));

        setNewClassRoom(d=>({...d,disabled:true,ClassRoomID:'',ClassRoomName:''}));


    };


    //课时选取
    const classHourPick = (info) => {

        dispatch(ABTActions.changeClassRoomClassHourPick(info));

        if (info.value!=='none'&&info.value!==''){

            setWeekDay(d=>({...d,classHour:info.title}));

            let classRoom = teacherClassRoomList.find(item=>item.ScheduleID===info.value);

            setOriginClassRoom(d=>({...d,classRoomID:classRoom.ClassRoomID,classRoomName:classRoom.ClassRoomName}));

            setNewClassRoom(d=>({...d,disabled:false}));

        }else{

            setOriginClassRoom(d=>({...d,classRoomID:'',classRoomName:''}));

        }

    };

    //点击教室

    const classRoomPick = (info) => {

        dispatch(ABTActions.changeClassRoomClassRoomPick(info));

    };




    const notBusyRoomOk = () =>{

        const { ClassRoomID,ClassRoomName } = notBusyRef.current;

        if (ClassRoomID&&ClassRoomName){

            setNewClassRoom(e=>({...e,tipShow:false,ClassRoomID,ClassRoomName}));

            dispatch(hideNotBusyRoomModal());

        }else{

            dispatch(appAlert.alertWarn({title:'请选择教室'}));

        }

    };

    const showModal = () =>{

        dispatch(showNotBusyRoomModal());

    };


    useImperativeHandle(ref,()=>({

        classRoomID1:originClassRoom.classRoomID,

        classRoomID2:newClassRoom.ClassRoomID,

        showRoomTip:()=>setNewClassRoom(d=>({...d,tipShow:true})),

        hideRoomTip:()=>setNewClassRoom(d=>({...d,tipShow:false}))

    }));

    return (

        <>

            <Loading type="loading" ref={ref} spinning={false}>

                <div className="change-class-room-wrapper">

                <div className="teacher-wrapper">

                    <span className="props">老师:</span>

                    <Tips title="请选择任课教师" visible={teacherTips}  autoAdjustOverflow={false}>

                        <DropDown  width={300}
                                   dropSelectd={teacherDrop}
                                   type="multiple"
                                   style={{zIndex:5}}
                                   mutipleOptions={{
                                       range:2,
                                       width:640,
                                       dropMultipleList:teacherList,
                                       dropMultipleChange:teacherDropChange,
                                       dropClickSearch:teacherClickSearch,
                                       dropCancelSearch:teacherSearchClose,
                                       searchList:teacherSearchList,
                                       searchPlaceholder:"请输入姓名或工号进行搜索...",
                                       searchOpen:teacherSearchOpen,
                                       searchLoadingShow:teacherSearchLoadingShow
                                   }}>

                        </DropDown>

                    </Tips>


                </div>

                <div className="time-wrapper">

                    <span className="props">时间:</span>

                    <ConfigProvider locale={zhCN}>

                        <Tips title="请选择日期" visible={dateTips}  autoAdjustOverflow={false}>

                            <DatePicker disabledDate={dateDisabled} value={date?moment(date):null} onChange={dateChange}></DatePicker>

                        </Tips>

                    </ConfigProvider>


                    <Tips title="请选择课时" visible={scheduleTips}   autoAdjustOverflow={false}>

                        <DropDown width={150}
                              height={200}
                              style={{zIndex:4}}
                              dropSelectd={classHourDrop}
                              dropList={classHourList}
                              disabled={classHourDisabled}
                              onChange={classHourPick}
                    >

                    </DropDown>

                    </Tips>

                    <span className="week-wrapper">{weekDay.weekNO?`第${weekDay.weekNO}周`:''} {weekDay.weekDay} { weekDay.classHour }</span>

                </div>

                <div className="class-room-wrapper">

                    <span className="props">教室:</span>

                    <span className={`classroom ${classHourDrop.value!=='none'?'pick':''}`}>{originClassRoom.classRoomName?originClassRoom.classRoomName:'请选择课程'}</span>


                    <span className="props">新的教室:</span>

                    <Tips title="请选择教室" visible={newClassRoom.tipShow}  autoAdjustOverflow={false}>

                        <span className={"new-class-room"}>{newClassRoom.ClassRoomName}</span>

                        <Button type={"link"} disabled={newClassRoom.disabled} onClick={showModal}>选择新的教室</Button>

                    {/*<DropDown width={150}
                              height={200}
                              style={{zIndex:2}}
                              dropSelectd={classRoomDrop}
                              dropList={classRoomList}
                              disabled={classRoomDisabled}
                              onChange={classRoomPick}>

                    </DropDown>*/}

                    </Tips>

                </div>

            </div>

            </Loading>

            <SelectNotBusyRoom

                ClassDate={date}

                ClassHourNO={classHourList.length>0&&classHourList.find(i=>i.value===classHourDrop.value)?classHourList.find(i=>i.value===classHourDrop.value).NO:''}

                RoomTypeList={ClassRoomTypeList}

                ref={notBusyRef}

                notBusyRoomOk={notBusyRoomOk}

                OriginClassRoomName={originClassRoom.classRoomName}

                OriginClassRoomID={originClassRoom.classRoomID}

            >

            </SelectNotBusyRoom>

        </>

    );

}

const mapStateToProps = (state) => {

    const { LoginUser } = state;

    const { ChangeClassRoom,teacherList,ClassRoomTypeList } = state.Manager.AdjustByTeacherModal;

    return {

        ChangeClassRoom,

        teacherList,

        LoginUser,

        ClassRoomTypeList

    }

};

export default connect(mapStateToProps,null,null,{forwardRef:true})(memo(forwardRef(ChangeClassRoom)));