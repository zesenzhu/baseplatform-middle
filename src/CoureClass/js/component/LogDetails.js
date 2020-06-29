import React from 'react'
import { connect } from 'react-redux';
import { Table, Button, PagiNation, CheckBox, CheckBoxGroup } from "../../../common";
import actions from '../actions';
import history from '../containers/history'
import { postData, getData } from '../../../common/js/fetch'
import CONFIG from '../../../common/js/config';
import '../../scss/LogDetails.scss'

class LogDetails extends React.Component{
    constructor(props){
        super(props);
        this.state=({
            columns: [
                {
                    title: '序号',
                    align: 'center',
                    width:70,
                    key: 'OrderNO',
                    dataIndex: 'OrderNO',
                    render: OrderNO => {
                        return (
                            <div className='CheckBox-content'>
                                <span className='key-content'>{OrderNO >= 10 ? OrderNO : '0' + OrderNO}</span>
                            </div>
                        )
                    }

                },
                {
                    title: '班级名称',
                    align: 'center',
                    dataIndex: 'CourseClassName',
                    key: 'CourseClassName',
                    render: CourseClassName => {
                        return (
                            <React.Fragment>
                                <span  className='courseClass-name'>{CourseClassName}</span>
                            </React.Fragment>
                        )
                    }
                },
                {
                    title: '任课老师',
                    align: 'center',
                    dataIndex: 'TeacherName',
                    key: 'TeacherName',
                    render: TeacherName => {
                        return (
                            <React.Fragment>
                                <span className='TeacherName'>{TeacherName}</span>
                            </React.Fragment>
                        )
                    }
                },
                {
                    title: '学生人数',
                    align: 'center',
                    dataIndex: 'StudentCount',
                    key: 'StudentCount',
                    render: StudentCount => {
                        return (
                            <React.Fragment>
                                <span className='StudentCount'>{StudentCount}</span>
                            </React.Fragment>
                        )
                    }
                }
            ]
        })
    }
    render(){
        const { DataState, UIState } = this.props;
        let datasource = DataState.GetLogDetailsMsg.tableSource ? DataState.GetLogDetailsMsg.tableSource : []
        return(
            <React.Fragment>
                <Table
                className='table'
                loading={UIState.AppLoading.modalLoading}
                columns={this.state.columns}
                pagination={datasource.length<=9?false:{className:'pagination', pageSize: 9, showQuickJumper: { goButton: (<Button className='go-btn' color='blue' size='small'>GO</Button>) } }}
                dataSource={datasource}
                >

                </Table>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    let { UIState, DataState } = state;
    return {
        UIState,
        DataState
    }
};
export default connect(mapStateToProps)(LogDetails);