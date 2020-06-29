import React,{Component} from 'react';

import ALActions from '../../actions/Manager/AdjustLogActions';

import {DropDown, Table, PagiNation, Empty} from "../../../../common";

import {DatePicker,ConfigProvider} from 'antd';

import { connect } from 'react-redux';

import $ from "jquery";

import zhCN from 'antd/es/locale/zh_CN';

import moment from 'moment';

import 'moment/locale/zh-cn';

import AppAlertActions from "../../actions/AppAlertActions";

moment.locale('zh-cn');


class App extends Component{

    constructor(props){

        super(props);

        let { dispatch,ModuleSetting } = props;

        let { LoginUser } = this.props;

        if (LoginUser.UserID){

            const { SchoolID } = LoginUser;

            dispatch(ALActions.PageInit({SchoolID}));

        }else{

            const WaiteUserInfo = setInterval(()=>{

                LoginUser = this.props.LoginUser;

                if (LoginUser.UserID){

                    const { SchoolID } = LoginUser;

                    dispatch(ALActions.PageInit({SchoolID}));

                    clearInterval(WaiteUserInfo);

                }

            },20)

        }

    }

    componentDidMount(){

        $('.frame-content-rightside').css({

            'margin-top':'0px',

            "border-radius":"12px",

            "border-top":"0px"

        });

    }

    //开始时间改变
    StartDateChange(date,dataString){

        const { dispatch } = this.props;

        dispatch({type:ALActions.MANAGER_ADJUST_LOG_START_DATE_UPDATE,data:dataString});

    }

    //结束时间改变
    EndDateChange(date,dataString){

        const { dispatch } = this.props;

        dispatch({type:ALActions.MANAGER_ADJUST_LOG_END_DATE_UPDATE,data:dataString});

    }

    //点击确定事件

    DatePick(){

        const { dispatch } = this.props;

        dispatch(ALActions.DatePick());

    }

    //点击下拉
    DropChange(e){

        const { dispatch } = this.props;

        dispatch(ALActions.DropChange(e));

    }

    //table分页改变

    TablePageChange(e){

        const { dispatch } = this.props;

        dispatch(ALActions.TablePageChange(e));

    }
    //撤回操作
    Reback(e){

        const { dispatch } = this.props;

        dispatch(AppAlertActions.alertQuery({title:"您确定要撤销该操作吗？",ok:()=>{ return ()=>dispatch(ALActions.Reback(e)) }}))

    }




    render(){

        const { AdjustLog } = this.props;

        const { LogList,DropSelectd,DropList,StartDate,

            EndDate,TableLoading,TotalCount,PageIndex } = AdjustLog;

        let Colums = [

            {

                title: <span className="slash"></span>,

                dataIndex: 'RowNum',

                key: "RowNum",

                align: "center",

                width: 70,
            },

            {

                title:"调课类型",

                dataIndex:'OperateTypeName',

                key:"OperateTypeName",

                align:"center",

                width:150,

                render:(item)=>{

                    return <div className="log-type">{item}</div>

                }

            },

            {

                title:"调课描述",

                dataIndex:'OperateDesc',

                key:"OperateDesc",

                align:"center",

                width:470,

                render:(item)=>{

                    return <div className="log-dec-wrapper">

                        <div className="dec-detail" title={item}>

                            {item}

                        </div>

                    </div>

                }

            },

            {

                title:"操作人",

                dataIndex:'OperatePerson',

                key:"OperatePerson",

                align:"center",

                width:150,

                render:(item)=>{

                    return <div className="operate-person">

                        <div className="name" title={item.OperatorName}>{item.OperatorName}</div>

                        <div className="id-wrapper" title={item.OperatorID}>(<div className="id">{item.OperatorID}</div>)</div>

                    </div>

                }

            },

            {

                title:"调课时间",

                dataIndex:'OperateTime',

                key:"OperateTime",

                align:"center",

                width:150

            },

            {

                title:"操作",

                dataIndex:'OperateFlag',

                key:"OperateFlag",

                align:"center",

                width:120,

                render:(item,data)=>{

                    return <span  className={`reback ${item.Flag===1?'':'disabled'}`} onClick={item.Flag===1?this.Reback.bind(this,{LogID:item.LogID,OperateType:data.OperateType}):()=>{}}>撤销</span>

                }

            }

        ];

        return <div className="adjust-log-wrapper">

            <div className="top-wrapper clearfix">

                <DropDown

                    title="调课类型:"

                    dropSelectd={DropSelectd}

                    dropList={DropList}

                    height={200}

                    onChange={this.DropChange.bind(this)}

                >
                </DropDown>

                <div className="date-time-wrapper">

                     <span className="title">操作时间:</span>

                    <ConfigProvider locale={zhCN}>

                        <DatePicker onChange={this.StartDateChange.bind(this)} value={StartDate?moment(StartDate):null}></DatePicker>

                    </ConfigProvider>

                    <span className="title">至</span>

                    <ConfigProvider locale={zhCN}>

                        <DatePicker onChange={this.EndDateChange.bind(this)} value={EndDate?moment(EndDate):null}></DatePicker>

                    </ConfigProvider>

                    <button className="date-pick" onClick={this.DatePick.bind(this)}>确定</button>

                </div>

            </div>

            <div className="log-table-wrapper">

                {

                    LogList.length>0?

                        <>

                            <Table bordered loading={TableLoading} columns={Colums} pagination={false} dataSource={LogList}></Table>

                            <PagiNation pageSize={10} current={PageIndex} total={TotalCount} onChange={this.TablePageChange.bind(this)}></PagiNation>

                        </>

                        :

                        <Empty type="3" title="暂无调课日志数据"></Empty>

                }


            </div>

        </div>

    }

}

const  mapStateToProps = (state) => {

    let { Manager,ModuleSetting,LoginUser } = state;

    let { AdjustLog } = Manager;

    return {

        AdjustLog,ModuleSetting,LoginUser

    }

};

export default connect(mapStateToProps)(App);