import React,{Component} from 'react';

import {CheckBox,Button,Empty,Loading,PagiNation} from "../../../common";

import SelfCheckBox from "./CheckBox";

class StudentTabWrapper extends Component{

    render() {

        const {

            StudentPageChange,

            StudentPagination,

            StudentWrapperLoading,

            StudentList,

            CheckList,

            onCheckChange,

            allChecked,

            onChangeAll,

            adjustBtnClick,

            MonitorClick,

            StudentDetailShow,

            SearchResultShow

        } = this.props;

        return (

                <div className="person-tab-wrapper clearfix">

                    <Loading spinning={StudentWrapperLoading}>

                        {

                            StudentList && StudentList.Total > 0 ?

                                <React.Fragment>

                                    {/*<CheckBoxGroup className="clearfix" value={CheckList} onChange={(e)=>{console.log(e); onCheckChange(e)}}>

                                        {
                                            StudentList.List&&StudentList.List.map((item,key) => {
                                                //是否是班长
                                                let isMonitor = item.UserClass===1?true:false;
                                                //性别男女或者保密
                                                let sex= 'none';

                                                switch (item.Gender) {
                                                    case '男':
                                                        sex = 'men';
                                                        break;
                                                    case '女':
                                                        sex = 'women';
                                                        break;
                                                    default:
                                                        sex = 'none'
                                                }

                                                return <div key={key} className={`person-item-wrapper ${isMonitor?'monitor':''}`} >

                                                            <div className="person-item-content clearfix">

                                                                <CheckBox type="circle" value={JSON.stringify({id:item.UserID,name:item.UserName})}></CheckBox>

                                                                <div className="person-item-photo" onClick={e=>StudentDetailShow({UserID:item.UserID,UserType:2})} style={{backgroundImage:`url(${item.PhotoPath})`}}></div>

                                                                    <div className="person-item-info-wrapper">

                                                                        <div className="person-item-info">

                                                                            <div className="person-item-name" onClick={e=>StudentDetailShow({UserID:item.UserID,UserType:2})} title={item.UserName}>{item.UserName}</div>

                                                                            <div className={`person-sex-icon ${sex}`}></div>

                                                                        </div>

                                                                        <div className="person-item-id" title={item.UserID}>{item.UserID}</div>

                                                                    </div>


                                                                    <div className="cooperate">

                                                                        <div className="set-monitor" onClick={()=>{MonitorClick({UserID:item.UserID,isMonitor})}}>{isMonitor?'取消班长':'设为班长'}</div>

                                                                    </div>

                                                                </div>

                                                            <div className="person-item-border"></div>

                                                        </div>

                                            })
                                        }

                                    </CheckBoxGroup>*/}

                                    <div className="clearfix">

                                        {
                                            StudentList.List && StudentList.List.map((item, key) => {
                                                //是否是班长
                                                let isMonitor = item.UserClass === 1 ? true : false;
                                                //性别男女或者保密
                                                let sex = 'none';

                                                switch (item.Gender) {
                                                    case '男':
                                                        sex = 'men';
                                                        break;
                                                    case '女':
                                                        sex = 'women';
                                                        break;
                                                    default:
                                                        sex = 'none'
                                                }

                                                const ItemStr = JSON.stringify({id: item.UserID, name: item.UserName});

                                                return <div key={key}
                                                            className={`person-item-wrapper ${isMonitor ? 'monitor' : ''}`}>

                                                    <div className="person-item-content clearfix">

                                                        {/*<CheckBox type="circle" value={JSON.stringify({id:item.UserID,name:item.UserName})}></CheckBox>*/}

                                                        <SelfCheckBox onClick={e => onCheckChange(e)} value={ItemStr}
                                                                      IsChecked={CheckList.includes(ItemStr) ? true : false}></SelfCheckBox>

                                                        <div className="person-item-photo"
                                                             onClick={e => StudentDetailShow({
                                                                 UserID: item.UserID,
                                                                 UserType: 2
                                                             })}
                                                             style={{backgroundImage: `url(${item.PhotoPath})`}}></div>

                                                        <div className="person-item-info-wrapper">

                                                            <div className="person-item-info">

                                                                <div className="person-item-name"
                                                                     onClick={e => StudentDetailShow({
                                                                         UserID: item.UserID,
                                                                         UserType: 2
                                                                     })} title={item.UserName}>{item.UserName}</div>

                                                                <div className={`person-sex-icon ${sex}`}></div>

                                                            </div>

                                                            <div className="person-item-id"
                                                                 title={item.UserID}>{item.UserID}</div>

                                                        </div>


                                                        <div className="cooperate">

                                                            <div className="set-monitor" onClick={() => {
                                                                MonitorClick({UserID: item.UserID, isMonitor})
                                                            }}>{isMonitor ? '撤销班长' : '设为班长'}</div>

                                                        </div>

                                                    </div>

                                                    <div className="person-item-border"></div>

                                                </div>

                                            })
                                        }

                                    </div>

                                    <div className="person-checkgroup-wrapper">

                                        <CheckBox checked={allChecked} onChange={() => {
                                            onChangeAll()
                                        }}>全选</CheckBox>

                                        <Button size="small" className="person-adjust-btn" color="blue"
                                                onClick={e => adjustBtnClick(e)}>调班</Button>

                                    </div>

                                    <PagiNation className={'size24'} pageSize={12} onChange={e => StudentPageChange(e)}
                                                total={StudentPagination.Total}
                                                current={StudentPagination.CurrentPage}></PagiNation>

                                </React.Fragment>

                                :

                                <Empty type="5" title={SearchResultShow?'暂无符合条件的学生信息':'暂无学生信息'}></Empty>


                        }

                    </Loading>

                </div>


        );
    }
}
export default StudentTabWrapper;