import React, { Component } from "react";

import { TokenCheck_Connect } from "../../../../common/js/disconnect";

import setting from "../../../images/setting_logo.png";
import { Modal, Loading, DropDown } from "../../../../common";
import AppAlertAction from "../../action/UI/AppAlertAction";

import config from "../../../../common/js/config";
import history from "../../containers/history";
import { QueryPower } from "../../../../common/js/power";
import versionChenck from "../../../../common/js/public";

import UpDataState from "../../action/data/UpDataState";
import { Collapse, Icon, Select, Table, Input, Tree } from "antd";
import PeriodTable from "./PeriodTable";
import SetTextBookModal from "./SetTextBookModal";
import TextBookMsgModal from "./TextBookMsgModal";
import { connect } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import { postData } from "../../../../common/js/fetch";
const { Panel } = Collapse;
// const { TreeNode } = Tree;
class TextBookSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      inputValue: '',
      TermList: [{ title: '不限', value: '0' }, { title: '第1学期', value: '1' }, { title: '第2学期', value: '2' }],
      dropListSelectidx1: 0,
      dropListSelectidx2: 0,
      dropListSelectidx3: 0,
      chapters: [],
      TreeOnclicknode: -2,
      nodeValue: '',
      isreName: false,
      showNodeArr: [],
      showdata: 1,
      showloading:false,
      TextBookData:{},
      isupdata:false,
    };
    // console.log('1245')
    props.dispatch(UpDataState.GetSubjectListData({}));
    // props.dispatch(
    //   UpDataState.SetTextBookInitData({
    //     Subject: {
    //       SubjectID: 123,
    //       SubjectName: "学科",
    //     },
    //     Grade: {
    //       GradeID: 123,
    //       GradeName: "年级",
    //     },
    //     Period: {
    //       PeriodID: 123,
    //       PeriodName: "学期",
    //     },
    //     TextBook: {
    //       TextBookID: 123,
    //       TextBookName: "教材",
    //     },
    //   })
    // );
    // props.dispatch(
    //   UpDataState.SetTextBookModalParams({ SetTextBookModalVisible: true })
    // );
    // props.dispatch(
    //   UpDataState.SetNodeInfoData({ TextBookModalVisible: true })
    // );
  }
  // 抽屉change
  onCollapseChange = (value) => {
    const { dispatch } = this.props;
    console.log(value);
    dispatch(
      UpDataState.SetOpenSubjectData({
        OpenList: value,
      })
    );
  };
  // 设置
  onEditClick = (data) => {
    // console.log(data,33333);
    const { dispatch } = this.props;
    dispatch(
      UpDataState.SetTextBookInitData({
        Subject: data.Subject,
        Grade: data.Grade,
        Period: data.Period,
        TextBook: data.TextBook,
      })
    );
    dispatch(
      UpDataState.SetTextBookModalParams({ SetTextBookModalVisible: true })
    );
    dispatch(
      UpDataState.GetTextBookList({
        subjectId: data.Subject.SubjectID,
        gradeId: data.Grade.GradeID,
        // subjectId: "",
        // gradeId: "",
      })
    );
  };
  // 详情
  onTextBookDetailClick = (id,it) => {
    // console.log(it,4444)
    this.setState({
      TextBookData:it
    })
    const { dispatch } = this.props;
    dispatch(
      UpDataState.GetNodeInfoData({
        upId: id,
      })
    );
  };
  // 设置modal ok
  setTextBookModalOk = () => {
    const { dispatch, DataState } = this.props;
    let {
      Subject,
      Grade,
      TextBook,
      Period,
    } = DataState.TextBookParams.SetTextBook.TextBookMsg;
    if (!TextBook.TextBookId) {
      dispatch(
        AppAlertAction.alertError({ type: "btn-warn", title: `请选择教材` })
      );

      return;
    }
    dispatch(
      UpDataState.SetTextBookInfoData({
        subjectId: Subject.SubjectID,
        gradeId: Grade.GradeID,
        textbookId: TextBook.TextBookId,
        periodId: Period.PeriodID,
        func: () => {
          dispatch(
            UpDataState.SetTextBookModalParams({
              SetTextBookModalVisible: false,
            })
          );
          dispatch(
            UpDataState.SetTextBookInitData({
              ...DataState.TextBookParams.SetTextBook.CopyTextBookMsg,
            })
          );

          dispatch(
            UpDataState.GetSubjectListData({
              isFirstLoad: false,
              func: (State) => {
                // let {
                //   OpenList,
                // } = State.DataState.TextBookParams.SelectSubjects;
                // OpenList instanceof Array &&
                //   OpenList.map((subjectId) => {
                dispatch(UpDataState.GetSubjectInfoData({ subjectId: Subject.SubjectID }));
                // });
              },
            })
          );
        },
      })
    );
  };
  setTextBookModalCancel = () => {
    const { dispatch, DataState } = this.props;

    dispatch(
      UpDataState.SetTextBookInitData({
        ...DataState.TextBookParams.SetTextBook.CopyTextBookMsg,
      })
    );
    dispatch(
      UpDataState.SetTextBookModalParams({ SetTextBookModalVisible: false })
    );
  };
  TextBookMsgModalOk = () => {
    // const { dispatch, DataState } = this.props;

    // dispatch(
    //   UpDataState.GetNodeInfoData({
    //     ...DataState.TextBookParams.SetTextBook.CopyTextBookMsg
    //   })
    // );
   
    const { dispatch, DataState: {
      LoginUser: {
        SchoolID
      },
      TextBookData: { GradeSubjectList,
        NodeInfo
      },
    } } = this.props;
    this.setState({
      showloading:true,
    },()=>{
      let NodeList =JSON.parse(JSON.stringify(NodeInfo.NodeList));
      if (GradeSubjectList.length == 0) {
        dispatch(
          UpDataState.GetGradeSubjectInfo({
            schoolId: SchoolID,
            func: (State) => {
              // console.log(State, 31231);
              let dropListSelectidx1 = 0;
              let dropListSelectidx2 = 0;
              for (let i = 0; i < State.GradeSubjectList.length; i++) {
                console.log(State.GradeSubjectList[i].GradeId,this.state.TextBookData.GradeID);
                if (State.GradeSubjectList[i].GradeId ==this.state.TextBookData.GradeID) {
                  dropListSelectidx1 = i;
                  for (let j = 0; j < State.GradeSubjectList[i].Subjects.length; j++) {
                    if (State.GradeSubjectList[i].Subjects[j].SubjectID == this.state.TextBookData.SubjectID) {
                      dropListSelectidx2 = j;
                      break;
                    }
                  }
                  break;
                }
              }
              let chapters=[];
              if(NodeList.length>0){
                // chapters= NodeList;
                NodeList.map((item,idx)=>{
                  chapters.push({
                    value:idx,
                    chapterName:item.nodeName,
                    chapters:[],
                  })
                  if(item.childs.length>0){
                    item.childs.map((it,id)=>{
                      chapters[idx].chapters.push({
                        value:id,
                        chapterName:it.nodeName,
                        chapters:[],
                      })
                    })
                   
                  }
                })
              }
              dispatch(UpDataState.SetNodeInfoData({ TextBookModalVisible: false }));
              // console.log(GradeID, SubjectID);
              this.setState({
                visible: true,
                showdata: 2,
                inputValue: this.state.TextBookData.TextBookName,
                dropListSelectidx1,
                dropListSelectidx2,
                dropListSelectidx3: this.state.TextBookData.TermId,
                chapters,
                TreeOnclicknode: -2,
                nodeValue: '',
                isreName: false,
                showNodeArr: [],
              
              });
              setTimeout(()=>{
                this.setState({
                  showloading:false
                })
              },500)
  
            },
          })
        );
      } else {
        let dropListSelectidx1 = 0;
        let dropListSelectidx2 = 0;
        for (let i = 0; i < GradeSubjectList.length; i++) {
          // console.log(State.GradeSubjectList[i].GradeID);
          if (GradeSubjectList[i].GradeId == this.state.TextBookData.GradeID) {
            dropListSelectidx1 = i;
            for (let j = 0; j < GradeSubjectList[i].Subjects.length; j++) {
              if (GradeSubjectList[i].Subjects[j].SubjectID == this.state.TextBookData.SubjectID) {
                dropListSelectidx2 = j;
                break;
              }
            }
            break;
          }
        }
         let chapters=[];
              if(NodeList.length>0){
                // chapters= NodeList;
                NodeList.map((item,idx)=>{
                  chapters.push({
                    value:idx,
                    chapterName:item.nodeName,
                    chapters:[],
                  })
                  if(item.childs.length>0){
                    item.childs.map((it,id)=>{
                      chapters[idx].chapters.push({
                        value:id,
                        chapterName:it.nodeName,
                        chapters:[],
                      })
                    })
                   
                  }
                })
              }
              dispatch(UpDataState.SetNodeInfoData({ TextBookModalVisible: false }));
        this.setState({
          visible: true,
          showdata: 2,
          inputValue: this.state.TextBookData.TextBookName,
          dropListSelectidx1,
          dropListSelectidx2,
          dropListSelectidx3:this.state.TextBookData.TermId,
          chapters,
          TreeOnclicknode: -2,
          nodeValue: '',
          isreName: false,
          showNodeArr: [],
         
        });
        setTimeout(()=>{
          this.setState({
            showloading:false
          })
        },500)
      }
    })
   
    // this.setState({
    //   visible:true,
    // })
  };
  TextBookMsgModalCancel = () => {
    const { dispatch, DataState } = this.props;

    // dispatch(
    //   UpDataState.GetNodeInfoData({
    //     ...DataState.TextBookParams.SetTextBook.CopyTextBookMsg
    //   })
    // );
    
    dispatch(UpDataState.SetNodeInfoData({ TextBookModalVisible: false }));
    // if(this.state.isupdata){
    //   this.setState({
    //     isupdata:false
    //   })
    //   dispatch(UpDataState.GetSubjectInfoData({ subjectId: this.state.TextBookData.SubjectID }));
    // }
  };




  setTextBookshow = (statedata) => {
    // console.log(statedata,666);
    const { dispatch, DataState: {
      LoginUser: {
        SchoolID
      },
      TextBookData: { GradeSubjectList
      },
      TextBookParams: { SetTextBook: {
        InitTextBookMsg: {
          Period,
          Subject: { SubjectID },
          Grade: { GradeID },
        }
      } }
    } } = this.props;

    if (GradeSubjectList.length == 0) {
      dispatch(
        UpDataState.GetGradeSubjectInfo({
          schoolId: SchoolID,
          func: (State) => {
            // console.log(State, 31231);
            let dropListSelectidx1 = 0;
            let dropListSelectidx2 = 0;
            for (let i = 0; i < State.GradeSubjectList.length; i++) {
              // console.log(State.GradeSubjectList[i].GradeID);
              if (State.GradeSubjectList[i].GradeId == GradeID) {
                dropListSelectidx1 = i;
                for (let j = 0; j < State.GradeSubjectList[i].Subjects.length; j++) {
                  if (State.GradeSubjectList[i].Subjects[j].SubjectID == SubjectID) {
                    dropListSelectidx2 = j;
                    break;
                  }
                }
                break;
              }
            }
            // console.log(GradeID, SubjectID);
            this.setState({
              visible: true,
              showdata: statedata,
              inputValue: '',
              dropListSelectidx1,
              dropListSelectidx2,
              dropListSelectidx3: Period.PeriodID,
              chapters: [],
              TreeOnclicknode: -2,
              nodeValue: '',
              isreName: false,
              showNodeArr: [],
            });

          },
        })
      );
    } else {
      let dropListSelectidx1 = 0;
      let dropListSelectidx2 = 0;
      for (let i = 0; i < GradeSubjectList.length; i++) {
        // console.log(State.GradeSubjectList[i].GradeID);
        if (GradeSubjectList[i].GradeId == GradeID) {
          dropListSelectidx1 = i;
          for (let j = 0; j < GradeSubjectList[i].Subjects.length; j++) {
            if (GradeSubjectList[i].Subjects[j].SubjectID == SubjectID) {
              dropListSelectidx2 = j;
              break;
            }
          }
          break;
        }
      }
      this.setState({
        visible: true,
        showdata: statedata,
        inputValue: '',
        dropListSelectidx1,
        dropListSelectidx2,
        dropListSelectidx3: Period.PeriodID,
        chapters: [],
        TreeOnclicknode: -2,
        nodeValue: '',
        isreName: false,
        showNodeArr: [],
      });
    }

  }

  setTextBookOk = () => {
    const { dispatch, DataState: {
      LoginUser: {
        SchoolID
      },
      TextBookData: { GradeSubjectList
      },
      TextBookParams:{
        SetTextBook:{
          InitTextBookMsg
        }
      
      }
    } } = this.props;
    
    if (this.state.inputValue.length == 0) {

      dispatch(AppAlertAction.alertError({ type: "btn-error", title: '教材名称不能为空' }));
      return
    }
    let chapters = this.state.chapters;
    if (chapters.length > 0) {
      chapters.map((item, idx) => {
        chapters[idx].orderNo = idx;
        delete chapters[idx].showNodeArr;
        if (chapters[idx].chapters.length > 0) {
          chapters[idx].chapters.map((it, id) => {
            chapters[idx].chapters[id].orderNo = id;
          })
        }
      })
    }
    if(this.state.showdata==1){
      let url = config.TextBookProxy + '/AddTextBook';

      // console.log(GradeSubjectList[this.state.dropListSelectidx1],GradeSubjectList[this.state.dropListSelectidx1].Subjects[this.state.dropListSelectidx2].SubjectId);
      let parem = {
        "schoolId": SchoolID,
        "bookName": this.state.inputValue,
        "subjectId": GradeSubjectList[this.state.dropListSelectidx1].Subjects[this.state.dropListSelectidx2].SubjectID,
        "gradeId": GradeSubjectList[this.state.dropListSelectidx1].GradeId,
        "term": this.state.dropListSelectidx3,
        "chapters": chapters
      }
      this.setState({showloading:true})
      postData(url, parem, 2, 'json').then((res) => {
        this.setState({showloading:false})
        return res.json();
      }).then((json) => {
        // console.log(json)
        if (json.StatusCode == 200) {
          this.setState({ visible: false });
          dispatch(
            UpDataState.SetTextBookModalParams({ SetTextBookModalVisible: true })
          );
          dispatch(
            UpDataState.GetTextBookList({
              subjectId: InitTextBookMsg.Subject.SubjectID,
              gradeId: InitTextBookMsg.Grade.GradeID,
              // subjectId: "",
              // gradeId: "",
            })
          );
        }
  
      })
    }else{
      let url = config.TextBookProxy + '/ModifyTextBook';

      // console.log(GradeSubjectList[this.state.dropListSelectidx1],GradeSubjectList[this.state.dropListSelectidx1].Subjects[this.state.dropListSelectidx2].SubjectId);
      let parem = {
        "schoolId": SchoolID,
        "bookName": this.state.inputValue,
        "subjectId": GradeSubjectList[this.state.dropListSelectidx1].Subjects[this.state.dropListSelectidx2].SubjectID,
        "gradeId": GradeSubjectList[this.state.dropListSelectidx1].GradeId,
        "term": this.state.dropListSelectidx3,
        "chapters": chapters,
        bookId:this.state.TextBookData.TextBookId,
      }
      this.setState({showloading:true})
      postData(url, parem, 2, 'json').then((res) => {
        this.setState({showloading:false})
        return res.json();
      }).then((json) => {
        // console.log(json)
        if (json.StatusCode == 200) {
          this.setState({ visible: false,isupdata:true });
          // dispatch(UpDataState.SetNodeInfoData({ TextBookModalVisible: true }));
          dispatch(UpDataState.GetSubjectInfoData({ subjectId: this.state.TextBookData.SubjectID }));
        }
  
      })
    }
   


  }
  setTextBookCancel = () => {
    this.setState({ visible: false })
  }
  changeinput = (e) => {
    this.setState({
      inputValue: e.target.value.trim()
    })
  }
  inputFocus = () => {

  }

  onDropChange3 = (e) => {
    this.setState({
      dropListSelectidx3: e.value
    })
  }
  onDropChange1 = (e) => {
    this.setState({
      dropListSelectidx1: e.value,
      dropListSelectidx2: 0,
    })
  }
  onDropChange2 = (e) => {
    this.setState({
      dropListSelectidx2: e.value
    })
  }
  changeNodeValue = (e) => {
    this.setState({
      nodeValue: e.target.value.trim()
    })
  }

  addNode = (idx) => {
    // console.log(idx,31)
    this.setState({
      TreeOnclicknode: idx,
      nodeValue: '',
      isreName: false,
    }, () => {
      this.refs.myinput.focus();
    })
  }
  addChildNode = (idx, id) => {
    this.setState({
      TreeOnclicknode: idx + '&' + id,
      nodeValue: '',
      isreName: false,
    }, () => {
      this.refs.myinput.focus();
    })
  }
  addNodeOK = () => {
    let chapters = this.state.chapters;
    let showNodeArr = this.state.showNodeArr;
    showNodeArr.push(chapters.length);
    let Test = /^[0-9a-zA-Z()（），<>【】《》#￥、\$&\*\\@\+\|\?\-_.\[\]\s*\u4E00-\u9FA5\uF900-\uFA2D-]{1,50}$/;
    if (!Test.test(this.state.nodeValue)) {
      const { dispatch, DataState } = this.props;
      dispatch(AppAlertAction.alertError({ type: "btn-tips", title: '目录名称格式不正确！目录名称只能由字母,数字,中文,空格，@#￥$&*（）()-+|\、？《》<>[]【】组成' }));
      return
    }

    chapters.push({
      chapterName: this.state.nodeValue,
      chapters: [],
      showNodeArr,
    })

    this.setState({
      chapters,
      TreeOnclicknode: -2,
    })
  }
  addChildNodeOK = (idx) => {
    let chapters = this.state.chapters;
    // console.log(idx, 3133);
    // let showNodeArr= this.state.showNodeArr;
    // showNodeArr.push(chapters.length);
    let Test = /^[0-9a-zA-Z()（），<>【】《》#￥、\$&\*\\@\+\|\?\-_.\[\]\s*\u4E00-\u9FA5\uF900-\uFA2D-]{1,50}$/;
    if (!Test.test(this.state.nodeValue)) {
      const { dispatch, DataState } = this.props;
      dispatch(AppAlertAction.alertError({ type: "btn-tips", title: '目录名称格式不正确！目录名称只能由字母,数字,中文,空格，@#￥$&*（）()-+|\、？《》<>[]【】组成' }));
      return
    }
    chapters[idx].chapters.push({
      chapterName: this.state.nodeValue,
      chapters: [],
    })
    // console.log(chapters, 12313);
    this.setState({
      chapters,
      TreeOnclicknode: -2,
    })
  }
  renameNode(idx, nodeValue) {
    this.setState({
      TreeOnclicknode: idx,
      nodeValue,
      isreName: true,
    }, () => {
      this.refs.myinput.focus();
    })
  }
  setNodeOK(idx) {
    let chapters = this.state.chapters;
    let Test = /^[0-9a-zA-Z()（），<>【】《》#￥、\$&\*\\@\+\|\?\-_.\[\]\s*\u4E00-\u9FA5\uF900-\uFA2D-]{1,50}$/;
    if (!Test.test(this.state.nodeValue)) {
      const { dispatch, DataState } = this.props;
      dispatch(AppAlertAction.alertError({ type: "btn-tips", title: '目录名称格式不正确！目录名称只能由字母,数字,中文,空格，@#￥$&*（）()-+|\、？《》<>[]【】组成' }));
      return
    }
    if (this.state.isreName) {
      chapters[idx].chapterName = this.state.nodeValue;
    } else {

      chapters.push({
        chapterName: this.state.nodeValue,
        orderNo: chapters.length,
        chapters: [],
      })

    }
    this.setState({
      chapters,
      TreeOnclicknode: -2,
    })
  }
  upNode(idx) {
    let chapters = this.state.chapters;
    let node = JSON.parse(JSON.stringify(chapters[idx]));
    let showNodeArr = this.state.showNodeArr;
    let oldShow = -1;
    let nowSHow = -1;
    for (let i = 0; i < showNodeArr.length; i++) {
      if (showNodeArr[i] == idx - 1) {

        oldShow = i;

      }
      if (showNodeArr[i] == idx) {

        nowSHow = i;

      }

    }
    if (oldShow > -1) {
      showNodeArr.splice(oldShow, 1, idx);
    }
    if (nowSHow > -1) {
      showNodeArr.splice(nowSHow, 1, idx - 1);
    }
    // console.log(showNodeArr);
    chapters.splice(idx, 1);
    chapters.splice(idx - 1, 0, node);
    this.setState({
      chapters,
      showNodeArr,
    })
  }
  downNode(idx) {
    let chapters = this.state.chapters;
    let node = JSON.parse(JSON.stringify(chapters[idx]));
    let showNodeArr = this.state.showNodeArr;
    let oldShow = -1;
    let nowSHow = -1;
    for (let i = 0; i < showNodeArr.length; i++) {
      if (showNodeArr[i] == idx + 1) {
        oldShow = i;
      }
      if (showNodeArr[i] == idx) {
        nowSHow = i;
      }

    }
    if (oldShow > -1) {
      showNodeArr.splice(oldShow, 1, idx);
    }
    if (nowSHow > -1) {
      showNodeArr.splice(nowSHow, 1, idx + 1);
    }
    chapters.splice(idx, 1);
    chapters.splice(idx + 1, 0, node);
    this.setState({
      chapters,
    })
  }
  delNode(idx) {
    let chapters = this.state.chapters;
    chapters.splice(idx, 1);
    // this.showNodeAll(idx);
    let showNodeArr = this.state.showNodeArr;
    for (let i = 0; i < showNodeArr.length; i++) {
      if (showNodeArr[i] == idx ) {
        showNodeArr.splice(idx, 1);
      }
    }
    this.setState({
      chapters,
      showNodeArr,
    })
  }



  renameChildNode(idx, id, nodeValue) {
    this.setState({
      TreeOnclicknode: idx + "&" + id,
      nodeValue,
      isreName: true,
    }, () => {
      this.refs.myinput.focus();
    })
  }

  setChildNodeOK(idx, id) {
    let chapters = this.state.chapters;
    let Test = /^[0-9a-zA-Z()（），<>【】《》#￥、\$&\*\\@\+\|\?\-_.\[\]\s*\u4E00-\u9FA5\uF900-\uFA2D-]{1,50}$/;
    if (!Test.test(this.state.nodeValue)) {
      const { dispatch, DataState } = this.props;
      dispatch(AppAlertAction.alertError({ type: "btn-tips", title: '目录名称格式不正确！目录名称只能由字母,数字,中文,空格，@#￥$&*（）()-+|\、？《》<>[]【】组成' }));
      return
    }
    if (this.state.isreName) {
      chapters[idx].chapters[id].chapterName = this.state.nodeValue;
    } else {

      chapters[idx].chapters[id].push({
        chapterName: this.state.nodeValue,
        orderNo: chapters.length,
        chapters: [],
      })

    }
    this.setState({
      chapters,
      TreeOnclicknode: -2,
    })
  }
  upChildNode(idx, id) {
    let chapters = this.state.chapters;
    let node = JSON.parse(JSON.stringify(chapters[idx].chapters[id]));
    chapters[idx].chapters.splice(id, 1);
    chapters[idx].chapters.splice(id - 1, 0, node);
    this.setState({
      chapters,
    })
  }
  downChildNode(idx, id) {
    let chapters = this.state.chapters;
    let node = JSON.parse(JSON.stringify(chapters[idx].chapters[id]));
    chapters[idx].chapters.splice(id, 1);
    chapters[idx].chapters.splice(id + 1, 0, node);
    this.setState({
      chapters,
    })
  }
  delChildNode(idx, id) {
    let chapters = this.state.chapters;
    chapters[idx].chapters.splice(idx, 1);
    this.setState({
      chapters,
    })
  }
  showNodeAll(idx) {
    let showNodeArr = this.state.showNodeArr;
    let isFind = false;
    console.log(idx, showNodeArr);
    for (let i = 0; i < showNodeArr.length; i++) {
      if (showNodeArr[i] == idx) {
        showNodeArr.splice(i, 1);
        isFind = true;
        break;
      }
    }
    if (!isFind) {
      showNodeArr.push(idx);
    }
    console.log(idx, showNodeArr);
    this.setState({
      showNodeArr
    })
  }
  // showNodeAll(idx) {
  //   let showNodeArr = this.state.showNodeArr;
  //   showNodeArr.push(idx);
  //   this.setState({
  //     showNodeArr
  //   })
  // }

  render() {
    const { DataState } = this.props;
    let {
      OpenList,
      SubjectsLoading,
      SelectSubjectsLoading,
    } = DataState.TextBookParams.SelectSubjects;
    let { SubjectList } = DataState.TextBookData.SubjectList;
    let { SubjectInfoForKey } = DataState.TextBookData.SubjectInfo;
    let { SetTextBookModalVisible } = DataState.TextBookParams.SetTextBook;
    let { TextBookModalVisible } = DataState.TextBookParams.NodeInfo;
    let { GradeSubjectList } = DataState.TextBookData;
    return (
      <div className="TextBookSetting" id="TextBookSetting">
        <div className="guide">
          <i className="TextBook-logo"></i>
          <span className="TextBook-title">教材设置</span>
        </div>
        <div className="TextBook-content">
          <Loading spinning={SubjectsLoading} opacity={true} tip="请稍候..." style={{ opacity: '0.7', background: '#fff' }}>
            <Collapse
              activeKey={OpenList}
              className={"Subject-Collapse"}
              onChange={this.onCollapseChange.bind(this)}
              expandIconPosition={"right"}
            >
              {SubjectList instanceof Array &&
                SubjectList.map((child) => {
                  return (
                    <Panel
                      header={
                        <div>
                          <i
                            className="Subject-logo"
                            style={{
                              backgroundImage: "url(" + child.SubjectImg + ")",
                              backgroundPosition: "center",
                              backgroundSize: "80px 50px",
                              backgroundRepeat: "no-repeat",
                            }}
                          ></i>
                          <span className="Subject-title">{child.title}</span>
                          <span className="set-num">
                            已设置
                            <span className="set-num-red">
                              {child.Accomplished}
                            </span>
                            /{child.Total}
                          </span>
                        </div>
                      }
                      className="Subject-panel"
                      key={child.value}
                    >
                      <Loading
                        spinning={SelectSubjectsLoading[child.value]}
                        opacity={false}
                      >
                        <div className="Subject-panel-box">
                          {SubjectInfoForKey[child.value] instanceof Array &&
                            SubjectInfoForKey[child.value].map(
                              (Period, index) => {
                                return (
                                  <PeriodTable
                                    className="period-box"
                                    key={index}
                                    title={Period.PeriodName}
                                    data={Period.List}
                                    onEditClick={this.onEditClick}
                                    onTextBookDetailClick={
                                      this.onTextBookDetailClick
                                    }
                                  ></PeriodTable>
                                );
                              }
                            )}
                        </div>
                      </Loading>
                    </Panel>
                  );
                })}
            </Collapse>
          </Loading>
        </div>
























        <Modal
          ref="setTextBookModal"
          bodyStyle={{ padding: '16px' }}
          type="1"
          width={980}
          title={"设置教材"}
          visible={SetTextBookModalVisible}
          onOk={this.setTextBookModalOk}
          onCancel={this.setTextBookModalCancel}
          zIndex={2001}
        >
          {SetTextBookModalVisible ? <SetTextBookModal setTextBookshow={this.setTextBookshow}></SetTextBookModal> : ""}
        </Modal>
        <Modal
          ref="setTextBookModal"
          bodyStyle={{ padding: '16px', height: "400px" }}
          type="1"
          width={600}
          title={"教材详细信息"}
          visible={TextBookModalVisible}
          onOk={this.TextBookMsgModalOk}
          onCancel={this.TextBookMsgModalCancel}
          zIndex={2001}
          okText='编辑'
        >
          {TextBookModalVisible ? <TextBookMsgModal ></TextBookMsgModal> : ""}
          
        </Modal>
       {this.state.visible? <Modal
          ref="setTextBook"
          bodyStyle={{ padding: 0 }}
          type="1"
          width={780}
          title={this.state.showdata==1?"添加教材":'编辑教材'}
          visible={this.state.visible}
          onOk={this.setTextBookOk.bind(this)}
          onCancel={this.setTextBookCancel.bind(this)}
          className="setTextBook-Modal"
          zIndex={2222}
          okText='保存'
        >
          <Loading
        spinning={this.state.showloading}
        opacity={false}
        tip="请稍候..."
      >
          <div className="setTextBook-top">
            <div>名称：<Input className='input-class' placeholder="请输入教材名称" onChange={this.changeinput.bind(this)} maxLength={50} value={this.state.inputValue} onFocus={() => { this.inputFocus() }} type='text' max={10} style={{ width: '280px' }}></Input></div>
            <div>
              <span className='setTextBook-top-span'><b>年级: </b> {GradeSubjectList && GradeSubjectList.length > 0 ? <DropDown width={150} dropSelectd={GradeSubjectList[this.state.dropListSelectidx1]} type="simple" onChange={this.onDropChange1.bind(this)} dropList={GradeSubjectList} height={200}></DropDown > : []}</span>
              <span className='setTextBook-top-span'><b>学科: </b> {GradeSubjectList && GradeSubjectList.length > 0 ? <DropDown width={150} dropSelectd={GradeSubjectList[this.state.dropListSelectidx1].Subjects[this.state.dropListSelectidx2]} type="simple" onChange={this.onDropChange2.bind(this)} dropList={GradeSubjectList[this.state.dropListSelectidx1].Subjects} height={200}></DropDown > : []}</span>
              <span className='setTextBook-top-span'><b>学期: </b> {this.state.TermList ? <DropDown width={100} dropSelectd={this.state.TermList[this.state.dropListSelectidx3]} type="simple" onChange={this.onDropChange3.bind(this)} dropList={this.state.TermList} height={200}></DropDown > : []}</span>
            </div>
          </div>
          <p className='setTextBook-content-p'>
            教材目录：
          </p>
          <div className={`TextBook-tree `}>
            <Scrollbars style={{ width: 100 + "%", height: "100%" }}>
              <div className='tree-list-div'>
                {this.state.chapters.length > 0 ? this.state.chapters.map((item, idx) => {
                  return <div className="tree-list-parent tree-list-parent-div" key={idx}>
                    {this.state.TreeOnclicknode == idx ?
                      <div className="setNodeName" >
                        <Input ref='myinput' className='input-class' placeholder="请输入目录名称" onChange={this.changeNodeValue.bind(this)} maxLength={50} value={this.state.nodeValue} onFocus={() => { this.inputFocus() }} type='text' style={{ width: '280px' }}></Input>
                        {this.state.nodeValue.length > 0 ? <b onClick={() => { this.setNodeOK(idx) }}>确定</b> : ''}
                        <b onClick={() => { this.setState({ TreeOnclicknode: -2, isreName: false }) }}>取消</b>
                      </div> :
                      <div className="tree-list-parent">
                        <div className="tree-list-parent-hover">
                          {this.state.showNodeArr && !this.state.showNodeArr.some((item1) => { return item1 == idx }) ? <i title="展开子目录" onClick={() => { this.showNodeAll(idx) }}>+</i> : <i title="收起子目录" onClick={() => { this.showNodeAll(idx) }}>-</i>}
                          <b title={item.chapterName}>{item.chapterName}</b>
                          <span>
                            <b onClick={() => { this.renameNode(idx, item.chapterName) }}>重命名</b>
                            {idx != 0 ? <b onClick={() => { this.upNode(idx) }}>上移</b> : ''}
                            {idx != this.state.chapters.length - 1 ? <b onClick={() => { this.downNode(idx) }}>下移</b> : ''}
                            <b onClick={() => { this.delNode(idx) }}>删除 </b>
                          </span>
                        </div>
                        {this.state.showNodeArr && !this.state.showNodeArr.some((item1) => { return item1 == idx }) ? '' : <ul>
                          {item.chapters && item.chapters.length > 0 ? item.chapters.map((it, id) => {
                            return <li className="tree-list-parent" key={idx + '&' + id}>

                              {this.state.TreeOnclicknode == idx + '&' + id ?
                                <div className="setNodeName " style={{ marginLeft: '65px' }}>
                                  <Input ref='myinput' className='input-class' placeholder="请输入目录名称" onChange={this.changeNodeValue.bind(this)} maxLength={50} value={this.state.nodeValue} onFocus={() => { this.inputFocus() }} type='text' style={{ width: '280px' }}></Input>
                                  {this.state.nodeValue.length > 0 ? <b onClick={() => { this.setChildNodeOK(idx, id) }}>确定</b> : ''}
                                  <b onClick={() => { this.setState({ TreeOnclicknode: -2, isreName: false }) }}>取消</b>
                                </div> :
                                <div className="tree-list-parent tree-list-parent-li"> <i></i>  <i></i><b title={it.chapterName}>{it.chapterName}</b>
                                  <span>
                                    <b onClick={() => { this.renameChildNode(idx, id, it.chapterName) }}>重命名</b>
                                    {id != 0 ? <b onClick={() => { this.upChildNode(idx, id) }}>上移</b> : ''}
                                    {id != item.chapters.length - 1 ? <b onClick={() => { this.downChildNode(idx, id) }}>下移</b> : ''}
                                    <b onClick={() => { this.delChildNode(idx, id) }}>删除 </b>
                                  </span>
                                </div>}
                            </li>
                          }) : ''}

                          {this.state.TreeOnclicknode == idx + '&-1' ? <div className="setNodeName" style={{ marginLeft: '65px' }}><Input ref='myinput' className='input-class' placeholder="请输入目录名称" onChange={this.changeNodeValue.bind(this)} maxLength={50} value={this.state.nodeValue} onFocus={() => { this.inputFocus() }} type='text' style={{ width: '280px' }}></Input> {this.state.nodeValue.length > 0 ? <b onClick={() => { this.addChildNodeOK(idx) }}>确定</b> : ''} <b onClick={() => { this.setState({ TreeOnclicknode: -2 }) }}>取消</b> </div> : <li><i className="child-add-node" title='添加二级目录' onClick={() => { this.addChildNode(idx, -1) }}>+</i><b className='child-add-node-b'></b></li>}
                          <i className='guide-i'></i>
                        </ul>}

                      </div>}
                  </div>
                }) : ''}
              </div>
              {this.state.chapters.length == 0 && this.state.TreeOnclicknode != '-1' ? <div className='initAddNode' onClick={() => { this.addNode(-1); }}><p>添加教材目录</p></div> : ''}
              {this.state.TreeOnclicknode == '-1' ? <div className="setNodeName" style={{ marginLeft: '28px' }}><Input ref='myinput' className='input-class' placeholder="请输入目录名称" onChange={this.changeNodeValue.bind(this)} maxLength={50} value={this.state.nodeValue} onFocus={() => { this.inputFocus() }} type='text' style={{ width: '280px' }}></Input> {this.state.nodeValue.length > 0 ? <b onClick={() => { this.addNodeOK(-1) }}>确定</b> : ''} <b onClick={() => { this.setState({ TreeOnclicknode: -2 }) }}>取消</b> </div> : <div className='frist-add-node' title="添加目录" onClick={() => { this.addNode(-1) }}>+</div>}
            </Scrollbars>
          </div>
          </Loading>
        </Modal>

:''}

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(TextBookSetting);
