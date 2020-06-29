import React,{ Component } from 'react';

import {Modal, Loading, Search, Radio, RadioGroup, Empty} from "../../../common";

import ScrollBars from 'react-custom-scrollbars';

class AdjustClassRoomModal extends Component{

    render() {

        const  { Params,ChangeClassRoomPick,ChangeClassRoomType,SearchValueChange,

            ClassRoomSearchClick,ClassRoomSearchCancel,CloseAdjustClassRoom,

            AdjustClassRoomCommit

        } = this.props;

        const { Show=false,ModalLoading=true,ClassRoomList=[],ClassRoomTabActive='',CheckedValue='',

            NowClassRoomName='',SearchValue='',CancelBtnShow=false,SearchWrapperShow=false,SearchList=[],

            SearchLoading=false

        } = Params;

        return (

            <Modal type={1}

                   title='调整教室'

                   visible={Show}

                   width={680}

                   mask={true}

                   bodyStyle={{height:480}}

                   className="component-adjust-classroom-wrapper"

                   onCancel={e=>CloseAdjustClassRoom()}

                   onOk={e=>AdjustClassRoomCommit()}

            >

                <Loading spinning={ModalLoading}>

                    <div className="content-wrapper">

                        <div className="header-search clearfix">

                            <Search

                                width={220}

                                Value={SearchValue}

                                CancelBtnShow={CancelBtnShow}

                                onChange={e=>SearchValueChange(e)}

                                placeHolder='输入教室名称进行搜索'

                                onClickSearch={e=>ClassRoomSearchClick(SearchValue)}

                                onCancelSearch={e=>ClassRoomSearchCancel()}
                            >

                            </Search>

                        </div>

                        {

                            SearchWrapperShow?

                                <div className="class-room-search-wrapper">

                                    <Loading spinning={SearchLoading}>

                                        <ScrollBars style={{width:680,height:390}}>

                                            {

                                                SearchList.length>0?

                                                    <RadioGroup value={CheckedValue} onChange={e=>ChangeClassRoomPick(e)}>

                                                        {

                                                            SearchList.map((item,key)=>{

                                                                return <div key={key} className="class-room-item">

                                                                    <Radio type="green" value={item.ID}>

                                                                        <span>{item.Name}</span>

                                                                        <span className="room-type">[{item.TypeName}]</span>

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

                                                ClassRoomList.map((item,key)=>{

                                                    return <div key={key} className={`class-room-type-item ${key===ClassRoomTabActive?'active':''}`} onClick={e=>ChangeClassRoomType(key)}>

                                                        {item.Name}

                                                    </div>

                                                })

                                            }

                                        </ScrollBars>

                                    </div>

                                    <div className="right-classroom-content">

                                        <ScrollBars style={{width:502,height:390}}>

                                            {

                                                ClassRoomList[ClassRoomTabActive]&&ClassRoomList[ClassRoomTabActive].List.length>0?

                                                    <RadioGroup value={CheckedValue} onChange={(e)=>{ChangeClassRoomPick(e)}}>

                                                        {

                                                            ClassRoomList[ClassRoomTabActive].List.map((item,key)=>{

                                                                return <div key={key} className="class-room-item">

                                                                    <Radio type="green" value={item.ID}>{item.Name}</Radio>

                                                                </div>

                                                            })

                                                        }

                                                    </RadioGroup>

                                                    :<Empty type="3" title="没有相关的教室信息"></Empty>

                                            }

                                        </ScrollBars>

                                    </div>

                                </React.Fragment>

                        }

                        <div className="footer-origin">

                            <span className="origin-title">原教室:</span>

                            <span className="origin-class-room">{NowClassRoomName}</span>

                        </div>

                    </div>

                </Loading>

            </Modal>

        );

    }

}

export default AdjustClassRoomModal;