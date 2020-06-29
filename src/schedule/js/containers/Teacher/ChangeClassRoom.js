import React,{memo,useEffect,useState,useRef,useImperativeHandle,forwardRef} from 'react';

import { Loading,DropDown,Tips } from "../../../../common";

import { connect } from 'react-redux';

import ABTActions from "../../actions/Teacher/AdjustByTeacherActions";

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


    const { dispatch,ChangeClassRoom,LoginUser,ClassRoomTypeList } = props;

    const {loadingShow, date, teacherClassRoom,teacherClassRoomList, classHourDrop, classHourList, classHourDisabled, WeekNO, WeekDay, ClassHour, classRoomList,

        classRoomDrop, classRoomDisabled, teacherTips, dateTips, scheduleTips, targetClassRoomTips} = ChangeClassRoom;

    const { SchoolID,UserType,UserID } = LoginUser;


    const notBusyRef = useRef();

    //日期选择
    const dateChange =(date,dateString) =>{

        dispatch(ABTActions.changeClassRoomDatePick(dateString));

        dispatch({type:ABTActions.CHANGE_CLASS_ROOM_ERROR_TIPS_HIDE,data:{type:"date"}});

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

    const dateDisabled = (current) =>{

        return  dispatch(utils.DateDisabled(current));

    };


    //课时选取
    const classHourPick = (info) =>{

        dispatch(ABTActions.changeClassRoomClassHourPick(info));

        dispatch({type:ABTActions.CHANGE_CLASS_ROOM_ERROR_TIPS_HIDE,data:{type:"schedule"}});

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

    const classRoomPick = (info) =>{

        dispatch(ABTActions.changeClassRoomClassRoomPick(info));

        dispatch({type:ABTActions.CHANGE_CLASS_ROOM_ERROR_TIPS_HIDE,data:{type:"targetClassRoom"}});

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

                <div className="time-wrapper">

                    <span className="props">时间:</span>

                    <ConfigProvider locale={zhCN}>

                        <Tips visible={dateTips} title="请选择日期">

                            <DatePicker disabledDate={dateDisabled} value={date?moment(date):null} onChange={dateChange}></DatePicker>

                        </Tips>


                    </ConfigProvider>



                    <Tips  visible={scheduleTips} title="请选择课时">

                        <DropDown width={150}
                                  height={72}
                                  style={{zIndex:4}}
                                  dropSelectd={classHourDrop}
                                  dropList={classHourList}
                                  disabled={classHourDisabled}
                                  onChange={classHourPick}
                        >

                        </DropDown>

                    </Tips>

                    {/*<span className="week-wrapper">{WeekNO?`第${WeekNO}周`:''} {WeekDay} { ClassHour }</span>*/}

                    <span className="week-wrapper">{weekDay.weekNO?`第${weekDay.weekNO}周`:''} {weekDay.weekDay} { weekDay.classHour }</span>

                </div>

                <div className="class-room-wrapper">

                    <span className="props">教室:</span>

                    <span className={`classroom ${classHourDrop.value!=='none'?'pick':''}`}>{originClassRoom.classRoomName?originClassRoom.classRoomName:'请选择课程'}</span>


                    <span className="props">新的教室:</span>

                    <Tips visible={newClassRoom.tipShow} title="请选择教室">

                        {/*<DropDown width={150}*/}
                                  {/*height={72}*/}
                                  {/*style={{zIndex:2}}*/}
                                  {/*dropSelectd={classRoomDrop}*/}
                                  {/*dropList={classRoomList}*/}
                                  {/*disabled={classRoomDisabled}*/}
                                  {/*onChange={classRoomPick}>*/}

                        {/*</DropDown>*/}

                        <span className={"new-class-room"}>{newClassRoom.ClassRoomName}</span>

                        <Button type={"link"} disabled={newClassRoom.disabled} onClick={showModal}>选择新的教室</Button>


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

    const { ChangeClassRoom,teacherList,ClassRoomTypeList } = state.Teacher.AdjustByTeacherModal;

    return {

        ChangeClassRoom,

        teacherList,

        LoginUser,

        ClassRoomTypeList

    }

};

export default connect(mapStateToProps,null,null,{forwardRef:true})(memo(forwardRef(ChangeClassRoom)));