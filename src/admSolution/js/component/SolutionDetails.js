import React from 'react'
import { connect } from 'react-redux';
import actions from '../actions';
import { postData, getData } from '../../../common/js/fetch'
import '../../scss/SolutionDetails.scss'
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import CONFIG from '../../../common/js/config';
import { Table ,Button} from "../../../common";
import doc from '../../images/doc.png'
import docx from '../../images/docx.png'
import excel from '../../images/excel.png'
import html from '../../images/html.png'
import jpg from '../../images/jpg.png'
import mp3 from '../../images/mp3.png'
import mp4 from '../../images/mp4.png'
import png from '../../images/png.png'
import txt from '../../images/txt.png'
import url from '../../images/url.png'
import Default from '../../images/default.png'
let FileType = {
    doc:doc,
    docx:docx,
    excel:excel,
    html:html,
    jpg:jpg,
    mp3:mp3,
    mp4:mp4,
    png:png,
    txt:txt,
    url:url,
    Default:Default
}
class SolutionDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { 
                    title: '序号',
                    align: 'center',
                    key: 'OrderNO',
                    width:72,
                    dataIndex: 'OrderNO',
                    render: OrderNO => {
                        return (
                            <div className='OrderNO'>
                                <span className='OrderNO-content'>{OrderNO >= 10 ? OrderNO : '0' + OrderNO}</span>
                            </div>
                        )
                    }

                },
                {
                    title: '文件名',
                    align: 'left',
                    width:517,
                    dataIndex: 'FileName',
                    key: 'FileName',
                    render: FileName => { 
                        return (
                            <React.Fragment>
                                <span title={FileName} className='FileName'><img width={15} height={17} style={{marginRight:10+'px'}} alt={FileName} src={FileType[FileName.slice(FileName.lastIndexOf('.')+1)]||FileType['Default']}></img>{FileName}</span>
                            </React.Fragment>
                        )
                    }
                },
                {
                    title: '文件大小',
                    align: 'center',
                    width:148,
                    dataIndex: 'FileSize',
                    key: 'FileSize',
                    render: FileSize => {
                        return (
                            <React.Fragment>
                                <span title={this.setFileSize(FileSize)} className='FileSize'>{this.setFileSize(FileSize)}</span>
                            </React.Fragment>
                        )
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    width:148,
                    key: 'handle',
                    dataIndex: 'FileAccessPath',
                    render: (FileAccessPath) => {

                        return (
                            <div className='handle-content'>
                                <Button color='blue' shape='round' size='small' className='handle-btn'><a href={FileAccessPath} rel='files' target='_blank'>浏览</a></Button>
                            </div>
                        )
                    }
                }
            ],
        }
    }

    //设置文件大小单位
    setFileSize = (fileSize) => {
        let unit = ['B','KB','M','G','T'];
        let EndFileSize = fileSize+'B';
        let i = unit.length-1;
        let myUnit = 'B'
        for(i;i>=0;i--){
            if(fileSize/Math.pow(1024,i)>=1){
                myUnit = unit[i];
                break;
            }
        }
        let str = Math.round(fileSize/Math.pow(1024,i)*100)/100;
        let Size = str.toString()+myUnit;
        // // console.log(i,myUnit,Size)
        return Size;
        
    }

    //浏览
    onCheckClassClick = (key) => {
        // console.log(key)
    }
    
    render() {
        const {DataState} = this.props;
        let SolutionMsg = DataState.GetTeachingSolutionDetailsMsg;
        
        return (
            <div id='SolutionDetails' className='SolutionDetails '>
                <div className='top'>
                    <span className='top-content'>
                        <span className='left'>方案名称：</span>
                        <span title={SolutionMsg.SolutionName} className='right SolutionName'>{SolutionMsg.SolutionName?SolutionMsg.SolutionName:'--'}</span>
                    </span>
                    <span className='top-content'>
                        <span className='left'>学科：</span>
                        <span title={SolutionMsg.SubjectName} className='right'>{SolutionMsg.SubjectName?SolutionMsg.SubjectName:'--'}</span>
                    </span>
                    <span className='top-content'>
                        <span className='left'>创建时间：</span>
                        <span title={SolutionMsg.CreateTime} className='right'>{SolutionMsg.CreateTime?SolutionMsg.CreateTime:'--'}</span>
                    </span>
                    
                </div>
                <div className='main'>
                    <div className='main-top'>
                    <span className='top-content'>
                        <span className='left'>文件列表[</span>
                        <span title={SolutionMsg.FilesCount} className='right'>{SolutionMsg.FilesCount}</span>
                        个]</span>
                    </div>
                    <Table
                    className='table'
                    columns={this.state.columns}
                    pagination={false}
                    bordered
                    dataSource={DataState.GetTeachingSolutionDetailsMsg.solutionDetailsData}
                    >
                    </Table>
                </div>
                
            </div>

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
export default connect(mapStateToProps)(SolutionDetails);