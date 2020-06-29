import React,{useState,useEffect,useRef,useImperativeHandle,forwardRef,useContext,memo} from 'react';

import { hideNotBusyRoomModal } from '../reducers/NotBusyRoomModal';

import {connect} from 'react-redux';

import {Modal, Loading, RadioGroup, Radio, Empty} from "../../../common";

import apiActions from '../actions/ApiActions';

import ScrollBars from "react-custom-scrollbars";


function SelectNotBusyRoom(props,ref) {

    //状态

    //loading
    const [loading,setLoading] = useState(true);

    //教室数据
    const [classRoomList,setClassRoomList] = useState([]);

    //教师
    const [roomList,setRoomList] = useState([]);

    //处于活动状态的教室类型
    const [activeRoomIndex,setActiveRoomIndex] = useState(0);


    //处于活动状态的教室ID

    const [activeClassRoom,setActiveClassRoom] = useState('');


    //props

    //redux-props
    const { dispatch,show } = props;


    //props
    const { OriginClassRoomID='',OriginClassRoomName='',ClassDate,ClassHourNO,RoomTypeList } = props;

    //function

    const { notBusyRoomOk } = props;


    useEffect(()=>{

        if (show){

            modalInit();

            apiActions.GetClassRoomIsNotBusy({ClassDate,ClassHourNO,dispatch}).then(data=>{

               const classRoomList = RoomTypeList.map(i=>{

                  const List = data&&data.length>0?data.filter(item=>item.ClassRoomTypeID.trim()===i.ClassRoomTypeID&&item.ClassRoomID!==OriginClassRoomID):[];

                  return {

                      ...i,

                      List

                  }

               });

               const activeClassRoomType = RoomTypeList.length>0?RoomTypeList[0].ClassRoomTypeID:'';

               setRoomList(data&&data.length>0?data:[]);

               setClassRoomList(classRoomList);

               setLoading(false);

            });

        }

    },[show]);



    //隐藏modal
    const hideModal = () =>{

        dispatch(hideNotBusyRoomModal());

        modalInit();

    };


    //切换活动教室

    const changeActiveRoom = (e) =>{

        setActiveClassRoom(e.target.value);

    };

    //初始化
    const modalInit = () =>{

        setLoading(true);

        setClassRoomList([]);

        setActiveRoomIndex(0);

        setActiveClassRoom('');

    };


    useImperativeHandle(ref,()=>({

        ClassRoomID:activeClassRoom,

        ClassRoomName:roomList.find(i=>i.ClassRoomID===activeClassRoom)?roomList.find(i=>i.ClassRoomID===activeClassRoom).ClassRoomName:'',

        hideLoading:()=>setLoading(false)

    }));


    const ok = () =>{

        notBusyRoomOk();

    };


    return(


        <Modal type={1}

               title='选择教室'

               visible={show}

               width={680}

               mask={true}

               bodyStyle={{height:440}}

               className="component-adjust-classroom-wrapper"

               onCancel={e=>hideModal()}

               onOk={ok}

               destroyOnClose={true}

        >

            <Loading spinning={loading}>

                <div className="content-wrapper">

                    <div className="left-classroom-type">

                        <ScrollBars style={{width:178,height:390}}>

                            {

                                classRoomList.map((i,k)=>{

                                    return <div key={k} className={`class-room-type-item ${k===activeRoomIndex?'active':''}`} onClick={e=>setActiveRoomIndex(k)}>{i.ClassRoomTypeName}</div>

                                })

                            }

                        </ScrollBars>

                    </div>

                    <div className="right-classroom-content">

                        <ScrollBars style={{width:502,height:390}}>

                            {

                                classRoomList[activeRoomIndex]&&classRoomList[activeRoomIndex].List.length>0?

                                    <RadioGroup value={activeClassRoom} onChange={changeActiveRoom}>

                                        {

                                            classRoomList[activeRoomIndex].List.map((i,k)=>{

                                                return <div key={k} className="class-room-item">

                                                    <Radio type="green" value={i.ClassRoomID}>{i.ClassRoomName}</Radio>

                                                </div>

                                            })

                                        }

                                    </RadioGroup>

                                    :

                                    <Empty type="3" title="没有相关的空闲教室信息"></Empty>

                            }

                        </ScrollBars>

                    </div>

                    <div className="footer-origin">

                        <span className="origin-title">原教室:</span>

                        <span className="origin-class-room">{OriginClassRoomName}</span>

                    </div>

                </div>

            </Loading>

        </Modal>


    )

}

const mapStateToProps = (state) =>{

    const { NotBusyRoomModal } = state;

    return NotBusyRoomModal;

};

export default connect(mapStateToProps,null,null,{forwardRef:true})(memo(forwardRef(SelectNotBusyRoom)));