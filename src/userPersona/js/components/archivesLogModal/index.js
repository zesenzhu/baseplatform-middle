import React,{useEffect,useState,useCallback,useMemo,memo,useRef} from 'react';

import {useSelector,useDispatch} from "react-redux";

import {Modal,Empty} from "../../../../common";

import {Scrollbars} from "react-custom-scrollbars";

import './index.scss';

function ArchivesLogModal(props) {

    const { show } = props;

    const {closeArchivesLog} = props;

    const userInfoLogs = useSelector(state=>state.userInfoLogs);

    const userArchives = useSelector(state=>state.userArchives);

    return(

        <Modal

            type={2}

            className={"archives-modal Modal-2"}

            visible={show}

            width={650}

            bodyStyle={{padding:0,height:410}}

            footer={null}

            onCancel={closeArchivesLog}

        >

            <div className="modal-studentChange">

                <div className="content-top">

                        <i className={"icon-location"}></i>

                        <span className="top-text">{userArchives.ShortName}的档案变更记录</span>

                </div>

                <div className="content">

                    <Scrollbars style={{height:300}}>


                        {

                            userInfoLogs&&userInfoLogs.length>0?

                                userInfoLogs.map(i=>{

                                    return (

                                        <div key={i.LogID} className="content-map">

                                            <div className="map-left">
                                                <div className="left-border"></div>
                                                <div className="right-border"></div>
                                            </div>
                                            <span title={i.LogTime} className="map-center">{i.LogTime}</span>
                                            <div title={i.Content} className="map-right">{i.Content}</div>
                                        </div>

                                    )

                                })

                                :<Empty type={"3"} title={"暂无用户档案记录"}></Empty>

                        }

                    </Scrollbars>


                </div>

            </div>

        </Modal>

    )

}


ArchivesLogModal.defaultProps={

    show:false,

    closeArchivesLog:()=>{}

};

export default memo(ArchivesLogModal);