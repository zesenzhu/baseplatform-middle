import React,{ Component } from 'react';

import {Modal, Loading, Search, Empty, Button} from "../../../common";

import ScrollBars from 'react-custom-scrollbars';

class ReplaceScheduleModal extends Component{

    render() {

        const  {

            Params,ReplaceTeacherPick,SearchValueChange,ReplaceSearchClick,ReplaceSearchCancel,

            ReplaceScheduleClose,ReplaceScheduleCommit

        } = this.props;

        const {

            Show=false,ModalLoading=true,SearchValue='',CancelBtnShow='n',

            SearchWrapperShow=false,TeacherList=[],ActiveTeacherID='',

            SearchList=[],SearchLoadingShow=false,TeacherID='',TeacherName=''

        } = Params;

        const TeacherListRemove = TeacherList.filter(i=>i.ID!==TeacherID);

        const SearchListRemove = SearchList.filter(i=>i.ID!==TeacherID);

        return (

            <Modal type={1}

                   title='选择代课教师'

                   visible={Show}

                   width={680}

                   bodyStyle={{height:324}}

                   mask={true}

                   cancelText="取消"

                   className="component-replace-schedule-wrapper"

                   onCancel={e=>ReplaceScheduleClose()}

                   onOk={e=>ReplaceScheduleCommit()}

            >

                <Loading spinning={ModalLoading}>

                    <div className="content-wrapper">

                        <div className="header-search clearfix">

                            <Search

                                width={220}

                                Value={SearchValue}

                                CancelBtnShow={CancelBtnShow}

                                onChange={e=>SearchValueChange(e)}

                                placeHolder='输入教师名称进行搜索'

                                onClickSearch={e=>ReplaceSearchClick(SearchValue)}

                                onCancelSearch={e=>ReplaceSearchCancel()}
                            >

                            </Search>

                        </div>

                        <div className="teacher-list-wrapper">

                            <Loading spinning={SearchLoadingShow}>

                                <ScrollBars style={{width:680,height:276}}>

                                    <div className="list-wrapper clearfix">

                                {

                                    SearchWrapperShow?

                                        SearchListRemove.length>0?SearchListRemove.map((item,key)=> {

                                           /* if (item.ID !== TeacherID) {*/

                                                return <div key={key}
                                                            className={`teacher-item ${ActiveTeacherID === item.ID ? 'active' : ''}`}
                                                            title={`${item.Name}[${item.ID}]`}
                                                            onClick={e => ReplaceTeacherPick(item.ID)}>{item.Name}</div>

                                           /* }*/

                                        }):<Empty type="5" title="没有搜索到相关代课教师"></Empty>

                                        :

                                        TeacherListRemove.length>0?TeacherListRemove.map((item,key)=>{

                                            /*if (item.ID !== TeacherID) {*/

                                                return <div key={key} className={`teacher-item ${ActiveTeacherID===item.ID?'active':''}`} title={`${item.Name}[${item.ID}]`} onClick={e=>ReplaceTeacherPick(item.ID)}>{item.Name}</div>

                                            /*}*/

                                        })

                                        :<Empty type="3" title="暂无可选的代课教师"></Empty>

                                }

                                </div>

                                </ScrollBars>

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

                        :null

                }


            </Modal>

        );

    }

}

export default ReplaceScheduleModal;