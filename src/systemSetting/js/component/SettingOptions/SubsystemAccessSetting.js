import React, { Component } from 'react';
import '../../../sass/subSystemAccessSet.scss';
import { connect } from 'react-redux';
import { Modal, Loading } from '../../../../common';
import { DropDown, Search, Empty } from '../../../../common'

import ApiAction from '../../action/data/Api'
import DataChange from '../../action/data/DataChange'
import AppAlertAction from '../../action/UI/AppAlertAction'


class SubsystemAccessSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            simpleSearch: '', //搜索框中的输入值
            AccessDropValue: "2",//默认的访问类型（对应的默认title为全部）
            AccessDropTitle: "全部",
            UserDropValue: "",//默认的用户类型（对应的默认title为全部）
            UserDropTitle: "全部"
        }
        const { dispatch } = props

        dispatch(DataChange.getCurrentSbusystemInfo({}));


    }

    //搜索框的查询事件
    simpleClickSearch = (e) => {
        let { dispatch } = this.props;
        // const { SchoolID } = JSON.parse(sessionStorage.getItem('UserInfo'));
        // let { IsOpened, UserType, } = this.props.subsystemInfo
        // if (!IsOpened) {
        //     IsOpened = this.state.AccessDropValue
        // }
        // if (!UserType) {
        //     UserType = this.state.UserDropTitle
        // }

        this.setState({
            simpleSearch: e.value
        });

        //如果搜索框中的值是空的默认查找数据库中所有的子系统

        if (e.value === "") {


            dispatch(AppAlertAction.alertTips({ title: "搜索内容不能为空", cancelTitle: "确定" }))
        }
        //如果不是空的,按照关键字,和默认选中的下拉框中的值(全部)(全部)来查找
        else {
            // this.setState({
            //     simpleSearch: ""
            // }, () => {


            // })
            dispatch(DataChange.getCurrentSbusystemInfo({ "IsOpened": this.state.AccessDropValue, "UserType": this.state.UserDropValue, "keyword": e.value }));

        }

    }
    //监听搜索框中值的变化情况
    SearchValueChange = (e) => {
        this.setState({
            simpleSearch: e.target.value
        })
    }
    onCancelSearch = (e) => {
        let { dispatch } = this.props;
        this.setState({
            simpleSearch: ""
        }, () => {
            dispatch(DataChange.getCurrentSbusystemInfo({ "IsOpened": this.state.AccessDropValue, "UserType": this.state.UserDropValue, "keyword": e.value }));


        })
    }

    /*   监听访问状态状态下拉框的的选择事件 
      @parma checked 被选中的内容 包括value和title   
    */
    dropAccessChange = (checked) => {
        console.log(checked.value);
        let { subsystemInfo, dispatch } = this.props
        subsystemInfo = {
            ...subsystemInfo,
            "IsOpened": checked.value
        }
        this.setState({
            AccessDropTitle: checked.title,
            AccessDropValue: checked.value,
            simpleSearch: ""
        }, () => {
            dispatch(DataChange.getCurrentSbusystemInfo({ "IsOpened": checked.value, "UserType": this.state.UserDropValue }))


        })
        dispatch({
            type: DataChange.REFRESH_SUBSYSTEM_INFO,
            data: subsystemInfo
        })


    }



    //监听用户类别下拉框的选择事件
    dropUserTypeChange = (checked) => {
        let { subsystemInfo, dispatch } = this.props
        subsystemInfo = {
            ...subsystemInfo,
            "UserType": checked.value

        }
        this.setState({
            UserDropTitle: checked.title,
            UserDropValue: checked.value,
            simpleSearch: ""
        }, () => {

            dispatch(DataChange.getCurrentSbusystemInfo({ "UserType": checked.value, "IsOpened": this.state.AccessDropValue }))
        })



        dispatch({
            type: DataChange.REFRESH_SUBSYSTEM_INFO,
            data: subsystemInfo
        })



    }




    /* 监听每个子系统的开启状态按钮的点击事件
    @param1 事件对象
    @param2 触发点击事件对应的子系统ID
    @param3 对应子系统的名字
    @parma4 子系统当前状态
    
    */
    toggleAccessState = (e, SubSystemID, SubSystemName, status, CanBeClose) => {
        let { subsystemInfo, dispatch } = this.props
        // const { SchoolID } = JSON.parse(sessionStorage.getItem('UserInfo'));
        if (!CanBeClose) {
            dispatch(AppAlertAction.alertTips({ title: "该子系统不能关闭" }))
            return
        }

        console.log(status);

        //先判断当前的子系统关闭状态  0表示已关闭 1 表示已开启
        if (status === 0) {
            //表示当前状态已关闭, 需要开启
            dispatch(AppAlertAction.alertQuery({
                title: `是否开启对[${SubSystemName}]的访问`,
                ok: () => { return this.SubsystemAccess.bind(this, SubSystemID, "open") },//调用SubsystemAccess方法进行开启
                okTitle: "是",
                cancelTitle: "否"

            }))

        }
        else if (status === 1) {
            //当前状态为已开启,需要关闭
            dispatch(AppAlertAction.alertQuery(
                {
                    title: `是否关闭对[${SubSystemName}]的访问`,
                    ok: () => { return this.SubsystemAccess.bind(this, SubSystemID, "close") },//调用SubsystemAccess方法进行关闭
                    okTitle: "是",
                    cancelTitle: "否"

                })
            )
        }
        else {
            console.log("子系统状态存在问题")
        }
    }


    /* 提示框中确认按钮触发的子系统开启或关闭的回调函数 
        @Parma1 子系统对应的ID
        @Parma2 判断关闭或者开启 开启为:open 关闭:close
    */
    SubsystemAccess = (SubSystemID, option) => {
        const { SchoolID } = JSON.parse(sessionStorage.getItem('UserInfo'));
        const { dispatch } = this.props
        console.log(SubSystemID);
        const url1 = `/SysMgr/Setting/OpenSubSystem`//开启子系统的接口地址
        const url2 = `/SysMgr/Setting/CloseSubSystem`//关闭系统的接口地址
        dispatch({
            type: DataChange.SEMESTER_LOADING_HIDE,
            data: true
        })
        if (option === "open") {
            //如果操作为开启子系统，则执行如下代码
            ApiAction.postMethod(url1, {
                "SubSystemID": SubSystemID,
            }).then(data => {
                if (data === 0) {

                    dispatch(AppAlertAction.closeAlert(dispatch));
                    dispatch(AppAlertAction.alertSuccess({ title: "开启成功" }))
                    //根据当前用户类型和开启状态下拉框的值来请求符合要求的子系统
                    dispatch(DataChange.getCurrentSbusystemInfo({ "IsOpened": this.state.AccessDropValue, "UserType": this.state.UserDropValue }));

                    // console.log("success")
                }
                else {
                    dispatch({
                        type: DataChange.SEMESTER_LOADING_HIDE,
                        data: false
                    })
                    dispatch(AppAlertAction.alertError({ title: data ? data : "未知异常" }));
                }
            })



        }
        else {
            //如果当前操作为关闭子系统，执行如下代码
            ApiAction.postMethod(url2, {
                "SubSystemID": SubSystemID,
            }).then(data => {
                if (data === 0) {
                    
                    dispatch(AppAlertAction.closeAlert(dispatch));
                    dispatch(AppAlertAction.alertSuccess({ title: "关闭成功" }))
                    //根据当前用户类型和开启状态下拉框的值来请求符合要求的子系统
                    dispatch(DataChange.getCurrentSbusystemInfo({ "IsOpened": this.state.AccessDropValue, "UserType": this.state.UserDropValue }));
                    // console.log("success")
                } else {
                    dispatch({
                        type: DataChange.SEMESTER_LOADING_HIDE,
                        data: false
                    })
                    dispatch(AppAlertAction.alertError({ title: data ? data : "未知异常" }));
                }
            })
        }


    }


    render() {
        const { subsystemInfo, semesterloading } = this.props

        //渲染子系统信息
        let renderSubSystem = "";
        let tipInfo = "";
        let exeit = "0"
        if (subsystemInfo.List) {
            if (subsystemInfo.List.length === 0) {
                console.log("不存在")
                tipInfo = <Empty type="3" className="Empty" title={'再检查一下，没有你要的子系统喔'} />
                exeit = "1"


            }
            renderSubSystem = subsystemInfo.List.map((item, key) => {
                return (
                    item.CanBeClose !== false ?
                        <div key={key} className="subsystem-wall">
                            <div className="grey-bg"></div>
                            <div className="subsystem-content">
                                <div className="pic-bg"> <img src={item.SubSystemImgUrl} alt="图片丢失" title={item.SubSystemName} /></div>
                                <span className="subsystemName">{item.SubSystemName}</span>
                                <div className="user-type"> <span title="可访问的用户类别"></span>{item.UserTypeString}</div>
                                <div className="split-line"></div>
                                <div className="access-state"> 当前状态:
                                <button className={`btn-state ${item.SubSystemStatus === 1 && item.CanBeClose === true ? 'open' :
                                        item.SubSystemStatus === 1 && item.CanBeClose === false ? "ban" : ""}`}
                                        onClick={(e) => this.toggleAccessState(e, item.SubSystemID, item.SubSystemName, item.SubSystemStatus, item.CanBeClose)}
                                        // disabled={item.CanBeClose === false}
                                        title={item.CanBeClose === false ? "该子系统不能被关闭" : ''}

                                    ></button>
                                </div>
                            </div>
                        </div> : "");

            })

        }




        return (
            <Loading spinning={semesterloading} opacity={false} tip="请稍后..." >
                <div className="subsystem-access">
                    <div className="guide">
                        <div className="subsystem-logo"></div>
                        <span>子系统访问设置</span>
                    </div>
                    <div className="access-status">
                        访问状态:
                    <DropDown
                            width={120}

                            dropSelectd={{ value: this.state.AccessDropValue, title: this.state.AccessDropTitle }}

                            dropList={[
                                {
                                    value: "2",
                                    title: "全部"
                                },
                                {

                                    value: "1",
                                    title: "已开启"

                                },
                                {
                                    value: "0",
                                    title: `已关闭`
                                },

                            ]}

                            height={120}

                            style={{ zIndex: 400 }}
                            onChange={this.dropAccessChange}
                        >

                        </DropDown>
                    </div>
                    <div className="users-type">
                        用户类型:
                    <DropDown
                            width={120}

                            dropSelectd={{ value: this.state.UserDropValue, title: this.state.UserDropTitle }}

                            dropList={[
                                {
                                    value: ``,
                                    title: `全部`
                                },
                                {
                                    value: `0`,
                                    title: `管理员`
                                },
                                {

                                    value: `1`,
                                    title: "教师"

                                },
                                {
                                    value: `2`,
                                    title: `学生`
                                },
                                {
                                    value: `7`,
                                    title: `校领导`
                                },


                            ]}

                            height={120}

                            style={{ zIndex: 400 }}
                            onChange={this.dropUserTypeChange}

                        >

                        </DropDown>
                    </div>
                    <div className="subsystem-search">
                        <Search placeHolder="输入关键词快速搜索"

                            onClickSearch={this.simpleClickSearch}
                            Value={this.state.simpleSearch}
                            onCancelSearch={this.onCancelSearch}
                            onChange={this.SearchValueChange}></Search>

                    </div>

                    <div className="subsystem-detail" style={{ display: `${exeit === "0" ? 'block' : 'none'}` }}>
                        共计<span>{subsystemInfo.Total}</span>个系统
                            {/* 如果用户下拉框的值为""(空字符串表示全部)同时访问的参数下来框的值为"2"(表示全部)，同时总子系统中没有被关闭的
                                才渲染如下对应的内容。简单的说就是，仅当两个下来框的都选中"全部" 时才显示有多少个已关闭的子系统
                            */}
                        {
                            this.state.UserDropValue === "" && this.state.AccessDropValue === "2" && subsystemInfo.TotalClose !== 0 ? <React.Fragment>，其中<span>{subsystemInfo.TotalClose}</span>个已关闭访问</React.Fragment> : ""
                        }
                    </div>

                    <div className="clearfix subsystem-container">


                        {renderSubSystem}
                        {tipInfo}

                    </div>




                    {/* <div>{subsystemInfo.SysID}</div> */}




                </div>
            </Loading>

        );
    }
}

const mapStateToProps = (state) => {
    const { DataUpdate } = state;
    const { subsystemInfo, semesterloading } = DataUpdate
    // console.log(AppAlert);

    return {
        subsystemInfo,
        semesterloading,

    }
}
export default connect(mapStateToProps)(SubsystemAccessSetting);