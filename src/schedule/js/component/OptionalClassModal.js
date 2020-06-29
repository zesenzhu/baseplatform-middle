import React,{Component} from 'react';

import { Modal,Table,Loading,PagiNation } from '../../../common';

class OptionalClassModal extends Component{

    render() {

        const { Show,Close,LoadingShow,DataSource,CurrentPage,PageChange } = this.props;

        let Columns = [

            {
                title:"教学班名称",

                align:"center",

                dataIndex:"CourseClassName",

                key:"CourseClassName",

                width:240,

                render:(data)=>{

                    return <div className="course-name" title={data}>{data}</div>

                }

            },
            {

                title:"任课教师",

                align:"center",

                dataIndex:"TeacherName",

                key:"TeacherName",

                width:240,

                render:(data)=>{

                    return <div className="teacher-name" title={data}>{data}</div>

                }
                
            },

            {

                title:"上课教室",

                align:"center",

                dataIndex:"ClassRoomName",

                key:"ClassRoomName",

                width:240,

                render:(data)=>{

                    return <div className="class-room-name" title={data}>{data}</div>

                }

            }

        ];



        return (

            <Modal
                type="1"
                title="走班课程详情"
                visible={Show}
                footer={null}
                width={720}
                bodyStyle={{height:484}}
                className="optional-class-modal"
                onCancel={()=>Close()}
                destroyOnClose={true}
            >
                <Loading spinning={LoadingShow}>

                    <Table columns={Columns} dataSource={DataSource} pagination={{hideOnSinglePage:true,pageSize:7,current:CurrentPage,onChange:PageChange}}></Table>

                    {/*<PagiNation></PagiNation>*/}

                </Loading>

            </Modal>

        );

    }

}

export default OptionalClassModal;