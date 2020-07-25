import React,{Component} from 'react';
import {Tips} from "../../../common";
import {DropDown,Loading,Button,Empty} from "../../../common";
import {Input,Tabs} from 'antd';
import ScrollBar from 'react-custom-scrollbars';

const { TabPane  } = Tabs;

class AddTeacherModal extends Component{

    constructor(props) {

        super(props);

        this.state={

            SearchBlank:false,

            TabActiveKey:"1"

        }

    }


    EnterDown(e){

        const { searchBtnClick } = this.props;

        if (e.keyCode===13){

            if (searchBtnClick){

                searchBtnClick(e);

            }

        }

    }

    InputBlur(){

        this.setState({SearchBlank:false});

    }

    SearchClick(e){

        const { searchBtnClick,inputContent } = this.props;

        if (!inputContent){

            this.setState({SearchBlank:true});

            this.Input.focus();

        }else{

            searchBtnClick(e);

        }

    }

    //切换tab

    TabChange(key){

        this.setState({TabActiveKey:key});

    }

    render() {

        const {

            loadingShow,

            teacherList,

            subjectTipsShow=false,

            subjects,

            subjectsSelect,

            itemClick,

            closeShow,

            newPickTeacher,

            originTeacherShow,

            originTeacherInfo,

            newTeacherTitle,

            originTeacherTitle,

            teacherModalDropChange,

            teacherLoadingShow,

            inputContent,

            inputContentChange,

            searchBtnClick,

            emptyShow,

            searchClose,

            subjectDropDisabled,

            TabShow,

            TheClassTeacherList,

            Ganger

        } = this.props;


        let subjectsList = subjects.map((item) => {

            return {value:item.SubjectID,title:item.SubjectName};

        });


        let ThisClassTeacherList = TabShow?(Ganger.IsSet?TheClassTeacherList.filter(item=>item.UserID!==Ganger.UserID):TheClassTeacherList):[];

        console.log(ThisClassTeacherList,Ganger);

        return (

            <div className="add-teacher-wrapper clearfix">

                <Loading className="add-teacher-loading" opacity={false} type="loading" size="large" spinning={loadingShow}  tip="加载中...">

                    <div className="left-wrapper">

                        <Loading tip="加载中..." spinning={teacherLoadingShow}>

                            {

                                TabShow?

                                    <Tabs activeKey={this.state.TabActiveKey} onChange={this.TabChange.bind(this)}>

                                        <TabPane key={"1"} tab="本班教师">

                                            <div className="teacher-list-wrapper tab1">

                                                {

                                                    !ThisClassTeacherList||ThisClassTeacherList.length===0?

                                                        <div className="empty-wrapper">

                                                            <Empty type="4" title="暂无教师数据"></Empty>

                                                        </div>

                                                        :

                                                        <ScrollBar style={{width:732,height:400}}>

                                                            {

                                                                ThisClassTeacherList.map((item,key) => {

                                                                    return <div key={key} className={`teacher-list-item ${newPickTeacher.id===item.UserID?'active':''}`} onClick={()=>{itemClick({id:item.UserID,photo:item.PhotoPath,name:item.UserName})}}>

                                                                        <div className="teacher-photo" style={{backgroundImage:`url(${item.PhotoPath})`}}></div>

                                                                        <div className="teacher-name" title={item.UserName}>{item.UserName}</div>

                                                                        <div className="teacher-id" title={`[${item.UserID}]`}>[<span className="id-body">{item.UserID}</span>]</div>

                                                                    </div>

                                                                })

                                                            }

                                                        </ScrollBar>

                                                }

                                            </div>

                                        </TabPane>

                                        <TabPane key={"2"} tab="全校教师">

                                            <div className="subject-select">

                                                <span className="props">所教学科:</span>

                                                <Tips visible={subjectTipsShow} title={"请先选择所教学科"}>

                                                    <DropDown

                                                        dropSelectd={subjectsSelect}

                                                        dropList = {subjectsList}

                                                        height = {200}

                                                        style={{zIndex:5}}

                                                        onChange = {(e) => {teacherModalDropChange(e)}}

                                                        disabled={subjectDropDisabled}

                                                    >

                                                    </DropDown>

                                                </Tips>

                                            </div>

                                            <div className="add-teacher-search">

                                                <span className="props">关键词:</span>

                                                <Input ref={ref=>this.Input=ref} type="text" className={`search-input ${this.state.SearchBlank?'border':''}`} placeholder="请输入工号或姓名进行搜索..." onChange={(e) => inputContentChange(e)} onKeyUp={this.EnterDown.bind(this)} value={inputContent} onBlur={e=>this.InputBlur(e)}/>

                                                <input type="button" className="search-close" onClick={() => searchClose()} style={{display:`${closeShow?'block':'none'}`}}/>

                                                <Button color="blue" className="search-btn" onClick={e=>this.SearchClick(e)}>搜索</Button>

                                            </div>

                                            <div className="teacher-list-wrapper tab2">

                                                {

                                                    teacherList.List&&teacherList.List.length>0?

                                                        <ScrollBar style={{width:732,height:340}}>

                                                            {

                                                                teacherList.List.map((item,key) => {

                                                                    return <div key={key} className={`teacher-list-item ${newPickTeacher.id===item.UserID?'active':''}`} onClick={()=>{itemClick({id:item.UserID,photo:item.PhotoPath,name:item.UserName})}}>

                                                                        <div className="teacher-photo" style={{backgroundImage:`url(${item.PhotoPath})`}}></div>

                                                                        <div className="teacher-name" title={item.UserName}>{item.UserName}</div>

                                                                        <div className="teacher-id" title={`[${item.UserID}]`}>[<span className="id-body">{item.UserID}</span>]</div>

                                                                    </div>

                                                                })

                                                            }

                                                        </ScrollBar>

                                                        :

                                                        <div className="empty-wrapper">

                                                            {/* <Empty type="4"  title="没有相对应的教师"></Empty>*/}

                                                            {

                                                                subjectsSelect.value==='none'?

                                                                    <Empty type="4" title="请选择学科"></Empty>

                                                                    :

                                                                    closeShow?

                                                                        <Empty type="4" title="暂无符合条件的教师数据"></Empty>

                                                                        :

                                                                        <Empty type="4" title="暂无教师数据"></Empty>

                                                            }


                                                        </div>

                                                }

                                            </div>

                                        </TabPane>

                                    </Tabs>

                                    :

                                    <>


                                        <div className="subject-select">

                                            <span className="props">所教学科:</span>

                                            <Tips visible={subjectTipsShow} title={"请先选择所教学科"}>

                                                <DropDown

                                                    dropSelectd={subjectsSelect}

                                                    dropList = {subjectsList}

                                                    height = {200}

                                                    style={{zIndex:5}}

                                                    onChange = {(e) => {teacherModalDropChange(e)}}

                                                    disabled={subjectDropDisabled}

                                                >

                                                </DropDown>

                                            </Tips>

                                        </div>

                                        <div className="add-teacher-search">

                                            <span className="props">关键词:</span>

                                            <Input ref={ref=>this.Input=ref} type="text" className={`search-input ${this.state.SearchBlank?'border':''}`} placeholder="请输入工号或姓名进行搜索..." onChange={(e) => inputContentChange(e)} onKeyUp={this.EnterDown.bind(this)} value={inputContent} onBlur={e=>this.InputBlur(e)}/>

                                            <input type="button" className="search-close" onClick={() => searchClose()} style={{display:`${closeShow?'block':'none'}`}}/>

                                            <Button color="blue" className="search-btn" onClick={e=>this.SearchClick(e)}>搜索</Button>

                                        </div>

                                        <div className="teacher-list-wrapper">

                                            {

                                                teacherList.List&&teacherList.List.length>0?

                                                    <ScrollBar style={{width:732,height:360,marginLeft:12}}>

                                                        {

                                                            teacherList.List.map((item,key) => {

                                                                return <div key={key} className={`teacher-list-item ${newPickTeacher.id===item.UserID?'active':''}`} onClick={()=>{itemClick({id:item.UserID,photo:item.PhotoPath,name:item.UserName})}}>

                                                                    <div className="teacher-photo" style={{backgroundImage:`url(${item.PhotoPath})`}}></div>

                                                                    <div className="teacher-name" title={item.UserName}>{item.UserName}</div>

                                                                    <div className="teacher-id" title={`[${item.UserID}]`}>[<span className="id-body">{item.UserID}</span>]</div>

                                                                </div>

                                                            })

                                                        }

                                                    </ScrollBar>

                                                    :

                                                    <div className="empty-wrapper">

                                                        {/* <Empty type="4"  title="没有相对应的教师"></Empty>*/}

                                                        {

                                                            subjectsSelect.value==='none'?

                                                                <Empty type="4" title="请选择学科"></Empty>

                                                                :

                                                                closeShow?

                                                                    <Empty type="4" title="暂无符合条件的教师数据"></Empty>

                                                                    :

                                                                    <Empty type="4" title="暂无教师数据"></Empty>

                                                        }


                                                    </div>

                                            }

                                        </div>

                                    </>

                            }



                        </Loading>

                    </div>

                    <div className="right-wrapper">

                        {

                            originTeacherShow?

                                <div className="origin-teacher-wrapper">

                                    <div className="orgin-teacher-title">{originTeacherTitle?originTeacherTitle:"原任课教师"}</div>

                                    <div className="origin-teacher-photo" style={{backgroundImage:`url(${originTeacherInfo.photo})`}}></div>

                                    <div className="origin-teacher-name" title={originTeacherInfo.name}>{originTeacherInfo.name}</div>

                                    <div className="origin-teacher-id" title={`[${originTeacherInfo.id}]`}>[<span className="id-body">{originTeacherInfo.id}</span>]</div>

                                </div>

                                :''

                        }

                        <div className="present-teacher-wrapper">

                            <div className={`present-teacher-title ${originTeacherShow?'':'no-origin'}`}>{newTeacherTitle}</div>

                            <div className="present-teacher-photo" style={{backgroundImage:`url(${newPickTeacher.photo})`}}></div>

                            <div className={`present-teacher-name ${newPickTeacher.id?'':'no-picked'}`} title={newPickTeacher.name} >{newPickTeacher.name}</div>

                            {
                                //如果没有选中教师的情况下：
                                newPickTeacher.id?

                                    <div className="present-teacher-id" title={`[${newPickTeacher.id}]`}>[<span className="id-body">{newPickTeacher.id}</span>]</div>

                                    :''
                            }

                        </div>

                    </div>

                </Loading>



            </div>

        );
    }
}
export default AddTeacherModal;